---
name: Studio Aura
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#d0cdcd'
  on-tertiary: '#303030'
  tertiary-container: '#b4b2b2'
  on-tertiary-container: '#454545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.2'
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style

The design system is centered on the concept of "The Private Gallery"—a space where architecture and interior objects are treated as curated art pieces. It targets a discerning clientele that values discretion, permanence, and the tactile quality of high-end materials. The emotional response is one of immediate hushed reverence, similar to entering a boutique hotel or a private exhibition at dusk.

The visual style is a blend of **Minimalism** and **Tactile Luxury**. It leverages expansive whitespace (or "dark-space") to allow individual elements to breathe, creating a sense of effortless sophistication. The aesthetic avoids trendy clutter in favor of a "Less is more" philosophy, where every line, shadow, and transition is intentional and refined.

## Colors

The palette is rooted in the depth of shadows and the warmth of precious metals. The primary theme is strictly dark, utilizing a range of near-blacks and deep charcoals to create layers of depth without relying on traditional borders.

- **Primary (Rich Gold):** Used sparingly for accents, critical call-to-actions, and subtle brand signatures. It represents the "Aura" within the studio's work.
- **Neutral (Obsidian):** The foundation of the system. A deep, slightly warm black that serves as the primary canvas.
- **Surface Layers (Charcoal & Graphite):** Secondary and tertiary tones are used to define containers and interactive surfaces, providing enough contrast to distinguish content while maintaining the low-light atmosphere.

## Typography

This design system employs a classic high-contrast serif for headings to evoke a literary, editorial feel. This is paired with a clean, contemporary sans-serif for body text to ensure modern legibility and a neutral technical balance.

- **Headlines:** Set in high-contrast serif. Large displays should use slight negative letter-spacing to emphasize the elegance of the letterforms.
- **Body:** Utilizes a light-to-regular weight sans-serif. The line height is intentionally generous (1.6) to prevent the dark background from making the text feel cramped.
- **Labels:** Always set in a slightly bolder sans-serif with increased letter-spacing and uppercase styling to denote metadata or secondary navigation elements.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for large screens, centered within the viewport to mimic a framed artwork. 

- **Grid:** A 12-column system on desktop with wide gutters (32px) to prevent visual crowding.
- **Rhythm:** Generous vertical spacing (section gaps) is mandatory. The "less is more" approach means that content blocks should be separated by significant voids, forcing focus on the individual project or statement.
- **Responsive:** On mobile, margins reduce to 24px, and the grid collapses to a single column, but the vertical "breathing room" remains a priority to maintain the luxury feel.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows**. Instead of traditional elevations that use light, this design system uses "illuminated depth."

- **Surfaces:** Level 0 is the deepest black. Level 1 (cards, navigation) uses a deep charcoal. Level 2 (overlays, menus) uses a graphite tone.
- **Shadows:** Shadows are rarely used for "lift." Instead, they are used as soft, diffused glows or extremely subtle dark washes to separate overlapping elements.
- **Interactions:** Hover states often involve a subtle shift in the gold accent's intensity or a soft background transition rather than a physical "pop-up" effect.

## Shapes

The shape language is strictly **Sharp**. In the world of high-end architecture and gallery curation, precision is paramount.

- **Corners:** 0px radius for all primary containers, buttons, and images. This reinforces a structural, architectural feel.
- **Dividers:** Thin, low-opacity lines (1px) in gold or charcoal are used to define boundaries without adding visual weight.
- **Imagery:** Photography should be treated as full-bleed or strictly rectangular, never rounded.

## Components

- **Buttons:** Primary buttons are ghost-style with a 1px gold border and sharp corners. Text is uppercase with wide tracking. On hover, the button fills with a gold tint and dark text.
- **Inputs:** Minimalist underlines rather than boxed enclosures. Focus states trigger a transition from charcoal to gold.
- **Cards:** No borders or shadows by default. Content is separated by typography and generous internal padding. A subtle background shift on hover provides the only interactive cue.
- **Chips/Labels:** Small, uppercase text with a vertical divider rather than a pill container to maintain the "sharp" aesthetic.
- **Navigation:** A minimalist top bar with significant horizontal padding. Transitions between pages should be slow, fade-based movements to mirror the pace of an art gallery.