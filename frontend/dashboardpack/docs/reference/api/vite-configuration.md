# ⚙️ Vite Configuration Reference

Complete reference for configuring Vite 7 build system in Admindek VanillaJS.

## Overview

Admindek uses **Vite 7** as its build system, providing fast development and optimized production builds. The main configuration is in `vite.config.js` at the project root.

## Configuration File Structure

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import legacy from '@vitejs/plugin-legacy'
import { vitePluginFileInclude } from './plugins/vite-plugin-file-include.js'
import { vitePluginCopyAssets } from './plugins/vite-plugin-copy-assets.js'
import { vitePluginHtmlDevServer } from './plugins/vite-plugin-html-dev-server.js'

export default defineConfig({
  // Configuration options
})
```

## Theme Configuration Variables

### Basic Theme Settings

```javascript
// Color and Layout Configuration
const caption_show = 'true'      // Show sidebar captions
const preset_theme = 'preset-1'  // Color preset (1-10)
const dark_layout = 'false'      // Default theme mode
const rtl_layout = 'false'       // Text direction
const box_container = 'false'    // Container width mode
const sidebar_theme = 'dark'     // Sidebar appearance
```

**Available Options:**

| Variable | Type | Options | Default | Description |
|----------|------|---------|---------|-------------|
| `caption_show` | string | `'true'`, `'false'` | `'true'` | Display sidebar menu captions |
| `preset_theme` | string | `'preset-1'` to `'preset-10'` | `'preset-1'` | Primary color scheme |
| `dark_layout` | string | `'true'`, `'false'`, `'default'` | `'false'` | Default theme mode |
| `rtl_layout` | string | `'true'`, `'false'` | `'false'` | Right-to-left layout |
| `box_container` | string | `'true'`, `'false'` | `'false'` | Boxed vs full-width layout |
| `sidebar_theme` | string | `'dark'`, `'light'` | `'dark'` | Sidebar color theme |

### Advanced Theme Settings

```javascript
// Header and Navigation Customization  
const header_theme = ''              // Header color preset
const navbar_bg_theme = ''           // Navigation background
const logo_theme = ''                // Logo area theme
const navbar_caption_theme = ''      // Caption styling
const navbar_image_theme = ''        // Navigation images
const nav_dropdown_icon_theme = ''   // Dropdown icons
const nav_dropdown_link_icon_theme = '' // Dropdown link icons
const version = 'v3.0.0'            // Theme version
```

**Theme Preset Colors:**

| Preset | Primary Color | Usage |
|--------|---------------|-------|
| `preset-1` | `#4f46e5` | Default blue theme |
| `preset-2` | `#7c3aed` | Purple theme |
| `preset-3` | `#ec4899` | Pink theme |
| `preset-4` | `#ef4444` | Red theme |
| `preset-5` | `#f97316` | Orange theme |
| `preset-6` | `#eab308` | Yellow theme |
| `preset-7` | `#22c55e` | Green theme |
| `preset-8` | `#14b8a6` | Teal theme |
| `preset-9` | `#06b6d4` | Cyan theme |
| `preset-10` | `#6366f1` | Indigo theme |

## Build Configuration

### Development Settings

```javascript
export default defineConfig({
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  // Development optimizations
  esbuild: {
    target: 'es2015'
  },
  
  // CSS processing
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/settings/_theme-variables.scss";`
      }
    }
  }
})
```

### Production Build Settings

```javascript
export default defineConfig({
  build: {
    // Output directory
    outDir: 'dist',
    
    // Asset directory within outDir
    assetsDir: 'assets',
    
    // Minification
    minify: 'terser',
    
    // Generate sourcemaps
    sourcemap: false,
    
    // Bundle analysis
    reportCompressedSize: true,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Rollup options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
        style: resolve(__dirname, 'src/style.js'),
        'style-preset': resolve(__dirname, 'src/style-preset.js'),
        uikit: resolve(__dirname, 'src/uikit.js'),
        landing: resolve(__dirname, 'src/landing.js')
      },
      output: {
        // Manual chunk splitting
        manualChunks: {
          vendor: ['bootstrap'],
          charts: ['apexcharts'],
          utils: ['src/assets/js/script.js']
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`
          }
          if (/\.(png|jpe?g|gif|svg|ico|webp)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].${ext}`
        }
      }
    },
    
    // Terser options for minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
```

## Plugin Configuration

### File Include Plugin

```javascript
// Custom HTML templating with @@include syntax
vitePluginFileInclude({
  include: '**/*.html',
  context: {
    // Theme variables available in templates
    ...layout,
    // Custom variables
    siteName: 'Admindek VanillaJS',
    version: '3.0.0'
  }
})
```

**Template Variables Available:**

| Variable | Value | Usage |
|----------|-------|-------|
| `@@bodySetup` | Theme data attributes | `<body @@bodySetup>` |
| `@@pc_preset_theme` | Current preset | Theme-specific CSS |
| `@@pc_dark_layout` | Dark mode setting | Conditional rendering |
| `@@pc_rtl_layout` | RTL setting | Direction-specific CSS |
| `@@pc_sidebar_theme` | Sidebar theme | Sidebar styling |

### Asset Copy Plugin

```javascript
// Copy vendor assets from node_modules
vitePluginCopyAssets({
  assets: [
    {
      from: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
      to: 'assets/js/plugins/'
    },
    {
      from: 'node_modules/apexcharts/dist/apexcharts.min.js',
      to: 'assets/js/plugins/'
    }
    // ... more assets
  ]
})
```

### Legacy Browser Support

```javascript
// Support for older browsers
legacy({
  targets: ['defaults', 'not IE 11'],
  additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
  renderLegacyChunks: true,
  polyfills: [
    'es.symbol',
    'es.promise',
    'es.promise.finally',
    'es/map',
    'es/set'
  ]
})
```

## Environment Configuration

### Environment Variables

```javascript
// .env files supported
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

**Example `.env.production`:**

```env
VITE_APP_TITLE=Admindek Admin Dashboard
VITE_APP_VERSION=3.0.0
VITE_API_BASE_URL=https://api.example.com
VITE_CDN_URL=https://cdn.example.com
```

**Usage in Templates:**

```html
<title>@@VITE_APP_TITLE - Dashboard</title>
<meta name="version" content="@@VITE_APP_VERSION">
```

## File Processing

### HTML Processing

```javascript
// HTML files are processed through custom plugin
input: findHtmlFiles('src/html/'), // Auto-discover HTML files

// Template processing
'@@include': (file, context) => processInclude(file, context),
'@@': (variable) => processVariable(variable, context)
```

### SCSS Processing

```javascript
css: {
  preprocessorOptions: {
    scss: {
      // Global SCSS imports
      additionalData: `
        @import "src/assets/scss/settings/_theme-variables.scss";
        @import "src/assets/scss/settings/_bootstrap-variables.scss";
      `,
      // Import paths
      includePaths: ['node_modules', 'src/assets/scss']
    }
  }
}
```

### JavaScript Processing

```javascript
// ES6+ support with babel
esbuild: {
  target: 'es2015',
  include: /\.(m?jsx?|tsx?)$/,
  exclude: /node_modules/,
  jsxFactory: 'h',
  jsxFragment: 'Fragment'
}
```

## Optimization Settings

### Code Splitting

```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        // Vendor chunk
        if (id.includes('node_modules')) {
          if (id.includes('bootstrap')) return 'bootstrap'
          if (id.includes('apexcharts')) return 'charts'
          return 'vendor'
        }
        
        // Feature-based chunks
        if (id.includes('src/assets/js/widgets/')) return 'widgets'
        if (id.includes('src/assets/js/forms/')) return 'forms'
        if (id.includes('src/assets/js/admin/')) return 'admin'
      }
    }
  }
}
```

### Asset Optimization

```javascript
build: {
  // Asset inline threshold
  assetsInlineLimit: 4096,
  
  // CSS code splitting
  cssCodeSplit: true,
  
  // Rollup options
  rollupOptions: {
    external: ['some-external-lib'],
    output: {
      globals: {
        'some-external-lib': 'SomeLib'
      }
    }
  }
}
```

## Development Server

### Dev Server Configuration

```javascript
server: {
  // Port configuration
  port: 3000,
  strictPort: false,
  
  // Host configuration
  host: 'localhost',
  
  // HTTPS (optional)
  https: false,
  
  // Open browser
  open: true,
  
  // Proxy configuration (for API)
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
  
  // CORS
  cors: true,
  
  // Headers
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
```

### Hot Module Replacement

```javascript
// HMR is enabled by default
server: {
  hmr: {
    port: 24678,
    overlay: true
  }
}

// Disable HMR for specific files
if (import.meta.hot) {
  import.meta.hot.decline() // Don't HMR this module
}
```

## Custom Plugins

### File Include Plugin API

```javascript
// plugins/vite-plugin-file-include.js
export function vitePluginFileInclude(options = {}) {
  return {
    name: 'vite-plugin-file-include',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html, context) {
        return processIncludes(html, options.context || {})
      }
    }
  }
}
```

### Copy Assets Plugin API

```javascript
// plugins/vite-plugin-copy-assets.js
export function vitePluginCopyAssets(options = {}) {
  return {
    name: 'vite-plugin-copy-assets',
    buildStart() {
      // Copy assets during build
      options.assets.forEach(asset => {
        copyAsset(asset.from, asset.to)
      })
    }
  }
}
```

## Configuration Examples

### Basic Configuration

```javascript
// Minimal configuration for new projects
export default defineConfig({
  plugins: [
    vitePluginFileInclude(),
    vitePluginCopyAssets({
      assets: vendorAssets
    })
  ],
  build: {
    outDir: 'dist',
    minify: 'terser'
  }
})
```

### Advanced Configuration

```javascript
// Full-featured configuration
export default defineConfig({
  plugins: [
    vitePluginFileInclude({
      include: '**/*.html',
      context: layout
    }),
    vitePluginCopyAssets({
      assets: vendorAssets
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: multipleEntryPoints,
      output: {
        manualChunks: {
          vendor: ['bootstrap', 'apexcharts'],
          theme: ['src/assets/js/script.js', 'src/assets/js/theme.js']
        }
      }
    }
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/settings/_theme-variables.scss";`
      }
    }
  }
})
```

## Performance Tuning

### Build Performance

```javascript
build: {
  // Enable build cache
  cache: true,
  
  // Parallel processing
  minify: 'terser',
  terserOptions: {
    parallel: true
  },
  
  // Reduce bundle analysis time
  reportCompressedSize: false
}
```

### Development Performance

```javascript
server: {
  // Faster dependency pre-bundling
  optimizeDeps: {
    include: ['bootstrap', 'apexcharts'],
    exclude: ['some-large-lib']
  },
  
  // Reduce HMR overhead
  hmr: {
    overlay: false
  }
}
```

## Troubleshooting

### Common Configuration Issues

**Build Errors:**
```javascript
// Fix path resolution issues
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '~': path.resolve(__dirname, 'node_modules')
  }
}
```

**SCSS Import Issues:**
```javascript
css: {
  preprocessorOptions: {
    scss: {
      // Fix import paths
      includePaths: ['node_modules', 'src/assets/scss']
    }
  }
}
```

**Plugin Conflicts:**
```javascript
// Ensure plugin order
plugins: [
  // File processing first
  vitePluginFileInclude(),
  // Asset copying after processing
  vitePluginCopyAssets(),
  // Legacy support last
  legacy()
]
```

---

## Related References

- **[Theme Variables](theme-variables.md)** - Complete theme customization options
- **[JavaScript API](javascript-api.md)** - Client-side configuration
- **[Build System](../concepts/architecture/build-system.md)** - Architecture overview