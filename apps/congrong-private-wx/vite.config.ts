import fs from 'node:fs'
import path from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite'
import { WeappTailwindcssDisabled } from './platform'
import postcssPlugins from './postcss.config'

function copyFolderRecursiveSync(source: string, target: string) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true })
  }

  const files = fs.readdirSync(source)

  files.forEach((file) => {
    const sourcePath = path.join(source, file)
    const targetPath = path.join(target, file)

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderRecursiveSync(sourcePath, targetPath)
    }
    else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://dev-study.metaobe.com:9443/api/dcy-system-study',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  // uvtw 一定要放在 uni 后面
  plugins: [
    UniLayouts(),
    uni(),
    uvtw({
      rem2rpx: true,
      disabled: WeappTailwindcssDisabled,
      cssPreflight: {
        'box-sizing': false,
      },
      // 使用新的 ast-grep 来处理 js 资源，速度是 babel 的2倍左右
      // 需要先安装 `@ast-grep/napi`, 安装完成后再启用下方配置
      // jsAstTool: 'ast-grep'
    }),
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    {
      name: 'copy-cloudfunctions',
      apply: 'build', // 仅在构建时执行
      closeBundle() {
        const src = path.join(__dirname, 'src', 'cloudfunctions')
        // eslint-disable-next-line node/prefer-global/process
        const dest = path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM!, 'cloudfunctions')

        console.log(`Copying cloudfunctions from ${src} to ${dest}`)
        copyFolderRecursiveSync(src, dest)
      },
    },
  ],
  // 内联 postcss 注册 tailwindcss
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
    // https://vitejs.dev/config/shared-options.html#css-preprocessoroptions
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'legacy-js-api', 'css-function-mixin', 'global-builtin'],
      },
    },
  },
})
