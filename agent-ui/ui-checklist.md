# UI Checklist

## Table of Contents
1. [Visual Consistency](#visual-consistency)
2. [Typography](#typography)
3. [Color System](#color-system)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons & Images](#icons--images)
7. [Responsive Design](#responsive-design)
8. [Dark Mode](#dark-mode)

---

## Visual Consistency

### Critical 🔴
- [ ] Design tokens defined and used consistently
- [ ] Same UI patterns for same actions across app
- [ ] Visual hierarchy guides user attention
- [ ] Brand identity consistently applied

### Major 🟠
- [ ] Component styles match design system
- [ ] No visual orphans (one-off styles)
- [ ] Consistent border radius across components
- [ ] Consistent shadow/elevation system

### Minor 🟡
- [ ] Animation timing consistent
- [ ] Icon style consistent (outline vs filled)
- [ ] Image treatment consistent (rounded corners, shadows)
- [ ] Dividers/separators used consistently

### Info 🔵
- [ ] Design system documentation exists
- [ ] Figma/design files aligned with implementation

---

## Typography

### Critical 🔴
- [ ] Font files load correctly (no FOUT/FOIT issues)
- [ ] Text is readable (minimum 16px body, adequate line-height)
- [ ] Heading hierarchy clear (h1 > h2 > h3...)
- [ ] Font weights load correctly

### Major 🟠
- [ ] Maximum 2-3 font families used
- [ ] Type scale follows consistent ratio
- [ ] Line length optimal (45-75 characters)
- [ ] Line height appropriate (1.4-1.6 for body)

### Minor 🟡
- [ ] Letter spacing adjusted for headings
- [ ] Text truncation handled gracefully (ellipsis)
- [ ] Proper quotation marks and apostrophes
- [ ] Numbers in tabular data use tabular figures

### Info 🔵
- [ ] Font fallbacks defined
- [ ] Variable fonts used where beneficial
- [ ] Font subsets for performance

**Typography Scale Check:**
```
h1: 2.5rem+ (40px+)
h2: 2rem (32px)
h3: 1.5rem (24px)
h4: 1.25rem (20px)
body: 1rem (16px)
small: 0.875rem (14px)
```

---

## Color System

### Critical 🔴
- [ ] Contrast ratios meet WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Colors don't convey information alone
- [ ] Primary/secondary/accent colors defined
- [ ] Semantic colors for states (error, warning, success, info)

### Major 🟠
- [ ] Color palette limited and intentional
- [ ] Consistent opacity values
- [ ] Hover/active states follow color logic
- [ ] Background/foreground combinations tested

### Minor 🟡
- [ ] Color shades provide enough variation (50-950)
- [ ] Focus colors visible against all backgrounds
- [ ] Link colors distinguishable and consistent
- [ ] Selection colors appropriate

**Color Contrast Check Points:**
```
- Text on backgrounds
- Buttons: text on button background
- Input borders against background
- Icons on backgrounds
- Error/success states on backgrounds
```

---

## Spacing & Layout

### Critical 🔴
- [ ] Consistent spacing scale used (4px, 8px, 16px, 24px, 32px...)
- [ ] Content doesn't touch viewport edges on mobile
- [ ] Related items grouped visually
- [ ] White space creates clear content sections

### Major 🟠
- [ ] Padding/margin follows spacing scale
- [ ] Grid system used consistently
- [ ] Alignment consistent (left, center, based on context)
- [ ] Gutters consistent between columns

### Minor 🟡
- [ ] Optical alignment adjustments where needed
- [ ] Spacing responsive to screen size
- [ ] Dense/comfortable/spacious modes if applicable
- [ ] Consistent card/container padding

**Spacing Scale Reference:**
```
4px   - xs (tight)
8px   - sm
16px  - md (default)
24px  - lg
32px  - xl
48px  - 2xl
64px  - 3xl
```

---

## Components

### Critical 🔴
- [ ] Buttons have clear visual hierarchy (primary, secondary, tertiary)
- [ ] Form inputs have visible states (default, hover, focus, error, disabled)
- [ ] Interactive elements look interactive
- [ ] Modals/dialogs work correctly (open, close, trap focus)

### Major 🟠
- [ ] Cards/containers have consistent styling
- [ ] Tables are scannable with clear headers
- [ ] Lists are visually organized
- [ ] Navigation components match design system

### Minor 🟡
- [ ] Badges/tags follow color system
- [ ] Tooltips appear consistently
- [ ] Dropdown menus align properly
- [ ] Loading spinners match brand

**Button Hierarchy Check:**
```
Primary: Main CTA, filled background
Secondary: Alternative action, outlined or muted
Tertiary/Ghost: Minimal emphasis, text-only
Destructive: Clear warning color (red)
```

---

## Icons & Images

### Critical 🔴
- [ ] Icons are meaningful and recognizable
- [ ] Icons have sufficient size (minimum 16px, 24px preferred)
- [ ] Images have alt text
- [ ] Broken images handled gracefully

### Major 🟠
- [ ] Icon style consistent (stroke width, style)
- [ ] Icons align with text baseline
- [ ] Images optimize for web (compressed, appropriate format)
- [ ] Aspect ratios preserved

### Minor 🟡
- [ ] SVG icons used for scalability
- [ ] Icon color matches context
- [ ] Decorative images don't distract
- [ ] Lazy loading for heavy images

---

## Responsive Design

### Critical 🔴
- [ ] Layout works at common breakpoints (320px, 768px, 1024px, 1440px)
- [ ] No content overflow or horizontal scroll
- [ ] Touch targets adequate on mobile (44px+)
- [ ] Text readable without zooming

### Major 🟠
- [ ] Images scale appropriately
- [ ] Navigation adapts to screen size
- [ ] Grid collapses logically
- [ ] Modals work on mobile

### Minor 🟡
- [ ] Breakpoints align with design system
- [ ] Container max-width prevents ultra-wide lines
- [ ] Responsive images (srcset) where beneficial
- [ ] Print styles if needed

**Breakpoint Reference:**
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## Dark Mode

### Critical 🔴
- [ ] Dark mode colors defined in system
- [ ] Contrast ratios maintained in dark mode
- [ ] No pure white on pure black (use slightly muted)
- [ ] User preference respected (prefers-color-scheme)

### Major 🟠
- [ ] Images adapt (darken or swap)
- [ ] Shadows adjusted for dark surfaces
- [ ] Semantic colors adjusted (softer red, etc.)
- [ ] Toggle mechanism works correctly

### Minor 🟡
- [ ] System preference auto-detection
- [ ] Smooth transition between modes
- [ ] Dark mode optimized for OLED (true blacks where appropriate)
- [ ] Borders/dividers visible in both modes
