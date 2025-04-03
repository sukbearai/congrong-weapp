export interface LoginReqBody {
  /**
   * 应用ID
   */
  appId?: number
  /**
   * 密码（公钥加密）
   */
  password: string
  /**
   * 用户名
   */
  username: string
  [property: string]: any
}

export interface LoginReqRes {
  /**
   * accessToken
   */
  accessToken: string
  /**
   * 账号id
   */
  accountId: number
  /**
   * 应用ID
   */
  appId?: number
  /**
   * token过期时间毫秒
   */
  expiresIn: number
  /**
   * 身份编码;student:学生; teacher:教师; manage:管理;
   */
  identityCode?: string
  /**
   * jti
   */
  jti: string
  /**
   * 手机号
   */
  phone: string
  /**
   * refreshToken
   */
  refreshToken: string
  /**
   * token权限范围
   */
  scope: string
  /**
   * token类型
   */
  tokenType: string
  [property: string]: any
}

export interface UserInfoRes {
  /**
   * 账号id
   */
  accountId?: number
  /**
   * 账号名称
   */
  accountName?: string
  /**
   * 应用ID
   */
  appId?: number
  /**
   * 身份编码;student:学生; teacher:教师; manage:管理;
   */
  identityCode?: string
  /**
   * 菜单
   */
  menuList?: MenuDTO[]
  /**
   * 手机号
   */
  phone?: string
  /**
   * 平台id
   */
  platformId?: number
  /**
   * 平台列表
   */
  platformList?: PlatformRespDTO[]
  /**
   * 角色集合
   */
  roleList?: RoleDTO[]
  [property: string]: any
}

/**
 * 菜单
 */
export interface MenuDTO {
  children?: MenuDTO[]
  code?: string
  icon?: string
  id?: number
  isLeaf?: boolean
  /**
   * 前端json字段内容
   */
  jsonField?: string
  name?: string
  parentId?: number
  pathUrl?: string
  sort?: number
  type?: number
  [property: string]: any
}

/**
 * 平台列表
 */
export interface PlatformRespDTO {
  id?: number
  name?: string
  [property: string]: any
}

/**
 * 角色集合
 */
export interface RoleDTO {
  /**
   * 角色编码
   */
  code?: string
  /**
   * 角色id
   */
  id?: number
  [property: string]: any
}
