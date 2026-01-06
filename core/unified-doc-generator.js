/**
 * Unified Documentation Generator
 *
 * Combines documentation from all three sources (design, storybook, vibe)
 * into a single file per component for efficient LLM retrieval.
 *
 * Each audience section is clearly labeled and separated for easy comparison.
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export class UnifiedDocGenerator {
  constructor(config = {}) {
    this.designDir = config.designDir || './docs';
    this.storybookDir = config.storybookDir || './docs-storybook';
    this.vibeDir = config.vibeDir || './docs-vibe';
    this.outputDir = config.outputDir || './docs-unified';
  }

  /**
   * Generate unified documentation for all components
   */
  async generateAll() {
    console.log('Generating unified documentation...');

    // Build component map from all sources
    const componentMap = await this.buildComponentMap();
    console.log(`Found ${Object.keys(componentMap).length} unique components`);

    const results = [];
    for (const [componentName, sources] of Object.entries(componentMap)) {
      try {
        await this.generateUnified(componentName, sources);
        results.push({ name: componentName, success: true, sources: Object.keys(sources) });
      } catch (error) {
        console.error(`Error processing ${componentName}:`, error.message);
        results.push({ name: componentName, success: false, error: error.message });
      }
    }

    // Generate index and llms.txt
    await this.generateIndex(results);
    await this.generateLlmsTxt(results);

    return results;
  }

  /**
   * Build a map of all components across all doc sources
   */
  async buildComponentMap() {
    const componentMap = {};

    // Scan design docs
    const designComponents = await this.scanDesignDocs();
    for (const comp of designComponents) {
      const key = this.normalizeComponentName(comp.name);
      componentMap[key] = componentMap[key] || {};
      componentMap[key].design = comp;
    }

    // Scan storybook docs
    const storybookComponents = await this.scanStorybookDocs();
    for (const comp of storybookComponents) {
      const key = this.normalizeComponentName(comp.name);
      componentMap[key] = componentMap[key] || {};
      componentMap[key].storybook = comp;
    }

    // Scan vibe docs
    const vibeComponents = await this.scanVibeDocs();
    for (const comp of vibeComponents) {
      const key = this.normalizeComponentName(comp.name);
      componentMap[key] = componentMap[key] || {};
      componentMap[key].vibe = comp;
    }

    return componentMap;
  }

  /**
   * Scan design documentation
   */
  async scanDesignDocs() {
    const components = [];
    const atomsDir = path.join(this.designDir, 'components', 'atoms');

    try {
      const files = await fs.readdir(atomsDir);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(atomsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = matter(content);
          components.push({
            name: parsed.data.name || file.replace('.md', ''),
            file: filePath,
            frontmatter: parsed.data,
            content: parsed.content
          });
        }
      }
    } catch (error) {
      console.warn('Could not scan design docs:', error.message);
    }

    return components;
  }

  /**
   * Scan storybook documentation
   */
  async scanStorybookDocs() {
    const components = [];
    const componentsDir = path.join(this.storybookDir, 'components');

    try {
      const files = await fs.readdir(componentsDir);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(componentsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = matter(content);
          components.push({
            name: parsed.data.name || this.fileToComponentName(file),
            file: filePath,
            frontmatter: parsed.data,
            content: parsed.content
          });
        }
      }
    } catch (error) {
      console.warn('Could not scan storybook docs:', error.message);
    }

    return components;
  }

  /**
   * Scan vibe documentation
   */
  async scanVibeDocs() {
    const components = [];
    const tailwindDir = path.join(this.vibeDir, 'tailwind');

    try {
      const files = await fs.readdir(tailwindDir);
      for (const file of files) {
        if (file.endsWith('.html')) {
          const filePath = path.join(tailwindDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          components.push({
            name: this.fileToComponentName(file.replace('.html', '')),
            file: filePath,
            content: content
          });
        }
      }
    } catch (error) {
      console.warn('Could not scan vibe docs:', error.message);
    }

    return components;
  }

  /**
   * Generate unified documentation for a single component
   */
  async generateUnified(componentName, sources) {
    const displayName = this.pascalCase(componentName);

    // Build frontmatter from available sources
    const frontmatter = this.buildUnifiedFrontmatter(displayName, sources);

    // Build content with clear audience sections
    let content = `# ${displayName}

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

`;

    // Add Quick Reference section
    content += this.buildQuickReference(displayName, sources);

    // Add Design section
    content += `
---

## Design Documentation

> Query mode: \`@design ${componentName}\`

`;
    if (sources.design) {
      content += this.formatDesignSection(sources.design);
    } else {
      content += `*No design documentation available for this component.*\n\n`;
    }

    // Add Engineer section
    content += `
---

## Engineer Documentation

> Query mode: \`@engineer ${componentName}\`
> Styling: **styled-components** (CSS-in-JS)

`;
    if (sources.storybook) {
      content += this.formatEngineerSection(sources.storybook);
    } else {
      content += `*No engineer documentation available for this component.*\n\n`;
    }

    // Add Vibe section
    content += `
---

## Vibe Documentation

> Query mode: \`@vibe ${componentName}\`
> Styling: **Tailwind CSS** (utility classes)

`;
    if (sources.vibe) {
      content += this.formatVibeSection(sources.vibe);
    } else {
      content += `*No vibe documentation available for this component.*\n\n`;
    }

    // Add comparison section
    content += this.buildComparisonSection(sources);

    // Write output
    const outputPath = path.join(this.outputDir, 'components', `${this.kebabCase(componentName)}.md`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    const markdown = matter.stringify(content, frontmatter);
    await fs.writeFile(outputPath, markdown, 'utf-8');

    console.log(`Generated: ${outputPath}`);
    return { name: componentName, path: outputPath };
  }

  /**
   * Build unified frontmatter from all sources
   */
  buildUnifiedFrontmatter(displayName, sources) {
    const frontmatter = {
      name: displayName,
      description: `Unified documentation for ${displayName} component`,
      audiences: [],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (sources.design) {
      frontmatter.audiences.push('design');
      const df = sources.design.frontmatter;
      if (df.category) frontmatter.category = df.category;
      if (df.status) frontmatter.status = df.status;
      if (df.figmaNodeId) frontmatter.figmaNodeId = df.figmaNodeId;
      if (df.figmaFileKey) frontmatter.figmaFileKey = df.figmaFileKey;
      if (df.tokens) frontmatter.tokens = df.tokens;
    }

    if (sources.storybook) {
      frontmatter.audiences.push('engineer');
      const sf = sources.storybook.frontmatter;
      if (sf.package) frontmatter.package = sf.package;
      if (sf.storyUrl) frontmatter.storyUrl = sf.storyUrl;
      if (sf.sourceFile) frontmatter.sourceFile = sf.sourceFile;
    }

    if (sources.vibe) {
      frontmatter.audiences.push('vibe');
    }

    return frontmatter;
  }

  /**
   * Build quick reference section
   */
  buildQuickReference(displayName, sources) {
    let ref = `## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | ${displayName} |
`;

    if (sources.design?.frontmatter?.tokens?.colours) {
      const colors = Object.keys(sources.design.frontmatter.tokens.colours).join(', ');
      ref += `| **Color Variants** | ${colors} |\n`;
    }

    if (sources.storybook?.frontmatter?.package) {
      ref += `| **Package** | \`${sources.storybook.frontmatter.package}\` |\n`;
    }

    if (sources.design?.frontmatter?.figmaNodeId) {
      ref += `| **Figma Node** | ${sources.design.frontmatter.figmaNodeId} |\n`;
    }

    const available = [];
    if (sources.design) available.push('Design');
    if (sources.storybook) available.push('Engineer');
    if (sources.vibe) available.push('Vibe');
    ref += `| **Docs Available** | ${available.join(', ')} |\n`;

    ref += '\n';
    return ref;
  }

  /**
   * Format design section content
   */
  formatDesignSection(source) {
    let content = '';

    // Add frontmatter summary
    const fm = source.frontmatter;
    if (fm.description) {
      content += `**${fm.description}**\n\n`;
    }

    // Add key tokens
    if (fm.tokens) {
      content += `### Design Tokens\n\n`;

      if (fm.tokens.colours) {
        content += `**Colors:**\n`;
        for (const [key, value] of Object.entries(fm.tokens.colours)) {
          if (typeof value === 'object') {
            for (const [subKey, subValue] of Object.entries(value)) {
              content += `- ${key}.${subKey}: ${subValue}\n`;
            }
          } else {
            content += `- ${key}: ${value}\n`;
          }
        }
        content += '\n';
      }

      if (fm.tokens.spacing) {
        content += `**Spacing:**\n`;
        for (const [key, value] of Object.entries(fm.tokens.spacing)) {
          content += `- ${key}: ${value}\n`;
        }
        content += '\n';
      }

      if (fm.tokens.typography) {
        content += `**Typography:**\n`;
        for (const [key, value] of Object.entries(fm.tokens.typography)) {
          content += `- ${key}: ${value}\n`;
        }
        content += '\n';
      }
    }

    // Add the full content
    content += `### Full Design Specification\n\n`;
    content += source.content;

    return content;
  }

  /**
   * Format engineer section content
   */
  formatEngineerSection(source) {
    let content = '';

    const fm = source.frontmatter;

    // Import statement
    if (fm.package) {
      content += `### Import\n\n\`\`\`tsx\nimport { ${source.name} } from '${fm.package}';\n\`\`\`\n\n`;
    }

    // Storybook link
    if (fm.storyUrl) {
      content += `### Storybook\n\n[View in Storybook](${fm.storyUrl})\n\n`;
    }

    // Source file
    if (fm.sourceFile) {
      content += `### Source\n\n\`${fm.sourceFile}\`\n\n`;
    }

    // Add the full content
    content += `### Full Engineer Documentation\n\n`;
    content += source.content;

    return content;
  }

  /**
   * Format vibe section content
   */
  formatVibeSection(source) {
    let content = `### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

\`\`\`html
${source.content}
\`\`\`

`;
    return content;
  }

  /**
   * Build comparison section for design vs storybook
   */
  buildComparisonSection(sources) {
    let content = `
---

## Comparison: Design vs Code

`;

    if (!sources.design && !sources.storybook) {
      content += `*Comparison not available - missing documentation.*\n\n`;
      return content;
    }

    content += `| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
`;

    // Status
    const designStatus = sources.design?.frontmatter?.status || '-';
    const codeStatus = sources.storybook?.frontmatter?.storyUrl ? 'In Storybook' : '-';
    content += `| **Status** | ${designStatus} | ${codeStatus} |\n`;

    // Styling approach
    content += `| **Styling** | Figma tokens, CSS vars | styled-components |\n`;

    // Package
    const pkg = sources.storybook?.frontmatter?.package || '-';
    content += `| **Package** | - | \`${pkg}\` |\n`;

    // Figma reference
    const figmaNode = sources.design?.frontmatter?.figmaNodeId || '-';
    content += `| **Figma Node** | ${figmaNode} | - |\n`;

    content += `
> **Note:** Design docs use "transactional", code uses \`colorVariant="transaction"\`

`;

    return content;
  }

  /**
   * Generate index file
   */
  async generateIndex(results) {
    const successful = results.filter(r => r.success);

    const content = `---
name: GDS Unified Documentation
description: All component documentation in one place - design, engineer, and vibe combined
---

# GDS Unified Documentation

> Single-file-per-component reference combining all three documentation sets.

## Why Unified Docs?

- **One lookup** - All info for a component in a single file
- **Easy comparison** - Design vs code side-by-side
- **Query modes** - Use \`@design\`, \`@engineer\`, or \`@vibe\` prefixes
- **Efficient retrieval** - Optimized for LLM/MCP tools

## Components (${successful.length})

| Component | Design | Engineer | Vibe |
|-----------|--------|----------|------|
${successful.map(r => {
  const hasDesign = r.sources?.includes('design') ? 'Y' : '-';
  const hasEngineer = r.sources?.includes('storybook') ? 'Y' : '-';
  const hasVibe = r.sources?.includes('vibe') ? 'Y' : '-';
  return `| [${this.pascalCase(r.name)}](./components/${this.kebabCase(r.name)}.md) | ${hasDesign} | ${hasEngineer} | ${hasVibe} |`;
}).join('\n')}

## Query Modes

| Mode | Prefix | Source |
|------|--------|--------|
| Design | \`@design button\` | Design specs, Figma tokens |
| Engineer | \`@engineer button\` | React code, TypeScript |
| Vibe | \`@vibe button\` | Tailwind HTML snippets |

## Documentation Sources

| Doc Set | Path | Styling |
|---------|------|---------|
| Design | \`/docs/\` | Figma variables |
| Engineer | \`/docs-storybook/\` | styled-components |
| Vibe | \`/docs-vibe/\` | Tailwind CSS |

---

Generated: ${new Date().toISOString()}
`;

    const outputPath = path.join(this.outputDir, 'index.md');
    await fs.mkdir(this.outputDir, { recursive: true });
    await fs.writeFile(outputPath, content, 'utf-8');
    console.log(`Generated: ${outputPath}`);
  }

  /**
   * Generate llms.txt for unified docs
   */
  async generateLlmsTxt(results) {
    const successful = results.filter(r => r.success);

    const content = `# GDS Unified Documentation

> Combined design + engineer + vibe documentation in one file per component.

## Query Modes

Use mode prefixes for audience-specific sections:

| Mode | Prefix | Section |
|------|--------|---------|
| Design | \`@design\` | Design specs, Figma tokens, use cases |
| Engineer | \`@engineer\` | React code, TypeScript, styled-components |
| Vibe | \`@vibe\` | Tailwind HTML, copy-paste snippets |

## Components (${successful.length})

${successful.map(r => `- [${this.pascalCase(r.name)}](./components/${this.kebabCase(r.name)}.md)`).join('\n')}

## Styling Libraries

| Audience | Styling Approach |
|----------|------------------|
| Design | Figma variables, CSS custom properties |
| Engineer | **styled-components** (CSS-in-JS) |
| Vibe | **Tailwind CSS** (utility classes) |

## Terminology

| Design Term | Code Value |
|-------------|------------|
| transactional | \`transaction\` |
| Neptune | \`#024DDF\` |
| Cosmos | \`#121212\` |
| Earth | \`#01A469\` |
| Mars | \`#EB0000\` |

## Benefits

1. **Single file lookup** - All component info in one place
2. **Easy comparison** - Design vs code side-by-side
3. **Reduced tool calls** - No need to query multiple sources
4. **Preserved sections** - Each audience clearly labeled

---

Source: gitmcp.io/jamesodwyerGDS/GDS-MCP
`;

    const outputPath = path.join(this.outputDir, 'llms.txt');
    await fs.writeFile(outputPath, content, 'utf-8');
    console.log(`Generated: ${outputPath}`);
  }

  /**
   * Normalize component name for mapping
   * Ensures consistent kebab-case naming to prevent duplicates
   */
  normalizeComponentName(name) {
    return name
      // Convert camelCase/PascalCase to kebab-case
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      // Remove any duplicate hyphens
      .replace(/--+/g, '-')
      // Lowercase everything
      .toLowerCase()
      // Trim hyphens from start/end
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Convert filename to component name
   */
  fileToComponentName(filename) {
    return filename
      .replace(/\.(md|html)$/, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  /**
   * Convert to PascalCase
   */
  pascalCase(str) {
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
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

export default UnifiedDocGenerator;
