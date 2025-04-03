<template>
  <view class="gradient-page">
    <wd-navbar fixed placeholder safeAreaInsetTop :bordered="false" custom-style="background: transparent !important;" />
    <slot />
  </view>
</template>

<style lang="scss" scope>
.gradient-page {
  min-height: 100vh;
  width: 100%;
  background-image: url('https://dcyweb.oss-cn-qingdao.aliyuncs.com/images/homeBg.png');
  background-repeat: no-repeat;
}
</style>
