import type { Plugin } from 'vue'
import { XButton } from './XButton'
import { XElButtonGroups } from './XElButtonGroups'
import { XElUpload } from './XElUpload'

export default [
  XButton,
  XElButtonGroups,
  XElUpload,
  // 其他组件
] as unknown as Plugin[]
