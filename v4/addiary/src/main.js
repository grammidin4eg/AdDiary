import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Lang from 'vuejs-localization';

import VueTheMask from 'vue-the-mask';

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyCrtwjN2qoO5gZg53dlrNJat0ydzEgGEWE",
  authDomain: "addiary-e3891.firebaseapp.com",
  databaseURL: "https://addiary-e3891.firebaseio.com",
  projectId: "addiary-e3891",
  storageBucket: "",
  messagingSenderId: "807585666905",
  appId: "1:807585666905:web:db83fd9f501e6b83"
});


Lang.requireAll(require.context('./lang', true, /\.js$/));
 
Vue.use(Lang);

//this.$lang.setLang('ru');

Vue.use(VueTheMask);


new Vue({
  router,
  store,
  vuetify,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('stateChange', user);
    });
  },
  render: h => h(App)
}).$mount('#app')
