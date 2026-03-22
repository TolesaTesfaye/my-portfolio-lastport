#!/bin/bash
echo "Building project..."
npm run build

echo "Deploying to Vercel..."
npx vercel --prod --yes

echo "Deployment complete!"