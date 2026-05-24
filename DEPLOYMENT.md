# Deployment Guide

Complete guide to deploy your Linktree application to production.

## Deployment to Vercel (Recommended)

Vercel is the best platform for deploying Vite apps. It's free, fast, and has excellent integration with Next.js and React.

### Step 1: Push Code to GitHub

1. Create a GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit: Linktree application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/linktree.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click **Sign Up** or **Log In** (you can use GitHub)
3. Click **Add New** > **Project**
4. Click **Import Git Repository**
5. Select your `linktree` repository and click **Import**
6. Configure project:
   - **Framework Preset:** Vite (should auto-detect)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
7. Click **Environment Variables** and add:
   - **Name:** `VITE_SUPABASE_URL`
   - **Value:** Your Supabase project URL
   - Click **Add**
   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon key
   - Click **Add**
8. Click **Deploy**

Your app will be live in minutes! You'll get a URL like: `https://linktree-xyz.vercel.app`

### Step 3: Set Custom Domain (Optional)

1. In Vercel project settings, go to **Domains**
2. Click **Add Domain**
3. Enter your domain and follow the instructions
4. Update DNS records if required

## Deployment to Other Platforms

### Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. Click **Import an existing project**
4. Select your repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Add environment variables under **Site settings** > **Build & deploy** > **Environment**
7. Deploy

### AWS Amplify

1. Go to https://console.aws.amazon.com/amplify
2. Click **Create app**
3. Connect your GitHub repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Save and deploy**

### GitHub Pages

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/linktree/', // your repo name
  plugins: [react()],
})
```

2. Add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

4. Deploy:
```bash
npm run deploy
```

Your site will be at: `https://YOUR_USERNAME.github.io/linktree`

### DigitalOcean App Platform

1. Push code to GitHub
2. Go to https://cloud.digitalocean.com/apps
3. Click **Create App**
4. Connect GitHub repository
5. Select `linktree` branch
6. Vercel auto-detects Vite config
7. Add environment variables
8. Click **Deploy**

## Pre-Deployment Checklist

Before deploying to production:

- [ ] Update `.env.local` with production Supabase keys
- [ ] Test all features locally (`npm run dev`)
- [ ] Run production build (`npm run build`)
- [ ] Preview build (`npm run preview`)
- [ ] Check console for errors and warnings
- [ ] Update profile information and links
- [ ] Test authentication (login/logout)
- [ ] Test link clicks work correctly
- [ ] Test responsive design on mobile
- [ ] Update meta tags in `index.html`
- [ ] Add favicon if desired

## Production Environment Variables

For production, use a DIFFERENT Supabase project or carefully restrict RLS policies:

```
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

## Database Security

For production, implement proper Row Level Security (RLS):

```sql
-- Disable public access by default
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE links DISABLE ROW LEVEL SECURITY;
ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public can only read profiles
CREATE POLICY "Public read profiles"
  ON profiles FOR SELECT
  USING (true);

-- Public can only read active links
CREATE POLICY "Public read active links"
  ON links FOR SELECT
  USING (active = true);

-- Public can only read social links
CREATE POLICY "Public read social links"
  ON social_links FOR SELECT
  USING (true);
```

## Monitoring and Analytics

### Enable Vercel Analytics

1. Go to your Vercel project settings
2. Click **Analytics**
3. Click **Enable Analytics**
4. View real-time data about visitors and performance

### Supabase Monitoring

Monitor database performance:
1. Go to Supabase dashboard
2. Click **Database** > **Replication**
3. View real-time metrics

## Continuous Deployment

All platforms above support automatic deployments:
- Push to GitHub → Automatic build and deploy
- No manual deployment needed
- Rollback previous versions with one click

## Troubleshooting Deployment

### Build fails
- Check build logs for errors
- Run `npm run build` locally to reproduce
- Verify all dependencies are in `package.json`
- Check for missing environment variables

### App doesn't load
- Verify Supabase credentials are correct
- Check browser console for errors
- Verify Supabase project is accessible
- Check CORS settings if needed

### Database not connecting
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check Supabase status page
- Verify project exists and is not paused

### Images/avatars not loading
- Check image URLs are accessible
- Verify Supabase storage bucket is public
- Check bucket name is correct

## Performance Optimization

### Before Production:

1. **Enable Compression:**
   - Vercel does this automatically

2. **Optimize Images:**
   - Use WebP format where possible
   - Compress profile images

3. **Code Splitting:**
   - Vite does this automatically
   - Monitor bundle size with `npm run build`

4. **Cache Strategy:**
   - Set cache headers in `vercel.json`:
```json
{
  "builds": [
    {
      "src": "dist/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html",
      "status": 200
    }
  ]
}
```

## Maintaining Your Site

### Regular Updates
```bash
# Update dependencies
npm update

# Test locally
npm run dev

# Build and test
npm run build && npm run preview

# Push to GitHub (auto-deploys)
git add .
git commit -m "Update dependencies"
git push
```

### Monitoring
- Check Vercel Analytics for traffic
- Monitor Supabase database usage
- Review error logs regularly

### Backups
- Supabase automatically backs up data
- Export important data monthly:
  - Go to Supabase > Settings > Backups

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vite.dev/guide/ssr.html
