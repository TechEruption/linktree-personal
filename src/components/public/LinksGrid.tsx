import { motion } from 'framer-motion';
import type { Link } from '../../types';
import { LinksSkeletonList } from '../common/LoadingSkeleton';
import { openLink } from '../../utils/helpers';
import { ExternalLink } from 'lucide-react';
import { getIconComponent } from '../../utils/icons';

interface LinksGridProps {
  links: Link[];
  loading: boolean;
}

export function LinksGrid({ links, loading }: LinksGridProps) {
  if (loading) {
    return <LinksSkeletonList />;
  }

  if (!links || links.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-gray-500 dark:text-gray-400"
      >
        <p>No links available yet</p>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto space-y-3"
    >
      {links.map((link) => (
        <LinkButton key={link.id} link={link} variants={itemVariants} />
      ))}
    </motion.div>
  );
}

interface LinkButtonProps {
  link: Link;
  variants: any;
}

function LinkButton({ link, variants }: LinkButtonProps) {
  // Allow forcing specific image icons when backend doesn't provide URLs
  const overrideIcons: Record<string, string> = {
    'my portfolio': 'https://cdn-icons-png.flaticon.com/128/5517/5517030.png',
    github: 'https://cdn-icons-png.flaticon.com/128/3291/3291695.png',
    blog: 'https://cdn-icons-png.flaticon.com/128/1187/1187595.png',
  };

  const titleKey = (link.title || '').toLowerCase().trim();
  const effectiveIcon = link.icon || overrideIcons[titleKey];
  const IconComponent = effectiveIcon && !(effectiveIcon.startsWith('http') || effectiveIcon.startsWith('/')) ? getIconComponent(effectiveIcon) : ExternalLink;
  const isComingSoon = link.description?.includes('Coming Soon');

  return (
    <motion.button
      variants={variants}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => !isComingSoon && openLink(link.url, true)}
      disabled={isComingSoon}
      className="w-full link-button group relative overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-accent/0 to-cosmic-glow/0 group-hover:from-cosmic-accent/10 group-hover:to-cosmic-glow/10 transition-all duration-300" />
      
      <div className="relative flex items-center gap-4">
        {/* Icon Container */}
        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-cosmic-surface/60 border border-cosmic-border/50 flex items-center justify-center group-hover:border-cosmic-neon/50 group-hover:shadow-neon-cyan transition-all duration-300 backdrop-blur-sm">
          {effectiveIcon && (effectiveIcon.startsWith('http') || effectiveIcon.startsWith('/')) ? (
            <img src={effectiveIcon} alt={link.title} className="w-7 h-7 object-contain" />
          ) : (
            <IconComponent className="w-7 h-7 text-cosmic-neon group-hover:text-cosmic-glow transition-colors duration-300" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-100 text-left truncate group-hover:text-cosmic-neon transition-colors duration-300 text-lg">
            {link.title}
          </h3>
          {link.description && (
            <p className="text-sm text-gray-400 text-left truncate group-hover:text-gray-300 transition-colors">
              {link.description}
            </p>
          )}
        </div>

        {/* Arrow indicator with glow */}
        <div className="flex-shrink-0 text-gray-500 group-hover:text-cosmic-neon transition-all duration-300 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
          <ExternalLink className="w-5 h-5" />
        </div>
      </div>
    </motion.button>
  );
}
