import {
  ArrowLeft,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  Filter,
  Lock,
  Mail,
  MapPin,
  MousePointerClick,
  Search,
  Settings,
  Tag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IconRegistry = Record<string, LucideIcon>;

const iconRegistry: IconRegistry = {
  ArrowLeft,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  Filter,
  Lock,
  Mail,
  MapPin,
  MousePointerClick,
  Search,
  Settings,
  Tag,
  TrendingUp,
  Users,
  Zap,
};

export type IconName = keyof typeof iconRegistry;

export const getIconByName = (name: IconName | string): LucideIcon => {
  if (name in iconRegistry) {
    return iconRegistry[name as IconName];
  }

  return CheckCircle2;
};

export const availableIcons = Object.keys(iconRegistry);
