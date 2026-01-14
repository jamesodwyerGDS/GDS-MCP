/**
 * Get Design Token Tool
 *
 * Retrieves GDS design token values from Figma-extracted styles.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STYLES_FILE = path.join(__dirname, '../../docs/figma-extract/styles.md');

/**
 * Parse tokens from styles.md
 */
async function loadTokens() {
  try {
    const content = await fs.readFile(STYLES_FILE, 'utf-8');

    const tokens = {
      colors: {},
      typography: {},
      effects: {}
    };

    // Parse FILL section for colors
    const fillSection = content.match(/## FILL[\s\S]*?(?=\n## |$)/);
    if (fillSection) {
      const rows = fillSection[0].matchAll(/\| \*\*([^*]+)\*\* \| ([^|]+) \|/g);
      for (const row of rows) {
        const fullName = row[1].trim();
        const description = row[2].trim();

        // Extract token name and hex
        const parts = fullName.split('/');
        const category = parts[0];
        const name = parts[1] || parts[0];

        // Extract hex from description
        const hexMatch = description.match(/#[A-Fa-f0-9]{6}/);
        const hex = hexMatch ? hexMatch[0] : null;

        // Clean description (remove hex from start)
        const usage = description.replace(/#[A-Fa-f0-9]{6}\s*/, '').trim();

        tokens.colors[name.toLowerCase().replace(/\s+/g, '-')] = {
          name,
          category,
          hex,
          usage: usage || '-'
        };
      }
    }

    // Parse TEXT section for typography
    const textSection = content.match(/## TEXT[\s\S]*?(?=\n## |$)/);
    if (textSection) {
      const rows = textSection[0].matchAll(/\| \*\*([^*]+)\*\* \| ([^|]+) \|/g);
      for (const row of rows) {
        const fullName = row[1].trim();
        const description = row[2].trim();

        // Extract size from name if present
        const sizeMatch = fullName.match(/(\d+)px/);
        const size = sizeMatch ? sizeMatch[1] + 'px' : null;

        // Extract style name
        const parts = fullName.split('/');
        const platform = parts[0];
        const styleName = parts[1] || parts[0];

        // Extract base name (e.g., "Mauna" from "Desktop/Mauna")
        const baseNameMatch = styleName.match(/([A-Z][a-z]+)/);
        const baseName = baseNameMatch ? baseNameMatch[1] : styleName.split(' ')[0];

        tokens.typography[baseName.toLowerCase()] = {
          name: baseName,
          fullName,
          platform,
          size,
          usage: description !== '-' ? description : null
        };
      }
    }

    // Parse EFFECT section for elevation
    const effectSection = content.match(/## EFFECT[\s\S]*?(?=\n## |$)/);
    if (effectSection) {
      const rows = effectSection[0].matchAll(/\| \*\*([^*]+)\*\* \| ([^|]+) \|/g);
      for (const row of rows) {
        const fullName = row[1].trim();
        const description = row[2].trim();

        if (fullName.includes('Elevation')) {
          const levelMatch = fullName.match(/level-(\d)/);
          const level = levelMatch ? levelMatch[1] : null;

          tokens.effects[`elevation-${level}`] = {
            name: fullName,
            level,
            usage: description
          };
        }
      }
    }

    return tokens;
  } catch (error) {
    console.error('Error loading tokens:', error);
    return { colors: {}, typography: {}, effects: {} };
  }
}

/**
 * Get design token value
 * @param {string} tokenName - Token name (e.g., "Neptune", "auditorium")
 * @param {string} tokenType - "color", "spacing", "typography", or "all"
 * @returns {object} MCP tool response
 */
export async function getDesignToken(tokenName, tokenType = 'all') {
  const tokens = await loadTokens();
  const normalizedName = tokenName.toLowerCase().replace(/[\s-_]+/g, '-');

  const results = [];

  // Search colors
  if (tokenType === 'all' || tokenType === 'color') {
    for (const [key, value] of Object.entries(tokens.colors)) {
      if (key.includes(normalizedName) || normalizedName.includes(key) ||
          value.name.toLowerCase().includes(normalizedName)) {
        results.push({
          type: 'color',
          ...value
        });
      }
    }
  }

  // Search typography
  if (tokenType === 'all' || tokenType === 'typography') {
    for (const [key, value] of Object.entries(tokens.typography)) {
      if (key.includes(normalizedName) || normalizedName.includes(key)) {
        results.push({
          type: 'typography',
          ...value
        });
      }
    }
  }

  // Search effects
  if (tokenType === 'all' || tokenType === 'effect') {
    for (const [key, value] of Object.entries(tokens.effects)) {
      if (key.includes(normalizedName) || normalizedName.includes(key)) {
        results.push({
          type: 'effect',
          ...value
        });
      }
    }
  }

  if (results.length === 0) {
    const allTokens = await formatAllTokens(tokens, tokenType);
    return {
      content: [{
        type: 'text',
        text: `Token "${tokenName}" not found.\n\n${allTokens}`
      }]
    };
  }

  // Format results
  const formatted = results.map(r => {
    let output = `**${r.name}** (${r.type})\n`;
    if (r.category) output += `- Category: ${r.category}\n`;
    if (r.hex) output += `- Hex: ${r.hex}\n`;
    if (r.size) output += `- Size: ${r.size}\n`;
    if (r.platform) output += `- Platform: ${r.platform}\n`;
    if (r.level) output += `- Level: ${r.level}\n`;
    if (r.usage && r.usage !== '-') output += `- Usage: ${r.usage}\n`;
    return output;
  }).join('\n');

  return {
    content: [{
      type: 'text',
      text: formatted
    }]
  };
}

/**
 * Format all tokens of a type for reference
 */
async function formatAllTokens(tokens, type) {
  if (type === 'all') {
    return `Available token types: color, typography, effect\n\nExample queries: "neptune", "cosmos", "mauna", "elevation"`;
  }

  if (type === 'color') {
    let output = '## Color Tokens\n\n| Token | Hex | Usage |\n|-------|-----|-------|\n';
    for (const [, data] of Object.entries(tokens.colors)) {
      output += `| ${data.name} | ${data.hex || '-'} | ${data.usage || '-'} |\n`;
    }
    return output;
  }

  if (type === 'typography') {
    let output = '## Typography Tokens\n\n| Token | Size | Platform |\n|-------|------|----------|\n';
    for (const [, data] of Object.entries(tokens.typography)) {
      output += `| ${data.name} | ${data.size || '-'} | ${data.platform || '-'} |\n`;
    }
    return output;
  }

  return `Unknown token type: ${type}`;
}
