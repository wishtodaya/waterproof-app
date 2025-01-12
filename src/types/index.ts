// types/index.ts

// API Response Types
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Service Types
export type ServiceType = 'home' | 'outdoor' | 'industrial' | 'all';

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  price: number;
  unit: string;
  type: ServiceType;
  description: string;
  features: string[];
  process: ProcessStep[];
  estimatedDuration?: string;
  minArea?: number;
  maxArea?: number;
  warranty?: string;
  imageUrl?: string;
}

// Banner Types
export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

// Case Types
export interface ServiceCase {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  date: string;
  views: number;
  content?: string;
}

// Advantage Types
export interface ServiceAdvantage {
  id: number;
  icon: string;
  value: string;
  label: string;
}

// Form Types
export interface BookingForm {
  name: string;
  phone: string;
  address?: string;
  remark?: string;
  serviceId?: number;
  expectedArea?: number;
  preferredTime?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

// Component Props Types
export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
}

export interface SearchSectionProps {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export interface CategoryTabsProps {
  categories: ServiceCategory[];
  current: number;
  onChange: (index: number) => void;
}

export interface ServiceCardProps {
  service: ServiceItem;
  expanded: boolean;
  onToggle: (id: number) => void;
  onBook: (service: ServiceItem) => void;
}

export interface FAQProps {
  faqs: FAQ[];
}

export interface ServiceCategory {
  title: string;
  value: ServiceType;
  icon?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

// Config Types
export interface Config {
  ui: {
    banner: {
      interval: number;
      duration: number;
    };
    cases: {
      interval: number;
      duration: number;
      displayCount: number;
      cardHeight: number;
    };
    services: {
      pageSize: number;
      cardHeight: number;
      searchDebounce: number;
    };
  };
  contact: {
    phone: string;
    wechat: string;
  };
  booking: {
    minArea: number;
    maxArea: number;
    allowedTimeRange: {
      start: string;
      end: string;
    };
  };
}