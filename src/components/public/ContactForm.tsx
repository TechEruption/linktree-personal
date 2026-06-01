import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Using FormSubmit.co as a free email service
      const response = await fetch('https://formspree.io/f/xyzgvqnq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _to: 'soumabha015@gmail.com',
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto mb-12"
    >
      {/* Outer neon glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cosmic-neon/20 to-cosmic-accent/20 rounded-3xl blur-2xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '100%', height: '100%', marginTop: '-20px' }}
      />

      <div className="relative glass-dark rounded-3xl p-8 lg:p-10 shadow-neon-glow border-2 border-cosmic-neon/30 backdrop-blur-xl">
        {/* Animated gradient background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cosmic-neon/5 to-cosmic-accent/5" />

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mail className="text-cosmic-neon" size={28} />
            </motion.div>
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cosmic-neon to-cosmic-accent bg-clip-text text-transparent">
              Contact Me
            </h2>
          </div>

          {/* Success message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 flex items-center gap-3"
            >
              <CheckCircle className="text-emerald-400" size={20} />
              <p className="text-emerald-200 font-medium">
                Message sent successfully! I'll get back to you soon.
              </p>
            </motion.div>
          )}

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/50"
            >
              <p className="text-red-200 font-medium">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-semibold text-cosmic-neon mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Soumabha Mahapatra"
                className="w-full px-4 py-3 rounded-xl bg-cosmic-surface/50 border border-cosmic-border text-gray-100 transition-all duration-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cosmic-neon focus:border-transparent backdrop-blur-sm hover:bg-cosmic-surface/70 hover:border-cosmic-border/70"
              />
            </motion.div>

            {/* Email field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-semibold text-cosmic-neon mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-cosmic-surface/50 border border-cosmic-border text-gray-100 transition-all duration-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cosmic-neon focus:border-transparent backdrop-blur-sm hover:bg-cosmic-surface/70 hover:border-cosmic-border/70"
              />
            </motion.div>

            {/* Message field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-semibold text-cosmic-neon mb-2">
                Your Question
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="What would you like to ask? 🚀"
                className="w-full px-4 py-3 rounded-xl bg-cosmic-surface/50 border border-cosmic-border text-gray-100 transition-all duration-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cosmic-neon focus:border-transparent backdrop-blur-sm hover:bg-cosmic-surface/70 hover:border-cosmic-border/70 resize-none"
              />
            </motion.div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cosmic-neon to-cosmic-accent text-white transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-cosmic-neon/50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>


        </div>

        {/* Corner glow accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cosmic-neon/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cosmic-accent/10 blur-3xl rounded-full -ml-12 -mb-12 pointer-events-none" />
      </div>
    </motion.div>
  );
}
