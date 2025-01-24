// services/project-api.ts
import type { ServiceType, ServiceItem, FAQ, ApiResponse, SearchOptions } from '../../types'
import { AppError } from '../../utils/error'
import { mockServices, mockFaqs } from './mock-data'

/**
 * 模拟异步请求
 */
const mockRequest = async <T>(data: T): Promise<ApiResponse<T>> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    code: 0,
    message: 'success',
    data
  }
}

/**
 * 搜索相关度评分
 */
const calculateRelevanceScore = (service: ServiceItem, keyword: string): number => {
  let score = 0
  const lowerKeyword = keyword.toLowerCase()

  // 标题匹配权重最高
  if (service.title.toLowerCase().includes(lowerKeyword)) {
    score += 10
  }
  
  // 描述匹配次之
  if (service.description.toLowerCase().includes(lowerKeyword)) {
    score += 5
  }
  
  // 特性匹配
  service.features?.forEach(feature => {
    if (feature.toLowerCase().includes(lowerKeyword)) {
      score += 3
    }
  })

  // 工期和面积信息匹配
  if (service.estimatedDuration?.toLowerCase().includes(lowerKeyword)) {
    score += 2
  }

  return score
}

export const projectApi = {
  /**
   * 获取服务列表
   */
  async getServicesByType(type: ServiceType): Promise<ApiResponse<ServiceItem[]>> {
    try {
      const filtered = type === 'all' 
        ? mockServices 
        : mockServices.filter(service => service.type === type)

      return mockRequest(filtered)
    } catch (error) {
      throw new AppError(500, '获取服务列表失败')
    }
  },

  /**
   * 搜索服务
   */
  async searchServices(
    keyword: string,
    type: ServiceType = 'all',
    options: SearchOptions = {}
  ): Promise<ApiResponse<ServiceItem[]>> {
    try {
      // 预处理关键词
      const processedKeyword = keyword.trim().toLowerCase()
      
      // 空关键词时返回分类列表
      if (!processedKeyword) {
        return this.getServicesByType(type)
      }

      // 先按类型过滤
      let filtered = type === 'all' 
        ? mockServices 
        : mockServices.filter(service => service.type === type)

      // 搜索过滤
      filtered = filtered.filter(service => {
        const searchFields = [
          service.title,
          service.description,
          ...(service.features || []),
          service.warranty || '',
          service.estimatedDuration || '',
        ].map(field => field.toLowerCase())

        return searchFields.some(field => field.includes(processedKeyword))
      })

      // 计算相关度得分并排序
      if (options.sortBy === 'relevance') {
        filtered.sort((a, b) => {
          const scoreA = calculateRelevanceScore(a, processedKeyword)
          const scoreB = calculateRelevanceScore(b, processedKeyword)
          return scoreB - scoreA
        })
      }

      // 价格筛选
      if (options.minPrice !== undefined || options.maxPrice !== undefined) {
        filtered = filtered.filter(service => {
          const price = service.price
          return (options.minPrice === undefined || price >= options.minPrice) &&
                 (options.maxPrice === undefined || price <= options.maxPrice)
        })
      }

      // 按价格排序
      if (options.sortBy === 'price') {
        filtered.sort((a, b) => 
          options.sortOrder === 'desc' ? b.price - a.price : a.price - b.price
        )
      }

      return mockRequest(filtered)
    } catch (error) {
      throw new AppError(500, '搜索服务失败')
    }
  },

  /**
   * 获取服务详情
   */
  async getServiceDetail(id: number): Promise<ApiResponse<ServiceItem>> {
    try {
      const service = mockServices.find(s => s.id === id)
      if (!service) {
        throw new AppError(404, '服务不存在')
      }
      return mockRequest(service)
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      throw new AppError(500, '获取服务详情失败')
    }
  },

  /**
   * 获取FAQ列表
   */
  async getFaqs(): Promise<ApiResponse<FAQ[]>> {
    try {
      return mockRequest(mockFaqs)
    } catch (error) {
      throw new AppError(500, '获取FAQ列表失败')
    }
  }
}