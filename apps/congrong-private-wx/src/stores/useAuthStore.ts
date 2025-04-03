/* eslint-disable ts/no-use-before-define */
import type { LoginReqBody, LoginReqRes } from '@/services/login/type'
import { useAuthService } from '@/services/login'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { usePermissionStore } from './usePermissionStore'
import { useUserStore } from './useUserStore'

export const useAuthStore = defineStore('auth', () => {
  // 状态定义
  const token = ref('')
  const rToken = ref('')
  const loading = ref(false)
  const isAuthenticated = computed(() => !!token.value)

  // 服务实例
  const authService = useAuthService()

  // 认证状态管理
  function setTokens(tokens: { accessToken: string, refreshToken: string }) {
    token.value = tokens.accessToken
    rToken.value = tokens.refreshToken
  }

  function clearAuth() {
    token.value = ''
    rToken.value = ''
  }

  async function initAuth() {
    const userStore = useUserStore()
    if (token.value && rToken.value) {
      try {
        await userStore.fetchUserInfo()
        return true
      }
      catch {
        return false
      }
    }
    return false
  }

  // 登录流程
  async function login(params: LoginReqBody) {
    try {
      loading.value = true
      const loginResult = await authService.login(params)
      if (loginResult) {
        await handleLoginSuccess(loginResult)
        return true
      }
      return false
    }
    // eslint-disable-next-line no-useless-catch
    catch (error) {
      throw error
    }
    finally {
      loading.value = false
    }
  }

  async function handleLoginSuccess(loginRes: LoginReqRes) {
    setTokens({
      accessToken: loginRes.accessToken,
      refreshToken: loginRes.refreshToken,
    })
    const userStore = useUserStore()
    await userStore.fetchUserInfo()

    // 获取重定向地址
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1] as any
    const redirect = currentPage?.options?.redirect

    if (redirect) {
      uni.redirectTo({
        url: decodeURIComponent(redirect),
      })
    }
    else {
      uni.switchTab({ url: '/pages/index/index' })
    }
  }

  // 登出流程
  function logout() {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    // 清理所有状态
    clearAuth()
    userStore.clearUserInfo()
    permissionStore.clearPermissions()

    // 清理本地存储
    uni.clearStorageSync()

    // 获取当前页面路径用于重定向
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1] as any
    const currentPath = currentPage ? `/${currentPage.route}` : ''

    setTimeout(() => {
      uni.redirectTo({
        url: `/pages/common/login/index${currentPath ? `?redirect=${encodeURIComponent(currentPath)}` : ''}`,
      })
    }, 1000)
  }

  // async function refreshToken() {
  //   try {
  //     const res = await authService.refreshToken(token.value)
  //     if (res?.refreshToken) {
  //       setToken(res.refreshToken)
  //       return res
  //     }
  //     return null
  //   }
  //   catch {
  //     return null
  //   }
  // }

  async function refreshToken() {}

  return {
    token,
    rToken,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    initAuth,
  }
})
