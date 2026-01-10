---
name: "ComponentName"
description: "Brief description of the component"
package: "@gds/components"
status: "stable"                # draft | beta | stable | deprecated
version: "1.0.0"
updated: "2025-01-10"

sourceFile: "components/ComponentName/index.tsx"
stylesFile: "components/ComponentName/index.styles.ts"
storiesFile: "components/ComponentName/__stories__/index.stories.tsx"
storyUrl: "http://localhost:6006/?path=/story/components-componentname"

tags: ["form", "interaction"]
keywords: ["click", "submit"]

props:
  - name: "variant"
    type: "string"
    default: "primary"
    required: false
    description: "Visual variant"

tokens:
  spacing:
    - name: "padding"
      token: "spacing.auditorium"
      value: "16px"
  typography:
    - name: "fontSize"
      token: "fontSizes[2]"
      value: "16px"
  colors:
    - name: "background"
      token: "theme._buttons.primary.backgroundColor"
      value: "#024DDF"

relatedComponents:
  - name: "Link"
    relationship: "alternative"
---

# ComponentName

## Overview

Brief description of the component's purpose and primary use cases.

### When to use

- Use this component when...
- Ideal for scenarios involving...

### When not to use

- Do not use for...
- Consider alternatives when...

## Import

```tsx
import ComponentName from '@gds/components/ComponentName';
// or
import { ComponentName } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | No | Visual variant |
| `disabled` | `boolean` | `false` | No | Disables the component |
| `children` | `ReactNode` | - | Yes | Component content |

## Variants

### Primary (default)

```tsx
<ComponentName>Primary</ComponentName>
```

### Secondary

```tsx
<ComponentName variant="secondary">Secondary</ComponentName>
```

## States

| State | Description | Code |
|-------|-------------|------|
| Default | Resting state | `<ComponentName />` |
| Hover | Mouse over | `:hover` pseudo-class |
| Disabled | Non-interactive | `<ComponentName disabled />` |
| Focus | Keyboard focus | `:focus` pseudo-class |

## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| padding | `spacing.auditorium` | 16px |
| gap | `spacing.club` | 8px |
| min-height | `minTapSize` | 44px |

### Typography

| Property | Token | Value |
|----------|-------|-------|
| font-size | `fontSizes[2]` | 16px |
| font-weight | - | 600 |
| line-height | `lineHeight.default` | 1.5 |

### Colors

| State | Token | Description |
|-------|-------|-------------|
| Primary bg | `theme._buttons.primary.backgroundColor` | Primary background |
| Primary fg | `theme._buttons.primary.color` | Primary text color |
| Hover | `dark(backgroundColor)` | Darkened on hover |
| Disabled | `theme._buttons.disabled` | Disabled state colors |

### Border & Radius

| Property | Value |
|----------|-------|
| border-width | 1px |
| border-style | solid |
| border-radius | 4px |

## Styled Components Source

```ts
// From index.styles.ts
const baseStyles = css`
  position: relative;
  display: inline-block;
  min-height: ${minTapSize};
  padding: ${spacing.club} ${spacing.auditorium};
  border-radius: 4px;
  font-weight: 600;
`;
```

## Code Examples

### Basic Usage

```tsx
<ComponentName>Click Me!</ComponentName>
```

### With Props

```tsx
<ComponentName
  variant="secondary"
  disabled={false}
>
  Secondary Action
</ComponentName>
```

### With Icons

```tsx
import CheckmarkIcon from '@gds/icons/CheckmarkIcon';

<ComponentName startIcon={<CheckmarkIcon />}>
  With Icon
</ComponentName>
```

### Full Width

```tsx
<ComponentName fullWidth>
  Full Width Button
</ComponentName>
```

## Accessibility

- **Keyboard navigation**: Accessible via Tab, activated with Enter/Space
- **Focus indicators**: Visible focus ring with `outline-offset: 4px`
- **Screen readers**: Proper semantic element with ARIA support
- **High contrast**: Supports forced-colors mode with adjusted padding

## Do's and Don'ts

### Do's

- Use descriptive labels that indicate the action
- Maintain consistent sizing within a context
- Use loading state for async operations

### Don'ts

- Don't use multiple primary actions in the same view
- Don't disable buttons without explaining why
- Don't override built-in accessibility features

## Related Components

- [Link](./link.md) - For navigation actions
- [IconButton](./icon-button.md) - For icon-only actions

## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-componentname)

## Source Files

| File | Description |
|------|-------------|
| `index.tsx` | Component implementation |
| `index.styles.ts` | Styled components |
| `__stories__/index.stories.tsx` | Storybook stories |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-10 | Initial documentation |
