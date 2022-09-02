<template>
  <!-- 背景图片 -->
  <img :src="musicList.al.picUrl" class="bgimg">
  <!-- 头部 -->
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <!-- 歌曲名 -->
        <Vue3Marquee style="color: #fff;">
          {{musicList.name}}
        </Vue3Marquee>
        <!-- 作者 -->
        <!-- <span v-for="(item, index) in musicList.ar" :key="index">
          {{item.name}}
        </span> -->
        <div class="marquee">
          <span>
            {{musicList.ar[0].name}}
          </span>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <!-- 主体 -->
  <div class="detailContent" v-show="!isLyricShow">
    <!-- 磁针 -->
    <img src="@/assets/needle-ab.png" class="img_needle" :class="{img_needle_active: !isPlay}">
    <!-- 磁盘 -->
    <img src="@/assets/cd.png" class="img_cd">
    <img :src="musicList.al.picUrl" class="img_ar" :class="[!isPlay ? 'img_ar_active' : 'img_ar_paused']" @click="isLyricShow = true">
  </div>
  <!-- 歌词 -->
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p v-for="(item, index) in lyric" :key="index" :class="{active:(currentTime * 1000 >= item.time && currentTime * 1000 <= item.pre)}">
      {{item.lrc}}
    </p>
  </div>
  <!-- 底部 -->
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <!-- 进度条 -->
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <!-- 播放 -->
      <svg class="icon bofang" aria-hidden="true" @click="play" v-if="isPlay">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <!-- 暂停 -->
      <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
// 跑马灯
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { useStore } from 'vuex'
import { ref, computed, watch, onMounted } from 'vue'
const props = defineProps(['musicList', 'play', 'isPlay', 'addDuration'])
const store = useStore()
// 播放歌曲下标
const playListIndex = computed(() => store.state.playListIndex)
// 是否显示歌词
const isLyricShow = ref(false)
// 歌词列表
const lyricList = computed(() => store.state.lyricList)
// 歌词当前时间
const currentTime = computed(() => store.state.currentTime)
const musicLyric = ref(null)
const duration = computed(() => store.state.duration)
const musicListLength = store.state.playlist.length

// 切割歌词
const lyric = computed(() => {
  let arr = []
  if (lyricList.value.lyric) {
    arr = lyricList.value.lyric.split(/[(\r\n)\r\n]+/).map(item => {
      // 分
      let min = item.slice(1, 3)
      // 秒
      let sec = item.slice(4, 6)
      // 毫秒
      let mill = item.slice(7, 10)
      // 歌词
      let lrc = item.slice(11, item.length)
      // 时间
      let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9)
        lrc = item.slice(10, item.length)
        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
      }
      return { min, sec, mill, lrc, time }
    })
    arr.forEach((item, i) => {
      if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
        item.pre = 100000
      } else {
        item.pre = arr[i + 1].time
      }
    })
  }
  return arr
})
onMounted(() => {
  props.addDuration()
})

// 根据当前播放歌词时间设置offsetTop位置
watch(currentTime, newValue => {
  let p = document.querySelector('p.active')
  if (p && p.offsetTop > 300) {
    musicLyric.value.scrollTop = p.offsetTop - 300
  }
  // 如果歌曲播放完
  if (newValue == duration.value) {
    // 如果播放到最后一首,则下一首播放下标为0的歌曲
    if (playListIndex.value === musicListLength - 1) {
      store.dispatch('updatePlayListIndex', 0)
      play()
    } else {
      store.dispatch('updatePlayListIndex', playListIndex.value + 1)
    }
  }
})

// 上一首下一首
function goPlay(num) {
  let index = playListIndex.value + num
  if (index < 0) {
    index = 20 - 1
  } else if (index == 20) {
    index = 0
  }
  store.dispatch('updatePlayListIndex', index)
}

// 返回上一级
function goBack() {
  store.dispatch('updateDetailShow')
  isLyricShow.value = false
}
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 2.5rem;
      height: 100%;
      margin-left: 0.4rem;
      .marquee {
        display: flex;
        align-items: center;
      }
      span {
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: reactive;

  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    top: 2.8rem;
    z-index: -1;
  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    top: 3.7rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}

.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;

  p {
    color: rgb(241, 239, 239);
    margin-bottom: 0.3rem;
  }

  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
</style>