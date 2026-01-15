# Tailwind CSS Checklist

## Table of Contents
1. [Configuration](#configuration)
2. [Class Usage Patterns](#class-usage-patterns)
3. [Responsive Design](#responsive-design)
4. [Custom Extensions](#custom-extensions)
5. [Performance & Optimization](#performance--optimization)
6. [Common Anti-Patterns](#common-anti-patterns)
7. [v4 Specific Checks](#v4-specific-checks)

---

## Configuration

### Critical 🔴
- [ ] `tailwind.config.js` or `tailwind.config.ts` exists
- [ ] Content paths correctly configured (all template files scanned)
- [ ] Theme extends (not replaces) default when appropriate
- [ ] CSS file imports Tailwind directives correctly

**Content Path Check:**
```js
// tailwind.config.js
content: [
  './src/**/*.{js,ts,jsx,tsx,vue,astro}',
  './components/**/*.{js,ts,jsx,tsx,vue}',
  './app/**/*.{js,ts,jsx,tsx}', // Next.js App Router
  './pages/**/*.{js,ts,jsx,tsx}', // Next.js Pages
]
```

### Major 🟠
- [ ] Custom colors follow naming convention (50-950 scale)
- [ ] Font family defined in theme
- [ ] Spacing scale extended if needed (not arbitrary values)
- [ ] Border radius values consistent

### Minor 🟡
- [ ] Plugins installed and configured
- [ ] Container configuration (center, padding)
- [ ] Screen breakpoints customized if needed
- [ ] Animation/keyframes defined for custom animations

---

## Class Usage Patterns

### Critical 🔴
- [ ] Utility classes used (not inline styles)
- [ ] Classes follow Tailwind conventions (not custom CSS for utilities)
- [ ] No conflicting classes (e.g., `flex block` simultaneously)
- [ ] Important modifier `!` used sparingly

### Major 🟠
- [ ] Class order consistent (layout → sizing → spacing → typography → color → effects)
- [ ] Responsive modifiers used correctly (`sm:`, `md:`, `lg:`)
- [ ] State modifiers used correctly (`hover:`, `focus:`, `active:`)
- [ ] Group/peer modifiers used appropriately

**Recommended Class Order:**
```
1. Layout (flex, grid, position)
2. Box model (w, h, p, m)
3. Typography (text, font)
4. Background/Border
5. Effects (shadow, opacity)
6. Transitions/Animations
```

### Minor 🟡
- [ ] Consistent use of `gap` vs margin for spacing
- [ ] `space-x/y` used for repetitive spacing
- [ ] `divide-x/y` used for borders between elements
- [ ] Arbitrary values `[]` used only when necessary

### Info 🔵
- [ ] Prettier plugin for Tailwind class sorting installed
- [ ] ESLint plugin for Tailwind installed

---

## Responsive Design

### Critical 🔴
- [ ] Mobile-first approach (base styles for mobile)
- [ ] Responsive modifiers applied logically
- [ ] No fixed widths breaking responsive layout
- [ ] Container responsive with breakpoints

### Major 🟠
- [ ] Consistent breakpoint usage across components
- [ ] Hidden/visible classes used correctly (`hidden md:block`)
- [ ] Grid columns adjust at breakpoints
- [ ] Typography scales responsively

**Responsive Pattern Check:**
```jsx
// Good: Mobile-first
<div className="flex-col md:flex-row">

// Bad: Desktop-first override
<div className="flex-row flex-col md:flex-row">
```

### Minor 🟡
- [ ] `max-w-*` prevents content overflow
- [ ] Responsive spacing adjustments
- [ ] Custom breakpoints if design requires

---

## Custom Extensions

### Critical 🔴
- [ ] Custom utilities use `@layer utilities`
- [ ] Custom components use `@layer components`
- [ ] Base styles use `@layer base`
- [ ] CSS variables integrated with Tailwind config

**Correct Layer Usage:**
```css
@layer base {
  h1 { @apply text-2xl font-bold; }
}

@layer components {
  .btn { @apply px-4 py-2 rounded; }
}

@layer utilities {
  .text-shadow { text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
}
```

### Major 🟠
- [ ] Theme values referenced via `theme()` function
- [ ] Custom colors defined in config (not arbitrary)
- [ ] Plugin configuration follows Tailwind patterns
- [ ] CSS custom properties map to Tailwind tokens

### Minor 🟡
- [ ] Extend vs override used appropriately
- [ ] Negative values prefixed correctly
- [ ] Custom variants registered properly

---

## Performance & Optimization

### Critical 🔴
- [ ] Production build purges unused CSS
- [ ] No SafeList bloat (only truly dynamic classes)
- [ ] PostCSS configured correctly

### Major 🟠
- [ ] Avoid dynamically constructed class names
- [ ] JIT mode enabled (default in v3+)
- [ ] CSS file size reasonable (<50KB gzipped typical)

**Dynamic Classes Anti-Pattern:**
```jsx
// Bad: Won't be purged
<div className={`bg-${color}-500`}>

// Good: Full class names
<div className={color === 'red' ? 'bg-red-500' : 'bg-blue-500'}>

// Good: Object mapping
const colors = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
}
<div className={colors[color]}>
```

### Minor 🟡
- [ ] Source maps configured for development
- [ ] Unused plugins removed
- [ ] Custom fonts optimized

---

## Common Anti-Patterns

### What to Flag 🔴

**Over-specificity:**
```jsx
// Bad: Redundant specificity
<div className="flex flex-row items-center justify-center">
// Better
<div className="flex items-center justify-center">
```

**Arbitrary Value Overuse:**
```jsx
// Bad: Should be in config
<div className="text-[#1a2b3c] p-[13px] mt-[27px]">
// Better: Define in theme
<div className="text-brand p-3 mt-7">
```

**Conflicting Classes:**
```jsx
// Bad: Which wins?
<div className="hidden block">
<div className="flex grid">
```

**Inline Styles with Tailwind:**
```jsx
// Bad: Mixed approaches
<div className="p-4" style={{ marginTop: '20px' }}>
// Better
<div className="p-4 mt-5">
```

**Unnecessarily Long Class Lists:**
```jsx
// Bad: Should be componentized or @apply
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
  disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
// Better: Extract to component or @apply
```

---

## v4 Specific Checks

### Critical 🔴
- [ ] CSS-first configuration if using v4
- [ ] `@theme` directive used correctly
- [ ] `@import "tailwindcss"` used (not @tailwind directives)
- [ ] Compatible with new color palette syntax

**v4 Configuration Style:**
```css
/* v4: CSS-first config */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: 'Inter', sans-serif;
}
```

### Major 🟠
- [ ] New variant syntax used where applicable
- [ ] `@utility` directive for custom utilities
- [ ] Container queries if needed (`@container`)

### Minor 🟡
- [ ] Lightning CSS for faster builds
- [ ] `color-mix()` for color manipulation
- [ ] CSS nesting syntax supported

**Version Detection:**
```bash
# Check Tailwind version
npm list tailwindcss
yarn list tailwindcss
```
