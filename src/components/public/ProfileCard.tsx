import { motion } from 'framer-motion';
import type { Profile } from '../../types';
import { ProfileSkeleton } from '../common/LoadingSkeleton';

interface ProfileCardProps {
  profile: Profile | null;
  loading: boolean;
}

export function ProfileCard({ profile, loading }: ProfileCardProps) {
  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-gray-400"
      >
        <p>Unable to load profile</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-6 py-12"
    >
      {/* Profile Image with Neon Glow */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Animated neon border */}
        <div className="absolute inset-0 bg-gradient-to-r from-cosmic-neon via-cosmic-accent to-cosmic-glow rounded-full blur-2xl opacity-60 animate-pulse-glow" />
        
        {/* Avatar */}
        <img
          src={profile.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=premium'}
          alt={profile.name}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-cosmic-neon/50 shadow-neon-glow"
        />
      </motion.div>

      {/* Name - Gradient Text */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-center gradient-text"
      >
        {profile.name}
      </motion.h1>

      {/* Bio/Headline - Neon Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-2xl font-semibold text-cosmic-neon text-center max-w-2xl drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      >
        {profile.bio}
      </motion.p>

      {/* Subtitle/Skills */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm md:text-base text-gray-300 text-center max-w-md leading-relaxed"
      >
        {profile.subtitle}
      </motion.p>

      {/* Availability Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-surface/50 border border-cosmic-neon/30 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-cosmic-neon animate-pulse"></div>
          <span className="text-sm font-medium text-cosmic-neon">Available for work</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
