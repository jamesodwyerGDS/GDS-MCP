/**
 * Markdown Transformer
 *
 * Transforms Figma component data into structured markdown documentation
 * optimized for LLM retrieval. Generates design-only documentation without
 * framework-specific code (React, Vue, etc.).
 */

import matter from 'gray-matter';

export class MarkdownTransformer {
  /**
   * Generate complete markdown documentation for a component
   * @param {object} componentData - Combined data from Figma extraction
   * @returns {string} - Complete markdown with frontmatter
   */
  transform(componentData) {
    const frontmatter = this.generateFrontmatter(componentData);
    const content = this.generateContent(componentData);

    return matter.stringify(content, frontmatter);
  }

  /**
   * Generate YAML frontmatter from component data
   */
  generateFrontmatter(data) {
    const today = new Date().toISOString().split('T')[0];

    return {
      name: data.name || 'Unnamed Component',
      description: data.description || `${data.name} component`,
      category: this.inferCategory(data),
      status: 'draft',
      version: '1.0.0',
      updated: today,
      tags: this.generateTags(data),
      keywords: this.generateKeywords(data),
      dependencies: data.dependencies || [],
      relatedComponents: data.relatedComponents || [],
      tokens: {
        colours: data.tokens?.colours || [],
        spacing: data.tokens?.spacing || [],
        typography: data.tokens?.typography || [],
        elevation: data.tokens?.elevation || [],
        breakpoints: data.tokens?.breakpoints || []
      },
      tailwind: this.generateTailwindMappings(data),
      cssVariables: this.generateCSSVariablesList(data),
      accessibility: {
        wcagLevel: 'AA',
        keyboardNavigable: true,
        ariaRoles: this.inferAriaRoles(data)
      },
      figmaNodeId: data.figmaNodeId || null,
      figmaFileKey: data.figmaFileKey || null
    };
  }

  /**
   * Generate markdown content sections
   */
  generateContent(data) {
    const sections = [];

    // Overview
    sections.push(this.generateOverview(data));

    // Variants
    if (data.variants?.length > 0) {
      sections.push(this.generateVariants(data.variants));
    }

    // States
    sections.push(this.generateStates(data));

    // Properties (design properties, not React props)
    sections.push(this.generateProperties(data));

    // Styling (typography, spacing, colours, elevation)
    sections.push(this.generateStyling(data));

    // Accessibility
    sections.push(this.generateAccessibility(data));

    // Do's and Don'ts
    sections.push(this.generateDosDonts(data));

    // CSS Custom Properties
    sections.push(this.generateCSSCustomProperties(data));

    // Tailwind Configuration
    sections.push(this.generateTailwindConfig(data));

    // Figma Variables
    sections.push(this.generateVariables(data));

    // Related Components
    if (data.relatedComponents?.length > 0) {
      sections.push(this.generateRelatedComponents(data.relatedComponents));
    }

    // Changelog
    sections.push(this.generateChangelog(data));

    return sections.join('\n\n');
  }

  generateOverview(data) {
    return `# ${data.name}

## Overview

${data.description || `The ${data.name} component provides...`}

### When to use

- Use ${data.name} when...

### When not to use

- Do not use ${data.name} for...`;
  }

  generateVariants(variants) {
    const rows = variants.map(v => {
      const props = Object.entries(v.properties || {})
        .map(([k, val]) => `${k}: ${val}`)
        .join(', ');
      return `| ${v.name} | ${props} |`;
    });

    return `## Variants

| Variant | Properties |
|---------|------------|
${rows.join('\n')}`;
  }

  generateStates(data) {
    const states = data.states || [
      { name: 'Default', description: 'Resting state' },
      { name: 'Hover', description: 'Mouse over interaction' },
      { name: 'Pressed', description: 'Active/clicked state' },
      { name: 'Disabled', description: 'Non-interactive state' },
      { name: 'Focus', description: 'Keyboard focus state' }
    ];

    const rows = states.map(s => `| ${s.name} | ${s.description} |`);

    return `## States

| State | Description |
|-------|-------------|
${rows.join('\n')}`;
  }

  generateProperties(data) {
    const properties = data.properties || this.inferProperties(data);

    if (properties.length === 0) {
      return `## Properties

_No variant properties defined._`;
    }

    const rows = properties.map(p =>
      `| ${p.name} | ${p.values?.join(', ') || '-'} | ${p.default || '-'} |`
    );

    return `## Properties

| Property | Values | Default |
|----------|--------|---------|
${rows.join('\n')}`;
  }

  inferProperties(data) {
    const properties = [];

    if (data.variants?.length > 0) {
      const propKeys = new Set();
      data.variants.forEach(v => {
        Object.keys(v.properties || {}).forEach(k => propKeys.add(k));
      });

      propKeys.forEach(key => {
        const values = data.variants
          .map(v => v.properties?.[key])
          .filter(Boolean);
        const uniqueValues = [...new Set(values)];

        properties.push({
          name: key,
          values: uniqueValues,
          default: uniqueValues[0] || null
        });
      });
    }

    return properties;
  }

  generateStyling(data) {
    const tokens = data.tokens || {};
    let content = `## Styling\n`;

    // Typography
    if (tokens.typography && (Array.isArray(tokens.typography) ? tokens.typography.length > 0 : Object.keys(tokens.typography).length > 0)) {
      content += `\n### Typography\n\n`;
      content += `| Property | Value |\n|----------|-------|\n`;
      if (Array.isArray(tokens.typography)) {
        tokens.typography.forEach(t => {
          content += `| Token | ${t} |\n`;
        });
      } else {
        Object.entries(tokens.typography).forEach(([key, value]) => {
          content += `| ${key} | ${value} |\n`;
        });
      }
    }

    // Spacing
    if (tokens.spacing && (Array.isArray(tokens.spacing) ? tokens.spacing.length > 0 : Object.keys(tokens.spacing).length > 0)) {
      content += `\n### Spacing\n\n`;
      content += `| Area | Token/Value |\n|------|-------------|\n`;
      if (Array.isArray(tokens.spacing)) {
        tokens.spacing.forEach(s => {
          content += `| - | ${s} |\n`;
        });
      } else {
        Object.entries(tokens.spacing).forEach(([key, value]) => {
          const val = typeof value === 'object' ? `${value.token || ''} ${value.value || ''}`.trim() : value;
          content += `| ${key} | ${val} |\n`;
        });
      }
    }

    // Colours
    if (tokens.colours && (Array.isArray(tokens.colours) ? tokens.colours.length > 0 : Object.keys(tokens.colours).length > 0)) {
      content += `\n### Colours\n\n`;
      content += `| State/Use | Token/Value |\n|-----------|-------------|\n`;
      if (Array.isArray(tokens.colours)) {
        tokens.colours.forEach(c => {
          content += `| - | ${c} |\n`;
        });
      } else {
        Object.entries(tokens.colours).forEach(([key, value]) => {
          const val = typeof value === 'object' ? `${value.token || key} ${value.hex || ''}`.trim() : value;
          content += `| ${key} | ${val} |\n`;
        });
      }
    }

    // Elevation
    if (tokens.elevation && (Array.isArray(tokens.elevation) ? tokens.elevation.length > 0 : Object.keys(tokens.elevation).length > 0)) {
      content += `\n### Elevation\n\n`;
      content += `| Level | Value |\n|-------|-------|\n`;
      if (Array.isArray(tokens.elevation)) {
        tokens.elevation.forEach(e => {
          content += `| - | ${e} |\n`;
        });
      } else {
        Object.entries(tokens.elevation).forEach(([key, value]) => {
          content += `| ${key} | ${value} |\n`;
        });
      }
    }

    return content;
  }

  generateAccessibility(data) {
    return `## Accessibility

- **Keyboard navigation**: Fully keyboard accessible
- **Screen readers**: Proper ARIA labels and roles
- **Focus management**: Visible focus indicators
- **Color contrast**: Meets WCAG 2.1 AA requirements`;
  }

  generateDosDonts(data) {
    const dos = data.guidelines?.dos || [
      'Use consistent spacing within the component',
      'Maintain visual hierarchy',
      'Follow the design system colour tokens'
    ];

    const donts = data.guidelines?.donts || [
      'Do not override the default styling without design approval',
      'Do not use for purposes outside the intended use case',
      'Do not mix variants inconsistently'
    ];

    return `## Do's and Don'ts

### Do's

${dos.map(d => `- ${d}`).join('\n')}

### Don'ts

${donts.map(d => `- ${d}`).join('\n')}`;
  }

  generateCSSCustomProperties(data) {
    const cssVars = this.generateCSSVariablesList(data);

    if (cssVars.length === 0) {
      return `## CSS Custom Properties

\`\`\`css
:root {
  /* No custom properties defined */
}
\`\`\``;
    }

    return `## CSS Custom Properties

\`\`\`css
:root {
${cssVars.map(v => `  ${v.name}: ${v.value};`).join('\n')}
}
\`\`\``;
  }

  generateCSSVariablesList(data) {
    const vars = [];
    const name = this.kebabCase(data.name);
    const tokens = data.tokens || {};

    if (tokens.colours) {
      const colours = Array.isArray(tokens.colours) ? tokens.colours : Object.entries(tokens.colours);
      if (Array.isArray(tokens.colours)) {
        tokens.colours.forEach((c, i) => {
          vars.push({ name: `--${name}-color-${i + 1}`, value: c });
        });
      } else {
        Object.entries(tokens.colours).forEach(([key, value]) => {
          const hex = typeof value === 'object' ? value.hex || value.default : value;
          vars.push({ name: `--${name}-${this.kebabCase(key)}`, value: hex });
        });
      }
    }

    if (tokens.spacing) {
      if (Array.isArray(tokens.spacing)) {
        tokens.spacing.forEach((s, i) => {
          vars.push({ name: `--${name}-spacing-${i + 1}`, value: s });
        });
      } else {
        Object.entries(tokens.spacing).forEach(([key, value]) => {
          const val = typeof value === 'object' ? value.value : value;
          vars.push({ name: `--${name}-${this.kebabCase(key)}`, value: val });
        });
      }
    }

    return vars;
  }

  generateTailwindConfig(data) {
    const mappings = this.generateTailwindMappings(data);

    return `## Tailwind Configuration

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: ${JSON.stringify(mappings, null, 6).split('\n').map((line, i) => i === 0 ? line : '    ' + line).join('\n')}
  }
}
\`\`\``;
  }

  generateTailwindMappings(data) {
    const mappings = { colors: {}, spacing: {} };
    const name = this.kebabCase(data.name);
    const tokens = data.tokens || {};

    if (tokens.colours) {
      if (Array.isArray(tokens.colours)) {
        tokens.colours.forEach((c, i) => {
          mappings.colors[`${name}-${i + 1}`] = c;
        });
      } else {
        Object.entries(tokens.colours).forEach(([key, value]) => {
          const hex = typeof value === 'object' ? value.hex || value.default : value;
          mappings.colors[`${name}-${this.kebabCase(key)}`] = hex;
        });
      }
    }

    if (tokens.spacing) {
      if (Array.isArray(tokens.spacing)) {
        tokens.spacing.forEach((s, i) => {
          mappings.spacing[`${name}-${i + 1}`] = s;
        });
      } else {
        Object.entries(tokens.spacing).forEach(([key, value]) => {
          const val = typeof value === 'object' ? value.value : value;
          mappings.spacing[`${name}-${this.kebabCase(key)}`] = val;
        });
      }
    }

    return mappings;
  }

  generateVariables(data) {
    if (!data.figmaVariables || data.figmaVariables.length === 0) {
      return `## Figma Variables

_Variables extracted from Figma file. Run generation with \`--sync-variables\` to update._`;
    }

    const rows = data.figmaVariables.map(v =>
      `| ${v.name} | ${v.type} | ${v.value} |`
    );

    return `## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
${rows.join('\n')}`;
  }

  generateChangelog(data) {
    const changelog = data.changelog || [
      { version: '1.0.0', date: new Date().toISOString().split('T')[0], changes: 'Initial release' }
    ];

    const rows = changelog.map(c =>
      `| ${c.version} | ${c.date} | ${c.changes} |`
    );

    return `## Changelog

| Version | Date | Changes |
|---------|------|---------|
${rows.join('\n')}`;
  }

  generateRelatedComponents(related) {
    const items = related.map(r =>
      `- [${r.name}](./${this.kebabCase(r.name)}.md) - ${r.relationship}`
    );

    return `## Related Components

${items.join('\n')}`;
  }

  // Utility methods

  inferCategory(data) {
    const name = (data.name || '').toLowerCase();
    if (['button', 'icon', 'input', 'label', 'badge', 'avatar'].some(a => name.includes(a))) {
      return 'atoms';
    }
    if (['card', 'form', 'search', 'menu'].some(m => name.includes(m))) {
      return 'molecules';
    }
    if (['nav', 'header', 'footer', 'sidebar'].some(o => name.includes(o))) {
      return 'organisms';
    }
    return 'components';
  }

  generateTags(data) {
    const tags = [];
    const category = this.inferCategory(data);
    tags.push(category);

    if (data.layoutMode) tags.push('layout');
    if (data.variants?.length > 0) tags.push('variants');

    return tags;
  }

  generateKeywords(data) {
    const keywords = [data.name?.toLowerCase()];
    if (data.variants) {
      data.variants.forEach(v => {
        Object.values(v.properties || {}).forEach(val => {
          keywords.push(val.toLowerCase());
        });
      });
    }
    return [...new Set(keywords)].filter(Boolean);
  }

  inferAriaRoles(data) {
    const name = (data.name || '').toLowerCase();
    if (name.includes('button')) return ['button'];
    if (name.includes('input')) return ['textbox'];
    if (name.includes('nav')) return ['navigation'];
    if (name.includes('menu')) return ['menu'];
    return [];
  }

  pascalCase(str) {
    if (!str) return '';
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  camelCase(str) {
    const pascal = this.pascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  kebabCase(str) {
    if (!str) return '';
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
}

export default MarkdownTransformer;
