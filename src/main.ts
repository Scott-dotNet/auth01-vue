import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
// import router from './router/module/base-routes'
import  { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
// 注册element-plus
app.use(ElementPlus)
// 注册pinia
const pinia = createPinia()
app.use(pinia)
app.use(router)
// 注册element-plus的图标
for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
  }
app.mount('#app')