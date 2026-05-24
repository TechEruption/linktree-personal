import { motion } from 'framer-motion';

export function ProfileSkeleton() {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-24 h-24 rounded-full skeleton" />
      <div className="w-64 h-4 skeleton rounded" />
      <div className="w-48 h-3 skeleton rounded" />
      <div className="w-56 h-3 skeleton rounded" />
    </motion.div>
  );
}

export function LinkSkeleton() {
  return (
    <motion.div
      className="w-full h-24 skeleton rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    />
  );
}

export function LinksSkeletonList() {
  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {[...Array(5)].map((_, i) => (
        <LinkSkeleton key={i} />
      ))}
    </div>
  );
}

export function SocialIconsSkeleton() {
  return (
    <motion.div
      className="flex justify-center gap-4 animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-10 h-10 rounded-full skeleton" />
      ))}
    </motion.div>
  );
}
