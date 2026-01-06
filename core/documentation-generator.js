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
    this.figma = new FigmaClient(figmaAccessToken);
    this.transformer = new MarkdownTransformer();
    this.outputDir = options.outputDir || './docs/components';
    this.slack = new SlackNotifier(options.slackWebhookUrl);
    this.notifySlack = options.notifySlack !== false;
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
      category
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
   * Extract token references from Figma variables
   */
  extractTokenReferences(variables) {
    const tokens = {
      colours: [],
      spacing: [],
      typography: []
    };

    if (!variables?.meta?.variables) {
      return tokens;
    }

    for (const [id, variable] of Object.entries(variables.meta.variables)) {
      const name = variable.name;

      if (name.includes('color') || name.includes('colour')) {
        tokens.colours.push(name);
      } else if (name.includes('space') || name.includes('spacing')) {
        tokens.spacing.push(name);
      } else if (name.includes('font') || name.includes('type')) {
        tokens.typography.push(name);
      }
    }

    return tokens;
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
