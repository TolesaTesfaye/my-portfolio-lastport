# Tolesa Tesfaye - Dynamic Portfolio

A modern, interactive, and professional portfolio website built with React and Tailwind CSS.

The repository includes a Hono API in `backend/`. The Vite frontend uses its original static data until `VITE_API_URL` is configured.

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

1. Install dependencies:
```bash
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

Copy `.env.example` to `.env.local` and set `VITE_API_URL` to the deployed Deno API URL. Without this variable, the public site uses its existing local content and the contact form keeps its Formspree fallback.

## Vercel + Deno Deploy + Neon

The production stack is Vercel for the Vite frontend, Deno Deploy for the Hono API, and Neon PostgreSQL for persistence. Neon CLI creates the root `.env.local` with `DATABASE_URL`; backend scripts load that file automatically during local development.

From the repository root:

```bash
neon deploy
```

From `backend/`, create the schema and seed the existing portfolio data:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Set `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_SETUP_TOKEN`, and `FRONTEND_ORIGIN` in Deno Deploy. Set `VITE_API_URL` in Vercel to the Deno Deploy URL. `FRONTEND_ORIGIN` must be the exact Vercel origin, without a trailing slash; multiple origins may be comma-separated for previews. File uploads are intentionally disabled until an object-storage provider is configured; the existing static portfolio assets remain available from the frontend.

The Deno Deploy settings are:

```text
App directory: backend
Build command: deno task build
Entry point: src/deno.ts
```

The request flow is:

```text
Vercel browser app
  -> VITE_API_URL
  -> Deno Deploy Hono API
  -> DATABASE_URL
  -> Neon PostgreSQL
```

### API surface

Public GET endpoints exist for profile, skills, experience, projects, education, certificates, and social links. Contact creation is public. All POST, PUT, and DELETE content operations, message reads/deletes, uploads, and profile updates require the admin cookie. Authentication is available at `/api/auth/login`, `/api/auth/logout`, and `/api/auth/me`.

## Admin Dashboard

Open `/admin` on the Vercel site after configuring the API. The dashboard is isolated from the public navigation and provides login plus CRUD screens for skills, experience, projects, education, certificates, and social links. The backend API also exposes profile and contact-message management endpoints for extending the dashboard modules.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Customization

To customize the portfolio with your own information:

1. Update personal information in each component
2. Add your projects in `Projects.jsx`
3. Update skills in `Skills.jsx`
4. Modify contact information in `Contact.jsx`
5. Add your social media links in `Hero.jsx` and `Contact.jsx`

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
npm run build
# Then push the dist folder to gh-pages branch or use GitHub Actions
```

## License

This project is open source and available under the MIT License.
