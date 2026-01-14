/**
 * Figma MCP Client
 *
 * Wrapper for interacting with the Figma MCP server to extract component data.
 * This module provides methods that mirror the Figma MCP tools for extracting
 * design system information.
 */

import axios from 'axios';

export class FigmaClient {
  constructor(accessToken, options = {}) {
    this.accessToken = accessToken;
    this.baseUrl = 'https://api.figma.com/v1';
    this.requestCache = new Map();
    this.cacheEnabled = options.cache !== false;
    this.cacheTTL = options.cacheTTL || 300000; // 5 minutes default
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;

    // Rate limit tracking
    this.rateLimitRemaining = null;
    this.rateLimitReset = null;
  }

  /**
   * Make an API request with retry logic and rate limiting
   * @private
   */
  async makeRequest(config, retryCount = 0) {
    const cacheKey = `${config.method || 'GET'}:${config.url}:${JSON.stringify(config.params || {})}`;

    // Check cache
    if (this.cacheEnabled && config.method === 'GET') {
      const cached = this.requestCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
        return cached.data;
      }
    }

    try {
      const response = await axios({
        ...config,
        headers: {
          'X-Figma-Token': this.accessToken,
          ...config.headers
        }
      });

      // Update rate limit info from headers
      this.rateLimitRemaining = parseInt(response.headers['x-ratelimit-remaining'] || '0');
      this.rateLimitReset = parseInt(response.headers['x-ratelimit-reset'] || '0');

      // Cache successful GET requests
      if (this.cacheEnabled && config.method === 'GET') {
        this.requestCache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      }

      return response.data;
    } catch (error) {
      // Handle rate limiting
      if (error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'] || '60');
        console.warn(`Rate limited. Retrying after ${retryAfter}s...`);

        if (retryCount < this.maxRetries) {
          await this.sleep(retryAfter * 1000);
          return this.makeRequest(config, retryCount + 1);
        }
      }

      // Handle transient errors with exponential backoff
      if (error.response?.status >= 500 && retryCount < this.maxRetries) {
        const delay = this.retryDelay * Math.pow(2, retryCount);
        console.warn(`Server error (${error.response.status}). Retrying in ${delay}ms...`);
        await this.sleep(delay);
        return this.makeRequest(config, retryCount + 1);
      }

      throw error;
    }
  }

  /**
   * Sleep utility for retry delays
   * @private
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clear the request cache
   */
  clearCache() {
    this.requestCache.clear();
  }

  /**
   * Get rate limit status
   */
  getRateLimitStatus() {
    return {
      remaining: this.rateLimitRemaining,
      resetAt: this.rateLimitReset ? new Date(this.rateLimitReset * 1000) : null
    };
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
   * Get file metadata only (efficient for basic info)
   * @param {string} fileKey - Figma file key
   * @returns {Promise<{name, folder_name, creator, last_touched_by, thumbnail_url, version, role, link_access, url}>}
   */
  async getFileMeta(fileKey) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/meta`
    });
    return data;
  }

  /**
   * Get component metadata (layer hierarchy, node IDs, structure)
   * Mirrors MCP tool: get_metadata
   * @param {string} fileKey - Figma file key
   * @param {string} nodeId - Component node ID
   */
  async getMetadata(fileKey, nodeId) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/nodes`,
      params: { ids: nodeId }
    });
    return data.nodes[nodeId];
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
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}`,
      params: { depth: 1 }
    });

    const components = [];

    // Extract from components map
    if (data.components) {
      for (const [nodeId, comp] of Object.entries(data.components)) {
        components.push({
          nodeId,
          name: comp.name,
          description: comp.description || null,
          documentationLinks: comp.documentationLinks || []
        });
      }
    }

    // Extract from componentSets map
    if (data.componentSets) {
      for (const [nodeId, set] of Object.entries(data.componentSets)) {
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
   * Export component images
   * @param {string} fileKey - Figma file key
   * @param {string|string[]} nodeIds - Node ID(s) to export
   * @param {object} options - Export options
   * @param {string} options.format - Image format: 'jpg', 'png', 'svg', 'pdf' (default: 'png')
   * @param {number} options.scale - Scale factor 1-4 (default: 2)
   * @param {string} options.svgIncludeId - Include id attributes in SVG
   * @param {string} options.svgSimplifyStroke - Simplify strokes in SVG
   * @returns {Promise<{images: {[nodeId]: string}}>} - Map of node IDs to image URLs (expire after 30 days)
   */
  async exportImages(fileKey, nodeIds, options = {}) {
    const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
    const params = {
      ids,
      format: options.format || 'png',
      scale: options.scale || 2
    };

    if (options.svgIncludeId !== undefined) {
      params.svg_include_id = options.svgIncludeId;
    }
    if (options.svgSimplifyStroke !== undefined) {
      params.svg_simplify_stroke = options.svgSimplifyStroke;
    }

    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/images/${fileKey}`,
      params
    });

    return data;
  }

  /**
   * Get all image fills from a file
   * @param {string} fileKey - Figma file key
   * @returns {Promise<{meta: {images: {[ref]: string}}}>} - Map of image refs to URLs (expire in 14 days)
   */
  async getImageFills(fileKey) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/images`
    });
    return data;
  }

  /**
   * Get variable definitions (design tokens)
   * Mirrors MCP tool: get_variable_defs
   * @param {string} fileKey - Figma file key
   * @returns {Promise<{meta: {variables: {[id]: {name, resolvedType, valuesByMode}}}>}
   */
  async getVariableDefs(fileKey) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/variables/local`
    });
    return data;
  }

  /**
   * Get component styles from a file
   * @param {string} fileKey - Figma file key
   */
  async getStyles(fileKey) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/styles`
    });
    return data;
  }

  /**
   * Get published components from a team library
   * @param {string} teamId - Team ID
   * @param {object} options - Pagination options
   * @param {number} options.pageSize - Results per page (default 30, max 1000)
   * @param {string} options.after - Cursor for next page
   * @param {string} options.before - Cursor for previous page
   */
  async getTeamComponents(teamId, options = {}) {
    const params = {};
    if (options.pageSize) params.page_size = options.pageSize;
    if (options.after) params.after = options.after;
    if (options.before) params.before = options.before;

    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/teams/${teamId}/components`,
      params
    });
    return data;
  }

  /**
   * Get published components from a specific file
   * @param {string} fileKey - Figma file key (main file only)
   */
  async getFileComponents(fileKey) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/components`
    });
    return data;
  }

  /**
   * Get a specific published component by key
   * @param {string} key - Component key
   */
  async getComponent(key) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/components/${key}`
    });
    return data;
  }

  /**
   * Get published component sets from a team library
   * @param {string} teamId - Team ID
   * @param {object} options - Pagination options
   */
  async getTeamComponentSets(teamId, options = {}) {
    const params = {};
    if (options.pageSize) params.page_size = options.pageSize;
    if (options.after) params.after = options.after;
    if (options.before) params.before = options.before;

    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/teams/${teamId}/component_sets`,
      params
    });
    return data;
  }

  /**
   * Get published component sets from a specific file
   * @param {string} fileKey - Figma file key
   */
  async getFileComponentSets(fileKey) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/component_sets`
    });
    return data;
  }

  /**
   * Get a specific component set by key
   * @param {string} key - Component set key
   */
  async getComponentSet(fileKey, componentSetId) {
    // If componentSetId looks like a key (starts with letters), use the component_sets endpoint
    if (typeof componentSetId === 'string' && /^[a-zA-Z]/.test(componentSetId)) {
      const data = await this.makeRequest({
        method: 'GET',
        url: `${this.baseUrl}/component_sets/${componentSetId}`
      });
      return this.transformComponentSetResponse(data);
    }

    // Otherwise treat as node ID and fetch from file
    const nodeData = await this.getMetadata(fileKey, componentSetId);
    const document = nodeData?.document;

    if (!document) return null;

    // Handle both COMPONENT_SET and regular file queries
    if (document.type === 'COMPONENT_SET') {
      return this.extractComponentSetFromNode(document);
    }

    // Check if this is a file response with componentSets
    const fileData = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}`,
      params: { ids: componentSetId }
    });

    if (fileData.componentSets && fileData.componentSets[componentSetId]) {
      return this.transformComponentSetResponse(fileData.componentSets[componentSetId]);
    }

    return null;
  }

  /**
   * Get published styles from a team library
   * @param {string} teamId - Team ID
   * @param {object} options - Pagination options
   */
  async getTeamStyles(teamId, options = {}) {
    const params = {};
    if (options.pageSize) params.page_size = options.pageSize;
    if (options.after) params.after = options.after;
    if (options.before) params.before = options.before;

    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/teams/${teamId}/styles`,
      params
    });
    return data;
  }

  /**
   * Get published styles from a specific file
   * @param {string} fileKey - Figma file key
   */
  async getFileStyles(fileKey) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/styles`
    });
    return data;
  }

  /**
   * Get a specific style by key
   * @param {string} key - Style key
   */
  async getStyle(key) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/styles/${key}`
    });
    return data;
  }

  /**
   * Get file versions (for changelog tracking)
   * @param {string} fileKey - Figma file key
   */
  async getFileVersions(fileKey) {
    const data = await this.makeRequest({
      method: 'GET',
      url: `${this.baseUrl}/files/${fileKey}/versions`
    });
    return data;
  }

  /**
   * Extract component set data from a node document
   * @private
   */
  extractComponentSetFromNode(document) {
    const variants = document.children?.map(variant => ({
      name: variant.name,
      id: variant.id,
      properties: this.parseVariantProperties(variant.name)
    })) || [];

    return {
      name: document.name,
      description: document.description || null,
      variants
    };
  }

  /**
   * Transform component set response from published library endpoint
   * @private
   */
  transformComponentSetResponse(data) {
    return {
      name: data.name,
      description: data.description || null,
      key: data.key,
      fileKey: data.file_key,
      nodeId: data.node_id,
      thumbnailUrl: data.thumbnail_url,
      variants: [] // Variants need to be fetched separately via node query
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
