import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// const User = () => import('../views/User.vue')
const Cascadder = () => import('../views/Cascadder/index.vue')
// const Cascadder = () => import('../views/')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Cascadder',
    component: Cascadder
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/** 前置导航守卫 */
router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})

/** 后置导航守卫 */
router.afterEach((to, from) => {
  console.log(to, from)
})


export default router
