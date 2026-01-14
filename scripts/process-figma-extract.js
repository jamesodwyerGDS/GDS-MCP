#!/usr/bin/env node

/**
 * Process Figma Extract Data
 *
 * Transforms raw Figma JSON data from docs/figma-extract/ into polished
 * component documentation using the existing MarkdownTransformer pipeline.
 *
 * For existing components: merges new data while preserving hand-written content
 * For new components: generates complete documentation from scratch
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { MarkdownTransformer } from '../core/markdown-transformer.js';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_EXTRACT_DIR = path.join(__dirname, '../docs/figma-extract');
const COMPONENTS_DIR = path.join(__dirname, '../docs/figma-extract/components');
const ATOMS_DIR = path.join(__dirname, '../docs/components/atoms');

class FigmaExtractProcessor {
  constructor() {
    this.transformer = new MarkdownTransformer();
    this.processed = [];
    this.errors = [];
  }

  /**
   * Main processing entry point
   */
  async process() {
    console.log('🚀 Starting Figma extract processing...\n');

    // Get all JSON files from figma-extract/components
    const jsonFiles = await this.findJSONFiles(COMPONENTS_DIR);
    console.log(`📁 Found ${jsonFiles.length} component JSON files\n`);

    for (const jsonPath of jsonFiles) {
      try {
        await this.processComponent(jsonPath);
      } catch (error) {
        console.error(`❌ Error processing ${path.basename(jsonPath)}: ${error.message}`);
        this.errors.push({ file: jsonPath, error: error.message });
      }
    }

    // Print summary
    this.printSummary();
  }

  /**
   * Find all JSON files in a directory
   */
  async findJSONFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries
      .filter(entry => entry.isFile() && entry.name.endsWith('.json'))
      .map(entry => path.join(dir, entry.name));
    return files;
  }

  /**
   * Process a single component JSON file
   */
  async processComponent(jsonPath) {
    const fileName = path.basename(jsonPath, '.json');
    console.log(`📄 Processing: ${fileName}`);

    // Read and parse JSON
    const rawData = await fs.readFile(jsonPath, 'utf-8');
    const figmaData = JSON.parse(rawData);

    // Skip if not an atomic component
    const category = this.inferCategory(figmaData);
    if (category !== 'atoms') {
      console.log(`  ⏭️  Skipping (not an atom): ${category} - ${figmaData.name}\n`);
      return;
    }

    // Transform Figma data to component data format
    const componentData = this.transformFigmaData(figmaData);

    // Clean up the component name (remove emojis, special chars)
    const cleanName = this.cleanComponentName(componentData.name);
    componentData.name = cleanName;

    // Generate filename
    const outputFileName = this.transformer.kebabCase(cleanName) + '.md';
    const outputPath = path.join(ATOMS_DIR, outputFileName);

    // Check if component already exists
    const exists = await this.fileExists(outputPath);

    if (exists) {
      // Merge with existing documentation
      await this.mergeWithExisting(outputPath, componentData);
      console.log(`  ✅ Merged: ${outputFileName}\n`);
    } else {
      // Generate new documentation
      const markdown = this.transformer.transform(componentData);
      await fs.writeFile(outputPath, markdown, 'utf-8');
      console.log(`  ✨ Created: ${outputFileName}\n`);
    }

    this.processed.push({
      name: componentData.name,
      path: outputPath,
      action: exists ? 'merged' : 'created'
    });
  }

  /**
   * Transform raw Figma JSON data to componentData format expected by MarkdownTransformer
   */
  transformFigmaData(figmaData) {
    const componentData = {
      name: figmaData.name || 'Unknown Component',
      description: figmaData.description || `${figmaData.name} component`,
      category: 'atoms', // Force atoms category for all processed components
      figmaNodeId: figmaData.id,
      figmaFileKey: null, // Not available in the extract
      variants: [],
      states: [],
      properties: [],
      tokens: {
        colours: [], // Validator expects arrays, not objects
        spacing: [],
        typography: [],
        elevation: []
      },
      guidelines: {
        dos: [],
        donts: []
      }
    };

    // Process variants
    if (figmaData.variants && Array.isArray(figmaData.variants)) {
      componentData.variants = figmaData.variants.map(variant => ({
        name: variant.name || variant.state || 'Default',
        id: variant.id,
        properties: variant.properties || {}
      }));

      // Extract unique states from variants
      const states = new Set();
      figmaData.variants.forEach(v => {
        if (v.state && v.state !== 'Unknown') {
          states.add(v.state);
        }
      });

      if (states.size > 0) {
        componentData.states = Array.from(states).map(state => ({
          name: state,
          description: this.getStateDescription(state)
        }));
      }

      // Extract properties from variants
      const propMap = new Map();
      figmaData.variants.forEach(v => {
        if (v.properties) {
          Object.entries(v.properties).forEach(([key, value]) => {
            if (!propMap.has(key)) {
              propMap.set(key, new Set());
            }
            propMap.get(key).add(value);
          });
        }
      });

      componentData.properties = Array.from(propMap.entries()).map(([name, values]) => ({
        name,
        values: Array.from(values),
        default: Array.from(values)[0]
      }));
    }

    // Extract color tokens from variants (as array for validator)
    const colorSet = new Set();
    if (figmaData.variants) {
      figmaData.variants.forEach(variant => {
        // Background colors
        if (variant.background && variant.background.token) {
          colorSet.add(variant.background.token);
        }

        // Border colors
        if (variant.border && variant.border.color && variant.border.color.token) {
          colorSet.add(variant.border.color.token);
        }

        // All colors from allColors array
        if (variant.allColors && Array.isArray(variant.allColors)) {
          variant.allColors.forEach(colorInfo => {
            if (colorInfo.token) {
              colorSet.add(colorInfo.token);
            }
          });
        }
      });
      componentData.tokens.colours = Array.from(colorSet);
    }

    // Extract spacing from layout (as array)
    const spacingSet = new Set();
    if (figmaData.layout) {
      if (figmaData.layout.gap !== undefined) {
        spacingSet.add(`${figmaData.layout.gap}px`);
      }
      if (figmaData.layout.padding) {
        if (typeof figmaData.layout.padding === 'object') {
          Object.values(figmaData.layout.padding).forEach(val => {
            if (val) spacingSet.add(`${val}px`);
          });
        } else {
          spacingSet.add(`${figmaData.layout.padding}px`);
        }
      }
      componentData.tokens.spacing = Array.from(spacingSet);
    }

    // Extract typography if available (as array)
    if (figmaData.typography && Array.isArray(figmaData.typography)) {
      componentData.tokens.typography = figmaData.typography.map(typo =>
        typo.fontFamily ?
          `${typo.fontFamily} ${typo.fontSize || ''}/${typo.lineHeight || ''}`.trim() :
          String(typo)
      );
    }

    return componentData;
  }

  /**
   * Get a human-readable description for a state
   */
  getStateDescription(state) {
    const descriptions = {
      'Default': 'Resting state',
      'Hover': 'Mouse over interaction',
      'Pressed': 'Active/clicked state',
      'Disabled': 'Non-interactive state',
      'Focus': 'Keyboard focus state',
      'Active': 'Currently active/selected',
      'Error': 'Error or invalid state',
      'Success': 'Success or valid state'
    };
    return descriptions[state] || `${state} state`;
  }

  /**
   * Merge new data with existing documentation
   * Strategy: Keep hand-written content, enhance with Figma data
   */
  async mergeWithExisting(existingPath, newComponentData) {
    const existingContent = await fs.readFile(existingPath, 'utf-8');
    const { data: existingFrontmatter, content: existingBody } = matter(existingContent);

    // Merge frontmatter - prefer existing but update figma references and tokens
    const mergedFrontmatter = {
      ...existingFrontmatter,
      updated: new Date().toISOString().split('T')[0],
      figmaNodeId: newComponentData.figmaNodeId || existingFrontmatter.figmaNodeId,
      // Enhance tokens with new data (deep merge)
      tokens: this.mergeTokens(existingFrontmatter.tokens, newComponentData.tokens)
    };

    // For content, we keep existing body as-is (hand-written content is valuable)
    // But we could potentially add a comment noting when it was last synced with Figma
    const syncNote = `<!-- Last synced with Figma: ${new Date().toISOString().split('T')[0]} -->`;
    const enhancedBody = existingBody.includes('<!-- Last synced') ?
      existingBody.replace(/<!-- Last synced[^>]*-->/, syncNote) :
      `${syncNote}\n\n${existingBody}`;

    // Write merged documentation
    const mergedContent = matter.stringify(enhancedBody, mergedFrontmatter);
    await fs.writeFile(existingPath, mergedContent, 'utf-8');
  }

  /**
   * Deep merge token objects
   */
  mergeTokens(existing, newTokens) {
    const merged = { ...existing };

    // Merge each token category
    ['colours', 'spacing', 'typography', 'elevation', 'breakpoints'].forEach(category => {
      if (newTokens[category]) {
        // Handle new tokens being arrays
        if (Array.isArray(newTokens[category]) && newTokens[category].length > 0) {
          // Existing might be object or array, convert to array
          let existingArray = [];
          if (Array.isArray(merged[category])) {
            existingArray = merged[category];
          } else if (typeof merged[category] === 'object' && merged[category] !== null) {
            // Convert object to array of token names
            existingArray = Object.keys(merged[category]);
          }

          // Add new items that don't exist
          const newItems = newTokens[category].filter(item =>
            !existingArray.includes(item)
          );
          merged[category] = [...existingArray, ...newItems];
        }
        // Handle new tokens being objects (shouldn't happen now but keep for safety)
        else if (typeof newTokens[category] === 'object' && !Array.isArray(newTokens[category])) {
          merged[category] = {
            ...(merged[category] || {}),
            ...newTokens[category]
          };
        }
      }
    });

    return merged;
  }

  /**
   * Clean component name by removing emojis and special characters
   */
  cleanComponentName(name) {
    return name
      .replace(/[🟢🔴⚪❌⚠️✅💡🎯📦🔧⭕]/g, '') // Remove emojis
      .replace(/^[^a-zA-Z0-9]+/, '') // Remove leading special chars
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove other special chars
      .trim()
      .replace(/\s+/g, ' '); // Normalize spaces
  }

  /**
   * Infer category with expanded atom detection
   */
  inferCategory(data) {
    const name = (data.name || '').toLowerCase();

    // Expanded list of atomic components
    const atomKeywords = [
      'button', 'icon', 'input', 'label', 'badge', 'avatar',
      'checkbox', 'radio', 'toggle', 'switch',
      'spinner', 'loading', 'loader',
      'tooltip', 'pill', 'chip', 'tag',
      'image', 'img', 'picture',
      'heading', 'text', 'typography',
      'divider', 'separator',
      'dropdown', 'select',
      'field', 'textbox', 'textarea'
    ];

    const moleculeKeywords = [
      'card', 'form', 'search', 'menu', 'list',
      'accordion', 'tab', 'modal', 'dialog',
      'alert', 'toast', 'notification',
      'stepper', 'pagination', 'breadcrumb'
    ];

    const organismKeywords = [
      'nav', 'header', 'footer', 'sidebar',
      'toolbar', 'panel', 'layout'
    ];

    if (atomKeywords.some(a => name.includes(a))) {
      return 'atoms';
    }
    if (moleculeKeywords.some(m => name.includes(m))) {
      return 'molecules';
    }
    if (organismKeywords.some(o => name.includes(o))) {
      return 'organisms';
    }

    return 'components';
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Print processing summary
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Processing Summary');
    console.log('='.repeat(60));
    console.log(`✅ Successfully processed: ${this.processed.length}`);

    const created = this.processed.filter(p => p.action === 'created');
    const merged = this.processed.filter(p => p.action === 'merged');

    if (created.length > 0) {
      console.log(`\n✨ Created (${created.length}):`);
      created.forEach(p => console.log(`   - ${p.name}`));
    }

    if (merged.length > 0) {
      console.log(`\n🔄 Merged (${merged.length}):`);
      merged.forEach(p => console.log(`   - ${p.name}`));
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ Errors (${this.errors.length}):`);
      this.errors.forEach(e => console.log(`   - ${path.basename(e.file)}: ${e.error}`));
    }

    console.log('\n' + '='.repeat(60));
  }
}

// Run the processor
const processor = new FigmaExtractProcessor();
processor.process().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
