<template>
  <div class="topNav">
    <!-- 列表 -->
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="topContent">
      <span @click="goUser">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <!-- 搜索 -->
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="goSearch">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// 跳转到搜索页面
function goSearch() {
  router.push('/search')
}

// 跳转到个人中心
function goUser() {
  router.push('/user')
}
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 0.36rem;

    .active {
      font-weight: 900;
    }
  }
}
</style>