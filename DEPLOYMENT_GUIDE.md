# GitHub Pages Deployment Guide

## Step-by-Step Setup Instructions

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/TolesaTesfaye/port2
2. Click on **Settings** (top right of the repository)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions` (NOT "Deploy from a branch")
5. Click **Save**

### 2. Check GitHub Actions Workflow

1. Go to the **Actions** tab in your repository
2. You should see a workflow called "Deploy to GitHub Pages"
3. Click on it to see if it's running or has completed
4. If it failed, check the error messages

### 3. Verify the Site URL

After the workflow completes successfully, your site will be available at:
- **https://tolesatesfaye.github.io/port2/**

**Important**: Make sure to include the trailing `/` at the end of the URL!

### 4. Common Issues and Solutions

#### Issue: 404 Error
- **Solution**: Make sure GitHub Pages is set to use "GitHub Actions" as the source, not a branch
- Wait 1-2 minutes after enabling for the first deployment

#### Issue: Blank Page
- **Solution**: Clear your browser cache or try incognito mode
- Check browser console for errors (F12)

#### Issue: Assets Not Loading
- **Solution**: The base path in `vite.config.js` should be `/port2/`

### 5. Manual Workflow Trigger (if needed)

If the workflow didn't run automatically:
1. Go to **Actions** tab
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select "main" branch
5. Click "Run workflow"

### 6. Verify Deployment

After deployment:
1. Check the **Actions** tab - workflow should show a green checkmark
2. Go to repository **Settings** > **Pages**
3. You should see: "Your site is live at https://tolesatesfaye.github.io/port2/"

## Troubleshooting

If the site still doesn't work:
1. Check the Actions tab for error messages
2. Verify the repository is public (not private)
3. Make sure all files are committed and pushed
4. Try accessing the site in an incognito/private window

