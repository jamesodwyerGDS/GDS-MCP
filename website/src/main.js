import { marked } from 'marked';
import matter from 'gray-matter';

// Configure marked for better rendering
marked.setOptions({
  gfm: true,
  breaks: true
});

class DocsApp {
  constructor() {
    this.manifest = null;
    this.currentDoc = null;
    this.docsCache = new Map();
    this.init();
  }

  async init() {
    await this.loadManifest();
    this.renderNavigation();
    this.renderStats();
    this.setupSearch();
    this.setupRouting();
  }

  async loadManifest() {
    try {
      const response = await fetch('/docs-manifest.json');
      this.manifest = await response.json();
    } catch (error) {
      console.error('Failed to load docs manifest:', error);
      this.manifest = {
        components: { atoms: [], molecules: [], organisms: [] },
        foundations: [],
        patterns: []
      };
    }
  }

  renderNavigation() {
    const nav = document.getElementById('nav');

    let html = '';

    // Components section
    const totalComponents =
      this.manifest.components.atoms.length +
      this.manifest.components.molecules.length +
      this.manifest.components.organisms.length;

    if (totalComponents > 0) {
      html += `<div class="nav-section">
        <div class="nav-section-title">Components</div>`;

      // Atoms
      if (this.manifest.components.atoms.length > 0) {
        html += `<div class="nav-subsection-title">Atoms</div>`;
        this.manifest.components.atoms.forEach(item => {
          html += this.renderNavItem(item, 'components/atoms');
        });
      }

      // Molecules
      if (this.manifest.components.molecules.length > 0) {
        html += `<div class="nav-subsection-title">Molecules</div>`;
        this.manifest.components.molecules.forEach(item => {
          html += this.renderNavItem(item, 'components/molecules');
        });
      }

      // Organisms
      if (this.manifest.components.organisms.length > 0) {
        html += `<div class="nav-subsection-title">Organisms</div>`;
        this.manifest.components.organisms.forEach(item => {
          html += this.renderNavItem(item, 'components/organisms');
        });
      }

      html += `</div>`;
    }

    // Foundations section
    if (this.manifest.foundations.length > 0) {
      html += `<div class="nav-section">
        <div class="nav-section-title">Foundations</div>`;
      this.manifest.foundations.forEach(item => {
        html += this.renderNavItem(item, 'foundations');
      });
      html += `</div>`;
    }

    // Patterns section
    if (this.manifest.patterns.length > 0) {
      html += `<div class="nav-section">
        <div class="nav-section-title">Patterns</div>`;
      this.manifest.patterns.forEach(item => {
        html += this.renderNavItem(item, 'patterns');
      });
      html += `</div>`;
    }

    nav.innerHTML = html;

    // Add click handlers
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const path = e.currentTarget.dataset.path;
        this.navigateTo(path);
      });
    });
  }

  renderNavItem(item, basePath) {
    const statusClass = item.status ? `status-badge ${item.status}` : '';
    const statusBadge = item.status ? `<span class="${statusClass}">${item.status}</span>` : '';

    return `
      <div class="nav-link" data-path="${basePath}/${item.slug}">
        <span>${this.formatName(item.name)}</span>
        ${statusBadge}
      </div>
    `;
  }

  formatName(name) {
    // Convert kebab-case or slug to Title Case
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  renderStats() {
    const stats = document.getElementById('stats');
    if (!stats) return;

    const atomsCount = this.manifest.components.atoms.length;
    const moleculesCount = this.manifest.components.molecules.length;
    const organismsCount = this.manifest.components.organisms.length;
    const foundationsCount = this.manifest.foundations.length;
    const patternsCount = this.manifest.patterns.length;
    const totalCount = atomsCount + moleculesCount + organismsCount + foundationsCount + patternsCount;

    stats.innerHTML = `
      <div class="stat-card">
        <div class="stat-value">${totalCount}</div>
        <div class="stat-label">Total Docs</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${atomsCount}</div>
        <div class="stat-label">Atoms</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${foundationsCount}</div>
        <div class="stat-label">Foundations</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${patternsCount}</div>
        <div class="stat-label">Patterns</div>
      </div>
    `;
  }

  setupSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      this.filterNavigation(query);
    });
  }

  filterNavigation(query) {
    const navLinks = document.querySelectorAll('.nav-link');
    const navSections = document.querySelectorAll('.nav-section');
    const navSubsections = document.querySelectorAll('.nav-subsection-title');

    if (!query) {
      navLinks.forEach(link => link.style.display = '');
      navSections.forEach(section => section.style.display = '');
      navSubsections.forEach(sub => sub.style.display = '');
      return;
    }

    navLinks.forEach(link => {
      const text = link.textContent.toLowerCase();
      link.style.display = text.includes(query) ? '' : 'none';
    });

    // Hide empty sections
    navSections.forEach(section => {
      const visibleLinks = section.querySelectorAll('.nav-link:not([style*="display: none"])');
      section.style.display = visibleLinks.length > 0 ? '' : 'none';
    });
  }

  setupRouting() {
    // Handle initial route
    this.handleRoute();

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
  }

  handleRoute() {
    const path = window.location.hash.slice(1) || '';
    if (path) {
      this.loadDocument(path);
    }
  }

  navigateTo(path) {
    window.location.hash = path;
    this.loadDocument(path);
  }

  async loadDocument(path) {
    const content = document.getElementById('content');
    const header = document.getElementById('content-header');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.path === path);
    });

    try {
      // Try to fetch from cache first
      let docContent;
      if (this.docsCache.has(path)) {
        docContent = this.docsCache.get(path);
      } else {
        const response = await fetch(`/docs/${path}.md`);
        if (!response.ok) throw new Error('Document not found');
        docContent = await response.text();
        this.docsCache.set(path, docContent);
      }

      // Parse frontmatter and content
      const { data: frontmatter, content: markdown } = matter(docContent);

      // Render breadcrumb
      const pathParts = path.split('/');
      header.innerHTML = `
        <nav class="breadcrumb">
          <a href="#">Home</a>
          ${pathParts.map((part, i) => {
            const isLast = i === pathParts.length - 1;
            return isLast
              ? `<span>/</span><span>${this.formatName(part)}</span>`
              : `<span>/</span><span>${this.formatName(part)}</span>`;
          }).join('')}
        </nav>
      `;

      // Render component metadata if available
      let metaHtml = '';
      if (frontmatter.status || frontmatter.version) {
        metaHtml = `<div class="component-meta">`;
        if (frontmatter.status) {
          metaHtml += `<div class="meta-item"><strong>Status:</strong> <span class="status-badge ${frontmatter.status}">${frontmatter.status}</span></div>`;
        }
        if (frontmatter.version) {
          metaHtml += `<div class="meta-item"><strong>Version:</strong> ${frontmatter.version}</div>`;
        }
        if (frontmatter.updated) {
          metaHtml += `<div class="meta-item"><strong>Updated:</strong> ${frontmatter.updated}</div>`;
        }
        metaHtml += `</div>`;
      }

      // Render Figma embed if available
      let figmaEmbedHtml = '';
      if (frontmatter.figmaFileKey && frontmatter.figmaNodeId) {
        const nodeId = frontmatter.figmaNodeId.replace(':', '-');
        const figmaUrl = `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${frontmatter.figmaFileKey}?node-id=${nodeId}`;
        const figmaLink = `https://www.figma.com/file/${frontmatter.figmaFileKey}?node-id=${frontmatter.figmaNodeId}`;

        figmaEmbedHtml = `
          <div class="figma-embed-section">
            <div class="figma-embed-header">
              <h2>Figma Preview</h2>
              <a href="${figmaLink}" target="_blank" rel="noopener noreferrer" class="figma-link">
                Open in Figma
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
            <div class="figma-embed-container">
              <iframe
                src="${figmaUrl}"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        `;
      }

      // Render markdown content
      const htmlContent = marked(markdown);
      content.innerHTML = `
        <div class="markdown-content">
          ${metaHtml}
          ${figmaEmbedHtml}
          ${htmlContent}
        </div>
      `;

    } catch (error) {
      console.error('Failed to load document:', error);
      content.innerHTML = `
        <div class="welcome">
          <h1>Document Not Found</h1>
          <p>The requested documentation could not be loaded.</p>
        </div>
      `;
    }
  }
}

// Initialize the app
new DocsApp();
