import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CosmicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update date daily
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, () => null);

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();
  const today = new Date().getDate();
  const isCurrentMonth =
    new Date().getMonth() === currentDate.getMonth() &&
    new Date().getFullYear() === currentDate.getFullYear();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 w-80 lg:w-96"
    >
      {/* Outer neon glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cosmic-glow/40 to-cosmic-accent/30 rounded-3xl blur-3xl"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Main calendar container - Glassmorphism */}
      <div className="relative glass-dark rounded-3xl p-6 shadow-neon-glow border-2 border-cosmic-glow/40 backdrop-blur-xl">
        {/* Animated gradient background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cosmic-glow/5 to-cosmic-accent/5" />

        {/* Content */}
        <div className="relative">
          {/* Header - Month & Year */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileHover={{ scale: 1.15 }}
              onClick={handlePrevMonth}
              className="p-2 hover:bg-cosmic-accent/20 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-cosmic-glow" />
            </motion.button>

            <h2 className="text-xl font-bold bg-gradient-to-r from-cosmic-glow to-cosmic-accent bg-clip-text text-transparent">
              {monthName} {year}
            </h2>

            <motion.button
              whileHover={{ scale: 1.15 }}
              onClick={handleNextMonth}
              className="p-2 hover:bg-cosmic-accent/20 rounded-lg transition-colors"
            >
              <ChevronRight size={20} className="text-cosmic-glow" />
            </motion.button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-bold text-cosmic-neon/70 uppercase tracking-widest"
              >
                {day.charAt(0)}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty days before month starts */}
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of month */}
            {days.map((day) => (
              <motion.div
                key={day}
                whileHover={{ scale: 1.1 }}
                className={`
                  aspect-square flex items-center justify-center rounded-lg font-semibold text-sm
                  transition-all duration-300 cursor-pointer
                  ${
                    isCurrentMonth && day === today
                      ? 'bg-gradient-to-br from-cosmic-neon to-cosmic-accent text-white shadow-neon-cyan'
                      : 'bg-cosmic-surface/40 text-gray-100 hover:bg-cosmic-surface/70 hover:border-cosmic-neon/50 border border-cosmic-border/30'
                  }
                `}
              >
                {day}
              </motion.div>
            ))}
          </div>

          {/* Today info footer */}
          <div className="mt-6 pt-4 border-t border-cosmic-border/30">
            <p className="text-xs text-cosmic-neon/80 text-center drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Corner glow accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cosmic-glow/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cosmic-accent/10 blur-3xl rounded-full -ml-12 -mb-12 pointer-events-none" />
      </div>
    </motion.div>
  );
}
