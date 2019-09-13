<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title v-if="!isMobile" class="headline" :class="{'title-container' : inDiaryPage}">
        <router-link to="/" class="headline__link"><v-icon v-if="!inDiaryPage" x-large color="blue darken-2" class="d-flex d-sm-none home-icon">home</v-icon><span class="font-weight-light d-none d-sm-flex">{{$lang.messages.AppName}}</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- выбор даты -->
      <month-picker v-if="inDiaryPage"></month-picker>
      <v-spacer></v-spacer>
      <!-- кнопка печати -->
      <v-btn v-if="inDiaryPage" text small v-on:click="printTable" :title="$lang.messages.Print">
         <v-icon>mdi-printer</v-icon>
      </v-btn>
      <!-- имя пользователя -->
      <user-name-button></user-name-button>
      <!-- кнопка смены языка -->
      <lang-button></lang-button>

    </v-app-bar>

    <v-content>
      <v-alert class="error-alert" v-if="error" dismissible color="red" border="left" elevation="2" colored-border icon="mdi-cloud-alert">
      {{error}}
    </v-alert>
      <router-view />
    </v-content>
    <v-footer dark class="grey darken-3" absolute>
        <v-flex class="footer-panel">
            <a href="http://karachevtsevuu.ru" class="mr-3" target="_blank">&copy; Karachevtsev Yu.Yu.</a>
            <span class="mr-4"> | </span>
            <a href="mailto:w3gSee@mail.ru" class="mr-3">{{$lang.messages.FindError}}?</a>
            <span class="mr-4"> | </span>
            <a href="https://money.yandex.ru/to/41001512641224" class="mr-3" target="_blank">{{$lang.messages.DonateProject}}</a>
           <span class="mr-4" v-if="isRuLang"> | </span>
           <a href="https://vk.com/addiaryonline" v-if="isRuLang" class="mr-3" target="_blank">Группа вконтакте</a>
        </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
import LangButton from './components/LangButton'
import MonthPicker from './components/MonthPicker'
import UserNameButton from './components/UserNameButton'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'App',
  components: {
    LangButton,
    MonthPicker,
    UserNameButton
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
    },
    inDiaryPage() {
      return (this.$route.name === 'diary') || (this.$route.name === 'home');
    },
    isMobile() {
        return isMobile;
    },
    curMonth() {
       return this.$store.getters.month;
    },
    curYear() {
       return this.$store.getters.year;
    },
    curLang() {
        return this.$store.getters.lang;
    },
    isRuLang() {
       return (this.$store.getters.lang === 'ru');
    }
  }, 
  methods: {
     printTable() {
        const diaryTagSelector = document.getElementsByClassName('diary');
        if (diaryTagSelector.length > 0) {
           const diaryTableTagSelector = diaryTagSelector[0].getElementsByTagName('table');
           if (diaryTableTagSelector.length > 0) {
              const diaryTableTag = diaryTableTagSelector[0];
              const newWin= window.open("");
              newWin.document.write(diaryTableTag.outerHTML);
              const printTable = newWin.document.getElementsByTagName('table')[0];
              printTable.setAttribute('border', '1');
              printTable.setAttribute('align', 'center');
              printTable.setAttribute('frame', 'border');
              printTable.setAttribute('cellspacing', '0');
              printTable.setAttribute('rules', 'all');
              printTable.setAttribute('cellpadding', '10');
              for( let trEl of printTable.getElementsByTagName('td')) {
                 trEl.setAttribute('align', 'center');
                 trEl.setAttribute('nowrap', '');
              }
              printTable.createCaption();
              const printDate = new Date(this.curYear, (this.curMonth - 1), 1);
              const printMonthText = printDate.toLocaleString(this.curLang, {month: 'long'});
              printTable.caption.textContent = `${this.$lang.messages.AppName}, ${printMonthText} ${this.curYear}`;
              newWin.print();
              newWin.close();
           }
        }
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
  
  .title-container
    width: 30%
  
  .home-icon
    width: 40px

  .footer-panel a
    color: white
</style>

