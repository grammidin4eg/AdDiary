<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline title-container">
        <router-link to="/" class="headline__link"><span class="font-weight-light">{{$lang.messages.AppName}}</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- выбор даты -->
      <month-picker></month-picker>
      <v-spacer></v-spacer>
      <!-- кнопка смены языка -->
      <lang-button></lang-button>

    </v-app-bar>

    <v-content>
      <v-alert class="error-alert" v-if="error" dismissible color="red" border="left" elevation="2" colored-border icon="mdi-cloud-alert">
      {{error}}
    </v-alert>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import LangButton from './components/LangButton'
import MonthPicker from './components/MonthPicker'

export default {
  name: 'App',
  components: {
    LangButton,
    MonthPicker
  },
  beforeMount() {
    let language = window.navigator ? (window.navigator.language ||
                  window.navigator.systemLanguage ||
                  window.navigator.userLanguage) : "en";
    language = language.substr(0, 2).toLowerCase();

    if (language === 'ru') {
      this.curLang = language;
      this.$lang.setLang(language);
      this.$store.dispatch('setLang', language);
    }
  },
  data: () => ({
    
  }),
  computed: {
    error() {
      return this.$store.getters.getError
    }
  }, 
  methods: {
  }
};
</script>

<style lang="sass" scoped>
  .error-alert
    position: fixed
    top: 0px
    left: 0px
    z-index: 100
    right: 0px
  
  .title-container
    width: 30%
  
</style>

