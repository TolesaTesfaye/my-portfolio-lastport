@echo off
echo ============================================================
echo RENDER CLOUDINARY SETUP
echo ============================================================
echo.

echo This script will help you add CLOUDINARY_URL to Render.
echo You need your Render API Key to proceed.
echo.
echo To get your Render API Key:
echo 1. Go to: https://dashboard.render.com/u/settings#api-keys
echo 2. Click "Create API Key"
echo 3. Copy the key
echo.
set /p API_KEY="Enter your Render API Key: "

echo.
echo Fetching your services...
echo.

curl -s -H "Authorization: Bearer %API_KEY%" https://api.render.com/v1/services > services.json

echo.
echo Services fetched. Finding tolesa-portfolio-api...
echo.

:: For now, you'll need to get the service ID manually
set /p SERVICE_ID="Enter your Service ID (find it in services.json or Render dashboard URL): "

echo.
echo Setting CLOUDINARY_URL environment variable...
echo.

curl -X POST "https://api.render.com/v1/services/%SERVICE_ID%/env-vars" ^
  -H "Authorization: Bearer %API_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "{\"key\":\"CLOUDINARY_URL\",\"value\":\"cloudinary://234262248445188:5xWw0k-xAOJxdu32RLmHtBDrTGQ@doxnfikws\"}"

echo.
echo.
echo ============================================================
echo DONE!
echo ============================================================
echo.
echo The environment variable has been added to Render.
echo Render will automatically redeploy your service.
echo Wait 2-5 minutes for deployment to complete.
echo.
echo To verify, check: https://dashboard.render.com/
echo.
pause
