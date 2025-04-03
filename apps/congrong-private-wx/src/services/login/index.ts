/* eslint-disable ts/no-use-before-define */
import type { LoginReqBody, LoginReqRes, UserInfoRes } from './type'
import { encrypt } from '@/utils'
import { alovaInstance as request } from '../request'

export function useAuthService() {
  async function login(params: LoginReqBody) {
    const pubKey = await getPasswordPubKey()
    if (!pubKey) { throw new Error('获取公钥失败') }

    const encryptedPassword = encrypt(pubKey, params.password)
    if (!encryptedPassword) {
      throw new Error('密码加密失败，请重试')
    }

    return accountPwdLogin({
      ...params,
      password: encryptedPassword,
    })
  }

  function getPasswordPubKey() {
    return request.Get<string>('/passwordPubKey')
  }

  function accountPwdLogin(params: LoginReqBody) {
    return request.Post<LoginReqRes>('/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  function getUserInfo() {
    return request.Get<UserInfoRes>('/resource/detail')
  }

  // function refreshToken(token: string) {
  //   return request.Post<LoginReqRes>('/token/refresh', { refreshToken: token })
  // }

  function refreshToken() {}

  return {
    login,
    getUserInfo,
    refreshToken,
  }
}
