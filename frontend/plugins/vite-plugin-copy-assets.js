import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { resolve, dirname } from 'path'

/**
 * Custom Vite plugin to copy vendor assets like the Gulp build system
 */
export function vitePluginCopyAssets() {
  
  function copyVendorAssets() {
      const destDir = 'dist/assets'
      
      // Ensure destination directories exist
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true })
      }
      if (!existsSync(`${destDir}/js/plugins`)) {
        mkdirSync(`${destDir}/js/plugins`, { recursive: true })
      }
      if (!existsSync(`${destDir}/css/plugins`)) {
        mkdirSync(`${destDir}/css/plugins`, { recursive: true })
      }

      // Required JavaScript libraries (from Gulp configuration)
      const jsLibs = [
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/@popperjs/core/dist/umd/popper.min.js',
        'node_modules/simplebar/dist/simplebar.min.js',
        'node_modules/clipboard/dist/clipboard.min.js',
        'node_modules/apexcharts/dist/apexcharts.min.js',
        'node_modules/prismjs/prism.js',
        'node_modules/sweetalert2/dist/sweetalert2.all.min.js',
        'node_modules/vanillajs-datepicker/dist/js/datepicker-full.min.js',
        'node_modules/notifier-js/dist/js/notifier.js',
        'node_modules/bootstrap-slider/dist/bootstrap-slider.min.js',
        'node_modules/tiny-slider/dist/min/tiny-slider.js',
        'node_modules/intro.js/minified/intro.min.js',
        'node_modules/vanillatree/vanillatree.min.js',
        'node_modules/flatpickr/dist/flatpickr.min.js',
        'node_modules/choices.js/public/assets/scripts/choices.min.js',
        'node_modules/imask/dist/imask.min.js',
        'node_modules/nouislider/dist/nouislider.min.js',
        'node_modules/wnumb/wNumb.min.js',
        'node_modules/bootstrap-switch-button/dist/bootstrap-switch-button.min.js',
        'node_modules/type-ahead/src/type-ahead.min.js',
        'node_modules/easymde/dist/easymde.min.js',
        'node_modules/quill/dist/quill.js',
        'node_modules/dropzone/dist/dropzone-min.js',
        'node_modules/uppy/dist/uppy.min.js',
        'node_modules/formbouncerjs/dist/bouncer.min.js',
        'node_modules/croppr/dist/croppr.min.js',
        'node_modules/simple-datatables/dist/umd/simple-datatables.js',
        'node_modules/simple-datatables/dist/module.js',
        'node_modules/datatables.net/js/dataTables.min.js',
        'node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js',
        'node_modules/datatables.net-select/js/dataTables.select.min.js',
        'node_modules/datatables.net-autofill-bs5/js/autoFill.bootstrap5.min.js',
        'node_modules/datatables.net-keytable-bs5/js/keyTable.bootstrap5.min.js',
        'node_modules/datatables.net-scroller-bs5/js/scroller.bootstrap5.min.js',
        'node_modules/datatables.net-responsive/js/dataTables.responsive.min.js',
        'node_modules/datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js',
        'node_modules/datatables.net-keytable/js/dataTables.keyTable.min.js',
        'node_modules/datatables.net-colreorder/js/dataTables.colReorder.min.js',
        'node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js',
        'node_modules/datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js',
        'node_modules/datatables.net-autofill/js/dataTables.autoFill.min.js',
        'node_modules/datatables.net-buttons-bs5/js/buttons.bootstrap5.min.js',
        'node_modules/datatables.net-buttons/js/dataTables.buttons.min.js',
        'node_modules/datatables.net-buttons/js/buttons.colVis.min.js',
        'node_modules/datatables.net-buttons/js/buttons.print.min.js',
        'node_modules/datatables.net-buttons/js/buttons.html5.min.js',
        'node_modules/datatables.net-rowreorder/js/dataTables.rowReorder.min.js',
        'node_modules/pdfmake/build/pdfmake.min.js',
        'node_modules/jszip/dist/jszip.min.js',
        'node_modules/pdfmake/build/vfs_fonts.js',
        'node_modules/dragula/dist/dragula.min.js',
        'node_modules/fullcalendar/index.global.min.js',
        'node_modules/wow.js/dist/wow.min.js',
        'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
        'node_modules/fslightbox/index.js',
        'node_modules/jsvectormap/dist/jsvectormap.min.js',
        'node_modules/jsvectormap/dist/maps/world.js',
        'node_modules/jsvectormap/dist/maps/world-merc.js',
        'node_modules/star-rating.js/dist/star-rating.min.js',
        'node_modules/vanilla-wizard/dist/js/wizard.min.js',
        'node_modules/peity-vanilla/dist/peity-vanilla.min.js',
        'node_modules/i18next/i18next.min.js',
        'node_modules/i18next-http-backend/i18nextHttpBackend.min.js',
        'node_modules/swiper/swiper-bundle.js'
      ]

      // Required CSS libraries (from Gulp configuration)
      const cssLibs = [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/animate.css/animate.min.css',
        'node_modules/prismjs/themes/prism-coy.css',
        'node_modules/vanillajs-datepicker/dist/css/datepicker-bs5.min.css',
        'node_modules/notifier-js/dist/css/notifier.css',
        'node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css',
        'node_modules/tiny-slider/dist/tiny-slider.css',
        'node_modules/intro.js/minified/introjs.min.css',
        'node_modules/vanillatree/vanillatree.css',
        'node_modules/flatpickr/dist/flatpickr.min.css',
        'node_modules/nouislider/dist/nouislider.min.css',
        'node_modules/bootstrap-switch-button/css/bootstrap-switch-button.min.css',
        'node_modules/easymde/dist/easymde.min.css',
        'node_modules/quill/dist/quill.core.css',
        'node_modules/quill/dist/quill.snow.css',
        'node_modules/quill/dist/quill.bubble.css',
        'node_modules/@tabler/icons-webfont/dist/tabler-icons.min.css',
        'node_modules/dropzone/dist/dropzone.css',
        'node_modules/uppy/dist/uppy.min.css',
        'node_modules/croppr/dist/croppr.min.css',
        'node_modules/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css',
        'node_modules/datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css',
        'node_modules/datatables.net-colreorder-bs5/css/colReorder.bootstrap5.min.css',
        'node_modules/datatables.net-fixedheader-bs5/css/fixedHeader.bootstrap5.min.css',
        'node_modules/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css',
        'node_modules/datatables.net-scroller-bs5/css/scroller.bootstrap5.min.css',
        'node_modules/datatables.net-keytable-bs5/css/keyTable.bootstrap5.min.css',
        'node_modules/datatables.net-autofill-bs5/css/autoFill.bootstrap5.min.css',
        'node_modules/datatables.net-select-bs5/css/select.bootstrap5.min.css',
        'node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css',
        'node_modules/datatables.net-rowreorder-bs5/css/rowReorder.bootstrap5.min.css',
        'node_modules/dragula/dist/dragula.min.css',
        'node_modules/simple-datatables/dist/style.css',
        'node_modules/jsvectormap/dist/jsvectormap.min.css',
        'node_modules/star-rating.js/dist/star-rating.min.css',
        'node_modules/swiper/swiper-bundle.css'
      ]

      // Copy JS files
      jsLibs.forEach(lib => {
        const fileName = lib.split('/').pop()
        const srcPath = resolve(lib)
        const destPath = resolve(`${destDir}/js/plugins/${fileName}`)
        
        if (existsSync(srcPath)) {
          try {
            copyFileSync(srcPath, destPath)
            console.log(`✓ Copied JS: ${fileName}`)
          } catch (error) {
            console.warn(`⚠ Failed to copy JS ${fileName}:`, error.message)
          }
        } else {
          console.warn(`⚠ JS file not found: ${srcPath}`)
        }
      })

      // Copy CSS files
      cssLibs.forEach(lib => {
        const fileName = lib.split('/').pop()
        const srcPath = resolve(lib)
        const destPath = resolve(`${destDir}/css/plugins/${fileName}`)
        
        if (existsSync(srcPath)) {
          try {
            copyFileSync(srcPath, destPath)
            console.log(`✓ Copied CSS: ${fileName}`)
          } catch (error) {
            console.warn(`⚠ Failed to copy CSS ${fileName}:`, error.message)
          }
        } else {
          console.warn(`⚠ CSS file not found: ${srcPath}`)
        }
      })

      // Copy CKEditor files
      copyCKEditorFiles(destDir)
      
      // Copy other plugin directories
      copyPluginDirectories(destDir)
      
      // Copy font files
      copyFontFiles(destDir)
      
      // Copy source assets
      copySourceAssets(destDir)
    }

    function copyCKEditorFiles(destDir) {
      const ckeditorVersions = {
        classic: 'node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js',
        inline: 'node_modules/@ckeditor/ckeditor5-build-inline/build/ckeditor.js',
        balloon: 'node_modules/@ckeditor/ckeditor5-build-balloon/build/ckeditor.js',
        document: 'node_modules/@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor.js'
      }

      Object.entries(ckeditorVersions).forEach(([type, srcPath]) => {
        const destPath = `${destDir}/js/plugins/ckeditor/${type}`
        if (!existsSync(destPath)) {
          mkdirSync(destPath, { recursive: true })
        }
        
        if (existsSync(srcPath)) {
          try {
            copyFileSync(srcPath, `${destPath}/ckeditor.js`)
            console.log(`✓ Copied CKEditor ${type}`)
          } catch (error) {
            console.warn(`⚠ Failed to copy CKEditor ${type}:`, error.message)
          }
        }
      })
    }

    function copyPluginDirectories(destDir) {
      // Copy TinyMCE
      const tinymceSrc = 'node_modules/tinymce'
      const tinymceDest = `${destDir}/js/plugins/tinymce`
      if (existsSync(tinymceSrc)) {
        copyDirectory(tinymceSrc, tinymceDest)
        console.log(`✓ Copied TinyMCE directory`)
      }

      // Copy Trumbowyg
      const trumbowygSrc = 'node_modules/trumbowyg/dist'
      const trumbowygDest = `${destDir}/js/plugins/trumbowyg`
      if (existsSync(trumbowygSrc)) {
        copyDirectory(trumbowygSrc, trumbowygDest)
        console.log(`✓ Copied Trumbowyg directory`)
      }
    }

    function copyFontFiles(destDir) {
      // Copy Phosphor fonts
      const phosphorSrc = 'node_modules/@phosphor-icons/web/src/regular'
      const phosphorFonts = ['Phosphor.woff2', 'Phosphor.woff', 'Phosphor.ttf', 'Phosphor.svg']
      
      phosphorFonts.forEach(font => {
        const srcPath = resolve(`${phosphorSrc}/${font}`)
        const destPath = resolve(`${destDir}/css/plugins/${font}`)
        
        if (existsSync(srcPath)) {
          try {
            copyFileSync(srcPath, destPath)
            console.log(`✓ Copied Phosphor font: ${font}`)
          } catch (error) {
            console.warn(`⚠ Failed to copy Phosphor font ${font}:`, error.message)
          }
        }
      })

      // Copy Phosphor CSS
      const phosphorCssSrc = resolve(`${phosphorSrc}/style.css`)
      const phosphorCssDest = resolve(`${destDir}/css/plugins/phosphor-icons.css`)
      if (existsSync(phosphorCssSrc)) {
        try {
          copyFileSync(phosphorCssSrc, phosphorCssDest)
          console.log(`✓ Copied Phosphor CSS`)
        } catch (error) {
          console.warn(`⚠ Failed to copy Phosphor CSS:`, error.message)
        }
      }

      // Copy Tabler fonts
      const tablerSrc = 'node_modules/@tabler/icons-webfont/dist/fonts'
      const tablerFonts = ['tabler-icons.woff2', 'tabler-icons.woff', 'tabler-icons.ttf']
      const fontDir = `${destDir}/css/plugins/fonts`
      
      if (!existsSync(fontDir)) {
        mkdirSync(fontDir, { recursive: true })
      }
      
      tablerFonts.forEach(font => {
        const srcPath = resolve(`${tablerSrc}/${font}`)
        const destPath = resolve(`${fontDir}/${font}`)
        
        if (existsSync(srcPath)) {
          try {
            copyFileSync(srcPath, destPath)
            console.log(`✓ Copied Tabler font: ${font}`)
          } catch (error) {
            console.warn(`⚠ Failed to copy Tabler font ${font}:`, error.message)
          }
        }
      })
    }

    function copySourceAssets(destDir) {
      // Copy all assets from src/assets except SCSS and certain files
      const srcAssetsDir = 'src/assets'
      const destAssetsDir = 'dist/assets'
      
      if (existsSync(srcAssetsDir)) {
        copyDirectoryFiltered(srcAssetsDir, destAssetsDir, (path) => {
          // Skip SCSS files as they're processed by Vite
          return !path.includes('/scss/') && !path.endsWith('.scss')
        })
        console.log(`✓ Copied source assets`)
      }
      
      // Explicitly copy critical JS files that are required for theme functionality
      const criticalJsFiles = [
        'src/assets/js/script.js',
        'src/assets/js/theme.js', 
        'src/assets/js/multi-lang.js'
      ]
      
      const jsDestDir = 'dist/assets/js'
      if (!existsSync(jsDestDir)) {
        mkdirSync(jsDestDir, { recursive: true })
      }
      
      criticalJsFiles.forEach(srcPath => {
        const fileName = srcPath.split('/').pop()
        const destPath = resolve(jsDestDir, fileName)
        
        if (existsSync(srcPath)) {
          try {
            copyFileSync(srcPath, destPath)
            console.log(`✓ Copied critical JS: ${fileName}`)
          } catch (error) {
            console.warn(`⚠ Failed to copy critical JS ${fileName}:`, error.message)
          }
        } else {
          console.warn(`⚠ Critical JS file not found: ${srcPath}`)
        }
      })
    }

    function copyDirectory(src, dest) {
      if (!existsSync(dest)) {
        mkdirSync(dest, { recursive: true })
      }
      
      const files = readdirSync(src)
      files.forEach(file => {
        const srcFile = resolve(src, file)
        const destFile = resolve(dest, file)
        const stat = statSync(srcFile)
        
        if (stat.isDirectory()) {
          copyDirectory(srcFile, destFile)
        } else {
          try {
            copyFileSync(srcFile, destFile)
          } catch (error) {
            console.warn(`⚠ Failed to copy ${srcFile}:`, error.message)
          }
        }
      })
    }

    function copyDirectoryFiltered(src, dest, filter) {
      if (!existsSync(dest)) {
        mkdirSync(dest, { recursive: true })
      }
      
      const files = readdirSync(src)
      files.forEach(file => {
        const srcFile = resolve(src, file)
        const destFile = resolve(dest, file)
        const stat = statSync(srcFile)
        
        if (stat.isDirectory()) {
          copyDirectoryFiltered(srcFile, destFile, filter)
        } else if (filter(srcFile)) {
          try {
            copyFileSync(srcFile, destFile)
          } catch (error) {
            console.warn(`⚠ Failed to copy ${srcFile}:`, error.message)
          }
        }
      })
    }

  return {
    name: 'vite-plugin-copy-assets',
    
    generateBundle() {
      // Copy vendor assets during bundle generation (after Vite processes files)
      copyVendorAssets()
    },

    configureServer(server) {
      // Copy assets for development server as well
      copyVendorAssets()
      
      // Watch for changes to critical JS files and re-copy them
      const { watch } = require('chokidar')
      const criticalJsFiles = [
        'src/assets/js/script.js',
        'src/assets/js/theme.js', 
        'src/assets/js/multi-lang.js'
      ]
      
      const watcher = watch(criticalJsFiles, { ignoreInitial: true })
      
      watcher.on('change', (filePath) => {
        const fileName = filePath.split('/').pop()
        const destPath = resolve('dist/assets/js', fileName)
        
        try {
          copyFileSync(filePath, destPath)
          console.log(`🔄 Recopied critical JS: ${fileName}`)
          
          // Trigger HMR for full page reload since these are non-module scripts
          server.ws.send({
            type: 'full-reload'
          })
        } catch (error) {
          console.warn(`⚠ Failed to recopy critical JS ${fileName}:`, error.message)
        }
      })
      
      // Cleanup watcher when server stops
      server.ws.on('close', () => {
        watcher.close()
      })
    }
  }
}