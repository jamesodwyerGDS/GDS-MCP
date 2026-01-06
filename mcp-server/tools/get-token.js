/**
 * Get Design Token Tool
 *
 * Retrieves GDS design token values (colors, spacing, typography).
 */

// Design token definitions
const TOKENS = {
  colors: {
    // Primary colors
    neptune: { hex: '#024DDF', usage: 'Primary actions, links, buttons' },
    'neptune-hover': { hex: '#0141B8', usage: 'Hover state for Neptune' },
    'neptune-dark': { hex: '#0141B8', usage: 'Hover state for Neptune' },
    'neptune-darker': { hex: '#033399', usage: 'Pressed state for Neptune' },

    // Neutral colors
    cosmos: { hex: '#121212', usage: 'Dark text, dark backgrounds' },
    granite: { hex: '#646464', usage: 'Secondary text' },
    slate: { hex: '#949494', usage: 'Disabled text, placeholders' },
    lunar: { hex: '#D6D6D6', usage: 'Borders, dividers' },
    ammonite: { hex: '#D6D6D6', usage: 'Disabled backgrounds' },
    spotlight: { hex: '#FFFFFF', usage: 'White backgrounds, text on dark' },
    white: { hex: '#FFFFFF', usage: 'White backgrounds' },

    // Semantic colors
    earth: { hex: '#01A469', usage: 'Success, confirmations, transactional buttons' },
    'earth-dark': { hex: '#018A57', usage: 'Hover state for Earth' },
    mars: { hex: '#EB0000', usage: 'Errors, destructive actions' },

    // Aliases
    primary: { hex: '#024DDF', usage: 'Alias for Neptune' },
    success: { hex: '#01A469', usage: 'Alias for Earth' },
    error: { hex: '#EB0000', usage: 'Alias for Mars' },
    disabled: { hex: '#D6D6D6', usage: 'Alias for Ammonite' }
  },

  spacing: {
    lounge: { value: '4px', tailwind: 'p-1, gap-1, m-1', usage: 'Tight spacing, icons' },
    club: { value: '8px', tailwind: 'p-2, gap-2, m-2', usage: 'Default gap, small padding' },
    hall: { value: '12px', tailwind: 'p-3, gap-3, m-3', usage: 'Small padding' },
    auditorium: { value: '16px', tailwind: 'p-4, gap-4, m-4', usage: 'Standard padding, button horizontal padding' },
    theatre: { value: '20px', tailwind: 'p-5, gap-5, m-5', usage: 'Medium spacing' },
    amphitheatre: { value: '24px', tailwind: 'p-6, gap-6, m-6', usage: 'Section gaps' },
    arena: { value: '32px', tailwind: 'p-8, gap-8, m-8', usage: 'Large spacing' },
    stadium: { value: '48px', tailwind: 'p-12, gap-12, m-12', usage: 'Section padding' },
    dome: { value: '64px', tailwind: 'p-16, gap-16, m-16', usage: 'Page sections' },
    field: { value: '88px', tailwind: 'p-22, gap-22, m-22', usage: 'Hero sections' }
  },

  typography: {
    mauna: { size: '64px', tailwind: 'text-7xl', usage: 'Hero headlines' },
    everest: { size: '48px', tailwind: 'text-5xl', usage: 'Page titles' },
    kilimanjaro: { size: '40px', tailwind: 'text-4xl', usage: 'Section titles' },
    matterhorn: { size: '32px', tailwind: 'text-3xl', usage: 'Subsection titles' },
    vinson: { size: '24px', tailwind: 'text-2xl', usage: 'Card titles' },
    blanc: { size: '20px', tailwind: 'text-xl', usage: 'Large body text' },
    rainier: { size: '18px', tailwind: 'text-lg', usage: 'Medium body text' },
    fiji: { size: '16px', tailwind: 'text-base', usage: 'Default body text' },
    etna: { size: '14px', tailwind: 'text-sm', usage: 'Small text, labels' }
  }
};

/**
 * Get design token value
 * @param {string} tokenName - Token name (e.g., "Neptune", "auditorium")
 * @param {string} tokenType - "color", "spacing", "typography", or "all"
 * @returns {object} MCP tool response
 */
export async function getDesignToken(tokenName, tokenType = 'all') {
  const normalizedName = tokenName.toLowerCase().replace(/[\s-_]+/g, '-');

  // Search in specific type or all types
  const typesToSearch = tokenType === 'all'
    ? ['colors', 'spacing', 'typography']
    : [tokenType === 'color' ? 'colors' : tokenType];

  const results = [];

  for (const type of typesToSearch) {
    const tokens = TOKENS[type];
    if (!tokens) continue;

    // Exact match
    if (tokens[normalizedName]) {
      results.push({
        name: tokenName,
        type: type.replace('s', ''),
        ...tokens[normalizedName]
      });
    }

    // Partial match
    for (const [key, value] of Object.entries(tokens)) {
      if (key.includes(normalizedName) || normalizedName.includes(key)) {
        if (!results.find(r => r.name === key)) {
          results.push({
            name: key,
            type: type.replace('s', ''),
            ...value
          });
        }
      }
    }
  }

  if (results.length === 0) {
    // Return all tokens of requested type as help
    const allTokens = formatAllTokens(tokenType);
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
    if (r.hex) output += `- Hex: ${r.hex}\n`;
    if (r.value) output += `- Value: ${r.value}\n`;
    if (r.size) output += `- Size: ${r.size}\n`;
    if (r.tailwind) output += `- Tailwind: \`${r.tailwind}\`\n`;
    if (r.usage) output += `- Usage: ${r.usage}\n`;
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
function formatAllTokens(type) {
  if (type === 'all') {
    return `Available token types: color, spacing, typography\n\nExample queries: "neptune", "auditorium", "fiji"`;
  }

  const typeKey = type === 'color' ? 'colors' : type;
  const tokens = TOKENS[typeKey];

  if (!tokens) return `Unknown token type: ${type}`;

  let output = `## ${type.charAt(0).toUpperCase() + type.slice(1)} Tokens\n\n`;
  output += '| Token | Value | Usage |\n|-------|-------|-------|\n';

  for (const [name, data] of Object.entries(tokens)) {
    const value = data.hex || data.value || data.size;
    output += `| ${name} | ${value} | ${data.usage} |\n`;
  }

  return output;
}
