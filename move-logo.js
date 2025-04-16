const fs = require('fs');
const path = require('path');

// Paths
const sourcePath = path.join(__dirname, 'intakecoach.webp');
const destPath = path.join(__dirname, 'public', 'intakecoach.webp');

// Check if the source file exists
if (!fs.existsSync(sourcePath)) {
  console.error('Source file not found:', sourcePath);
  process.exit(1);
}

// Create the public directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'));
  console.log('Created public directory');
}

// Copy the file
try {
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Successfully copied logo to ${destPath}`);
  console.log('You can now safely delete the original file in the root directory if desired.');
} catch (err) {
  console.error('Error copying file:', err);
  process.exit(1);
} 