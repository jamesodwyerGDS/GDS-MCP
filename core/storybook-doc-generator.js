/**
 * Storybook Documentation Generator
 *
 * Parses React components and Storybook stories from GDS-storybook-originals
 * and generates engineer-focused markdown documentation.
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

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

    // Find and read story file
    const storyFile = await this.findStoryFile(componentDir);
    const storySource = storyFile ? await fs.readFile(storyFile, 'utf-8') : null;

    // Extract information
    const props = this.extractProps(componentSource);
    const variants = this.extractVariants(componentSource, storySource);
    const codeExample = this.extractCodeExample(componentSource, storySource, componentName);
    const storyId = this.generateStoryId(componentName);

    // Generate markdown
    const markdown = this.generateMarkdown({
      name: componentName,
      props,
      variants,
      codeExample,
      storyId,
      storyUrl: `${this.baseUrl}/?path=/story/${storyId}`,
      sourceFile: path.relative(this.sourceDir, componentFile)
    });

    // Write output
    const outputPath = path.join(this.outputDir, 'components', `${this.kebabCase(componentName)}.md`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, markdown, 'utf-8');

    console.log(`Generated: ${outputPath}`);
    return { name: componentName, path: outputPath };
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

    // Match interface or type definitions for props
    const propsMatch = source.match(/(?:interface|type)\s+(\w*Props\w*)\s*(?:=\s*)?{([^}]+)}/s);
    if (propsMatch) {
      const propsBody = propsMatch[2];
      const propLines = propsBody.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));

      for (const line of propLines) {
        const propMatch = line.match(/^\s*(\w+)(\?)?:\s*([^;]+)/);
        if (propMatch) {
          props.push({
            name: propMatch[1],
            required: !propMatch[2],
            type: propMatch[3].trim().replace(/;$/, '')
          });
        }
      }
    }

    return props;
  }

  /**
   * Extract variants from source and stories
   */
  extractVariants(componentSource, storySource) {
    const variants = [];

    // Look for variant types in component
    const variantMatch = componentSource.match(/(?:colorVariant|variant|size)\s*[?:]?\s*['"]?(\w+)['"]?\s*\|/g);
    if (variantMatch) {
      // Extract unique variant values
      const allVariants = componentSource.match(/['"](\w+)['"]\s*\|/g) || [];
      allVariants.forEach(v => {
        const value = v.match(/['"](\w+)['"]/)?.[1];
        if (value && !variants.includes(value)) {
          variants.push(value);
        }
      });
    }

    // Also check story exports for variant names
    if (storySource) {
      const storyExports = storySource.match(/export const (\w+):/g) || [];
      storyExports.forEach(exp => {
        const name = exp.match(/export const (\w+):/)?.[1];
        if (name && name !== 'default' && !variants.includes(name)) {
          variants.push(name);
        }
      });
    }

    return variants;
  }

  /**
   * Extract a code example
   */
  extractCodeExample(componentSource, storySource, componentName) {
    // Try to get from story first
    if (storySource) {
      // Look for render function or args
      const renderMatch = storySource.match(/render:\s*\([^)]*\)\s*=>\s*\(([^)]+<[^>]+>[^<]*<\/[^>]+>)\)/s);
      if (renderMatch) {
        return renderMatch[1].trim();
      }
    }

    // Generate basic example from component
    return `<${componentName}>Content</${componentName}>`;
  }

  /**
   * Generate Storybook story ID
   */
  generateStoryId(componentName) {
    return `components-${this.kebabCase(componentName)}--default`;
  }

  /**
   * Generate markdown documentation
   */
  generateMarkdown({ name, props, variants, codeExample, storyId, storyUrl, sourceFile }) {
    const frontmatter = {
      name,
      description: `${name} component from the Global Design System`,
      package: this.package,
      storyUrl,
      storyId,
      sourceFile
    };

    const content = `# ${name}

## Import

\`\`\`tsx
import { ${name} } from '${this.package}';
\`\`\`

## Basic Usage

\`\`\`tsx
${codeExample}
\`\`\`

${props.length > 0 ? `## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
${props.map(p => `| \`${p.name}\` | \`${p.type}\` | ${p.required ? 'Yes' : 'No'} | - |`).join('\n')}
` : ''}

${variants.length > 0 ? `## Variants

Available variants: ${variants.map(v => `\`${v}\``).join(', ')}
` : ''}

## Storybook

[View in Storybook](${storyUrl})

## Source

\`${sourceFile}\`
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
