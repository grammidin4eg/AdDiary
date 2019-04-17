<template>
  <div id="app">
    <landing v-if="showLanding" v-on:openDiary="openDiary"></landing>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <AdTable v-if="showTable" :user="user"/>
    <div class="row footer-block">
      <div class="col-lg-6 h-100 text-center text-lg-left my-auto">
        <ul class="list-inline mb-2 footer-button-container">
          <li class="list-inline-item">
            <a href="#">О проекте</a>
          </li>
          <li class="list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a href="#">Контакты</a>
          </li>
          <li class="list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a href="#">Поддержать</a>
          </li>
          <li class="list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
        <p class="text-muted small mb-4 mb-lg-0">&copy; Карачевцев Ю.Ю. 2019. Все права защищены.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AdTable from "./components/AdTable.vue";
import Landing from "./components/Landing.vue";

const APP_STATE = {
  LANDING: 0,
  TABLE: 1
};

export default {
  name: "app",
  components: {
    AdTable,
    Landing
  },
  data() {
    return {
      appState: APP_STATE.LANDING,
      user: null
    };
  },

  created() {    
    const savedUserVal = localStorage.getItem('adDiaryUserObj');
    if (savedUserVal) {      
      this.openDiary(JSON.parse(savedUserVal));
    }    
  },

  methods: {
    openDiary(user) {
      this.user = user;      
      this.appState = APP_STATE.TABLE;
    }
  },

  computed: {
    showLanding() {
      return this.appState === APP_STATE.LANDING;
    },

    showTable() {
      return this.appState === APP_STATE.TABLE;
    }
  }
};
</script>

<style>
.footer-block {
    background-color: currentColor;
    margin-top: 12px;
    width: 100%;
}

.footer-button-container {
    margin-top: 8px;
}
</style>
