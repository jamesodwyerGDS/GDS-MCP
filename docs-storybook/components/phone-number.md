---
name: PhoneNumber
description: PhoneNumber component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-phone-number--default'
storyId: components-phone-number--default
sourceFile: components/PhoneNumber/PhoneNumber.tsx
---
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
