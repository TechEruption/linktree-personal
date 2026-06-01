export interface Profile {
  id: string;
  name: string;
  bio: string;
  subtitle: string;
  avatar_url: string;
  created_at: string;
  updated_at?: string;
}

export interface Link {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  active: boolean;
  order_index: number;
  created_at: string;
  updated_at?: string;
}

export interface SocialLink {
  id: string;
  user_id?: string;
  platform: string;
  url: string;
  icon?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  aud: string;
  user_metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser | null;
  access_token?: string;
  refresh_token?: string;
}
