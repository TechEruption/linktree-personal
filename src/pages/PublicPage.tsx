import { useProfile, useLinks, useSocialLinks } from '../hooks/useData';
import { ProfileCard } from '../components/public/ProfileCard';
import { LinksGrid } from '../components/public/LinksGrid';
import { SocialIcons } from '../components/public/SocialIcons';
import { ContactForm } from '../components/public/ContactForm';
import { motion } from 'framer-motion';

export function PublicPage() {
  const { profile, loading: profileLoading } = useProfile();
  const { links, loading: linksLoading } = useLinks();
  const { socialLinks, loading: socialLoading } = useSocialLinks();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Main content with premium layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top spacing for clock */}
        <div className="hidden lg:block h-24" />

        {/* Content wrapper - centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-16 lg:py-20 pb-32 lg:pb-16">
          
          {/* Contact Form - Premium */}
          <ContactForm />

          {/* Profile Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl"
          >
            <ProfileCard profile={profile} loading={profileLoading} />
          </motion.div>

          {/* Spacing between sections */}
          <div className="h-8 sm:h-12 md:h-16" />

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full max-w-2xl px-2 sm:px-0"
          >
            <LinksGrid links={links} loading={linksLoading} />
          </motion.div>

          {/* Spacing between sections */}
          <div className="h-8 sm:h-12" />

          {/* Social Icons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full flex justify-center"
          >
            <SocialIcons socialLinks={socialLinks} loading={socialLoading} />
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-gray-400 hover:text-cosmic-neon transition-colors cursor-pointer">
              Built with Vercel ⚡
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
