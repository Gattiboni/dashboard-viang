#!/usr/bin/env node

/**
 * Clean up duplicate folders and files that may be created during development
 * This prevents the accumulation of " 2", " 3" folders in dist
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up duplicate folders and files...\n');

// Function to find and remove duplicate folders
function cleanDuplicateFolders(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const items = fs.readdirSync(dir);
  const duplicates = [];
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Check if this is a duplicate folder (ends with " 2", " 3", etc.)
      if (/\s+\d+$/.test(item)) {
        duplicates.push(fullPath);
      }
    }
  });
  
  // Remove duplicate folders
  duplicates.forEach(dupPath => {
    try {
      fs.rmSync(dupPath, { recursive: true, force: true });
      console.log(`✅ Removed duplicate folder: ${dupPath}`);
    } catch (error) {
      console.warn(`⚠️  Could not remove ${dupPath}: ${error.message}`);
    }
  });
  
  return duplicates.length;
}

// Function to clean up extra avatar files (keep only 1-10)
function cleanExtraAvatars(dir) {
  if (!fs.existsSync(dir)) {
    return 0;
  }

  const files = fs.readdirSync(dir);
  const avatarFiles = files.filter(file => file.startsWith('avatar-') && file.endsWith('.svg'));
  let removed = 0;
  
  avatarFiles.forEach(file => {
    const match = file.match(/avatar-(\d+)\.svg/);
    if (match) {
      const number = parseInt(match[1]);
      if (number > 10) {
        try {
          fs.unlinkSync(path.join(dir, file));
          console.log(`✅ Removed extra avatar: ${file}`);
          removed++;
        } catch (error) {
          console.warn(`⚠️  Could not remove ${file}: ${error.message}`);
        }
      }
    }
  });
  
  return removed;
}

// Clean dist folder
console.log('📁 Cleaning dist folder...');
const distDuplicates = cleanDuplicateFolders('./dist');

// Clean source avatar folders
console.log('\n🖼️  Cleaning extra avatar files...');
const srcAvatarsRemoved = cleanExtraAvatars('./src/assets/images/user');
const distAvatarsRemoved = cleanExtraAvatars('./dist/assets/images/user');

// Clean any other common duplicate patterns
console.log('\n🔍 Checking for other duplicates...');

// Function to clean files with duplicate patterns
function cleanDuplicateFiles(dir, pattern) {
  if (!fs.existsSync(dir)) {
    return 0;
  }

  const files = fs.readdirSync(dir);
  let removed = 0;
  
  files.forEach(file => {
    if (pattern.test(file)) {
      try {
        const fullPath = path.join(dir, file);
        fs.unlinkSync(fullPath);
        console.log(`✅ Removed duplicate file: ${file}`);
        removed++;
      } catch (error) {
        console.warn(`⚠️  Could not remove ${file}: ${error.message}`);
      }
    }
  });
  
  return removed;
}

// Clean files that might have " copy" or similar patterns
const copyPattern = /.*\s+(copy|Copy|\d+)\.(html|css|js|scss)$/;
const tempDuplicates = cleanDuplicateFiles('./dist', copyPattern);

console.log('\n📊 Cleanup Summary:');
console.log(`🗑️  Removed ${distDuplicates} duplicate folders`);
console.log(`🖼️  Removed ${srcAvatarsRemoved + distAvatarsRemoved} extra avatar files`);
console.log(`📄 Removed ${tempDuplicates} duplicate files`);

if (distDuplicates + srcAvatarsRemoved + distAvatarsRemoved + tempDuplicates === 0) {
  console.log('✨ No duplicates found - your project is clean!');
} else {
  console.log('\n✨ Cleanup completed successfully!');
}

console.log('\n💡 To prevent duplicates, avoid:');
console.log('   - Copying folders manually in Finder/Explorer');
console.log('   - Running build scripts while files are open');
console.log('   - Having multiple instances of npm run dev running');