<template>
  <router-view />
  <FooterMusic v-show="store.state.isFooterMusic"></FooterMusic>
</template>

<script setup>
import store from '@/store'
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: .4rem;
  height: .4rem;
}
</style>
