import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readdirSync, statSync } from 'fs'
import legacy from '@vitejs/plugin-legacy'
import { vitePluginFileInclude } from './plugins/vite-plugin-file-include.js'
import { vitePluginCopyAssets } from './plugins/vite-plugin-copy-assets.js'
import { vitePluginHtmlDevServer } from './plugins/vite-plugin-html-dev-server.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// =======================================================
// ----------- Admindek Theme Configuration (from Gulp) -----------
// =======================================================
const caption_show = 'true' // [ false , true ]
const preset_theme = 'preset-1' // [ preset-1 to preset-10 ]
const dark_layout = 'false' // [ false , true , default ]
const rtl_layout = 'false' // [ false , true ]
const box_container = 'false' // [ false , true ]
const sidebar_theme = 'dark' // [ dark , light ]
const header_theme = '' // [ '',preset-1 to preset-10 ]
const navbar_bg_theme = '' // [ '',preset-1 to preset-10 ]
const logo_theme = '' // [ '',preset-1 to preset-10 ]
const navbar_caption_theme = '' // [ '',preset-1 to preset-10 ]
const navbar_image_theme = '' // [ '',preset-1 to preset-6 ]
const nav_dropdown_icon_theme = '' // [ '',preset-1 to preset-5 ]
const nav_dropdown_link_icon_theme = '' // [ '',preset-1 to preset-6 ]
const version = 'v3.1.0'

const rtltemp = rtl_layout === "true" ? "rtl" : "ltr"
const darklayouttemp = dark_layout === 'true' ? "dark" : "light"

const layout = {
  pc_caption_show: caption_show,
  pc_preset_theme: preset_theme,
  pc_dark_layout: dark_layout,
  pc_rtl_layout: rtl_layout,
  pc_box_container: box_container,
  pc_sidebar_theme: sidebar_theme,
  pc_header_theme: header_theme,
  pc_navbar_bg_theme: navbar_bg_theme,
  pc_logo_theme: logo_theme,
  pc_navbar_caption_theme: navbar_caption_theme,
  pc_navbar_image_theme: navbar_image_theme,
  pc_nav_dropdown_icon_theme: nav_dropdown_icon_theme,
  pc_nav_dropdown_link_icon_theme: nav_dropdown_link_icon_theme,
  pc_theme_version: version,
  bodySetup: `data-pc-preset="${preset_theme}" data-pc-sidebar-caption="${caption_show}" data-pc-direction="${rtltemp}" data-pc-theme="${darklayouttemp}"`
}

// Function to recursively find all HTML files
function getHtmlEntries(dir) {
  const entries = {}
  const files = readdirSync(dir)
  
  for (const file of files) {
    const fullPath = resolve(dir, file)
    const stat = statSync(fullPath)
    
    if (stat.isDirectory()) {
      Object.assign(entries, getHtmlEntries(fullPath))
    } else if (file.endsWith('.html')) {
      // Create entry name based on path relative to src/html
      const relativePath = fullPath.replace(resolve(__dirname, 'src/html/'), '')
      const entryName = relativePath.replace(/\.html$/, '').replace(/\//g, '-')
      entries[entryName] = fullPath
    }
  }
  
  return entries
}

// Function to copy HTML files to correct structure
function createVirtualHtmlEntries() {
  const htmlDir = resolve(__dirname, 'src/html')
  const entries = {}
  
  function traverse(dir, prefix = '') {
    const files = readdirSync(dir)
    
    for (const file of files) {
      const fullPath = resolve(dir, file)
      const stat = statSync(fullPath)
      
      if (stat.isDirectory()) {
        traverse(fullPath, prefix + file + '/')
      } else if (file.endsWith('.html')) {
        const virtualPath = prefix + file
        entries[virtualPath] = fullPath
      }
    }
  }
  
  traverse(htmlDir)
  return entries
}

// Get all HTML files from src/html directory
const htmlEntries = getHtmlEntries(resolve(__dirname, 'src/html'))

// No need for pages array with custom plugin

export default defineConfig({
  // Base public path for deployment in subfolder
  // Set this to your subfolder path when deploying, e.g., '/myapp/'
  // Leave as './' for relative paths that work in any subfolder
  base: './',
  
  // Keep root at project level for direct access to HTML files
  root: '.',
  
  // Configure build output
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        // Main entry point
        main: resolve(__dirname, 'src/main.js'),
        // CSS entry points
        style: resolve(__dirname, 'src/style.js'),
        'style-preset': resolve(__dirname, 'src/style-preset.js'),
        uikit: resolve(__dirname, 'src/uikit.js'),
        landing: resolve(__dirname, 'src/landing.js')
        // No HTML entries - they will be processed by our custom plugin
      },
      preserveEntrySignatures: false,
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            // Generate CSS files with their original names without hash
            if (assetInfo.name.includes('style.')) return 'assets/css/style.css'
            if (assetInfo.name.includes('style-preset.')) return 'assets/css/style-preset.css'
            if (assetInfo.name.includes('uikit.')) return 'assets/css/uikit.css'
            if (assetInfo.name.includes('landing.')) return 'assets/css/landing.css'
            return 'assets/css/[name].[ext]'
          }
          if (assetInfo.name.endsWith('.js')) {
            return 'assets/js/[name].[ext]'
          }
          // Handle fonts and other assets
          if (assetInfo.name.match(/\.(woff|woff2|ttf|eot|svg)$/)) {
            return 'assets/fonts/[name].[ext]'
          }
          if (assetInfo.name.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
            return 'assets/images/[name].[ext]'
          }
          return 'assets/[name].[ext]'
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: (chunkInfo) => {
          // Keep specific JS files without hash for theme functionality
          if (chunkInfo.name === 'script' || chunkInfo.name === 'theme') {
            return 'assets/js/[name].js'
          }
          return 'assets/js/[name].[hash].js'
        }
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: 'localhost',
    // Enable file system serving from project root
    fs: {
      allow: ['.']
    },
    // Configure fallback for SPA-like behavior
    middlewareMode: false,
    // Add custom middleware for routing
    proxy: {},
    // Watch for changes in source files
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  
  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['./node_modules', './src/assets/scss'],
        additionalData: `
          $node-modules-path: './node_modules';
        `,
        // Suppress deprecation warnings for legacy SASS features
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'mixed-decls']
      }
    },
    devSourcemap: false,
    postcss: {
      plugins: []
    }
  },
  
  // Plugins
  plugins: [
    vitePluginFileInclude({
      prefix: '@@',
      basepath: '@file',
      context: layout
    }),
    vitePluginCopyAssets(),
    vitePluginHtmlDevServer({
      context: layout
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // Custom plugin to handle static vs module JavaScript files
    {
      name: 'static-js-files',
      resolveId(id, importer) {
        // Handle ES module files - resolve to src directory for proper processing
        if (id.includes('assets/js/plugins/module.js')) {
          return resolve(__dirname, 'src/assets/js/plugins/module.js')
        }
        
        return null
      }
    },
    // Plugin to serve static assets from dist folder
    {
      name: 'dev-server-assets',
      configureServer(server) {
        // Serve static assets from dist folder
        server.middlewares.use('/assets', async (req, res, next) => {
          const fs = await import('fs')
          const path = await import('path')
          
          try {
            const assetPath = path.resolve(__dirname, 'dist', req.url.replace(/^\//, ''))
            
            if (fs.existsSync(assetPath)) {
              const stat = fs.statSync(assetPath)
              if (stat.isFile()) {
                // Set appropriate content type
                const ext = path.extname(assetPath).toLowerCase()
                const contentTypes = {
                  '.js': 'application/javascript',
                  '.css': 'text/css',
                  '.png': 'image/png',
                  '.jpg': 'image/jpeg',
                  '.jpeg': 'image/jpeg',
                  '.gif': 'image/gif',
                  '.svg': 'image/svg+xml',
                  '.woff': 'font/woff',
                  '.woff2': 'font/woff2',
                  '.ttf': 'font/ttf',
                  '.eot': 'application/vnd.ms-fontobject'
                }
                
                const contentType = contentTypes[ext] || 'application/octet-stream'
                res.setHeader('Content-Type', contentType)
                
                const content = fs.readFileSync(assetPath)
                res.end(content)
                return
              }
            }
          } catch (error) {
            console.error(`Error serving asset ${req.url}:`, error)
          }
          
          next()
        })
      }
    },
    // Plugin to process HTML files during build (like Gulp does)
    {
      name: 'html-processor',
      closeBundle() {
        // Import the processing functions from our file include plugin
        const { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } = require('fs')
        const { dirname: pathDirname } = require('path')
        
        // Import processing functions from our plugin
        const processIncludes = (content, filePath, processedFiles = new Set()) => {
          if (processedFiles.has(filePath)) {
            console.warn(`Circular include detected: ${filePath}`)
            return content
          }
          processedFiles.add(filePath)

          const includeRegex = /@@include\(['"]([^'"]+)['"](?:,\s*({[^}]*}))?\)/g
          
          return content.replace(includeRegex, (match, includePath, contextStr) => {
            try {
              let includeContext = {}
              if (contextStr) {
                try {
                  let normalizedContext = contextStr
                    .replace(/'/g, '"')
                    .replace(/(['"])([\w-]+)\1:/g, '"$2":')
                    .replace(/:\s*'([^']*)'/g, ': "$1"')
                  includeContext = JSON.parse(normalizedContext)
                } catch (parseError) {
                  const pairRegex = /['"]?([\w-]+)['"]?\s*:\s*['"]([^'"]*)['"]/g
                  let match
                  while ((match = pairRegex.exec(contextStr)) !== null) {
                    const [, key, value] = match
                    includeContext[key] = value
                  }
                }
              }

              let resolvedPath = resolve(pathDirname(filePath), includePath)
              let includeContent = readFileSync(resolvedPath, 'utf-8')
              
              const mergedContext = { ...layout, ...includeContext }
              includeContent = processTemplate(includeContent, mergedContext)
              
              return processIncludes(includeContent, resolvedPath, processedFiles)
            } catch (error) {
              console.error(`Failed to include file: ${includePath}`, error.message)
              return match
            }
          })
        }
        
        const processTemplate = (content, context) => {
          // First handle the special @@basePath@@ pattern
          if (context.basePath !== undefined) {
            const basePathRegex = new RegExp(`@@basePath@@`, 'g')
            content = content.replace(basePathRegex, context.basePath)
          }
          
          // Then handle other template variables
          Object.entries(context).forEach(([key, value]) => {
            if (key !== 'basePath') { // Skip basePath as it's already handled
              const regex = new RegExp(`@@${key}`, 'g')
              content = content.replace(regex, value)
            }
          })
          return content
        }
        
        const calculateBasePath = (relativePath) => {
          if (!relativePath) return './' // Root files - use relative path
          const depth = relativePath.split('/').length
          return '../'.repeat(depth)
        }
        
        const srcHtmlPath = resolve(__dirname, 'src/html')
        const distPath = resolve(__dirname, 'dist')
        
        function processHtmlFiles(sourceDir, targetDir, relativePath = '') {
          if (!existsSync(sourceDir)) return
          
          const files = readdirSync(sourceDir)
          
          for (const file of files) {
            const sourcePath = resolve(sourceDir, file)
            const stat = statSync(sourcePath)
            
            if (stat.isDirectory()) {
              const newTargetDir = resolve(targetDir, file)
              const newRelativePath = relativePath ? `${relativePath}/${file}` : file
              mkdirSync(newTargetDir, { recursive: true })
              processHtmlFiles(sourcePath, newTargetDir, newRelativePath)
            } else if (file.endsWith('.html')) {
              try {
                let content = readFileSync(sourcePath, 'utf-8')
                
                // Calculate base path for this file based on its depth
                const basePath = calculateBasePath(relativePath)
                const contextWithBasePath = { ...layout, basePath: basePath }
                
                // Process includes and template variables
                content = processIncludes(content, sourcePath)
                content = processTemplate(content, contextWithBasePath)
                
                // Write processed HTML to dist
                const targetPath = resolve(targetDir, file)
                mkdirSync(pathDirname(targetPath), { recursive: true })
                writeFileSync(targetPath, content, 'utf-8')
                console.log(`✓ Processed HTML: ${relativePath ? relativePath + '/' : ''}${file}`)
              } catch (error) {
                console.error(`✗ Failed to process HTML ${file}:`, error.message)
              }
            }
          }
        }
        
        // Process all HTML files
        processHtmlFiles(srcHtmlPath, distPath)
      }
    }
  ],
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'node_modules')
    }
  },
  
  // Asset handling
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot', '**/*.svg'],
  
  // Public directory for static assets - use dist for dev server since assets are copied there
  publicDir: 'dist',
  
  // Exclude specific files from processing EXCEPT module.js which needs to be processed as ES module
  optimizeDeps: {
    exclude: [
      'assets/js/script.js',
      'assets/js/theme.js',
      'assets/js/multi-lang.js'
    ]
  }
})