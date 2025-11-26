import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'

/**
 * Custom Vite plugin to handle @@include() syntax like gulp-file-include
 */
export function vitePluginFileInclude(options = {}) {
  const { prefix = '@@', basepath = '@file', context = {} } = options

  function processTemplate(content, context) {
    // First, replace simple variables
    Object.entries(context).forEach(([key, value]) => {
      const regex = new RegExp(`@@${key}`, 'g')
      content = content.replace(regex, value)
    })

    // Process complex nested conditionals with proper brace matching
    function processComplexConditionals(content) {
      const lines = content.split('\n')
      const result = []
      let i = 0
      
      while (i < lines.length) {
        const line = lines[i]
        
        // Check for @@if statement
        const ifMatch = line.match(/@@if\s*\(\s*([^)]+)\s*\)\s*\{/)
        if (ifMatch) {
          const condition = ifMatch[1].trim()
          
          // Find the closing brace for this conditional
          let braceLevel = 0
          let endIndex = i
          for (let j = i; j < lines.length; j++) {
            const currentLine = lines[j]
            if (currentLine.includes('{')) braceLevel++
            if (currentLine.includes('}')) braceLevel--
            if (braceLevel === 0 && j > i) {
              endIndex = j
              break
            }
          }
          
          // Extract the content between the braces
          const blockContent = lines.slice(i + 1, endIndex).join('\n')
          
          // Evaluate condition
          let shouldInclude = false
          try {
            if (condition.includes('!=')) {
              const [varName, expectedValue] = condition.split('!=').map(s => s.trim().replace(/['"]/g, ''))
              const actualValue = context[varName] || ''
              shouldInclude = actualValue !== expectedValue
            } else if (condition.includes('==')) {
              const [varName, expectedValue] = condition.split('==').map(s => s.trim().replace(/['"]/g, ''))
              const actualValue = context[varName] || ''
              shouldInclude = actualValue === expectedValue
            } else {
              const varName = condition.replace(/['"]/g, '')
              const value = context[varName]
              shouldInclude = value === 'true' || value === true
            }
          } catch (error) {
            console.warn(`Failed to process conditional: ${condition}`, error.message)
            shouldInclude = false
          }
          
          // Add content only if condition is true
          if (shouldInclude) {
            result.push(blockContent)
          }
          
          // Skip to after the closing brace
          i = endIndex + 1
        } else {
          // Regular line, add it to result
          result.push(line)
          i++
        }
      }
      
      return result.join('\n')
    }
    
    // Process complex conditionals
    content = processComplexConditionals(content)
    
    // Clean up any remaining standalone closing braces from unmatched conditionals
    content = content.replace(/^\s*\}\s*$/gm, '')
    
    return content
  }

  function processIncludes(content, filePath, processedFiles = new Set()) {
    // Prevent circular includes
    if (processedFiles.has(filePath)) {
      console.warn(`Circular include detected: ${filePath}`)
      return content
    }
    processedFiles.add(filePath)

    // Regex to match @@include('path', {context}) or @@include('path')
    const includeRegex = new RegExp(
      `${prefix}include\\(['"]([^'"]+)['"](?:,\\s*({[^}]*}))?\\)`,
      'g'
    )

    return content.replace(includeRegex, (match, includePath, contextStr) => {
      try {
        // Parse context if provided
        let includeContext = {}
        if (contextStr) {
          try {
            // More robust context parsing to handle single quotes and hyphenated keys
            let normalizedContext = contextStr
              .replace(/'/g, '"') // Convert single quotes to double quotes
              .replace(/(['"])([\w-]+)\1:/g, '"$2":') // Add quotes around keys, including hyphenated keys
              .replace(/:\s*'([^']*)'/g, ': "$1"') // Fix single quoted values
            includeContext = JSON.parse(normalizedContext)
          } catch (parseError) {
            console.warn(`Failed to parse context for ${includePath}:`, contextStr, parseError.message)
            // Try a simpler fallback - extract key:value pairs manually
            const pairRegex = /['"]?([\w-]+)['"]?\s*:\s*['"]([^'"]*)['"]/g
            let match
            while ((match = pairRegex.exec(contextStr)) !== null) {
              const [, key, value] = match
              includeContext[key] = value
            }
            
            // If that still fails, try to extract key:value pairs without quotes
            if (Object.keys(includeContext).length === 0) {
              const simplePairRegex = /([\w-]+)\s*:\s*['"]?([^'",}]+)['"]?/g
              while ((match = simplePairRegex.exec(contextStr)) !== null) {
                const [, key, value] = match
                includeContext[key] = value.replace(/['"]$/, '').trim()
              }
            }
          }
        }

        // Resolve include path
        let resolvedPath
        if (basepath === '@file') {
          resolvedPath = resolve(dirname(filePath), includePath)
        } else {
          resolvedPath = resolve(basepath, includePath)
        }

        // Read included file
        let includeContent = readFileSync(resolvedPath, 'utf-8')

        // Replace context variables and process conditionals in included content
        const mergedContext = { ...context, ...includeContext }
        includeContent = processTemplate(includeContent, mergedContext)

        // Recursively process includes in the included file
        return processIncludes(includeContent, resolvedPath, processedFiles)
      } catch (error) {
        console.error(`Failed to include file: ${includePath}`, error.message)
        return match // Return original match if include fails
      }
    })
  }

  return {
    name: 'vite-plugin-file-include',
    
    transformIndexHtml: {
      order: 'pre',
      handler(html, viteContext) {
        // Get the file path from context
        const filePath = viteContext.filename
        // Process both includes and template conditionals
        const processedHtml = processIncludes(html, filePath)
        return processTemplate(processedHtml, context)
      }
    },

    // Also handle during development
    load(id) {
      if (id.endsWith('.html')) {
        try {
          const content = readFileSync(id, 'utf-8')
          // Process both includes and template conditionals
          const processedContent = processIncludes(content, id)
          return processTemplate(processedContent, context)
        } catch (error) {
          // If file doesn't exist, let Vite handle it
          return null
        }
      }
    }
  }
}