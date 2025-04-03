import type { MenuDTO, RoleDTO } from '@/services/login/type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
  const menus = ref<MenuDTO[]>([])
  const roles = ref<RoleDTO[]>([])

  const hasRole = computed(() => {
    return (roleCode: string) => roles.value.some(role => role.code === roleCode)
  })

  const hasPermission = computed(() => {
    return (menuCode: string) => menus.value.some(menu => menu.code === menuCode)
  })

  function setPermissions(menuList: MenuDTO[], roleList: RoleDTO[]) {
    menus.value = menuList || []
    roles.value = roleList || []
  }

  function clearPermissions() {
    menus.value = []
    roles.value = []
  }

  return {
    menus,
    roles,
    hasRole,
    hasPermission,
    setPermissions,
    clearPermissions,
  }
})
