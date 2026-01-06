/**
 * Vibe Documentation Generator
 *
 * Transforms GDS documentation into formats optimized for:
 * - ShadCN component patterns
 * - Tailwind-only HTML snippets
 * - Single-file design system summary (for Lovable, Figma Make)
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export class VibeDocGenerator {
  constructor(config) {
    this.sourceDir = config.sourceDir || './docs';
    this.outputDir = config.outputDir || './docs-vibe';
    this.tokens = config.tokens || {};
  }

  /**
   * Generate all vibe documentation formats
   */
  async generateAll() {
    console.log('Generating vibe documentation...');

    // Read all source docs
    const docs = await this.readSourceDocs();
    console.log(`Found ${docs.length} source documents`);

    // Generate ShadCN specs
    await this.generateShadCN(docs);

    // Generate Tailwind snippets
    await this.generateTailwind(docs);

    // Generate single-file summary
    await this.generateSummary(docs);

    return { total: docs.length };
  }

  /**
   * Read all source documentation files
   */
  async readSourceDocs() {
    const docs = [];
    const componentsDir = path.join(this.sourceDir, 'components', 'atoms');

    try {
      const files = await fs.readdir(componentsDir);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(componentsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = matter(content);
          docs.push({
            name: parsed.data.name || file.replace('.md', ''),
            file,
            frontmatter: parsed.data,
            content: parsed.content
          });
        }
      }
    } catch (error) {
      console.warn('Could not read components directory:', error.message);
    }

    return docs;
  }

  /**
   * Generate ShadCN-style component specs
   */
  async generateShadCN(docs) {
    const outputDir = path.join(this.outputDir, 'shadcn');
    await fs.mkdir(outputDir, { recursive: true });

    for (const doc of docs) {
      const shadcnDoc = this.transformToShadCN(doc);
      const outputPath = path.join(outputDir, doc.file);
      await fs.writeFile(outputPath, shadcnDoc, 'utf-8');
    }

    console.log(`Generated ${docs.length} ShadCN specs in ${outputDir}`);
  }

  /**
   * Transform a doc to ShadCN format
   */
  transformToShadCN(doc) {
    const { name, frontmatter } = doc;
    const componentName = this.pascalCase(name);
    const kebabName = this.kebabCase(name);

    // Extract variants from frontmatter or content
    const variants = this.extractVariants(doc);
    const tailwindClasses = this.extractTailwindClasses(doc);

    const content = `# ${componentName}

## Import

\`\`\`tsx
import { ${componentName} } from "@/components/ui/${kebabName}"
\`\`\`

## Usage

\`\`\`tsx
<${componentName}${variants.length > 0 ? ` variant="${variants[0]}"` : ''}>
  ${componentName} content
</${componentName}>
\`\`\`

${variants.length > 0 ? `## Variants

${variants.map(v => `- \`${v}\``).join('\n')}

\`\`\`tsx
// Examples
${variants.map(v => `<${componentName} variant="${v}">${v}</${componentName}>`).join('\n')}
\`\`\`
` : ''}

## Tailwind Classes

\`\`\`tsx
// Base styles
className="${tailwindClasses.base}"

${variants.length > 0 ? `// Variant styles
const variants = {
${variants.map(v => `  ${v}: "${tailwindClasses[v] || tailwindClasses.base}"`).join(',\n')}
}` : ''}
\`\`\`

## GDS Token Mapping

${frontmatter.tokens ? this.formatTokenMapping(frontmatter.tokens) : 'See design documentation for token details.'}
`;

    return matter.stringify(content, {
      component: componentName,
      shadcn: true,
      gdsName: name,
      variants
    });
  }

  /**
   * Generate Tailwind-only HTML snippets
   */
  async generateTailwind(docs) {
    const outputDir = path.join(this.outputDir, 'tailwind');
    await fs.mkdir(outputDir, { recursive: true });

    for (const doc of docs) {
      const htmlSnippet = this.generateTailwindSnippet(doc);
      const outputPath = path.join(outputDir, doc.file.replace('.md', '.html'));
      await fs.writeFile(outputPath, htmlSnippet, 'utf-8');
    }

    console.log(`Generated ${docs.length} Tailwind snippets in ${outputDir}`);
  }

  /**
   * Generate a Tailwind HTML snippet for a component
   */
  generateTailwindSnippet(doc) {
    const { name, frontmatter } = doc;
    const tailwindClasses = this.extractTailwindClasses(doc);
    const variants = this.extractVariants(doc);

    // Map component type to HTML element
    const elementMap = {
      button: 'button',
      input: 'input',
      badge: 'span',
      alert: 'div',
      modal: 'dialog',
      tooltip: 'div',
      default: 'div'
    };

    const element = elementMap[name.toLowerCase()] || elementMap.default;
    const isVoid = ['input'].includes(element);

    let html = `<!-- ${name} Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
${isVoid
  ? `<${element} class="${tailwindClasses.base}" placeholder="${name}..." />`
  : `<${element} class="${tailwindClasses.base}">
  ${name} Content
</${element}>`}
`;

    // Add variant examples
    if (variants.length > 1) {
      html += `
<!-- Variants -->
${variants.map(v => {
  const variantClasses = tailwindClasses[v] || tailwindClasses.base;
  return isVoid
    ? `<!-- ${v} -->\n<${element} class="${variantClasses}" placeholder="${v}..." />`
    : `<!-- ${v} -->\n<${element} class="${variantClasses}">\n  ${v}\n</${element}>`;
}).join('\n\n')}
`;
    }

    // Add states
    html += `
<!-- States -->
<!-- Hover: Add hover: prefix to classes -->
<!-- Focus: Add focus: prefix to classes -->
<!-- Disabled: Add disabled:opacity-50 disabled:cursor-not-allowed -->
`;

    return html;
  }

  /**
   * Generate single-file design system summary
   */
  async generateSummary(docs) {
    const outputPath = path.join(this.outputDir, 'design-system.md');

    const content = `# GDS Design System - Vibe Coding Reference

> Single-file reference for AI coding tools (Lovable, Figma Make, v0.dev)

## Quick Start

Use these Tailwind classes to build GDS-compliant UIs.

## Design Tokens

### Colors

| Token | Hex | Tailwind |
|-------|-----|----------|
| Neptune (Primary) | #024DDF | \`bg-[#024DDF]\` |
| Cosmos (Dark) | #121212 | \`bg-[#121212]\` |
| Earth (Success) | #01A469 | \`bg-[#01A469]\` |
| Mars (Error) | #EB0000 | \`bg-[#EB0000]\` |
| Granite (Gray) | #646464 | \`bg-[#646464]\` |
| Slate (Light Gray) | #949494 | \`bg-[#949494]\` |
| Lunar (Border) | #D6D6D6 | \`bg-[#D6D6D6]\` |
| Spotlight (White) | #FFFFFF | \`bg-white\` |

### Spacing Scale

| Token | Value | Tailwind |
|-------|-------|----------|
| lounge | 4px | \`p-1\` |
| club | 8px | \`p-2\` |
| hall | 12px | \`p-3\` |
| auditorium | 16px | \`p-4\` |
| theatre | 20px | \`p-5\` |
| amphitheatre | 24px | \`p-6\` |
| arena | 32px | \`p-8\` |
| stadium | 48px | \`p-12\` |
| dome | 64px | \`p-16\` |
| field | 88px | \`p-22\` |

### Typography

| Token | Size | Tailwind |
|-------|------|----------|
| mauna | 64px | \`text-7xl\` |
| everest | 48px | \`text-5xl\` |
| kilimanjaro | 40px | \`text-4xl\` |
| matterhorn | 32px | \`text-3xl\` |
| vinson | 24px | \`text-2xl\` |
| blanc | 20px | \`text-xl\` |
| rainier | 18px | \`text-lg\` |
| fiji | 16px | \`text-base\` |

### Border Radius

\`\`\`
rounded-none  → 0px
rounded-sm    → 4px
rounded       → 8px (default)
rounded-lg    → 12px
rounded-full  → 9999px
\`\`\`

## Component Patterns

### Button

\`\`\`html
<!-- Primary -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8] focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2 disabled:bg-[#D6D6D6] disabled:text-[#949494] disabled:cursor-not-allowed transition-colors">
  Button Label
</button>

<!-- Secondary -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg border-2 border-[#024DDF] hover:bg-[#024DDF] hover:text-white transition-colors">
  Secondary
</button>

<!-- Ghost -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg hover:bg-[#024DDF]/10 transition-colors">
  Ghost
</button>
\`\`\`

### Input

\`\`\`html
<input
  type="text"
  class="w-full px-4 py-3 text-base border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:border-transparent placeholder:text-[#949494]"
  placeholder="Enter text..."
/>
\`\`\`

### Badge

\`\`\`html
<span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#024DDF] text-white">
  Badge
</span>
\`\`\`

### Card

\`\`\`html
<div class="p-6 bg-white rounded-xl shadow-md border border-[#D6D6D6]">
  <h3 class="text-lg font-semibold text-[#121212]">Card Title</h3>
  <p class="mt-2 text-[#646464]">Card content goes here.</p>
</div>
\`\`\`

### Alert

\`\`\`html
<!-- Info -->
<div class="flex items-center gap-3 p-4 rounded-lg bg-[#024DDF]/10 text-[#024DDF]">
  <span>ℹ️</span>
  <p>Information message</p>
</div>

<!-- Success -->
<div class="flex items-center gap-3 p-4 rounded-lg bg-[#01A469]/10 text-[#01A469]">
  <span>✓</span>
  <p>Success message</p>
</div>

<!-- Error -->
<div class="flex items-center gap-3 p-4 rounded-lg bg-[#EB0000]/10 text-[#EB0000]">
  <span>⚠</span>
  <p>Error message</p>
</div>
\`\`\`

### Modal

\`\`\`html
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
    <h2 class="text-xl font-semibold text-[#121212]">Modal Title</h2>
    <p class="mt-4 text-[#646464]">Modal content</p>
    <div class="flex justify-end gap-3 mt-6">
      <button class="px-4 py-2 text-[#646464] hover:bg-[#D6D6D6]/20 rounded-lg">Cancel</button>
      <button class="px-4 py-2 bg-[#024DDF] text-white rounded-lg hover:bg-[#0141B8]">Confirm</button>
    </div>
  </div>
</div>
\`\`\`

## Components Index

${docs.map(d => `- **${d.name}**: ${d.frontmatter.description || 'Component'}`).join('\n')}

---

Generated for GDS (Global Design System) | GitMCP: gitmcp.io/jamesodwyerGDS/GDS-MCP
`;

    await fs.writeFile(outputPath, content, 'utf-8');
    console.log(`Generated: ${outputPath}`);
  }

  /**
   * Extract variants from doc
   */
  extractVariants(doc) {
    const variants = [];

    // Check frontmatter
    if (doc.frontmatter.variants) {
      return doc.frontmatter.variants;
    }

    // Check content for variant patterns
    const variantMatch = doc.content.match(/variant[s]?.*?:.*?['"](\w+)['"]/gi);
    if (variantMatch) {
      variantMatch.forEach(m => {
        const v = m.match(/['"](\w+)['"]/)?.[1];
        if (v && !variants.includes(v)) variants.push(v);
      });
    }

    // Default variants for buttons
    if (doc.name.toLowerCase().includes('button')) {
      return ['primary', 'secondary', 'tertiary', 'ghost'];
    }

    return variants.length > 0 ? variants : ['default'];
  }

  /**
   * Extract Tailwind classes from doc
   */
  extractTailwindClasses(doc) {
    const name = doc.name.toLowerCase();

    // Default Tailwind patterns for common components
    const patterns = {
      button: {
        base: 'inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8] focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2 transition-colors',
        primary: 'inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8]',
        secondary: 'inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg border-2 border-[#024DDF] hover:bg-[#024DDF] hover:text-white',
        tertiary: 'inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg hover:bg-[#024DDF]/10',
        ghost: 'inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#646464] font-semibold rounded-lg hover:bg-[#D6D6D6]/20'
      },
      input: {
        base: 'w-full px-4 py-3 text-base border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:border-transparent placeholder:text-[#949494]',
        default: 'w-full px-4 py-3 text-base border border-[#D6D6D6] rounded-lg'
      },
      badge: {
        base: 'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#024DDF] text-white',
        default: 'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#024DDF] text-white'
      },
      alert: {
        base: 'flex items-center gap-3 p-4 rounded-lg bg-[#024DDF]/10 text-[#024DDF]',
        default: 'flex items-center gap-3 p-4 rounded-lg'
      },
      modal: {
        base: 'w-full max-w-md p-6 bg-white rounded-xl shadow-xl',
        default: 'w-full max-w-md p-6 bg-white rounded-xl shadow-xl'
      },
      default: {
        base: 'p-4 rounded-lg',
        default: 'p-4 rounded-lg'
      }
    };

    // Find matching pattern
    for (const key of Object.keys(patterns)) {
      if (name.includes(key)) {
        return patterns[key];
      }
    }

    return patterns.default;
  }

  /**
   * Format token mapping for display
   */
  formatTokenMapping(tokens) {
    let output = '';

    if (tokens.colours) {
      output += '**Colors:**\n';
      Object.entries(tokens.colours).forEach(([key, value]) => {
        output += `- ${key}: ${typeof value === 'object' ? value.hex : value}\n`;
      });
    }

    if (tokens.spacing) {
      output += '\n**Spacing:**\n';
      Object.entries(tokens.spacing).forEach(([key, value]) => {
        output += `- ${key}: ${typeof value === 'object' ? value.value : value}\n`;
      });
    }

    return output || 'See GDS design tokens.';
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

export default VibeDocGenerator;
