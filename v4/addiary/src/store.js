import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './store/user'
import commonModule from './store/common'
import diaryModule from './store/diary'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    commonModule,
    diaryModule
  }
})
