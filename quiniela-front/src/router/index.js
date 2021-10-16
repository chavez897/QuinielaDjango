import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '*',
    name: 'index',
    redirect: {
      name: 'Login',
    },
  },
  {
    path: '/login',
    name: 'Login',
    props: true,
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/LoginView.vue'),
    meta: {
      breadcrumb: [{ title: 'Login', active: true }],
      pageTitle: 'Login',
      rule: 'public',
    },
  },
  {
    path: '/my-leagues',
    name: 'MyLeagues',
    props: true,
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/MyLeagues.vue'),
    meta: {
      breadcrumb: [{ title: 'Login', active: true }],
      pageTitle: 'Login',
      rule: 'public',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
