<script setup lang="ts">
import { useTabBarStore } from '@/stores/useTabBarStore'

const tabBarStore = useTabBarStore()
const { menus } = storeToRefs(tabBarStore)

watch(menus, (newMenus) => {
  newMenus.length > 0
  && uni.reLaunch({ url: newMenus[0].url })
}, { immediate: true })

onShow(() => {
  // 初始化菜单
  tabBarStore.initTabBar()
  // 切换到首页
  tabBarStore.switchTab(0)
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
})
</script>

<template>
  <view />
</template>
