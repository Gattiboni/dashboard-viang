# 🎨 Customizing Theme

Learn how to customize Admindek's appearance to match your brand and design preferences. This tutorial covers the most common customization scenarios you'll encounter.

## What You'll Learn

By the end of this tutorial, you'll know how to:
- ✅ Change color schemes and create custom presets
- ✅ Modify typography and spacing
- ✅ Configure dark/light mode behavior
- ✅ Set up RTL (right-to-left) layouts
- ✅ Customize sidebar and header themes
- ✅ Override Bootstrap variables

## Theme Configuration System

Admindek uses a **centralized configuration system** in `vite.config.js` that controls:
- Color presets (preset-1 to preset-10)
- Layout options (sidebar, header, container)
- Theme modes (dark, light, RTL)
- Component behaviors

## Step 1: Understanding Theme Presets

### Available Presets

Admindek includes 10 built-in color presets:

```javascript
// In vite.config.js
const preset_theme = 'preset-1' // Options: preset-1 to preset-10
```

**Preset Colors Overview:**
- `preset-1`: Blue (#4f46e5) - Default
- `preset-2`: Purple (#7c3aed) 
- `preset-3`: Pink (#ec4899)
- `preset-4`: Red (#ef4444)
- `preset-5`: Orange (#f97316)
- `preset-6`: Yellow (#eab308)
- `preset-7`: Green (#22c55e)
- `preset-8`: Teal (#14b8a6)
- `preset-9`: Cyan (#06b6d4)
- `preset-10`: Indigo (#6366f1)

### Switching Presets

1. **Open** `vite.config.js`
2. **Change** the preset value:
   ```javascript
   const preset_theme = 'preset-5' // Orange theme
   ```
3. **Rebuild** the project:
   ```bash
   npm run build
   ```
4. **Refresh** your browser

## Step 2: Creating Custom Colors

### Method 1: SCSS Variable Override

1. **Create** `src/assets/scss/custom-theme.scss`:

```scss
// Custom color variables
:root {
  --bs-primary: #your-primary-color;
  --bs-primary-rgb: your-rgb-values;
  
  // Example: Custom brand colors
  --bs-primary: #ff6b35;
  --bs-primary-rgb: 255, 107, 53;
  --bs-secondary: #2d3436;
  --bs-secondary-rgb: 45, 52, 54;
  
  // Custom sidebar colors
  --pc-sidebar-bg: #1a1d23;
  --pc-sidebar-color: #b8c7ce;
  
  // Custom header colors
  --pc-header-bg: #ffffff;
  --pc-header-color: #212529;
}

// Custom component styles
.card {
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border: none;
  border-radius: 8px;
}
```

2. **Import** in `src/assets/scss/style.scss`:
```scss
// Import custom theme after bootstrap
@import 'bootstrap/scss/bootstrap';
@import 'custom-theme';
```

### Method 2: Bootstrap Variable Override

1. **Edit** `src/assets/scss/settings/_bootstrap-variables.scss`:

```scss
// Primary color system
$primary: #ff6b35;
$secondary: #2d3436;
$success: #00b894;
$info: #74b9ff;
$warning: #fdcb6e;
$danger: #e84393;

// Typography
$font-family-sans-serif: 'Inter', system-ui, sans-serif;
$font-size-base: 0.875rem;
$line-height-base: 1.5;

// Border radius
$border-radius: 8px;
$border-radius-sm: 6px;
$border-radius-lg: 12px;

// Spacing
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
  6: $spacer * 4,
  7: $spacer * 5
);
```

## Step 3: Layout Configuration

### Sidebar Customization

```javascript
// In vite.config.js
const sidebar_theme = 'dark'     // Options: 'dark', 'light'
const caption_show = 'true'      // Show/hide sidebar captions
```

**Custom Sidebar Styles:**

```scss
// In your custom-theme.scss
.pc-sidebar {
  background: linear-gradient(180deg, #1a1d23 0%, #2d3436 100%);
  
  .pc-link {
    color: #b8c7ce;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
    
    &.active {
      background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
      color: #ffffff;
    }
  }
}
```

### Header Customization

```javascript
// In vite.config.js
const header_theme = 'preset-1'        // Match your primary color
const navbar_bg_theme = 'preset-1'     // Header background
```

**Custom Header Styles:**

```scss
.pc-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  
  .pc-h-item {
    color: #374151;
    
    &:hover {
      color: #ff6b35;
    }
  }
}
```

## Step 4: Dark Mode Configuration

### Enable Dark Mode

```javascript
// In vite.config.js
const dark_layout = 'true' // Enable dark mode by default
```

### Custom Dark Mode Colors

```scss
// Dark mode variables
[data-pc-theme="dark"] {
  --bs-body-bg: #1a1d23;
  --bs-body-color: #e5e7eb;
  --bs-card-bg: #2d3436;
  --bs-border-color: #374151;
  
  .card {
    background-color: var(--bs-card-bg);
    border-color: var(--bs-border-color);
  }
  
  .navbar-light {
    background-color: #2d3436;
    border-color: #374151;
  }
}
```

### Dynamic Theme Switching

Add theme toggle functionality:

```javascript
// Custom theme switcher
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-pc-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-pc-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-pc-theme', savedTheme);
});
```

## Step 5: RTL (Right-to-Left) Support

### Enable RTL Layout

```javascript
// In vite.config.js
const rtl_layout = 'true' // Enable RTL support
```

### Custom RTL Styles

```scss
// RTL-specific adjustments
[dir="rtl"] {
  .pc-sidebar {
    right: 0;
    left: auto;
  }
  
  .pc-container {
    margin-right: 260px;
    margin-left: 0;
  }
  
  .dropdown-menu {
    right: 0;
    left: auto;
  }
  
  // Custom spacing for RTL
  .me-3 {
    margin-right: 0 !important;
    margin-left: 1rem !important;
  }
}
```

## Step 6: Typography Customization

### Custom Font Integration

1. **Add Google Fonts** to `src/html/layouts/head-css.html`:

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. **Update SCSS variables**:

```scss
// Typography variables
$font-family-sans-serif: 'Inter', system-ui, sans-serif;
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Heading styles
$h1-font-size: 2.5rem;
$h2-font-size: 2rem;
$h3-font-size: 1.75rem;
$h4-font-size: 1.5rem;
$h5-font-size: 1.25rem;
$h6-font-size: 1rem;
```

## Step 7: Component Customization

### Card Components

```scss
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.15);
  }
  
  .card-header {
    background: transparent;
    border-bottom: 1px solid #e5e7eb;
    padding: 1.5rem;
  }
}
```

### Button Styles

```scss
.btn {
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &.btn-primary {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    border: none;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
    }
  }
}
```

## Step 8: Building and Testing

### Development Testing

```bash
# Rebuild with your changes
npm run build

# Start preview server
npm run preview
```

### Production Build

```bash
# Build for production
npm run build-prod
```

### Testing Checklist

- [ ] All pages load without console errors
- [ ] Colors appear correctly across components
- [ ] Dark mode switches properly (if enabled)
- [ ] RTL layout works correctly (if enabled)
- [ ] Typography renders with custom fonts
- [ ] Interactive elements maintain functionality

## Advanced Customization

### CSS Custom Properties

```scss
:root {
  // Animation timing
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
  
  // Spacing system
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 3rem;
  
  // Border radius system
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

### Component Variants

```scss
// Custom card variants
.card-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## Common Customization Patterns

### Brand Color Integration

```scss
// Define your brand palette
$brand-primary: #ff6b35;
$brand-secondary: #2d3436;
$brand-accent: #00b894;

// Apply to Bootstrap variables
$primary: $brand-primary;
$secondary: $brand-secondary;
$success: $brand-accent;
```

### Layout Modifications

```scss
// Custom container max-widths
.pc-container {
  max-width: 1400px; // Wider layout
  margin: 0 auto;
}

// Custom sidebar width
.pc-sidebar {
  width: 280px; // Wider sidebar
}

.pc-container {
  margin-left: 280px; // Adjust content margin
}
```

## Troubleshooting Theme Issues

### Colors Not Changing
1. Clear browser cache
2. Check SCSS import order
3. Ensure rebuild completed successfully
4. Verify CSS variable syntax

### Layout Breaking
1. Check Bootstrap grid usage
2. Verify responsive classes
3. Test across different screen sizes
4. Review custom CSS specificity

### Performance Issues
1. Optimize custom CSS
2. Remove unused styles
3. Check for CSS conflicts
4. Use browser dev tools to profile

## Next Steps

🎉 **Theme Customization Complete!** Your admin template now reflects your brand.

**What's next?**
- [Building for Production](building-production.md) - Deploy your customized template
- [Advanced Component Customization](../guides/components/adding-new-components.md) - Create custom widgets
- [Performance Optimization](../concepts/performance/optimization-strategies.md) - Optimize your build

---

**Need more advanced theming?** Check our [SCSS Customization Guide](../guides/theming/scss-customization.md) for deeper customization options.