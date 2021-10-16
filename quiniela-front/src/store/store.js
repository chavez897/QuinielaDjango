import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import VuexPersistence from 'vuex-persist'

import moduleAuth from './auth/moduleAuth.js'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})
export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
  },
  plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== 'production',
})
