---
name: Color Themes
description: Dark and light mode color themes ensure consistent visual experiences across different display preferences while maintaining AA contrast compliance.
category: foundations
status: stable
version: 1.0.0
updated: 2025-01-05
tags:
  - color
  - themes
  - dark-mode
  - light-mode
keywords:
  - dark theme
  - light theme
  - color modes
  - theme switching
  - appearance
dependencies:
  - color
relatedComponents:
  - color
  - color-accessibility
tokens:
  colours:
    light:
      - Neptune: "#024DDF"
      - Cosmos: "#121212"
      - Granite: "#646464"
      - Earth: "#048851"
      - Mars: "#EB0000"
      - Callisto: "#A733FF"
      - Jupiter: "#FFB932"
      - Ganymede: "#21FFF2"
      - Titan: "#FBFF2C"
    dark:
      - Neptune Bright: "#307EF1"
      - Spotlight: "#FFFFFF"
      - Granite: "#646464"
      - Earth: "#048851"
      - Mars: "#FF3838"
      - Callisto: "#BD6FF"
      - Jupiter: "#FFB932"
      - Ganymede: "#21FFF2"
      - Titan: "#FBFF2C"
  spacing: []
  typography: []
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles: []
frameworks:
  - framework: React
    package: "@gds/tokens"
    import: "import { lightTheme, darkTheme } from '@gds/tokens'"
figmaNodeId: "9208:9659"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Color Themes

Dark and light mode color themes ensure consistent visual experiences across different display preferences while maintaining AA contrast compliance.

## Overview

As we enhance our digital experiences, dark and light modes will be an additional tool to add excitement or purpose to a page design. As such, some color values will need to be adjusted per context to maintain AA contrast compliance.

## Theme Comparison

### Primary Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Neptune | `#024DDF` | Neptune Bright `#307EF1` |
| Cosmos | `#121212` | Spotlight `#FFFFFF` |
| Granite | `#646464` | Granite `#646464` |

### Secondary Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Earth | `#048851` | Earth `#048851` |
| Mars | `#EB0000` | Mars `#FF3838` |

### Tertiary Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Callisto | `#A733FF` | Callisto `#BD6FFF` |
| Jupiter | `#FFB932` | Jupiter `#FFB932` |
| Ganymede | `#21FFF2` | Ganymede `#21FFF2` |
| Titan | `#FBFF2C` | Titan `#FBFF2C` |

## Light Theme

The light theme is the default appearance, optimized for daytime use and well-lit environments.

```css
[data-theme="light"] {
  --theme-background: #FFFFFF;
  --theme-surface: #F6F6F6;
  --theme-text-primary: #121212;
  --theme-text-secondary: #646464;
  --theme-accent: #024DDF;
  --theme-success: #048851;
  --theme-error: #EB0000;
}
```

## Dark Theme

The dark theme reduces eye strain in low-light environments and provides an alternative visual experience.

```css
[data-theme="dark"] {
  --theme-background: #121212;
  --theme-surface: #1E1E1E;
  --theme-text-primary: #FFFFFF;
  --theme-text-secondary: #646464;
  --theme-accent: #307EF1;
  --theme-success: #048851;
  --theme-error: #FF3838;
}
```

## Implementation

### React Context

```tsx
import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Tailwind Dark Mode

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {
      colors: {
        // Light mode (default)
        neptune: {
          DEFAULT: '#024DDF',
          dark: '#307EF1'
        },
        cosmos: {
          DEFAULT: '#121212',
          dark: '#FFFFFF'
        }
      }
    }
  }
}
```

### Usage with Tailwind

```html
<!-- Light mode: blue text, Dark mode: bright blue text -->
<p class="text-neptune dark:text-neptune-dark">
  Interactive text
</p>

<!-- Light mode: dark background, Dark mode: light background -->
<div class="bg-cosmos dark:bg-spotlight">
  Content area
</div>
```

## Best Practices

### Do's
- Test all color combinations in both themes for contrast compliance
- Use semantic color tokens that adapt to theme context
- Provide a clear theme toggle for user preference
- Respect system-level dark mode preferences

### Don'ts
- Don't assume all colors work equally in both modes
- Don't forget to adjust shadow and elevation styles for dark mode
- Don't use pure black (#000000) in dark mode backgrounds
- Don't ignore contrast requirements when switching themes
