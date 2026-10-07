import { useProfile, useLinks, useSocialLinks } from '../hooks/useData';
import { ProfileCard } from '../components/public/ProfileCard';
import { LinksGrid } from '../components/public/LinksGrid';
import { SocialIcons } from '../components/public/SocialIcons';
import { motion } from 'framer-motion';

export function PublicPage() {
  const { profile, loading: profileLoading } = useProfile();
  const { links, loading: linksLoading } = useLinks();
  const { socialLinks, loading: socialLoading } = useSocialLinks();

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
      <div className="relative z-10 flex-1 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center px-3 py-4 sm:px-4 sm:py-6 md:py-8">
          <div className="w-full max-w-3xl rounded-[28px] border border-white/10 bg-slate-900/25 p-3 shadow-[0_20px_80px_rgba(15,23,42,0.38)] backdrop-blur-md sm:p-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <ProfileCard profile={profile} loading={profileLoading} />
              </motion.div>

            <div className="h-4 sm:h-6 md:h-7" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full max-w-2xl px-1 sm:px-0"
            >
              <LinksGrid links={links} loading={linksLoading} />
            </motion.div>

            <div className="h-4 sm:h-6" />

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
      </div>
    </div>
  );
}
