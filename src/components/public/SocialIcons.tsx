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
      className="flex justify-center gap-4 flex-wrap"
    >
      {socialLinks.map((link) => (
        <SocialIcon key={link.id} link={link} variants={itemVariants} />
      ))}
    </motion.div>
  );
}

interface SocialIconProps {
  link: SocialLink;
  variants: any;
}

function SocialIcon({ link, variants }: SocialIconProps) {
  const IconComponent = getIconComponent(link.icon || link.platform);

  return (
    <motion.button
      variants={variants}
      whileHover={{
        scale: 1.25,
        boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)',
      }}
      whileTap={{ scale: 0.85 }}
      onClick={() => openLink(link.url, true)}
      className="w-14 h-14 rounded-full bg-cosmic-surface/60 flex items-center justify-center border border-cosmic-border/50 hover:border-cosmic-neon/70 transition-all duration-300 group backdrop-blur-sm hover:shadow-neon-cyan"
      title={link.platform}
    >
      <IconComponent className="w-6 h-6 text-cosmic-neon group-hover:text-cosmic-accent transition-colors duration-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
    </motion.button>
  );
}
