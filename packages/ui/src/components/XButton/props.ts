import type { ExtractPropTypes, PropType } from 'vue'
import { disabled, loadable, readonly, sizeable } from '@/composables/useProps'

export type ButtonVariants = 'default' | 'soft' | 'outline' | 'solid' | 'solid-cover' | 'dashed' | 'dashed-cover' | 'link' | 'ghost' | 'ghost-light'

export const xButtonProps = {
  to: String,
  rounded: Boolean,
  icon: String,

  size: sizeable,
  disabled,
  readonly,
  loading: loadable,
  variant: { type: String as PropType<ButtonVariants> },
}

export const xButtonGroupProps = {
  size: xButtonProps.size,
  spacer: Boolean,
}

export type XButtonProps = ExtractPropTypes<typeof xButtonProps>
export type XButtonGroupProps = ExtractPropTypes<typeof xButtonGroupProps>
