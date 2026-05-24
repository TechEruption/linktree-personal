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
  const IconComponent = getIconComponent(link.icon);

  return (
    <motion.button
      variants={variants}
      whileHover={{
        scale: 1.2,
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => openLink(link.url, true)}
      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-400/30 hover:border-blue-400 transition-all duration-300 group"
      title={link.platform}
    >
      <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
    </motion.button>
  );
}
