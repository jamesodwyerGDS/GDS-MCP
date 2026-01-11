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

## 11th Jan 2025

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Added `/project-summary` skill for updating PROJECT-SUMMARY.md | 🟢 Added | NA | NA | NA |
| Added skills/resources folder with project-summary-template.md | 🟢 Added | NA | NA | NA |
| Created PROJECT-SUMMARY.md with features, learnings, and Claude tools used | 🟢 Added | NA | NA | NA |

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
