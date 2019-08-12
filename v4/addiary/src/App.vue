<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline title-container">
        <router-link to="/" class="headline__link"><span class="font-weight-light">{{$lang.messages.AppName}}</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- выбор даты -->
      <v-flex xs11 sm5 class="headline__link__month-picker-panel">
      <v-btn class="mx-2" fab small outlined @click="changeDate(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn> 
      <div class="headline__link__month-picker-panel__field"> 
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label=""
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker @input="$refs.menu.save(date);menu = false" v-model="date" type="month" no-title scrollable>
        </v-date-picker>
      </v-menu>
      </div>

      <v-btn class="mx-2" fab small outlined @click="changeDate(1)">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      </v-flex>
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
      this.$store.dispatch('setLang', language);
    }
  },
  data: () => ({
    curLang: 'en',
    date: new Date().toISOString().substr(0, 7),
    menu: false,
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
      this.$store.dispatch('setLang', value);
    },
    changeDate(delimer) {
      const curDate = new Date(this.date + '-01');
      const curMonth = curDate.getMonth() + delimer;
      curDate.setMonth(curMonth);
      this.date = curDate.toISOString().substr(0, 7);
      this.$store.dispatch('setSelectedDate', {
        year: curDate.getFullYear(),
        month: (curMonth + 1)
      })
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
  
  .headline__link
    text-decoration: none
  
  .headline__link__month-picker-panel
    margin-top: 18px
    display: inline-flex
    align-items: baseline
  
  .headline__link__month-picker-panel__field
    max-width: 123px
  
  .title-container
    width: 30%
  
</style>

