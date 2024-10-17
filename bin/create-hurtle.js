#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the app name from command-line arguments
const appName = process.argv[2];

// If no name is provided, show an error
if (!appName) {
  console.error("Please provide an app name, e.g., `npm create hurtle my-app`");
  process.exit(1);
}

// Create a new directory for the app
const appDirectory = path.join(process.cwd(), appName);

// Check if the directory already exists
if (fs.existsSync(appDirectory)) {
  console.error(`Directory "${appName}" already exists. Please choose a different name.`);
  process.exit(1);
}

// Create the app directory
fs.mkdirSync(appDirectory, { recursive: true });

// Get the current directory (where your package.json and other files are)
const rootDir = process.cwd();

// Function to copy files from the root directory to the new app directory
const copyFiles = (srcDir, destDir) => {
  const files = fs.readdirSync(srcDir);
  
  files.forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    
    if (fs.statSync(srcFile).isDirectory()) {
      if (file !== 'bin') { // Skip the 'bin' directory
        fs.mkdirSync(destFile); // Create the directory
        copyFiles(srcFile, destFile); // Recursive call for subdirectories
      }
    } else {
      fs.copyFileSync(srcFile, destFile); // Copy the file
    }
  });
};

// Copy all files from the root directory to the new project directory
const filesToCopy = fs.readdirSync(rootDir);

filesToCopy.forEach((file) => {
  const srcFile = path.join(rootDir, file);
  const destFile = path.join(appDirectory, file);

  if (fs.statSync(srcFile).isDirectory()) {
    if (file !== 'bin') { // Skip the 'bin' directory
      fs.mkdirSync(destFile); // Create the directory
      copyFiles(srcFile, destFile); // Recursive call for subdirectories
    }
  } else {
    fs.copyFileSync(srcFile, destFile); // Copy the file
  }
});

console.log(`Successfully created project "${appName}" at ${appDirectory}`);
