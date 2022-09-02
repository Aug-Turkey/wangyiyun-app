import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vant 组件库
import vant from '@/plugins/index'
// 全局底部组件
import FooterMusic from '@/components/item/FooterMusic.vue'

const app = createApp(App)
app.use('FooterMusic', FooterMusic)
app.use(store)
app.use(router).mount('#app')
