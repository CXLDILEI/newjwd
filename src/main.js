import Vue from 'vue'
import Vonic from 'vonic'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'
import ShowMap from './components/ShowMap.vue'
import store from './store/store'

// Routes
const routes = [
  { path: '/', component: Index },
  { path: '/about', name:'AboutLink', component: About },
  { path: '/showmap', name:'ShowMap', component: ShowMap },
]

var url = 'http://47.96.25.255:8088';
Vue.prototype.$axios = axios;
Vue.prototype.$url = url;
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ad9mAAP79Mis2APNoVcf9LTptGEUPqgh'
})
Vue.use(Vonic.app, {
  routes: routes,
  store
})
