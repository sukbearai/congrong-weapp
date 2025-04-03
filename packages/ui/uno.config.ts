import { presetXui } from '@x-dev-uni/preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  envMode: 'build',
  cli: {
    entry: {
      patterns: ['src/**/*.ts', 'src/**/*.vue', '!**/*.d.ts'],
      outFile: 'dist/ui.css',
    },
  },
  presets: [
    presetXui({
      color: '#608e57',
    }),
  ],
})
