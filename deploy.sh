#!/bin/bash
echo "Building project..."
npm --prefix frontend run build

echo "Deploying to Vercel..."
npx vercel frontend --prod --yes

echo "Deployment complete!"
