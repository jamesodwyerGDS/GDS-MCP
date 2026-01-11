# GDS-MCP Project Summary

> Last updated: 11th January 2025 (refreshed)

## What It Is

An MCP-powered documentation workflow that extracts design system components from Figma and generates structured markdown documentation optimized for AI/LLM retrieval. No framework-specific code - just universal design documentation.

---

## Key Features Built

| Feature | Description |
|---------|-------------|
| **Documentation Generator** | Orchestrates Figma extraction → markdown conversion with 14 structured sections per component |
| **Multi-Format Output** | Generates 3 parallel doc formats: Design specs, Storybook specs, and Vibe snippets (ShadCN/Tailwind) |
| **Custom MCP Server** | 3 tools for efficient doc retrieval: `get_component_docs`, `get_design_token`, `search_gds` |
| **Smart Search** | Query expansion with aliases, FAQ matching, and relevance ranking |
| **Slack Notifications** | Automated notifications on documentation generation (success/failure) |
| **Unified Docs** | Combines all sources into single-file per-component documentation |
| **/figma-doc Skill** | One-command documentation generation from any Figma URL |
| **/project-summary Skill** | Keep this summary up-to-date with current project state |

---

## Current Coverage

| Metric | Count |
|--------|-------|
| Design docs | 37 |
| Storybook specs | 56 |
| Vibe snippets | 26 |
| Unified docs | 59 |
| Total documentation lines | 32,200+ |

---

## Key Claude Tools Used

| Tool | Purpose |
|------|---------|
| **Figma MCP** (`mcp.figma.com`) | Extracts component data, variants, design tokens, and screenshots from Figma |
| **Filesystem MCP** | Reads/writes generated documentation files |
| **Claude Code Skills** | `/figma-doc` automates URL → markdown; `/project-summary` updates this file |
| **GitMCP** (`gitmcp.io`) | Enables remote access to documentation via MCP for other users/tools |
| **Custom GDS MCP Server** | Provides optimized search and retrieval tools specific to design system needs |

---

## Key Learnings

1. **Design docs only, no framework code** - Keeping output framework-agnostic makes documentation universally useful across React, Vue, native, etc.

2. **LLM-optimized chunking** - Sections are self-contained at 250-512 tokens for optimal RAG retrieval

3. **Multi-audience approach** - Different consumers (designers, engineers, AI tools) need different doc formats from the same source

4. **MCP as the integration layer** - Using MCP protocols allows seamless Figma → documentation pipelines without custom API integrations

5. **Automated changelog** - Every documentation change updates CHANGELOG.md automatically, maintaining audit trail

6. **llms.txt for AI context** - Generating an `llms.txt` file makes the documentation instantly accessible to AI assistants via GitMCP

---

## Architecture

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  Figma MCP  │────▶│  Documentation  │────▶│  docs/           │
│             │     │  Generator      │     │  docs-storybook/ │
└─────────────┘     │                 │     │  docs-vibe/      │
                    │  • FigmaClient  │     │  docs-unified/   │
                    │  • Transformer  │     └──────────────────┘
                    │  • SlackNotify  │              │
                    └─────────────────┘              ▼
                                            ┌──────────────────┐
                                            │  GDS MCP Server  │
                                            │  • get_component │
                                            │  • get_token     │
                                            │  • search_gds    │
                                            └──────────────────┘
                                                     │
                                                     ▼
                                            ┌──────────────────┐
                                            │  GitMCP (remote) │
                                            │  jamesodwyerGDS/ │
                                            │  GDS-MCP         │
                                            └──────────────────┘
```

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/jamesodwyerGDS/GDS-MCP.git
cd GDS-MCP
npm install

# Set Figma token
export FIGMA_TOKEN=your_token

# Generate docs from a Figma URL
/figma-doc https://figma.com/design/ABC123/File?node-id=1:234

# Or via CLI
npm run docs:generate -- --url="https://figma.com/file/..."

# Generate all formats
npm run build:all
```

---

## Recent Updates

| Date | Change |
|------|--------|
| 11th Jan 2025 | Added `/project-summary` skill and PROJECT-SUMMARY.md |
| 6th Jan 2025 | Added README.md, remote MCP config, and Slack notifications |
| 14th Nov 2024 | Added Mastercard click-to-pay payment icon |
| 30th Oct 2024 | Added missing error state to dropdown, design bug fixes |

---

## Available Skills

| Skill | Usage | Description |
|-------|-------|-------------|
| `/figma-doc` | `/figma-doc <url>` | Generate markdown docs from Figma component |
| `/project-summary` | `/project-summary` | Update this PROJECT-SUMMARY.md file |

---

## Project Structure

```
/core                  # Documentation generation engine
/scripts               # CLI entry points
/mcp-server            # Custom MCP server with 3 tools
/docs                  # Generated design documentation
/docs-storybook        # Storybook component specs
/docs-vibe             # ShadCN/Tailwind snippets
/docs-unified          # Combined multi-audience docs
/.claude/skills        # Claude Code skills
/templates             # Documentation templates
```
