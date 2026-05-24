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
      className="fixed bottom-8 right-8 lg:bottom-12 lg:right-12 z-50"
    >
      <div className="relative w-40 h-40 lg:w-48 lg:h-48">
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Main clock container */}
        <div className="relative w-full h-full glass rounded-full flex items-center justify-center shadow-2xl border-2 border-blue-400/40">
          {/* Analog clock background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900/20 to-blue-900/10">
            {/* Clock markers */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-2 bg-blue-400/60 left-1/2 origin-center"
                style={{
                  transform: `translateX(-50%) translateY(-${180 - 8}px) rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>

          {/* Analog hands */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center">
            {/* Hour hand */}
            <motion.div
              className="absolute w-1 h-12 bg-gradient-to-b from-blue-400 to-blue-300 rounded-full origin-bottom"
              style={{ bottom: '50%' }}
              animate={{ rotate: hoursDegrees }}
              transition={{ type: 'tween', duration: 0.5 }}
            />

            {/* Minute hand */}
            <motion.div
              className="absolute w-0.5 h-16 bg-gradient-to-b from-cyan-400 to-cyan-300 rounded-full origin-bottom"
              style={{ bottom: '50%' }}
              animate={{ rotate: minutesDegrees }}
              transition={{ type: 'tween', duration: 0.5 }}
            />

            {/* Second hand */}
            <motion.div
              className="absolute w-0.5 h-14 bg-gradient-to-b from-red-400 to-red-300 rounded-full origin-bottom"
              style={{ bottom: '50%' }}
              animate={{ rotate: secondsDegrees }}
              transition={{ type: 'tween', duration: 0 }}
            />

            {/* Center dot */}
            <div className="absolute w-3 h-3 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full shadow-lg" />
          </div>

          {/* Digital time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-xs font-bold text-blue-300/70 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {time.date}
            </motion.div>
          </div>
        </div>

        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-blue-400/30"
          animate={{ scale: [1, 1.1, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-purple-400/20"
          animate={{ scale: [1.05, 1.15, 1.05], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
