/**
 * JSON to Markdown Converter
 * Converts structured JSON (from OpenAI Structured Outputs) to properly formatted markdown
 * This is 100% deterministic - given the same JSON, it always produces the same markdown
 */

// Color emoji mapping for design tokens
const COLOR_EMOJIS = {
  neptune: '🔵',
  blue: '🔵',
  cosmos: '⚫',
  black: '⚫',
  granite: '⚪',
  gray: '⚪',
  grey: '⚪',
  white: '⚪',
  earth: '🟢',
  green: '🟢',
  mars: '🔴',
  red: '🔴',
  yellow: '🟡',
  orange: '🟠',
  purple: '🟣'
};

/**
 * Get emoji indicator for a color token or hex value
 */
function getColorEmoji(tokenName, value) {
  // Check token name
  const nameLower = (tokenName || '').toLowerCase();
  for (const [color, emoji] of Object.entries(COLOR_EMOJIS)) {
    if (nameLower.includes(color)) {
      return emoji;
    }
  }

  // Check hex value brightness
  if (value && value.match(/^#[0-9A-Fa-f]{6}$/)) {
    const hex = value.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const brightness = (r + g + b) / 3;

    if (brightness < 50) return '⚫';
    if (brightness > 200) return '⚪';
    if (b > r && b > g) return '🔵';
    if (r > g && r > b) return '🔴';
    if (g > r && g > b) return '🟢';
  }

  return '🔵'; // Default
}

/**
 * Convert structured JSON data to markdown
 */
export function jsonToMarkdown(data) {
  let markdown = '';

  // Component name as H2
  if (data.componentName) {
    markdown += `## ${data.componentName}\n\n`;
  }

  // Description
  if (data.description) {
    markdown += `${data.description}\n\n`;
  }

  // Process each section
  if (data.sections && Array.isArray(data.sections)) {
    for (const section of data.sections) {
      // Section heading as H2
      markdown += `## ${section.heading}\n\n`;

      // Render content based on type
      switch (section.type) {
        case 'list':
          if (section.listContent !== null) {
            markdown += convertList(section.listContent);
          }
          break;

        case 'table':
          if (section.tableContent !== null) {
            markdown += convertTable(section.tableContent, section.heading);
          }
          break;

        case 'paragraph':
          if (section.paragraphContent !== null) {
            markdown += convertParagraph(section.paragraphContent);
          }
          break;

        default:
          // Fallback
          markdown += '\n';
      }
    }
  }

  return markdown.trim() + '\n';
}

/**
 * Convert array of strings to markdown bullet list
 */
function convertList(items) {
  if (!Array.isArray(items)) return '\n';

  return items.map(item => `- ${item}`).join('\n') + '\n\n';
}

/**
 * Convert table object to markdown table
 */
function convertTable(tableData, sectionHeading) {
  if (!tableData || !tableData.headers || !tableData.rows) {
    return '\n';
  }

  const { headers, rows } = tableData;
  let table = '';

  // Determine if this is a color/token table by checking headers or section heading
  const isColorTable =
    headers.some(h => h.toLowerCase().includes('color') || h.toLowerCase().includes('preview')) ||
    sectionHeading.toLowerCase().includes('color') ||
    sectionHeading.toLowerCase().includes('token');

  // Add emoji preview column for color tables if not already present
  const hasPreviewColumn = headers.some(h => h.toLowerCase().includes('preview'));

  // Table headers
  table += `| ${headers.join(' | ')} |\n`;

  // Separator row
  table += `|${headers.map(() => '-------').join('|')}|\n`;

  // Table rows
  for (const row of rows) {
    let processedRow = [...row];

    // Add emojis for color tables
    if (isColorTable && hasPreviewColumn) {
      const previewIndex = headers.findIndex(h => h.toLowerCase().includes('preview'));
      const tokenIndex = headers.findIndex(h =>
        h.toLowerCase().includes('token') ||
        h.toLowerCase().includes('name')
      );
      const valueIndex = headers.findIndex(h => h.toLowerCase().includes('value'));

      if (previewIndex >= 0 && tokenIndex >= 0 && valueIndex >= 0) {
        const tokenName = row[tokenIndex] || '';
        const value = row[valueIndex] || '';
        processedRow[previewIndex] = getColorEmoji(tokenName, value);
      }
    }

    // Format cells with inline code for tokens and values
    processedRow = processedRow.map((cell, index) => {
      const header = headers[index].toLowerCase();

      // Wrap token names, values, and CSS properties in backticks
      if (header.includes('token') ||
          header.includes('value') ||
          header.includes('property') ||
          cell.match(/^(--|[a-z-]+):/) ||
          cell.match(/^#[0-9A-Fa-f]{3,8}$/) ||
          cell.match(/^\d+(px|rem|em|%)$/)) {
        return `\`${cell}\``;
      }

      return cell;
    });

    table += `| ${processedRow.join(' | ')} |\n`;
  }

  return table + '\n';
}

/**
 * Convert paragraph string to markdown
 */
function convertParagraph(text) {
  if (typeof text !== 'string') return '\n';

  // Add inline code formatting for technical terms
  let formatted = text;

  // CSS custom properties
  formatted = formatted.replace(/\b(--[a-z-]+)\b/g, '`$1`');

  // Common CSS properties
  const cssProps = ['padding', 'margin', 'border-radius', 'font-size', 'line-height', 'font-weight', 'color', 'background'];
  cssProps.forEach(prop => {
    const regex = new RegExp(`\\b(${prop})\\b(?![^\`]*\`)`, 'gi');
    formatted = formatted.replace(regex, '`$1`');
  });

  // Hex colors
  formatted = formatted.replace(/\b(#[0-9A-Fa-f]{3,8})\b/g, '`$1`');

  // Size values
  formatted = formatted.replace(/\b(\d+(?:px|rem|em|%))\b/g, '`$1`');

  return formatted + '\n\n';
}

export default jsonToMarkdown;
