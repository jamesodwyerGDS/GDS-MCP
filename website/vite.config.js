import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import matter from 'gray-matter';

// Plugin to generate docs manifest at build time
function docsManifestPlugin() {
  return {
    name: 'docs-manifest',
    buildStart() {
      generateDocsManifest();
    },
    configureServer(server) {
      // Regenerate manifest when docs change
      server.watcher.add(resolve(__dirname, '../docs'));
      server.watcher.on('change', (path) => {
        if (path.includes('/docs/') && path.endsWith('.md')) {
          generateDocsManifest();
        }
      });
    }
  };
}

function generateDocsManifest() {
  const docsDir = resolve(__dirname, '../docs');
  const manifest = {
    components: { atoms: [], molecules: [], organisms: [] },
    foundations: [],
    patterns: []
  };

  // Scan components
  ['atoms', 'molecules', 'organisms'].forEach(category => {
    const categoryPath = resolve(docsDir, 'components', category);
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        const content = fs.readFileSync(resolve(categoryPath, file), 'utf-8');
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
  const foundationsPath = resolve(docsDir, 'foundations');
  if (fs.existsSync(foundationsPath)) {
    const files = fs.readdirSync(foundationsPath).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const content = fs.readFileSync(resolve(foundationsPath, file), 'utf-8');
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
  const patternsPath = resolve(docsDir, 'patterns');
  if (fs.existsSync(patternsPath)) {
    const files = fs.readdirSync(patternsPath).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const content = fs.readFileSync(resolve(patternsPath, file), 'utf-8');
      const { data } = matter(content);
      manifest.patterns.push({
        slug: file.replace('.md', ''),
        name: data.name || file.replace('.md', ''),
        description: data.description || '',
        path: `patterns/${file}`
      });
    });
  }

  fs.writeFileSync(
    resolve(__dirname, 'public/docs-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

// Plugin to serve docs from parent directory
function serveDocsPlugin() {
  return {
    name: 'serve-docs',
    configureServer(server) {
      server.middlewares.use('/docs', (req, res, next) => {
        const filePath = resolve(__dirname, '../docs', req.url.slice(1));
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          res.end(content);
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [docsManifestPlugin(), serveDocsPlugin()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyDirOnBuild: true
  },
  server: {
    port: 3000,
    open: true
  }
});
