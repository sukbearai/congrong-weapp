/**
 * 标准 API 响应格式
 */
export interface ApiResponse<T = any> {
  code: number // 状态码: 0 表示成功, 其他表示错误
  message: string // 响应消息
  data: T | null // 响应数据
  timestamp: number // 响应时间戳
}

/**
 * 创建标准 API 成功响应
 */
export function createSuccessResponse<T>(data: T | null = null, message: string = '成功'): ApiResponse<T> {
  return {
    code: 0,
    message,
    data,
    timestamp: Date.now(),
  }
}

/**
 * 创建标准 API 错误响应
 */
export function createErrorResponse(message: string, code: number = 500, data: any = null): ApiResponse<any> {
  return {
    code: code === 200 ? -1 : code, // 确保业务错误不使用HTTP成功状态码
    message,
    data,
    timestamp: Date.now(),
  }
}

/**
 * 创建标准 API 响应
 */
export function createApiResponse<T>(data: T | null = null, message: string = '成功', code: number = 0): ApiResponse<T> {
  return code === 0
    ? createSuccessResponse(data, message)
    : createErrorResponse(message, code, data)
}
