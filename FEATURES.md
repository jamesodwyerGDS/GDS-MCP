# GDS-MCP Features

This document tracks the features that have been built and what's planned for future development.

## Legend

| Status | Meaning |
|--------|---------|
| :white_check_mark: | Completed |
| :construction: | In Progress |
| :clipboard: | Planned |
| :bulb: | Under Consideration |

---

## Completed Features

### Core Documentation Generation

| Feature | Status | Description |
|---------|--------|-------------|
| Figma Documentation Generator | :white_check_mark: | Extract component data from Figma and generate structured markdown |
| Figma MCP Client | :white_check_mark: | Wrapper for Figma MCP server with methods for metadata, design context, variables, styles |
| **Figma Design Specs Extractor** | :white_check_mark: | **Token-efficient Figma API extraction for detailed design specs (~75% fewer tokens vs MCP)** |
| Markdown Transformer | :white_check_mark: | Converts Figma data to structured markdown with YAML frontmatter |
| Component Categorization | :white_check_mark: | Auto-categorizes components as atoms, molecules, or organisms |
| Design Token Extraction | :white_check_mark: | Extracts colours, spacing, typography, elevation tokens from Figma |

### Multi-Source Documentation

| Feature | Status | Description |
|---------|--------|-------------|
| Storybook Documentation Generator | :white_check_mark: | Parses React components and generates engineer-focused docs (52 components) |
| Vibe Documentation Generator | :white_check_mark: | Generates ShadCN specs, Tailwind snippets, and single-file summaries for AI tools |
| Unified Documentation Generator | :white_check_mark: | Combines design, storybook, and vibe docs into single component files (67 components) |

### CLI Commands

| Command | Status | Description |
|---------|--------|-------------|
| `npm run docs:generate` | :white_check_mark: | Generate docs for a single Figma component |
| `npm run docs:generate-all` | :white_check_mark: | Batch generation from components.json |
| `npm run storybook:generate` | :white_check_mark: | Generate Storybook documentation |
| `npm run vibe:generate` | :white_check_mark: | Generate all vibe formats |
| `npm run vibe:shadcn` | :white_check_mark: | Generate ShadCN format only |
| `npm run vibe:tailwind` | :white_check_mark: | Generate Tailwind HTML snippets only |
| `npm run unified:generate` | :white_check_mark: | Generate unified documentation |
| `npm run docs:validate` | :white_check_mark: | Validate frontmatter schema |
| `npm run analyze` | :white_check_mark: | Analyze documentation coverage and gaps |
| `npm run build:all` | :white_check_mark: | Run all generators in sequence |

### MCP Server & Integration

| Feature | Status | Description |
|---------|--------|-------------|
| Custom GDS MCP Server | :white_check_mark: | Provides `get_component_docs`, `get_design_token`, `search_gds` tools |
| Remote MCP Configuration | :white_check_mark: | GitMCP integration at `gitmcp.io/jamesodwyerGDS/GDS-MCP` |
| Figma MCP Integration | :white_check_mark: | Official Figma MCP at `mcp.figma.com/mcp` |
| Audience Filtering | :white_check_mark: | Filter docs by audience: design, engineer, vibe, or all |

### Automation & Monitoring

| Feature | Status | Description |
|---------|--------|-------------|
| GitHub Actions: Build Docs | :white_check_mark: | Auto-generate docs on push to main |
| GitHub Actions: Monitor Efficiency | :white_check_mark: | Weekly coverage reports (Mondays 9am UTC) |
| Slack Notifications | :white_check_mark: | Real-time alerts for doc generation and errors |
| Efficiency Analysis | :white_check_mark: | Coverage metrics, gap detection, staleness checking |

### Developer Experience

| Feature | Status | Description |
|---------|--------|-------------|
| `/figma-doc` Skill | :white_check_mark: | Claude Code skill for quick doc generation from Figma URLs |
| Plugin Marketplace | :white_check_mark: | Distributable as Claude Code plugin |
| Frontmatter Validation | :white_check_mark: | Schema validation for all documentation |
| CHANGELOG Management | :white_check_mark: | Automatic changelog updates |

### Documentation Output

| Feature | Status | Description |
|---------|--------|-------------|
| Design Documentation | :white_check_mark: | 25 components with design specs |
| Storybook Documentation | :white_check_mark: | 52 components with code examples |
| Vibe Documentation | :white_check_mark: | 25 components in AI-friendly formats |
| Unified Documentation | :white_check_mark: | 67 combined component docs |
| `llms.txt` Generation | :white_check_mark: | AI context files for each doc set |

---

## Pipeline Features

### High Priority

| Feature | Status | Description | Notes |
|---------|--------|-------------|-------|
| Component Diff Detection | :clipboard: | Detect changes between Figma and docs | Would enable incremental updates |
| Webhook Triggers | :clipboard: | Trigger doc generation from Figma webhooks | Real-time sync with Figma changes |
| Missing Design Doc Generation | :clipboard: | Auto-generate docs for 29 missing components | Currently identified via efficiency analysis |
| Version History Tracking | :clipboard: | Track doc versions with full history | Beyond current changelog |

### Medium Priority

| Feature | Status | Description | Notes |
|---------|--------|-------------|-------|
| Search API | :clipboard: | REST API for searching documentation | Extend MCP server functionality |
| Component Dependency Graph | :clipboard: | Visualize relationships between components | Could use mermaid diagrams |
| Token Usage Analysis | :clipboard: | Report which components use which tokens | Help maintain token consistency |
| Multi-Theme Support | :clipboard: | Generate docs for multiple theme variants | Light/dark mode documentation |
| Documentation Metrics Dashboard | :clipboard: | Web dashboard for coverage metrics | Visual alternative to CLI reports |

### Low Priority / Under Consideration

| Feature | Status | Description | Notes |
|---------|--------|-------------|-------|
| PDF Export | :bulb: | Export component docs as PDFs | For offline/print use |
| Figma Plugin | :bulb: | In-Figma documentation preview | View generated docs directly in Figma |
| Component Playground | :bulb: | Interactive component previews | Could use Storybook embeds |
| AI-Generated Descriptions | :bulb: | LLM-enhanced component descriptions | Improve consistency and quality |
| Design Review Workflow | :bulb: | PR-based design change approvals | Git-based design governance |
| Accessibility Audit Tool | :bulb: | Automated WCAG compliance checking | Extend validation capabilities |
| Translation Support | :bulb: | Multi-language documentation | i18n for global teams |
| Component Analytics | :bulb: | Track which docs are most accessed | Requires analytics integration |

---

## Recently Completed

| Feature | Completed | PR/Commit |
|---------|-----------|-----------|
| Figma Design Specs Extractor | Jan 2026 | - |
| Slack Notifications | Oct 2024 | `49eee4d` |
| Efficiency Monitoring Tools | Oct 2024 | `22a60d4` |
| Remote MCP Configuration | Oct 2024 | `4e4554c` |
| README Documentation | Oct 2024 | `4e4554c` |

### Figma Design Specs Extractor Details

The new **Figma Design Specs Extractor** provides a token-efficient alternative to using Figma MCP for extracting detailed design specifications.

**What it extracts:**
- Dimensions (width, height)
- Layout (auto-layout direction, alignment, sizing)
- Spacing (padding, gap, row gap)
- Fills (solid colors, gradients, images)
- Strokes (border width, color, style, position)
- Effects (drop shadows, inner shadows, blurs)
- Typography (font family, weight, size, line height, letter spacing)
- Corner radius (uniform or per-corner)
- Child element summaries

**Token efficiency:**
- Direct Figma API: ~500-2000 tokens per component
- Figma MCP: ~2000-5000+ tokens (conversational responses)
- **Savings: ~75% fewer tokens**

**Usage:**
```bash
# Design specs are included by default
npm run docs:generate -- --url="https://figma.com/file/..."

# Skip design specs if not needed
npm run docs:generate -- --url="..." --no-design-specs
```

---

## Known Gaps

Based on the latest efficiency analysis:

- **29 components** missing design documentation
- **5 components** missing from Storybook
- Some unified docs may be stale vs. source docs

Run `npm run analyze` for the current gap report.

---

## Contributing

When adding new features:

1. Update this file with the feature status
2. Add appropriate documentation
3. Update CHANGELOG.md
4. Run `npm run docs:validate` to ensure schema compliance

---

## Feature Requests

To request a new feature, open an issue with:
- Clear description of the feature
- Use case / problem it solves
- Proposed implementation approach (optional)
