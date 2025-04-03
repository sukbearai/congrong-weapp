<script lang="ts" setup>
import { useTabBarStore } from '@/stores/useTabBarStore'

const tabBarStore = useTabBarStore()

onShow(() => {
  tabBarStore.showTabBar()
  tabBarStore.switchTab(0)
})
</script>

<template>
  <view>
    主页
  </view>
</template>
