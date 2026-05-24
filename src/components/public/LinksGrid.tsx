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
  const IconComponent = link.icon ? getIconComponent(link.icon) : ExternalLink;

  return (
    <motion.button
      variants={variants}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openLink(link.url, true)}
      className="w-full link-button text-left"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-300">
          <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-left truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {link.title}
          </h3>
          {link.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-left truncate">
              {link.description}
            </p>
          )}
        </div>

        {/* Arrow indicator */}
        <div className="flex-shrink-0 text-gray-400 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <ExternalLink className="w-5 h-5" />
        </div>
      </div>
    </motion.button>
  );
}
