// scripts/optimize-images.js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = path.join(__dirname, '../src/assets');
const outputDir = path.join(__dirname, '../public/optimized-images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, width, quality = 75) {
  try {
    await sharp(inputPath)
      .resize(width, null, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality })
      .toFile(outputPath);
    console.log(`Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      const outputPath = fullPath
        .replace(inputDir, outputDir)
        .replace(/\.(jpe?g|png)$/i, '.webp');
      
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }
      
      await optimizeImage(fullPath, outputPath, 1200);
    }
  }
}

processDirectory(inputDir).catch(console.error);