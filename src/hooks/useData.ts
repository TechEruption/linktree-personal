import { useState, useEffect } from 'react';
import { supabase, SUPABASE_TABLES } from '../config/supabase';
import type { Profile, Link, SocialLink } from '../types';

// Mock data for demo when Supabase is not configured
const MOCK_PROFILE: Profile = {
  id: 'soumabha-id',
  email: 'soumabha015@gmail.com',
  name: 'Soumabha Mahapatra',
  bio: 'Welcome To My Universe',
  subtitle: 'Software Developer & Tech Enthusiast',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=soumabha',
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
            url: 'https://portfolio.example.com',
            description: 'Check out my work',
            icon: 'briefcase',
            active: true,
            order_index: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            user_id: 'soumabha-id',
            title: 'GitHub',
            url: 'https://github.com',
            description: 'See my code',
            icon: 'code',
            active: true,
            order_index: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            user_id: 'soumabha-id',
            title: 'Blog',
            url: 'https://blog.example.com',
            description: 'Read my articles',
            icon: 'edit',
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
          url: 'https://portfolio.example.com',
          description: 'Check out my work',
          icon: 'briefcase',
          active: true,
          order_index: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'soumabha-id',
          title: 'GitHub',
          url: 'https://github.com',
          description: 'See my code',
          icon: 'code',
          active: true,
          order_index: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          user_id: 'soumabha-id',
          title: 'Blog',
          url: 'https://blog.example.com',
          description: 'Read my articles',
          icon: 'edit',
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
            url: 'https://twitter.com/yourhandle',
            order_index: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            user_id: 'soumabha-id',
            platform: 'linkedin',
            url: 'https://linkedin.com/in/yourprofile',
            order_index: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            user_id: 'soumabha-id',
            platform: 'mail',
            url: 'mailto:soumabha015@gmail.com',
            order_index: 3,
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
          url: 'https://twitter.com/yourhandle',
          order_index: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'soumabha-id',
          platform: 'linkedin',
          url: 'https://linkedin.com/in/yourprofile',
          order_index: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          user_id: 'soumabha-id',
          platform: 'mail',
          url: 'mailto:soumabha015@gmail.com',
          order_index: 3,
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
