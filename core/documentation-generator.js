/**
 * Documentation Generator
 *
 * Main orchestrator for generating component documentation from Figma.
 * This module is trigger-agnostic - callable from CLI, GitHub Actions, or webhooks.
 */

import { FigmaClient } from './figma-client.js';
import { MarkdownTransformer } from './markdown-transformer.js';
import { SlackNotifier } from './slack-notifier.js';
import fs from 'fs/promises';
import path from 'path';

export class DocumentationGenerator {
  constructor(figmaAccessToken, options = {}) {
    this.figma = new FigmaClient(figmaAccessToken, options.figmaClientOptions);
    this.transformer = new MarkdownTransformer();
    this.outputDir = options.outputDir || './docs/components';
    this.slack = new SlackNotifier(options.slackWebhookUrl);
    this.notifySlack = options.notifySlack !== false;
    this.exportImages = options.exportImages !== false;
    this.imageFormat = options.imageFormat || 'png';
    this.imageScale = options.imageScale || 2;
  }

  /**
   * Generate documentation for a single component
   * @param {string} figmaUrl - Full Figma URL to the component
   * @returns {object} - Generated documentation details
   */
  async generate(figmaUrl) {
    const { fileKey, nodeId } = this.figma.parseUrl(figmaUrl);

    if (!fileKey) {
      throw new Error('Invalid Figma URL: Could not extract file key');
    }

    console.log(`Extracting component data from Figma...`);

    // Gather all component data
    const componentData = await this.extractComponentData(fileKey, nodeId);

    // Export component image if enabled
    if (this.exportImages && nodeId) {
      console.log(`Exporting component image...`);
      try {
        const imageData = await this.figma.exportImages(fileKey, nodeId, {
          format: this.imageFormat,
          scale: this.imageScale
        });

        if (imageData.images && imageData.images[nodeId]) {
          componentData.imageUrl = imageData.images[nodeId];
          componentData.imageExported = true;
        }
      } catch (error) {
        console.warn(`Failed to export image: ${error.message}`);
        componentData.imageExported = false;
      }
    }

    console.log(`Transforming to markdown...`);

    // Transform to markdown
    const markdown = this.transformer.transform(componentData);

    // Determine output path
    const category = this.transformer.inferCategory(componentData);
    const filename = this.transformer.kebabCase(componentData.name) + '.md';
    const outputPath = path.join(this.outputDir, category, filename);

    // Write file
    await this.writeDocumentation(outputPath, markdown);

    console.log(`Documentation generated: ${outputPath}`);

    const result = {
      name: componentData.name,
      path: outputPath,
      category,
      imageUrl: componentData.imageUrl || null
    };

    // Send Slack notification
    if (this.notifySlack && this.slack.isConfigured()) {
      await this.slack.notifyDocGenerated(result);
    }

    return result;
  }

  /**
   * Generate documentation for multiple components
   * @param {string[]} figmaUrls - Array of Figma URLs
   */
  async generateBatch(figmaUrls) {
    const results = [];

    for (const url of figmaUrls) {
      try {
        const result = await this.generate(url);
        results.push({ success: true, ...result });
      } catch (error) {
        results.push({ success: false, url, error: error.message });
      }
    }

    // Send batch completion notification
    if (this.notifySlack && this.slack.isConfigured()) {
      await this.slack.notifyBatchComplete(results);
    }

    return results;
  }

  /**
   * Extract comprehensive component data from Figma
   */
  async extractComponentData(fileKey, nodeId) {
    const data = {
      name: 'Component',
      description: '',
      variants: [],
      tokens: {
        colours: [],
        spacing: [],
        typography: []
      }
    };

    // Get metadata and design context
    if (nodeId) {
      const metadata = await this.figma.getMetadata(fileKey, nodeId);
      const context = await this.figma.getDesignContext(fileKey, nodeId);

      if (metadata?.document) {
        data.name = metadata.document.name;
        data.description = metadata.document.description || '';
      }

      if (context) {
        data.layoutMode = context.layoutMode;
        data.spacing = {
          padding: {
            top: context.paddingTop,
            right: context.paddingRight,
            bottom: context.paddingBottom,
            left: context.paddingLeft
          },
          gap: context.itemSpacing
        };
        data.cornerRadius = context.cornerRadius;
        data.children = context.children;
      }

      // Check if it's a component set (has variants)
      const componentSet = await this.figma.getComponentSet(fileKey, nodeId);
      if (componentSet) {
        data.variants = componentSet.variants;
      }
    }

    // Get design tokens
    try {
      const variables = await this.figma.getVariableDefs(fileKey);
      data.tokens = this.extractTokenReferences(variables);
    } catch (error) {
      // Variables API may not be available for all files
      console.warn('Could not extract design tokens:', error.message);
    }

    return data;
  }

  /**
   * Extract token references from Figma variables using resolvedType
   */
  extractTokenReferences(variables) {
    const tokens = {
      colours: [],
      spacing: [],
      typography: [],
      other: []
    };

    if (!variables?.meta?.variables) {
      return tokens;
    }

    for (const [id, variable] of Object.entries(variables.meta.variables)) {
      const { name, resolvedType, valuesByMode } = variable;

      // Use resolvedType for accurate categorization
      if (resolvedType === 'COLOR') {
        // Extract color value from first mode
        const modeId = Object.keys(valuesByMode || {})[0];
        const colorValue = valuesByMode?.[modeId];

        tokens.colours.push({
          name,
          type: 'COLOR',
          value: colorValue ? this.formatColorValue(colorValue) : null
        });
      } else if (resolvedType === 'FLOAT') {
        // FLOAT can be spacing, dimensions, or other numeric values
        // Use name heuristics to categorize
        const modeId = Object.keys(valuesByMode || {})[0];
        const numValue = valuesByMode?.[modeId];

        if (name.includes('space') || name.includes('spacing') || name.includes('gap') || name.includes('padding') || name.includes('margin')) {
          tokens.spacing.push({
            name,
            type: 'FLOAT',
            value: numValue
          });
        } else if (name.includes('font') || name.includes('size') || name.includes('weight') || name.includes('line')) {
          tokens.typography.push({
            name,
            type: 'FLOAT',
            value: numValue
          });
        } else {
          tokens.other.push({
            name,
            type: 'FLOAT',
            value: numValue
          });
        }
      } else if (resolvedType === 'STRING') {
        // STRING can be font families, text values, etc.
        const modeId = Object.keys(valuesByMode || {})[0];
        const strValue = valuesByMode?.[modeId];

        if (name.includes('font') || name.includes('type') || name.includes('family')) {
          tokens.typography.push({
            name,
            type: 'STRING',
            value: strValue
          });
        } else {
          tokens.other.push({
            name,
            type: 'STRING',
            value: strValue
          });
        }
      } else if (resolvedType === 'BOOLEAN') {
        const modeId = Object.keys(valuesByMode || {})[0];
        const boolValue = valuesByMode?.[modeId];

        tokens.other.push({
          name,
          type: 'BOOLEAN',
          value: boolValue
        });
      }
    }

    return tokens;
  }

  /**
   * Format color value from Figma API response
   * @private
   */
  formatColorValue(colorObj) {
    if (!colorObj || typeof colorObj !== 'object') return null;

    // Figma returns colors as {r, g, b, a} with values 0-1
    const { r = 0, g = 0, b = 0, a = 1 } = colorObj;

    // Convert to 0-255 range
    const r255 = Math.round(r * 255);
    const g255 = Math.round(g * 255);
    const b255 = Math.round(b * 255);

    if (a < 1) {
      return `rgba(${r255}, ${g255}, ${b255}, ${a})`;
    }

    // Return hex color
    const toHex = (n) => n.toString(16).padStart(2, '0');
    return `#${toHex(r255)}${toHex(g255)}${toHex(b255)}`;
  }

  /**
   * Write documentation to file, creating directories as needed
   */
  async writeDocumentation(outputPath, content) {
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(outputPath, content, 'utf-8');
  }
}

export default DocumentationGenerator;
