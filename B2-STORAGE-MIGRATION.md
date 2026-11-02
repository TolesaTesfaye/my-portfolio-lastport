# B2 Storage Migration Complete

## ✅ What Changed

### All images now served from Backblaze B2 storage
- Removed local `/public` folder dependencies
- Removed legacy project preview hardcoded paths
- All assets are now fetched via API from B2

### New Project Images Gallery Feature
- Each project can have **multiple preview images**
- Admin can upload, view, and delete images
- Images are displayed in a beautiful grid gallery

## 🗄️ Database Changes

**New Table: `project_images`**
```sql
CREATE TABLE project_images (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_key TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

## 🔌 New API Endpoints

1. **GET `/api/projects/:id/images`** - Get all images for a project
2. **POST `/api/projects/:id/images`** - Add new image to project
   ```json
   { "imageKey": "portfolio/image.jpg", "displayOrder": 0 }
   ```
3. **DELETE `/api/projects/:projectId/images/:imageId`** - Delete an image

## 🎨 Admin UI Changes

### Project Editor Now Shows:
1. **Preview Images Gallery** (at the top when editing existing projects)
   - Grid display of all current images
   - Upload button to add more images
   - Delete button (hover over image) to remove images
   
2. **Single Cover Image Field** (still available for main project thumbnail)

### How It Works:
- When you edit a project, the gallery loads automatically
- Click "Add preview image" to upload from B2
- Hover over any image and click "Delete" to remove it
- Images are saved instantly to the database

## 📁 Files Modified

### Backend:
- `backend/src/db/schema.ts` - Added `projectImages` table
- `backend/src/index.ts` - Added project images API endpoints
- `backend/migrations/add-project-images.sql` - Migration script
- `backend/run-migration.ts` - Script to run migration

### Frontend:
- `frontend/src/lib/api.js` - Updated `assetUrl()` to only use B2
- `frontend/src/components/admin/AdminDashboard.jsx` - Added `ImageGalleryField` component

## 🚀 To Complete Setup

Run the migration to create the `project_images` table:

```bash
cd backend
node --import tsx run-migration.ts
```

Then restart your backend:

```bash
npm run dev
```

## 💡 Usage

1. Login to admin: `http://localhost:5173/admin`
2. Go to **Projects**
3. Click **Edit** on any project
4. You'll see "Preview Images Gallery" at the top
5. Click "Add preview image" to upload
6. Hover over images to delete them

## ✨ Benefits

✅ All images now centrally managed in B2  
✅ Multiple preview images per project  
✅ No more hardcoded local paths  
✅ Easy to add/remove images  
✅ Consistent asset delivery via API  
✅ Works in production without deploying public folder
