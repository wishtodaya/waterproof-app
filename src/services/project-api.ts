// services/project-api.ts
import type { ServiceItem, FAQ, ServiceType, ApiResponse } from '../types'
import { AppError } from '../utils/error'
import { mockServices, mockFaqs } from './project-mock-data'

async function mockRequest<T>(data: T): Promise<ApiResponse<T>> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    code: 0,
    message: 'success',
    data
  }
}

export const projectApi = {
  // 服务相关
  getServices(): Promise<ApiResponse<ServiceItem[]>> {
    return mockRequest(mockServices)
  },

  getServiceDetail(id: number): Promise<ApiResponse<ServiceItem>> {
    const service = mockServices.find(s => s.id === id)
    if (!service) {
      throw new AppError(404, '服务不存在')
    }
    return mockRequest(service)
  },

  getServicesByType(type: ServiceType): Promise<ApiResponse<ServiceItem[]>> {
    const filtered = type === 'all'
      ? mockServices
      : mockServices.filter(service => service.type === type)
    return mockRequest(filtered)
  },

  searchServices(keyword: string): Promise<ApiResponse<ServiceItem[]>> {
    const filtered = mockServices.filter(service =>
      service.title.includes(keyword) ||
      service.description.includes(keyword)
    )
    return mockRequest(filtered)
  },

  // FAQ相关
  getFaqs(): Promise<ApiResponse<FAQ[]>> {
    return mockRequest(mockFaqs)
  }
}