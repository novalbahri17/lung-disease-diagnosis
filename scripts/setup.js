#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🫁 Lung Disease Diagnosis AI - Setup Script');
console.log('===========================================\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error(`❌ Node.js version must be 18 or higher. Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js ${nodeVersion} detected`);

// Check if npm is available
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm ${npmVersion} detected`);
} catch (error) {
  console.error('❌ npm is not available');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Copy environment variables
const envExamplePath = path.join(process.cwd(), '.env.example');
const envLocalPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envLocalPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('\n📝 Setting up environment variables...');
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('✅ Created .env.local from .env.example');
    console.log('ℹ️  Please update .env.local with your configuration');
  } else {
    console.log('⚠️  .env.example not found, skipping environment setup');
  }
} else {
  console.log('\nℹ️  .env.local already exists');
}

// Build the application
console.log('\n🔨 Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Application built successfully');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Success message
console.log('\n🎉 Setup completed successfully!\n');
console.log('📋 Next steps:');
console.log('1. Update .env.local with your configuration');
console.log('2. Start development server: npm run dev');
console.log('3. Open http://localhost:3000 in your browser');
console.log('4. Upload a chest X-ray image to test the diagnosis\n');
console.log('📚 Documentation:');
console.log('- README.md - Project overview and usage');
console.log('- docs/development.md - Development guide');
console.log('- docs/deployment.md - Deployment instructions\n');
console.log('🆘 Need help? Open an issue on GitHub or contact the development team');
