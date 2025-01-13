// utils/error.ts

// 自定义应用错误类
export class AppError extends Error {
  constructor(
    public code: number,
    message: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// 类型保护：判断是否为 AppError
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

// 通用错误处理函数
export function handleError(error: unknown): string {
  // 如果是应用自定义错误
  if (isAppError(error)) {
    return error.message
  }

  // 如果是标准 Error 对象
  if (error instanceof Error) {
    return error.message
  }

  // 其他未知错误类型
  return '操作失败，请稍后重试'
}

// 业务错误码映射
export const ErrorCodeMap: Record<number, string> = {
  400: '请求参数错误',
  401: '未登录或登录已过期',
  403: '没有操作权限',
  404: '请求的资源不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
}

// HTTP 错误处理
export function handleHttpError(code: number): string {
  return ErrorCodeMap[code] || '网络请求失败，请稍后重试'
}

// 表单错误处理
export function handleFormError(error: unknown): { 
  [key: string]: string 
} {
  if (isAppError(error)) {
    try {
      // 尝试解析错误信息是否为 JSON 格式的字段错误
      const fieldsError = JSON.parse(error.message)
      if (typeof fieldsError === 'object') {
        return fieldsError
      }
    } catch {
      // 解析失败则返回通用错误
      return { _error: error.message }
    }
  }
  return { _error: handleError(error) }
}

// 网络错误判断
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.toLowerCase().includes('network') || 
           error.message.toLowerCase().includes('timeout') ||
           error.message.toLowerCase().includes('connection')
  }
  return false
}

// 超时错误判断
export function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.toLowerCase().includes('timeout')
  }
  return false
}

// 创建业务错误
export function createBusinessError(code: number, message: string): AppError {
  return new AppError(code, message)
}

// 包装异步错误处理
export async function wrapAsyncError<T>(
  promise: Promise<T>,
  errorMessage?: string
): Promise<T> {
  try {
    return await promise
  } catch (error) {
    throw new AppError(
      isAppError(error) ? error.code : 500,
      errorMessage || handleError(error)
    )
  }
}

// 错误提示格式化
export function formatErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    const code = error.code
    const message = error.message
    return `${message}${code ? ` (${code})` : ''}`
  }
  return handleError(error)
}