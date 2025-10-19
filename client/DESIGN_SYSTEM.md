# MerchTrace Design System

## Overview
This document describes the complete design system for MerchTrace, a B2B merch tracking & analytics platform. The design follows modern SaaS best practices with a professional yet approachable aesthetic.

## Color Palette

### Primary Colors (Trust Blue/Indigo)
```css
--primary: 233 47% 51%
--primary-foreground: 0 0% 100%
--primary-hover: 233 47% 45%
--primary-glow: 233 80% 65%
```
**Usage:** Primary actions, navigation highlights, brand identity

### Accent Colors (Vibrant Purple)
```css
--accent: 271 76% 53%
--accent-foreground: 0 0% 100%
--accent-hover: 271 76% 47%
--accent-glow: 271 91% 65%
```
**Usage:** CTAs, important actions, conversion elements

### Secondary Colors
```css
--secondary: 215 20% 65%
--secondary-foreground: 0 0% 100%
```
**Usage:** Secondary actions, alternative buttons

### Semantic Colors
```css
--success: 142 71% 45%
--warning: 38 92% 50%
--destructive: 0 84% 60%
--muted: 210 40% 96%
```

### Chart Colors
```css
--chart-1: 233 47% 51%  /* Primary blue */
--chart-2: 271 76% 53%  /* Accent purple */
--chart-3: 142 71% 45%  /* Success green */
--chart-4: 38 92% 50%   /* Warning orange */
--chart-5: 215 20% 65%  /* Secondary slate */
```

## Typography

### Font Family
- **Primary:** Inter (Google Fonts)
- **Fallback:** system-ui, -apple-system, sans-serif

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

### Type Scale
```
H1: 4xl-6xl (2.25rem - 3.75rem) / Bold
H2: 3xl-4xl (1.875rem - 2.25rem) / Bold
H3: lg-xl (1.125rem - 1.25rem) / Semibold
Body: base (1rem) / Regular
Small: sm (0.875rem) / Regular
Tiny: xs (0.75rem) / Regular
```

## Spacing System
Uses Tailwind's default spacing scale (4px increments):
- 0.25rem (1) → 6rem (24)

## Border Radius
```css
--radius-sm: 0.375rem
--radius: 0.5rem (default)
--radius-lg: 0.75rem
--radius-xl: 1rem
```

## Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
--shadow-glow: 0 0 30px -5px hsl(var(--primary-glow) / 0.3)
```

## Gradients
```css
--gradient-primary: linear-gradient(135deg, hsl(233 47% 51%) 0%, hsl(271 76% 53%) 100%)
--gradient-subtle: linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(210 40% 96%) 100%)
--gradient-hero: linear-gradient(135deg, hsl(233 47% 51%) 0%, hsl(271 76% 53%) 50%, hsl(233 80% 65%) 100%)
```

## Animations

### Keyframes
- `fade-in`: Fade in with slight upward motion (0.5s)
- `fade-up`: Fade in with more upward motion (0.6s)
- `scale-in`: Scale and fade in (0.3s)
- `accordion-down/up`: Smooth accordion transitions
- `slide-in-right`: Slide in from right (0.3s)

### Usage
```tsx
className="animate-fade-in"
className="animate-fade-up"
className="animate-scale-in"
```

## Component Variants

### Button Variants
- **default**: Primary blue, high contrast
- **destructive**: Red for dangerous actions
- **outline**: Bordered, subtle
- **secondary**: Muted gray
- **ghost**: Transparent, hover effect
- **link**: Text link style

### Button Sizes
- **sm**: h-9 px-3
- **default**: h-10 px-4
- **lg**: h-11 px-8
- **icon**: h-10 w-10

## Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

**Target Devices:**
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px
- Large Desktop: 1440px

## Accessibility

### Contrast Ratios
- Body text: Minimum 4.5:1
- Large text (18px+): Minimum 3:1
- Interactive elements: Minimum 3:1

### Focus States
All interactive elements have visible focus rings using `ring-2 ring-ring ring-offset-2`

### Semantic HTML
- Use `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- Proper heading hierarchy (H1 → H2 → H3)
- ARIA labels where appropriate

## Icon System
**Library:** Lucide React
**Default Size:** 4-6 (1rem - 1.5rem)

### Common Icons
- `BarChart3`: Analytics
- `TrendingUp`: Growth metrics
- `Users`: User data
- `MapPin`: Location
- `Lock`: Security/Privacy
- `Zap`: Performance/Speed
- `CheckCircle2`: Success states

## Layout Patterns

### Container
```tsx
className="container mx-auto px-4 sm:px-6 lg:px-8"
```

### Card
```tsx
<Card className="p-6 border border-border bg-card shadow-lg">
```

### Section Spacing
```tsx
className="py-20"  // Vertical sections
className="space-y-6"  // Stacked elements
className="gap-6"  // Grid gaps
```

## Dark Mode
Full dark mode support with automatic color adjustments. All HSL colors have dark mode variants defined in `index.css`.

## Responsive Design
Mobile-first approach with progressive enhancement:
1. Design for 375px mobile first
2. Add tablet breakpoints at 768px
3. Enhance for desktop at 1024px+

## Usage Guidelines

### Do's
✅ Use semantic tokens (e.g., `text-primary`, `bg-accent`)
✅ Maintain consistent spacing (4px increments)
✅ Use design system gradients for hero sections
✅ Apply hover states to all interactive elements
✅ Test contrast ratios

### Don'ts
❌ Never use arbitrary colors (e.g., `text-blue-500`)
❌ Avoid inline styles where design tokens exist
❌ Don't skip focus states
❌ Avoid mixing font families

## Export for Tailwind Config

See `tailwind.config.ts` and `src/index.css` for the complete implementation. All tokens are exported as CSS custom properties and available throughout the application.

## Integration Notes

This design system is built on:
- **Tailwind CSS 3.x** for utility classes
- **shadcn/ui** for base components
- **Radix UI** for accessible primitives
- **class-variance-authority** for component variants
