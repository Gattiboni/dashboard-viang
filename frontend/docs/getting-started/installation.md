# 🚀 Installation

This guide will walk you through setting up Admindek VanillaJS on your local development environment.

## System Requirements

Before you begin, ensure your system meets these requirements:

### Required
- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (comes with Node.js)

### Recommended
- **Git**: For version control and updates
- **VS Code**: With extensions for better development experience

## Quick Installation

### Option 1: Download ZIP (Recommended for beginners)

1. **Download** the Admindek VanillaJS package
2. **Extract** the ZIP file to your desired location
3. **Open terminal** in the extracted folder
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start development server**:
   ```bash
   npm start
   ```
6. **Open your browser** to `http://localhost:3000`

### Option 2: Git Clone (Recommended for developers)

```bash
# Clone the repository
git clone <repository-url>
cd Admindek-VanillaJS

# Install dependencies
npm install

# Start development server
npm start
```

## Verify Installation

After installation, you should see:

1. **Terminal output** indicating successful build:
   ```
   🔄 Starting development server with automatic rebuild...
   ✅ Build completed successfully!
   👀 Watching for changes in src/html/ and src/assets/scss/
   ```

2. **Browser opening** automatically to `http://localhost:3000`
3. **Analytics Dashboard** displaying with sample data and charts

## Project Structure

After installation, your project structure will look like this:

```
Admindek-VanillaJS/
├── src/                    # Source files
│   ├── html/              # HTML templates
│   ├── assets/            # SCSS, JS, images
│   └── entries/           # Entry points
├── dist/                  # Built files (auto-generated)
├── docs/                  # Documentation
├── plugins/               # Custom Vite plugins
├── package.json           # Dependencies and scripts
├── vite.config.js         # Build configuration
└── README.md             # Project information
```

## Development Commands

Once installed, you can use these commands:

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm start` | Build and start preview server | **Daily development** |
| `npm run dev` | Start development watcher | **File watching only** |
| `npm run build` | Build for development | **Testing builds** |
| `npm run build-prod` | Build for production | **Before deployment** |
| `npm run preview` | Preview built files | **Testing builds** |
| `npm run format` | Format code with Prettier | **Code cleanup** |

## Development Workflow

### Standard Development Process

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Open second terminal** for the preview server:
   ```bash
   npm run preview
   ```

3. **Edit files** in the `src/` directory
4. **Watch automatic rebuilds** in the first terminal
5. **Refresh browser** to see changes

### Hot Reload Behavior

⚠️ **Note**: Unlike some development servers, Admindek uses a **preview server** approach:
- Files rebuild automatically when changed
- Browser refresh is required to see changes
- This ensures better production compatibility

## Troubleshooting Installation

### Common Issues

#### Node.js Version Error
```bash
Error: Node.js version 14.x is not supported
```
**Solution**: Upgrade to Node.js 16+ from [nodejs.org](https://nodejs.org)

#### Permission Errors (Windows)
```bash
EACCES: permission denied
```
**Solution**: Run terminal as Administrator or use:
```bash
npm install --no-optional
```

#### Port Already in Use
```bash
Port 3000 is already in use
```
**Solution**: The system will automatically find an available port, or specify one:
```bash
npm run preview -- --port 3001
```

#### Build Errors
```bash
Module not found or build failed
```
**Solution**: 
1. Clear node_modules: `rm -rf node_modules package-lock.json`
2. Reinstall: `npm install`
3. Try again: `npm start`

### Getting Help

If you encounter issues not covered here:

1. Check our [Troubleshooting Guide](../troubleshooting/README.md)
2. Verify your Node.js version: `node --version`
3. Clear browser cache and try again
4. Contact support at dashboardpack@gmail.com

## Next Steps

🎉 **Installation Complete!** Your development environment is ready.

**What's next?**
- [Create Your First Dashboard](first-dashboard.md) - Learn the basics
- [Explore the File Structure](../concepts/architecture/file-structure.md) - Understand the organization
- [Customize the Theme](customizing-theme.md) - Make it yours

---

**Having trouble?** Check our [Common Issues](../troubleshooting/common-issues.md) guide or contact support.