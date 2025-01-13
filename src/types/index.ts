// types/index.ts

// API 基础类型
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// 分页相关
export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    total: number
    totalPages: number
    currentPage: number
    pageSize: number
  }
}

// 服务类型
export type ServiceType = 'all' | 'home' | 'outdoor' | 'industrial'

export interface ProcessStep {
  step: number
  title: string
  description: string
  status?: 'pending' | 'processing' | 'completed' | 'error'
}

export interface ServiceItem {
  id: number
  title: string
  price: number
  unit: string
  type: ServiceType
  description: string
  features: string[]
  process: ProcessStep[]
  estimatedDuration?: string
  minArea?: number
  maxArea?: number
  warranty?: string
  imageUrl?: string
  updatedAt?: string
  createdAt?: string
}

// 搜索相关
export interface SearchOptions {
  sortBy?: 'relevance' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
}

// FAQ 相关
export interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  order?: number
  isHot?: boolean
}

// 组件 Props 类型
export interface SearchBarProps {
  value: string
  placeholder?: string
  className?: string
  loading?: boolean
  delay?: number
  maxLength?: number
  showAction?: boolean
  actionText?: string
  onChange: (value: string) => void
  onSearch?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
}

export interface ServiceCardProps {
  service: ServiceItem
  expanded?: boolean
  loading?: boolean
  className?: string
  showAction?: boolean
  onToggle?: (id: number) => void
  onBook?: (service: ServiceItem) => void
}

export interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  className?: string
  emptyText?: string
  onFAQClick?: (faq: FAQ) => void
}

// 状态管理类型
export interface ProjectPageState {
  loading: boolean
  services: ServiceItem[]
  faqs: FAQ[]
  searchValue: string
  currentTab: number
  expandedService: number | null
  error: string | null
  initialized: boolean
  searchHistory: string[]
  filter: SearchOptions
}

// 通用组件类型
export interface LoadingProps {
  size?: 'small' | 'normal' | 'large'
  color?: string
  className?: string
  text?: string
}

export interface EmptyProps {
  text?: string
  image?: string
  className?: string
  children?: React.ReactNode
}

export interface ErrorProps {
  text?: string
  code?: number
  className?: string
  onRetry?: () => void
}

// 错误相关
export interface AppErrorType extends Error {
  code: number
  details?: any
}

// Tab 相关
export interface TabItem {
  title: string
  value: ServiceType
  badge?: number | string
}

export interface TabsProps {
  items: TabItem[]
  value: string | number
  className?: string
  onChange: (value: string | number) => void
}

// 过滤器相关
export interface FilterOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface FilterGroupProps {
  title: string
  options: FilterOption[]
  value: string | number | (string | number)[]
  multiple?: boolean
  className?: string
  onChange: (value: string | number | (string | number)[]) => void
}

// 业务类型
export interface ServiceBooking {
  id: number
  serviceId: number
  userId: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  area?: number
  address?: string
  contactName: string
  contactPhone: string
  appointmentTime?: string
  remark?: string
  createdAt: string
}

export interface ServiceComment {
  id: number
  serviceId: number
  userId: string
  rating: number
  content: string
  images?: string[]
  reply?: string
  createdAt: string
}

// 配置类型
export interface ProjectConfig {
  searchDebounceDelay: number
  maxSearchHistory: number
  defaultPageSize: number
  imageBaseUrl: string
  priceUnit: string
  areaUnit: string
}