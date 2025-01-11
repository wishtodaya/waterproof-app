import type { Banner, ServiceCase, ServiceAdvantage, BookingForm, ApiResponse } from '../types'
import { AppError } from '../utils/error'
import { mockBanners, mockCases, mockAdvantages } from './index-mock-data'

async function mockRequest<T>(data: T, delay = 500): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, delay))
  return data
}

export const api = {
  getBanners(): Promise<ApiResponse<Banner[]>> {
    return mockRequest({ code: 0, message: 'success', data: mockBanners })
  },

  getCases(): Promise<ApiResponse<ServiceCase[]>> {
    return mockRequest({ code: 0, message: 'success', data: mockCases })
  },

  getCaseDetail(id: number): Promise<ApiResponse<ServiceCase>> {
    const caseItem = mockCases.find(item => item.id === id)
    if (!caseItem) {
      throw new AppError(404, '案例不存在')
    }
    return mockRequest({ code: 0, message: 'success', data: caseItem })
  },

  getAdvantages(): Promise<ApiResponse<ServiceAdvantage[]>> {
    return mockRequest({ code: 0, message: 'success', data: mockAdvantages })
  },

  async submitBooking(form: BookingForm): Promise<ApiResponse<{ id: number }>> {
    // Validate required fields
    if (!form.name?.trim()) {
      throw new AppError(400, '请输入姓名')
    }
    if (!form.phone?.trim()) {
      throw new AppError(400, '请输入手机号')
    }

    // Validate phone format
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(form.phone)) {
      throw new AppError(400, '请输入正确的手机号')
    }

    // Validate field lengths
    if (form.name.length > 20) {
      throw new AppError(400, '姓名不能超过20个字符')
    }
    if (form.address && form.address.length > 100) {
      throw new AppError(400, '地址不能超过100个字符')
    }
    if (form.remark && form.remark.length > 200) {
      throw new AppError(400, '备注不能超过200个字符')
    }

    // Simulate API call
    return mockRequest({ 
      code: 0, 
      message: 'success', 
      data: { id: Date.now() } 
    }, 1000)
  }
}