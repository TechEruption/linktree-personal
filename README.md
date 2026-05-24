# Linktree - Modern Personal Links Platform

A premium, modern Linktree-style web application built with React, TypeScript, Tailwind CSS, and Supabase. Perfect for sharing all your important links in one beautiful place.

## 🌟 Features

### Public Page
- 🎨 Modern, minimalist UI with glassmorphic design
- 👤 Beautiful profile card with avatar, name, bio, and skills
- 🔗 Dynamic link buttons with hover animations
- 🌐 Social media icons with glow effects
- 🕐 Live wall clock with glassmorphism design
- ✨ Smooth Framer Motion animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌓 Dark/Light mode toggle

### Admin Dashboard
- 🔐 Secure authentication with Supabase
- 👤 Profile management (name, bio, avatar)
- 🔗 Add, edit, delete, and reorder links
- 🌐 Manage social media icons
- 📊 Real-time data sync
- 🎨 Modern sidebar navigation
- 💾 Auto-save functionality
- 📱 Responsive admin interface

### Technical Features
- ⚡ Built with Vite (super fast)
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🎬 Framer Motion for animations
- 🔐 Supabase Auth & Database
- 🗂️ Clean, scalable architecture
- 📦 Reusable components
- 🔄 Real-time updates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free)

### Installation

1. **Navigate to project:**
```bash
cd linktree
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Supabase:**
   - Create a new Supabase project at https://supabase.com
   - Get your Project URL and Anon Key from settings
   - Create the database tables (see Supabase Setup section below)

4. **Configure environment variables:**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. **Start development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🗄️ Database Setup

### Supabase Setup Guide

1. **Go to SQL Editor** in your Supabase dashboard
2. **Run the following SQL** to create tables:

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

3. **Create Storage Bucket:**
   - Go to Storage section in Supabase
   - Create a new bucket called `avatars`
   - Make it public (for avatar images)

4. **Create Admin User:**
   - Go to Authentication > Users
   - Click "Create new user"
   - Add email and password for admin login

### Sample Data (Optional)

Insert test data into your database:

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
('LinkedIn', 'Connect with me', 'https://linkedin.com', 'linkedin', true, 0),
('GitHub', 'View my projects', 'https://github.com', 'github', true, 1),
('Resume', 'Download my resume', 'https://example.com/resume.pdf', 'file', true, 2);

-- Insert sample social links
INSERT INTO social_links (platform, url, icon) VALUES
('LinkedIn', 'https://linkedin.com', 'linkedin'),
('GitHub', 'https://github.com', 'github'),
('Twitter', 'https://twitter.com', 'twitter');
```

## 📁 Project Structure

```
linktree/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard components
│   │   ├── public/         # Public page components
│   │   ├── common/         # Shared components
│   │   └── clock/          # Wall clock component
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # React Context providers
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   ├── config/             # Configuration
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies
```

## 🎨 Customization

### Colors & Theme
Edit `tailwind.config.js` to customize colors and extend the design.

### Icons
Available icons: `linkedin`, `github`, `mail`, `twitter`, `instagram`, `globe`, `file`, `code`, `briefcase`, `book`, `chart`, `link`, `zap`, `heart`, `message`, `share`, `download`, `external`

## 🔐 Authentication

Uses Supabase Email/Password authentication:
- **Login:** Email and password
- **Protected Routes:** Admin page requires authentication
- **Session Management:** Automatic via Supabase
- **Logout:** Clears session and redirects home

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com and click "Import Project"
3. Select your GitHub repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Other Platforms
Can be deployed to: Netlify, AWS Amplify, Firebase Hosting, DigitalOcean, etc.

Build command: `npm run build`

## 📦 Build & Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and PRs.

## 📄 License

MIT License

## 🙏 Credits

Built with React, Vite, Tailwind CSS, Framer Motion, and Supabase
