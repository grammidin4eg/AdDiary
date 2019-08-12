<template>
  <div class="container-fluid">
    <div class="row logo-block">
      <div class="col-md-12 logo">
        <div class="title-panel top-panel" v-if="showLanding">
          <h2>Электронный дневник давления</h2>
          <div class="button-panel">
            <button type="button" class="btn btn-primary" @click="openLoginForm()">Войти</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="openRegistrationForm()"
            >Регистрация</button>
          </div>
        </div>
        <div class="registration-panel top-panel" v-if="showRegistrationForm">
          <div v-if="regError" class="alert alert-danger" role="alert">{{ regError }}</div>
          <h4 v-if="!regError">Регистрация</h4>
          <form>
            <div class="form-group">
              <label for="regEmail">Почта</label>
              <input
                v-model.lazy.trim="regEmail"
                :class="formRegEmail"
                type="email"
                class="form-control"
                id="regEmail"
                placeholder="Почта"
              >
            </div>
            <div class="form-group" v-if="!isLoginForm">
              <label for="regAge">Возраст</label>
              <input
                v-model.lazy.number="regAge"
                :class="formRegAge"
                type="number"
                class="form-control"
                id="regAge"
                placeholder="Возраст"
              >
            </div>
            <div class="form-group">
              <label for="regPassword">Пароль</label>
              <input
                v-model.trim="regPassword"
                :class="formRegPassword"
                type="password"
                class="form-control"
                id="regPassword"
                placeholder="Пароль"
              >
            </div>
            <div class="btn-group" role="group" aria-label="Basic example">
              <fieldset :disabled="disabledRegSubmit">
                <button
                  type="submit"
                  @click.prevent="regFormConfirm()"
                  class="btn btn-default btn-primary"
                  v-if="!isLoginForm"
                >Регистрация</button>
                <button
                  type="submit"
                  @click.prevent="regFormConfirm()"
                  class="btn btn-default btn-primary"
                  v-if="isLoginForm"
                >Войти</button>
              </fieldset>
              <button @click="regFormCancel()" type="button" class="btn btn-secondary">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row delimer"></div>
    <div class="row info-block">
      <div class="col-lg-4">
        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
          <i class="fas fa-clock feature-icon"></i>
          <h3>Измеряйте регулярно</h3>
          <p class="lead mb-0">
            Регулярные записи значений АД очень полезны для врача. На их основе он может скорректировать
            назначенное пациенту лечение.
          </p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
          <i class="fas fa-desktop feature-icon"></i>
          <h3>Электронный дневник</h3>
          <div class="lead mb-0 device-features">
            <ul>
              <li>Доступен всегда, с любого компьютера, телефона</li>
              <li>Удобно заполнять</li>
              <li>Сам считает средние показатели АД</li>
              <li>Подсвечивает дни, когда давление было высоким</li>
              <li>Удобно просматривать измерения</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="features-icons-item mx-auto mb-0 mb-lg-3">
          <i class="fas fa-cloud feature-icon"></i>
          <h3>Поделиться записями</h3>
          <p class="lead mb-0">Сохраните на компьютер или распечатайте.</p>
          <p
            class="lead mb-0"
          >Можно кинуть ссылку на ваш дневник. Удобно при онлайн консультации с врачом.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../user-service';

const userService = new UserService();

const LANDING_STATE = {
    LANDING: 0,
    REGISTRATION_FORM: 1,
    LOGIN_FORM: 2,
    TABLE: 3
};

export default {
  name: "landing",
  props: {
    
  },
  data() {
      return {
          curState: LANDING_STATE.LANDING,
        regEmail: '',
        regAge: '',
        regPassword: '',
        regError: '',
        userObj: null
      }
  },

  methods: {
    clearForm() {
      this.regEmail = "";
      this.regAge = "";
      this.regPassword = "";
      this.regError = "";
    },

    openRegistrationForm() {
      this.clearForm();
      this.curState = LANDING_STATE.REGISTRATION_FORM;
    },

    openLoginForm() {
      this.clearForm();
      this.curState = LANDING_STATE.LOGIN_FORM;
    },

    showError(error) {
      console.error("error", error);
      this.regError = error;
    },

    login(_userObj) {      
      this.regError = "";
      if (_userObj.id) {
        userService.saveLocal(_userObj);
        this.userObj = _userObj;
        this.loadTable();
      }
    },

    regFormConfirm() {
      if (this.isLoginForm) {
        userService
          .login(this.regEmail, this.regPassword)
          .then(this.login, this.showError);
      } else {
        userService
          .register(this.regEmail, this.regPassword, this.regAge)
          .then(this.login, this.showError);
      }
    },

    regFormCancel() {
      this.curState = LANDING_STATE.LANDING;
    },

    loadTable() {
      this.curState = LANDING_STATE.TABLE;
      this.$emit('openDiary', this.userObj);
    }
  },

  computed: {
    showRegistrationForm() {
      return (
        this.curState === LANDING_STATE.REGISTRATION_FORM ||
        this.curState === LANDING_STATE.LOGIN_FORM
      );
    },

    isLoginForm() {
      return this.curState === LANDING_STATE.LOGIN_FORM;
    },

    showLanding() {
      return this.curState === LANDING_STATE.LANDING;
    },

    showTable() {
      return this.curState === LANDING_STATE.TABLE;
    },

    disabledRegSubmit() {
      return !(
        this.formRegEmail &&
        (this.formRegAge || this.curState === LANDING_STATE.LOGIN_FORM) &&
        this.regPassword
      );
    },

    formRegEmail() {
      return this.regEmail ? "is-valid" : ""; //is-invalid
    },

    formRegAge() {
      if (!this.regAge) {
        return "";
      }
      var val = parseInt(this.regAge);
      return val && !Number.isNaN(val) && val > 0 && val < 200
        ? "is-valid"
        : ""; //is-invalid
    },

    formRegPassword() {
      return !!this.regPassword && this.regPassword.length > 4
        ? "is-valid"
        : "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
    background-color: #00000063;
    height: 58vmax;    
    text-align: center;
    /*background-image: url(./img/logo_400_240.jpg);
    background-blend-mode: color;
    background-repeat: no-repeat;
    background-position: center;*/
}

.button-panel {
    margin-top: 20px;
}

.button-panel button {
  margin-right: 12px;
}

.info-block {
    text-align: center;
}

.device-features {
    text-align: left;
}

.feature-icon {
    font-size: 60px;
    margin: 12px 0;
}

@media screen and (min-width: 768px) {
    .logo {
        background-image: url(../assets/logo_1600_900.jpg);
        background-blend-mode: color;
        background-repeat: no-repeat;
        background-position: center;
        height: 46vmax;
        max-height: 450px;
    }
}

.logo h2 {
    color: white;
}

.registration-panel {
    text-align: left;
    color: white;    
    max-height: 340px;
}

.title-panel {
    max-height: 149px;
}

.top-panel {
    max-width: 400px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;    
}
</style>
