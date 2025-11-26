# 🎨 Theme Customization

Complete guide to customizing Admindek's theme, colors, layouts, and visual elements.

## Overview

Admindek VanillaJS provides a comprehensive theming system built on **CSS custom properties** and **SCSS variables**, allowing extensive customization while maintaining design consistency.

## Quick Theme Changes

### Using Built-in Presets

**1. Via Configuration (Recommended):**
```javascript
// In vite.config.js
const preset_theme = 'preset-2';        // Change theme preset
const dark_layout = 'true';             // Enable dark mode
const sidebar_theme = 'theme-3';        // Sidebar color theme

// Available presets: preset-1 through preset-10
// Available sidebar themes: theme-1 through theme-8
```

**2. Via JavaScript (Runtime):**
```javascript
// Change theme preset dynamically
function changeThemePreset(presetNumber) {
  document.documentElement.setAttribute('data-pc-preset', `preset-${presetNumber}`);
  
  // Save preference
  localStorage.setItem('theme-preset', presetNumber);
}

// Toggle dark mode
function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-pc-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-pc-theme', newTheme);
  document.body.setAttribute('data-pc-theme', newTheme);
  
  localStorage.setItem('theme-mode', newTheme);
}

// Change sidebar theme
function changeSidebarTheme(themeNumber) {
  document.documentElement.setAttribute('data-pc-sidebar-theme', `theme-${themeNumber}`);
  localStorage.setItem('sidebar-theme', themeNumber);
}
```

## Custom Color Schemes

### Creating New Color Palettes

**1. Define Custom Colors:**
```scss
// In src/assets/scss/settings/_custom-colors.scss
$custom-brand-colors: (
  'ocean-blue': #0077be,
  'coral-red': #ff6b6b,
  'forest-green': #51cf66,
  'sunset-orange': #ff8c42,
  'lavender': #9775fa,
  'mint-green': #20c997,
  'golden-yellow': #ffd43b,
  'slate-gray': #6c757d
);

// Extend Bootstrap color map
$theme-colors: map-merge($theme-colors, (
  'ocean': map-get($custom-brand-colors, 'ocean-blue'),
  'coral': map-get($custom-brand-colors, 'coral-red'),
  'forest': map-get($custom-brand-colors, 'forest-green'),
  'sunset': map-get($custom-brand-colors, 'sunset-orange')
));
```

**2. Apply Custom Colors:**
```scss
// Create custom preset
:root[data-pc-preset="preset-custom"] {
  // Primary brand colors
  --bs-primary: #{map-get($custom-brand-colors, 'ocean-blue')};
  --bs-primary-rgb: #{red(map-get($custom-brand-colors, 'ocean-blue'))}, #{green(map-get($custom-brand-colors, 'ocean-blue'))}, #{blue(map-get($custom-brand-colors, 'ocean-blue'))};
  
  // Secondary colors
  --bs-secondary: #{map-get($custom-brand-colors, 'slate-gray')};
  --bs-success: #{map-get($custom-brand-colors, 'forest-green')};
  --bs-warning: #{map-get($custom-brand-colors, 'golden-yellow')};
  --bs-danger: #{map-get($custom-brand-colors, 'coral-red')};
  --bs-info: #{map-get($custom-brand-colors, 'ocean-blue')};
  
  // Sidebar customization
  --pc-sidebar-bg: #{darken(map-get($custom-brand-colors, 'ocean-blue'), 10%)};
  --pc-sidebar-color: #ffffff;
  --pc-sidebar-active-bg: #{rgba(map-get($custom-brand-colors, 'coral-red'), 0.1)};
  --pc-sidebar-active-color: #{map-get($custom-brand-colors, 'coral-red')};
}
```

### Industry-Specific Themes

**Healthcare Theme:**
```scss
:root[data-pc-preset="preset-healthcare"] {
  --bs-primary: #00a86b;        // Medical green
  --bs-secondary: #708090;      // Slate gray
  --bs-success: #32cd32;        // Lime green
  --bs-info: #4169e1;           // Royal blue
  --bs-warning: #ffa500;        // Orange
  --bs-danger: #dc143c;         // Crimson
  
  // Sidebar
  --pc-sidebar-bg: #2f4f4f;     // Dark slate gray
  --pc-sidebar-color: #f0f8ff;  // Alice blue
  
  // Cards and components
  --bs-card-bg: #f8f8ff;        // Ghost white
  --bs-border-color: #d3d3d3;   // Light gray
}
```

**Financial Theme:**
```scss
:root[data-pc-preset="preset-financial"] {
  --bs-primary: #1e3a8a;        // Professional blue
  --bs-secondary: #64748b;      // Slate
  --bs-success: #059669;        // Emerald
  --bs-info: #0ea5e9;           // Sky blue
  --bs-warning: #d97706;        // Amber
  --bs-danger: #dc2626;         // Red
  
  // Sidebar
  --pc-sidebar-bg: #0f172a;     // Dark navy
  --pc-sidebar-color: #e2e8f0;  // Light slate
  
  // Professional styling
  --bs-card-bg: #ffffff;
  --bs-border-color: #e5e7eb;
  --bs-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## Layout Customization

### Sidebar Modifications

**Custom Sidebar Width:**
```scss
// Wider sidebar
.pc-sidebar {
  width: 300px; // Default is 260px
  
  @include media-breakpoint-up(lg) {
    &.pc-sidebar-wide {
      width: 350px;
    }
  }
}

// Adjust main content accordingly
.pc-container {
  margin-left: 300px; // Match sidebar width
  
  @include media-breakpoint-down(lg) {
    margin-left: 0;
  }
}
```

**Compact Sidebar Mode:**
```scss
// Compact sidebar styling
.pc-sidebar.pc-sidebar-compact {
  width: 80px;
  
  .pc-mtext {
    display: none;
  }
  
  .pc-micon {
    margin-right: 0;
    justify-content: center;
    width: 100%;
  }
  
  .pc-submenu {
    position: absolute;
    left: 80px;
    top: 0;
    min-width: 200px;
    background: var(--pc-sidebar-bg);
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: none;
  }
  
  .pc-hasmenu:hover .pc-submenu {
    display: block;
  }
}

// Toggle compact mode
function toggleCompactSidebar() {
  const sidebar = document.querySelector('.pc-sidebar');
  const container = document.querySelector('.pc-container');
  
  sidebar.classList.toggle('pc-sidebar-compact');
  
  if (sidebar.classList.contains('pc-sidebar-compact')) {
    container.style.marginLeft = '80px';
    localStorage.setItem('sidebar-compact', 'true');
  } else {
    container.style.marginLeft = '260px';
    localStorage.setItem('sidebar-compact', 'false');
  }
}
```

### Header Customization

**Custom Header Layout:**
```scss
.pc-header {
  height: 80px; // Taller header
  background: linear-gradient(135deg, var(--bs-primary), var(--bs-info));
  
  .pc-head-link {
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  
  // Logo area
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }
  
  // Search bar styling
  .pc-search {
    .form-control {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
      
      &:focus {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: none;
      }
    }
  }
}
```

## Component Theming

### Custom Card Styles

**Glass Morphism Cards:**
```scss
.card-glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  
  &.card-dark {
    background: rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

// Apply to widgets
.widget-glass {
  @extend .card-glass;
  
  .widget-title {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .widget-value {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }
}
```

**Gradient Cards:**
```scss
.card-gradient {
  background: linear-gradient(135deg, var(--bs-primary), var(--bs-info));
  color: white;
  border: none;
  
  .card-title,
  .card-text {
    color: white;
  }
  
  &.card-gradient-success {
    background: linear-gradient(135deg, var(--bs-success), #20c997);
  }
  
  &.card-gradient-warning {
    background: linear-gradient(135deg, var(--bs-warning), #fd7e14);
  }
  
  &.card-gradient-danger {
    background: linear-gradient(135deg, var(--bs-danger), #e55353);
  }
}
```

### Button Customization

**Custom Button Variants:**
```scss
// Gradient buttons
.btn-gradient {
  background: linear-gradient(135deg, var(--bs-primary), var(--bs-info));
  border: none;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, 
      #{darken(var(--bs-primary), 10%)}, 
      #{darken(var(--bs-info), 10%)}
    );
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Neumorphism buttons
.btn-neuro {
  background: #e0e5ec;
  border: none;
  color: #333;
  box-shadow: 
    6px 6px 12px #c8d0d7,
    -6px -6px 12px #f8ffff;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 
      3px 3px 6px #c8d0d7,
      -3px -3px 6px #f8ffff;
  }
  
  &:active {
    box-shadow: 
      inset 2px 2px 4px #c8d0d7,
      inset -2px -2px 4px #f8ffff;
  }
}
```

## Dark Mode Enhancements

### Advanced Dark Theme

```scss
[data-pc-theme="dark"] {
  // Enhanced dark color palette
  --bs-body-bg: #0a0e14;
  --bs-body-color: #e2e8f0;
  
  // Card backgrounds
  --bs-card-bg: #1a202c;
  --bs-card-border-color: #2d3748;
  
  // Sidebar dark mode
  --pc-sidebar-bg: #0a0e14;
  --pc-sidebar-color: #a0aec0;
  --pc-sidebar-active-bg: rgba(79, 70, 229, 0.1);
  --pc-sidebar-active-color: #4f46e5;
  
  // Header dark mode
  --pc-header-bg: #1a202c;
  --pc-header-border-color: #2d3748;
  
  // Form elements
  --bs-input-bg: #2d3748;
  --bs-input-border-color: #4a5568;
  --bs-input-color: #e2e8f0;
  
  // Tables
  --bs-table-bg: #1a202c;
  --bs-table-striped-bg: #2d3748;
  --bs-table-hover-bg: #2d3748;
  
  // Better contrast for text
  .text-muted {
    color: #a0aec0 !important;
  }
  
  // Dark mode specific components
  .card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  
  .dropdown-menu {
    background-color: var(--bs-card-bg);
    border-color: var(--bs-card-border-color);
  }
  
  .form-control {
    &:focus {
      border-color: var(--bs-primary);
      box-shadow: 0 0 0 0.2rem rgba(79, 70, 229, 0.25);
    }
  }
}
```

## Responsive Theming

### Mobile-First Customizations

```scss
// Mobile optimizations
@include media-breakpoint-down(md) {
  .pc-header {
    height: 60px; // Shorter on mobile
    
    .navbar-brand {
      font-size: 1.25rem;
    }
  }
  
  .pc-sidebar {
    width: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.show {
      transform: translateX(0);
    }
  }
  
  // Mobile-specific cards
  .card {
    margin-bottom: 1rem;
    
    .card-body {
      padding: 1rem;
    }
  }
  
  // Compact dashboard on mobile
  .dashboard-mobile {
    .col-xl-3,
    .col-lg-6 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    
    .widget-value {
      font-size: 1.5rem;
    }
  }
}

// Tablet optimizations
@include media-breakpoint-only(md) {
  .pc-sidebar {
    width: 220px; // Narrower on tablet
  }
  
  .pc-container {
    margin-left: 220px;
  }
}
```

## Animation and Transitions

### Enhanced Micro-interactions

```scss
// Smooth theme transitions
* {
  transition: background-color 0.3s ease, 
              color 0.3s ease, 
              border-color 0.3s ease;
}

// Loading animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

// Staggered animation for dashboard widgets
.dashboard-widget {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  
  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}

// Hover effects
.card {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

// Sidebar animations
.pc-sidebar {
  .pc-item {
    .pc-link {
      transition: all 0.2s ease;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        height: 0;
        width: 3px;
        background: var(--bs-primary);
        transform: translateY(-50%);
        transition: height 0.2s ease;
      }
      
      &:hover,
      &.active {
        &::before {
          height: 100%;
        }
      }
    }
  }
}
```

## Advanced Customization

### CSS Custom Properties Management

```javascript
// Theme management utility
class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.themes = new Map();
    this.init();
  }
  
  // Register theme configuration
  registerTheme(name, config) {
    this.themes.set(name, config);
  }
  
  // Apply theme
  applyTheme(name) {
    const theme = this.themes.get(name);
    if (!theme) return;
    
    // Apply CSS custom properties
    Object.entries(theme).forEach(([property, value]) => {
      this.root.style.setProperty(`--${property}`, value);
    });
    
    // Save theme preference
    localStorage.setItem('current-theme', name);
    
    // Dispatch theme change event
    document.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme: name, config: theme }
    }));
  }
  
  // Get current theme
  getCurrentTheme() {
    return localStorage.getItem('current-theme') || 'default';
  }
  
  // Auto-detect system preference
  detectSystemPreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  
  init() {
    // Load saved theme or detect system preference
    const savedTheme = this.getCurrentTheme();
    if (savedTheme) {
      this.applyTheme(savedTheme);
    } else {
      const systemTheme = this.detectSystemPreference();
      this.applyTheme(systemTheme);
    }
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('current-theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Register custom themes
themeManager.registerTheme('ocean', {
  'bs-primary': '#0077be',
  'bs-secondary': '#64748b',
  'pc-sidebar-bg': '#003d5c',
  'pc-sidebar-color': '#ffffff'
});

themeManager.registerTheme('sunset', {
  'bs-primary': '#ff8c42',
  'bs-secondary': '#6c757d',
  'pc-sidebar-bg': '#d2691e',
  'pc-sidebar-color': '#ffffff'
});
```

---

## Summary

Admindek's theme customization system provides:

- **10 built-in theme presets** for quick customization
- **CSS custom properties** for runtime theme changes
- **SCSS variables** for build-time customization
- **Industry-specific themes** (healthcare, financial, etc.)
- **Advanced dark mode** with enhanced contrast
- **Responsive theming** for mobile and tablet
- **Component-level customization** for cards, buttons, forms
- **Animation system** for smooth transitions
- **Theme management utility** for complex scenarios

This comprehensive theming system allows you to create unique, branded experiences while maintaining Admindek's professional design standards.