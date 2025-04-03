// 登录请求验证模式
const loginSchema = z.object({
  nickname: z.string().min(2, '昵称至少2位').max(20, '昵称不超过20位').optional(),
  phone: z.string().min(11).max(11).regex(/^1[3-9]\d{9}$/, '请输入有效的手机号'),
})

/**
 * 用户登录API
 * 使用手机号验证用户，不存在则创建，并生成JWT令牌
 */
export default defineEventHandler(async (event) => {
  try {
    // 读取并验证请求体数据
    const rawBody = await readBody(event)
    const validationResult = loginSchema.safeParse(rawBody)

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(err => err.message).join('; ')
      return createErrorResponse(errorMessages, 400)
    }

    const { phone, nickname } = validationResult.data

    // 查询用户
    const users = await event.context.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.phone, phone))
      .limit(1)

    const user = users.length > 0 ? users[0] : null

    // 获取JWT密钥
    const config = useRuntimeConfig()
    const jwtSecret = config.jwtSecret
    const secretKey = new TextEncoder().encode(jwtSecret)

    // 用户不存在则创建用户
    if (!user) {
      // 创建一个新用户
      const newUser = {
        phone,
        nickname: nickname || `用户${phone.substring(7)}`, // 使用提供的昵称或手机号后4位作为默认昵称
        // created_at: new Date(),
        // updated_at: new Date(),
      }

      // 插入新用户
      const insertResult = await event.context.db
        .insert(usersTable)
        .values(newUser)
        .returning()

      if (!insertResult.length) {
        return createErrorResponse('用户创建失败', 500)
      }

      const createdUser = insertResult[0]

      // 生成JWT令牌
      const token = await new jose.SignJWT({ user_id: createdUser.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d') // 30天有效期
        .sign(secretKey)

      return createSuccessResponse({
        token,
        user: createdUser,
      }, '登录成功')
    }

    // 生成JWT令牌
    const token = await new jose.SignJWT({ user_id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d') // 30天有效期
      .sign(secretKey)

    return createSuccessResponse({
      token,
      user,
    }, '登录成功')
  }
  catch (error) {
    return createErrorResponse(
      error instanceof Error ? error.message : '登录处理失败',
      500,
    )
  }
})
