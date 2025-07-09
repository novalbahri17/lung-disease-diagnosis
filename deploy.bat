@echo off
echo ================================
echo    DEPLOY OTOMATIS KE VERCEL
echo ================================
echo.

echo [1/4] Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js tidak ditemukan!
    pause
    exit /b 1
)

echo.
echo [2/4] Installing Vercel CLI...
npm install -g vercel

echo.
echo [3/4] Login ke Vercel...
echo Silakan login di browser yang akan terbuka...
vercel login

echo.
echo [4/4] Deploying aplikasi...
echo.
echo Project settings:
echo - Name: ai-diagnosis-paru-paru
echo - Framework: Next.js
echo - Build Command: npm run build
echo - Output Directory: .next
echo.

vercel --prod

echo.
echo ================================
echo       DEPLOYMENT SELESAI!
echo ================================
echo.
echo Cek URL deployment di output di atas
echo atau di dashboard: https://vercel.com/dashboard
echo.
pause
