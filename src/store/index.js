import { createStore } from 'vuex'
import { reqGetLyric, reqPhoneLogin, reqGetVerify, reqLogout } from '@/api/index'

export default createStore({
  state: {
    playlist: [{
      al: {
        id: 1522777,
        name: "Telling Tales",
        pic: 109951164755115500,
        picUrl: "https://p1.music.126.net/JiLQ3rs_Owe0iAtNihT2pg==/109951164755115505.jpg",
        pic_str: "109951164755115505"
      },
      id: 21224493,
      name: 'Telling Tales',
      // 歌曲作者
      ar: [{ name: "灏灏灏仔" }]
    }],
    // 是否播放
    isPlay: true,
    // 歌曲详情页的显示
    detailShow: false,
    // 歌词
    lyricList: {},
    // 当前播放歌词时间
    currentTime: 0,
    duration: 0,//歌曲总时长
    // 默认下标
    playListIndex: 0,
    // 是否登录
    isLogin: false,
    // 是否显示底部组件
    isFooterMusic: true
  },
  getters: {
  },
  mutations: {
    UPDATEISPLAY(state, value) {
      state.isPlay = value
    },
    UPDATEPLAYLIST(state, value) {
      state.playlist = value
    },
    UPDATEPLAYLISTINDEX(state, value) {
      state.playListIndex = value
    },
    UPDATEDETAILSHOW(state) {
      state.detailShow = !state.detailShow
    },
    GETLYRIC(state, lyricList) {
      state.lyricList = lyricList
    },
    UPDATECURRENTTIME(state, currentTime) {
      state.currentTime = currentTime
    },
    UPDATEDURATION(state, duration) {
      state.duration = duration
    },
    PUSHPLAYLIST(state, music) {
      state.playlist.push(music)
    },
    UPDATEISLOGIN(state, value) {
      state.isLogin = value
    }
  },
  actions: {
    // 播放按钮的切换
    updateIsPlay({ commit }, value) {
      commit('UPDATEISPLAY', value)
    },
    // 根据id播放歌曲
    updatePlayList({ commit }, value) {
      commit('UPDATEPLAYLIST', value)
    },
    // 修改歌曲的下标
    updatePlayListIndex({ commit }, value) {
      commit('UPDATEPLAYLISTINDEX', value)
    },
    // 显示歌曲详情页
    updateDetailShow({ commit }) {
      commit('UPDATEDETAILSHOW')
    },
    // 获取歌词数据
    async getLyric({ commit }, id) {
      let result = await reqGetLyric(id)
      if (result.data.code == 200) {
        commit('GETLYRIC', result.data.lrc)
      }
    },
    // 歌词播放时间
    updateCurrentTime({ commit }, currentTime) {
      commit('UPDATECURRENTTIME', currentTime)
    },
    // 歌曲总时长
    updateDuration({ commit }, duration) {
      commit('UPDATEDURATION', duration)
    },
    // 搜索播放歌曲添加到列表
    pushPlayList({ commit }, music) {
      commit('PUSHPLAYLIST', music)
    },
    // 根据手机号发送验证码
    async getVerify({ commit }, phone) {
      let result = await reqGetVerify(phone)
      if (result.data.code == 200) {
        commit('')
        return 'ok'
      } else {
        return Promise.reject(new Error('当天发送验证码的条数超过限制'))
      }
    },
    // 验证验证码是否正确并登录
    async phoneLogin({ commit }, { phone, captcha }) {
      let result = await reqPhoneLogin(phone, captcha)
      if (result.data.code == 200) {
        // 接口没有返回token  返回结果 code: 200   data: true
        console.log(result);
        return 'ok'
      } else {
        // 验证码错误
        return Promise.reject(new Error('验证码错误'))
      }
    },
    // 判断是否登录
    updateIsLogin({ commit }, value) {
      commit('UPDATEISLOGIN', value)
    },
    // 退出登录
    async loginOut({ commit }) {
      let result = await reqLogout()
      if (result.data.code == 200) {
        commit('')
        return 'ok'
      } else {
        return Promise.reject(new Error('Faile'))
      }
    }
  },
  modules: {
  }
})
