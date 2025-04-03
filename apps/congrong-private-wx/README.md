## 认证授权

- 登录成功后会自动获取用户信息和权限信息
- 登出会自动清理所有状态和本地存储
- 未登录访问受保护页面会自动跳转到登录页
- 访问无权限页面会提示"无访问权限"

1. 认证状态管理 ( `useAuthStore.ts` ):

- Token 管理（access token 和 refresh token）
- 登录/登出流程
- 认证状态初始化
- 登录成功后的重定向处理

2. 用户信息管理 ( `useUserStore.ts` ):

- 用户信息的获取和存储
- 用户信息的清理
- 与权限系统的集成

3. 权限控制 ( `usePermissionStore.ts` ):

- 角色权限管理
- 菜单权限管理
- 权限检查方法

4. 路由守卫 ( `router-guard.ts` ):

- 统一的路由拦截
- 白名单配置
- 权限检查
- 未登录重定向

5. 权限工具函数 ( `permission.ts` ):

- 角色检查
- 权限检查
- 便捷的权限判断方法

### 登录认证

```ts
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

// 判断是否已登录
const isLoggedIn = authStore.isAuthenticated

// 执行登录
await authStore.login({
  username: 'user',
  password: '123456'
})

// 执行登出
authStore.logout()
```

### 权限控制

```ts
import { hasPermission, hasRole } from '@/utils/permission'

// 检查权限
if (hasPermission('system:user:list')) {
  // 有权限时的逻辑
}

// 检查角色
if (hasRole('admin')) {
  // 具有该角色时的逻辑
}
```

```html
<template>
  <!-- 角色权限控制 -->
  <view v-if="hasRole('teacher')">教师专属内容</view>

  <!-- 菜单权限控制 -->
  <view v-if="hasPermission('system:user:add')">添加用户按钮</view>
</template>
```

### 用户信息

```ts
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
const userInfo = userStore.userInfo
```

## TabBar 使用指南

#### 使用

`tabbar` 默认添加再 `layouts/default.vue` 中，可在 `pages.json` 中修改默认布局，显示 `tabbar` 在页面中添加如下代码，菜单项在 `useTabBarStore` 中定义。

```typescript
import { useTabBarStore } from '@/stores/useTabBarStore'

const tabBarStore = useTabBarStore()

onShow(() => {
  // 显示 tabbar
  tabBarStore.showTabBar()
  // 激活 tabbar
  tabBarStore.switchTab(0)
})
```
