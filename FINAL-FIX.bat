@echo off
echo ============================================
echo   COMPLETE BACKEND RESTART
echo ============================================
echo.

echo Step 1: Killing all Node.js processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Step 2: Clearing caches...
cd /d "%~dp0backend"
if exist "node_modules\.cache" rd /s /q "node_modules\.cache"
if exist "node_modules\.tsx" rd /s /q "node_modules\.tsx"

echo.
echo Step 3: Starting backend...
echo.
start cmd /k "cd /d %~dp0backend && npm run dev"

echo.
echo Step 4: Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Step 5: Testing CORS...
curl -X OPTIONS -H "Origin: http://localhost:5173" http://localhost:8787/api/auth/login

echo.
echo ============================================
echo   DONE! 
echo ============================================
echo.
echo Now do ONE of these:
echo   1. Open Chrome Incognito: Ctrl+Shift+N
echo   2. Or clear browser cache: Ctrl+Shift+Delete
echo.
echo Then go to: http://localhost:5173/admin
echo.
pause
