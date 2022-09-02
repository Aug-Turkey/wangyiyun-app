<template>
  <div class="user">
    <p>个人中心</p>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
// 退出登录
async function logout() {
  try {
    await store.dispatch('loginOut')
    // 修改仓库中登录状态
    store.dispatch('updateIsLogin', false)
    router.push('/login')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
}
</style>