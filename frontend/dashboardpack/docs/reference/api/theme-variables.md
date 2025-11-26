# 🎨 Theme Variables Reference

Complete reference for all theme variables and customization options in Admindek VanillaJS.

## Overview

Admindek uses a comprehensive variable system based on **CSS custom properties** and **SCSS variables** to provide flexible theming capabilities.

## CSS Custom Properties

### Primary Color System

```css
:root {
  /* Primary Colors */
  --bs-primary: #4f46e5;
  --bs-primary-rgb: 79, 70, 229;
  --bs-primary-text-emphasis: #1e1b4b;
  --bs-primary-bg-subtle: #e0e7ff;
  --bs-primary-border-subtle: #c7d2fe;
  
  /* Secondary Colors */
  --bs-secondary: #6b7280;
  --bs-secondary-rgb: 107, 114, 128;
  --bs-secondary-text-emphasis: #374151;
  --bs-secondary-bg-subtle: #f3f4f6;
  --bs-secondary-border-subtle: #d1d5db;
}
```

### Extended Color Palette

```css
:root {
  /* Success Colors */
  --bs-success: #10b981;
  --bs-success-rgb: 16, 185, 129;
  --bs-success-text-emphasis: #065f46;
  --bs-success-bg-subtle: #d1fae5;
  --bs-success-border-subtle: #a7f3d0;
  
  /* Info Colors */
  --bs-info: #3b82f6;
  --bs-info-rgb: 59, 130, 246;
  --bs-info-text-emphasis: #1e3a8a;
  --bs-info-bg-subtle: #dbeafe;
  --bs-info-border-subtle: #bfdbfe;
  
  /* Warning Colors */
  --bs-warning: #f59e0b;
  --bs-warning-rgb: 245, 158, 11;
  --bs-warning-text-emphasis: #92400e;
  --bs-warning-bg-subtle: #fef3c7;
  --bs-warning-border-subtle: #fde68a;
  
  /* Danger Colors */
  --bs-danger: #ef4444;
  --bs-danger-rgb: 239, 68, 68;
  --bs-danger-text-emphasis: #991b1b;
  --bs-danger-bg-subtle: #fee2e2;
  --bs-danger-border-subtle: #fecaca;
}
```

### Layout Variables

```css
:root {
  /* Layout Dimensions */
  --pc-sidebar-width: 260px;
  --pc-sidebar-collapsed-width: 70px;
  --pc-header-height: 60px;
  --pc-footer-height: 50px;
  
  /* Container */
  --pc-container-padding: 24px;
  --pc-container-max-width: 1400px;
  
  /* Spacing */
  --pc-spacer-xs: 0.25rem;  /* 4px */
  --pc-spacer-sm: 0.5rem;   /* 8px */
  --pc-spacer-md: 1rem;     /* 16px */
  --pc-spacer-lg: 1.5rem;   /* 24px */
  --pc-spacer-xl: 3rem;     /* 48px */
  
  /* Border Radius */
  --pc-border-radius-sm: 4px;
  --pc-border-radius: 8px;
  --pc-border-radius-lg: 12px;
  --pc-border-radius-xl: 16px;
}
```

## Component-Specific Variables

### Sidebar Variables

```css
:root {
  /* Sidebar Colors */
  --pc-sidebar-bg: #1f2937;
  --pc-sidebar-color: #d1d5db;
  --pc-sidebar-border: #374151;
  
  /* Sidebar Links */
  --pc-sidebar-link-color: #d1d5db;
  --pc-sidebar-link-hover-color: #ffffff;
  --pc-sidebar-link-hover-bg: rgba(255, 255, 255, 0.1);
  --pc-sidebar-link-active-color: #ffffff;
  --pc-sidebar-link-active-bg: var(--bs-primary);
  
  /* Sidebar Caption */
  --pc-sidebar-caption-color: #9ca3af;
  --pc-sidebar-caption-size: 0.75rem;
  
  /* Sidebar Icons */
  --pc-sidebar-icon-size: 1.125rem;
  --pc-sidebar-icon-color: #9ca3af;
}

/* Light Sidebar Theme */
[data-pc-sidebar-theme="light"] {
  --pc-sidebar-bg: #ffffff;
  --pc-sidebar-color: #374151;
  --pc-sidebar-border: #e5e7eb;
  --pc-sidebar-link-color: #6b7280;
  --pc-sidebar-link-hover-bg: #f3f4f6;
  --pc-sidebar-link-active-color: var(--bs-primary);
}
```

### Header Variables

```css
:root {
  /* Header Colors */
  --pc-header-bg: #ffffff;
  --pc-header-color: #374151;
  --pc-header-border: #e5e7eb;
  
  /* Header Navigation */
  --pc-header-nav-color: #6b7280;
  --pc-header-nav-hover-color: var(--bs-primary);
  --pc-header-nav-active-color: var(--bs-primary);
  
  /* Header Dropdown */
  --pc-header-dropdown-bg: #ffffff;
  --pc-header-dropdown-border: #e5e7eb;
  --pc-header-dropdown-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Card Variables

```css
:root {
  /* Card Base */
  --pc-card-bg: #ffffff;
  --pc-card-border: #e5e7eb;
  --pc-card-border-radius: var(--pc-border-radius-lg);
  --pc-card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  
  /* Card Header */
  --pc-card-header-bg: transparent;
  --pc-card-header-border: var(--pc-card-border);
  --pc-card-header-padding: 1.5rem;
  
  /* Card Body */
  --pc-card-body-padding: 1.5rem;
  --pc-card-body-color: #374151;
  
  /* Card States */
  --pc-card-hover-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --pc-card-hover-transform: translateY(-2px);
}
```

### Form Variables

```css
:root {
  /* Form Controls */
  --pc-input-bg: #ffffff;
  --pc-input-border: #d1d5db;
  --pc-input-border-focus: var(--bs-primary);
  --pc-input-border-radius: var(--pc-border-radius);
  --pc-input-padding-y: 0.5rem;
  --pc-input-padding-x: 0.75rem;
  
  /* Form Labels */
  --pc-label-color: #374151;
  --pc-label-font-weight: 500;
  --pc-label-margin-bottom: 0.5rem;
  
  /* Form Validation */
  --pc-valid-color: var(--bs-success);
  --pc-valid-border-color: var(--bs-success);
  --pc-invalid-color: var(--bs-danger);
  --pc-invalid-border-color: var(--bs-danger);
}
```

## Dark Theme Variables

```css
[data-pc-theme="dark"] {
  /* Base Colors */
  --bs-body-bg: #0f172a;
  --bs-body-color: #e2e8f0;
  --bs-border-color: #334155;
  
  /* Component Overrides */
  --pc-card-bg: #1e293b;
  --pc-card-border: #334155;
  --pc-card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  
  /* Header Dark Theme */
  --pc-header-bg: #1e293b;
  --pc-header-color: #e2e8f0;
  --pc-header-border: #334155;
  
  /* Form Controls Dark */
  --pc-input-bg: #334155;
  --pc-input-border: #475569;
  --pc-input-color: #e2e8f0;
  
  /* Sidebar Dark (already dark by default) */
  --pc-sidebar-bg: #0f172a;
  --pc-sidebar-color: #cbd5e1;
}
```

## RTL Layout Variables

```css
[dir="rtl"] {
  /* Sidebar positioning */
  --pc-sidebar-position-right: 0;
  --pc-sidebar-position-left: auto;
  
  /* Container margins */
  --pc-container-margin-right: var(--pc-sidebar-width);
  --pc-container-margin-left: 0;
  
  /* Text alignment */
  --pc-text-align: right;
  
  /* Icon positioning */
  --pc-icon-margin-right: 0;
  --pc-icon-margin-left: 0.5rem;
}
```

## Preset Theme Variables

### Preset 1 (Default - Indigo)
```css
:root[data-pc-preset="preset-1"] {
  --bs-primary: #4f46e5;
  --bs-primary-rgb: 79, 70, 229;
  --pc-preset-primary: #4f46e5;
  --pc-preset-primary-dark: #3730a3;
  --pc-preset-primary-light: #a5b4fc;
}
```

### Preset 2 (Purple)
```css
:root[data-pc-preset="preset-2"] {
  --bs-primary: #7c3aed;
  --bs-primary-rgb: 124, 58, 237;
  --pc-preset-primary: #7c3aed;
  --pc-preset-primary-dark: #5b21b6;
  --pc-preset-primary-light: #c4b5fd;
}
```

### Preset 3 (Pink)
```css
:root[data-pc-preset="preset-3"] {
  --bs-primary: #ec4899;
  --bs-primary-rgb: 236, 72, 153;
  --pc-preset-primary: #ec4899;
  --pc-preset-primary-dark: #be185d;
  --pc-preset-primary-light: #f9a8d4;
}
```

## Typography Variables

```css
:root {
  /* Font Families */
  --pc-font-family-sans: 'Inter', system-ui, sans-serif;
  --pc-font-family-mono: 'JetBrains Mono', Consolas, monospace;
  
  /* Font Sizes */
  --pc-font-size-xs: 0.75rem;    /* 12px */
  --pc-font-size-sm: 0.875rem;   /* 14px */
  --pc-font-size-base: 1rem;     /* 16px */
  --pc-font-size-lg: 1.125rem;   /* 18px */
  --pc-font-size-xl: 1.25rem;    /* 20px */
  --pc-font-size-2xl: 1.5rem;    /* 24px */
  --pc-font-size-3xl: 1.875rem;  /* 30px */
  --pc-font-size-4xl: 2.25rem;   /* 36px */
  
  /* Font Weights */
  --pc-font-weight-light: 300;
  --pc-font-weight-normal: 400;
  --pc-font-weight-medium: 500;
  --pc-font-weight-semibold: 600;
  --pc-font-weight-bold: 700;
  
  /* Line Heights */
  --pc-line-height-tight: 1.25;
  --pc-line-height-snug: 1.375;
  --pc-line-height-normal: 1.5;
  --pc-line-height-relaxed: 1.625;
  --pc-line-height-loose: 2;
}
```

## Animation Variables

```css
:root {
  /* Transitions */
  --pc-transition-base: all 0.2s ease;
  --pc-transition-fast: all 0.1s ease;
  --pc-transition-slow: all 0.3s ease;
  
  /* Easing Functions */
  --pc-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --pc-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --pc-ease-out: cubic-bezier(0, 0, 0.2, 1);
  
  /* Animation Durations */
  --pc-duration-fast: 150ms;
  --pc-duration-base: 300ms;
  --pc-duration-slow: 500ms;
}
```

## Chart Variables

```css
:root {
  /* Chart Colors */
  --pc-chart-primary: var(--bs-primary);
  --pc-chart-secondary: var(--bs-secondary);
  --pc-chart-success: var(--bs-success);
  --pc-chart-info: var(--bs-info);
  --pc-chart-warning: var(--bs-warning);
  --pc-chart-danger: var(--bs-danger);
  
  /* Chart Grid */
  --pc-chart-grid-color: #f3f4f6;
  --pc-chart-axis-color: #6b7280;
  
  /* Chart Tooltip */
  --pc-chart-tooltip-bg: #1f2937;
  --pc-chart-tooltip-color: #ffffff;
  --pc-chart-tooltip-border: #374151;
}

[data-pc-theme="dark"] {
  --pc-chart-grid-color: #374151;
  --pc-chart-axis-color: #9ca3af;
  --pc-chart-tooltip-bg: #374151;
}
```

## Utility Variables

```css
:root {
  /* Shadows */
  --pc-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --pc-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --pc-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --pc-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --pc-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Z-Index */
  --pc-z-dropdown: 1000;
  --pc-z-sticky: 1020;
  --pc-z-fixed: 1030;
  --pc-z-modal-backdrop: 1040;
  --pc-z-modal: 1050;
  --pc-z-popover: 1060;
  --pc-z-tooltip: 1070;
  
  /* Breakpoints (for JS usage) */
  --pc-breakpoint-xs: 0px;
  --pc-breakpoint-sm: 576px;
  --pc-breakpoint-md: 768px;
  --pc-breakpoint-lg: 992px;
  --pc-breakpoint-xl: 1200px;
  --pc-breakpoint-xxl: 1400px;
}
```

## SCSS Variables

### Bootstrap Overrides

```scss
// _bootstrap-variables.scss
$primary: #4f46e5 !default;
$secondary: #6b7280 !default;
$success: #10b981 !default;
$info: #3b82f6 !default;
$warning: #f59e0b !default;
$danger: #ef4444 !default;

// Font family
$font-family-sans-serif: 'Inter', system-ui, sans-serif !default;
$font-size-base: 0.875rem !default; // 14px
$line-height-base: 1.5 !default;

// Grid breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
) !default;

// Container max widths
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
) !default;

// Border radius
$border-radius: 8px !default;
$border-radius-sm: 4px !default;
$border-radius-lg: 12px !default;
$border-radius-xl: 16px !default;

// Component padding
$spacer: 1rem !default;
$spacers: (
  0: 0,
  1: $spacer * 0.25,  // 4px
  2: $spacer * 0.5,   // 8px
  3: $spacer,         // 16px
  4: $spacer * 1.5,   // 24px
  5: $spacer * 3,     // 48px
  6: $spacer * 4,     // 64px
  7: $spacer * 5      // 80px
) !default;
```

### Theme-Specific Variables

```scss
// _theme-variables.scss
$pc-sidebar-width: 260px !default;
$pc-sidebar-collapsed-width: 70px !default;
$pc-header-height: 60px !default;
$pc-footer-height: 50px !default;

// Theme presets
$pc-presets: (
  preset-1: #4f46e5,  // Indigo
  preset-2: #7c3aed,  // Purple
  preset-3: #ec4899,  // Pink
  preset-4: #ef4444,  // Red
  preset-5: #f97316,  // Orange
  preset-6: #eab308,  // Yellow
  preset-7: #22c55e,  // Green
  preset-8: #14b8a6,  // Teal
  preset-9: #06b6d4,  // Cyan
  preset-10: #6366f1  // Indigo variant
) !default;

// Component variables
$pc-card-padding: 1.5rem !default;
$pc-card-border-radius: 12px !default;
$pc-card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !default;

$pc-input-border-radius: 8px !default;
$pc-input-padding-y: 0.5rem !default;
$pc-input-padding-x: 0.75rem !default;

$pc-btn-border-radius: 8px !default;
$pc-btn-padding-y: 0.5rem !default;
$pc-btn-padding-x: 1rem !default;
```

## Variable Usage Examples

### Using CSS Custom Properties

```css
/* Component styling */
.custom-card {
  background: var(--pc-card-bg);
  border: 1px solid var(--pc-card-border);
  border-radius: var(--pc-card-border-radius);
  box-shadow: var(--pc-card-shadow);
  padding: var(--pc-card-body-padding);
}

/* Responsive values */
.custom-sidebar {
  width: var(--pc-sidebar-width);
  background: var(--pc-sidebar-bg);
  color: var(--pc-sidebar-color);
}

@media (max-width: 768px) {
  .custom-sidebar {
    width: var(--pc-sidebar-collapsed-width);
  }
}
```

### Using SCSS Variables

```scss
// Component with SCSS variables
.custom-component {
  padding: $pc-card-padding;
  border-radius: $pc-card-border-radius;
  
  @include media-breakpoint-up(md) {
    padding: $pc-card-padding * 1.5;
  }
}

// Generate utility classes
@each $name, $color in $pc-presets {
  .bg-#{$name} {
    background-color: #{$color} !important;
  }
  
  .text-#{$name} {
    color: #{$color} !important;
  }
  
  .border-#{$name} {
    border-color: #{$color} !important;
  }
}
```

## Customization Strategies

### Override CSS Custom Properties

```css
/* Override global variables */
:root {
  --bs-primary: #your-brand-color;
  --pc-sidebar-width: 280px;
  --pc-card-border-radius: 16px;
}

/* Theme-specific overrides */
[data-pc-preset="custom"] {
  --bs-primary: #custom-color;
  --bs-primary-rgb: 255, 107, 53;
}
```

### Override SCSS Variables

```scss
// _custom-variables.scss (import before bootstrap)
$primary: #your-brand-color;
$pc-sidebar-width: 280px;
$pc-card-border-radius: 16px;

// Then import the theme
@import 'bootstrap/scss/bootstrap';
@import 'admindek/scss/theme';
```

### Runtime Variable Changes

```javascript
// Change theme variables with JavaScript
document.documentElement.style.setProperty('--bs-primary', '#new-color');
document.documentElement.style.setProperty('--pc-sidebar-width', '300px');

// Toggle dark mode
document.body.setAttribute('data-pc-theme', 'dark');

// Change preset
document.body.setAttribute('data-pc-preset', 'preset-5');
```

---

## Related References

- **[Vite Configuration](vite-configuration.md)** - Build-time variable processing
- **[SCSS Mixins](scss-mixins.md)** - Utility mixins using these variables
- **[Design System](../concepts/design-system/color-system.md)** - Color theory and usage