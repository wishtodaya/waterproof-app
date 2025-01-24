import type { Banner, ServiceCase, ServiceAdvantage, ApiResponse } from '../../types'
import { AppError } from '../../utils/error'
<<<<<<< HEAD
import { mockBanners, mockCases, mockAdvantages } from './mock-data'
=======
import { mockBanners, mockCases, mockAdvantages } from './index-mock-data'
>>>>>>> ef5daf10762dcc175b7b6758e8012d2e0fa18216

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
  }
}