// services/cases/api.ts
import type {ApiResponse } from '../../types'
import type { CaseData } from '../../components/case-card/types'
import { AppError } from '../../utils/error'
import { mockCases } from './mock-data'

interface GetCasesParams {
  type?: string
  keyword?: string
  page?: number
  pageSize?: number
}

export const casesApi = {
  async getCases(params: GetCasesParams = {}): Promise<ApiResponse<CaseData[]>> {
    await new Promise(resolve => setTimeout(resolve, 500))
    let cases = [...mockCases]

    // 类型筛选
    if (params.type && params.type !== 'all') {
      cases = cases.filter(item => item.type === params.type)
    }

    // 关键词搜索
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase()
      cases = cases.filter(item => 
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword)
      )
    }

    // 分页
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = cases.slice(start, end)
    
    return {
      code: 0,
      message: 'success',
      data
    }
  },

  async getCaseDetail(id: number): Promise<ApiResponse<CaseData>> {
    await new Promise(resolve => setTimeout(resolve, 500))
    const caseItem = mockCases.find(item => item.id === id)
    
    if (!caseItem) {
      throw new AppError(404, '案例不存在')
    }

    return {
      code: 0,
      message: 'success',
      data: caseItem
    }
  }
}