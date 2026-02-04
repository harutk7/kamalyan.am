# Kamalyan Consulting - Design Assets

This folder contains all the design assets for the Kamalyan Consulting website, organized for pixel-perfect implementation across web and mobile platforms.

## 📁 Folder Structure

```
assets/
├── logos/              # Logo variations
│   ├── primary/        # Main large logo
│   ├── horizontal/     # Horizontal logo variations (header/footer)
│   ├── symbol/         # K symbol only
│   └── footer/         # Footer-specific logos
├── icons/              # All icons
│   ├── social/         # Social media icons (Facebook, Instagram, LinkedIn, etc.)
│   ├── ui/             # UI icons (arrows, menu, close, etc.)
│   └── service/        # Service category icons
├── images/             # Image assets
│   ├── hero/           # Hero section images
│   ├── portfolio/      # Portfolio/project images
│   ├── team/           # Team member photos
│   └── backgrounds/    # Background images
├── design-mockups/     # Original design files
└── sprites/            # SVG sprites (combined icons)
```

## 🎨 Logo Specifications

### Primary Colors
- **Primary Green**: `#228B22` (Forest Green)
- **Dark Green**: `#1C701C`
- **Light Green**: `#29A329`
- **Dark Text**: `#242424` / `#292B28`
- **Accent Green**: `#75BB61`

### Logo Variations

| File | Description | Usage |
|------|-------------|-------|
| `logo-kamalyan-full-large.svg` | Large full logo with big K | Hero sections, large displays |
| `logo-kamalyan-horizontal-green.svg` | Green horizontal | Main header (white/light bg) |
| `logo-kamalyan-horizontal-dark.svg` | Dark horizontal | Footer, dark backgrounds |
| `k-symbol-green.svg` | K symbol only (green) | Favicon, small displays |
| `k-symbol-dark.svg` | K symbol only (dark) | Dark theme |

### Logo Dimensions
- **Horizontal Logo**: 126×34px (aspect ratio: 3.7:1)
- **Large Logo**: 180×53px
- **K Symbol**: 34×34px (1:1 square)

## 🔣 Icons

### UI Icons (24×24px)
All UI icons use `currentColor` for stroke, allowing easy color customization via CSS.

| Icon | File | Usage |
|------|------|-------|
| → | `arrow-right.svg` | Navigation, CTAs |
| ← | `arrow-left.svg` | Navigation, carousels |
| ↓ | `arrow-down.svg` | Dropdowns, scroll indicators |
| × | `close.svg` | Modals, notifications |
| ☰ | `menu.svg` | Mobile navigation |
| ▾ | `chevron-down.svg` | Accordions, dropdowns |
| + | `plus.svg` | Expand, add |

### Social Icons (24×24px)
- Facebook
- Instagram
- LinkedIn
- Twitter
- YouTube

### Service Icons (48×48px)
All service icons have a 48×48px viewBox with circular green border.
- Environment/Nature
- Document/Certification
- Consulting
- Certificate/Award
- Location/Map
- Phone/Contact
- Email

## 📱 Responsive Assets

### Web
- Use horizontal logos for header
- Full logo for footer
- K symbol for favicon (32×32px)

### Mobile
- Use K symbol or compact horizontal logo for header
- Full logo for footer
- Touch-friendly icon sizes (min 44×44px tap targets)

## 🖼️ Design Mockups

Original design files:
- `kamalyan_web.png` - Full web design (17484×3375px)
- `kamalyan_mobile.png` - Mobile design (16030×7282px)

These show all page variations including:
- Home page
- Services page
- Portfolio page
- About/Who we are
- Contact page
- FAQ page
- Legal/Privacy pages

## 🎯 Implementation Notes

### SVG Best Practices
1. Use `viewBox` for responsive scaling
2. Use `currentColor` for strokes to allow CSS color control
3. Optimize SVGs before production (use svgo or similar)
4. Use `stroke-linecap="round"` and `stroke-linejoin="round"` for smooth edges

### Pixel Perfect Tips
- All icons are pixel-aligned for sharp rendering
- Logo dimensions are exact from design files
- Use exact color hex codes from specifications
- Maintain aspect ratios when scaling

### Performance
- Consider using SVG sprites for multiple icons
- Lazy load images below the fold
- Use appropriate image formats (WebP with fallbacks)

## 📐 Color Palette

```css
:root {
  --color-primary: #228B22;
  --color-primary-dark: #1C701C;
  --color-primary-light: #29A329;
  --color-accent: #75BB61;
  --color-text: #242424;
  --color-text-secondary: #292B28;
  --color-background: #FFFFFF;
  --color-background-alt: #F5F5F5;
}
```

## 🔗 Font Recommendations

Based on the design, use a clean sans-serif font family:
- Primary: Inter, Roboto, or similar
- Fallback: system-ui, -apple-system, sans-serif

---

**Last Updated**: 2026-02-04
**Design Source**: Kamalyan Consulting Brand Guidelines
