// API Response Types
export interface ApiResponse<T> {
    code: number
    message: string
    data: T
  }
  
  // Business Types
  export interface Banner {
    id: number
    title: string
    subtitle: string
    imageUrl: string
  }
  
  export interface ServiceCase {
    id: number
    title: string
    description: string
    imageUrl: string
    type: string
    date: string
    views: number
    content?: string
  }
  
  export interface ServiceAdvantage {
    id: number
    icon: string
    value: string
    label: string
  }
  
  // Form Types
  export interface BookingForm {
    name: string
    phone: string
    address?: string
    remark?: string
  }
  
  export type FormErrors = Partial<Record<keyof BookingForm, string>>
  
  // Config Types
  export interface Config {
    ui: {
      banner: {
        interval: number
        duration: number
      }
      cases: {
        interval: number
        duration: number
      }
    }
    contact: {
      phone: string
      wechat: string
    }
  }
  
  