import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import Store from './store'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: AuthGuard,
      component: () => import('./views/Diary.vue')
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
      path: '/restore',
      name: 'restore',
      component: () => import('./views/RecoverPassword.vue')
    },
    {
      path: '/diary',
      name: 'diary',
      beforeEnter: AuthGuard,
      component: () => import('./views/Diary.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: AuthGuard,
      component: () => import('./views/UserProfile.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history'
})

function checkAuth(next, waitCounter) {
  if (Store.getters.isAuth) {
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
