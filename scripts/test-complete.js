#!/usr/bin/env node

/**
 * 🧪 Comprehensive Testing Script for Lung Disease Diagnosis AI
 * 
 * This script performs automated testing of all major components
 * and provides a comprehensive health check before deployment.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test results tracking
let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  total: 0
};

/**
 * Utility functions
 */
function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, 'green');
  testResults.passed++;
  testResults.total++;
}

function fail(message) {
  log(`❌ ${message}`, 'red');
  testResults.failed++;
  testResults.total++;
}

function warn(message) {
  log(`⚠️  ${message}`, 'yellow');
  testResults.warnings++;
  testResults.total++;
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function header(message) {
  log(`\n${colors.bold}${colors.cyan}🔍 ${message}${colors.reset}`);
}

/**
 * File structure validation
 */
function testFileStructure() {
  header('Testing File Structure');
  
  const requiredFiles = [
    'package.json',
    'next.config.js',
    'tailwind.config.js',
    'README.md',
    'pages/index.js',
    'pages/_app.js',
    'pages/_document.js',
    'pages/api/predict.js',
    'pages/api/health.js',
    'components/Layout.jsx',
    'components/ImageUpload.jsx',
    'components/DiagnosisResult.jsx',
    'components/ui/Button.jsx',
    'components/ui/Card.jsx',
    'components/ui/Loading.jsx',
    'utils/constants.js',
    'utils/validation.js',
    'utils/imageProcessing.js',
    'styles/globals.css'
  ];

  const requiredDirectories = [
    'pages',
    'components',
    'components/ui',
    'utils',
    'styles',
    'public',
    'models'
  ];

  // Check files
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      success(`File exists: ${file}`);
    } else {
      fail(`Missing required file: ${file}`);
    }
  });

  // Check directories
  requiredDirectories.forEach(dir => {
    if (fs.existsSync(dir)) {
      success(`Directory exists: ${dir}`);
    } else {
      fail(`Missing required directory: ${dir}`);
    }
  });
}

/**
 * Package.json validation
 */
function testPackageJson() {
  header('Testing package.json Configuration');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check essential scripts
    const requiredScripts = ['dev', 'build', 'start', 'lint'];
    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        success(`Script exists: ${script}`);
      } else {
        fail(`Missing script: ${script}`);
      }
    });

    // Check essential dependencies
    const requiredDeps = [
      'next', 'react', 'react-dom', 'tailwindcss',
      '@tensorflow/tfjs', 'lucide-react'
    ];
    
    requiredDeps.forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        success(`Dependency exists: ${dep}`);
      } else if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
        success(`Dev dependency exists: ${dep}`);
      } else {
        fail(`Missing dependency: ${dep}`);
      }
    });

    // Check version compatibility
    if (packageJson.dependencies.next) {
      const nextVersion = packageJson.dependencies.next.replace(/[^0-9.]/g, '');
      if (parseFloat(nextVersion) >= 14) {
        success(`Next.js version compatible: ${nextVersion}`);
      } else {
        warn(`Next.js version might be outdated: ${nextVersion}`);
      }
    }

  } catch (error) {
    fail(`Error reading package.json: ${error.message}`);
  }
}

/**
 * Component validation
 */
function testComponents() {
  header('Testing React Components');
  
  const components = [
    'components/Layout.jsx',
    'components/ImageUpload.jsx',
    'components/DiagnosisResult.jsx',
    'components/ui/Button.jsx',
    'components/ui/Card.jsx',
    'components/ui/Loading.jsx'
  ];

  components.forEach(component => {
    try {
      const content = fs.readFileSync(component, 'utf8');
      
      // Basic React component checks
      if (content.includes('import React') || content.includes('from \'react\'')) {
        success(`${component}: React import found`);
      } else {
        warn(`${component}: No React import found`);
      }

      if (content.includes('export default')) {
        success(`${component}: Default export found`);
      } else {
        fail(`${component}: No default export found`);
      }

      // Check for JSX
      if (content.includes('return (') && content.includes('<')) {
        success(`${component}: JSX structure found`);
      } else {
        warn(`${component}: No JSX structure found`);
      }

      // Check for responsive classes
      if (content.includes('sm:') || content.includes('md:') || content.includes('lg:')) {
        success(`${component}: Responsive design classes found`);
      } else {
        warn(`${component}: No responsive design classes found`);
      }

    } catch (error) {
      fail(`${component}: Error reading file - ${error.message}`);
    }
  });
}

/**
 * API routes validation
 */
function testApiRoutes() {
  header('Testing API Routes');
  
  const apiRoutes = [
    'pages/api/health.js',
    'pages/api/predict.js'
  ];

  apiRoutes.forEach(route => {
    try {
      const content = fs.readFileSync(route, 'utf8');
      
      // Check for proper Next.js API structure
      if (content.includes('export default') && content.includes('handler')) {
        success(`${route}: Proper API handler structure`);
      } else {
        fail(`${route}: Missing proper API handler structure`);
      }

      // Check for HTTP method handling
      if (content.includes('req.method')) {
        success(`${route}: HTTP method validation found`);
      } else {
        warn(`${route}: No HTTP method validation found`);
      }

      // Check for error handling
      if (content.includes('try') && content.includes('catch')) {
        success(`${route}: Error handling implemented`);
      } else {
        warn(`${route}: No error handling found`);
      }

      // Check for response status codes
      if (content.includes('res.status(')) {
        success(`${route}: Status codes implemented`);
      } else {
        warn(`${route}: No status codes found`);
      }

    } catch (error) {
      fail(`${route}: Error reading file - ${error.message}`);
    }
  });
}

/**
 * Utility functions validation
 */
function testUtilities() {
  header('Testing Utility Functions');
  
  const utilities = [
    'utils/constants.js',
    'utils/validation.js',
    'utils/imageProcessing.js'
  ];

  utilities.forEach(util => {
    try {
      const content = fs.readFileSync(util, 'utf8');
      
      // Check for exports
      if (content.includes('export')) {
        success(`${util}: Exports found`);
      } else {
        fail(`${util}: No exports found`);
      }

      // Specific checks per utility
      if (util.includes('constants')) {
        if (content.includes('DISEASE_INFO') || content.includes('APP_CONFIG')) {
          success(`${util}: Essential constants defined`);
        } else {
          warn(`${util}: Missing essential constants`);
        }
      }

      if (util.includes('validation')) {
        if (content.includes('validate') && content.includes('file')) {
          success(`${util}: File validation functions found`);
        } else {
          warn(`${util}: Missing validation functions`);
        }
      }

      if (util.includes('imageProcessing')) {
        if (content.includes('process') || content.includes('preprocess')) {
          success(`${util}: Image processing functions found`);
        } else {
          warn(`${util}: Missing image processing functions`);
        }
      }

    } catch (error) {
      fail(`${util}: Error reading file - ${error.message}`);
    }
  });
}

/**
 * Configuration files validation
 */
function testConfiguration() {
  header('Testing Configuration Files');
  
  // Test Next.js config
  try {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8');
    if (nextConfig.includes('module.exports')) {
      success('next.config.js: Proper module export');
    } else {
      warn('next.config.js: No module export found');
    }
  } catch (error) {
    fail(`next.config.js: ${error.message}`);
  }

  // Test Tailwind config
  try {
    const tailwindConfig = fs.readFileSync('tailwind.config.js', 'utf8');
    if (tailwindConfig.includes('content:') || tailwindConfig.includes('purge:')) {
      success('tailwind.config.js: Content paths configured');
    } else {
      warn('tailwind.config.js: No content paths found');
    }
  } catch (error) {
    fail(`tailwind.config.js: ${error.message}`);
  }

  // Test CSS
  try {
    const globalsCss = fs.readFileSync('styles/globals.css', 'utf8');
    if (globalsCss.includes('@tailwind')) {
      success('globals.css: Tailwind directives found');
    } else {
      warn('globals.css: No Tailwind directives found');
    }
  } catch (error) {
    fail(`globals.css: ${error.message}`);
  }
}

/**
 * Security checks
 */
function testSecurity() {
  header('Security Validation');
  
  // Check for hardcoded secrets
  const sensitiveFiles = ['pages', 'components', 'utils'];
  const secretPatterns = [
    /api_key\s*=\s*['"]\w+['"]/, 
    /password\s*=\s*['"]\w+['"]/, 
    /secret\s*=\s*['"]\w+['"]/, 
    /token\s*=\s*['"]\w+['"]/, 
    /ACCESS_KEY/,
    /SECRET_KEY/
  ];

  let secretsFound = false;

  function scanDirectory(dir) {
    try {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          scanDirectory(filePath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
          const content = fs.readFileSync(filePath, 'utf8');
          secretPatterns.forEach(pattern => {
            if (pattern.test(content)) {
              fail(`Potential secret found in ${filePath}`);
              secretsFound = true;
            }
          });
        }
      });
    } catch (error) {
      // Directory might not exist, skip
    }
  }

  sensitiveFiles.forEach(dir => {
    if (fs.existsSync(dir)) {
      scanDirectory(dir);
    }
  });

  if (!secretsFound) {
    success('No hardcoded secrets detected');
  }

  // Check .env.example exists
  if (fs.existsSync('.env.example')) {
    success('.env.example file exists');
  } else {
    warn('No .env.example file found');
  }

  // Check .gitignore
  try {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    if (gitignore.includes('.env')) {
      success('.gitignore: Environment files excluded');
    } else {
      warn('.gitignore: Environment files not excluded');
    }
    if (gitignore.includes('node_modules')) {
      success('.gitignore: node_modules excluded');
    } else {
      warn('.gitignore: node_modules not excluded');
    }
  } catch (error) {
    warn('No .gitignore file found');
  }
}

/**
 * Build test
 */
function testBuild() {
  header('Testing Build Process');
  
  try {
    info('Running npm install...');
    execSync('npm install', { stdio: 'pipe' });
    success('Dependencies installed successfully');
    
    info('Running build...');
    execSync('npm run build', { stdio: 'pipe' });
    success('Build completed successfully');
    
    // Check if .next directory was created
    if (fs.existsSync('.next')) {
      success('Build output directory created');
    } else {
      fail('Build output directory not found');
    }
    
  } catch (error) {
    fail(`Build failed: ${error.message}`);
  }
}

/**
 * Performance and accessibility checks
 */
function testPerformance() {
  header('Performance & Accessibility Checks');
  
  // Check for large files
  const checkFileSize = (filePath, maxSize = 1024 * 1024) => { // 1MB default
    try {
      const stat = fs.statSync(filePath);
      if (stat.size > maxSize) {
        warn(`Large file detected: ${filePath} (${Math.round(stat.size / 1024)}KB)`);
      } else {
        success(`File size OK: ${filePath} (${Math.round(stat.size / 1024)}KB)`);
      }
    } catch (error) {
      // File doesn't exist, skip
    }
  };

  // Check key files
  ['styles/globals.css', 'pages/index.js'].forEach(file => {
    checkFileSize(file);
  });

  // Check for accessibility attributes in components
  const componentFiles = [
    'components/ImageUpload.jsx',
    'components/DiagnosisResult.jsx',
    'components/ui/Button.jsx'
  ];

  componentFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('aria-') || content.includes('role=') || content.includes('alt=')) {
        success(`${file}: Accessibility attributes found`);
      } else {
        warn(`${file}: No accessibility attributes found`);
      }
    } catch (error) {
      // File doesn't exist, skip
    }
  });
}

/**
 * Main test runner
 */
function runTests() {
  log(`\n${colors.bold}${colors.magenta}🧪 Lung Disease AI - Comprehensive Test Suite${colors.reset}\n`);
  
  // Run all tests
  testFileStructure();
  testPackageJson();
  testComponents();
  testApiRoutes();
  testUtilities();
  testConfiguration();
  testSecurity();
  testPerformance();
  
  // Only run build test if other tests pass
  if (testResults.failed === 0) {
    testBuild();
  } else {
    warn('Skipping build test due to previous failures');
  }
  
  // Print summary
  log(`\n${colors.bold}${colors.cyan}📊 Test Results Summary${colors.reset}`);
  log(`${colors.green}✅ Passed: ${testResults.passed}${colors.reset}`);
  log(`${colors.red}❌ Failed: ${testResults.failed}${colors.reset}`);
  log(`${colors.yellow}⚠️  Warnings: ${testResults.warnings}${colors.reset}`);
  log(`${colors.white}📋 Total: ${testResults.total}${colors.reset}`);
  
  // Determine overall status
  if (testResults.failed === 0) {
    if (testResults.warnings === 0) {
      log(`\n${colors.bold}${colors.green}🎉 All tests passed! Ready for deployment.${colors.reset}`);
    } else {
      log(`\n${colors.bold}${colors.yellow}✅ Tests passed with warnings. Review warnings before deployment.${colors.reset}`);
    }
  } else {
    log(`\n${colors.bold}${colors.red}❌ Tests failed. Fix issues before deployment.${colors.reset}`);
    process.exit(1);
  }
}

// Run the tests
runTests();
