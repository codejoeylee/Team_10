# Vercel Deployment Guide

## Setup Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import your GitHub repository
4. **IMPORTANT**: Set **Root Directory** to `handcrafted-haven`
5. Click **Deploy**

### 3. Add Postgres Database

1. Go to your project dashboard
2. Click **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Click **Create**
6. Vercel automatically adds environment variables

### 4. Initialize Database Schema

1. Go to **Storage** → Your Postgres database
2. Click **Data** tab
3. Click **Query**
4. Copy and paste the contents of `lib/schema.sql`
5. Click **Run Query**

### 5. Add JWT Secret

1. Go to **Settings** → **Environment Variables**
2. Add new variable:
   - Name: `JWT_SECRET`
   - Value: Generate a secure random string (e.g., use https://randomkeygen.com/)
3. Click **Save**
4. Redeploy your app

## Troubleshooting

### "No Next.js version detected"
- Make sure **Root Directory** is set to `handcrafted-haven` in project settings
- Go to Settings → General → Root Directory

### Database connection issues
- Verify environment variables are set in Settings → Environment Variables
- Check that `POSTGRES_URL` exists
- Redeploy after adding variables

## Local Development with Vercel Postgres

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
cd handcrafted-haven
vercel link

# Pull environment variables
vercel env pull .env.local

# Run dev server
pnpm dev
```

Your app will now connect to the Vercel Postgres database locally!
