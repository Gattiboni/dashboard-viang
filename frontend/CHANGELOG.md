# Changelog

All notable changes to the Admindek-VanillaJS project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2025-08-11

### ✨ Added
- **Custom development watcher** (`dev-watch.js`) that automatically rebuilds on source file changes
- **Duplicate file cleaner** (`clean-duplicates.js`) utility for build optimization
- **Enhanced HTML dev server plugin** for better development routing
- **Improved development workflow** with separate watcher and preview server commands
- **File watching with Chokidar** for more reliable change detection
- **Automatic theme recompilation** when editing source files

### 🔄 Changed
- **Development command** `npm run dev` now starts the file watcher instead of Vite dev server
- **Preview server** separated from development watcher for better performance
- **Build process** optimized with custom file watching implementation
- **Documentation** updated with clearer development workflow instructions
- **README** enhanced with more detailed setup and usage instructions

### 🛠️ Technical Improvements
- **Better file watching** with custom implementation using Chokidar
- **Improved build performance** with optimized rebuild triggers
- **Enhanced development experience** with automatic rebuilds
- **Cleaner project structure** with utility scripts separated
- **More robust asset handling** during development

### 📦 Dependencies
- **Updated**: Vite to 7.1.1
- **Updated**: Sass to 1.90.0
- **Updated**: Prettier to 3.4.2
- **Added**: Chokidar 4.0.1 for file watching

### 🐛 Fixed
- **Development server issues** resolved with custom watcher implementation
- **File change detection** improved for better development experience
- **Build artifacts** cleaned up with duplicate removal utility
- **Asset path resolution** improved in development environment

### 🔧 Maintenance
- **Improved documentation** in CLAUDE.md for AI-assisted development
- **Better organized** custom plugins and utility scripts
- **Cleaner build output** with duplicate file removal
- **Enhanced project structure** documentation

## [3.0.0] - 2025-07-08

### 🚀 Major Changes
- **BREAKING**: Migrated from Gulp to Vite 7 build system
- **BREAKING**: Updated development workflow and commands
- **BREAKING**: Restructured asset handling and build process

### ✨ Added
- **Vite 7** as primary build tool for lightning-fast development
- **Custom Vite plugins** for file includes and asset copying
- **Preview server** for development with better compatibility
- **Tree-shaking optimization** for production builds
- **Legacy browser support** via @vitejs/plugin-legacy
- **Hot Module Replacement** for faster development
- **Multiple entry points** for CSS and JavaScript files
- **Source maps** for better debugging experience
- **Modern ES modules** support with backward compatibility

### 🔄 Changed
- **Development server** now uses preview mode instead of dev server
- **Build commands** updated to use Vite instead of Gulp
- **Asset copying** now handled by custom Vite plugin
- **HTML templating** migrated to custom Vite plugin with same `@@include()` syntax
- **SCSS compilation** now handled by Vite with Sass
- **Theme configuration** moved from `gulpfile.js` to `vite.config.js`
- **Development workflow** streamlined with faster builds

### 🛠️ Technical Improvements
- **Faster builds** with Vite's optimized bundling
- **Better dependency management** with explicit imports
- **Improved development experience** with instant HMR
- **Enhanced asset handling** for fonts, images, and other resources
- **Optimized production builds** with automatic minification
- **Better error handling** and debugging capabilities

### 📦 Dependencies
- **Updated**: Bootstrap to 5.3.7
- **Updated**: ApexCharts to 4.7.0
- **Updated**: All vendor libraries to latest stable versions
- **Added**: Vite 7 and related plugins
- **Added**: Sass for SCSS preprocessing
- **Added**: Prettier for code formatting
- **Removed**: Gulp and all gulp-related dependencies

### 🐛 Fixed
- **Asset paths** now correctly resolved in all environments
- **CSS compilation** issues resolved with proper source maps
- **Template variables** properly processed in all contexts
- **File watching** improved for faster development feedback
- **Production builds** optimized for better performance

### 🔧 Maintenance
- **Cleaned up** duplicate and unused files
- **Improved** project structure organization
- **Updated** documentation and README
- **Enhanced** development scripts and workflow
- **Standardized** code formatting with Prettier

---

## [2.x.x] - Previous Gulp-based Versions

### Features from Previous Versions
- **Bootstrap 5** framework integration
- **Responsive design** with mobile-first approach
- **Dark mode** toggle functionality
- **RTL support** for right-to-left languages
- **Multiple layout options** (vertical, horizontal, tab-based)
- **Rich UI components** library
- **Chart integrations** (ApexCharts, Peity)
- **Data tables** with full functionality
- **Form components** and validation
- **Authentication pages** (login, register, reset password)
- **Admin dashboard** templates
- **Application pages** (calendar, chat, user profile)
- **Widget components** for analytics
- **Icon libraries** (Phosphor, Tabler)
- **File upload** functionality
- **Text editors** (Quill, TinyMCE)
- **Date pickers** and form controls
- **Image galleries** and lightbox
- **Error pages** and maintenance mode
- **Multi-language support** (i18n)

### Previous Build System (Gulp)
- **SCSS compilation** with autoprefixer
- **File watching** and live reload
- **Asset optimization** for production
- **HTML templating** with includes
- **Vendor library** management
- **Image optimization** and compression
- **JavaScript minification** and bundling

---

## Migration Guide: Gulp to Vite

### Command Changes
| Old (Gulp) | New (Vite) | Description |
|------------|------------|-------------|
| `gulp` | `npm start` | Start development server |
| `gulp build-prod` | `npm run build-prod` | Production build |
| `gulp watch` | `npm start` | File watching (automatic) |

### File Structure Changes
- **gulpfile.js** → **vite.config.js** (configuration)
- **gulp/tasks/** → **plugins/** (custom plugins)
- Build output remains in **dist/** folder
- Source files remain in **src/** folder

### Development Workflow
1. **Before**: `gulp` → BrowserSync → file watching
2. **After**: `npm start` → Vite build → preview server

### Features Preserved
- ✅ All HTML templating with `@@include()` syntax
- ✅ Theme configuration and variables
- ✅ SCSS compilation and processing
- ✅ Asset copying from node_modules
- ✅ Production optimization
- ✅ All existing functionality

### Benefits of Migration
- **⚡ 5x faster builds** with Vite
- **🔄 Instant HMR** for development
- **📦 Better tree-shaking** for smaller bundles
- **🎯 Modern tooling** with ES modules
- **🔧 Improved debugging** with source maps
- **🚀 Future-ready** architecture

---

## Support

For issues, questions, or feature requests:
- **Email**: dashboardpack@gmail.com
- **Website**: https://dashboardpack.com/

## License

This project is licensed under the MIT License.