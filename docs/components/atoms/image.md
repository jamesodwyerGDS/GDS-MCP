---
name: Image
description: Guidelines for using images consistently across the Marketplace Design System, including aspect ratios, fill modes, gradients, and accessibility requirements.
category: atoms
status: stable
version: 1.0.0
updated: 2025-07-04
tags:
  - image
  - media
  - aspect-ratio
  - accessibility
  - visual-design
keywords:
  - images
  - aspect ratios
  - cropping
  - fill modes
  - gradients
  - alt text
  - thumbnails
  - hero images
dependencies: []
relatedComponents:
  - name: Button
    relationship: alternative
  - name: Badge
    relationship: alternative
tokens:
  colours:
    gradient:
      from: { token: "transparent", hex: "rgba(18,18,18,0)" }
      to: { token: "color.cosmos", hex: "#121212" }
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  aspectRatio:
    square: "1 / 1"
    landscape-16-9: "16 / 9"
    landscape-3-2: "3 / 2"
    portrait-3-4: "3 / 4"
  backgroundImage:
    hero-gradient: "linear-gradient(to bottom, rgba(18,18,18,0) 0%, #121212 86.358%)"
cssVariables:
  - name: "--aspect-ratio-square"
    value: "1 / 1"
  - name: "--aspect-ratio-16-9"
    value: "16 / 9"
  - name: "--hero-gradient"
    value: "linear-gradient(to bottom, rgba(18,18,18,0) 0%, #121212 86.358%)"
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles: ["img"]
figmaNodeId: "38863:5116"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Image

Guidelines for using images consistently across the Marketplace Design System, including aspect ratios, fill modes, gradients, and accessibility requirements.

## Overview

This is a **Figma-only component**. Use these guidelines when working with images in design files and implementations.

### When to use

- Event cards, hero sections, thumbnails
- User avatars and profile images
- Product and merchandise imagery
- Background and decorative visuals

### When not to use

- Do not use images containing essential text (use real text instead)
- Do not use stretched or distorted images
- Do not use low-quality images that appear pixelated

---

## Common Aspect Ratios

Use consistent aspect ratios to maintain visual harmony across the platform.

| Aspect Ratio | Dimensions | Orientation | Purpose |
|--------------|------------|-------------|---------|
| 1:1 | 300 x 300 | Square | Avatars, thumbnails, tiles |
| 3:2 | 300 x 200 | Landscape | Event cards |
| 5:3 | 300 x 180 | Landscape | Event cards, banners |
| 5:4 | 300 x 240 | Landscape | Event cards |
| 16:9 | 320 x 180 | Landscape | Event cards, hero images |
| 3:4 | 300 x 400 | Portrait | Vertical media |
| 9:16 | 225 x 400 | Portrait | Vertical media, mobile hero |

### Aspect Ratio Selection Guide

| Context | Recommended Ratio |
|---------|-------------------|
| Hero banners (desktop) | 16:9 |
| Hero banners (mobile) | 3:4 |
| Event cards | 3:2, 5:4, 16:9 |
| User avatars | 1:1 |
| Product images | 1:1, 3:4 |
| Thumbnails | 1:1, 16:9 |
| Story/reel content | 9:16 |

---

## Image Fill Modes

Use fill mode to control how the image behaves inside its container.

| Mode | Description | Use Case |
|------|-------------|----------|
| Fill | Scales to completely cover the shape. Parts may be cropped. | Hero images, backgrounds |
| Fit | Scales to fully show the image. Empty space may appear. | Product images, logos |
| Crop | Manually position and resize the image inside the shape. | Custom focal point |

### Fill Mode (Default)

```css
.image-fill {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```

### Fit Mode

```css
.image-fit {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
```

### Crop Mode

```css
.image-crop {
  object-fit: cover;
  object-position: 25% 50%; /* Custom focal point */
  width: 100%;
  height: 100%;
}
```

---

## Gradients

Apply gradient overlays to ensure text readability over images.

### Hero Gradient

| Property | Value |
|----------|-------|
| Direction | Top to bottom |
| Start color | `rgba(18, 18, 18, 0)` (transparent) |
| End color | `#121212` (Cosmos) |
| End position | 86.358% |

```css
.hero-gradient {
  background: linear-gradient(
    to bottom,
    rgba(18, 18, 18, 0) 0%,
    #121212 86.358%
  );
}
```

---

## Shape Cropping

Use shapes to crop images for specific contexts:

- **Circular crops**: User avatars, artist profiles, team photos
- **Rounded rectangles**: Card images, thumbnails, gallery items

---

## Accessibility

### Alt Text Guidelines

All images must include the `alt` attribute, even if empty.

| Image Type | Alt Text Approach | Example |
|------------|-------------------|---------|
| Decorative | Empty `alt=""` | Background patterns |
| Informative | Descriptive text | Event photos |
| Functional | Action description | Linked images |
| Complex | Brief alt + long description | Maps, charts |

### When to Use Empty Alt (`alt=""`)

- Decorative images without important content
- Icons with adjacent text labels
- Images inside links where text describes the action

### Avoid Text in Images

Text inside images is difficult for screen readers. Use real text instead.

**Exception: Text is not the focus**
If text appears incidentally (e.g., a blurry banner in a crowd photo), use `alt=""`.

**Exception: Essential text**
For maps or diagrams where text provides spatial meaning, include descriptive alt text or provide a text alternative.

```html
<!-- Decorative image -->
<img src="event.jpg" alt="" />

<!-- Informative image -->
<img src="map.jpg" alt="Festival map showing main stages and amenities" />

<!-- Complex image with description -->
<img src="seating.jpg" alt="" aria-describedby="seating-desc" />
<p id="seating-desc">Seating sections: Floor (A-Z), Lower (101-120), Upper (201-220)</p>
```

### Screen Reader Behavior

| Scenario | Behavior |
|----------|----------|
| `alt="Description"` | Reads the alt text |
| `alt=""` | Skips the image |
| No `alt` attribute | May read filename/URL |

---

## Do's and Don'ts

### Do's

- Use consistent aspect ratios within the same context
- Apply gradients for text legibility over images
- Include `alt` attribute on every image
- Use Fill mode for hero images and backgrounds
- Test with screen readers

### Don'ts

- Don't stretch or distort images
- Don't place text over images without contrast
- Don't use text in images when real text works
- Don't omit the `alt` attribute
- Don't write alt text starting with "Image of"

---

## CSS Custom Properties

```css
:root {
  /* Aspect Ratios */
  --aspect-ratio-square: 1 / 1;
  --aspect-ratio-16-9: 16 / 9;
  --aspect-ratio-3-2: 3 / 2;
  --aspect-ratio-5-3: 5 / 3;
  --aspect-ratio-5-4: 5 / 4;
  --aspect-ratio-3-4: 3 / 4;
  --aspect-ratio-9-16: 9 / 16;

  /* Hero Gradient */
  --hero-gradient-start: rgba(18, 18, 18, 0);
  --hero-gradient-end: #121212;
  --hero-gradient: linear-gradient(
    to bottom,
    var(--hero-gradient-start) 0%,
    var(--hero-gradient-end) 86.358%
  );
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      aspectRatio: {
        'square': '1 / 1',
        'landscape-16-9': '16 / 9',
        'landscape-3-2': '3 / 2',
        'landscape-5-3': '5 / 3',
        'landscape-5-4': '5 / 4',
        'portrait-3-4': '3 / 4',
        'portrait-9-16': '9 / 16',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(18,18,18,0) 0%, #121212 86.358%)',
      },
      objectPosition: {
        'focal-top': 'center top',
        'focal-bottom': 'center bottom',
      }
    }
  }
}
```

---

## Usage Examples

### Event Card Image (16:9)

```html
<article class="flex flex-col gap-2">
  <div class="aspect-video overflow-hidden rounded-lg">
    <img src="event.jpg" alt="Concert description" class="w-full h-full object-cover" />
  </div>
  <span class="text-xs uppercase text-granite">SUN - DEC 15 - 18:00</span>
  <h3 class="text-base font-semibold">Event Name</h3>
</article>
```

### Hero with Gradient Overlay

```html
<div class="relative aspect-video">
  <img src="hero.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-hero-gradient"></div>
  <div class="absolute bottom-0 left-0 p-6 text-white">
    <h1 class="text-4xl font-black uppercase">City Name</h1>
    <div class="h-1 w-full bg-neptune"></div>
  </div>
</div>
```

### Avatar (1:1 Circle)

```html
<div class="w-12 h-12 rounded-full overflow-hidden">
  <img src="avatar.jpg" alt="User name" class="w-full h-full object-cover" />
</div>
```

---

## Related Components

- [Button](./button.md) - For interactive actions
- [Badge](./badge.md) - For status indicators

## Resources

- [W3C Alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [WCAG 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content)

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-07-04 | Initial release - merged aspect ratios, usage, and accessibility |
