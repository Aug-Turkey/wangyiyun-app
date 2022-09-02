<template>
  <div>
    <div class="musicInfoList">
      <div class="musicInfoListTop">
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <span class="playAll">播放全部</span>
          <span class="musicAll">(共{{musicItemList.length}}首)</span>
        </div>
        <!-- 收藏 -->
        <div class="collect">
          <van-button type="danger">
            <van-icon name="plus" />
            <span> 收藏({{subscribedCount}})</span>
          </van-button>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="musicItemList">
        <div class="musicItem" v-for="(item,index) in musicItemList" :key="item.id">
          <div class="itemLift" @click="playMusic(index)">
            <!-- 序号 -->
            <span class="IDX">{{index + 1}}</span>
            <div>
              <p>{{item.name}}</p>
              <span v-for="item1 in item.ar" :key="item1.id" class="itemAuthor">{{item1.name}}</span>
            </div>
          </div>
          <div class="itemRight">
            <svg class="icon" aria-hidden="true" v-show="item.mv !== 0">
              <use xlink:href="#icon-shipin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-31liebiao"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const props = defineProps(['musicItemList', 'subscribedCount'])
const store = useStore()
// 根据id播放歌曲
function playMusic(index) {
  store.dispatch('updatePlayList', props.musicItemList)
  store.dispatch('updatePlayListIndex', index)
}
</script>

<style lang="less" scoped>
.musicInfoList {
  width: 100%;
  margin-top: 0.2rem;
  padding: 0 0.2rem;
  background-color: rgba(255, 255, 255, 0.863);
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;

  .musicInfoListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .iconItem {
      height: 100%;
      display: flex;
      align-items: center;

      .icon {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.2rem;
      }

      .playAll {
        font-weight: 900;
      }
      .musicAll {
        font-size: 0.26rem;
        color: rgba(3, 3, 3, 0.479);
      }
    }

    .collect {
      .van-button {
        border-radius: 0.6rem;
        width: 2.4rem;
        height: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .musicItemList {
    height: 100%;
    width: 100%;

    .musicItem {
      height: 1.4rem;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .itemLift {
        display: flex;
        align-items: center;
        width: 80%;

        .IDX {
          margin-right: 0.2rem;
        }

        p {
          font-weight: 900;
          overflow: hidden;
          width: 5rem;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .itemAuthor {
          color: rgba(51, 51, 51, 0.541);
          font-size: 0.24rem;
        }
      }

      .itemRight {
        display: flex;
        align-items: center;
        justify-content: end;
        width: 20%;

        .icon {
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>