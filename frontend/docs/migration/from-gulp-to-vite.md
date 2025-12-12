# 🔄 From Gulp to Vite Migration

Complete guide for migrating from Admindek v2.x (Gulp-based) to v3.0+ (Vite-based).

## Overview

This migration represents a major upgrade from a Gulp-based build system to modern Vite 7. The migration improves development speed, reduces complexity, and provides better optimization.

## Migration Impact

### What's Changed

**Build System:**
- ❌ **Gulp 4** → ✅ **Vite 7**
- ❌ **gulp-file-include** → ✅ **Custom Vite plugin**
- ❌ **gulp-sass** → ✅ **Vite SCSS processing**
- ❌ **Complex task configuration** → ✅ **Simple vite.config.js**

**Development Workflow:**
- ❌ **`gulp dev`** → ✅ **`npm run dev`**
- ❌ **Page reloads** → ✅ **Auto-rebuild with manual refresh**
- ❌ **Slow builds (3-5s)** → ✅ **Fast builds (<1s)**
- ❌ **Complex watch tasks** → ✅ **Built-in file watching**

**File Structure:**
- ❌ **`gulpfile.js`** → ✅ **`vite.config.js`**
- ❌ **`gulp/` directory** → ✅ **`plugins/` directory**
- ❌ **`src/scss/`** → ✅ **`src/assets/scss/`**
- ❌ **`src/js/`** → ✅ **`src/assets/js/`**

**Commands:**
- ❌ **`gulp build`** → ✅ **`npm run build`**
- ❌ **`gulp serve`** → ✅ **`npm run preview`**
- ❌ **`gulp watch`** → ✅ **`npm run dev`**

## Pre-Migration Checklist

### 1. Backup Your Project

```bash
# Create complete backup
cp -r admindek-v2 admindek-v2-backup-$(date +%Y%m%d)

# Git backup (if using version control)
git branch pre-vite-migration
git add -A
git commit -m "Backup before Vite migration"
```

### 2. Document Customizations

```bash
# List all custom files
find . -name "*.custom.*" > custom-files.txt
find . -name "*-custom.*" >> custom-files.txt

# Note any modifications to core files
git diff --name-only > modified-files.txt 2>/dev/null || echo "Not a git repository"
```

### 3. Check System Requirements

```bash
# Check Node.js version (must be 16+)
node --version
# If less than v16, update:
# nvm install 18 && nvm use 18

# Check current dependencies
npm list > old-dependencies.txt
```

## Step-by-Step Migration

### Step 1: Environment Setup

**Update Node.js:**
```bash
# Recommended: Use Node.js 18+
nvm install 18
nvm use 18
```

**Clean Installation:**
```bash
# Remove old dependencies
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force
```

### Step 2: Replace Configuration Files

**Remove Gulp Files:**
```bash
# Remove Gulp configuration
rm gulpfile.js
rm -rf gulp/

# Remove Gulp dependencies from package.json
# (This will be done when updating package.json)
```

**Add Vite Configuration:**
```bash
# Download or copy vite.config.js from v3.0+
wget https://raw.githubusercontent.com/codedthemes/admindek-vanilla/main/vite.config.js
```

**Create Vite Plugins:**
```bash
# Create plugins directory
mkdir plugins

# Add custom Vite plugins (copy from v3.0+)
# - vite-plugin-file-include.js
# - vite-plugin-copy-assets.js
# - vite-plugin-html-dev-server.js
```

### Step 3: Update Package Configuration

**Replace package.json scripts:**
```json
{
  "scripts": {
    // Remove Gulp scripts
    // "build": "gulp build",
    // "dev": "gulp dev",
    // "serve": "gulp serve",
    
    // Add Vite scripts
    "dev": "node dev-watch.js",
    "build": "vite build",
    "build-prod": "vite build --mode production",
    "preview": "vite preview --port 4173",
    "start": "npm run build && npm run preview",
    "clean-duplicates": "node clean-duplicates.js",
    "format": "prettier --write \"src/**/*.{html,js,scss}\""
  }
}
```

**Update Dependencies:**
```bash
# Install Vite and related packages
npm install --save-dev vite@^7.0.4
npm install --save-dev sass@^1.89.2
npm install --save-dev @vitejs/plugin-legacy
npm install --save-dev terser
npm install --save-dev chokidar
npm install --save-dev prettier

# Remove Gulp dependencies
npm uninstall gulp gulp-file-include gulp-sass gulp-autoprefixer gulp-clean-css
npm uninstall gulp-uglify gulp-rename gulp-sourcemaps gulp-imagemin
npm uninstall browser-sync

# Update Bootstrap and other dependencies
npm install bootstrap@^5.3.7
npm update
```

### Step 4: Restructure Source Files

**Move Assets:**
```bash
# Create new asset structure
mkdir -p src/assets/scss src/assets/js src/assets/images src/assets/fonts

# Move existing files
mv src/scss/* src/assets/scss/ 2>/dev/null || echo "No SCSS files to move"
mv src/js/* src/assets/js/ 2>/dev/null || echo "No JS files to move" 
mv src/images/* src/assets/images/ 2>/dev/null || echo "No images to move"

# Remove old directories if empty
rmdir src/scss src/js src/images 2>/dev/null || echo "Directories not empty or already removed"
```

**Create Entry Points:**
```bash
# Create main.js (JavaScript entry point)
cat > src/main.js << 'EOF'
// Main JavaScript entry point for Vite
import './assets/js/script.js'
import './assets/js/theme.js'
EOF

# Create style.js (CSS entry point)
cat > src/style.js << 'EOF'
// Main CSS entry point for Vite
import './assets/scss/style.scss'
EOF
```

### Step 5: Update File Paths and Imports

**Update SCSS Import Paths:**
```scss
// In src/assets/scss/style.scss
// Update paths to work with Vite's resolution

// Old Gulp paths:
// @import '../node_modules/bootstrap/scss/bootstrap';

// New Vite paths:
@import 'bootstrap/scss/bootstrap';
@import 'settings/theme-variables';
@import 'themes/general';
```

**Update HTML Template Paths:**
```html
<!-- Update asset references in HTML templates -->
<!-- Old paths: -->
<!-- <link rel="stylesheet" href="assets/css/style.css"> -->

<!-- New paths (will be processed by Vite): -->
<link rel="stylesheet" href="../assets/css/style.css">
```

**Update JavaScript Imports:**
```javascript
// Old CommonJS imports (if any):
// const bootstrap = require('bootstrap');

// New ES module imports:
import 'bootstrap';
import ApexCharts from 'apexcharts';
```

### Step 6: Update Build Scripts

**Create Development Watcher:**
```javascript
// dev-watch.js (copy from v3.0+)
const chokidar = require('chokidar');
const { exec } = require('child_process');

const watcher = chokidar.watch([
  'src/html/**/*.html',
  'src/assets/scss/**/*.scss',
  'src/assets/js/**/*.js'
]);

watcher.on('change', (path) => {
  console.log(`File changed: ${path}`);
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Build error: ${error}`);
      return;
    }
    console.log('✅ Build completed');
  });
});

console.log('👀 Watching for changes...');
```

### Step 7: Test Migration

**Build Test:**
```bash
# Test development build
npm run build

# Check output directory
ls -la dist/

# Test preview server
npm run preview
# Open http://localhost:4173 in browser
```

**Functionality Test:**
```bash
# Test file watching
npm run dev
# In another terminal:
npm run preview

# Edit a file in src/ and check if build triggers
# Refresh browser to see changes
```

### Step 8: Verify All Pages

**Page Testing Checklist:**
- [ ] All HTML pages build without errors
- [ ] CSS styles load correctly
- [ ] JavaScript functionality works
- [ ] Images and fonts load properly
- [ ] Icons display correctly
- [ ] Charts and widgets render
- [ ] Forms function properly
- [ ] Mobile responsiveness intact

**Automated Testing:**
```bash
# Test all pages build successfully
npm run build-prod

# Check for JavaScript errors
# Open each major page in browser and check console
```

## Common Migration Issues

### Template Include Issues

**Problem:** `@@include` statements not processed correctly.

**Solution:**
```javascript
// Ensure vite-plugin-file-include.js is correctly configured
// in vite.config.js and includes proper path resolution
```

### SCSS Import Errors

**Problem:** SCSS imports fail with "Can't find stylesheet to import."

**Solution:**
```scss
// Update import paths in SCSS files
// Old: @import '../node_modules/bootstrap/scss/bootstrap';
// New: @import 'bootstrap/scss/bootstrap';

// Check that sass is installed:
// npm install --save-dev sass
```

### Asset Path Issues

**Problem:** Images, fonts, or CSS files return 404 errors.

**Solution:**
```javascript
// Check vite.config.js publicDir configuration
// Ensure assets are copied correctly by vite-plugin-copy-assets
```

### JavaScript Module Issues

**Problem:** JavaScript modules don't load or throw import errors.

**Solution:**
```javascript
// Update import statements to ES modules
// Old: var ApexCharts = require('apexcharts');
// New: import ApexCharts from 'apexcharts';

// Ensure proper script loading order in HTML
```

## Custom Code Migration

### Preserving Customizations

**CSS Customizations:**
```scss
// If you had custom SCSS files:
// gulpfile.js: src/scss/custom.scss

// Move to: src/assets/scss/custom.scss
// And import in main style.scss:
@import 'custom';
```

**JavaScript Customizations:**
```javascript
// If you had custom JS files:
// gulpfile.js: src/js/custom.js

// Move to: src/assets/js/custom.js
// And import in main.js:
import './assets/js/custom.js';
```

**HTML Template Customizations:**
```html
<!-- Custom includes should work the same -->
@@include('layouts/custom-header.html', {
  'title': 'Custom Page'
})
```

## Performance Comparison

### Before (Gulp v2.x)

**Development:**
- **Cold start**: 3-5 seconds
- **Rebuild**: 2-3 seconds  
- **Watch mode**: Full page reload
- **Bundle analysis**: Manual setup required

**Production:**
- **Build time**: 30-60 seconds
- **Bundle size**: ~2.5MB total
- **Code splitting**: Manual configuration
- **Tree shaking**: Limited

### After (Vite v3.0)

**Development:**
- **Cold start**: 0.5-1 second
- **Rebuild**: 0.3-0.5 seconds
- **Watch mode**: Auto-rebuild, manual refresh
- **Bundle analysis**: Built-in tools

**Production:**
- **Build time**: 10-20 seconds  
- **Bundle size**: ~1.8MB total
- **Code splitting**: Automatic
- **Tree shaking**: Advanced

## Post-Migration Tasks

### Update Documentation

```bash
# Update README.md with new commands
# Update any deployment scripts
# Update CI/CD configurations if applicable
```

### Team Training

- **New development workflow**: `npm run dev` + `npm run preview`
- **Manual refresh requirement**: Unlike some Vite setups, Admindek requires manual browser refresh
- **New build commands**: Different from Gulp commands
- **Configuration changes**: vite.config.js vs gulpfile.js

### Monitoring

**Watch for Issues:**
- Build failures in production
- Performance regressions
- Asset loading problems
- Cross-browser compatibility

**Performance Metrics:**
- Monitor bundle sizes over time
- Check page load speeds
- Verify functionality across devices

## Rollback Plan

If migration issues arise:

**Immediate Rollback:**
```bash
# Switch to backup
mv admindek-v3 admindek-v3-issues
mv admindek-v2-backup admindek-current

# Or using Git:
git checkout pre-vite-migration
```

**Gradual Rollback:**
```bash
# Identify specific issues
# Fix incrementally
# Test thoroughly before proceeding
```

## Support and Resources

### Getting Help

**Common Resources:**
- Vite documentation: https://vitejs.dev/
- Migration issues: Check troubleshooting section
- Community support: Include system info and error messages

**What to Include in Support Requests:**
- Node.js version
- NPM version  
- Complete error messages
- Steps taken so far
- Custom modifications made

### Professional Migration

For complex customizations or enterprise environments:
- Custom migration planning
- Code review and testing
- Team training
- Ongoing support

Contact dashboardpack@gmail.com for professional migration services.

---

## Migration Success

Upon successful completion, you'll have:

✅ **5x faster development builds**
✅ **Modern build tooling with Vite 7**  
✅ **Simplified configuration**
✅ **Better error messages and debugging**
✅ **Optimized production builds**
✅ **Future-proof architecture**

The migration from Gulp to Vite represents a significant modernization that will improve your development experience and application performance.