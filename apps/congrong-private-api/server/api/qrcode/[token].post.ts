const QrcodeRequestSchema = z.object({
  device_id: z.string({
    required_error: '缺少必要参数 device_id',
    invalid_type_error: 'device_id 必须是字符串',
  }),
  width: z.number({
    invalid_type_error: 'width 必须是数字',
  })
    .int()
    .min(280, 'width 最小值为 280px')
    .max(1280, 'width 最大值为 1280px')
    .optional()
    .default(430),
})

/**
 * 生成小程序码API
 * 根据设备ID生成用于小程序设备绑定的二维码
 * 使用: POST /api/qrcode/{access_token}
 */
export default defineEventHandler(async (event) => {
  try {
    // 从URL路径参数获取access_token
    const accessToken = getRouterParam(event, 'token')

    if (!accessToken) {
      return createErrorResponse('缺少必要的access_token参数，请在URL路径中提供', 400)
    }

    // 解析请求体
    const rawBody = await readBody(event)

    // 使用 Zod 验证请求参数
    const validationResult = QrcodeRequestSchema.safeParse(rawBody)

    if (!validationResult.success) {
      // 格式化验证错误信息
      const errorMessages = validationResult.error.errors.map(err => err.message).join('; ')
      return createErrorResponse(errorMessages, 400)
    }

    // 提取验证后的数据
    const body = validationResult.data

    // 构造请求微信接口的参数
    const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`

    const requestData = {
      scene: `device_id=${body.device_id}`,
      check_path: false,
      width: body.width,
    }

    // 发送请求到微信接口
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    // 检查是否请求成功
    if (!response.ok) {
      return createErrorResponse(`HTTP 错误: ${response.status}`, response.status)
    }

    // 如果是 JSON 响应，可能是错误信息
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json() as WechatApiError
      if (errorData.errcode) {
        return createErrorResponse(
          `错误码: ${errorData.errcode}, 错误信息: ${errorData.errmsg}`,
          500,
        )
      }
    }

    // 获取二维码图片的二进制数据
    const imageBuffer = await response.arrayBuffer()

    // 设置响应头部为图片格式
    setResponseHeader(event, 'Content-Type', 'image/png')

    // 直接返回二进制数据，不使用标准响应格式包装
    // eslint-disable-next-line node/prefer-global/buffer
    return Buffer.from(imageBuffer)
  }
  catch (error) {
    return createErrorResponse(
      error instanceof Error ? error.message : '获取小程序码出错',
      500,
    )
  }
})
