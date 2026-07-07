import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, SUPABASE_TABLES } from '../../config/supabase';
import type { Profile } from '../../types';
import { useToast } from '../common/Toast';
import { Upload } from 'lucide-react';

export function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    subtitle: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from(SUPABASE_TABLES.PROFILES)
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setProfile(data);
        setFormData({
          name: data.name,
          bio: data.bio,
          subtitle: data.subtitle,
        });
        setAvatarPreview(data.avatar_url);
      }
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let avatarUrl = profile?.avatar_url || '';

      // Upload avatar if changed
      if (avatarFile) {
        const fileName = `${Date.now()}-${avatarFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, { upsert: false });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        avatarUrl = data.publicUrl;
      }

      // Update or create profile
      if (profile) {
        const { error } = await supabase
          .from(SUPABASE_TABLES.PROFILES)
          .update({
            name: formData.name,
            bio: formData.bio,
            subtitle: formData.subtitle,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profile.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(SUPABASE_TABLES.PROFILES)
          .insert({
            name: formData.name,
            bio: formData.bio,
            subtitle: formData.subtitle,
            avatar_url: avatarUrl,
          });

        if (error) throw error;
      }

      setAvatarFile(null);
      success('Profile saved successfully!');
      fetchProfile();
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Profile Settings
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Profile Picture
            </label>
            <div className="flex items-end gap-6">
              {/* Preview */}
              <div className="relative">
                <img
                  src={
                    avatarPreview || '/profile.jpg'
                  }
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                />
              </div>

              {/* Upload button */}
              <label className="flex items-center gap-2 px-4 py-2 btn-secondary cursor-pointer">
                <Upload size={18} />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input"
              placeholder="Your name"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Professional Headline
            </label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="input"
              placeholder="e.g., Aspiring Data Analyst & Product Manager"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skills / Subtitle
            </label>
            <textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="input"
              placeholder="e.g., DSA | Python | Blockchain Research"
              rows={3}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" disabled={saving} className="btn-primary w-full">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
