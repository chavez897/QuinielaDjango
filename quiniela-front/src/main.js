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

require('./plugins')

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
