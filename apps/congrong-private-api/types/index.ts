export interface WechatApiError {
  errcode: number
  errmsg: string
}

export interface WechatTokenResponse {
  access_token: string
  expires_in: number
}

export interface TokenData {
  access_token: string
  expires_in: number
  from_cache?: boolean
}
