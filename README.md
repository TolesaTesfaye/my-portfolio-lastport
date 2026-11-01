# Tolesa Tesfaye - Dynamic Portfolio

A modern, interactive, and professional portfolio website built with React and Tailwind CSS.

The repository is split into a Vite frontend in `frontend/` and a Hono API in `backend/`. The frontend uses its original static data until `VITE_API_URL` is configured.

## Features

- 🎨 Modern and beautiful UI/UX design
- 📱 Fully responsive for all devices
- ⚡ Smooth animations and transitions
- 🎯 Interactive components with Framer Motion
- 🌈 Gradient effects and glassmorphism
- 📧 Contact form
- 🚀 Fast and optimized performance

## Technologies Used

- React 18
- Tailwind CSS
- Framer Motion (for animations)
- React Icons
- Vite (build tool)

## Getting Started

### Installation

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

### Frontend API configuration

Copy `frontend/.env.example` to `frontend/.env.local` and set `VITE_API_URL` to the deployed Render API URL. Without this variable, the public site uses its existing local content and the contact form keeps its Formspree fallback.

## Vercel + Render + Neon

The production stack is Vercel for the Vite frontend, Render for the Hono API, and Neon PostgreSQL for persistence. Neon CLI creates the root `.env.local` with `DATABASE_URL`; backend scripts load that file automatically during local development.

From the repository root, provision the Neon project:

```bash
neon deploy
```

From `backend/`, install dependencies, create the schema, and seed the existing portfolio data:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### Deploy the API to Render

The root [`render.yaml`](./render.yaml) is a Render Blueprint for the backend. In Render, select **New > Blueprint**, connect this repository, and apply the Blueprint. Set these environment variables when prompted:

- `DATABASE_URL`: your Neon PostgreSQL connection string
- `FRONTEND_ORIGIN`: the exact Vercel origin, without a trailing slash; multiple origins may be comma-separated for previews
- `SESSION_SECRET` and `ADMIN_SETUP_TOKEN`: keep the generated values
- `ADMIN_EMAIL`: email for the first administrator
- `ADMIN_PASSWORD`: password for the first administrator; use at least 12 characters

Render runs `npm run db:migrate` before each deploy and checks `/api/health`. After the first deploy, seed the database once from the Render Shell:

```bash
npm run db:seed
```

Set `VITE_API_URL` in Vercel to the deployed Render URL. File uploads are intentionally disabled until an object-storage provider is configured; the existing static portfolio assets remain available from the frontend.

The Render settings are:

```text
Root directory: backend
Build command: npm ci && npm run typecheck
Pre-deploy command: npm run db:migrate
Start command: npm start
Health check path: /api/health
```

The request flow is:

```text
Vercel browser app
  -> VITE_API_URL
  -> Render Hono API
  -> DATABASE_URL
  -> Neon PostgreSQL
```

### API surface

Public GET endpoints exist for profile, skills, experience, projects, education, certificates, and social links. Contact creation is public. All POST, PUT, and DELETE content operations, message reads/deletes, uploads, and profile updates require the admin cookie. Authentication is available at `/api/auth/login`, `/api/auth/logout`, and `/api/auth/me`.

## Admin Dashboard

Open `/admin` on the Vercel site after configuring the API. The dashboard is isolated from the public navigation and provides login plus CRUD screens for skills, experience, projects, education, certificates, and social links. The backend API also exposes profile and contact-message management endpoints for extending the dashboard modules.

## Project Structure

```
frontend/
├── public/
├── src/
├── index.html
├── package.json
└── vite.config.js

backend/
├── src/
├── package.json
└── drizzle.config.ts
```

## Customization

To customize the portfolio with your own information:

1. Update personal information in `frontend/src/components`
2. Add your projects in `frontend/src/components/Projects.jsx`
3. Update skills in `frontend/src/components/Skills.jsx`
4. Modify contact information in `frontend/src/components/Contact.jsx`
5. Add your social media links in `frontend/src/components/Hero.jsx` and `frontend/src/components/Contact.jsx`

## Deployment

This portfolio is deployed on GitHub Pages using GitHub Actions.

### Live Site
🌐 **Live Portfolio**: https://tolesatesfaye.github.io/port2/

### Deployment Process
1. Push changes to the `main` branch
2. GitHub Actions automatically builds and deploys the site
3. The site is updated within a few minutes

### Manual Deployment
If you need to deploy manually:
```bash
npm --prefix frontend run build
# Then push the dist folder to gh-pages branch or use GitHub Actions
```

## License

This project is open source and available under the MIT License.
