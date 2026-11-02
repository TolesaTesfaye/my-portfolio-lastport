# Production Deployment Guide

## Overview
This guide covers deploying your fully dynamic portfolio (frontend + backend) to production with Backblaze B2 storage.

---

## Prerequisites Checklist

- [ ] Neon PostgreSQL database (production)
- [ ] Backblaze B2 account with bucket configured
- [ ] Vercel account (for frontend)
- [ ] Render/Railway/Fly.io account (for backend) OR Cloudflare Workers

---

## Step 1: Database Migration (Neon PostgreSQL)

### Run Migrations on Production Database

```bash
# Set production database URL
set DATABASE_URL=postgresql://your-production-neon-url

# Run migrations
cd backend
node --import tsx run-all-migrations.ts
```

**Expected Output:**
```
✅ ALL MIGRATIONS COMPLETED SUCCESSFULLY!
📊 Image Galleries Available For:
   • Projects
   • Certificates
   • Skills
   • Experience
   • Education
```

### Verify Tables Created

Login to Neon dashboard and verify these tables exist:
- `project_images`
- `certificate_images`
- `skill_images`
- `experience_images`
- `education_images`

---

## Step 2: Backend Deployment

### Option A: Deploy to Render.com (Recommended)

#### 1. Create New Web Service

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Select the `backend` folder

#### 2. Configure Build Settings

```yaml
Build Command: npm install
Start Command: npm start
```

#### 3. Set Environment Variables

In Render dashboard, add these environment variables:

```bash
# Database
DATABASE_URL=postgresql://your-neon-production-url

# Session Secret (generate new one)
SESSION_SECRET=your-super-secret-random-string-min-32-chars

# Backblaze B2 Storage
B2_ENDPOINT=https://s3.us-west-004.backblazeb2.com
B2_REGION=us-west-004
B2_ACCESS_KEY_ID=your-b2-key-id
B2_SECRET_ACCESS_KEY=your-b2-secret-key
B2_BUCKET_NAME=your-bucket-name

# CORS (your frontend URL)
FRONTEND_URL=https://your-portfolio.vercel.app

# Node Environment
NODE_ENV=production
```

#### 4. Deploy

- Click "Create Web Service"
- Render will automatically build and deploy
- Note your backend URL: `https://your-app.onrender.com`

---

### Option B: Deploy to Railway.app

#### 1. Create New Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

#### 2. Configure

```bash
# Root directory
Root Directory: backend

# Build command (auto-detected)
# Start command (auto-detected)
```

#### 3. Add Environment Variables

Same as Render (see above)

#### 4. Deploy

Railway auto-deploys on push to main branch.

---

### Option C: Cloudflare Workers (Advanced)

Your backend is already compatible with Cloudflare Workers!

```bash
cd backend

# Login to Cloudflare
npx wrangler login

# Create D1 database (if not using Neon)
npx wrangler d1 create portfolio-db

# Update wrangler.toml with your settings
# Deploy
npm run deploy
```

---

## Step 3: Frontend Deployment (Vercel)

### 1. Connect to Vercel

```bash
cd frontend

# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### 2. Configure Environment Variables

In Vercel dashboard or during deployment:

```bash
# Backend API URL (your Render/Railway URL)
VITE_API_URL=https://your-backend.onrender.com

# Optional: Analytics, monitoring, etc.
```

### 3. Build Settings (Auto-detected)

```yaml
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. Deploy to Production

```bash
vercel --prod
```

Your frontend will be live at: `https://your-portfolio.vercel.app`

---

## Step 4: Update CORS Configuration

### In Backend Code

Update `backend/src/index.ts` CORS middleware:

```typescript
app.use("*", cors({
  origin: [
    "https://your-portfolio.vercel.app",
    "https://*.vercel.app", // For preview deployments
  ],
  credentials: true,
}));
```

### Redeploy Backend

After updating CORS, redeploy your backend service.

---

## Step 5: Create Admin Account

### Option 1: Using Bootstrap Script

Your backend has a `bootstrapAdmin()` function that runs on startup. It creates the admin user automatically.

Check your backend logs to see:
```
Admin bootstrapped: admin@example.com
```

### Option 2: Manually via Database

If you need to change credentials, run SQL in Neon:

```sql
-- Update admin email
UPDATE users 
SET email = 'your-production-email@example.com'
WHERE email = 'admin@example.com';

-- Update password (hashed)
-- You'll need to hash it first using your auth system
```

---

## Step 6: Upload Production Content

### 1. Login to Admin Panel

Visit: `https://your-portfolio.vercel.app/admin`

Login with:
- Email: `tolesatesfaye273@gmail.com` (or your updated email)
- Password: `702512@Tol` (or your updated password)

### 2. Upload Content

For each module (Projects, Skills, Certificates, Experience, Education):

1. **Create item** → Fill in details → Save
2. **Add images** → Scroll to "Preview Images" → Click "Add preview image"
3. **Upload** → Select image → Wait for upload
4. **Verify** → Check thumbnail appears with X button
5. **Repeat** for all items

### 3. Verify on Public Site

Visit your portfolio homepage and check:
- [ ] Projects show with carousels
- [ ] Certificates display images
- [ ] Skills show custom images (if uploaded)
- [ ] Experience/Education show images in Journey timeline

---

## Step 7: Security Checklist

### Backend Security

- [x] Use HTTPS only (Render/Railway provide this)
- [x] Set strong `SESSION_SECRET` (32+ characters)
- [x] Enable CORS only for your domain
- [x] Use environment variables (never commit secrets)
- [x] Set `NODE_ENV=production`

### Database Security

- [x] Use connection string with SSL
- [x] Neon provides automatic SSL
- [x] Restrict database access to backend IP (if possible)

### Storage Security

- [x] Backblaze B2 bucket is private
- [x] Use signed URLs with expiration
- [x] Don't expose B2 credentials

### Frontend Security

- [x] Use HTTPS (Vercel provides this)
- [x] No secrets in frontend code
- [x] Use environment variables for API URL

---

## Step 8: Performance Optimization

### Backend

1. **Enable caching** for static assets
2. **Database connection pooling** (already configured with Drizzle)
3. **Compress responses** (add middleware if needed)

```typescript
import { compress } from 'hono/compress'
app.use('*', compress())
```

### Frontend

1. **Image optimization** (already using lazy loading)
2. **Code splitting** (Vite handles this)
3. **Cache API responses**

```javascript
// In api.js, add caching logic
const cache = new Map();
```

### Storage

1. **B2 CDN** (optional) - Use Cloudflare CDN in front of B2
2. **Image resizing** - Consider adding image optimization service

---

## Step 9: Monitoring & Maintenance

### Backend Monitoring

**Render/Railway provide:**
- Automatic health checks
- Log viewing
- Metrics dashboard

**Set up:**
1. Error logging (Sentry, LogRocket)
2. Uptime monitoring (UptimeRobot, Pingdom)
3. Performance monitoring (New Relic, DataDog)

### Database Monitoring

**Neon provides:**
- Connection metrics
- Query performance
- Storage usage

### Backup Strategy

1. **Database**: Neon provides automatic backups
2. **Images**: B2 provides versioning (enable it)
3. **Code**: GitHub serves as backup

---

## Step 10: DNS & Custom Domain (Optional)

### If Using Custom Domain

#### 1. Configure Vercel

```bash
# In Vercel dashboard
Settings → Domains → Add Domain
# Enter: portfolio.yourdomain.com
```

#### 2. Update DNS Records

Add these records at your domain registrar:

```
Type: CNAME
Name: portfolio (or @)
Value: cname.vercel-dns.com
```

#### 3. Update Backend CORS

Add your custom domain to CORS origins:

```typescript
origin: [
  "https://portfolio.yourdomain.com",
  "https://your-portfolio.vercel.app",
],
```

---

## Deployment Commands Summary

### One-Time Setup

```bash
# 1. Run database migrations
set DATABASE_URL=your-production-db-url
cd backend
node --import tsx run-all-migrations.ts

# 2. Deploy backend
cd backend
git push  # (If using Render/Railway with auto-deploy)

# 3. Deploy frontend
cd frontend
vercel --prod
```

### Future Updates

```bash
# Deploy backend changes
git add .
git commit -m "Backend updates"
git push origin main
# Render/Railway auto-deploys

# Deploy frontend changes
git add .
git commit -m "Frontend updates"
git push origin main
# Vercel auto-deploys
```

---

## Environment Variables Reference

### Backend (.env for local, Dashboard for production)

```bash
# Required
DATABASE_URL=postgresql://user:pass@host/db
SESSION_SECRET=your-secret-minimum-32-characters
B2_ENDPOINT=https://s3.us-west-004.backblazeb2.com
B2_REGION=us-west-004
B2_ACCESS_KEY_ID=your-key
B2_SECRET_ACCESS_KEY=your-secret
B2_BUCKET_NAME=your-bucket
FRONTEND_URL=https://your-frontend.vercel.app

# Optional
NODE_ENV=production
PORT=8787
```

### Frontend (.env.local for local, Vercel dashboard for production)

```bash
# Required
VITE_API_URL=https://your-backend.onrender.com

# Optional
VITE_ANALYTICS_ID=your-analytics-id
```

---

## Troubleshooting Production Issues

### Backend Issues

**Problem**: "Cannot connect to database"
```bash
# Check DATABASE_URL is set correctly
# Verify Neon database is active
# Check SSL settings
```

**Problem**: "CORS error"
```bash
# Verify FRONTEND_URL matches your actual frontend URL
# Check CORS origins include your domain
# Ensure credentials: true is set
```

**Problem**: "B2 upload fails"
```bash
# Verify all B2_* environment variables are set
# Check B2 bucket permissions
# Test B2 credentials separately
```

### Frontend Issues

**Problem**: "API calls fail"
```bash
# Check VITE_API_URL is set correctly
# Verify backend is running
# Check browser console for CORS errors
```

**Problem**: "Images don't load"
```bash
# Check B2 signed URLs are generated correctly
# Verify 1-hour expiration isn't causing issues
# Test B2 bucket access
```

---

## Cost Estimates (Monthly)

### Free Tier Options

| Service | Free Tier | Cost After |
|---------|-----------|------------|
| **Neon** | 10 GB storage | $19/month for more |
| **Render** | 750 hours/month | $7/month for always-on |
| **Vercel** | 100 GB bandwidth | $20/month Pro plan |
| **Backblaze B2** | 10 GB storage | $0.005/GB after |
| **Railway** | $5 free credit/month | Pay as you go |

### Recommended Stack (All Free Tier)

- Frontend: Vercel Free
- Backend: Render Free (with sleep on inactivity)
- Database: Neon Free (10 GB)
- Storage: B2 Free (10 GB)

**Total: $0/month** for small portfolios!

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database migrations completed
- [ ] Admin panel accessible
- [ ] Can login to admin
- [ ] Can upload images via admin
- [ ] Images display on public pages
- [ ] All sections working (Projects, Skills, etc.)
- [ ] CORS configured correctly
- [ ] HTTPS enabled (automatic)
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up
- [ ] Backups configured

---

## Quick Deploy Script (Optional)

Create `deploy.sh` in project root:

```bash
#!/bin/bash

echo "🚀 Deploying Portfolio to Production..."

# Backend (if using Railway/Render with Git auto-deploy)
echo "📦 Pushing backend changes..."
git add .
git commit -m "Deploy: $(date)"
git push origin main

# Wait for backend deploy
echo "⏳ Waiting for backend deployment..."
sleep 30

# Frontend
echo "🎨 Deploying frontend..."
cd frontend
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Visit: https://your-portfolio.vercel.app"
```

Make executable: `chmod +x deploy.sh`

Run: `./deploy.sh`

---

## Support Resources

- **Neon Docs**: https://neon.tech/docs
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Backblaze B2 Docs**: https://www.backblaze.com/b2/docs/
- **Hono Docs**: https://hono.dev/

---

## Summary

Your production deployment involves:

1. ✅ Run migrations on production database (Neon)
2. ✅ Deploy backend to Render/Railway with env vars
3. ✅ Deploy frontend to Vercel with backend URL
4. ✅ Update CORS configuration
5. ✅ Login to admin and upload content
6. ✅ Verify everything works
7. ✅ Set up monitoring and backups

**Estimated Time**: 30-60 minutes for first deployment

Once set up, future deployments are automatic via Git push! 🎉
