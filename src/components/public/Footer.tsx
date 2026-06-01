import { motion } from 'framer-motion';
import type { Link, SocialLink } from '../../types';
import { getIconComponent } from '../../utils/icons';
import { openLink } from '../../utils/helpers';
import { LinksSkeletonList } from '../common/LoadingSkeleton';

interface FooterProps {
  links: Link[];
  socialLinks: SocialLink[];
  loading: boolean;
}

export function Footer({ links, socialLinks, loading }: FooterProps) {
  if (loading) {
    return <LinksSkeletonList />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
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
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative z-10 w-full bg-gradient-to-b from-transparent via-cosmic-bg/50 to-cosmic-bg/80 border-t border-cosmic-border/30 backdrop-blur-sm mt-20 pt-16 pb-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links Section */}
        {links && links.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="text-center text-sm font-semibold text-cosmic-neon mb-8 uppercase tracking-wider">
              All Links
            </h2>
            
            {/* Links Grid - 2 or 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {links.map((link) => (
                <FooterLinkItem key={link.id} link={link} variants={itemVariants} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Social Links Section */}
        {socialLinks && socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-center text-sm font-semibold text-cosmic-neon mb-8 uppercase tracking-wider">
              Connect
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {socialLinks.map((social) => (
                <FooterSocialItem key={social.id} social={social} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center border-t border-cosmic-border/30 pt-8"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 hover:text-cosmic-neon transition-colors cursor-pointer">
            Built with ✨ Cosmic Links ⚡
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

interface FooterLinkItemProps {
  link: Link;
  variants: any;
}

function FooterLinkItem({ link, variants }: FooterLinkItemProps) {
  const IconComponent = link.icon ? getIconComponent(link.icon) : ExternalLink;

  return (
    <motion.button
      variants={variants}
      whileHover={{ scale: 1.05, x: 4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => openLink(link.url, true)}
      className="group relative overflow-hidden rounded-xl p-4 bg-cosmic-surface/40 border border-cosmic-border/30 hover:border-cosmic-neon/50 transition-all duration-300 text-left"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-neon/0 to-cosmic-accent/0 group-hover:from-cosmic-neon/5 group-hover:to-cosmic-accent/5 transition-all duration-300" />
      
      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cosmic-surface/80 border border-cosmic-border/50 flex items-center justify-center group-hover:border-cosmic-neon/50 group-hover:shadow-neon-cyan transition-all duration-300">
          <IconComponent className="w-5 h-5 text-cosmic-neon group-hover:text-cosmic-glow transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-100 truncate group-hover:text-cosmic-neon transition-colors duration-300">
            {link.title}
          </h3>
          {link.description && (
            <p className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors mt-0.5">
              {link.description}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

interface FooterSocialItemProps {
  social: SocialLink;
}

function FooterSocialItem({ social }: FooterSocialItemProps) {
  const IconComponent = getIconComponent(social.icon || social.platform);

  return (
    <motion.button
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => openLink(social.url, true)}
      title={social.platform}
      className="group relative w-12 h-12 rounded-full bg-cosmic-surface/60 border border-cosmic-border/50 flex items-center justify-center hover:border-cosmic-neon/50 hover:shadow-neon-glow transition-all duration-300"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-neon/10 to-cosmic-accent/10 group-hover:from-cosmic-neon/20 group-hover:to-cosmic-accent/20 transition-all duration-300" />
      
      <IconComponent className="w-6 h-6 text-cosmic-neon group-hover:text-cosmic-glow transition-colors duration-300 relative z-10" />
    </motion.button>
  );
}
