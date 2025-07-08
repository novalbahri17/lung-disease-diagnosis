@echo off
REM Lung Disease Diagnosis AI - Windows Setup Script

echo 🫁 Lung Disease Diagnosis AI - Setup Script
echo ===========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available
    pause
    exit /b 1
)

echo ✅ npm detected:
npm --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Copy environment variables
if not exist .env.local (
    echo 📝 Setting up environment variables...
    copy .env.example .env.local
    echo ✅ Created .env.local from .env.example
    echo ℹ️  Please update .env.local with your configuration
) else (
    echo ℹ️  .env.local already exists
)

REM Build the application
echo 🔨 Building application...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update .env.local with your configuration
echo 2. Start development server: npm run dev
echo 3. Open http://localhost:3000 in your browser
echo 4. Upload a chest X-ray image to test the diagnosis
echo.
echo 📚 Documentation:
echo - README.md - Project overview and usage
echo - docs/development.md - Development guide
echo - docs/deployment.md - Deployment instructions
echo.
echo 🆘 Need help? Open an issue on GitHub or contact the development team

pause
