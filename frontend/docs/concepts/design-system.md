# 🎨 Design System

Understanding Admindek's design system, visual language, and component principles.

## Overview

Admindek VanillaJS implements a comprehensive design system built on **Bootstrap 5.3.7** with custom enhancements. The system provides consistent visual patterns, reusable components, and a scalable foundation for admin interfaces.

## Design Principles

### 1. Consistency
- **Visual coherence** across all interface elements
- **Predictable interactions** and behaviors
- **Unified spacing** and typography systems
- **Consistent iconography** and visual language

### 2. Accessibility
- **WCAG 2.1 AA compliance** for inclusive design
- **Keyboard navigation** support throughout
- **Screen reader** compatibility
- **Color contrast** meeting accessibility standards

### 3. Scalability
- **Modular component** architecture
- **Flexible theming** system with CSS custom properties
- **Responsive design** from mobile to desktop
- **Extensible patterns** for custom components

### 4. Performance
- **Lightweight implementation** with optimized CSS
- **Minimal JavaScript** for core functionality
- **Efficient rendering** with modern browser features
- **Progressive enhancement** approach

## Color System

### Primary Color Palette

```scss
// Core Brand Colors
$primary:    #4f46e5;  // Primary brand color
$secondary:  #6c757d;  // Secondary/neutral
$success:    #10b981;  // Success states
$info:       #06b6d4;  // Informational
$warning:    #f59e0b;  // Warning states  
$danger:     #ef4444;  // Error/danger states
$light:      #f8fafc;  // Light backgrounds
$dark:       #1e293b;  // Dark text/backgrounds
```

**Usage Examples:**
```css
/* Primary actions and highlights */
.btn-primary { background-color: #4f46e5; }

/* Success feedback */
.alert-success { background-color: #10b981; }

/* Warning notifications */
.badge-warning { background-color: #f59e0b; }
```

### Extended Color Palette

**Semantic Colors:**
```scss
// Extended semantic palette
$blue:    #3b82f6;
$indigo:  #6366f1;  
$purple:  #8b5cf6;
$pink:    #ec4899;
$red:     #ef4444;
$orange:  #f97316;
$yellow:  #eab308;
$green:   #22c55e;
$teal:    #14b8a6;
$cyan:    #06b6d4;
```

**Gray Scale:**
```scss
// Sophisticated gray scale
$gray-50:   #f8fafc;
$gray-100:  #f1f5f9;
$gray-200:  #e2e8f0;
$gray-300:  #cbd5e1;
$gray-400:  #94a3b8;
$gray-500:  #64748b;
$gray-600:  #475569;
$gray-700:  #334155;
$gray-800:  #1e293b;
$gray-900:  #0f172a;
```

### Color Usage Guidelines

**Hierarchy:**
1. **Primary** - Main actions, key UI elements
2. **Secondary** - Supporting actions, less emphasis
3. **Success** - Confirmations, positive feedback
4. **Info** - Neutral information, hints
5. **Warning** - Cautions, non-critical alerts
6. **Danger** - Errors, destructive actions

**Accessibility:**
- Minimum contrast ratio: **4.5:1** for normal text
- Enhanced contrast ratio: **7:1** for small text
- Color is never the only way to convey information
- Focus indicators are clearly visible

## Typography System

### Font Stack

**Primary Font:**
```css
/* Modern system font stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', Arial, 
             'Noto Sans', sans-serif;
```

**Benefits:**
- **System native** performance
- **Excellent readability** at all sizes
- **Modern appearance** across platforms
- **Consistent rendering** across devices

### Type Scale

```scss
// Harmonious type scale
$font-sizes: (
  xs:   0.75rem,   // 12px - Small labels
  sm:   0.875rem,  // 14px - Body small
  base: 1rem,      // 16px - Body text
  lg:   1.125rem,  // 18px - Large body
  xl:   1.25rem,   // 20px - Small headings
  2xl:  1.5rem,    // 24px - Medium headings
  3xl:  1.875rem,  // 30px - Large headings
  4xl:  2.25rem,   // 36px - Extra large
  5xl:  3rem,      // 48px - Display
  6xl:  3.75rem    // 60px - Hero text
);
```

### Typography Hierarchy

**Headings:**
```scss
h1 { font-size: 2.25rem; font-weight: 700; line-height: 1.2; }
h2 { font-size: 1.875rem; font-weight: 600; line-height: 1.3; }
h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
h4 { font-size: 1.25rem; font-weight: 500; line-height: 1.4; }
h5 { font-size: 1.125rem; font-weight: 500; line-height: 1.5; }
h6 { font-size: 1rem; font-weight: 500; line-height: 1.5; }
```

**Body Text:**
```scss
body { 
  font-size: 1rem; 
  font-weight: 400; 
  line-height: 1.6; 
  color: #334155; 
}

.lead { 
  font-size: 1.125rem; 
  font-weight: 300; 
  line-height: 1.7; 
}
```

**Utility Classes:**
```css
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }

.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

## Spacing System

### Base Unit

```scss
// 0.25rem (4px) base unit for consistent spacing
$spacer: 0.25rem;

$spacers: (
  0: 0,
  1: $spacer,      // 4px
  2: $spacer * 2,  // 8px
  3: $spacer * 3,  // 12px
  4: $spacer * 4,  // 16px
  5: $spacer * 5,  // 20px
  6: $spacer * 6,  // 24px
  8: $spacer * 8,  // 32px
  10: $spacer * 10, // 40px
  12: $spacer * 12, // 48px
  16: $spacer * 16, // 64px
  20: $spacer * 20, // 80px
  24: $spacer * 24  // 96px
);
```

### Spacing Usage

**Component Spacing:**
```scss
// Card internal spacing
.card-body {
  padding: 1.5rem; // 24px
}

// Form element spacing
.form-group {
  margin-bottom: 1rem; // 16px
}

// Section spacing
.section {
  padding: 3rem 0; // 48px vertical
}
```

**Layout Spacing:**
```scss
// Grid gutters
.row {
  --bs-gutter-x: 1.5rem; // 24px
  --bs-gutter-y: 1.5rem; // 24px
}

// Container spacing
.container {
  padding-left: 1rem;
  padding-right: 1rem;
}
```

## Component Architecture

### Base Components

**Card System:**
```scss
// Base card structure
.card {
  background: white;
  border-radius: 0.75rem; // 12px
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &-header {
    padding: 1.5rem 1.5rem 0;
    border-bottom: 1px solid #e2e8f0;
  }
  
  &-body {
    padding: 1.5rem;
  }
  
  &-footer {
    padding: 0 1.5rem 1.5rem;
    border-top: 1px solid #e2e8f0;
  }
}
```

**Button System:**
```scss
// Consistent button styles
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: all 0.2s ease;
  
  // Size variants
  &-sm { padding: 0.25rem 0.75rem; font-size: 0.75rem; }
  &-lg { padding: 0.75rem 1.5rem; font-size: 1rem; }
  
  // Style variants
  &-outline { 
    background: transparent; 
    border: 1px solid currentColor; 
  }
  
  &-ghost { 
    background: transparent; 
    border: none; 
  }
}
```

### Layout Components

**Sidebar System:**
```scss
.pc-sidebar {
  width: 260px;
  background: #1e293b;
  min-height: 100vh;
  
  .pc-menu {
    padding: 1rem 0;
    
    .pc-item {
      margin: 0.125rem 0.75rem;
      
      .pc-link {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        color: #94a3b8;
        transition: all 0.2s;
        
        &:hover, &.active {
          background: rgba(79, 70, 229, 0.1);
          color: #4f46e5;
        }
      }
    }
  }
}
```

**Header System:**
```scss
.pc-header {
  height: 70px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  
  .pc-head-link {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background 0.2s;
    
    &:hover {
      background: #f1f5f9;
    }
  }
}
```

## Iconography

### Icon System

**Primary Icons: Phosphor Icons**
```html
<!-- Duotone style (recommended) -->
<i class="ph-duotone ph-house"></i>
<i class="ph-duotone ph-user-circle"></i>
<i class="ph-duotone ph-chart-bar"></i>

<!-- Other styles available -->
<i class="ph-thin ph-heart"></i>
<i class="ph-light ph-star"></i>  
<i class="ph-regular ph-bell"></i>
<i class="ph-bold ph-warning"></i>
<i class="ph-fill ph-check-circle"></i>
```

**Secondary Icons: Tabler Icons**
```html
<!-- Clean line style -->
<i class="ti ti-home"></i>
<i class="ti ti-settings"></i>
<i class="ti ti-user"></i>
```

### Icon Usage Guidelines

**Sizes:**
- **16px** - Small UI elements, table cells
- **20px** - Default size, buttons, menu items  
- **24px** - Large buttons, headings
- **32px** - Feature icons, empty states

**Colors:**
- **Primary** - Interactive elements, active states
- **Secondary** - Supporting icons, neutral states
- **Muted** - Decorative icons, disabled states

## Grid System

### Responsive Grid

Based on **Bootstrap 5** with custom enhancements:

```scss
// Breakpoint system
$grid-breakpoints: (
  xs: 0,      // Phone portrait
  sm: 576px,  // Phone landscape  
  md: 768px,  // Tablet portrait
  lg: 992px,  // Tablet landscape
  xl: 1200px, // Desktop
  xxl: 1400px // Large desktop
);

// Container max-widths
$container-max-widths: (
  sm: 540px,
  md: 720px, 
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
);
```

### Layout Patterns

**Dashboard Layout:**
```html
<div class="pc-container">
  <div class="pc-content">
    <!-- Page header -->
    <div class="page-header">
      <div class="page-block">
        <div class="row align-items-center">
          <div class="col-md-12">
            <div class="page-header-title">
              <h2 class="mb-0">Dashboard</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main content -->
    <div class="row">
      <!-- Metrics -->
      <div class="col-md-6 col-xl-3">
        <div class="card">...</div>
      </div>
      
      <!-- Charts -->
      <div class="col-lg-8">
        <div class="card">...</div>
      </div>
      
      <!-- Sidebar content -->
      <div class="col-lg-4">
        <div class="card">...</div>
      </div>
    </div>
  </div>
</div>
```

## Theme System

### CSS Custom Properties

**Dynamic theming** using CSS custom properties:

```css
:root {
  /* Colors */
  --bs-primary: #4f46e5;
  --bs-primary-rgb: 79, 70, 229;
  --bs-secondary: #6c757d;
  
  /* Spacing */
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;
  
  /* Typography */
  --bs-body-font-family: 'Inter', sans-serif;
  --bs-body-font-size: 1rem;
  --bs-body-line-height: 1.6;
  
  /* Shadows */
  --bs-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --bs-box-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --bs-box-shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  /* Border radius */
  --bs-border-radius: 0.5rem;
  --bs-border-radius-sm: 0.25rem;
  --bs-border-radius-lg: 0.75rem;
}
```

### Dark Mode Support

```css
/* Dark theme variables */
[data-pc-theme="dark"] {
  --bs-body-color: #e2e8f0;
  --bs-body-bg: #0f172a;
  
  --bs-card-bg: #1e293b;
  --bs-border-color: #334155;
  
  --bs-sidebar-bg: #0f172a;
  --bs-header-bg: #1e293b;
}

/* Component adaptations */
[data-pc-theme="dark"] .card {
  background: var(--bs-card-bg);
  border-color: var(--bs-border-color);
}

[data-pc-theme="dark"] .pc-sidebar {
  background: var(--bs-sidebar-bg);
}
```

### Theme Presets

**Built-in theme presets:**

```scss
// preset-1 (Default)
:root[data-pc-preset="preset-1"] {
  --bs-primary: #4f46e5;
  --pc-sidebar-bg: #1e293b;
}

// preset-2 (Blue)
:root[data-pc-preset="preset-2"] {
  --bs-primary: #3b82f6;
  --pc-sidebar-bg: #1e3a8a;
}

// preset-3 (Green) 
:root[data-pc-preset="preset-3"] {
  --bs-primary: #10b981;
  --pc-sidebar-bg: #064e3b;
}

// preset-4 (Purple)
:root[data-pc-preset="preset-4"] {
  --bs-primary: #8b5cf6;
  --pc-sidebar-bg: #581c87;
}
```

## Animation & Transitions

### Timing Functions

```scss
// Consistent easing curves
$ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
$ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
$ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);

// Common transitions
$transition-base: all 0.2s ease-out;
$transition-fade: opacity 0.15s linear;
$transition-collapse: height 0.35s ease;
```

### Micro-interactions

```scss
// Hover effects
.card {
  transition: $transition-base;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
}

// Button interactions
.btn {
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Loading states
.loading {
  opacity: 0.6;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid #4f46e5;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
```

## Design Tokens

### Token Structure

```scss
// Design tokens for consistency
$design-tokens: (
  // Spacing tokens
  'space-xs': 0.25rem,
  'space-sm': 0.5rem,
  'space-md': 1rem,
  'space-lg': 1.5rem,
  'space-xl': 3rem,
  
  // Typography tokens
  'text-xs': 0.75rem,
  'text-sm': 0.875rem,
  'text-base': 1rem,
  'text-lg': 1.125rem,
  'text-xl': 1.25rem,
  
  // Color tokens  
  'color-primary': #4f46e5,
  'color-success': #10b981,
  'color-warning': #f59e0b,
  'color-danger': #ef4444,
  
  // Shadow tokens
  'shadow-sm': 0 1px 2px rgba(0, 0, 0, 0.05),
  'shadow-md': 0 1px 3px rgba(0, 0, 0, 0.1),
  'shadow-lg': 0 4px 6px rgba(0, 0, 0, 0.1),
  
  // Radius tokens
  'radius-sm': 0.25rem,
  'radius-md': 0.5rem,
  'radius-lg': 0.75rem
);
```

## Accessibility Guidelines

### Color Accessibility

- **Minimum contrast ratio**: 4.5:1 for normal text
- **Enhanced contrast**: 7:1 for small text  
- **Non-color indicators**: Icons, patterns, text labels
- **Focus indicators**: Clearly visible outline/border

### Keyboard Navigation

```scss
// Focus indicators
.btn:focus,
.form-control:focus,
.pc-link:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

// Skip links
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  z-index: 9999;
  
  &:focus {
    top: 0;
  }
}
```

### Screen Reader Support

```html
<!-- Semantic HTML structure -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/dashboard">Dashboard</a>
    </li>
  </ul>
</nav>

<!-- ARIA labels for complex components -->
<div class="card" role="region" aria-labelledby="card-title">
  <h3 id="card-title">Sales Overview</h3>
  <div aria-describedby="sales-desc">
    <p id="sales-desc">Monthly sales performance chart</p>
  </div>
</div>
```

## Customization Guidelines

### Extending the System

**Adding New Colors:**
```scss
// Custom color palette
$custom-colors: (
  'brand': #ff6b35,
  'accent': #004e89,
  'neutral': #f7f7f7
);

// Extend Bootstrap color map
$colors: map-merge($colors, $custom-colors);
```

**Creating Components:**
```scss
// Follow established patterns
.custom-component {
  // Use design tokens
  padding: map-get($design-tokens, 'space-md');
  border-radius: map-get($design-tokens, 'radius-md');
  box-shadow: map-get($design-tokens, 'shadow-md');
  
  // Follow color system
  background: var(--bs-card-bg);
  border: 1px solid var(--bs-border-color);
  
  // Consistent typography
  font-size: map-get($design-tokens, 'text-base');
  line-height: 1.6;
  
  // Responsive behavior
  @include media-breakpoint-down(md) {
    padding: map-get($design-tokens, 'space-sm');
  }
}
```

---

## Summary

Admindek's design system provides:

- **Consistent visual language** across all components
- **Accessible design patterns** meeting WCAG standards  
- **Flexible theming system** with CSS custom properties
- **Responsive grid system** for all device sizes
- **Comprehensive component library** built on Bootstrap 5
- **Performance-optimized** implementation
- **Extensible architecture** for custom requirements

This system ensures that Admindek applications maintain visual consistency, accessibility, and professional quality while remaining flexible for customization and extension.