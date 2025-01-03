import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
import 'highlight.js/styles/vs2015.css' // 直接从 node_modules 引入

// 创建应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 使用head管理
const head = createHead()
app.use(head)

// 挂载应用
app.mount('#app')