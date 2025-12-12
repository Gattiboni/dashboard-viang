# 🚀 Building for Production

This tutorial will guide you through preparing and deploying your Admindek admin template for production environments.

## What You'll Learn

By the end of this tutorial, you'll know how to:
- ✅ Build optimized production assets
- ✅ Configure production settings
- ✅ Optimize performance and bundle size
- ✅ Deploy to various hosting platforms
- ✅ Set up CI/CD workflows
- ✅ Monitor and troubleshoot production builds

## Production Build Process

Admindek uses **Vite 7** for production builds, which provides:
- **Tree shaking** - Removes unused code
- **Code splitting** - Optimizes loading performance
- **Asset optimization** - Minifies CSS, JS, and images
- **Legacy browser support** - Ensures compatibility

## Step 1: Pre-build Checklist

### Code Quality Check

```bash
# Format code with Prettier
npm run format

# Clean up any duplicate files
npm run clean-duplicates
```

### Configuration Review

1. **Check `vite.config.js` settings**:
```javascript
// Verify production configuration
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  // Production optimizations
  build: {
    minify: 'terser',
    sourcemap: false, // Disable in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['bootstrap', 'apexcharts'],
          charts: ['apexcharts'],
        }
      }
    }
  }
});
```

2. **Review theme configuration**:
```javascript
// Ensure production-ready settings
const caption_show = 'true'
const preset_theme = 'preset-1' // Your chosen theme
const dark_layout = 'false'     // Default to light mode
const rtl_layout = 'false'      // Unless needed
const box_container = 'false'   // Full width by default
```

### Content Verification

- [ ] Replace placeholder content with real data
- [ ] Update contact information and branding
- [ ] Remove development-only features
- [ ] Test all navigation links
- [ ] Verify form submissions work

## Step 2: Production Build Commands

### Standard Production Build

```bash
# Clean build (removes dist folder)
rm -rf dist

# Build for production
npm run build-prod
```

### Advanced Build Options

```bash
# Build with bundle analysis
npm run build-prod -- --analyze

# Build with source maps (for debugging)
GENERATE_SOURCEMAP=true npm run build-prod

# Build with custom base path
npm run build-prod -- --base=/admin/
```

### Understanding Build Output

After running `npm run build-prod`, you'll see:

```
dist/
├── assets/
│   ├── css/
│   │   ├── style-[hash].css         # Main stylesheet (minified)
│   │   └── style-legacy-[hash].css  # Legacy browser support
│   ├── js/
│   │   ├── main-[hash].js          # Main JavaScript bundle
│   │   ├── vendor-[hash].js        # Third-party libraries
│   │   └── polyfills-[hash].js     # Browser polyfills
│   ├── images/                     # Optimized images
│   └── fonts/                      # Font files
├── dashboard/                      # Dashboard pages
├── application/                    # Application pages
├── forms/                         # Form pages
├── index.html                     # Entry point
└── [other-pages].html
```

## Step 3: Performance Optimization

### Bundle Size Analysis

1. **Install bundle analyzer**:
```bash
npm install --save-dev rollup-plugin-visualizer
```

2. **Add to `vite.config.js`**:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // ... other plugins
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ]
});
```

3. **Generate and review**:
```bash
npm run build-prod
# Opens stats.html in browser showing bundle composition
```

### Performance Optimizations

#### 1. Code Splitting by Routes

```javascript
// In vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split by page type
          dashboard: ['src/assets/js/widgets/*'],
          forms: ['src/assets/js/forms/*'],
          charts: ['apexcharts', 'src/assets/js/chart_maps/*'],
          tables: ['datatables.net*', 'simple-datatables']
        }
      }
    }
  }
});
```

#### 2. Image Optimization

```javascript
// Add image optimization plugin
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['src/assets/images/**/*.{jpg,jpeg,png,gif,svg}']
    }
  },
  // Image optimization
  optimizeDeps: {
    include: ['src/assets/images/**/*']
  }
});
```

#### 3. CSS Optimization

```scss
// Remove unused CSS utility classes
// Use PurgeCSS for production builds

// In package.json scripts:
"build-prod": "vite build --mode production && npm run purge-css",
"purge-css": "purgecss --css dist/assets/css/*.css --content dist/**/*.html --output dist/assets/css/"
```

## Step 4: Environment Configuration

### Environment Variables

1. **Create `.env.production`**:
```env
# Production environment variables
VITE_APP_NAME=Your Admin Panel
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_CDN_URL=https://cdn.yourdomain.com
```

2. **Use in your templates**:
```html
<!-- In head-page-meta.html -->
<title>@@title - @@VITE_APP_NAME</title>
<meta name="version" content="@@VITE_APP_VERSION">
```

### Production-Only Features

```javascript
// Enable production features
if (import.meta.env.PROD) {
  // Google Analytics
  gtag('config', 'GA_TRACKING_ID');
  
  // Error tracking
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production'
  });
  
  // Performance monitoring
  new PerformanceObserver((list) => {
    console.log('Performance metrics:', list.getEntries());
  }).observe({entryTypes: ['measure']});
}
```

## Step 5: Deployment Options

### Option 1: Static Hosting (Recommended)

#### Netlify Deployment

1. **Create `netlify.toml`**:
```toml
[build]
  publish = "dist"
  command = "npm run build-prod"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Deploy commands**:
```bash
# Connect your repository to Netlify
netlify init

# Deploy
netlify deploy --prod
```

#### Vercel Deployment

1. **Create `vercel.json`**:
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

2. **Deploy**:
```bash
npx vercel --prod
```

### Option 2: CDN + Object Storage

#### AWS S3 + CloudFront

1. **Build and upload**:
```bash
# Build
npm run build-prod

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

2. **Automated deployment script**:
```bash
#!/bin/bash
# deploy.sh

echo "Building for production..."
npm run build-prod

echo "Uploading to S3..."
aws s3 sync dist/ s3://your-admin-bucket --delete --cache-control max-age=31536000

echo "Invalidating CloudFront..."
aws cloudfront create-invalidation --distribution-id E1234567890 --paths "/*"

echo "Deployment complete!"
```

### Option 3: Traditional Web Server

#### Apache Configuration

```apache
# .htaccess for Apache
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/admin;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    
    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

## Step 6: CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests (if any)
      run: npm run test --if-present
      
    - name: Build for production
      run: npm run build-prod
      env:
        VITE_APP_VERSION: ${{ github.sha }}
        
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=dist
      env:
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### GitLab CI/CD

Create `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - deploy

variables:
  NODE_VERSION: "18"

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build-prod
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - curl -X POST -d {} $DEPLOY_WEBHOOK_URL
  only:
    - main
```

## Step 7: Production Monitoring

### Performance Monitoring

```javascript
// Add to your main JavaScript file
if (import.meta.env.PROD) {
  // Core Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
  
  // Custom performance metrics
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime);
    
    // Send to analytics
    gtag('event', 'page_load_time', {
      event_category: 'Performance',
      value: loadTime
    });
  });
}
```

### Error Tracking

```javascript
// Error handling for production
window.addEventListener('error', (event) => {
  if (import.meta.env.PROD) {
    console.error('Production error:', event.error);
    
    // Send to error tracking service
    if (window.Sentry) {
      Sentry.captureException(event.error);
    }
  }
});
```

## Step 8: Production Checklist

### Pre-deployment Checklist

- [ ] **Build succeeds** without errors or warnings
- [ ] **All pages load** correctly in production build
- [ ] **Assets are minified** and properly cached
- [ ] **Environment variables** are configured
- [ ] **Analytics and monitoring** are set up
- [ ] **Error tracking** is configured
- [ ] **Security headers** are in place
- [ ] **Performance is optimized** (load times < 3s)

### Post-deployment Testing

```bash
# Test production build locally
npm run build-prod
npm run preview

# Performance testing
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Bundle size check
npm run build-prod -- --analyze
```

### SEO and Accessibility

```html
<!-- Ensure proper meta tags in head-page-meta.html -->
<meta name="description" content="Professional admin dashboard template">
<meta name="keywords" content="admin, dashboard, bootstrap, template">
<meta name="author" content="DashboardPack">

<!-- Open Graph tags -->
<meta property="og:title" content="@@title - Admin Dashboard">
<meta property="og:description" content="Modern admin dashboard template">
<meta property="og:type" content="website">

<!-- Accessibility -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/favicon.ico">
```

## Troubleshooting Production Issues

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build-prod
```

### Asset Loading Issues

1. **Check base path configuration**
2. **Verify asset paths are relative**
3. **Ensure CDN configuration is correct**
4. **Test with different browsers**

### Performance Issues

1. **Enable gzip compression**
2. **Optimize images**
3. **Review bundle size**
4. **Check for unused dependencies**

## Next Steps

🎉 **Production Build Complete!** Your admin template is ready for users.

**Recommended next steps:**
- [Monitor performance](../concepts/performance/optimization-strategies.md) with analytics
- [Set up error tracking](../troubleshooting/README.md) for issues
- [Plan version updates](../migration/version-upgrades.md) and maintenance
- [Gather user feedback](../guides/README.md) for improvements

---

**Need help with deployment?** Check our [Deployment Troubleshooting Guide](../troubleshooting/build-errors.md) or contact support.