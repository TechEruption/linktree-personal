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
    <div className="min-h-screen overflow-x-hidden flex flex-col">
      {/* Main content with premium layout */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen">
        {/* Content wrapper - centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-8 md:py-12 lg:py-16">
          
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
          <div className="h-6 sm:h-8 md:h-10" />

          {/* Links Section - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full max-w-2xl px-2 sm:px-0"
          >
            <LinksGrid links={links} loading={linksLoading} />
          </motion.div>

          {/* Spacing between sections */}
          <div className="h-6 sm:h-8" />

          {/* Social Icons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full flex justify-center"
          >
            <SocialIcons socialLinks={socialLinks} loading={socialLoading} />
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 w-full bg-gradient-to-b from-cosmic-bg/0 to-cosmic-bg/50 px-4 py-8 sm:py-12 md:py-16"
      >
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </motion.div>
    </div>
  );
}
