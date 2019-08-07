<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <span class="font-weight-light">{{$lang.messages.AppName}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- кнопка смены языка -->
      <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on }">
        <v-btn text small v-on="on">
          {{curLang}}
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="onChangeLang('en')">
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onChangeLang('ru')">
          <v-list-item-title>Русский</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

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

export default {
  name: 'App',
  components: {
  },
  beforeMount() {
    let language = window.navigator ? (window.navigator.language ||
                  window.navigator.systemLanguage ||
                  window.navigator.userLanguage) : "en";
    language = language.substr(0, 2).toLowerCase();

    if (language === 'ru') {
      this.curLang = language;
      this.$lang.setLang(language);
    }
  },
  data: () => ({
    curLang: 'en'
  }),
  computed: {
    error() {
      return this.$store.getters.getError
    }
  }, 
  methods: {
    onChangeLang(value) {
      this.$lang.setLang(value);
      this.curLang = value;
    }
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
  
</style>

