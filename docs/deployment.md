# Deployment Guide

This guide provides step-by-step instructions for deploying the Lung Disease Diagnosis AI web application to various platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Environment Variables](#environment-variables)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Alternative Deployment Options](#alternative-deployment-options)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 18+ installed
- ✅ Git installed and configured
- ✅ GitHub account
- ✅ Vercel account (free tier available)
- ✅ All dependencies installed (`npm install`)
- ✅ Application tested locally (`npm run dev`)

## GitHub Setup

### 1. Initialize Git Repository

```bash
# Navigate to your project directory
cd lung-disease-diagnosis

# Initialize git repository
git init

# Create .gitignore file
echo "node_modules/
.next/
.env.local
.env
.DS_Store
*.log
dist/
build/
.vercel" > .gitignore
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `lung-disease-diagnosis`
5. Choose "Public" or "Private" based on your preference
6. **Do not** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 3. Connect Local Repository to GitHub

```bash
# Add all files to git
git add .

# Commit your changes
git commit -m "Initial commit: Lung Disease Diagnosis AI application"

# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/lung-disease-diagnosis.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Verify GitHub Upload

1. Go to your GitHub repository
2. Ensure all files are visible
3. Check that `.env.local` is **not** uploaded (it should be in .gitignore)

## Vercel Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up using your GitHub account for seamless integration

2. **Import Project**
   - Click "New Project" on your Vercel dashboard
   - Click "Import" next to your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Project Settings**
   ```
   Project Name: lung-disease-diagnosis
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Add Environment Variables**
   - In the "Environment Variables" section, add:
   ```
   NEXT_PUBLIC_APP_NAME=Lung Disease Diagnosis AI
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 2-3 minutes)
   - You'll get a live URL like: `https://your-app-name.vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from your project directory)
vercel

# Follow the prompts:
# Set up and deploy? [Y/n] y
# Which scope? [Select your team/personal account]
# Link to existing project? [y/N] n
# What's your project's name? lung-disease-diagnosis
# In which directory is your code located? ./
```

## Environment Variables

### Required Environment Variables

Create these in your Vercel project settings:

```env
# Application Configuration
NEXT_PUBLIC_APP_NAME=Lung Disease Diagnosis AI
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api

# Optional: Analytics and Monitoring
NEXT_PUBLIC_GA_ID=your-google-analytics-id
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

### Adding Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add each variable:
   - **Name**: Variable name (e.g., `NEXT_PUBLIC_APP_NAME`)
   - **Value**: Variable value
   - **Environment**: Select "Production", "Preview", and "Development"
5. Click "Save"

### Local Environment Setup

Update your `.env.local` file:

```env
NEXT_PUBLIC_APP_NAME=Lung Disease Diagnosis AI
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Custom Domain Setup

### 1. Purchase Domain (Optional)

You can use services like:
- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [Google Domains](https://domains.google.com)

Example domain ideas:
- `lungdiagnosis.ai`
- `ailung.health`
- `chestxray.ai`

### 2. Add Custom Domain to Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings"
3. Click on "Domains"
4. Click "Add Domain"
5. Enter your domain (e.g., `lungdiagnosis.ai`)
6. Click "Add"

### 3. Configure DNS Settings

**If using external domain provider:**

Add these DNS records in your domain provider's dashboard:

```
Type: A
Name: @ (or leave blank)
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**If using Vercel for DNS:**

1. Change nameservers at your domain provider to:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

### 4. SSL Certificate

Vercel automatically provisions SSL certificates for all domains. You'll see a green checkmark when it's ready (usually within 24 hours).

## Alternative Deployment Options

### 1. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build your project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

### 2. Railway

1. Connect GitHub repository to Railway
2. Deploy with automatic builds
3. Set environment variables in Railway dashboard

### 3. Self-Hosting with PM2

```bash
# Install PM2
npm install -g pm2

# Build project
npm run build

# Start with PM2
pm2 start npm --name "lung-diagnosis" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

## Post-Deployment Checklist

After successful deployment:

- ✅ Test all pages load correctly
- ✅ Test image upload functionality
- ✅ Test API endpoints (`/api/health`, `/api/predict`)
- ✅ Verify responsive design on mobile devices
- ✅ Check console for any errors
- ✅ Test contact form submission
- ✅ Verify environment variables are working
- ✅ Check SSL certificate is active (https://)

## Performance Optimization

### 1. Enable Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `pages/_app.js`:

```javascript
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### 2. Enable Image Optimization

Ensure images use Next.js Image component:

```javascript
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority // for above-the-fold images
/>
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Fails on Vercel

**Error**: "Build failed with exit code 1"

**Solution**:
```bash
# Clear local cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Test build locally
npm run build
```

#### 2. Environment Variables Not Working

**Solution**:
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables
- Check variable names for typos

#### 3. 404 Errors on Deployment

**Solution**:
- Ensure all page files are in the `pages/` directory
- Check file naming conventions (lowercase, no spaces)
- Verify Next.js routing structure

#### 4. API Routes Not Working

**Solution**:
- Ensure API files are in `pages/api/` directory
- Check function exports are correct
- Verify HTTP methods in API handlers

#### 5. Images Not Loading

**Solution**:
- Use relative paths for local images
- Store images in `public/` directory
- Use Next.js Image component for optimization

### Getting Help

If you encounter issues:

1. Check Vercel deployment logs
2. Review GitHub Actions (if using)
3. Check browser console for errors
4. Contact Vercel support
5. Open an issue in the project repository

## Continuous Deployment

Once connected to GitHub, Vercel automatically:

- ✅ Deploys on every push to main branch
- ✅ Creates preview deployments for pull requests
- ✅ Runs builds and tests
- ✅ Updates your live site

To update your deployed app:

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will automatically detect the changes and redeploy your application.

---

**🎉 Congratulations!** Your Lung Disease Diagnosis AI application is now live and accessible to users worldwide.

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Documentation](https://docs.github.com)
