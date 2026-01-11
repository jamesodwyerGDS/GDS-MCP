#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteDir = path.resolve(__dirname, '..');
const docsDir = path.resolve(websiteDir, '../docs');
const distDir = path.resolve(websiteDir, 'dist');
const publicDir = path.resolve(websiteDir, 'public');

// Generate the docs manifest
function generateDocsManifest() {
  console.log('Generating docs manifest...');

  const manifest = {
    components: { atoms: [], molecules: [], organisms: [] },
    foundations: [],
    patterns: []
  };

  // Scan components
  ['atoms', 'molecules', 'organisms'].forEach(category => {
    const categoryPath = path.resolve(docsDir, 'components', category);
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        const content = fs.readFileSync(path.resolve(categoryPath, file), 'utf-8');
        const { data } = matter(content);
        manifest.components[category].push({
          slug: file.replace('.md', ''),
          name: data.name || file.replace('.md', ''),
          description: data.description || '',
          status: data.status || 'draft',
          category: category,
          path: `components/${category}/${file}`
        });
      });
    }
  });

  // Scan foundations
  const foundationsPath = path.resolve(docsDir, 'foundations');
  if (fs.existsSync(foundationsPath)) {
    const files = fs.readdirSync(foundationsPath).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const content = fs.readFileSync(path.resolve(foundationsPath, file), 'utf-8');
      const { data } = matter(content);
      manifest.foundations.push({
        slug: file.replace('.md', ''),
        name: data.name || file.replace('.md', ''),
        description: data.description || '',
        path: `foundations/${file}`
      });
    });
  }

  // Scan patterns
  const patternsPath = path.resolve(docsDir, 'patterns');
  if (fs.existsSync(patternsPath)) {
    const files = fs.readdirSync(patternsPath).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const content = fs.readFileSync(path.resolve(patternsPath, file), 'utf-8');
      const { data } = matter(content);
      manifest.patterns.push({
        slug: file.replace('.md', ''),
        name: data.name || file.replace('.md', ''),
        description: data.description || '',
        path: `patterns/${file}`
      });
    });
  }

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(
    path.resolve(publicDir, 'docs-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`  Found ${manifest.components.atoms.length} atoms`);
  console.log(`  Found ${manifest.components.molecules.length} molecules`);
  console.log(`  Found ${manifest.components.organisms.length} organisms`);
  console.log(`  Found ${manifest.foundations.length} foundations`);
  console.log(`  Found ${manifest.patterns.length} patterns`);
}

// Copy docs to dist folder
function copyDocsToDistSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDocsToDistSync(srcPath, destPath);
    } else if (entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main build process
async function build() {
  const manifestOnly = process.argv.includes('--manifest-only');

  if (manifestOnly) {
    console.log('Generating docs manifest for development...');
    generateDocsManifest();
    console.log('Manifest generated successfully.');
    return;
  }

  console.log('\nBuilding GDS Documentation Website\n');
  console.log('='.repeat(40));

  // Step 1: Generate manifest
  generateDocsManifest();

  // Step 2: Run Vite build
  console.log('\nRunning Vite build...');
  execSync('npx vite build', { cwd: websiteDir, stdio: 'inherit' });

  // Step 3: Copy docs to dist
  console.log('\nCopying documentation files...');
  const distDocsDir = path.resolve(distDir, 'docs');
  copyDocsToDistSync(docsDir, distDocsDir);

  console.log('\n' + '='.repeat(40));
  console.log('Build complete!');
  console.log(`Output: ${distDir}`);
}

build().catch(console.error);
