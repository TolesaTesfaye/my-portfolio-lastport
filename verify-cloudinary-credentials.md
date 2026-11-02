# Verify Your Cloudinary Credentials

## Current Error
```
Invalid Signature b8ccc3053f713088e5fd9caf228cae03dcbe43e6
```

This means the **API Secret is incorrect** in your Render environment.

## Fix: Get Fresh Credentials from Cloudinary

### Step 1: Get Your Actual Credentials

1. Go to: **https://console.cloudinary.com/**
2. Log in to your account
3. Go to **Dashboard** (or **Programmable Media** → **Dashboard**)
4. You'll see your credentials:
   - **Cloud Name**: `doxnfikws` (this is correct)
   - **API Key**: `234262248445188` (this is correct)
   - **API Secret**: `???` ← **CHECK THIS ONE**

### Step 2: Compare with What You Gave Me

You told me the API Secret is: `5xWw0k-xAOJxdu32RLmHtBDrTGQ`

**Is this exactly what you see in the Cloudinary dashboard?**

- If different → Use the one from the dashboard
- If same → There might be URL encoding issues

### Step 3: Update Render with Correct Credentials

Once you have the **correct API Secret** from Cloudinary dashboard:

#### Option A: Update via Render Dashboard
1. Go to: https://dashboard.render.com/
2. Click your service: `tolesa-portfolio-api`
3. Go to: **Environment**
4. Find: `CLOUDINARY_URL`
5. Click **Edit**
6. Update to: `cloudinary://234262248445188:YOUR_CORRECT_API_SECRET@doxnfikws`
7. Save

#### Option B: Update via Command (PowerShell)

```powershell
# Replace YOUR_API_KEY and YOUR_SERVICE_ID
$headers = @{
    Authorization = "Bearer YOUR_RENDER_API_KEY"
    "Content-Type" = "application/json"
}

$body = @{
    key = "CLOUDINARY_URL"
    value = "cloudinary://234262248445188:YOUR_CORRECT_API_SECRET@doxnfikws"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.render.com/v1/services/YOUR_SERVICE_ID/env-vars/CLOUDINARY_URL" `
    -Headers $headers -Method Patch -Body $body
```

## Common Issues

### Issue 1: API Secret has special characters
If your API secret contains special characters like `@`, `#`, `&`, etc., they might need URL encoding:
- `@` becomes `%40`
- `#` becomes `%23`
- `&` becomes `%26`
- etc.

### Issue 2: Wrong API Secret entirely
Go to Cloudinary dashboard and **regenerate** your API Secret:
1. Go to Settings → Security
2. Click "Regenerate" next to API Secret
3. Copy the NEW secret
4. Update Render environment variable

### Issue 3: Using wrong Cloudinary account
Make sure you're logged into the correct Cloudinary account that has cloud name: `doxnfikws`

## Test the Credentials

After getting the correct API Secret from the dashboard, test it locally first:

```bash
cd backend
node test-cloudinary-upload.js
```

If it works locally, update Render with the same credentials.

## What to Do Next

1. ✅ Go to Cloudinary dashboard
2. ✅ Copy the EXACT API Secret (use copy button, don't type it)
3. ✅ Update this in Render environment variable
4. ✅ Wait for Render to redeploy (2-5 minutes)
5. ✅ Test upload again

**The signature error means authentication is failing because the API Secret doesn't match what Cloudinary expects.**
