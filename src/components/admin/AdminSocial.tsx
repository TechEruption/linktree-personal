import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, SUPABASE_TABLES } from '../../config/supabase';
import type { SocialLink } from '../../types';
import { useToast } from '../common/Toast';
import { Trash2, Edit2 } from 'lucide-react';
import { AVAILABLE_ICONS } from '../../utils/icons';

export function AdminSocial() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: '',
  });
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const { data, error } = await supabase
        .from(SUPABASE_TABLES.SOCIAL_LINKS)
        .select('*')
        .order('platform', { ascending: true });

      if (error) throw error;
      setSocialLinks(data || []);
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to fetch social links');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from(SUPABASE_TABLES.SOCIAL_LINKS)
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        success('Social link updated successfully!');
      } else {
        const { error } = await supabase
          .from(SUPABASE_TABLES.SOCIAL_LINKS)
          .insert(formData);

        if (error) throw error;
        success('Social link added successfully!');
      }

      resetForm();
      fetchSocialLinks();
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to save social link');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;

    try {
      const { error } = await supabase
        .from(SUPABASE_TABLES.SOCIAL_LINKS)
        .delete()
        .eq('id', id);

      if (error) throw error;
      success('Social link deleted successfully!');
      fetchSocialLinks();
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to delete social link');
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id);
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      platform: '',
      url: '',
      icon: '',
    });
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
    >
      {/* Form */}
      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {editingId ? 'Edit Social Link' : 'Add Social Link'}
        </h2>

        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Platform *
              </label>
              <input
                type="text"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="input"
                placeholder="e.g., LinkedIn, GitHub, Twitter"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon
              </label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="input"
              >
                <option value="">Auto-detect</option>
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon.charAt(0).toUpperCase() + icon.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL *
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="input"
              placeholder="https://..."
              required
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">
              {editingId ? 'Update Link' : 'Add Link'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Social links list */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Your Social Links ({socialLinks.length})
        </h3>

        {socialLinks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 py-8 text-center">
            No social links yet. Add your first one above!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-dark-border rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border/80 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {link.platform}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                      {link.url}
                    </p>
                    {link.icon && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Icon: {link.icon}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(link)}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
