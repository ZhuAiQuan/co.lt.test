import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
// import ant from './utils/ant' 按需加载
import Antd from 'ant-design-vue'; // 全部引入
import 'ant-design-vue/dist/antd.css';

const app = createApp(App).use(store).use(router).use(Antd);

app.config.globalProperties.$axios = axios

app.mount('#app')
