import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isWatch = process.argv.includes('--watch');

// Ensure dist directory exists
const distDir = join(__dirname, 'dist');
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Build the plugin code
async function buildCode() {
  const ctx = await esbuild.context({
    entryPoints: [join(__dirname, 'src/code.ts')],
    bundle: true,
    outfile: join(__dirname, 'dist/code.js'),
    target: 'es2017',
    format: 'iife',
    sourcemap: false,
    minify: !isWatch,
    logLevel: 'info',
  });

  if (isWatch) {
    await ctx.watch();
    console.log('Watching code.ts for changes...');
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

// Copy and process UI HTML
function buildUI() {
  const srcPath = join(__dirname, 'src/ui.html');
  const destPath = join(__dirname, 'dist/ui.html');

  const html = readFileSync(srcPath, 'utf-8');
  writeFileSync(destPath, html);
  console.log('UI HTML copied to dist/');
}

// Run builds
async function build() {
  console.log(isWatch ? 'Starting watch mode...' : 'Building plugin...');

  buildUI();
  await buildCode();

  if (!isWatch) {
    console.log('Build complete!');
  }
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
