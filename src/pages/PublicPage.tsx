import { useProfile, useLinks, useSocialLinks } from '../hooks/useData';
import { ProfileCard } from '../components/public/ProfileCard';
import { LinksGrid } from '../components/public/LinksGrid';
import { SocialIcons } from '../components/public/SocialIcons';
import { WallClock } from '../components/clock/WallClock';
import { motion } from 'framer-motion';

export function PublicPage() {
  const { profile, loading: profileLoading } = useProfile();
  const { links, loading: linksLoading } = useLinks();
  const { socialLinks, loading: socialLoading } = useSocialLinks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Spacing for clock */}
        <div className="hidden lg:block h-32" />

        {/* Content wrapper */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20">
          {/* Profile section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl"
          >
            <ProfileCard profile={profile} loading={profileLoading} />
          </motion.div>

          {/* Spacing */}
          <div className="h-12 sm:h-16 md:h-20" />

          {/* Links section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full"
          >
            <LinksGrid links={links} loading={linksLoading} />
          </motion.div>

          {/* Spacing */}
          <div className="h-12 sm:h-16" />

          {/* Social icons section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full"
          >
            <SocialIcons socialLinks={socialLinks} loading={socialLoading} />
          </motion.div>
        </div>
      </div>

      {/* Wall Clock */}
      <WallClock />
    </div>
  );
}
