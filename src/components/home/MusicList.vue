<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <!-- 歌单列表 -->
    <div class="musicContent">
      <van-swipe :loop="false" :width="130" class="my-swiper" :show-indicators="false">
        <van-swipe-item v-for="item in data.musicList" :key="item.id" @click="goMusicDetails(item.id)">
          <!-- 歌单图片 -->
          <img :src="item.picUrl">
          <span class="playCount">
            <div class="count">
              <!-- 播放图标 -->
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang2"></use>
              </svg>
              <!-- 播放次数 -->
              <span>{{changeCount(item.playCount)}}</span>
            </div>
          </span>
          <!-- 歌单名称 -->
          <span class="name">{{item.name}}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { reqGetMusicList } from '@/api/index'
import { useRouter } from 'vue-router'
const data = reactive({
  // 歌单数据
  musicList: []
})
const $router = useRouter()

onMounted(() => {
  getMusicList()
})

// 获取歌单数据
async function getMusicList() {
  let result = await reqGetMusicList()
  if (result.data.code == 200) {
    data.musicList = result.data.result
  }
}

// 播放的次数优化
function changeCount(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  } else if (num >= 100000000) {
    return (num / 10000).toFixed(1) + '亿'
  }
}

// 跳转歌单详情
function goMusicDetails(id) {
  $router.push({
    name: 'itemmusic',
    query: {
      id
    }
  })
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;

  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }

  .musicContent {
    width: 100%;
    height: 3.7rem;

    .my-swiper {
      height: 100%;

      img {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 0.2rem;
      }

      .van-swipe-item {
        width: 2.4rem !important;
        margin-right: 0.2rem;
        position: reactive;

        .playCount {
          color: #fff;
          position: absolute;
          right: 0.06rem;
          top: 0.06rem;

          .icon {
            fill: #fff;
          }

          .count {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>