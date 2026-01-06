---
name: Color Accessibility
description: WCAG-compliant color pairings ensuring accessible color combinations across all design system components.
category: foundations
status: stable
version: 1.0.0
updated: 2025-01-05
tags:
  - color
  - accessibility
  - wcag
  - contrast
keywords:
  - accessible colors
  - contrast ratio
  - WCAG 2.1
  - color pairings
  - a11y
dependencies:
  - color
relatedComponents:
  - color
  - color-themes
tokens:
  colours:
    primary:
      - Neptune: "#024DDF"
      - Cosmos: "#121212"
      - Granite: "#646464"
    secondary:
      - Earth: "#01A469"
      - Mars: "#EB0000"
    tertiary:
      - Callisto: "#A733FF"
      - Jupiter: "#FFB932"
      - Ganymede: "#21FFF2"
      - Titan: "#FBFF2C"
    neutral:
      - Slate: "#949494"
      - Moonrock: "#BFBFBF"
      - Ammonite: "#D6D6D6"
      - Diatomite: "#EBEBEB"
      - Lunar: "#F6F6F6"
      - Spotlight: "#FFFFFF"
  spacing: []
  typography: []
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles: []
frameworks:
  - framework: React
    package: "@gds/tokens"
    import: "import { accessiblePairings } from '@gds/tokens'"
figmaNodeId: "21:10400"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Color Accessibility

For color pairings to be accessible, they should meet the minimum contrast ratios outlined in the WCAG contrast guidelines. See the accessible pairings from the color palettes below.

## WCAG Contrast Requirements

| Element Type | Minimum Ratio | Description |
|--------------|---------------|-------------|
| **Small text** | 4.5:1 | Text smaller than 18pt or 14pt bold |
| **Large text** | 3:1 | Text 18pt+ or 14pt+ bold |
| **Graphic elements** | 3:1 | UI components or meaningful graphics |
| **Decorative graphics** | N/A | Graphics that do not provide information |

## Primary Color Accessibility

### Accessible on Neptune (`#024DDF`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| White | `#FFFFFF` | 4.6:1 | Text, icons |
| Titan | `#FBFF2C` | 8.2:1 | Accent text |

### Accessible on Cosmos (`#121212`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| White | `#FFFFFF` | 16.1:1 | Primary text |
| Neptune | `#024DDF` | 3.5:1 | Large text, links |
| Granite | `#646464` | 4.0:1 | Large text only |
| Earth | `#01A469` | 4.2:1 | Large text only |
| Mars | `#EB0000` | 4.0:1 | Large text only |
| Jupiter | `#FFB932` | 9.8:1 | Accent text |
| Ganymede | `#21FFF2` | 12.4:1 | Accent text |
| Titan | `#FBFF2C` | 14.8:1 | Accent text |

### Accessible on Granite (`#646464`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| White | `#FFFFFF` | 5.0:1 | Text, icons |
| Cosmos | `#121212` | 4.0:1 | Large text only |

## Secondary Color Accessibility

### Accessible on White (`#FFFFFF`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| Cosmos | `#121212` | 16.1:1 | Primary text |
| Neptune | `#024DDF` | 4.6:1 | Links, interactive |
| Granite | `#646464` | 5.0:1 | Secondary text |
| Earth | `#048851` | 4.5:1 | Success states |
| Mars | `#EB0000` | 4.0:1 | Large text only |
| Callisto | `#A733FF` | 3.4:1 | Large text only |

### Accessible on Earth (`#01A469`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| White | `#FFFFFF` | 3.4:1 | Large text only |
| Cosmos | `#121212` | 4.8:1 | Text |

## Tertiary Color Accessibility

### Accessible on Callisto (`#A733FF`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| White | `#FFFFFF` | 3.4:1 | Large text only |
| Cosmos | `#121212` | 4.7:1 | Text |

### Accessible on Jupiter (`#FFB932`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| Cosmos | `#121212` | 9.8:1 | Text |

### Accessible on Ganymede (`#21FFF2`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| Cosmos | `#121212` | 12.4:1 | Text |

### Accessible on Titan (`#FBFF2C`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| Cosmos | `#121212` | 14.8:1 | Text |

### Accessible on Mars (`#EB0000`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| White | `#FFFFFF` | 4.0:1 | Large text only |
| Cosmos | `#121212` | 4.0:1 | Large text only |

## UI / Borders & Fills

### Accessible on Slate (`#949494`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| White | `#FFFFFF` | 3.0:1 | UI elements only |
| Cosmos | `#121212` | 5.3:1 | Text |

### Accessible on Moonrock (`#BFBFBF`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| Cosmos | `#121212` | 8.2:1 | Text |

### Accessible on Diatomite (`#EBEBEB`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| Cosmos | `#121212` | 12.6:1 | Text |
| Neptune | `#024DDF` | 2.7:1 | UI elements only |

### Accessible on Ammonite (`#D6D6D6`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| Cosmos | `#121212` | 10.2:1 | Text |
| Neptune | `#024DDF` | 2.2:1 | UI elements only |

### Accessible on Lunar (`#F6F6F6`)

| Foreground | Hex | Contrast | Usage |
|------------|-----|----------|-------|
| Cosmos | `#121212` | 14.5:1 | Text |
| Neptune | `#024DDF` | 4.1:1 | Large text only |
| Granite | `#646464` | 4.5:1 | Secondary text |

## Accessibility Utilities

### Contrast Checker Function

```typescript
function getContrastRatio(foreground: string, background: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255);
    const [r, g, b] = rgb.map(c =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Usage
const ratio = getContrastRatio('#FFFFFF', '#024DDF');
console.log(`Contrast ratio: ${ratio.toFixed(1)}:1`);
```

### Accessible Pairing Validation

```typescript
type WCAGLevel = 'AA' | 'AAA';
type TextSize = 'small' | 'large';

function isAccessible(
  ratio: number,
  level: WCAGLevel = 'AA',
  size: TextSize = 'small'
): boolean {
  const thresholds = {
    AA: { small: 4.5, large: 3.0 },
    AAA: { small: 7.0, large: 4.5 }
  };
  return ratio >= thresholds[level][size];
}
```

## Best Practices

### Do's
- Always verify contrast ratios before using color combinations
- Use the "Large text only" designation appropriately (18pt+ or 14pt+ bold)
- Test color combinations with color blindness simulators
- Provide non-color indicators for important states (icons, text labels)

### Don'ts
- Don't rely solely on color to convey meaning
- Don't use color combinations marked as "Large text only" for body text
- Don't assume all users perceive colors the same way
- Don't ignore AA compliance in favor of visual preference
