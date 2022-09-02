<template>
  <ItemMusicTop :playList="data.playList"></ItemMusicTop>
  <!-- 音乐列表 -->
  <ItemMusicList :musicItemList="data.musicItemList" :subscribedCount="data.playList.subscribedCount"></ItemMusicList>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { reqGetPlayList, reqGetMusicItemList } from '@/api/index'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'

const $route = useRoute()
const id = $route.query.id
const data = reactive({
  // 歌单详情数据
  playList: {},
  // 歌单列表
  musicItemList: []
})
onMounted(() => {
  getPlayList(id)
  getMusicItemList(id)
})

// 根据id获取歌单详情
async function getPlayList(id) {
  try {
    let result = await reqGetPlayList(id)
    if (result.status == 200) {
      data.playList = result.data.playlist
    }
  } catch (error) {
    alert(error.message)
  }
}

// 获取歌单列表
async function getMusicItemList(id) {
  let result = await reqGetMusicItemList(id)
  if (result.data.code == 200) {
    data.musicItemList = result.data.songs
  }
}

components: {
  ItemMusicTop, ItemMusicList
}
</script>

<style lang="less" scoped>
</style>