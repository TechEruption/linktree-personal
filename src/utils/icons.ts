import {
  Briefcase,
  Mail,
  X as TwitterIcon,
  Globe,
  FileText,
  Code,
  BarChart3,
  Link as LinkIcon,
  Zap,
  Heart,
  MessageSquare,
  Share2,
  Download,
  ExternalLink,
  Users,
  GitBranch,
} from 'lucide-react';

export type IconName =
  | 'linkedin'
  | 'github'
  | 'mail'
  | 'twitter'
  | 'instagram'
  | 'globe'
  | 'file'
  | 'code'
  | 'briefcase'
  | 'book'
  | 'chart'
  | 'link'
  | 'zap'
  | 'heart'
  | 'message'
  | 'share'
  | 'download'
  | 'external';

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  linkedin: Users,
  github: GitBranch,
  mail: Mail,
  twitter: TwitterIcon,
  instagram: Briefcase,
  globe: Globe,
  file: FileText,
  code: Code,
  briefcase: Briefcase,
  book: FileText,
  chart: BarChart3,
  link: LinkIcon,
  zap: Zap,
  heart: Heart,
  message: MessageSquare,
  share: Share2,
  download: Download,
  external: ExternalLink,
};

export function getIconComponent(
  iconName?: string
): React.ComponentType<{ className?: string }> {
  if (!iconName) return ExternalLink;
  
  const normalizedName = iconName.toLowerCase().trim() as IconName;
  return iconMap[normalizedName] || ExternalLink;
}

export const AVAILABLE_ICONS: IconName[] = Object.keys(iconMap) as IconName[];
