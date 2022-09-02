<template>
  <!-- 顶部 -->
  <TopNav></TopNav>
  <!-- 轮播图 -->
  <Swiper></Swiper>
  <IconList></IconList>
  <MusicList></MusicList>

</template>

<script>
import TopNav from '@/components/home/TopNav.vue'
import Swiper from '@/components/home/Swiper.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'
export default {
  name: 'HomeView',
  components: {
    TopNav,
    Swiper,
    IconList,
    MusicList
  }
}
</script>

<style scoped>
</style>