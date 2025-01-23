// components/booking-form/types.ts
export interface ServiceTypeOption {
  label: string
  value: string
}

export interface BookingFormData {
  name: string              // 联系人姓名
  phone: string            // 联系电话
  area: string             // 施工面积
  serviceType: string      // 服务类型
  region: string[]         // 所在地区
  address: string          // 详细地址
  remark: string          // 补充说明
}

export interface BookingFormProps {
  loading?: boolean
  serviceTypes: ServiceTypeOption[]
  onSubmit: (data: BookingFormData) => void | Promise<void>
}

export interface FormErrors {
  [key: string]: string
}