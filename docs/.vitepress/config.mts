import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const Components: DefaultTheme.SidebarItem[] = [
  { text: 'Button', link: '/components/button' },
  { text: 'ElButtonGroups', link: '/components/ElButtonGroups' },
  { text: 'ElUpload', link: '/components/ElUpload' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'x-dev-tools',
  description: 'x-dev-tools',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      {
        text: '快速开始',
        link: '/guide/',
      },
      {
        text: '贡献指南',
        link: '/guide/contribution/',
      },
      {
        text: '组件',
        items: Components,
      },
    ],
  },
})
