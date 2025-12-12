# ❓ Troubleshooting

This section helps you diagnose and resolve common issues you might encounter while working with Admindek VanillaJS.

## 🎯 How to Use This Guide

This troubleshooting section is organized by:

- **Problem type** - Installation, build, runtime, or deployment issues
- **Symptom** - What you're seeing that indicates a problem
- **Solution** - Step-by-step resolution instructions
- **Prevention** - How to avoid the issue in the future

## 🔍 Quick Diagnosis

### **Issue Categories**

| Symptom | Likely Category | Quick Fix |
|---------|----------------|-----------|
| Won't install/build | [Build Errors](build-errors.md) | Check Node.js version |
| Styles not loading | [Browser Compatibility](browser-compatibility.md) | Clear browser cache |
| Charts not rendering | [Performance Issues](performance-issues.md) | Check console errors |
| Slow page loads | [Performance Issues](performance-issues.md) | Optimize bundle size |
| Layout broken | [Common Issues](common-issues.md) | Verify CSS imports |

### **Emergency Fixes**

```bash
# Nuclear option - complete reset
rm -rf node_modules package-lock.json dist
npm install
npm run build
npm run preview
```

## 📚 Troubleshooting Sections

### 🔧 [Common Issues](common-issues.md)
Frequently encountered problems and their solutions.

**Covers:**
- Installation problems
- Configuration issues  
- Template rendering errors
- Asset loading failures
- Navigation problems

### 🚨 [Build Errors](build-errors.md)
Development and production build failures.

**Covers:**
- Vite configuration errors
- SCSS compilation failures
- JavaScript bundling issues
- Asset optimization problems
- Production build failures

### 🌐 [Browser Compatibility](browser-compatibility.md)
Cross-browser issues and legacy browser support.

**Covers:**
- CSS compatibility problems
- JavaScript feature support
- Polyfill requirements
- Mobile browser issues
- Performance variations

### ⚡ [Performance Issues](performance-issues.md)
Slow loading, memory usage, and optimization problems.

**Covers:**
- Bundle size optimization
- Chart rendering performance
- Memory leak prevention
- Network optimization
- Cache configuration

## 🛠️ Diagnostic Tools

### **Browser Developer Tools**

#### **Console Tab**
```javascript
// Check for JavaScript errors
console.error() // Red messages indicate problems
console.warn()  // Yellow messages show warnings

// Debug chart initialization
window.ApexCharts // Should be available if charts loaded
document.querySelector('#chart-id') // Check if chart container exists
```

#### **Network Tab**
```
Status Codes to Watch:
├── 404: Missing files (check file paths)
├── 500: Server errors (check backend)
├── 304: Cached (good for performance)
└── 200: Successful loading
```

#### **Performance Tab**
```
Key Metrics:
├── First Contentful Paint (FCP) < 1.5s
├── Largest Contentful Paint (LCP) < 2.5s
├── Cumulative Layout Shift (CLS) < 0.1
└── First Input Delay (FID) < 100ms
```

### **Command Line Diagnostics**

#### **Environment Check**
```bash
# Verify versions
node --version    # Should be 16+
npm --version     # Should be 7+
git --version     # Should be 2.0+

# Check project status
npm list          # Show installed packages
npm audit         # Check for vulnerabilities
npm outdated      # Show package updates
```

#### **Build Analysis**
```bash
# Analyze bundle size
npm run build-prod -- --analyze

# Check build output
ls -la dist/      # Verify files generated
du -sh dist/      # Check total size

# Test production build
npm run preview   # Preview production build
```

## 🔍 Problem-Solving Methodology

### **Step 1: Identify the Problem**

1. **What were you trying to do?**
   - Installing the template
   - Building for production
   - Customizing components
   - Deploying to server

2. **What did you expect to happen?**
   - Successful installation
   - Working dashboard
   - Custom styling applied
   - Live website

3. **What actually happened?**
   - Error messages
   - Blank screens
   - Incorrect styling
   - Build failures

### **Step 2: Gather Information**

```bash
# Collect system information
echo "Node: $(node --version)"
echo "NPM: $(npm --version)"
echo "OS: $(uname -a)"
echo "Date: $(date)"

# Check project status
npm list --depth=0
git status
git log --oneline -5
```

### **Step 3: Isolate the Issue**

#### **Minimal Reproduction**
1. Start with a fresh installation
2. Apply changes one at a time
3. Test after each change
4. Identify the breaking change

#### **Environment Testing**
```bash
# Test in different environments
npm run dev     # Development mode
npm run build   # Development build
npm run build-prod # Production build

# Test in different browsers
# Chrome, Firefox, Safari, Edge
```

### **Step 4: Apply Solutions**

#### **Progressive Fixes**
1. **Simple fixes first** - Clear cache, restart server
2. **Configuration fixes** - Check settings, update variables
3. **Code fixes** - Review custom code, fix syntax errors
4. **Nuclear option** - Complete reinstall

## 🔄 Common Resolution Patterns

### **Cache-Related Issues**

```bash
# Clear all caches
rm -rf node_modules/.cache
rm -rf dist
npm run clean-duplicates

# Clear browser cache
# Chrome: Ctrl+Shift+R (hard refresh)
# Firefox: Ctrl+F5
# Safari: Cmd+Option+R
```

### **Permission Issues (Windows)**

```cmd
# Run as Administrator
npm config set scripts-prepend-node-path true

# Alternative: Use Yarn
npm install -g yarn
yarn install
yarn build
```

### **Path-Related Issues**

```bash
# Check for spaces in paths
pwd | grep " " # Should return nothing

# Use absolute paths for testing
npm run build -- --base="/"
```

## 📊 Error Code Reference

### **Common Error Codes**

| Error | Meaning | Solution |
|-------|---------|----------|
| `ENOENT` | File not found | Check file paths |
| `EACCES` | Permission denied | Fix file permissions |
| `EADDRINUSE` | Port in use | Change port or kill process |
| `MODULE_NOT_FOUND` | Missing dependency | Run `npm install` |
| `ESYNTAX` | Syntax error | Check code syntax |

### **Vite-Specific Errors**

```bash
# Vite error patterns
"[vite] Internal server error"     # Check configuration
"Failed to resolve import"         # Check import paths
"Cannot read property"             # Check variable names
"Unexpected token"                 # Check syntax
```

## 🧪 Testing Procedures

### **Quick Health Check**

```bash
# 5-minute health check
npm install                    # Dependencies ok?
npm run build                 # Build succeeds?
npm run preview               # Preview works?
# Visit http://localhost:4173  # Site loads?
```

### **Comprehensive Testing**

```bash
# Full testing procedure
npm run format               # Code formatted?
npm run clean-duplicates    # No duplicate files?
npm run build-prod         # Production build ok?
npm run preview            # Production preview ok?

# Manual testing
# ✓ Homepage loads
# ✓ Navigation works  
# ✓ Charts render
# ✓ Forms function
# ✓ Mobile responsive
```

## 📞 Getting Additional Help

### **Before Contacting Support**

1. **Search existing issues** - Check documentation first
2. **Gather information** - Error messages, system details
3. **Create reproduction** - Minimal example that shows the problem
4. **Document steps** - What you tried, what didn't work

### **What to Include in Support Requests**

```
Subject: [Admindek] Brief description of issue

Environment:
- Node.js version: X.X.X
- NPM version: X.X.X
- Operating System: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari/Edge

Problem Description:
- What you were trying to do
- What you expected to happen
- What actually happened
- Error messages (full text)

Steps to Reproduce:
1. Step one
2. Step two  
3. Step three

Additional Context:
- Recent changes made
- Screenshots if helpful
- Relevant configuration files
```

### **Support Channels**

- **Email**: dashboardpack@gmail.com
- **Documentation**: This troubleshooting guide
- **Community**: Check for user forums or GitHub discussions

## 🎯 Prevention Strategies

### **Best Practices**

1. **Keep dependencies updated** - Regular `npm update`
2. **Test before deploying** - Always verify builds work
3. **Document customizations** - Track changes you make
4. **Use version control** - Git commit frequently
5. **Backup working versions** - Before major changes

### **Monitoring Tools**

```javascript
// Add error tracking to production
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to error tracking service
});

// Performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log('Page load time:', loadTime);
});
```

---

## 🔍 Quick Reference

**Most Common Issues:**

1. **[Node.js version compatibility](build-errors.md#nodejs-version-errors)**
2. **[CSS not loading](browser-compatibility.md#css-loading-issues)**  
3. **[Charts not rendering](performance-issues.md#chart-rendering-problems)**
4. **[Build failures](build-errors.md#production-build-failures)**
5. **[Slow performance](performance-issues.md#page-loading-slowly)**

**Can't find your issue?** Use the search function or contact support with detailed information about your problem.