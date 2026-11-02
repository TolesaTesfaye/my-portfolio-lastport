Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "RENDER CLOUDINARY SETUP - AUTOMATED" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Get your Render API Key" -ForegroundColor Yellow
Write-Host "  1. Go to: https://dashboard.render.com/u/settings#api-keys" -ForegroundColor Gray
Write-Host "  2. Click 'Create API Key' (or use existing)" -ForegroundColor Gray
Write-Host "  3. Copy the key" -ForegroundColor Gray
Write-Host ""

$apiKey = Read-Host "Enter your Render API Key"

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "Error: API Key is required!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Fetching your services..." -ForegroundColor Yellow

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Accept" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "https://api.render.com/v1/services" -Headers $headers -Method Get
    
    Write-Host "Services found:" -ForegroundColor Green
    foreach ($service in $response) {
        if ($service.service) {
            Write-Host "  - $($service.service.name) (ID: $($service.service.id))" -ForegroundColor Gray
        }
    }
    
    # Try to find the portfolio service
    $portfolioService = $response | Where-Object { $_.service.name -like "*portfolio*" -or $_.service.name -like "*tolesa*" } | Select-Object -First 1
    
    if ($portfolioService) {
        $serviceId = $portfolioService.service.id
        Write-Host ""
        Write-Host "Found service: $($portfolioService.service.name)" -ForegroundColor Green
        Write-Host "Service ID: $serviceId" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Could not auto-detect service. Please enter manually." -ForegroundColor Yellow
        $serviceId = Read-Host "Enter your Service ID"
    }
    
} catch {
    Write-Host "Error fetching services: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please enter your Service ID manually." -ForegroundColor Yellow
    Write-Host "Find it at: https://dashboard.render.com/ (in the service URL)" -ForegroundColor Gray
    $serviceId = Read-Host "Enter your Service ID"
}

Write-Host ""
Write-Host "Step 3: Adding CLOUDINARY_URL environment variable..." -ForegroundColor Yellow

$body = @{
    key = "CLOUDINARY_URL"
    value = "cloudinary://234262248445188:5xWw0k-xAOJxdu32RLmHtBDrTGQ@doxnfikws"
} | ConvertTo-Json

$headers["Content-Type"] = "application/json"

try {
    $result = Invoke-RestMethod -Uri "https://api.render.com/v1/services/$serviceId/env-vars" -Headers $headers -Method Post -Body $body
    
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "SUCCESS! CLOUDINARY_URL has been added!" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Render will automatically redeploy your service." -ForegroundColor Cyan
    Write-Host "This takes 2-5 minutes." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Go to: https://dashboard.render.com/" -ForegroundColor Gray
    Write-Host "  2. Click on your service" -ForegroundColor Gray
    Write-Host "  3. Watch the 'Events' tab for deployment" -ForegroundColor Gray
    Write-Host "  4. Wait for 'Deploy live' status" -ForegroundColor Gray
    Write-Host "  5. Try uploading an image again" -ForegroundColor Gray
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Error adding environment variable: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please try adding it manually in the Render dashboard:" -ForegroundColor Yellow
    Write-Host "  1. Go to: https://dashboard.render.com/" -ForegroundColor Gray
    Write-Host "  2. Click your service -> Environment" -ForegroundColor Gray
    Write-Host "  3. Add: CLOUDINARY_URL = cloudinary://234262248445188:5xWw0k-xAOJxdu32RLmHtBDrTGQ@doxnfikws" -ForegroundColor Gray
}

Write-Host ""
Read-Host "Press Enter to exit"
