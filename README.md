# Tolesa Tesfaye - Portfolio

Modern, full-stack portfolio website showcasing projects, skills, and experience.

## 🚀 Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling  
- **Framer Motion** for animations
- Deployed on **Vercel**

### Backend
- **Hono** web framework
- **Drizzle ORM** with **Neon PostgreSQL**
- **Backblaze B2** for file storage
- Deployed on **Render**

## 📦 Project Structure

```
my-portfolio-lastport/
├── frontend/              # React application
│   ├── src/
│   ├── public/           # Static assets
│   └── package.json
│
├── backend/              # API server
│   ├── src/
│   │   ├── index.ts     # Main API
│   │   ├── server.ts    # Node server
│   │   └── db/          # Database schema
│   ├── .dev.vars        # Local environment variables
│   └── package.json
│
├── render.yaml          # Render deployment config
├── vercel.json          # Vercel deployment config
└── deploy.sh            # Deployment script
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon PostgreSQL database
- Backblaze B2 account (optional, for file uploads)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TolesaTesfaye/my-portfolio-lastport.git
   cd my-portfolio-lastport
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Configure environment variables**

   **Frontend** (`.env.local`):
   ```env
   VITE_API_URL=http://localhost:8787
   ```

   **Backend** (`.dev.vars`):
   ```env
   DATABASE_URL=postgresql://user:password@host/database
   FRONTEND_ORIGIN=http://localhost:5173
   SESSION_SECRET=your-secret-key
   ADMIN_SETUP_TOKEN=your-setup-token
   
   # Optional: B2 Storage
   B2_KEY_ID=your_key_id
   B2_APPLICATION_KEY=your_app_key
   B2_BUCKET_NAME=your_bucket
   B2_ENDPOINT=https://s3.us-east-005.backblazeb2.com
   B2_REGION=us-east-005
   ```

4. **Set up database**
   ```bash
   cd backend
   npm run db:migrate
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   # Backend (terminal 1)
   cd backend
   npm run dev

   # Frontend (terminal 2)
   cd frontend
   npm run dev
   ```

   Open http://localhost:5173 in your browser.

## 📤 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
npx vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Backend (Render)
1. Connect your GitHub repository to Render
2. Add environment variables in Render dashboard
3. Deploy automatically on git push

## 🔑 Admin Access

Create an admin account:

```bash
curl -X POST http://localhost:8787/api/auth/setup \
  -H "Content-Type: application/json" \
  -H "x-setup-token: your-setup-token" \
  -d '{"email":"admin@example.com","password":"your-secure-password"}'
```

Login at: `/admin`

## 📝 Features

- 🎨 Modern, responsive design
- 🌙 Dark mode
- 📱 Mobile-friendly
- 🔐 Admin dashboard for content management
- 📊 Project showcases with screenshots
- 🎓 Education and certificates
- 💼 Work experience timeline
- 📧 Contact form
- 🌐 Multilingual support (English, Amharic)

## 🧪 Testing B2 Storage

```bash
cd backend
node test-b2-upload.js
```

## 🔄 Migrate Images to B2

```bash
cd backend
node migrate-images-to-b2.js
```

## 📚 API Endpoints

### Public
- `GET /api/profile` - Get profile information
- `GET /api/skills` - List skills
- `GET /api/experience` - List work experience
- `GET /api/projects` - List projects
- `GET /api/education` - List education
- `GET /api/certificates` - List certificates
- `GET /api/social-links` - List social media links
- `POST /api/contact` - Submit contact form

### Admin (requires authentication)
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/upload` - Upload file to B2
- `GET /api/files/:key` - Get file from B2
- CRUD operations for all content types

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Tolesa Tesfaye**
- GitHub: [@TolesaTesfaye](https://github.com/TolesaTesfaye)
- Email: tolesatesfay273@gmail.com

## 🙏 Acknowledgments

- Built with modern web technologies
- Deployed on Vercel and Render
- Database hosted on Neon
- Files stored on Backblaze B2
