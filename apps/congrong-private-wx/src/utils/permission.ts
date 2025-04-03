import { usePermissionStore } from '@/stores/usePermissionStore'

// 角色权限指令
export function hasRole(role: string): boolean {
  const permissionStore = usePermissionStore()
  return permissionStore.hasRole(role)
}

// 菜单权限指令
export function hasPermission(permission: string): boolean {
  const permissionStore = usePermissionStore()
  return permissionStore.hasPermission(permission)
}
