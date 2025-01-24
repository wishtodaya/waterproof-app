// services/contact-api.ts
import { ServiceTypeOption, BookingFormData } from '../../components/booking-form/types'
import { AboutUsProps } from '../../components/about-us/types'
import { ApiResponse } from '../../types'
import { AppError } from '../../utils/error'
import { mockServiceTypes, mockContactInfo } from './contact-mock-data'

const mockRequest = async <T>(data: T): Promise<ApiResponse<T>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { code: 0, message: 'success', data }
  }
  
  export const contactApi = {
    getServiceTypes(): Promise<ApiResponse<ServiceTypeOption[]>> {
      return mockRequest(mockServiceTypes)
    },
  
    getContactInfo(): Promise<ApiResponse<AboutUsProps>> {
      return mockRequest(mockContactInfo)
    },
  
    submitBooking(data: BookingFormData): Promise<ApiResponse<{id: number}>> {
      if(!data.name?.trim()) throw new AppError(400, '请输入姓名')
      if(!/^1[3-9]\d{9}$/.test(data.phone)) throw new AppError(400, '请输入正确的手机号')
      if(!data.area?.trim()) throw new AppError(400, '请输入施工面积')
      if(!data.serviceType) throw new AppError(400, '请选择服务类型')
      if(!data.region?.length) throw new AppError(400, '请选择所在地区')
      if(!data.address?.trim()) throw new AppError(400, '请输入详细地址')
  
      return mockRequest({ id: Date.now() })
    }
  }