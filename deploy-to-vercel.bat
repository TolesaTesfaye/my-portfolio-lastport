@echo off
echo ========================================
echo   Deploying to Vercel Production
echo ========================================
echo.

cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo Step 1: Checking Vercel CLI...
vercel --version
echo.

echo Step 2: Checking login status...
vercel whoami
echo.

echo Step 3: Starting production deployment...
echo This will deploy your LOCAL version (which is correct)
echo.
vercel --prod
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Check your deployment at:
echo https://my-portfolio-lastport.vercel.app
echo.
echo Press any key to exit...
pause >nul
