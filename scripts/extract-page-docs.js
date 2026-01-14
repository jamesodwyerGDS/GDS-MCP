#!/usr/bin/env node

/**
 * Extract all documentation from a Figma page
 * Outputs structured JSON and markdown
 *
 * Usage: node scripts/extract-page-docs.js "Color Guidelines"
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

const FIGMA_API = 'https://api.figma.com/v1';
const FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5';

// Recursively extract documentation from all nodes
function extractDocs(node, docs = [], parentPath = '') {
  const currentPath = parentPath ? `${parentPath} > ${node.name}` : node.name;

  // Extract any documentation from this node
  const nodeDoc = {
    id: node.id,
    name: node.name,
    type: node.type,
    path: currentPath,
  };

  // Add description if present
  if (node.description) {
    nodeDoc.description = node.description;
  }

  // Add documentation links if present
  if (node.documentationLinks?.length > 0) {
    nodeDoc.documentationLinks = node.documentationLinks;
  }

  // Add component properties if present
  if (node.componentPropertyDefinitions) {
    nodeDoc.componentProperties = Object.entries(node.componentPropertyDefinitions).map(([key, def]) => ({
      name: key,
      type: def.type,
      defaultValue: def.defaultValue,
      variantOptions: def.variantOptions,
    }));
  }

  // Add bound variables if present
  if (node.boundVariables && Object.keys(node.boundVariables).length > 0) {
    nodeDoc.boundVariables = node.boundVariables;
  }

  // Check fills for variable bindings
  if (node.fills) {
    const varFills = node.fills.filter(f => f.boundVariables);
    if (varFills.length > 0) {
      nodeDoc.fillVariables = varFills.map(f => ({
        type: f.type,
        boundVariables: f.boundVariables,
        color: f.color,
      }));
    }
  }

  // Check strokes for variable bindings
  if (node.strokes) {
    const varStrokes = node.strokes.filter(s => s.boundVariables);
    if (varStrokes.length > 0) {
      nodeDoc.strokeVariables = varStrokes.map(s => ({
        type: s.type,
        boundVariables: s.boundVariables,
        color: s.color,
      }));
    }
  }

  // Add styles if present
  if (node.styles) {
    nodeDoc.styles = node.styles;
  }

  // Only add to docs if it has meaningful documentation
  if (nodeDoc.description || nodeDoc.documentationLinks || nodeDoc.componentProperties ||
      nodeDoc.boundVariables || nodeDoc.fillVariables || nodeDoc.strokeVariables) {
    docs.push(nodeDoc);
  }

  // Recurse into children
  if (node.children) {
    for (const child of node.children) {
      extractDocs(child, docs, currentPath);
    }
  }

  return docs;
}

// Convert to markdown
function toMarkdown(pageName, docs, variables) {
  let md = `# ${pageName}\n\n`;
  md += `*Extracted from Figma on ${new Date().toISOString()}*\n\n`;

  if (docs.length === 0) {
    md += `No documented nodes found on this page.\n\n`;
  } else {
    md += `## Documented Nodes (${docs.length})\n\n`;

    for (const doc of docs) {
      md += `### ${doc.name}\n\n`;
      md += `- **Type:** ${doc.type}\n`;
      md += `- **ID:** \`${doc.id}\`\n`;
      md += `- **Path:** ${doc.path}\n`;

      if (doc.description) {
        md += `\n**Description:**\n${doc.description}\n`;
      }

      if (doc.documentationLinks?.length > 0) {
        md += `\n**Documentation Links:**\n`;
        for (const link of doc.documentationLinks) {
          md += `- ${link.uri}\n`;
        }
      }

      if (doc.componentProperties?.length > 0) {
        md += `\n**Component Properties:**\n`;
        md += `| Property | Type | Default | Options |\n`;
        md += `|----------|------|---------|--------|\n`;
        for (const prop of doc.componentProperties) {
          const options = prop.variantOptions?.join(', ') || '-';
          md += `| ${prop.name} | ${prop.type} | ${prop.defaultValue || '-'} | ${options} |\n`;
        }
      }

      if (doc.boundVariables) {
        md += `\n**Bound Variables:**\n`;
        md += `\`\`\`json\n${JSON.stringify(doc.boundVariables, null, 2)}\n\`\`\`\n`;
      }

      if (doc.fillVariables) {
        md += `\n**Fill Variables:**\n`;
        for (const fill of doc.fillVariables) {
          md += `- ${fill.type}: ${JSON.stringify(fill.boundVariables)}\n`;
        }
      }

      md += `\n---\n\n`;
    }
  }

  // Add variables section
  if (variables && variables.collections && Object.keys(variables.collections).length > 0) {
    md += `## Variables\n\n`;

    for (const [collId, collection] of Object.entries(variables.collections)) {
      md += `### ${collection.name}\n\n`;
      md += `Modes: ${collection.modes?.map(m => m.name).join(', ') || 'Default'}\n\n`;

      const collVars = Object.values(variables.variables).filter(v => v.variableCollectionId === collId);
      if (collVars.length > 0) {
        md += `| Variable | Type | Values |\n`;
        md += `|----------|------|--------|\n`;
        for (const v of collVars) {
          const values = Object.entries(v.valuesByMode || {})
            .map(([modeId, val]) => {
              if (typeof val === 'object' && val.r !== undefined) {
                return `rgba(${Math.round(val.r*255)}, ${Math.round(val.g*255)}, ${Math.round(val.b*255)}, ${val.a})`;
              }
              return JSON.stringify(val);
            })
            .join(', ');
          md += `| ${v.name} | ${v.resolvedType} | ${values} |\n`;
        }
        md += `\n`;
      }
    }
  }

  return md;
}

async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Set FIGMA_TOKEN environment variable');
    process.exit(1);
  }

  const pageName = process.argv[2] || 'Color Guidelines';
  console.log(`Extracting documentation from: "${pageName}"...\n`);

  // Fetch full file
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token }
  });

  const file = response.data;
  console.log(`File: ${file.name}\n`);

  // Find the page
  const pages = file.document.children || [];
  const searchLower = pageName.toLowerCase();
  const page = pages.find(p => p.name.toLowerCase().includes(searchLower));

  if (!page) {
    console.log(`Page "${pageName}" not found.\n`);
    console.log('Available pages:');
    for (const p of pages) {
      console.log(`  - ${p.name}`);
    }
    process.exit(1);
  }

  console.log(`Found page: ${page.name}`);
  console.log(`Extracting documentation...\n`);

  // Extract documentation from all nodes
  const docs = extractDocs(page);
  console.log(`Found ${docs.length} documented nodes\n`);

  // Fetch variables
  let variables = { collections: {}, variables: {} };
  try {
    const varsResponse = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/variables/local`, {
      headers: { 'X-Figma-Token': token }
    });
    variables = {
      collections: varsResponse.data.meta?.variableCollections || {},
      variables: varsResponse.data.meta?.variables || {},
    };
    console.log(`Found ${Object.keys(variables.variables).length} variables in ${Object.keys(variables.collections).length} collections\n`);
  } catch (e) {
    console.log(`Could not fetch variables: ${e.message}\n`);
  }

  // Create output directory
  const outputDir = './docs/figma-extract';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save JSON
  const jsonPath = path.join(outputDir, `${pageName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`);
  const jsonOutput = {
    page: {
      id: page.id,
      name: page.name,
    },
    extractedAt: new Date().toISOString(),
    documentation: docs,
    variables,
  };
  fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2));
  console.log(`Saved JSON: ${jsonPath}`);

  // Save Markdown
  const mdPath = path.join(outputDir, `${pageName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`);
  const mdOutput = toMarkdown(page.name, docs, variables);
  fs.writeFileSync(mdPath, mdOutput);
  console.log(`Saved Markdown: ${mdPath}`);

  // Print summary
  console.log(`\n=== Summary ===`);
  console.log(`Page: ${page.name}`);
  console.log(`Documented nodes: ${docs.length}`);
  console.log(`Variables: ${Object.keys(variables.variables).length}`);
  console.log(`\nOutput files:`);
  console.log(`  - ${jsonPath}`);
  console.log(`  - ${mdPath}`);
}

main().catch(console.error);
