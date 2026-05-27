import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function WallClock() {
  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    date: string;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours() % 12 || 12,
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        date: now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Time values are used for analog clock calculations below

  // Calculate rotation angles for analog clock
  const secondsDegrees = (time.seconds / 60) * 360;
  const minutesDegrees = (time.minutes / 60) * 360 + (time.seconds / 3600) * 360;
  const hoursDegrees = (time.hours / 12) * 360 + (time.minutes / 720) * 360;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50"
    >
      <div className="relative w-40 h-40 lg:w-56 lg:h-56">
        {/* Outer neon glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cosmic-neon/40 to-cosmic-accent/30 rounded-full blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

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
                  transform: `translateX(-50%) translateY(-${180 - 10}px) rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>

          {/* Analog hands */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center">
            {/* Hour hand */}
            <motion.div
              className="absolute w-1.5 h-14 bg-gradient-to-b from-cosmic-accent to-cosmic-neon rounded-full origin-bottom shadow-[0_0_10px_rgba(99,102,241,0.8)]"
              style={{ bottom: '50%' }}
              animate={{ rotate: hoursDegrees }}
              transition={{ type: 'tween', duration: 0.5 }}
            />

            {/* Minute hand */}
            <motion.div
              className="absolute w-1 h-20 bg-gradient-to-b from-cosmic-neon to-cyan-400 rounded-full origin-bottom shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ bottom: '50%' }}
              animate={{ rotate: minutesDegrees }}
              transition={{ type: 'tween', duration: 0.5 }}
            />

            {/* Second hand - pulsing */}
            <motion.div
              className="absolute w-0.5 h-16 bg-gradient-to-b from-cosmic-glow to-pink-500 rounded-full origin-bottom shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              style={{ bottom: '50%' }}
              animate={{ rotate: secondsDegrees, opacity: [0.8, 1, 0.8] }}
              transition={{ type: 'tween', duration: 0, opacityDuration: 2 }}
            />

            {/* Center dot with glow */}
            <motion.div
              className="absolute w-4 h-4 bg-gradient-to-br from-cosmic-neon to-cosmic-accent rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Digital time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-xs font-bold text-cosmic-neon/80 tracking-widest drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {time.date}
            </motion.div>
          </div>
        </div>

        {/* Outer pulsing rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cosmic-neon/30 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-cosmic-accent/20"
          animate={{ scale: [0.95, 1.2, 0.95], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
