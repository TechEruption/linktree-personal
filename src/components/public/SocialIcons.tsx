import { motion } from 'framer-motion';
import type { SocialLink } from '../../types';
import { SocialIconsSkeleton } from '../common/LoadingSkeleton';
import { openLink } from '../../utils/helpers';
import { getIconComponent } from '../../utils/icons';

interface SocialIconsProps {
  socialLinks: SocialLink[];
  loading: boolean;
}

export function SocialIcons({ socialLinks, loading }: SocialIconsProps) {
  if (loading) {
    return <SocialIconsSkeleton />;
  }

  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center gap-6 flex-wrap"
    >
      {socialLinks.map((link) => (
        <div key={link.id} className="flex flex-col items-center">
          <SocialIcon link={link} variants={itemVariants} />
          <span className="mt-2 text-xs text-cosmic-muted">{formatLabel(link.platform)}</span>
        </div>
      ))}
    </motion.div>
  );
}

interface SocialIconProps {
  link: SocialLink;
  variants: any;
}

function SocialIcon({ link, variants }: SocialIconProps) {
  const IconComponent = getIconComponent(link.platform);
  const platformKey = link.platform?.toLowerCase?.() || '';
  const fallbackIcons: Record<string, string> = {
    twitter: 'https://cdn-icons-png.flaticon.com/128/14417/14417709.png',
    linkedin: 'https://cdn-icons-png.flaticon.com/128/2504/2504923.png',
    mail: 'https://cdn-icons-png.flaticon.com/128/5968/5968534.png',
    instagram: 'https://cdn-icons-png.flaticon.com/128/1409/1409946.png',
  };
  const effectiveIcon = link.icon && (link.icon.startsWith('http') || link.icon.startsWith('/')) ? link.icon : fallbackIcons[platformKey];

  return (
    <motion.button
      variants={variants}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => openLink(link.url, true)}
      className="w-14 h-14 rounded-full bg-cosmic-surface/60 flex items-center justify-center border border-cosmic-border/50 hover:border-cosmic-neon/70 transition-all duration-300 group backdrop-blur-sm"
      title={link.platform}
    >
      {effectiveIcon ? (
        <img src={effectiveIcon} alt={link.platform} className="w-6 h-6 object-contain rounded" />
      ) : (
        <IconComponent className="w-6 h-6 text-cosmic-neon group-hover:text-cosmic-accent transition-colors duration-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
      )}
    </motion.button>
  );
}

function formatLabel(platform?: string) {
  if (!platform) return '';
  const p = platform.toLowerCase();
  if (p === 'mail' || p === 'email') return 'Gmail';
  if (p === 'twitter' || p === 'x') return 'Twitter';
  if (p === 'linkedin') return 'LinkedIn';
  if (p === 'instagram') return 'Instagram';
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}
