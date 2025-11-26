# 📖 Reference Documentation

This reference section provides comprehensive technical documentation for all components, APIs, and configuration options in Admindek VanillaJS.

## 🎯 How to Use This Reference

This section is **information-oriented** and organized for quick lookup of specific details. Use it when you need to:

- Find exact API parameters and return values
- Look up component properties and methods
- Check configuration options and their effects
- Reference code examples and usage patterns

## 📚 Reference Sections

### 🔧 [API Reference](api/README.md)
Complete technical documentation for configuration and JavaScript APIs.

- **[Vite Configuration](api/vite-configuration.md)** - Build system settings and options
- **[Theme Variables](api/theme-variables.md)** - Complete list of customizable theme variables
- **[JavaScript API](api/javascript-api.md)** - Component methods and functions
- **[SCSS Mixins](api/scss-mixins.md)** - Available mixins and their parameters

### 🧩 [Components](components/README.md)
Detailed documentation for all UI components and widgets.

- **[Dashboard Widgets](components/dashboard-widgets.md)** - 70+ chart and metric widgets
- **[Form Elements](components/form-elements.md)** - All form controls and validation
- **[UI Components](components/ui-components.md)** - Bootstrap components with customizations
- **[Chart Components](components/chart-components.md)** - ApexCharts and other chart libraries
- **[Data Tables](components/data-tables.md)** - DataTables and Simple DataTables

### 📄 [Pages](pages/README.md)
Complete catalog of all 129+ page templates included.

- **[Dashboard Pages](pages/dashboard-pages.md)** - 7 dashboard variants with features
- **[Application Pages](pages/application-pages.md)** - Calendar, chat, profile, and more
- **[Authentication Pages](pages/authentication-pages.md)** - Login, register, password reset
- **[Admin Pages](pages/admin-pages.md)** - Course management, helpdesk, invoicing

### 🎨 [Assets](assets/README.md)
Documentation for icons, images, fonts, and other assets.

- **[Icon Libraries](assets/icon-libraries.md)** - Phosphor Icons, Tabler Icons usage
- **[Image Assets](assets/image-assets.md)** - Organized image collections and usage
- **[Font Configuration](assets/font-configuration.md)** - Typography and font loading

## 🔍 Quick Reference

### Component Syntax

All Admindek components follow consistent patterns:

```html
<!-- Standard component structure -->
<div class="component-wrapper">
  <div class="component-header">
    <h5>Component Title</h5>
  </div>
  <div class="component-body">
    <!-- Component content -->
  </div>
</div>
```

### Common Class Prefixes

| Prefix | Purpose | Example |
|--------|---------|---------|
| `pc-` | Page Container elements | `pc-sidebar`, `pc-header` |
| `avtar` | Avatar components | `avtar-s`, `avtar-lg` |
| `f-` | Font utilities | `f-14`, `f-w-600` |
| `bg-light-` | Light background variants | `bg-light-primary` |
| `text-` | Text color utilities | `text-primary`, `text-muted` |

### JavaScript Patterns

```javascript
// Standard component initialization
document.addEventListener('DOMContentLoaded', function () {
  // Component code here
  const element = document.querySelector('#component-id');
  if (element) {
    // Initialize component
  }
});
```

### SCSS Variable Pattern

```scss
// Theme variables follow this pattern
--pc-[component]-[property]: value;

// Examples
--pc-sidebar-bg: #1a1d23;
--pc-header-color: #374151;
--pc-primary: #4f46e5;
```

## 📋 Component Categories

### Layout Components
- Sidebar navigation
- Header/topbar
- Breadcrumbs
- Footer
- Content containers

### Data Display
- Cards and metrics
- Tables and lists  
- Charts and graphs
- Progress indicators
- Statistics widgets

### Form Components
- Input fields
- Select dropdowns
- Checkboxes and radios
- Date/time pickers
- File uploads
- Validation

### Navigation
- Menu items
- Tabs and pills
- Pagination
- Dropdowns
- Breadcrumbs

### Feedback
- Alerts and notifications
- Modals and dialogs
- Tooltips and popovers
- Loading states
- Error states

## 🎨 Design Tokens

### Color System
```scss
// Primary colors
$primary: #4f46e5;
$secondary: #6b7280;
$success: #10b981;
$danger: #ef4444;
$warning: #f59e0b;
$info: #3b82f6;

// Neutral colors
$gray-50: #f9fafb;
$gray-100: #f3f4f6;
$gray-900: #111827;
```

### Spacing Scale
```scss
// Spacing utilities
$spacer: 1rem;
$spacers: (
  0: 0,
  1: 0.25rem,  // 4px
  2: 0.5rem,   // 8px
  3: 1rem,     // 16px
  4: 1.5rem,   // 24px
  5: 3rem      // 48px
);
```

### Typography Scale
```scss
// Font sizes
$font-size-12: 0.75rem;   // 12px
$font-size-14: 0.875rem;  // 14px
$font-size-16: 1rem;      // 16px
$font-size-18: 1.125rem;  // 18px
$font-size-24: 1.5rem;    // 24px
```

## 🔧 Configuration Reference

### Theme Presets
- `preset-1` through `preset-10`
- Each preset defines primary color and derivatives
- Automatically generates hover, focus, and disabled states

### Layout Options
- `sidebar_theme`: 'dark' | 'light'
- `header_theme`: '' | 'preset-1' to 'preset-10'
- `rtl_layout`: 'true' | 'false'
- `dark_layout`: 'true' | 'false'
- `box_container`: 'true' | 'false'

### Build Configuration
- Development vs Production modes
- Asset optimization settings
- Legacy browser support
- Source map generation

## 📱 Responsive Breakpoints

```scss
// Bootstrap 5 breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

## 🌐 Browser Support

- **Modern browsers**: Latest 2 versions
- **Legacy support**: Via Vite legacy plugin
- **Mobile browsers**: iOS Safari, Android Chrome
- **Desktop browsers**: Chrome, Firefox, Safari, Edge

## 📖 API Documentation Standards

All APIs in this reference follow these conventions:

### Parameters
- **Required parameters** are marked with `*`
- **Optional parameters** show default values
- **Type information** is provided for all parameters

### Examples  
- **Working code examples** for all components
- **Copy-paste ready** snippets
- **Common use cases** covered

### Return Values
- **Return types** clearly specified
- **Error conditions** documented
- **Success responses** with examples

---

## 🔍 Search Tips

- Use **Ctrl/Cmd + F** to search within pages
- **Component names** are consistently used across documentation
- **Code examples** include searchable comments
- **Cross-references** link related topics

**Need something specific?** Use the search function or browse by category above.