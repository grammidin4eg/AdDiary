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

import firebaseConfig from './firebaseconfig';

import VueGoogleCharts from 'vue-google-charts';

import VueWindowSize from 'vue-window-size';

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);


Lang.requireAll(require.context('./lang', true, /\.js$/));
 
Vue.use(Lang);

//this.$lang.setLang('ru');

Vue.use(VueTheMask);

Vue.use(VueGoogleCharts);

Vue.use(VueWindowSize);


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
