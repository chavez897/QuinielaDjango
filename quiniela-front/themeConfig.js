// MAIN COLORS - VUESAX THEME COLORS
let colors = {
  primary: '#2748A0',
  success: '#7EC544',
  danger: '#EE7155',
  warning: '#FF9F43',
  dark: '#1E1E1E',
}

// CONFIGS
const themeConfig = {
  disableCustomizer: false, // options[Boolean] : true, false(default)
  disableThemeTour: false, // options[Boolean] : true, false(default)
  footerType: 'static', // options[String]  : static(default) / sticky / hidden
  hideScrollToTop: false, // options[Boolean] : true, false(default)
  mainLayoutType: 'horizontal', // options[String]  : vertical(default) / horizontal
  navbarColor: '#fff', // options[String]  : HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
  navbarType: 'static', // options[String]  : floating(default) / static / sticky / hidden
  routerTransition: 'fade', // options[String]  : zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
  rtl: false, // options[Boolean] : true, false(default)
  sidebarCollapsed: false, // options[Boolean] : true, false(default)
  theme: 'light', // options[String]  : "light"(default), "dark", "semi-dark"

  // Not required yet - WIP
  userInfoLocalStorageKey: 'userInfo',

  // NOTE: themeTour will be disabled in screens < 1200. Please refer docs for more info.
}

import Vue from 'vue'
import Vuesax from 'vuesax'
Vue.use(Vuesax, { theme: { colors }, rtl: themeConfig.rtl })

export default themeConfig