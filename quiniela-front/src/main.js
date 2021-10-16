import Vue from 'vue'
import App from './App.vue'

// Theme Configurations
import '../themeConfig.js'

// Tailwind
import './assets/css/main.css'

// Styles: SCSS
import './assets/scss/main.scss'

// Feather font icon
import './assets/css/iconfont.css'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

require('./plugins')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
