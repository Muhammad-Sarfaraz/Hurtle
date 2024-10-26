#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Get the app name from the command line
const appName = process.argv[2];

if (!appName) {
    console.error('\x1b[31mPlease specify an app name: create-hurtle <app-name>\x1b[0m');
    process.exit(1);
}

// Define the directory for the new app
const appDirectory = path.join(process.cwd(), appName);

// Check if the directory already exists
if (fs.existsSync(appDirectory)) {
    console.error(`\x1b[31mDirectory ${appName} already exists.\x1b[0m`);
    process.exit(1);
}

// Create the app directory
console.log(`\x1b[32mCreating a new project in ${appName}...\x1b[0m`);
fs.mkdirSync(appDirectory);

// Clone the root directory
const rootDir = path.join(__dirname, '../'); // Adjust this if your script is in a different location

// Function to copy files and directories recursively
const copyRecursive = (src, dest) => {
    // Create destination directory only if it does not exist
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        // Skip the 'bin','art','node_modules' folder
        if (file === 'bin' || file === 'art' || file === 'node_modules') {
            return;
        }

        if (fs.statSync(srcPath).isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
};

// Copy all files from the root directory to the new app directory
copyRecursive(rootDir, appDirectory);

// Simple spinner animation
const spinnerFrames = ['-', '\\', '|', '/'];
let spinnerIndex = 0;
const spinnerInterval = setInterval(() => {
    process.stdout.write(`\r\x1b[33m${spinnerFrames[spinnerIndex]} Installing dependencies...\x1b[0m`);
    spinnerIndex = (spinnerIndex + 1) % spinnerFrames.length;
}, 100);

exec('npm install', { cwd: appDirectory }, (error, stdout, stderr) => {
    clearInterval(spinnerInterval);
    if (error) {
        console.error(`\x1b[31mError during npm install: ${stderr}\x1b[0m`);
        return;
    }
    console.log(`\x1b[32mDependencies installed successfully!\x1b[0m`);
    console.log(`\x1b[32mSuccessfully created ${appName}.\n\x1b[0m`);
    console.log(`\x1b[33mTo get started:\n\x1b[0m`);
    console.log(`\x1b[36m  cd ${appName}\x1b[0m`);
    console.log(`\x1b[36m  npm start\n\x1b[0m`);
    console.log(`\x1b[34mHappy coding!\x1b[0m`);
});
