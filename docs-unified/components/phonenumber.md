---
name: Phonenumber
description: Unified documentation for Phonenumber component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-phone-number--default'
sourceFile: components/PhoneNumber/PhoneNumber.tsx
---
# Phonenumber

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Phonenumber |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design phonenumber`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer phonenumber`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { PhoneNumber } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-phone-number--default)

### Source

`components/PhoneNumber/PhoneNumber.tsx`

### Full Engineer Documentation

# PhoneNumber

## Import

```tsx
import { PhoneNumber } from '@gds/components';
```

## Basic Usage

```tsx
<PhoneNumber>Content</PhoneNumber>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | No | - |
| `className` | `string` | No | - |
| `required` | `boolean` | No | - |
| `disabled` | `boolean` | No | - |
| `fullNumberDefault` | `string` | No | - |
| `countries` | `Array<Country>` | Yes | - |
| `defaultSelectedCountry` | `Country` | No | - |
| `defaultPhoneNumber` | `string` | No | - |
| `onChange` | `(value: string, dialCode?: string, phoneNumber?: string) => void` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `string` | No | - |
| `refTel` | `React.ForwardedRef<HTMLInputElement>` | No | - |
| `label` | `React.ReactNode` | Yes | - |
| `labelDialCode` | `string` | Yes | - |
| `labelSearchForDialCode` | `string` | Yes | - |




## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-phone-number--default)

## Source

`components/PhoneNumber/PhoneNumber.tsx`

---

## Vibe Documentation

> Query mode: `@vibe phonenumber`
> Styling: **Tailwind CSS** (utility classes)

*No vibe documentation available for this component.*


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | - | In Storybook |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `@gds/components` |
| **Figma Node** | - | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

