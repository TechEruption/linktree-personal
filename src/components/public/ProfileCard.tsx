import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Profile } from '../../types';
import { ProfileSkeleton } from '../common/LoadingSkeleton';

interface ProfileCardProps {
  profile: Profile | null;
  loading: boolean;
}

export function ProfileCard({ profile, loading }: ProfileCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const RESUME_VIEW_URL = 'https://docs.google.com/document/d/YOUR_DOCUMENT_ID/view';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours() % 12 || 12,
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate rotation angles for analog clock
  const secondsDegrees = (time.seconds / 60) * 360;
  const minutesDegrees = (time.minutes / 60) * 360 + (time.seconds / 3600) * 360;
  const hoursDegrees = (time.hours / 12) * 360 + (time.minutes / 720) * 360;

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
      className="flex flex-col items-center gap-6 py-8"
    >
      {/* 3D Flip Container */}
      <div 
        className="h-40 md:h-48 w-40 md:w-48 cursor-pointer"
        style={{ perspective: '1200px' }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          style={{
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full relative"
        >
          {/* Front - Profile Image */}
          <motion.div
            style={{ backfaceVisibility: 'hidden' }}
            className="w-full h-full absolute"
          >
            <div className="relative w-full h-full p-1">
              {/* Animated neon border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-neon via-cosmic-accent to-cosmic-glow rounded-full blur-2xl opacity-60 animate-pulse-glow" />
              
              {/* Avatar */}
              <img
                src={profile.avatar_url || '/profile.jpeg'}
                alt={profile.name}
                className="relative w-full h-full rounded-full object-cover border-4 border-cosmic-neon/50 shadow-[0_0_25px_rgba(6,182,212,0.35)] ring-2 ring-white/10"
              />
            </div>
          </motion.div>

          {/* Back - Clock/Watch */}
          <motion.div
            style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
            className="w-full h-full absolute"
          >
            <div className="relative w-full h-full">
              {/* Clock Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-neon/40 to-cosmic-accent/30 rounded-full blur-2xl opacity-60" />
              
              {/* Main clock container - Glassmorphism */}
              <div className="relative w-full h-full glass-dark rounded-full flex items-center justify-center shadow-neon-glow border-2 border-cosmic-neon/40 backdrop-blur-xl">
                {/* Animated gradient background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-accent/5 to-cosmic-glow/5 animate-pulse">
                  {/* Clock markers */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-3 bg-cosmic-neon/60 left-1/2 origin-center rounded-full"
                      style={{
                        transform: `translateX(-50%) translateY(-${88 - 10}px) rotate(${i * 30}deg)`,
                      }}
                    />
                  ))}
                </div>

                {/* Analog hands */}
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  {/* Hour hand */}
                  <motion.div
                    className="absolute w-1.5 h-12 md:h-14 bg-gradient-to-b from-cosmic-accent to-cosmic-neon rounded-full origin-bottom shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                    style={{ bottom: '50%' }}
                    animate={{ rotate: hoursDegrees }}
                    transition={{ type: 'tween', duration: 0.5 }}
                  />

                  {/* Minute hand */}
                  <motion.div
                    className="absolute w-1 h-16 md:h-20 bg-gradient-to-b from-cosmic-neon to-cyan-400 rounded-full origin-bottom shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                    style={{ bottom: '50%' }}
                    animate={{ rotate: minutesDegrees }}
                    transition={{ type: 'tween', duration: 0.5 }}
                  />

                  {/* Second hand - pulsing */}
                  <motion.div
                    className="absolute w-0.5 h-14 md:h-16 bg-gradient-to-b from-cosmic-glow to-pink-500 rounded-full origin-bottom shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                    style={{ bottom: '50%' }}
                    animate={{ rotate: secondsDegrees, opacity: [0.8, 1, 0.8] }}
                  transition={{ type: 'tween', duration: 2, repeat: Infinity }}
                  />

                  {/* Center dot with glow */}
                  <motion.div
                    className="absolute w-4 h-4 bg-gradient-to-br from-cosmic-neon to-cosmic-accent rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Outer pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cosmic-neon/30 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

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

      {/* Resume Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative mt-4"
      >
        <a
          href={RESUME_VIEW_URL}
          target="_blank"
          rel="noreferrer"
          className="relative mx-auto flex h-16 w-[240px] items-center justify-center rounded-full bg-gradient-to-r from-cosmic-neon/15 via-cosmic-accent/15 to-cosmic-neon/15 px-6 text-center text-lg font-semibold text-cosmic-neon shadow-[0_0_30px_rgba(56,189,248,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:bg-cosmic-neon/10"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-neon/35 to-cosmic-accent/10 opacity-70 blur-sm" />
          <span className="relative z-10">Resume</span>
        </a>
      </motion.div>
    </motion.div>
  );
}
