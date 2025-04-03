import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import FloatingVue, { Menu } from 'floating-vue'
import XUI from '@x-dev-uni/ui'

import 'floating-vue/dist/style.css'
import '@shikijs/vitepress-twoslash/style.css'
import '@x-dev-uni/ui/ui.css'
import 'uno.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VMenu', Menu)

    app.use(TwoslashFloatingVue)
    app.use(FloatingVue)
    app.use(XUI)
  },
} satisfies Theme
