import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
const ViewTodos = () => import('@/views//ViewTodos');
const ViewLogIn = () => import('@/views/ViewLogIn');
const ViewSignIn = () => import('@/views/ViewSignIn');

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    meta: {layout: 'LayoutAuth'},
    component: ViewLogIn
  },
  {
    path: '/signin',
    meta: {layout: 'LayoutAuth'},
    component: ViewSignIn
  },
  {
    path: '/',
    meta: { auth: true, layout: 'LayoutMain'},
    component: ViewTodos,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  return authMiddleware({ to, from, next, store });
})

function authMiddleware({ to, from, next, store }) {
  if (to.meta.auth && !store.getters.isAuth) next('/login');
  next()
}

export default router
