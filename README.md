# Tolesa Tesfaye - Portfolio Website

A modern, interactive, and professional portfolio website built with React and Tailwind CSS.

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

