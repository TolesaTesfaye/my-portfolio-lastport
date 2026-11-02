@echo off
echo Stopping any existing backend processes...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq *tsx*" 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Starting backend server...
cd /d "%~dp0"
npm run dev
