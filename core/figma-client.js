/**
 * Figma MCP Client
 *
 * Wrapper for interacting with the Figma MCP server to extract component data.
 * This module provides methods that mirror the Figma MCP tools for extracting
 * design system information.
 */

import axios from 'axios';

export class FigmaClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseUrl = 'https://api.figma.com/v1';
  }

  /**
   * Extract file key and node ID from a Figma URL
   * @param {string} figmaUrl - Full Figma URL
   * @returns {{ fileKey: string, nodeId: string | null }}
   */
  parseUrl(figmaUrl) {
    const fileMatch = figmaUrl.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
    const nodeMatch = figmaUrl.match(/node-id=([^&]+)/);

    return {
      fileKey: fileMatch ? fileMatch[1] : null,
      nodeId: nodeMatch ? decodeURIComponent(nodeMatch[1]) : null
    };
  }

  /**
   * Get component metadata (layer hierarchy, node IDs, structure)
   * Mirrors MCP tool: get_metadata
   * @param {string} fileKey - Figma file key
   * @param {string} nodeId - Component node ID
   */
  async getMetadata(fileKey, nodeId) {
    const response = await axios.get(
      `${this.baseUrl}/files/${fileKey}/nodes`,
      {
        params: { ids: nodeId },
        headers: { 'X-Figma-Token': this.accessToken }
      }
    );
    return response.data.nodes[nodeId];
  }

  /**
   * Get design context (layout, variants, styling)
   * Mirrors MCP tool: get_design_context
   * @param {string} fileKey - Figma file key
   * @param {string} nodeId - Component node ID
   */
  async getDesignContext(fileKey, nodeId) {
    const nodeData = await this.getMetadata(fileKey, nodeId);
    const document = nodeData?.document;

    if (!document) return null;

    return {
      name: document.name,
      type: document.type,
      // Documentation fields from Figma
      description: document.description || null,
      documentationLinks: document.documentationLinks || [],
      // Layout properties
      layoutMode: document.layoutMode,
      primaryAxisSizingMode: document.primaryAxisSizingMode,
      counterAxisSizingMode: document.counterAxisSizingMode,
      paddingLeft: document.paddingLeft,
      paddingRight: document.paddingRight,
      paddingTop: document.paddingTop,
      paddingBottom: document.paddingBottom,
      itemSpacing: document.itemSpacing,
      fills: document.fills,
      strokes: document.strokes,
      effects: document.effects,
      cornerRadius: document.cornerRadius,
      children: document.children?.map(child => ({
        name: child.name,
        type: child.type
      }))
    };
  }

  /**
   * Get component documentation (description and links)
   * @param {string} fileKey - Figma file key
   * @param {string} nodeId - Component node ID
   * @returns {{ description: string|null, documentationLinks: Array<{uri: string}> }}
   */
  async getComponentDocumentation(fileKey, nodeId) {
    const nodeData = await this.getMetadata(fileKey, nodeId);
    const document = nodeData?.document;

    return {
      description: document?.description || null,
      documentationLinks: document?.documentationLinks || []
    };
  }

  /**
   * Get all components with their documentation from a file
   * @param {string} fileKey - Figma file key
   * @returns {Promise<Array<{nodeId: string, name: string, description: string, documentationLinks: Array}>>}
   */
  async getFileComponentsWithDocs(fileKey) {
    const response = await axios.get(
      `${this.baseUrl}/files/${fileKey}`,
      {
        params: { depth: 1 },
        headers: { 'X-Figma-Token': this.accessToken }
      }
    );

    const components = [];

    // Extract from components map
    if (response.data.components) {
      for (const [nodeId, comp] of Object.entries(response.data.components)) {
        components.push({
          nodeId,
          name: comp.name,
          description: comp.description || null,
          documentationLinks: comp.documentationLinks || []
        });
      }
    }

    // Extract from componentSets map
    if (response.data.componentSets) {
      for (const [nodeId, set] of Object.entries(response.data.componentSets)) {
        components.push({
          nodeId,
          name: set.name,
          description: set.description || null,
          documentationLinks: set.documentationLinks || [],
          isComponentSet: true
        });
      }
    }

    return components;
  }

  /**
   * Get variable definitions (design tokens)
   * Mirrors MCP tool: get_variable_defs
   * @param {string} fileKey - Figma file key
   */
  async getVariableDefs(fileKey) {
    const response = await axios.get(
      `${this.baseUrl}/files/${fileKey}/variables/local`,
      {
        headers: { 'X-Figma-Token': this.accessToken }
      }
    );
    return response.data;
  }

  /**
   * Get component styles
   * @param {string} fileKey - Figma file key
   */
  async getStyles(fileKey) {
    const response = await axios.get(
      `${this.baseUrl}/files/${fileKey}/styles`,
      {
        headers: { 'X-Figma-Token': this.accessToken }
      }
    );
    return response.data;
  }

  /**
   * Get component set (all variants of a component)
   * @param {string} fileKey - Figma file key
   * @param {string} componentSetId - Component set node ID
   */
  async getComponentSet(fileKey, componentSetId) {
    const nodeData = await this.getMetadata(fileKey, componentSetId);
    const document = nodeData?.document;

    if (!document || document.type !== 'COMPONENT_SET') {
      return null;
    }

    const variants = document.children?.map(variant => ({
      name: variant.name,
      id: variant.id,
      properties: this.parseVariantProperties(variant.name)
    })) || [];

    return {
      name: document.name,
      variants
    };
  }

  /**
   * Parse variant properties from variant name
   * e.g., "Size=Large, State=Hover" -> { Size: "Large", State: "Hover" }
   */
  parseVariantProperties(variantName) {
    const props = {};
    const pairs = variantName.split(',').map(p => p.trim());

    for (const pair of pairs) {
      const [key, value] = pair.split('=').map(s => s.trim());
      if (key && value) {
        props[key] = value;
      }
    }

    return props;
  }
}

export default FigmaClient;
