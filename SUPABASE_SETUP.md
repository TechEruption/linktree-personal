# Supabase Setup Guide

Complete step-by-step guide to set up Supabase for the Linktree application.

## 1. Create a Supabase Project

1. Go to https://supabase.com
2. Click **Sign Up** and create an account (or sign in)
3. Click **New Project**
4. Choose your organization
5. Enter **Project Name:** `linktree`
6. Set **Database Password:** (save this, you'll need it)
7. Choose **Region:** Select closest to your location
8. Click **Create new project** and wait (2-3 minutes)

## 2. Get Your API Keys

Once your project is created:

1. Click **Settings** in the left sidebar
2. Click **API** in the submenu
3. You'll see:
   - **Project URL** - Copy this
   - **Anon Key** - Copy this (public, safe to expose)
   - **Service Role Key** - Keep this secret!

4. Add these to your `.env.local` file:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 3. Create Database Tables

1. Click **SQL Editor** in the left sidebar
2. Click **New Query** button
3. Paste the following SQL and click **Run**:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create links table
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  icon TEXT,
  active BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. Set Up Storage for Avatars

1. Click **Storage** in the left sidebar
2. Click **Create a new bucket**
3. Name it: `avatars`
4. Toggle **Public bucket** ON
5. Click **Create bucket**

## 5. Create Admin User

1. Click **Authentication** in the left sidebar
2. Click **Users** tab
3. Click **Create new user**
4. Enter:
   - **Email:** your@email.com
   - **Password:** choose a strong password
5. Click **Create user**

Now you can log in to the admin panel with these credentials.

## 6. Add Sample Data (Optional)

To test your setup with sample data:

1. Go to **SQL Editor**
2. Click **New Query**
3. Paste and run this SQL:

```sql
-- Insert sample profile
INSERT INTO profiles (name, bio, subtitle, avatar_url) VALUES
(
  'Soumabha Mahapatra',
  'Aspiring Data Analyst & Product Manager',
  'DSA | Python | Blockchain Research',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
);

-- Insert sample links
INSERT INTO links (title, description, url, icon, active, order_index) VALUES
('LinkedIn', 'Connect with me on LinkedIn', 'https://linkedin.com/in/yourprofile', 'linkedin', true, 0),
('GitHub', 'Check out my projects', 'https://github.com/yourprofile', 'github', true, 1),
('Resume', 'Download my resume', 'https://yoursite.com/resume.pdf', 'file', true, 2),
('Portfolio', 'View my portfolio', 'https://yoursite.com', 'globe', true, 3),
('Medium', 'Read my articles', 'https://medium.com/@yourprofile', 'book', true, 4);

-- Insert sample social links
INSERT INTO social_links (platform, url, icon) VALUES
('LinkedIn', 'https://linkedin.com/in/yourprofile', 'linkedin'),
('GitHub', 'https://github.com/yourprofile', 'github'),
('Twitter', 'https://twitter.com/yourprofile', 'twitter'),
('Email', 'mailto:your@email.com', 'mail'),
('Instagram', 'https://instagram.com/yourprofile', 'instagram');
```

## 7. Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Open `http://localhost:5173`
3. You should see your profile and links on the public page
4. Go to `http://localhost:5173/login`
5. Log in with the email and password you created
6. You should access the admin dashboard

## 8. (Optional) Set Up Row Level Security (RLS)

For production, it's recommended to enable RLS:

1. Go to **Authentication** > **Policies**
2. For each table (profiles, links, social_links):
   - Click on the table name
   - Under **New Policy**, click **Enable RLS**

3. Create public read policies:

```sql
-- For profiles
CREATE POLICY "Allow public read on profiles"
ON profiles FOR SELECT USING (TRUE);

-- For links
CREATE POLICY "Allow public read on links"
ON links FOR SELECT USING (TRUE);

-- For social_links
CREATE POLICY "Allow public read on social_links"
ON social_links FOR SELECT USING (TRUE);
```

## Troubleshooting

### "Invalid credentials" error when logging in
- Make sure you created a user in Authentication > Users
- Double-check your email and password
- Verify your Supabase keys are correct in `.env.local`

### Images not uploading
- Verify the `avatars` bucket exists and is public
- Check that your Supabase storage key is configured correctly
- Ensure the bucket name matches exactly

### Tables not showing data
- Verify all SQL ran without errors in SQL Editor
- Check that you're using the correct Supabase project (wrong URL?)
- Make sure RLS policies allow public read if enabled

### Can't connect to database
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
- Make sure you're online
- Check Supabase status page: https://status.supabase.com

## Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **Database Docs:** https://supabase.com/docs/guides/database
- **Auth Docs:** https://supabase.com/docs/guides/auth
- **Storage Docs:** https://supabase.com/docs/guides/storage
