/**
 * Components API Endpoint
 * Returns list of all GDS components for the browser
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = join(__dirname, '../../docs/components');

function getComponentsFromDirectory(dir, category) {
  const components = [];

  try {
    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively get components from subdirectories
        components.push(...getComponentsFromDirectory(fullPath, item));
      } else if (item.endsWith('.md')) {
        try {
          const content = readFileSync(fullPath, 'utf-8');
          const { data: frontmatter } = matter(content);

          components.push({
            name: frontmatter.name || item.replace('.md', ''),
            slug: item.replace('.md', ''),
            category: frontmatter.category || category,
            description: frontmatter.description || '',
            status: frontmatter.status || 'stable',
            tags: frontmatter.tags || [],
            path: fullPath.replace(DOCS_PATH, '').replace(/^\//, '')
          });
        } catch (e) {
          // Skip files that can't be parsed
        }
      }
    }
  } catch (e) {
    // Directory doesn't exist or can't be read
  }

  return components;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const components = getComponentsFromDirectory(DOCS_PATH, 'components');

    // Group by category
    const grouped = {
      atoms: components.filter(c => c.category === 'atoms'),
      molecules: components.filter(c => c.category === 'molecules'),
      organisms: components.filter(c => c.category === 'organisms'),
      other: components.filter(c => !['atoms', 'molecules', 'organisms'].includes(c.category))
    };

    return res.status(200).json({
      components,
      grouped,
      total: components.length
    });
  } catch (error) {
    console.error('Components API error:', error);
    return res.status(500).json({
      error: 'Failed to load components',
      details: error.message
    });
  }
}
