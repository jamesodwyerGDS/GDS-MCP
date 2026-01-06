/**
 * Storybook Documentation Generator
 *
 * Parses React components and Storybook stories from GDS-storybook-originals
 * and generates engineer-focused markdown documentation.
 *
 * @module core/storybook-doc-generator
 *
 * ## Overview
 *
 * This generator extracts documentation from React/TypeScript component source files
 * and their associated Storybook story files. It produces markdown files suitable
 * for consumption by engineers implementing the Global Design System.
 *
 * ## Documentation Flow
 *
 * ```
 * GDS-storybook-originals/
 * └── components/
 *     └── Button/
 *         ├── Button.tsx          → Source for props extraction
 *         └── __stories__/
 *             └── Button.stories.tsx  → Source for variants & examples
 *                        ↓
 *              StorybookDocGenerator
 *                        ↓
 *              docs-storybook/
 *              ├── components/button.md
 *              ├── tokens/
 *              │   ├── spacing.md
 *              │   ├── typography.md
 *              │   └── colors.md
 *              └── index.md
 * ```
 *
 * ## Extraction Strategy
 *
 * Props are extracted using regex patterns that match TypeScript interface/type
 * definitions. This approach is simpler than full AST parsing but handles the
 * common patterns used in the GDS codebase effectively.
 *
 * Variants are detected from:
 * 1. Union type definitions in the component (e.g., `variant: 'primary' | 'secondary'`)
 * 2. Named exports in Storybook story files (e.g., `export const Primary: Story = {}`)
 *
 * @example
 * ```javascript
 * import { StorybookDocGenerator } from './storybook-doc-generator.js';
 *
 * const generator = new StorybookDocGenerator({
 *   sourceDir: './GDS-storybook-originals',
 *   outputDir: './docs-storybook',
 *   baseUrl: 'http://localhost:6006'
 * });
 *
 * // Generate all component documentation
 * const results = await generator.generateAll();
 * console.log(`Generated ${results.filter(r => r.success).length} docs`);
 *
 * // Generate single component
 * await generator.generateComponent('Button');
 * ```
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

/**
 * Generator class for creating engineer-focused documentation from
 * React components and Storybook stories.
 *
 * @class StorybookDocGenerator
 */
export class StorybookDocGenerator {
  /**
   * Creates a new StorybookDocGenerator instance.
   *
   * @param {Object} config - Configuration options
   * @param {string} [config.sourceDir='./GDS-storybook-originals'] - Root directory containing
   *   the component source files. Should contain a `components/` subdirectory with individual
   *   component folders (e.g., `components/Button/Button.tsx`)
   * @param {string} [config.outputDir='./docs-storybook'] - Directory where generated markdown
   *   files will be written. Structure: `components/`, `tokens/`, and `index.md`
   * @param {string} [config.baseUrl='http://localhost:6006'] - Base URL for the Storybook
   *   instance, used to generate "View in Storybook" links
   * @param {string} [config.package='@gds/components'] - npm package name used in import
   *   statements within generated documentation
   *
   * @example
   * const generator = new StorybookDocGenerator({
   *   sourceDir: '/path/to/GDS-storybook-originals',
   *   outputDir: './docs-storybook',
   *   baseUrl: 'https://storybook.example.com',
   *   package: '@myorg/design-system'
   * });
   */
  constructor(config) {
    this.sourceDir = config.sourceDir || './GDS-storybook-originals';
    this.outputDir = config.outputDir || './docs-storybook';
    this.baseUrl = config.baseUrl || 'http://localhost:6006';
    this.package = config.package || '@gds/components';
  }

  /**
   * Generate documentation for all components in the source directory.
   *
   * Scans the `components/` subdirectory, filters out utility folders, and generates
   * documentation for each component. Also generates token documentation and an
   * index file linking to all generated docs.
   *
   * @async
   * @returns {Promise<Array<{name: string, success: boolean, error?: string}>>} Array of
   *   generation results, one per component. Each result contains:
   *   - `name`: Component name (e.g., 'Button')
   *   - `success`: Whether generation succeeded
   *   - `error`: Error message if generation failed
   *
   * @throws {Error} If the components directory cannot be read
   *
   * @example
   * const results = await generator.generateAll();
   *
   * // Check for failures
   * const failures = results.filter(r => !r.success);
   * if (failures.length > 0) {
   *   console.error('Failed components:', failures.map(f => f.name));
   * }
   *
   * @remarks
   * The following directories are excluded from generation:
   * - `shared` - Shared utilities used by multiple components
   * - `utils` - Helper functions
   * - `NewComponentTemplate` - Template folder for new components
   * - `__test__` - Test utilities
   */
  async generateAll() {
    const componentsDir = path.join(this.sourceDir, 'components');
    const entries = await fs.readdir(componentsDir, { withFileTypes: true });

    // Filter to only directories, excluding utility/template folders that don't
    // represent actual components
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

    // Generate tokens documentation (spacing, typography, colors)
    await this.generateTokensDocs();

    // Generate index file with links to all components and tokens
    await this.generateIndex(results);

    return results;
  }

  /**
   * Generate documentation for a single component.
   *
   * Reads the component's TypeScript source file and optional Storybook story file,
   * extracts props, variants, and code examples, then generates a markdown documentation
   * file with YAML frontmatter.
   *
   * @async
   * @param {string} componentName - Name of the component (e.g., 'Button', 'InputField').
   *   Should match the folder name in the components directory.
   * @returns {Promise<{name: string, path: string}|null>} Object containing the component
   *   name and output file path, or `null` if the component source file wasn't found.
   *
   * @throws {Error} If the component source file exists but cannot be read
   * @throws {Error} If the output file cannot be written
   *
   * @example
   * // Generate docs for a single component
   * const result = await generator.generateComponent('Button');
   * if (result) {
   *   console.log(`Documentation written to: ${result.path}`);
   * }
   *
   * @remarks
   * The generated markdown includes:
   * - YAML frontmatter with component metadata
   * - Import statement example
   * - Basic usage code snippet
   * - Props table (if props were extracted)
   * - Variants list (if variants were detected)
   * - Link to Storybook
   * - Source file reference
   */
  async generateComponent(componentName) {
    const componentDir = path.join(this.sourceDir, 'components', componentName);

    // Find main component file - tries multiple naming conventions
    const componentFile = await this.findComponentFile(componentDir, componentName);
    if (!componentFile) {
      console.warn(`No component file found for ${componentName}`);
      return null;
    }

    // Read component source for props extraction
    const componentSource = await fs.readFile(componentFile, 'utf-8');

    // Find and read story file for variants and examples
    const storyFile = await this.findStoryFile(componentDir);
    const storySource = storyFile ? await fs.readFile(storyFile, 'utf-8') : null;

    // Extract documentation data from source files
    const props = this.extractProps(componentSource);
    const variants = this.extractVariants(componentSource, storySource);
    const codeExample = this.extractCodeExample(componentSource, storySource, componentName);
    const storyId = this.generateStoryId(componentName);

    // Generate markdown content with frontmatter
    const markdown = this.generateMarkdown({
      name: componentName,
      props,
      variants,
      codeExample,
      storyId,
      storyUrl: `${this.baseUrl}/?path=/story/${storyId}`,
      sourceFile: path.relative(this.sourceDir, componentFile)
    });

    // Ensure output directory exists and write file
    const outputPath = path.join(this.outputDir, 'components', `${this.kebabCase(componentName)}.md`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, markdown, 'utf-8');

    console.log(`Generated: ${outputPath}`);
    return { name: componentName, path: outputPath };
  }

  /**
   * Find the main component file within a component directory.
   *
   * Searches for the component source file using common naming conventions.
   * The search order prioritizes `.tsx` files (TypeScript with JSX) over `.ts` files,
   * and named files over `index` files.
   *
   * @async
   * @param {string} componentDir - Absolute path to the component's directory
   * @param {string} componentName - Name of the component (e.g., 'Button')
   * @returns {Promise<string|null>} Absolute path to the component file, or `null` if not found
   *
   * @example
   * // For a Button component, searches in order:
   * // 1. Button.tsx      (preferred - named TypeScript+JSX file)
   * // 2. index.tsx       (barrel file with JSX)
   * // 3. Button.ts       (TypeScript without JSX - rare)
   * // 4. index.ts        (barrel file without JSX - rare)
   *
   * @remarks
   * The search order reflects GDS conventions where components are typically
   * defined in a file matching their name (e.g., `Button/Button.tsx`).
   * Falls back to `index.tsx` for components using barrel exports.
   */
  async findComponentFile(componentDir, componentName) {
    // Search order: named .tsx > index.tsx > named .ts > index.ts
    // This prioritizes TypeScript+JSX files which contain the actual component
    const possibleFiles = [
      `${componentName}.tsx`,  // Primary convention: Button/Button.tsx
      'index.tsx',             // Alternative: Button/index.tsx (barrel export)
      `${componentName}.ts`,   // Rare: non-JSX TypeScript
      'index.ts'               // Rare: non-JSX barrel export
    ];

    for (const file of possibleFiles) {
      const filePath = path.join(componentDir, file);
      try {
        await fs.access(filePath);
        return filePath;
      } catch {
        // File doesn't exist, try next option
        continue;
      }
    }
    return null;
  }

  /**
   * Find the Storybook story file for a component.
   *
   * Searches the component's `__stories__/` subdirectory for files ending in
   * `.stories.tsx` or `.stories.ts`. This follows the Storybook convention
   * where stories are co-located with components.
   *
   * @async
   * @param {string} componentDir - Absolute path to the component's directory
   * @returns {Promise<string|null>} Absolute path to the story file, or `null` if:
   *   - The `__stories__/` directory doesn't exist
   *   - No `.stories.tsx` or `.stories.ts` file is found
   *
   * @example
   * // For Button component at components/Button/
   * // Looks for: components/Button/__stories__/Button.stories.tsx
   *
   * @remarks
   * The GDS codebase uses `__stories__/` subdirectories (with double underscores)
   * rather than co-located `.stories.tsx` files. This matches the common
   * pattern for separating stories from component implementation.
   */
  async findStoryFile(componentDir) {
    const storiesDir = path.join(componentDir, '__stories__');
    try {
      const files = await fs.readdir(storiesDir);
      // Find first file matching Storybook naming convention
      const storyFile = files.find(f => f.endsWith('.stories.tsx') || f.endsWith('.stories.ts'));
      return storyFile ? path.join(storiesDir, storyFile) : null;
    } catch {
      // __stories__ directory doesn't exist
      return null;
    }
  }

  /**
   * Extract props from a TypeScript component source file.
   *
   * Parses the source code using regex to find TypeScript interface or type
   * definitions that follow the `*Props*` naming convention, then extracts
   * individual property definitions.
   *
   * @param {string} source - Raw TypeScript source code content
   * @returns {Array<{name: string, required: boolean, type: string}>} Array of prop objects:
   *   - `name`: Property name (e.g., 'onClick', 'variant')
   *   - `required`: `true` if the property doesn't have `?` modifier
   *   - `type`: TypeScript type annotation (e.g., `'string'`, `'() => void'`)
   *
   * @example
   * // Given this TypeScript source:
   * // interface ButtonProps {
   * //   variant: 'primary' | 'secondary';
   * //   disabled?: boolean;
   * //   onClick: () => void;
   * // }
   *
   * const props = generator.extractProps(source);
   * // Returns:
   * // [
   * //   { name: 'variant', required: true, type: "'primary' | 'secondary'" },
   * //   { name: 'disabled', required: false, type: 'boolean' },
   * //   { name: 'onClick', required: true, type: '() => void' }
   * // ]
   *
   * @remarks
   * ## Regex Pattern Explanation
   *
   * **Interface/Type Matcher:** `/(?:interface|type)\s+(\w*Props\w*)\s*(?:=\s*)?{([^}]+)}/s`
   * - `(?:interface|type)` - Matches either `interface` or `type` keyword
   * - `\s+` - One or more whitespace characters
   * - `(\w*Props\w*)` - Captures name containing "Props" (e.g., ButtonProps, InputFieldProps)
   * - `\s*(?:=\s*)?` - Optional `= ` for type aliases (e.g., `type Props = { ... }`)
   * - `{([^}]+)}` - Captures everything between braces (the prop definitions)
   * - `s` flag - Enables `.` to match newlines (multiline interface bodies)
   *
   * **Property Matcher:** `/^\s*(\w+)(\?)?:\s*([^;]+)/`
   * - `^\s*` - Start of line with optional leading whitespace
   * - `(\w+)` - Captures the property name
   * - `(\?)?` - Optionally captures the `?` modifier (marks as optional)
   * - `:\s*` - Colon followed by optional whitespace
   * - `([^;]+)` - Captures the type annotation (everything until semicolon or newline)
   *
   * ## Limitations
   *
   * - Does not handle multi-line type annotations that span multiple lines
   * - Does not parse JSDoc comments for descriptions
   * - Does not resolve imported types or generics
   * - May miss props if the interface name doesn't contain "Props"
   */
  extractProps(source) {
    const props = [];

    // Match interface or type definitions for props
    // Pattern: `interface ButtonProps { ... }` or `type InputProps = { ... }`
    // The `s` flag enables `.` to match newlines for multiline interfaces
    const propsMatch = source.match(/(?:interface|type)\s+(\w*Props\w*)\s*(?:=\s*)?{([^}]+)}/s);
    if (propsMatch) {
      const propsBody = propsMatch[2];
      // Split into lines and filter out comments and empty lines
      const propLines = propsBody.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));

      for (const line of propLines) {
        // Match pattern: `propName?: type;`
        // Group 1: property name, Group 2: optional `?`, Group 3: type
        const propMatch = line.match(/^\s*(\w+)(\?)?:\s*([^;]+)/);
        if (propMatch) {
          props.push({
            name: propMatch[1],
            required: !propMatch[2],  // Required if no `?` modifier
            type: propMatch[3].trim().replace(/;$/, '')  // Remove trailing semicolon
          });
        }
      }
    }

    return props;
  }

  /**
   * Extract component variants from source code and Storybook stories.
   *
   * Uses a two-phase detection strategy:
   * 1. **Component source:** Looks for union type definitions (e.g., `'primary' | 'secondary'`)
   *    associated with variant-related properties like `colorVariant`, `variant`, or `size`
   * 2. **Story exports:** Extracts named story exports which often represent variants
   *    (e.g., `export const Primary: Story = {}`)
   *
   * @param {string} componentSource - Raw TypeScript source code of the component
   * @param {string|null} storySource - Raw TypeScript source code of the Storybook story file,
   *   or `null` if no story file exists
   * @returns {string[]} Array of unique variant names (e.g., `['primary', 'secondary', 'tertiary']`)
   *
   * @example
   * // Given component source:
   * // type Props = { variant: 'primary' | 'secondary' | 'ghost' }
   * //
   * // And story source:
   * // export const Primary: Story = { args: { variant: 'primary' } }
   * // export const Secondary: Story = { args: { variant: 'secondary' } }
   * // export const WithIcon: Story = { args: { variant: 'primary', icon: <Icon /> } }
   *
   * const variants = generator.extractVariants(componentSource, storySource);
   * // Returns: ['primary', 'secondary', 'ghost', 'WithIcon']
   *
   * @remarks
   * ## Detection Algorithm
   *
   * ### Phase 1: Union Type Detection
   * First checks if source contains variant-related properties:
   * - Pattern: `/(?:colorVariant|variant|size)\s*[?:]?\s*['"]?(\w+)['"]?\s*\|/g`
   * - Matches: `variant: 'primary' |`, `colorVariant?: "main" |`, `size: 'sm' |`
   *
   * If found, extracts all string literals from union types:
   * - Pattern: `/['"](\w+)['"]\s*\|/g`
   * - Matches: `'primary' |`, `"secondary" |`
   *
   * ### Phase 2: Story Export Detection
   * Extracts named exports from the story file:
   * - Pattern: `/export const (\w+):/g`
   * - Matches: `export const Primary:`, `export const Secondary:`
   * - Excludes: `default` (the meta export)
   *
   * This catches variants that might not be in the type definition but are
   * demonstrated in stories (e.g., combined variants like `PrimaryWithIcon`).
   *
   * ## Limitations
   *
   * - May include non-variant story exports (e.g., `WithLongText` examples)
   * - Only detects single-word variants (no spaces or hyphens)
   * - Does not distinguish between different variant properties (mixes colorVariant, size, etc.)
   */
  extractVariants(componentSource, storySource) {
    const variants = [];

    // Phase 1: Look for variant-related union types in the component source
    // Matches property definitions like: `variant: 'primary' | 'secondary'`
    const variantMatch = componentSource.match(/(?:colorVariant|variant|size)\s*[?:]?\s*['"]?(\w+)['"]?\s*\|/g);
    if (variantMatch) {
      // Found variant property - extract all string literal values from unions
      // Pattern matches: `'value' |` to capture union members
      const allVariants = componentSource.match(/['"](\w+)['"]\s*\|/g) || [];
      allVariants.forEach(v => {
        const value = v.match(/['"](\w+)['"]/)?.[1];
        if (value && !variants.includes(value)) {
          variants.push(value);
        }
      });
    }

    // Phase 2: Extract named story exports which often represent variants
    // Pattern: `export const Primary: Story = { ... }`
    if (storySource) {
      const storyExports = storySource.match(/export const (\w+):/g) || [];
      storyExports.forEach(exp => {
        const name = exp.match(/export const (\w+):/)?.[1];
        // Exclude 'default' which is the meta/config export, not a variant
        if (name && name !== 'default' && !variants.includes(name)) {
          variants.push(name);
        }
      });
    }

    return variants;
  }

  /**
   * Extract a JSX code example for the component.
   *
   * Attempts to extract a meaningful code example from the Storybook story file.
   * Falls back to generating a generic example if no suitable code is found.
   *
   * @param {string} componentSource - Raw TypeScript source code of the component (currently unused)
   * @param {string|null} storySource - Raw TypeScript source code of the Storybook story file
   * @param {string} componentName - Name of the component (e.g., 'Button')
   * @returns {string} JSX code example as a string
   *
   * @example
   * // If story contains: render: (args) => (<Button {...args}>Click me</Button>)
   * const example = generator.extractCodeExample(src, story, 'Button');
   * // Returns: '<Button {...args}>Click me</Button>'
   *
   * // If no render function found:
   * const example = generator.extractCodeExample(src, null, 'Button');
   * // Returns: '<Button>Content</Button>'
   *
   * @remarks
   * ## Extraction Strategy
   *
   * The method looks for Storybook's `render` function pattern:
   * - Pattern: `/render:\s*\([^)]*\)\s*=>\s*\(([^)]+<[^>]+>[^<]*<\/[^>]+>)\)/s`
   * - Matches: `render: (args) => (<Component>...</Component>)`
   *
   * ## Pattern Breakdown
   * - `render:\s*` - The render property
   * - `\([^)]*\)` - Arrow function parameters (e.g., `(args)`)
   * - `\s*=>\s*` - Arrow function syntax
   * - `\(` - Opening parenthesis of returned JSX
   * - `([^)]+<[^>]+>[^<]*<\/[^>]+>)` - Captures JSX element with opening/closing tags
   *
   * ## Fallback Behavior
   *
   * If no render function is found (or no story exists), generates a minimal
   * example: `<ComponentName>Content</ComponentName>`
   *
   * ## Limitations
   *
   * - Only extracts from `render` functions, not from `args` or `template`
   * - May not capture complex nested JSX structures
   * - Fallback example is generic and may not represent actual usage
   */
  extractCodeExample(componentSource, storySource, componentName) {
    // Try to extract from Storybook's render function first
    if (storySource) {
      // Match render functions: `render: (args) => (<Component>...</Component>)`
      const renderMatch = storySource.match(/render:\s*\([^)]*\)\s*=>\s*\(([^)]+<[^>]+>[^<]*<\/[^>]+>)\)/s);
      if (renderMatch) {
        return renderMatch[1].trim();
      }
    }

    // Fallback: Generate a minimal generic example
    return `<${componentName}>Content</${componentName}>`;
  }

  /**
   * Generate the Storybook story ID for a component.
   *
   * Storybook uses a specific ID format for navigating to stories via URL.
   * This generates the ID following Storybook's naming convention.
   *
   * @param {string} componentName - PascalCase component name (e.g., 'InputField')
   * @returns {string} Storybook story ID (e.g., 'components-input-field--default')
   *
   * @example
   * generator.generateStoryId('Button');       // 'components-button--default'
   * generator.generateStoryId('InputField');   // 'components-input-field--default'
   * generator.generateStoryId('DatePicker');   // 'components-date-picker--default'
   *
   * @remarks
   * ## Storybook ID Format
   *
   * Storybook IDs follow the pattern: `{category}-{component}--{story}`
   *
   * - **Category:** Always `components` for GDS components
   * - **Component:** kebab-case version of the component name
   * - **Story:** The story name, defaulting to `default` for the primary story
   *
   * ## URL Usage
   *
   * The ID is used in Storybook URLs:
   * `http://localhost:6006/?path=/story/components-button--default`
   */
  generateStoryId(componentName) {
    return `components-${this.kebabCase(componentName)}--default`;
  }

  /**
   * Generate the complete markdown documentation file content for a component.
   *
   * Creates a markdown file with YAML frontmatter containing component metadata,
   * followed by documentation sections including import statements, usage examples,
   * props table, variants list, and links to Storybook.
   *
   * @param {Object} data - Component documentation data
   * @param {string} data.name - Component name (e.g., 'Button')
   * @param {Array<{name: string, required: boolean, type: string}>} data.props - Extracted props
   * @param {string[]} data.variants - List of variant names
   * @param {string} data.codeExample - JSX code example
   * @param {string} data.storyId - Storybook story ID
   * @param {string} data.storyUrl - Full URL to the Storybook story
   * @param {string} data.sourceFile - Relative path to source file
   * @returns {string} Complete markdown content with YAML frontmatter
   *
   * @example
   * const markdown = generator.generateMarkdown({
   *   name: 'Button',
   *   props: [{ name: 'variant', required: true, type: "'primary' | 'secondary'" }],
   *   variants: ['primary', 'secondary'],
   *   codeExample: '<Button variant="primary">Click</Button>',
   *   storyId: 'components-button--default',
   *   storyUrl: 'http://localhost:6006/?path=/story/components-button--default',
   *   sourceFile: 'components/Button/Button.tsx'
   * });
   *
   * @remarks
   * ## Output Structure
   *
   * ```markdown
   * ---
   * name: Button
   * description: Button component from the Global Design System
   * package: @gds/components
   * storyUrl: http://localhost:6006/?path=/story/...
   * storyId: components-button--default
   * sourceFile: components/Button/Button.tsx
   * ---
   *
   * # Button
   *
   * ## Import
   * ...
   *
   * ## Basic Usage
   * ...
   *
   * ## Props (if any)
   * ...
   *
   * ## Variants (if any)
   * ...
   *
   * ## Storybook
   * ...
   *
   * ## Source
   * ...
   * ```
   *
   * Uses the `gray-matter` library to stringify the frontmatter + content.
   */
  generateMarkdown({ name, props, variants, codeExample, storyId, storyUrl, sourceFile }) {
    // YAML frontmatter for metadata and indexing
    const frontmatter = {
      name,
      description: `${name} component from the Global Design System`,
      package: this.package,
      storyUrl,
      storyId,
      sourceFile
    };

    // Build markdown content with conditional sections
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

    // Use gray-matter to combine frontmatter and content
    return matter.stringify(content, frontmatter);
  }

  /**
   * Generate documentation for all design tokens.
   *
   * Reads the raw TypeScript source files for spacing, typography, and color tokens
   * from the source directory and generates markdown documentation files for each.
   *
   * @async
   * @throws {Error} If any token source file cannot be read
   *
   * @remarks
   * ## Token Sources
   *
   * - **Spacing:** `{sourceDir}/dimensions/spacing.ts`
   * - **Typography:** `{sourceDir}/dimensions/typography.ts`
   * - **Colors:** `{sourceDir}/themes/TM.ts` (TM = Theme Manager)
   *
   * ## Output Files
   *
   * - `{outputDir}/tokens/spacing.md`
   * - `{outputDir}/tokens/typography.md`
   * - `{outputDir}/tokens/colors.md`
   *
   * These are referenced from the generated index file.
   */
  async generateTokensDocs() {
    // Spacing tokens - defines spacing scale (lounge, club, auditorium, etc.)
    const spacingFile = path.join(this.sourceDir, 'dimensions', 'spacing.ts');
    const spacingSource = await fs.readFile(spacingFile, 'utf-8');
    await this.generateTokenDoc('spacing', spacingSource);

    // Typography tokens - defines font scales (fiji, mauna, everest, etc.)
    const typographyFile = path.join(this.sourceDir, 'dimensions', 'typography.ts');
    const typographySource = await fs.readFile(typographyFile, 'utf-8');
    await this.generateTokenDoc('typography', typographySource);

    // Color tokens from theme - defines semantic colors (neptune, cosmos, earth, etc.)
    const themesFile = path.join(this.sourceDir, 'themes', 'TM.ts');
    const themesSource = await fs.readFile(themesFile, 'utf-8');
    await this.generateTokenDoc('colors', themesSource);
  }

  /**
   * Generate a single token documentation file.
   *
   * Creates a markdown file containing the raw TypeScript source code for a token type.
   * The source is included as a code block for engineers to reference directly.
   *
   * @async
   * @param {string} tokenType - Type of token ('spacing', 'typography', or 'colors')
   * @param {string} source - Raw TypeScript source code content
   * @throws {Error} If the output file cannot be written
   *
   * @example
   * // Generates: docs-storybook/tokens/spacing.md
   * await generator.generateTokenDoc('spacing', spacingSourceCode);
   *
   * @remarks
   * ## Content Truncation
   *
   * If the source exceeds 2000 characters, it is truncated with a
   * `// ... truncated` comment. This prevents excessively large doc files
   * while still providing useful reference material.
   *
   * ## Output Format
   *
   * ```markdown
   * ---
   * name: spacing
   * type: tokens
   * ---
   *
   * # Spacing Tokens
   *
   * ```typescript
   * // Source code here...
   * ```
   * ```
   */
  async generateTokenDoc(tokenType, source) {
    const outputPath = path.join(this.outputDir, 'tokens', `${tokenType}.md`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Truncate large source files to prevent excessive doc sizes
    // 2000 chars is roughly 40-50 lines of code
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
   * Generate the documentation index file.
   *
   * Creates a master index file that links to all generated component docs
   * and token docs, providing a navigable entry point for the documentation.
   *
   * @async
   * @param {Array<{name: string, success: boolean, error?: string}>} results - Array of
   *   generation results from `generateAll()`. Only successful results are included.
   * @throws {Error} If the index file cannot be written
   *
   * @example
   * const results = await generator.generateAll();
   * // Index is automatically generated, but can be called separately:
   * await generator.generateIndex(results);
   *
   * @remarks
   * ## Output Location
   *
   * Written to `{outputDir}/index.md`
   *
   * ## Content Structure
   *
   * - **Header:** Title and description
   * - **Components list:** Links to all successfully generated component docs
   * - **Tokens list:** Links to spacing, typography, and colors docs
   * - **Storybook:** Instructions for running Storybook locally
   *
   * ## Filtering
   *
   * Only components that were successfully documented (where `success: true`)
   * are included in the index. Failed components are excluded to prevent
   * broken links.
   */
  async generateIndex(results) {
    // Filter to only successfully generated components
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
   * Convert a string to kebab-case.
   *
   * Transforms PascalCase, camelCase, snake_case, or space-separated strings
   * into lowercase hyphen-separated format.
   *
   * @param {string} str - Input string in any case format
   * @returns {string} kebab-case string
   *
   * @example
   * generator.kebabCase('ButtonGroup');   // 'button-group'
   * generator.kebabCase('inputField');    // 'input-field'
   * generator.kebabCase('Date_Picker');   // 'date-picker'
   * generator.kebabCase('modal dialog');  // 'modal-dialog'
   *
   * @remarks
   * ## Transformation Rules
   *
   * Applied in order:
   * 1. **PascalCase/camelCase:** Insert hyphen between lowercase and uppercase
   *    - `ButtonGroup` → `Button-Group`
   * 2. **Spaces/underscores:** Replace with hyphens
   *    - `Button-Group` → `Button-Group` (no change)
   *    - `date_picker` → `date-picker`
   * 3. **Lowercase:** Convert entire string to lowercase
   *    - `Button-Group` → `button-group`
   */
  kebabCase(str) {
    return str
      // Insert hyphen between lowercase and uppercase letters (handles PascalCase/camelCase)
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      // Convert to lowercase
      .toLowerCase();
  }
}

export default StorybookDocGenerator;
