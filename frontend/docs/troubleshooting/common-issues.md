# 🔧 Common Issues

Solutions to frequently encountered problems when working with Admindek VanillaJS.

## Installation Issues

### Node.js Version Compatibility

**Problem:** Error messages during `npm install` about unsupported Node.js version.

```bash
error @rollup/rollup-linux-x64-gnu@4.9.4: The engine "node" is incompatible with this module.
```

**Solution:**
1. **Check your Node.js version:**
   ```bash
   node --version
   ```

2. **Update to Node.js 16+ (recommended 18+):**
   ```bash
   # Using Node Version Manager (recommended)
   nvm install 18
   nvm use 18
   
   # Or download from nodejs.org
   ```

3. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Package Installation Failures

**Problem:** `npm install` fails with permission errors or missing packages.

```bash
EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Solutions:**

**Option 1 - Use npm prefix (Recommended):**
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

**Option 2 - Fix permissions:**
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

**Option 3 - Use Yarn instead:**
```bash
npm install -g yarn
yarn install
yarn dev
```

## Build Errors

### Vite Configuration Issues

**Problem:** Build fails with configuration errors.

```bash
[vite] Internal server error: Failed to resolve entry for package "admindek"
```

**Solutions:**

1. **Check vite.config.js syntax:**
   ```javascript
   // Verify all imports exist
   import { defineConfig } from 'vite'
   import { vitePluginFileInclude } from './plugins/vite-plugin-file-include.js'
   
   // Check file paths are correct
   export default defineConfig({
     // Valid configuration
   })
   ```

2. **Verify plugin files exist:**
   ```bash
   ls -la plugins/
   # Should show: vite-plugin-file-include.js, vite-plugin-copy-assets.js
   ```

3. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run build
   ```

### SCSS Compilation Errors

**Problem:** SCSS files fail to compile with import errors.

```bash
Error: Can't find stylesheet to import.
@import "bootstrap/scss/bootstrap";
```

**Solutions:**

1. **Check Bootstrap installation:**
   ```bash
   npm list bootstrap
   # Should show bootstrap@5.3.7 or similar
   ```

2. **Verify SCSS import paths:**
   ```scss
   // In style.scss - check these imports exist
   @import 'bootstrap/scss/bootstrap';
   @import 'settings/theme-variables';
   @import 'themes/general';
   ```

3. **Check file structure:**
   ```bash
   ls src/assets/scss/settings/
   # Should contain _theme-variables.scss, _bootstrap-variables.scss
   ```

4. **Clear SCSS cache:**
   ```bash
   rm -rf dist/
   npm run build
   ```

## Development Server Issues

### Port Already in Use

**Problem:** Development server can't start because port is occupied.

```bash
Port 3000 is already in use
```

**Solutions:**

1. **Kill process using the port:**
   ```bash
   # Find process using port 3000
   lsof -ti :3000
   
   # Kill the process (replace PID with actual number)
   kill -9 PID
   
   # Or kill all Node processes (be careful!)
   killall node
   ```

2. **Use different port:**
   ```bash
   npm run preview -- --port 3001
   ```

3. **Configure default port in vite.config.js:**
   ```javascript
   export default defineConfig({
     server: {
       port: 3001
     }
   })
   ```

### Hot Module Replacement Not Working

**Problem:** Changes not reflected automatically during development.

**Note:** Admindek uses preview server approach, so manual refresh is required.

**Expected Behavior:**
1. File watcher rebuilds automatically
2. Refresh browser to see changes

**Solutions:**

1. **Check if dev-watch is running:**
   ```bash
   npm run dev
   # Should show: "👀 Watching for changes..."
   ```

2. **Verify file paths being watched:**
   ```javascript
   // In dev-watch.js
   const watcher = chokidar.watch([
     'src/html/**/*.html',
     'src/assets/scss/**/*.scss'
   ])
   ```

3. **Manual refresh workflow:**
   ```bash
   # Terminal 1: File watcher
   npm run dev
   
   # Terminal 2: Preview server
   npm run preview
   
   # Edit files → Auto rebuild → Manual refresh browser
   ```

## Styling Issues

### CSS Not Loading

**Problem:** Styles don't appear on the page or look broken.

**Symptoms:**
- Unstyled HTML elements
- Bootstrap styles not applied
- Custom styles missing

**Solutions:**

1. **Check CSS includes in HTML templates:**
   ```html
   <!-- In head-css.html -->
   @@include('../layouts/head-css.html')
   
   <!-- Should generate links to CSS files -->
   <link rel="stylesheet" href="../assets/css/style.css">
   ```

2. **Verify build output:**
   ```bash
   ls dist/assets/css/
   # Should contain style.css and other CSS files
   ```

3. **Check console for CSS errors:**
   ```
   Open browser DevTools → Console → Look for 404 errors
   Failed to load resource: net::ERR_FILE_NOT_FOUND
   ```

4. **Clear browser cache:**
   ```bash
   # Hard refresh in browser
   Ctrl+Shift+R (Chrome/Firefox)
   Cmd+Shift+R (Safari)
   ```

### Icons Not Displaying

**Problem:** Phosphor or Tabler icons show as squares or don't appear.

**Solutions:**

1. **Check icon font files:**
   ```bash
   ls dist/assets/fonts/
   # Should contain phosphor/ and tabler/ folders
   ```

2. **Verify CSS includes:**
   ```html
   <!-- Should be in head-css.html -->
   <link rel="stylesheet" href="../assets/fonts/phosphor/regular/style.css">
   <link rel="stylesheet" href="../assets/fonts/tabler-icons.min.css">
   ```

3. **Check icon syntax:**
   ```html
   <!-- Phosphor icons (correct) -->
   <i class="ph-duotone ph-house"></i>
   
   <!-- Tabler icons (correct) -->
   <i class="ti ti-home"></i>
   
   <!-- Common mistakes -->
   <i class="ph ph-house"></i> <!-- Missing 'duotone' -->
   <i class="ph-house"></i>    <!-- Missing 'ph-duotone' -->
   ```

4. **Test icon loading:**
   ```css
   /* Add to test CSS loading */
   .ph-duotone:before {
     content: "✓"; /* Should show checkmark if CSS loaded */
   }
   ```

### Theme Variables Not Working

**Problem:** CSS custom properties or theme colors don't apply.

**Solutions:**

1. **Check theme configuration:**
   ```javascript
   // In vite.config.js
   const preset_theme = 'preset-1' // Should match desired theme
   const dark_layout = 'false'     // Should match desired mode
   ```

2. **Verify CSS custom properties:**
   ```css
   /* Check if these exist in browser DevTools */
   :root {
     --bs-primary: #4f46e5;
     --pc-sidebar-bg: #1f2937;
   }
   ```

3. **Check body attributes:**
   ```html
   <!-- Should be generated by @@bodySetup -->
   <body data-pc-preset="preset-1" data-pc-theme="light">
   ```

4. **Browser compatibility:**
   ```javascript
   // Check if CSS custom properties are supported
   if (window.CSS && CSS.supports('color', 'var(--fake)')) {
     console.log('CSS custom properties supported');
   } else {
     console.log('CSS custom properties NOT supported');
   }
   ```

## JavaScript Issues

### Charts Not Rendering

**Problem:** ApexCharts or other charts don't display.

**Symptoms:**
- Empty chart containers
- Console errors about ApexCharts
- Charts show but with no data

**Solutions:**

1. **Check ApexCharts loading:**
   ```javascript
   // In browser console
   console.log(typeof ApexCharts);
   // Should log "function", not "undefined"
   ```

2. **Verify chart container exists:**
   ```javascript
   // Check if chart container is in DOM
   const container = document.querySelector('#chart-id');
   console.log(container); // Should not be null
   ```

3. **Check script loading order:**
   ```html
   <!-- Correct order in footer-js.html -->
   <script src="../assets/js/plugins/apexcharts.min.js"></script>
   <script src="../assets/js/widgets/chart-widget.js"></script>
   ```

4. **Debug chart initialization:**
   ```javascript
   // Add debugging to chart code
   document.addEventListener('DOMContentLoaded', function() {
     console.log('DOM loaded');
     
     const chartElement = document.querySelector('#chart-id');
     console.log('Chart element:', chartElement);
     
     if (chartElement && typeof ApexCharts !== 'undefined') {
       // Chart initialization code
     } else {
       console.error('Chart requirements not met');
     }
   });
   ```

### Form Validation Not Working

**Problem:** Form validation doesn't trigger or show errors.

**Solutions:**

1. **Check Bootstrap validation classes:**
   ```html
   <!-- Correct validation markup -->
   <form class="needs-validation" novalidate>
     <div class="mb-3">
       <input type="email" class="form-control" required>
       <div class="invalid-feedback">
         Please enter a valid email.
       </div>
     </div>
   </form>
   ```

2. **Verify JavaScript validation:**
   ```javascript
   // Bootstrap validation initialization
   (function() {
     'use strict';
     var forms = document.querySelectorAll('.needs-validation');
     Array.prototype.slice.call(forms).forEach(function(form) {
       form.addEventListener('submit', function(event) {
         if (!form.checkValidity()) {
           event.preventDefault();
           event.stopPropagation();
         }
         form.classList.add('was-validated');
       }, false);
     });
   })();
   ```

3. **Check form submission:**
   ```javascript
   // Debug form validation
   document.querySelectorAll('form').forEach(form => {
     form.addEventListener('submit', function(e) {
       console.log('Form submitted:', form);
       console.log('Valid:', form.checkValidity());
     });
   });
   ```

## Navigation Issues

### Sidebar Menu Not Working

**Problem:** Sidebar navigation doesn't expand/collapse or links don't work.

**Solutions:**

1. **Check Bootstrap JavaScript:**
   ```html
   <!-- Ensure Bootstrap JS is loaded -->
   <script src="../assets/js/plugins/bootstrap.min.js"></script>
   ```

2. **Verify menu HTML structure:**
   ```html
   <!-- Correct dropdown structure -->
   <li class="pc-item pc-hasmenu">
     <a href="#!" class="pc-link">
       <span class="pc-mtext">Dashboard</span>
       <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
     </a>
     <ul class="pc-submenu">
       <li class="pc-item">
         <a class="pc-link" href="../dashboard/analytics.html">Analytics</a>
       </li>
     </ul>
   </li>
   ```

3. **Check active menu highlighting:**
   ```javascript
   // Debug active menu detection
   const currentPath = window.location.pathname;
   console.log('Current path:', currentPath);
   
   document.querySelectorAll('.pc-link').forEach(link => {
     if (link.getAttribute('href').includes(currentPath)) {
       console.log('Should be active:', link);
     }
   });
   ```

### Breadcrumb Issues

**Problem:** Breadcrumbs show incorrect paths or don't update.

**Solutions:**

1. **Check breadcrumb template usage:**
   ```html
   <!-- Correct breadcrumb include -->
   @@include('../layouts/breadcrumb.html', {
     'breadcrumb-item': 'Dashboard',
     'breadcrumb-item-active': 'Analytics'
   })
   ```

2. **Verify breadcrumb.html template:**
   ```html
   <!-- In layouts/breadcrumb.html -->
   <div class="page-header">
     <div class="page-block">
       <div class="row align-items-center">
         <div class="col-md-12">
           <div class="page-header-title">
             <h2 class="mb-0">@@breadcrumb-item-active</h2>
           </div>
           <ul class="breadcrumb">
             <li class="breadcrumb-item">
               <a href="../dashboard/index.html">@@breadcrumb-item</a>
             </li>
             <li class="breadcrumb-item active">@@breadcrumb-item-active</li>
           </ul>
         </div>
       </div>
     </div>
   </div>
   ```

## Performance Issues

### Slow Page Loading

**Problem:** Pages take too long to load.

**Diagnosis Steps:**

1. **Check Network tab in DevTools:**
   - Look for large file sizes (>1MB)
   - Check for failed requests (404s)
   - Identify slow-loading resources

2. **Common causes and solutions:**

**Large Bundle Sizes:**
```bash
# Analyze bundle size
npm run build-prod -- --analyze

# Check dist folder size
du -sh dist/
```

**Unused Dependencies:**
```bash
# Check for unused packages
npm audit
npm outdated

# Remove unused dependencies
npm uninstall unused-package
```

**Unoptimized Images:**
```bash
# Check image sizes
find dist/assets/images -name "*.jpg" -o -name "*.png" | xargs ls -lh

# Use optimized formats (WebP, modern formats)
# Implement lazy loading for images below fold
```

3. **Performance optimization:**
```javascript
// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});
```

## Browser Compatibility Issues

### Internet Explorer Support

**Problem:** Template doesn't work in older browsers.

**Solution:** Admindek targets modern browsers. For IE support:

```javascript
// Add polyfills for older browsers
if (!window.fetch) {
  // Add fetch polyfill
  document.head.appendChild(script);
}

// Check for CSS custom property support
if (!CSS.supports('color', 'var(--fake)')) {
  // Fallback for older browsers
  document.documentElement.className += ' no-css-vars';
}
```

### Mobile Browser Issues

**Problem:** Issues on iOS Safari or Android Chrome.

**Solutions:**

1. **Check viewport meta tag:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1">
   ```

2. **Test responsive behavior:**
   ```css
   /* Add iOS-specific fixes */
   @supports (-webkit-touch-callout: none) {
     .ios-fix {
       /* iOS-specific styles */
     }
   }
   ```

3. **Check touch interactions:**
   ```javascript
   // Ensure touch events work
   element.addEventListener('touchstart', handleTouch, { passive: true });
   ```

## Getting Help

### Diagnostic Information to Collect

When reporting issues, include:

```bash
# System information
echo "Node.js: $(node --version)"
echo "NPM: $(npm --version)"
echo "OS: $(uname -a)"

# Project information
npm list --depth=0
git status
git log --oneline -3

# Error messages (copy full error text)
npm run build 2>&1 | tee build-error.log
```

### Support Channels

- **Email**: dashboardpack@gmail.com
- **Include**: Error messages, system info, steps to reproduce
- **Response Time**: Usually within 24-48 hours

---

## Prevention Tips

1. **Keep dependencies updated**: Regular `npm update`
2. **Use version control**: Commit working states frequently
3. **Test across browsers**: Don't develop in just one browser
4. **Monitor console**: Check for warnings/errors regularly
5. **Backup before changes**: Create backups before major modifications

Most issues can be resolved with these solutions. If you encounter a persistent problem not covered here, don't hesitate to contact support with detailed information about your environment and the specific issue.