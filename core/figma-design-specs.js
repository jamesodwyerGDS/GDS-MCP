/**
 * Figma Design Specs Extractor
 *
 * Extracts detailed design specifications directly from Figma API.
 * This is a token-efficient alternative to using Figma MCP for design specs,
 * as it fetches only the properties needed and returns structured data.
 *
 * Token Efficiency Notes:
 * - Direct API calls return raw node data (~500-2000 tokens per component)
 * - Figma MCP returns conversational responses (~2000-5000+ tokens)
 * - This approach extracts only what's needed for design documentation
 */

import axios from 'axios';

export class FigmaDesignSpecs {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseUrl = 'https://api.figma.com/v1';
  }

  /**
   * Extract comprehensive design specs for a component
   * @param {string} fileKey - Figma file key
   * @param {string} nodeId - Component node ID
   * @returns {object} Structured design specifications
   */
  async extractSpecs(fileKey, nodeId) {
    const response = await axios.get(
      `${this.baseUrl}/files/${fileKey}/nodes`,
      {
        params: {
          ids: nodeId,
          geometry: 'paths' // Include vector path data
        },
        headers: { 'X-Figma-Token': this.accessToken }
      }
    );

    const nodeData = response.data.nodes[nodeId];
    if (!nodeData?.document) {
      throw new Error(`Node ${nodeId} not found in file ${fileKey}`);
    }

    return this.parseNode(nodeData.document);
  }

  /**
   * Parse a Figma node into structured design specs
   */
  parseNode(node) {
    const specs = {
      name: node.name,
      type: node.type,
      dimensions: this.extractDimensions(node),
      layout: this.extractLayout(node),
      spacing: this.extractSpacing(node),
      fills: this.extractFills(node),
      strokes: this.extractStrokes(node),
      effects: this.extractEffects(node),
      typography: this.extractTypography(node),
      cornerRadius: this.extractCornerRadius(node),
      opacity: node.opacity ?? 1,
      blendMode: node.blendMode || 'NORMAL',
      constraints: this.extractConstraints(node),
      children: this.extractChildSpecs(node)
    };

    // Clean up undefined values for token efficiency
    return this.cleanSpecs(specs);
  }

  /**
   * Extract dimensions from absolute bounding box
   */
  extractDimensions(node) {
    if (!node.absoluteBoundingBox) return null;

    const box = node.absoluteBoundingBox;
    return {
      width: Math.round(box.width),
      height: Math.round(box.height)
    };
  }

  /**
   * Extract auto-layout properties
   */
  extractLayout(node) {
    if (!node.layoutMode) return null;

    return {
      mode: node.layoutMode, // HORIZONTAL, VERTICAL, or NONE
      primaryAxisAlign: node.primaryAxisAlignItems || 'MIN',
      counterAxisAlign: node.counterAxisAlignItems || 'MIN',
      primaryAxisSizing: node.primaryAxisSizingMode || 'AUTO',
      counterAxisSizing: node.counterAxisSizingMode || 'AUTO',
      wrap: node.layoutWrap || 'NO_WRAP'
    };
  }

  /**
   * Extract spacing (padding and gap)
   */
  extractSpacing(node) {
    const hasSpacing = node.paddingTop !== undefined ||
                       node.paddingBottom !== undefined ||
                       node.paddingLeft !== undefined ||
                       node.paddingRight !== undefined ||
                       node.itemSpacing !== undefined;

    if (!hasSpacing) return null;

    const spacing = {};

    // Padding
    const padding = {
      top: node.paddingTop ?? 0,
      right: node.paddingRight ?? 0,
      bottom: node.paddingBottom ?? 0,
      left: node.paddingLeft ?? 0
    };

    // Simplify padding if all sides are equal
    if (padding.top === padding.right &&
        padding.right === padding.bottom &&
        padding.bottom === padding.left) {
      spacing.padding = padding.top;
    } else if (padding.top === padding.bottom && padding.left === padding.right) {
      spacing.paddingY = padding.top;
      spacing.paddingX = padding.left;
    } else {
      spacing.padding = padding;
    }

    // Gap
    if (node.itemSpacing !== undefined) {
      spacing.gap = node.itemSpacing;
    }

    // Counter axis spacing (for wrap)
    if (node.counterAxisSpacing !== undefined) {
      spacing.rowGap = node.counterAxisSpacing;
    }

    return spacing;
  }

  /**
   * Extract fill colors and gradients
   */
  extractFills(node) {
    if (!node.fills || node.fills.length === 0) return null;

    return node.fills
      .filter(fill => fill.visible !== false)
      .map(fill => this.parseFill(fill));
  }

  /**
   * Parse a single fill
   */
  parseFill(fill) {
    const result = { type: fill.type };

    if (fill.type === 'SOLID') {
      result.color = this.rgbaToHex(fill.color, fill.opacity);
      if (fill.opacity !== undefined && fill.opacity !== 1) {
        result.opacity = Math.round(fill.opacity * 100) / 100;
      }
    } else if (fill.type === 'GRADIENT_LINEAR' ||
               fill.type === 'GRADIENT_RADIAL' ||
               fill.type === 'GRADIENT_ANGULAR') {
      result.gradientStops = fill.gradientStops?.map(stop => ({
        color: this.rgbaToHex(stop.color),
        position: Math.round(stop.position * 100) / 100
      }));
    } else if (fill.type === 'IMAGE') {
      result.scaleMode = fill.scaleMode;
      result.imageRef = fill.imageRef;
    }

    return result;
  }

  /**
   * Extract stroke properties
   */
  extractStrokes(node) {
    if (!node.strokes || node.strokes.length === 0) return null;

    const strokes = node.strokes
      .filter(stroke => stroke.visible !== false)
      .map(stroke => this.parseFill(stroke));

    if (strokes.length === 0) return null;

    return {
      colors: strokes,
      weight: node.strokeWeight,
      align: node.strokeAlign, // INSIDE, OUTSIDE, CENTER
      dash: node.strokeDashes?.length > 0 ? node.strokeDashes : undefined,
      cap: node.strokeCap,
      join: node.strokeJoin
    };
  }

  /**
   * Extract effects (shadows, blurs)
   */
  extractEffects(node) {
    if (!node.effects || node.effects.length === 0) return null;

    const effects = node.effects
      .filter(effect => effect.visible !== false)
      .map(effect => {
        const result = { type: effect.type };

        if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
          result.color = this.rgbaToHex(effect.color);
          result.offset = { x: effect.offset.x, y: effect.offset.y };
          result.blur = effect.radius;
          result.spread = effect.spread ?? 0;
        } else if (effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR') {
          result.blur = effect.radius;
        }

        return result;
      });

    return effects.length > 0 ? effects : null;
  }

  /**
   * Extract typography properties (for text nodes)
   */
  extractTypography(node) {
    if (node.type !== 'TEXT') return null;

    const style = node.style || {};

    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      fontSize: style.fontSize,
      lineHeight: this.parseLineHeight(style),
      letterSpacing: this.parseLetterSpacing(style),
      textAlign: style.textAlignHorizontal,
      textDecoration: style.textDecoration,
      textCase: style.textCase
    };
  }

  /**
   * Parse line height from Figma style
   */
  parseLineHeight(style) {
    if (!style.lineHeightPx) return null;

    if (style.lineHeightUnit === 'PIXELS') {
      return `${style.lineHeightPx}px`;
    } else if (style.lineHeightUnit === 'PERCENT' || style.lineHeightPercentFontSize) {
      return `${Math.round(style.lineHeightPercentFontSize)}%`;
    }
    return style.lineHeightPx;
  }

  /**
   * Parse letter spacing
   */
  parseLetterSpacing(style) {
    if (!style.letterSpacing) return null;
    return `${style.letterSpacing}px`;
  }

  /**
   * Extract corner radius
   */
  extractCornerRadius(node) {
    if (node.cornerRadius !== undefined) {
      return node.cornerRadius;
    }

    // Check for individual corner radii
    if (node.rectangleCornerRadii) {
      const [tl, tr, br, bl] = node.rectangleCornerRadii;
      if (tl === tr && tr === br && br === bl) {
        return tl;
      }
      return {
        topLeft: tl,
        topRight: tr,
        bottomRight: br,
        bottomLeft: bl
      };
    }

    return null;
  }

  /**
   * Extract layout constraints
   */
  extractConstraints(node) {
    if (!node.constraints) return null;

    return {
      horizontal: node.constraints.horizontal,
      vertical: node.constraints.vertical
    };
  }

  /**
   * Extract simplified specs for immediate children
   */
  extractChildSpecs(node) {
    if (!node.children || node.children.length === 0) return null;

    return node.children.map(child => ({
      name: child.name,
      type: child.type,
      dimensions: this.extractDimensions(child),
      // Include typography for text children
      ...(child.type === 'TEXT' && { typography: this.extractTypography(child) })
    }));
  }

  /**
   * Convert RGBA to hex color
   */
  rgbaToHex(color, opacity = 1) {
    if (!color) return null;

    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    const a = color.a !== undefined ? color.a : opacity;

    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    if (a < 1) {
      const alpha = Math.round(a * 255).toString(16).padStart(2, '0');
      return `${hex}${alpha}`;
    }

    return hex;
  }

  /**
   * Remove null/undefined values for cleaner output
   */
  cleanSpecs(obj) {
    if (obj === null || obj === undefined) return undefined;
    if (typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) {
      const cleaned = obj.map(item => this.cleanSpecs(item)).filter(item => item !== undefined);
      return cleaned.length > 0 ? cleaned : undefined;
    }

    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = this.cleanSpecs(value);
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }

  /**
   * Format specs as a token-efficient summary
   * Returns a condensed string representation for documentation
   */
  formatSummary(specs) {
    const lines = [];

    if (specs.dimensions) {
      lines.push(`**Dimensions:** ${specs.dimensions.width} × ${specs.dimensions.height}px`);
    }

    if (specs.layout) {
      lines.push(`**Layout:** ${specs.layout.mode.toLowerCase()} (${specs.layout.primaryAxisAlign.toLowerCase()} / ${specs.layout.counterAxisAlign.toLowerCase()})`);
    }

    if (specs.spacing) {
      const spacingParts = [];
      if (typeof specs.spacing.padding === 'number') {
        spacingParts.push(`padding: ${specs.spacing.padding}px`);
      } else if (specs.spacing.paddingX !== undefined) {
        spacingParts.push(`padding: ${specs.spacing.paddingY}px ${specs.spacing.paddingX}px`);
      }
      if (specs.spacing.gap !== undefined) {
        spacingParts.push(`gap: ${specs.spacing.gap}px`);
      }
      if (spacingParts.length > 0) {
        lines.push(`**Spacing:** ${spacingParts.join(', ')}`);
      }
    }

    if (specs.fills) {
      const colors = specs.fills
        .filter(f => f.type === 'SOLID')
        .map(f => f.color);
      if (colors.length > 0) {
        lines.push(`**Background:** ${colors.join(', ')}`);
      }
    }

    if (specs.strokes) {
      const strokeColors = specs.strokes.colors
        .filter(s => s.type === 'SOLID')
        .map(s => s.color);
      lines.push(`**Border:** ${specs.strokes.weight}px ${strokeColors.join(', ')}`);
    }

    if (specs.cornerRadius !== undefined) {
      const radius = typeof specs.cornerRadius === 'number'
        ? `${specs.cornerRadius}px`
        : Object.values(specs.cornerRadius).join('px / ') + 'px';
      lines.push(`**Border Radius:** ${radius}`);
    }

    if (specs.effects) {
      const shadows = specs.effects.filter(e => e.type.includes('SHADOW'));
      if (shadows.length > 0) {
        const shadowDesc = shadows.map(s =>
          `${s.offset.x}px ${s.offset.y}px ${s.blur}px ${s.color}`
        ).join(', ');
        lines.push(`**Shadow:** ${shadowDesc}`);
      }
    }

    return lines.join('\n');
  }

  /**
   * Compare token usage between direct API and MCP approach
   * Returns estimated token counts for documentation purposes
   */
  estimateTokenUsage(specs) {
    const specsJson = JSON.stringify(specs);
    // Rough estimation: ~4 characters per token
    const directApiTokens = Math.ceil(specsJson.length / 4);

    // MCP typically returns 3-5x more tokens due to:
    // - Conversational wrapper text
    // - Verbose explanations
    // - Repeated context
    const estimatedMcpTokens = directApiTokens * 4;

    return {
      directApi: directApiTokens,
      estimatedMcp: estimatedMcpTokens,
      savings: `~${Math.round((1 - directApiTokens / estimatedMcpTokens) * 100)}%`
    };
  }
}

export default FigmaDesignSpecs;
