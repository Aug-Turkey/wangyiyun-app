<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="goSearch">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <!-- 搜索框 -->
    <input type="text" placeholder="陈奕迅" @keydown.enter="enterKey" v-model="data.keyWord">
  </div>
  <div class="searchHistory">
    <span class="history">历史</span>
    <span v-for="(item, index) in data.keyWordList" :key="index" class="spanKey" @click="searchHistory(item)">{{item}}</span>
    <!-- 删除 -->
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-31shanchu"></use>
    </svg>
  </div>
  <!-- 歌曲列表 -->
  <div class="musicItemList">
    <div class="musicItem" v-for="(item,index) in data.searchList" :key="item.id">
      <div class="itemLift" @click="updateIndex(item)">
        <!-- 序号 -->
        <span class="IDX">{{index + 1}}</span>
        <div>
          <p>{{item.name}}</p>
          <span v-for="item1 in item.artists" :key="item1.id" class="itemAuthor">{{item1.name}}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true" v-show="item.mvid !== 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { reqGetSearch } from '@/api/index'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const data = reactive({
  // 搜索历史
  keyWordList: [],
  // 关键字
  keyWord: '',
  // 搜索列表
  searchList: []
})

const store = useStore()
const router = useRouter()

onMounted(() => {
  data.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
})

// 按下回车搜索
function enterKey() {
  if (data.keyWord !== '') {
    data.keyWordList.unshift(data.keyWord)
    // 去重
    data.keyWordList = [...new Set(data.keyWordList)]
    // 固定长度
    if (data.keyWordList.length > 5) {
      data.keyWordList.pop()
    }
    localStorage.setItem('keyWordList', JSON.stringify(data.keyWordList))
    // 获取搜索数据
    getSearchResult(data.keyWord)
    data.keyWord = ''
  }
}

// 按下历史关键词搜索
function searchHistory(keyword) {
  getSearchResult(keyword)
}

// 删除历史记录
function delHistory() {
  localStorage.removeItem('keyWordList')
  data.keyWordList = []
}

// 获取搜索结果
async function getSearchResult(keyWords) {
  let result = await reqGetSearch(keyWords)
  if (result.data.code === 200) {
    data.searchList = result.data.result.songs
  }
}

// 点击播放歌曲
function updateIndex(item) {
  // console.log(item);
  item.al = item.album
  item.al.picUrl = item.album.artist.img1v1Url
  store.dispatch('pushPlayList', item)
  store.dispatch('updatePlayListIndex', store.state.playlist.length - 1)
}

// 返回上一页
function goSearch() {
  router.go(-1)
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;

  input {
    margin-left: 0.4rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}

.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;

  .history {
    font-weight: 700;
  }

  .spanKey {
    background-color: #999;
    padding: 0.1rem 0.2rem;
    border-radius: 0.4rem;
    margin: 0.1rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}

.musicItemList {
  height: 100%;
  width: 100%;
  padding: 0.2rem;

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
</style>