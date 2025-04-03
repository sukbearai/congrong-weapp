<script lang="ts" setup>
import { useTabBarStore } from '@/stores/useTabBarStore'

const tabBarStore = useTabBarStore()

onShow(() => {
  tabBarStore.showTabBar()
  tabBarStore.switchTab(1)
})
</script>

<template>
  <view>我的</view>
</template>
