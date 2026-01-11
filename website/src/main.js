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
    this.currentPath = null;
    this.docsCache = new Map();
    this.allDocs = [];
    this.statusFilter = 'all';
    this.init();
  }

  async init() {
    await this.loadManifest();
    this.buildDocsIndex();
    this.renderNavigation();
    this.renderStats();
    this.setupSearch();
    this.setupStatusFilter();
    this.setupRouting();
    this.setupTheme();
    this.setupKeyboardNav();
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

  buildDocsIndex() {
    this.allDocs = [];

    // Add all components
    ['atoms', 'molecules', 'organisms'].forEach(category => {
      this.manifest.components[category].forEach(item => {
        this.allDocs.push({
          ...item,
          path: `components/${category}/${item.slug}`,
          type: 'component'
        });
      });
    });

    // Add foundations
    this.manifest.foundations.forEach(item => {
      this.allDocs.push({
        ...item,
        path: `foundations/${item.slug}`,
        type: 'foundation'
      });
    });

    // Add patterns
    this.manifest.patterns.forEach(item => {
      this.allDocs.push({
        ...item,
        path: `patterns/${item.slug}`,
        type: 'pattern'
      });
    });
  }

  // Theme Management
  setupTheme() {
    const savedTheme = localStorage.getItem('gds-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeToggle(savedTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('gds-theme', newTheme);
    this.updateThemeToggle(newTheme);
  }

  updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  // Keyboard Navigation
  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Only handle if not in an input
      if (e.target.tagName === 'INPUT') return;

      if (e.key === 'ArrowLeft' || e.key === 'j') {
        e.preventDefault();
        this.navigatePrev();
      } else if (e.key === 'ArrowRight' || e.key === 'k') {
        e.preventDefault();
        this.navigateNext();
      } else if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        document.getElementById('search')?.focus();
      } else if (e.key === 'Escape') {
        document.getElementById('search')?.blur();
      }
    });
  }

  navigatePrev() {
    if (!this.currentPath) return;
    const currentIndex = this.allDocs.findIndex(d => d.path === this.currentPath);
    if (currentIndex > 0) {
      this.navigateTo(this.allDocs[currentIndex - 1].path);
    }
  }

  navigateNext() {
    if (!this.currentPath) return;
    const currentIndex = this.allDocs.findIndex(d => d.path === this.currentPath);
    if (currentIndex < this.allDocs.length - 1) {
      this.navigateTo(this.allDocs[currentIndex + 1].path);
    }
  }

  // Status Filter
  setupStatusFilter() {
    const filterContainer = document.getElementById('status-filter');
    if (!filterContainer) return;

    filterContainer.innerHTML = `
      <select id="status-select" class="status-select">
        <option value="all">All statuses</option>
        <option value="stable">Stable</option>
        <option value="beta">Beta</option>
        <option value="draft">Draft</option>
        <option value="deprecated">Deprecated</option>
      </select>
    `;

    document.getElementById('status-select').addEventListener('change', (e) => {
      this.statusFilter = e.target.value;
      this.applyFilters();
    });
  }

  applyFilters() {
    const query = document.getElementById('search')?.value.toLowerCase() || '';
    const navLinks = document.querySelectorAll('.nav-link');
    const navSections = document.querySelectorAll('.nav-section');

    navLinks.forEach(link => {
      const text = link.textContent.toLowerCase();
      const status = link.dataset.status || '';
      const matchesQuery = !query || text.includes(query);
      const matchesStatus = this.statusFilter === 'all' || status === this.statusFilter;
      link.style.display = matchesQuery && matchesStatus ? '' : 'none';
    });

    // Hide empty sections
    navSections.forEach(section => {
      const visibleLinks = section.querySelectorAll('.nav-link:not([style*="display: none"])');
      section.style.display = visibleLinks.length > 0 ? '' : 'none';
    });
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
      <div class="nav-link" data-path="${basePath}/${item.slug}" data-status="${item.status || ''}">
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

    searchInput.addEventListener('input', () => {
      this.applyFilters();
    });
  }

  filterNavigation(query) {
    this.applyFilters();
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

  // Table of Contents generation
  generateTableOfContents(htmlContent) {
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;
    const headings = temp.querySelectorAll('h2, h3');

    if (headings.length < 2) return '';

    let tocHtml = '<nav class="table-of-contents"><h3>On this page</h3><ul>';
    let currentLevel = 2;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent;
      const id = `heading-${index}`;
      heading.id = id;

      if (level > currentLevel) {
        tocHtml += '<ul>';
      } else if (level < currentLevel) {
        tocHtml += '</ul>';
      }
      currentLevel = level;

      tocHtml += `<li class="toc-level-${level}"><a href="#${id}">${text}</a></li>`;
    });

    tocHtml += '</ul></nav>';

    // Update the original content with IDs
    const updatedContent = temp.innerHTML;
    return { toc: tocHtml, content: updatedContent };
  }

  // Copy code button functionality
  setupCopyButtons() {
    document.querySelectorAll('.markdown-content pre').forEach(pre => {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn';
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
      copyBtn.title = 'Copy code';

      copyBtn.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent;
        try {
          await navigator.clipboard.writeText(code);
          copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
            copyBtn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });

      wrapper.appendChild(copyBtn);
    });
  }

  // Navigation hints
  renderNavHints() {
    const currentIndex = this.allDocs.findIndex(d => d.path === this.currentPath);
    const prev = currentIndex > 0 ? this.allDocs[currentIndex - 1] : null;
    const next = currentIndex < this.allDocs.length - 1 ? this.allDocs[currentIndex + 1] : null;

    if (!prev && !next) return '';

    return `
      <nav class="doc-nav-hints">
        ${prev ? `
          <a href="#${prev.path}" class="nav-hint prev" onclick="event.preventDefault(); window.location.hash='${prev.path}';">
            <span class="nav-hint-label">Previous</span>
            <span class="nav-hint-title">${this.formatName(prev.name)}</span>
          </a>
        ` : '<div></div>'}
        ${next ? `
          <a href="#${next.path}" class="nav-hint next" onclick="event.preventDefault(); window.location.hash='${next.path}';">
            <span class="nav-hint-label">Next</span>
            <span class="nav-hint-title">${this.formatName(next.name)}</span>
          </a>
        ` : '<div></div>'}
      </nav>
    `;
  }

  async loadDocument(path) {
    const content = document.getElementById('content');
    const header = document.getElementById('content-header');
    this.currentPath = path;

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

      // Render markdown content and generate TOC
      let htmlContent = marked(markdown);
      const tocResult = this.generateTableOfContents(htmlContent);
      const tocHtml = tocResult.toc || '';
      htmlContent = tocResult.content || htmlContent;

      // Get navigation hints
      const navHintsHtml = this.renderNavHints();

      content.innerHTML = `
        <div class="markdown-content">
          ${metaHtml}
          ${figmaEmbedHtml}
          <div class="content-with-toc">
            <div class="content-main">
              ${htmlContent}
              ${navHintsHtml}
            </div>
            ${tocHtml ? `<aside class="toc-sidebar">${tocHtml}</aside>` : ''}
          </div>
        </div>
      `;

      // Setup copy buttons after content is rendered
      this.setupCopyButtons();

      // Scroll to top
      content.scrollTop = 0;

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
