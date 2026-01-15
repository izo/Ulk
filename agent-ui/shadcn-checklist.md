# shadcn/ui Checklist

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Component Usage](#component-usage)
3. [Theming & Customization](#theming--customization)
4. [Accessibility Compliance](#accessibility-compliance)
5. [Component Patterns](#component-patterns)
6. [Common Issues](#common-issues)

---

## Installation & Setup

### Critical 🔴
- [ ] `components.json` exists and configured correctly
- [ ] CSS variables defined in globals.css
- [ ] `cn()` utility function present and used
- [ ] Path aliases configured (`@/components`, `@/lib`)

**components.json Check:**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default", // or "new-york"
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Major 🟠
- [ ] Required dependencies installed (`class-variance-authority`, `clsx`, `tailwind-merge`)
- [ ] Lucide React icons installed (default icon library)
- [ ] Base components in correct location (`/components/ui/`)
- [ ] Radix UI primitives installed for used components

### Minor 🟡
- [ ] Style variant chosen (default vs new-york)
- [ ] Base color configured
- [ ] TypeScript/JavaScript mode matches project

---

## Component Usage

### Critical 🔴
- [ ] Components imported from local `/components/ui/`
- [ ] Props passed correctly according to component API
- [ ] Controlled vs uncontrolled usage consistent
- [ ] Event handlers connected properly

**Import Pattern:**
```tsx
// Correct
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// Wrong - don't import from radix directly in app code
import * as Dialog from "@radix-ui/react-dialog"
```

### Major 🟠
- [ ] Variants used correctly (`variant`, `size` props)
- [ ] Composition patterns followed (Dialog with DialogContent, etc.)
- [ ] asChild prop used appropriately for custom elements
- [ ] Forward refs handled correctly in custom wrappers

**Composition Check:**
```tsx
// Dialog requires proper composition
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

### Minor 🟡
- [ ] Consistent variant usage across similar contexts
- [ ] Size variants match design system needs
- [ ] Custom variants extend rather than replace defaults

---

## Theming & Customization

### Critical 🔴
- [ ] CSS variables defined for all color modes
- [ ] `:root` and `.dark` selectors present
- [ ] Border radius variable set (`--radius`)
- [ ] Colors use HSL format

**Required CSS Variables:**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... all colors inverted */
}
```

### Major 🟠
- [ ] Custom colors extend the variable system
- [ ] Component customizations don't break accessibility
- [ ] Tailwind config references shadcn colors correctly
- [ ] Chart colors defined if using charts

**Tailwind Config Integration:**
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // ... etc
    },
  },
}
```

### Minor 🟡
- [ ] Animation variables customized if needed
- [ ] Font family variables set
- [ ] Consistent token naming

---

## Accessibility Compliance

### Critical 🔴
- [ ] Form components have proper labels
- [ ] Dialog/Modal components have descriptions
- [ ] Focus management works correctly
- [ ] Keyboard navigation functional

**Required Accessibility Props:**
```tsx
// Dialog must have title and description
<DialogContent>
  <DialogHeader>
    <DialogTitle>Required</DialogTitle>
    <DialogDescription>Required for screen readers</DialogDescription>
  </DialogHeader>
</DialogContent>

// AlertDialog must have description
<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogDescription>
      This action cannot be undone.
    </AlertDialogDescription>
  </AlertDialogHeader>
</AlertDialogContent>
```

### Major 🟠
- [ ] Combobox/Select announces selection changes
- [ ] Toast notifications accessible
- [ ] Tabs have proper ARIA relationships
- [ ] Accordion panels properly labeled

### Minor 🟡
- [ ] `aria-describedby` used where helpful
- [ ] Loading states announced
- [ ] Error messages linked to inputs

---

## Component Patterns

### Form Pattern
```tsx
<Form {...form}>
  <FormField
    control={form.control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" {...field} />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

### Data Table Pattern
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Command/Search Pattern
```tsx
<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

---

## Common Issues

### What to Flag 🔴

**Missing Required Subcomponents:**
```tsx
// Bad: Dialog without required parts
<Dialog>
  <DialogContent>
    Just content, no title/description
  </DialogContent>
</Dialog>
```

**Direct Radix Import in App Code:**
```tsx
// Bad: Bypasses shadcn customizations
import * as Checkbox from '@radix-ui/react-checkbox'

// Good: Use shadcn component
import { Checkbox } from "@/components/ui/checkbox"
```

**Incorrect cn() Usage:**
```tsx
// Bad: Template literal with cn
<Button className={`${cn('base')} additional`}>

// Good: All classes through cn
<Button className={cn('base', 'additional', className)}>
```

**Missing CSS Variables:**
```tsx
// Component using undefined variable
<div className="text-primary-600"> // Should be "text-primary"
```

**Form Without react-hook-form:**
```tsx
// Using shadcn Form without proper integration
<Form> // Missing form={form} prop
  <FormField> // Missing control prop
```

### Deprecation Warnings

- [ ] Check for deprecated component APIs
- [ ] Verify against latest shadcn/ui documentation
- [ ] Update components when new versions available
