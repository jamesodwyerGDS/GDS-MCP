# Changelog

A changelog is a document that records chronologically the changes made to UI kit, including bug fixes, new features, and other modifications.

## Maintaining This Changelog

**Important:** Any changes to documentation files or Figma designs must be recorded in this changelog.

### When to Add an Entry

Add a new entry when:
- A new component, variant, or style is added to Figma or documentation
- An existing component, variant, or style is updated
- A component, variant, or style is deprecated or removed
- Design tokens (colours, typography, spacing) are modified
- Bug fixes are applied to Figma components
- Documentation is significantly updated

### How to Add an Entry

1. Add a new date section at the top (below the Legend) if the date doesn't exist
2. Use the table format with columns: Change | Type | JIRA | Figma | Storybook
3. Use the appropriate type indicator:
   - 🟢 Added - for new additions
   - 🟡 Updated - for modifications and bug fixes
   - 🔴 Deprecated - for removals
4. Include links where available (use "NA" if not applicable)

### Entry Template

```markdown
## {Day}{Ordinal} {Month} {Year}

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Description of change | 🟢/🟡/🔴 | [GDS-XXX](url) or NA | [Figma Link](url) or NA | [Storybook Link](url) or NA |
```

---

## Legend

- 🟢 Added a new component, variant or style
- 🟡 Updated existing component, variant or style
- 🔴 Deprecated/removed existing component, variant or style

---

## 15th Jan 2026

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Added `/figma-make-guidelines` skill for generating Tailwind config from design tokens | 🟢 Added | NA | NA | NA |
| Created `guidelines/Guidelines.md` with complete Tailwind configuration for Figma Make | 🟢 Added | NA | NA | NA |

---

## 14th Jan 2026

| Change | Type | JIRA | Figma | Notes |
|--------|------|------|-------|-------|
| **Repository reorganization: Archived discovery docs, removed exploratory scripts, organized configs** | 🟡 Updated | NA | NA | See details below |

### Repository Reorganization

**Archived Discovery Documentation:**
- Moved ALERT_BORDER_FINDINGS.md, ALERT_TEST_RESULTS.md, ALERT_UPDATE_SUMMARY.md to `.archive/discoveries/`
- Moved BORDER_DETECTION.md, BREAKTHROUGH_individualStrokeWeights.md to `.archive/discoveries/`
- Moved FIGMA_API_IMPROVEMENTS.md, RUN_ALERT_REGENERATION.md to `.archive/discoveries/`
- Moved efficiency-report.json to `.archive/metrics/`
- Moved GDS-storybook-originals/ to `.archive/legacy/`
- Added `.archive/README.md` documenting archived content

**Cleaned Up Scripts:**
- Removed 13 exploratory scripts (extract-*.js, fetch-*.js, process-figma-extract.js, etc.)
- Kept core scripts: generate.js, generate-all.js, validate.js, analyze-efficiency.js
- Added comprehensive `scripts/README.md` with usage examples, parameters, and troubleshooting

**Reorganized Configuration:**
- Moved mcp-config.json and mcp.json to `.config/mcp/`
- Added `.config/mcp/README.md` with setup instructions and troubleshooting
- Moved components.example.json to `.example-configs/`
- Added `.example-configs/README.md` with configuration guide

**Updated Documentation:**
- Updated CLAUDE.md with new directory structure and paths
- Updated README.md with references to new documentation locations
- Added cross-references between README files for easy navigation

**Result:** Clean root directory with well-organized subdirectories and comprehensive documentation for all scripts and configurations.

---

| Change | Type | JIRA | Figma | Notes |
|--------|------|------|-------|-------|
| 🎉 **BREAKTHROUGH: Border detection now fully autonomous via `individualStrokeWeights` API field** | 🟢 Added | NA | [Figma](https://figma.com/design/WU01oSRfSHpOxUn3ThcvC5/File?node-id=10410-52040) | Custom stroke detection now 100% accurate. See BREAKTHROUGH_individualStrokeWeights.md |
| Updated border detection to use `individualStrokeWeights` for Custom stroke detection | 🟡 Updated | NA | NA | Correctly detects "8px top only" vs "8px all sides" |
| Removed "API limitation" from BORDER_DETECTION.md - Custom strokes are fully supported | 🟡 Updated | NA | NA | Manual verification no longer required |
| **Corrected Alert component border documentation: 8px top border (was documented as 4px left border)** | 🟡 Updated | NA | [Figma](https://figma.com/design/WU01oSRfSHpOxUn3ThcvC5/File?node-id=10410-52040) | Now detected autonomously via API |
| Removed Storybook documentation infrastructure (docs-storybook/) and all related generation scripts | 🔴 Deprecated | NA | NA | Consolidated to single documentation source in /docs |
| Added comprehensive Figma API improvements to align with official REST API | 🟡 Updated | NA | NA | See details below |

### Technical Improvements

**Figma API Client (`core/figma-client.js`):**
- Added rate limiting and retry logic with exponential backoff
- Implemented request caching (5-minute TTL) for improved performance
- Added `getFileMeta()` for efficient file metadata queries
- Added `exportImages()` for component screenshot generation
- Added `getImageFills()` for extracting image assets
- Added published component/style endpoints (`getTeamComponents`, `getFileComponents`, `getComponent`, etc.)
- Added component set endpoints (`getTeamComponentSets`, `getFileComponentSets`)
- Added style endpoints (`getTeamStyles`, `getFileStyles`, `getStyle`)
- Added `getFileVersions()` for changelog tracking
- Fixed component set detection to handle both node IDs and component keys
- Added `getRateLimitStatus()` and `clearCache()` utility methods
- **🎉 Added `analyzeBorders()` with `individualStrokeWeights` support for Custom stroke detection**
- **Added `describeBorders()` for human-readable border descriptions**
- **Enhanced `getDesignContext()` to extract `individualStrokeWeights` field**
- **Border detection now 100% autonomous - correctly identifies "8px top" vs "8px all sides"**

**Variable Extraction (`core/documentation-generator.js`):**
- Fixed variable extraction to use `resolvedType` instead of name matching
- Now correctly categorizes COLOR, FLOAT, STRING, and BOOLEAN variable types
- Added `formatColorValue()` to convert Figma color objects to hex/rgba
- Improved token structure with name, type, and value for each token

**Markdown Transformer (`core/markdown-transformer.js`):**
- Updated to support new token format with type information
- Added automatic image embedding in documentation
- Updated CSS variables generation for new token structure
- Updated Tailwind mappings to include fontSize alongside colors and spacing
- Improved token display in documentation with type and value columns
- **Added Borders section to Styling with side-by-side weight tables**
- **Automatic detection of border colors with hex/rgba conversion**
- **Special elements detection (color strips, dividers with borders)**

**Documentation Generator:**
- Added image export support (configurable via `exportImages` option)
- Images now automatically embedded in generated markdown
- Rate limit tracking and status available during batch operations
- Added support for `figmaClientOptions` to configure caching and retries
- **Border analysis integrated into component extraction**
- **Child element border detection (color strips, dividers, etc.)**

**Test Suite:**
- Created comprehensive test file (`test/figma-client.test.js`) for all new functionality

### Benefits

These improvements ensure the GDS-MCP workflow correctly aligns with the official Figma REST API v1 specification:
- Reduced API rate limit issues with intelligent retry logic and caching
- More accurate token extraction using native Figma type information
- Better component preview support with automatic image generation
- Enhanced library management via published component/style endpoints
- Version tracking capability for better changelog maintenance

---

## 14th Jan 2025 (earlier)

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Enhanced spacing documentation with CSS shorthand usage examples (single, two, three, four value patterns) and visual spacing token demonstrations | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |
| Added Web Assistant with OpenAI - AI-powered chat interface for 80+ designers with component browser and source citations | 🟢 Added | NA | NA | NA |
| Added Slack bot for designers to query GDS documentation via natural language with local file access (no MCP server needed) | 🟢 Added | NA | NA | NA |
| Processed figma-extract data into structured atom documentation - 27 components enhanced/created with design tokens and variants | 🟡 Updated | NA | NA | NA |
| Created new atomic component documentation: Checkbox, CheckboxControl, Close Button, Loading Indicator, Title Heading, Divider, Payment Icons, Toggler BarBlock, Base Field, Base Loading Spinner, and deprecated components | 🟢 Added | NA | NA | NA |
| Enhanced existing atom documentation with Figma data: Badge, Button, Circle Button, DisplayHeading, Double Range Input, Dropdown, Image, Input Field, Loading Spinner, Pill Button, Radio Button, Square Button, Toggle, Tooltip | 🟡 Updated | NA | NA | NA |

---

## 6th Jan 2025

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| ADDED - README.md with setup instructions for new users | 🟢 Added | NA | NA | NA |
| ADDED - mcp.json for remote MCP configuration via GitMCP | 🟢 Added | NA | NA | NA |
| ADDED - Slack notifications for documentation generation events | 🟢 Added | NA | NA | NA |

---

## 14th Nov 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| ADDED - Payment method icon "Mastercard click to pay" | 🟢 Added | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |

---

## 30th Oct 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| ADDED - Missing error state to the dropdown component | 🟢 Added | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |
| DESIGN BUG FIX - Updated hover state interaction on pagination button | 🟡 Updated | NA | NA | NA |
| DESIGN BUG FIX - Modal component to update button sync across variants | 🟡 Updated | NA | NA | NA |

---

## 15th Oct 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| DESIGN BUG FIX - Fixed the primary button hover state on modal for prototypes | 🟡 Updated | NA | NA | NA |
| DESIGN BUG FIX - Fixed image aspect ratio on mobile variant of side panel | 🟡 Updated | NA | Figma Link | NA |

---

## 8th Oct 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| ADDED a new component - Side panel | 🟢 Added | [GDS-198](https://jira.livenation.com/browse/GDS-198) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](https://global-design-system.git.tmaws.io/gds/?path=/docs/components-sidepanel--docs) |

---

## 7th Oct 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| UPDATED - Mobile size variant of modal component to 375 x 812px | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |
| UPDATED Badge component - Removed left and right spacing on text only badges. Removed the "tax exempt" icon from the tax-exempt badge, as using text within icons is not a recommended practice. | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |

---

## 29th Aug 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| UPDATED - Hover state of dropdown component to align with code | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |
| UPDATED - Double range input component (price slider) - Updated colours of handles and track on the component to pass accessibility. Added missing interaction states for handles and input fields. | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |

---

## 20th Aug 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| New modal component released with key upgrades: Integrated overlay, Size variants, On scroll prop, Updated documentation | 🟢 Added | [GDS-138](https://jira.livenation.com/browse/GDS-138) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/docs/components-modal--docs) |
| Slot Component - Figma only component which allows embedding of local components without needing to detach component instances | 🟢 Added | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |
| Deprecated previous modal component (Figma) | 🔴 Deprecated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |

---

## 6th Aug 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| FIXED design bug on inventory icons where icons were not resizing within the badge component | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |
| FIXED - Design bug on "morning" icon where all elements within the icon were not scaling as expected | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |

---

## 11th July 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Updated existing Modal component to visually align with storybook component. (Phase 1) Note: This version will soon be deprecated and doesn't include upgrades. | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5/(New)-Marketplace-Global-Design-System?m=auto&t=JcPA2uaTGZpyDAyl-1) | NA |

---

## 19th June 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Checkbox component now available and updated in storybook | 🟢 Added | [GDS-166](https://jira.livenation.com/browse/GDS-166) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/docs/components-checkbox--docs) |

---

## 18th June 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Toast component variant with button deprecated to reflect storybook | 🔴 Deprecated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/story/components-alertbox--basic&args=nested:!true) |
| Updated Earth colour value from #01A469 to #048851 to meet WCAG AA minimum requirements for colour contrast when paired with Spotlight text (white) | 🟡 Updated | [GDS-190](https://jira.livenation.com/browse/GDS-190) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/docs/docs-themes--docs) |

---

## 17th June 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Nested Alert Variant now available in storybook | 🟢 Added | [GDS-150](https://jira.livenation.com/browse/GDS-150) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/story/components-alertbox--basic&args=nested:!true) |
| Updated "warning filled" icon for improved accessibility contrast | 🟢 Added | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |

---

## 03 June 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Updated the **Alert** component to fix border radius inconsistencies. Bottom left and right border radius is now set to 2px. | 🟡 Updated | NA | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | NA |
| New Inventory Icons added to the UI library - Updatebase and Original Seat | 🟢 Added | [GDS-184](https://jira.livenation.com/browse/GDS-184), [GDS-183](https://jira.livenation.com/browse/GDS-183) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | Coming soon |

---

## 10 May 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Updated the colour Slate for accessibility | 🟡 Updated | [GDS-171](https://jira.livenation.com/browse/GDS-171) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/docs/docs-themes--docs) |

---

## 30 April 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| 6 new icons added to GDS | 🟢 Added | [GDS-162](https://jira.livenation.com/browse/GDS-162) | NA | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/docs/icons-list--docs) |

---

## 10 April 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Updated payment method icons - Paypal and Twint | 🟡 Updated | [GDS-167](https://jira.livenation.com/browse/GDS-167) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/docs/icons-with-colours--docs) |

---

## 04 April 2024

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Added payment method icons to GDS | 🟢 Added | [GDS-160](https://jira.livenation.com/browse/GDS-160) | [Figma Link](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5) | [Storybook Link](http://global-design-system.git.tmaws.io/gds/?path=/docs/icons-with-colours--docs) |

---

## Source

This changelog was extracted from the [Figma Design Changelog](https://www.figma.com/design/WU01oSRfSHpOxUn3ThcvC5/Marketplace-Global-Design-System?node-id=21614-2609&m=dev).
