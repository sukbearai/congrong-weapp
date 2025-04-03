/* eslint-disable ts/no-use-before-define */
import { useAuthStore } from '@/stores/useAuthStore'
import { usePermissionStore } from '@/stores/usePermissionStore'

export const whiteList = [
  '/pages/common/login/index',
  '/pages/common/register/index',
  '/pages/common/forget-password/index',
]

export function setupRouterGuard() {
  uni.addInterceptor('navigateTo', {
    invoke(e) {
      return checkPermission(e.url)
    },
  })

  uni.addInterceptor('redirectTo', {
    invoke(e) {
      return checkPermission(e.url)
    },
  })

  uni.addInterceptor('switchTab', {
    invoke(e) {
      return checkPermission(e.url)
    },
  })

  uni.addInterceptor('reLaunch', {
    invoke(e) {
      return checkPermission(e.url)
    },
  })
}

function checkPermission(url: string): boolean {
  const authStore = useAuthStore()
  const permissionStore = usePermissionStore()

  // 白名单直接放行
  if (whiteList.some(path => url.startsWith(path))) {
    return true
  }

  // 未登录跳转登录页
  if (!authStore.isAuthenticated) {
    uni.redirectTo({
      url: `/pages/common/login/index?redirect=${encodeURIComponent(url)}`,
    })
    return false
  }

  // 检查页面权限
  const pagePath = url.split('?')[0]
  if (!permissionStore.hasPermission(pagePath)) {
    uni.showToast({
      title: '无访问权限',
      icon: 'none',
    })
    return false
  }

  return true
}
