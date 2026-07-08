import { useState, useEffect } from 'react';
import { supabase, SUPABASE_TABLES } from '../config/supabase';
import type { Profile, Link, SocialLink } from '../types';

// Mock data for demo when Supabase is not configured
const MOCK_PROFILE: Profile = {
  id: 'soumabha-id',
  email: 'soumabha015@gmail.com',
  name: 'Soumabha Mahapatra',
  bio: 'Welcome To My Universe',
  subtitle: 'B.Tech CSE (3rd Year) | Aspiring Technical Product Manager & Data Analyst | C++ • Python • DSA • LeetCode • SQL • Power BI • ETL • Data Science & Machine Learning | SaaS • Blockchain Research',
  avatar_url: '/profile.jpeg',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && !url.includes('your-project') && key && !key.includes('your-anon-key');
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        setProfile(MOCK_PROFILE);
        setError(null);
        return;
      }

      const { data, error } = await supabase
        .from(SUPABASE_TABLES.PROFILES)
        .select('*')
        .single();

      if (error) throw error;
      setProfile(data);
      setError(null);
    } catch (err) {
      // Fall back to mock data on error
      setProfile(MOCK_PROFILE);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refetch: fetchProfile };
}

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        const mockLinks: Link[] = [
          {
            id: '1',
            user_id: 'soumabha-id',
            title: 'My Portfolio',
            url: '#',
            description: '(Coming Soon)',
              icon: 'https://cdn-icons-png.flaticon.com/128/5517/5517030.png',
            active: true,
            order_index: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            user_id: 'soumabha-id',
            title: 'GitHub',
            url: 'https://github.com/TechEruption',
            description: 'See my code',
              icon: 'https://cdn-icons-png.flaticon.com/128/3291/3291695.png',
            active: true,
            order_index: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            user_id: 'soumabha-id',
            title: 'Blog',
            url: 'https://dev.to/techeruption_58',
            description: 'Read my articles',
              icon: 'https://cdn-icons-png.flaticon.com/128/1187/1187595.png',
            active: true,
            order_index: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
        setLinks(mockLinks);
        setError(null);
        return;
      }

      const { data, error } = await supabase
        .from(SUPABASE_TABLES.LINKS)
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
      setError(null);
    } catch (err) {
      // Fall back to mock data on error
      const mockLinks: Link[] = [
        {
          id: '1',
          user_id: 'soumabha-id',
          title: 'My Portfolio',
          url: '#',
          description: '(Coming Soon)',
            icon: 'https://cdn-icons-png.flaticon.com/128/5517/5517030.png',
          active: true,
          order_index: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'soumabha-id',
          title: 'GitHub',
          url: 'https://github.com/TechEruption',
          description: 'See my code',
            icon: 'https://cdn-icons-png.flaticon.com/128/3291/3291695.png',
          active: true,
          order_index: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          user_id: 'soumabha-id',
          title: 'Blog',
          url: 'https://dev.to/techeruption_58',
          description: 'Read my articles',
            icon: 'https://cdn-icons-png.flaticon.com/128/1187/1187595.png',
          active: true,
          order_index: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      setLinks(mockLinks);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { links, loading, error, refetch: fetchLinks };
}

export function useSocialLinks() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      
          if (!isSupabaseConfigured()) {
            const mockSocialLinks: SocialLink[] = [
              {
                id: '1',
                user_id: 'soumabha-id',
                platform: 'twitter',
                url: 'https://x.com/Soumabha2006',
                icon: 'https://cdn-icons-png.flaticon.com/128/14417/14417709.png',
                order_index: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              {
                id: '2',
                user_id: 'soumabha-id',
                platform: 'linkedin',
                url: 'https://www.linkedin.com/in/soumabha-mahapatra',
                icon: 'https://cdn-icons-png.flaticon.com/128/2504/2504923.png',
                order_index: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              {
                id: '3',
                user_id: 'soumabha-id',
                platform: 'mail',
                url: 'mailto:soumabha015@gmail.com',
                icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968534.png',
                order_index: 3,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              {
                id: '4',
                user_id: 'soumabha-id',
                platform: 'instagram',
                url: 'https://www.instagram.com/hii_soumabha/',
                icon: 'https://cdn-icons-png.flaticon.com/128/1409/1409946.png',
                order_index: 4,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ];
            setSocialLinks(mockSocialLinks);
            setError(null);
            return;
          }

      const { data, error } = await supabase
        .from(SUPABASE_TABLES.SOCIAL_LINKS)
        .select('*')
        .order('platform', { ascending: true });

      if (error) throw error;
      setSocialLinks(data || []);
      setError(null);
    } catch (err) {
      // Fall back to mock data on error
      const mockSocialLinks: SocialLink[] = [
        {
          id: '1',
          user_id: 'soumabha-id',
          platform: 'twitter',
          url: 'https://x.com/Soumabha2006',
          icon: 'https://cdn-icons-png.flaticon.com/128/14417/14417709.png',
          order_index: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'soumabha-id',
          platform: 'linkedin',
          url: 'https://www.linkedin.com/in/soumabha-mahapatra',
          icon: 'https://cdn-icons-png.flaticon.com/128/2504/2504923.png',
          order_index: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          user_id: 'soumabha-id',
          platform: 'mail',
          url: 'mailto:soumabha015@gmail.com',
          icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968534.png',
          order_index: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '4',
          user_id: 'soumabha-id',
          platform: 'instagram',
          url: 'https://www.instagram.com/hii_soumabha/',
          icon: 'https://cdn-icons-png.flaticon.com/128/1409/1409946.png',
          order_index: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      setSocialLinks(mockSocialLinks);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { socialLinks, loading, error, refetch: fetchSocialLinks };
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsAuthenticated(!!session?.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, user, loading, logout, checkAuth };
}
