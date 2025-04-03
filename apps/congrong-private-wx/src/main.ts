// import { setupRouterGuard } from '@/utils/router-guard'
import * as Pinia from 'pinia'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { persistPlugin } from './stores/persist'

// 初始化路由守卫
// setupRouterGuard()

const pinia = Pinia.createPinia()
pinia.use(persistPlugin)
export function createApp() {
  const app = createSSRApp(App)
  app.config.warnHandler = () => null
  app.use(pinia)
  return {
    app,
    Pinia,
  }
}
