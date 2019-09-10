// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入字体图标库
import '@/assets/font/iconfont.css'

//全局引入axios
import axios from 'axios';

Vue.prototype.axios = axios;
Vue.config.productionTip = false


//全局引入mint-ui 和 内部的组件
import { DatetimePicker, Toast } from 'mint-ui'

//注册组件 mt-datetime-picker
Vue.component(DatetimePicker.name, DatetimePicker,);

//引入mint-ui 样式
import 'mint-ui/lib/style.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
