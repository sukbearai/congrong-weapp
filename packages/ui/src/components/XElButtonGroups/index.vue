<script lang='ts' setup>
import { ElButton } from 'element-plus'
import { xElButtonGroupsProps } from './props'

defineOptions({
  name: 'XElButtonGroups',
})

defineProps(xElButtonGroupsProps)
</script>

<template>
  <div class="mb-4">
    <ElButton>Default</ElButton>
    <ElButton type="primary" icon="download">
      Primary
    </ElButton>
    <ElButton type="success">
      Success
    </ElButton>
    <ElButton type="info">
      Info
    </ElButton>
    <ElButton type="warning">
      Warning
    </ElButton>
    <ElButton type="danger">
      Danger
    </ElButton>
  </div>
</template>
