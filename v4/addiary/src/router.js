import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reg',
      name: 'registration',
      component: () => import('./views/Registration.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Registration.vue')
    },
    {
      path: '/diary',
      name: 'diary',
      beforeEnter: AuthGuard,
      component: () => import('./views/Diary.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history'
})

function AuthGuard(from, to, next) {
  if (Store.getters.isAuth) {
    next();
  } else {
    next('/login');
  }
}
