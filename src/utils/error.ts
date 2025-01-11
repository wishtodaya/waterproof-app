export class AppError extends Error {
  constructor(
    public code: number,
    message: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function handleError(error: unknown): string {
  if (isAppError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return '操作失败，请稍后重试'
}