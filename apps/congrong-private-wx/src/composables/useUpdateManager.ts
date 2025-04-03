import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

interface UpdateResult {
  hasUpdate: boolean
}

function useUpdateManager() {
  if (!uni.canIUse('getUpdateManager') || !uni.getUpdateManager) {
    console.warn('当前环境不支持更新管理器')
    return
  }

  const updateManager = uni.getUpdateManager()
  const isUpdateReady = ref(false)

  updateManager.onCheckForUpdate((res: UpdateResult) => {
    // 请求完新版本信息的回调
    console.log('版本信息', res)
  })

  updateManager.onUpdateReady(() => {
    isUpdateReady.value = true
  })

  updateManager.onUpdateFailed(() => {
    // 新版本下载失败
    uni.showModal({
      title: '更新提示',
      content: '新版本下载失败，是否重试？',
      success(res) {
        if (res.confirm) {
          // 重新检查更新
          updateManager.onCheckForUpdate((res: UpdateResult) => {
            console.log('重新检查版本信息', res)
          })
        }
      },
    })
  })

  onShow(() => {
    if (isUpdateReady.value) {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        },
      })
    }
  })

  return {
    isUpdateReady,
  }
}

export default useUpdateManager
