<template>
  <div class="musicInfo">
    <!-- 头部 -->
    <div class="itemMusicTop">
      <img :src="props.playList.coverImgUrl" class="bgimg">
      <!-- 左侧 -->
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <!-- 右侧 -->
      <div class="itemRight">
        <svg class="icon" aria-hidden="true" @click="goSearch">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="itemMusicBody">
      <img :src="props.playList.coverImgUrl" class="image">
      <div class="content">
        <!-- 名称 -->
        <div class="itemName">
          <p>{{props.playList.name}}</p>
        </div>
        <!-- 作者 -->
        <div class="author">
          <img :src="props.playList.creator.avatarUrl" v-if="props.playList.creator">
          <!-- 签名 -->
          <span class="nickname" v-if="props.playList.creator">{{props.playList.creator.nickname}}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <!-- 描述 -->
        <div class="signature">
          <p v-if="props.playList.creator" class="signatureContent">{{props.playList.creator.signature}}</p>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="itemMusicBottom">
      <!-- 信息 -->
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <span>{{props.playList.commentCount}}</span>
      </div>
      <!-- 分享 -->
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{props.playList.shareCount}}</span>
      </div>
      <!-- 下载 -->
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <!-- 多选 -->
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['playList'])
// 跳转到搜索页
function goSearch() {
  router.push('/search')
}
</script>

<style lang="less" scoped>
.musicInfo {
  width: 100%;
  // height: 10rem;

  // 顶部
  .itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 0.2rem;
    position: relative;

    .bgimg {
      width: 100%;
      height: 10rem;
      position: fixed;
      z-index: -1;
      filter: blur(20px);
    }

    .itemLeft,
    .itemRight {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0.2rem;

      span {
        font-size: 0.4rem;
        color: #fff;
      }

      .icon {
        fill: #fff;
      }
    }
  }

  // 主体
  .itemMusicBody {
    width: 100%;
    height: 2.8rem;
    padding: 0 0.2rem;
    display: flex;

    .image {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.2rem;
      margin-right: 0.3rem;
    }

    .content {
      width: 80%;
      padding-right: 0.3rem;

      .itemName {
        color: #fff;
        font-weight: 900;

        p {
          width: 3.5rem;
          height: 40px;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .author {
        width: 4rem;
        height: 1rem;
        display: flex;
        align-items: center;

        .icon {
          fill: #fff;
          width: 0.3rem;
        }

        img {
          width: 0.6rem;
          height: 0.6rem;
          margin: 0.1rem 0;
          border-radius: 50%;
        }

        .nickname {
          color: rgba(255, 255, 255, 0.74);
          margin-left: 0.2rem;
        }
      }

      .signature {
        color: rgba(255, 255, 255, 0.74);
        display: flex;
        align-items: center;

        .signatureContent {
          width: 3.5rem;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .icon {
          fill: #fff;
          width: 0.3rem;
        }
      }
    }
  }

  // 底部
  .itemMusicBottom {
    height: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 0.2rem;

    .iconItem {
      display: flex;
      flex-direction: column;
      color: #fff;
      align-items: center;

      .icon {
        fill: #fff;
        margin-bottom: 0.1rem;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}
</style>