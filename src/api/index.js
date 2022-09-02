// 统一接口管理
import requests from '@/api/request'

// 获取轮播图数据   /banner?type=2   type:资源类型,对应以下类型,默认为 0 即 PC  0: pc  1: android  2: iphone  3: ipad

export const reqGetBannerList = () => requests({ url: '/banner?type=2', method: 'GET' })

// 获取推荐歌单数据   /personalized?limit=1   可选参数: limit: 取出数量 , 默认为 30 (不支持 offset)
export const reqGetMusicList = () => requests({ url: '/personalized?limit=10', method: 'GET' })

// 获取歌单详情   /playlist/detail?id=24381616  必选参数: id: 歌单id  可选参数: s: 歌单最近的 s 个收藏者,默认为 8
export const reqGetPlayList = (id) => requests({ url: `/playlist/detail?id=${id}`, method: 'GET' })

// 获取歌单所有歌曲   /playlist/track/all?id=24381616&limit=10&offset=1  必选参数: id: 歌单id   可选参数: limit: 限制获取歌曲的数量，默认值为当前歌单的歌曲数量  offset: 默认值为0
export const reqGetMusicItemList = (id) => requests({ url: `/playlist/track/all?id=${id}&limit=20&offset=0`, method: 'GET' })

// 获取歌词   /lyric?id=33894312
export const reqGetLyric = (id) => requests({ url: `/lyric?id=${id}`, method: 'GET' })

// 搜索  /search?keywords=海阔天空  必选参数: keywords: 关键词   可选参数: limit: 返回数量 , 默认为 30 offset: 偏移数量，用于分页 , 如:( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
export const reqGetSearch = (keywords) => requests({ url: `/search?keywords=${keywords}`, method: 'GET' })

// 手机号发送验证码   /captcha/sent?phone=13xxx   必选参数: phone: 手机号码
export const reqGetVerify = (phone) => requests({ url: `/captcha/sent?phone=${phone}`, method: 'GET' })

// 验证验证码登录   /captcha/verify?phone=13xxx&captcha=1597   必选参数: phone: 手机号码   captcha: 验证码
export const reqPhoneLogin = (phone, captcha) => requests({ url: `/captcha/verify?phone=${phone}&captcha=${captcha}`, method: 'GET' })

// 退出登录   /logout
export const reqLogout = () => requests({ url: `/logout`, method: 'GET' })