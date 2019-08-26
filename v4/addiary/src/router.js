import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase/app'

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
      beforeEnter: logOut,
      component: () => import('./views/Registration.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: logOut,
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

function checkAuth(next, waitCounter) {
  if (firebase.auth().currentUser) {
    next();
  } else {
    if (waitCounter) {
      setTimeout(() => {
        waitCounter--;
        checkAuth(next, waitCounter)
      }, 100);
    } else {
      next('/login');
    }
  }
}

function AuthGuard(from, to, next) {
  checkAuth(next, 10);
}

function logOut(from, to, next) {
  firebase.auth().signOut();
  next();
}
