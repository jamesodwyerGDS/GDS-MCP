/**
 * Storybook Documentation Generator
 *
 * Parses React components and Storybook stories from GDS-storybook-originals
 * and generates comprehensive engineer-focused markdown documentation.
 *
 * Extracts:
 * - Props from TypeScript types
 * - Styling from styled-components
 * - Code examples from stories
 * - Design tokens from dimensions/themes
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Spacing tokens mapping for documentation
const SPACING_TOKENS = {
  'spacing.lounge': '4px',
  'spacing.club': '8px',
  'spacing.hall': '12px',
  'spacing.auditorium': '16px',
  'spacing.theatre': '20px',
  'spacing.amphitheatre': '24px',
  'spacing.arena': '32px',
  'spacing.stadium': '48px',
  'spacing.dome': '64px',
  'spacing.field': '88px',
  'minTapSize': '44px',
};

export class StorybookDocGenerator {
  constructor(config) {
    this.sourceDir = config.sourceDir || './GDS-storybook-originals';
    this.outputDir = config.outputDir || './docs-storybook';
    this.baseUrl = config.baseUrl || 'http://localhost:6006';
    this.package = config.package || '@gds/components';
  }

  /**
   * Generate documentation for all components
   */
  async generateAll() {
    const componentsDir = path.join(this.sourceDir, 'components');
    const entries = await fs.readdir(componentsDir, { withFileTypes: true });

    const components = entries
      .filter(e => e.isDirectory())
      .filter(e => !['shared', 'utils', 'NewComponentTemplate', '__test__'].includes(e.name))
      .map(e => e.name);

    console.log(`Found ${components.length} components to document`);

    const results = [];
    for (const componentName of components) {
      try {
        const doc = await this.generateComponent(componentName);
        if (doc) {
          results.push({ name: componentName, success: true });
        }
      } catch (error) {
        console.error(`Error processing ${componentName}:`, error.message);
        results.push({ name: componentName, success: false, error: error.message });
      }
    }

    // Generate tokens documentation
    await this.generateTokensDocs();

    // Generate index
    await this.generateIndex(results);

    return results;
  }

  /**
   * Generate documentation for a single component
   */
  async generateComponent(componentName) {
    const componentDir = path.join(this.sourceDir, 'components', componentName);

    // Find main component file
    const componentFile = await this.findComponentFile(componentDir, componentName);
    if (!componentFile) {
      console.warn(`No component file found for ${componentName}`);
      return null;
    }

    // Read component source
    const componentSource = await fs.readFile(componentFile, 'utf-8');

    // Find and read styles file
    const stylesFile = await this.findStylesFile(componentDir);
    const stylesSource = stylesFile ? await fs.readFile(stylesFile, 'utf-8') : null;

    // Find and read story file
    const storyFile = await this.findStoryFile(componentDir);
    const storySource = storyFile ? await fs.readFile(storyFile, 'utf-8') : null;

    // Extract information
    const props = this.extractProps(componentSource);
    const styling = this.extractStyling(stylesSource);
    const stories = this.extractStories(storySource, componentName);
    const storyId = this.generateStoryId(componentName, storySource);

    // Generate markdown
    const markdown = this.generateMarkdown({
      name: componentName,
      props,
      styling,
      stories,
      storyId,
      storyUrl: `${this.baseUrl}/?path=/story/${storyId}`,
      sourceFile: path.relative(this.sourceDir, componentFile),
      stylesFile: stylesFile ? path.relative(this.sourceDir, stylesFile) : null,
      storyFile: storyFile ? path.relative(this.sourceDir, storyFile) : null
    });

    // Write output
    const outputPath = path.join(this.outputDir, 'components', `${this.kebabCase(componentName)}.md`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, markdown, 'utf-8');

    console.log(`Generated: ${outputPath}`);
    return { name: componentName, path: outputPath };
  }

  /**
   * Find styles file for a component
   */
  async findStylesFile(componentDir) {
    const possibleFiles = ['index.styles.ts', 'styles.ts', 'index.styles.tsx'];
    for (const file of possibleFiles) {
      const filePath = path.join(componentDir, file);
      try {
        await fs.access(filePath);
        return filePath;
      } catch {
        continue;
      }
    }
    return null;
  }

  /**
   * Find the main component file
   */
  async findComponentFile(componentDir, componentName) {
    const possibleFiles = [
      `${componentName}.tsx`,
      'index.tsx',
      `${componentName}.ts`,
      'index.ts'
    ];

    for (const file of possibleFiles) {
      const filePath = path.join(componentDir, file);
      try {
        await fs.access(filePath);
        return filePath;
      } catch {
        continue;
      }
    }
    return null;
  }

  /**
   * Find the story file for a component
   */
  async findStoryFile(componentDir) {
    const storiesDir = path.join(componentDir, '__stories__');
    try {
      const files = await fs.readdir(storiesDir);
      const storyFile = files.find(f => f.endsWith('.stories.tsx') || f.endsWith('.stories.ts'));
      return storyFile ? path.join(storiesDir, storyFile) : null;
    } catch {
      return null;
    }
  }

  /**
   * Extract props from component source
   */
  extractProps(source) {
    const props = [];

    // Match type definitions for SharedProps or Props
    const typeMatches = source.match(/type\s+(?:Props|SharedProps)[^=]*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/gs);
    if (typeMatches) {
      typeMatches.forEach(match => {
        const propRegex = /(\w+)(\?)?:\s*([^;]+);/g;
        let propMatch;
        while ((propMatch = propRegex.exec(match)) !== null) {
          const [, name, optional, type] = propMatch;
          // Skip internal props (starting with $) and generic type params
          if (!name.startsWith('$') && !name.startsWith('E') && name !== 'as') {
            const defaultValue = this.extractDefaultValue(source, name);
            props.push({
              name,
              required: !optional,
              type: type.trim().replace(/\n/g, ' ').replace(/\s+/g, ' '),
              default: defaultValue
            });
          }
        }
      });
    }

    // Also try interface syntax
    if (props.length === 0) {
      const interfaceMatch = source.match(/interface\s+\w*Props\w*\s*(?:extends[^{]*)?\{([^}]+)\}/s);
      if (interfaceMatch) {
        const propsBody = interfaceMatch[1];
        const propLines = propsBody.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));

        for (const line of propLines) {
          const propMatch = line.match(/^\s*(\w+)(\?)?:\s*([^;]+)/);
          if (propMatch && !propMatch[1].startsWith('$')) {
            props.push({
              name: propMatch[1],
              required: !propMatch[2],
              type: propMatch[3].trim().replace(/;$/, ''),
              default: this.extractDefaultValue(source, propMatch[1])
            });
          }
        }
      }
    }

    return props;
  }

  /**
   * Extract default value for a prop from destructuring
   */
  extractDefaultValue(source, propName) {
    const defaultRegex = new RegExp(`${propName}\\s*=\\s*([^,}\\n]+)[,}\\n]`);
    const match = source.match(defaultRegex);
    if (match) {
      return match[1].trim().replace(/"/g, "'");
    }
    return null;
  }

  /**
   * Extract styling information from styled-components
   */
  extractStyling(stylesSource) {
    if (!stylesSource) return { spacing: [], typography: [], colors: [], borders: [], snippets: [] };

    const styling = {
      spacing: [],
      typography: [],
      colors: [],
      borders: [],
      snippets: []
    };

    // Extract spacing tokens
    const spacingMatches = stylesSource.matchAll(/(?:padding|margin|gap|min-height|width|height)[^;]*\$\{([^}]+)\}/g);
    const seenSpacing = new Set();
    for (const match of spacingMatches) {
      const token = match[1].trim();
      if (!seenSpacing.has(token)) {
        seenSpacing.add(token);
        const value = SPACING_TOKENS[token] || token;
        styling.spacing.push({ token, value, context: match[0].trim().substring(0, 60) });
      }
    }

    // Extract typography
    const fontMatches = stylesSource.matchAll(/(?:font-size|font-weight|line-height)[^;]*(?:\$\{([^}]+)\}|:\s*([^;{]+))/g);
    for (const match of fontMatches) {
      const property = match[0].split(':')[0].trim().split('\n').pop().trim();
      styling.typography.push({
        property,
        token: match[1] || null,
        value: match[2]?.trim() || match[1]
      });
    }

    // Extract color-related styling
    const colorMatches = stylesSource.matchAll(/(?:color|background-color|border-color)[^;]*\$\{([^}]+)\}/g);
    const seenColors = new Set();
    for (const match of colorMatches) {
      const token = match[1].trim();
      if (!seenColors.has(token)) {
        seenColors.add(token);
        styling.colors.push({
          property: match[0].split(':')[0].trim().split('\n').pop().trim(),
          token
        });
      }
    }

    // Extract border/radius
    const borderMatches = stylesSource.matchAll(/(?:border-radius|border-width|border-style)[^;$]*:\s*([^;{]+)/g);
    for (const match of borderMatches) {
      styling.borders.push({
        property: match[0].split(':')[0].trim().split('\n').pop().trim(),
        value: match[1].trim()
      });
    }

    // Extract key CSS snippets (the main styled component definition)
    const snippetMatch = stylesSource.match(/const\s+base\w*Styles?\s*=\s*css`([^`]+)`/s);
    if (snippetMatch) {
      styling.snippets.push(snippetMatch[1].trim());
    }

    return styling;
  }

  /**
   * Extract stories and variant information
   */
  extractStories(storySource, componentName) {
    if (!storySource) return { variants: [], meta: {}, codeExamples: [] };

    const stories = { variants: [], meta: {}, codeExamples: [] };

    // Extract meta information
    const titleMatch = storySource.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) stories.meta.title = titleMatch[1];

    // Extract default args
    const argsMatch = storySource.match(/args:\s*\{([^}]+)\}/);
    if (argsMatch) stories.meta.defaultArgs = argsMatch[1].trim();

    // Extract argTypes options (for variants)
    const optionsMatch = storySource.match(/const\s+options\s*=\s*\{([^}]+)\}/s);
    if (optionsMatch) {
      const optionsContent = optionsMatch[1];
      const variantTypes = optionsContent.matchAll(/(\w+):\s*\[([^\]]+)\]/g);
      for (const match of variantTypes) {
        stories.meta[match[1] + 'Options'] = match[2].split(',').map(s => s.trim().replace(/["']/g, ''));
      }
    }

    // Extract story exports with their args
    const storyRegex = /export\s+const\s+(\w+):\s*Story\s*=\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g;
    let storyMatch;
    while ((storyMatch = storyRegex.exec(storySource)) !== null) {
      const [, name, config] = storyMatch;
      const argsMatch = config.match(/args:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/);
      const args = argsMatch ? argsMatch[1].trim() : '';

      stories.variants.push({
        name,
        args,
        hasArgs: !!argsMatch
      });

      // Generate code example for this variant
      if (args) {
        const codeExample = this.generateCodeExample(componentName, name, args);
        stories.codeExamples.push({ name, code: codeExample });
      }
    }

    return stories;
  }

  /**
   * Generate code example from story args
   */
  generateCodeExample(componentName, storyName, args) {
    // Parse children from args
    const childrenMatch = args.match(/children:\s*["']([^"']+)["']/);
    const children = childrenMatch ? childrenMatch[1] : 'Content';

    // Parse other props
    const propsToInclude = [];
    const propMatches = args.matchAll(/(\w+):\s*(?:["']([^"']+)["']|(\w+)|(\{[^}]+\}))/g);
    for (const match of propMatches) {
      const [, propName, strValue, boolValue, objValue] = match;
      if (propName !== 'children') {
        if (strValue) {
          propsToInclude.push(`${propName}="${strValue}"`);
        } else if (boolValue === 'true') {
          propsToInclude.push(propName);
        } else if (boolValue === 'false') {
          propsToInclude.push(`${propName}={false}`);
        } else if (objValue) {
          propsToInclude.push(`${propName}={${objValue}}`);
        }
      }
    }

    const propsStr = propsToInclude.length > 0 ? ' ' + propsToInclude.join(' ') : '';
    return `<${componentName}${propsStr}>${children}</${componentName}>`;
  }

  /**
   * Generate Storybook story ID
   */
  generateStoryId(componentName, storySource) {
    // Try to get story path from meta title
    if (storySource) {
      const titleMatch = storySource.match(/title:\s*["']([^"']+)["']/);
      if (titleMatch) {
        const storyPath = titleMatch[1].toLowerCase().replace(/\//g, '-').replace(/\s/g, '-');
        return `${storyPath}--basic`;
      }
    }
    return `components-${this.kebabCase(componentName)}--basic`;
  }

  /**
   * Generate comprehensive markdown documentation
   */
  generateMarkdown({ name, props, styling, stories, storyId, storyUrl, sourceFile, stylesFile, storyFile }) {
    const today = new Date().toISOString().split('T')[0];
    const kebabName = this.kebabCase(name);

    const frontmatter = {
      name,
      description: `${name} component from the Global Design System`,
      package: this.package,
      status: 'stable',
      version: '1.0.0',
      updated: today,
      sourceFile,
      stylesFile,
      storiesFile: storyFile,
      storyUrl,
      storyId,
      tags: [],
      keywords: [kebabName]
    };

    // Build props table
    let propsTable = '';
    if (props.length > 0) {
      propsTable = `| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
${props.map(p => {
  const typeStr = p.type.length > 50 ? p.type.substring(0, 47) + '...' : p.type;
  const defaultStr = p.default || '-';
  return `| \`${p.name}\` | \`${typeStr}\` | \`${defaultStr}\` | ${p.required ? 'Yes' : 'No'} | - |`;
}).join('\n')}`;
    } else {
      propsTable = '| - | - | - | - | See source file |';
    }

    // Build variants section
    let variantsSection = '';
    if (stories.meta.colorVariantOptions) {
      variantsSection += `### Color Variants

Available: ${stories.meta.colorVariantOptions.map(v => `\`${v}\``).join(', ')}

`;
    }
    if (stories.meta.fillVariantOptions) {
      variantsSection += `### Fill Variants

Available: ${stories.meta.fillVariantOptions.map(v => `\`${v}\``).join(', ')}

`;
    }

    // Build code examples section
    let codeExamplesSection = '';
    if (stories.codeExamples.length > 0) {
      codeExamplesSection = stories.codeExamples.slice(0, 8).map(ex => `#### ${ex.name}

\`\`\`tsx
${ex.code}
\`\`\``).join('\n\n');
    }

    // Build styling section
    let spacingTable = '| - | See styles file | - |';
    if (styling.spacing.length > 0) {
      spacingTable = styling.spacing.slice(0, 8).map(s =>
        `| ${s.context.split(':')[0] || 'spacing'} | \`${s.token}\` | ${s.value} |`
      ).join('\n');
    }

    let typographyTable = '| - | See styles file |';
    if (styling.typography.length > 0) {
      typographyTable = styling.typography.slice(0, 6).map(t =>
        `| ${t.property} | \`${t.token || t.value}\` |`
      ).join('\n');
    }

    let colorsTable = '| - | See styles file |';
    if (styling.colors.length > 0) {
      colorsTable = styling.colors.slice(0, 8).map(c =>
        `| ${c.property} | \`${c.token}\` |`
      ).join('\n');
    }

    let bordersSection = '';
    if (styling.borders.length > 0) {
      bordersSection = `
### Borders

| Property | Value |
|----------|-------|
${styling.borders.map(b => `| ${b.property} | ${b.value} |`).join('\n')}`;
    }

    let styledComponentsSection = '';
    if (styling.snippets.length > 0) {
      const snippet = styling.snippets[0].substring(0, 600);
      styledComponentsSection = `
## Styled Components Source

\`\`\`css
/* From index.styles.ts */
${snippet}${styling.snippets[0].length > 600 ? '\n/* ... (truncated) */' : ''}
\`\`\``;
    }

    // Story variants list
    const variantsList = stories.variants.length > 0
      ? stories.variants.map(v => `\`${v.name}\``).join(', ')
      : 'See Storybook';

    const content = `# ${name}

## Overview

${name} component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

\`\`\`tsx
import ${name} from '${this.package}/${name}';
// or
import { ${name} } from '${this.package}';
\`\`\`

## Props

${propsTable}

## Variants

${variantsSection}
### Available Story Variants

${variantsList}

## Code Examples

### Basic Usage

\`\`\`tsx
<${name}>Content</${name}>
\`\`\`

${codeExamplesSection}

## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
${spacingTable}

### Typography

| Property | Token/Value |
|----------|-------------|
${typographyTable}

### Colors

| Property | Token |
|----------|-------|
${colorsTable}
${bordersSection}
${styledComponentsSection}

## States

| State | Description |
|-------|-------------|
| Default | Resting state |
| Hover | Mouse over (\`:hover\`) |
| Focus | Keyboard focus (\`:focus\`) with visible outline |
| Active | Pressed state (\`:active\`) |
| Disabled | Non-interactive (\`disabled\` prop or \`aria-disabled\`) |

## Accessibility

- **Keyboard navigation**: Component follows WAI-ARIA patterns where applicable
- **Focus indicators**: Visible focus states with \`outline-offset: 4px\`
- **Screen readers**: Semantic HTML with ARIA attributes where needed
- **High contrast**: Supports \`forced-colors\` mode

## Do's and Don'ts

### Do's

- Use consistent variants within the same context
- Follow spacing guidelines from the design system
- Provide accessible labels where needed

### Don'ts

- Don't override the component's built-in accessibility features
- Don't use deprecated props without planning migration
- Don't mix incompatible variant combinations

## Storybook

[View in Storybook](${storyUrl})

## Source Files

| File | Path |
|------|------|
| Component | \`${sourceFile}\` |
${stylesFile ? `| Styles | \`${stylesFile}\` |` : ''}
${storyFile ? `| Stories | \`${storyFile}\` |` : ''}

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | ${today} | Initial documentation |
`;

    return matter.stringify(content, frontmatter);
  }

  /**
   * Generate tokens documentation
   */
  async generateTokensDocs() {
    // Spacing tokens
    const spacingFile = path.join(this.sourceDir, 'dimensions', 'spacing.ts');
    const spacingSource = await fs.readFile(spacingFile, 'utf-8');
    await this.generateTokenDoc('spacing', spacingSource);

    // Typography tokens
    const typographyFile = path.join(this.sourceDir, 'dimensions', 'typography.ts');
    const typographySource = await fs.readFile(typographyFile, 'utf-8');
    await this.generateTokenDoc('typography', typographySource);

    // Colors from themes
    const themesFile = path.join(this.sourceDir, 'themes', 'TM.ts');
    const themesSource = await fs.readFile(themesFile, 'utf-8');
    await this.generateTokenDoc('colors', themesSource);
  }

  /**
   * Generate a token documentation file
   */
  async generateTokenDoc(tokenType, source) {
    const outputPath = path.join(this.outputDir, 'tokens', `${tokenType}.md`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    let content = `---
name: ${tokenType}
type: tokens
---

# ${tokenType.charAt(0).toUpperCase() + tokenType.slice(1)} Tokens

\`\`\`typescript
${source.slice(0, 2000)}${source.length > 2000 ? '\n// ... truncated' : ''}
\`\`\`
`;

    await fs.writeFile(outputPath, content, 'utf-8');
    console.log(`Generated: ${outputPath}`);
  }

  /**
   * Generate index file
   */
  async generateIndex(results) {
    const successful = results.filter(r => r.success);

    const content = `---
name: GDS Storybook Documentation
description: Engineer-focused documentation for Global Design System components
---

# GDS Storybook Documentation

Documentation generated from \`GDS-storybook-originals/\` for engineers.

## Components (${successful.length})

${successful.map(r => `- [${r.name}](./components/${this.kebabCase(r.name)}.md)`).join('\n')}

## Tokens

- [Spacing](./tokens/spacing.md)
- [Typography](./tokens/typography.md)
- [Colors](./tokens/colors.md)

## Storybook

Run locally: \`npm run storybook\` → ${this.baseUrl}
`;

    const outputPath = path.join(this.outputDir, 'index.md');
    await fs.writeFile(outputPath, content, 'utf-8');
    console.log(`Generated: ${outputPath}`);
  }

  /**
   * Convert to kebab-case
   */
  kebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
}

export default StorybookDocGenerator;
