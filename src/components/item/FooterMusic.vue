<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="playDetailShow">
      <img :src="playList.al.picUrl">
      <div>
        <p class="playName">{{playList.name}}</p>
        <span>横划可以切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="state.isPlay">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <!-- 音乐播放器 -->
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList.id}.mp3`"></audio>
    <!-- 曲详情页弹出层 -->
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%'}">
      <!-- 歌曲详情 -->
      <MusicDetail :musicList="playList" :play='play' :isPlay="state.isPlay" :playListIndex="playListIndex" :addDuration="addDuration"></MusicDetail>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUpdated, nextTick } from 'vue'
import { useStore } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'

const store = useStore()
// 仓库
const state = computed(() => store.state)
const playListIndex = computed(() => state.value.playListIndex)
const playList = computed(() => state.value.playlist[playListIndex.value])
const detailShow = computed(() => store.state.detailShow)
// 获取播放按钮dom元素
const audio = ref(null)
// 歌词定时器
let interVal = ref(0)

onMounted(() => {
  // 获取歌词
  store.dispatch('getLyric', playList.value.id)
  updateTime()
})

onUpdated(() => {
  store.dispatch('getLyric', playList.value.id)
  addDuration()
})

// 播放按钮事件
function play() {
  // 如果在暂停中
  if (audio.value.paused) {
    // 播放音乐
    audio.value.play()
    // 派发active修改播放按钮的显示隐藏
    store.dispatch('updateIsPlay', false)
    updateTime()
  } else {
    audio.value.pause()
    store.dispatch('updateIsPlay', true)
    // 清除定时器
    clearInterval(interVal)
  }
}

// 歌曲总时长
function addDuration() {
  store.dispatch('updateDuration', audio.value.duration)
}

// 歌词播放时间
function updateTime() {
  interVal = setInterval(() => {
    store.dispatch('updateCurrentTime', audio.value.currentTime)
  }, 1000)
}

// 歌曲详情页弹出层
function playDetailShow() {
  store.dispatch('updateDetailShow')
}

// 监听下标变化播放歌曲
watch([playListIndex, playList], () => {
  nextTick(() => {
    // 自动播放
    audio.value.autoplay = true
    // 如果处于暂停状态
    if (audio.value.paused) {
      // 修改图标为播放
      store.dispatch('updateIsPlay', false)
    }
    // 如果在播放中，则继续播放
    if (state.isPlay) {
      audio.value.autoplay = true
      store.dispatch('updateIsPlay', false)
    }
  })
})
</script>

<style lang="less" scoped>
.footerMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;

  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .playName {
      overflow: hidden;
      width: 3rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      color: #999;
      font-size: 0.28rem;
    }

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>