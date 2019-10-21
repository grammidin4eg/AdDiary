<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 class="reg-card">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{formTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link v-if="isLogin" to="/reg"><v-btn class="ml-2" outlined color="white">{{$lang.messages.Registration}}</v-btn></router-link>
            <router-link v-if="!isLogin" to="/login"><v-btn class="ml-2" outlined color="white">{{$lang.messages.Login}}</v-btn></router-link>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                :label="$lang.messages.email"
                name="login"
                prepend-icon="person"
                v-model="login"
                :rules="[rules.required, rules.email]"
                :disabled="loading"
                type="mail"
              ></v-text-field>

              <v-text-field
                id="password"
                :label="$lang.messages.password"
                name="password"
                prepend-icon="lock"
                counter
                v-model="password"
                v-on:keypress.enter.prevent="validate()"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                :disabled="loading"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link v-if="isLogin" to="/restore" class="mr-4">{{$lang.messages.fogotPassword}}</router-link>
            <v-btn
                    v-if="isLogin"
                    text
                    icon
                    color="primary"
                    :title="$lang.messages.authGoogle"
                    @click.prevent="validateGoogle()"
                    :loading="loading"
                    :disabled="loading"
            ><v-icon>mdi-google</v-icon></v-btn>
            <v-btn
              color="primary"
              @click.prevent="validate()"
              :loading="loading"
              :disabled="loading"
            >{{formTitle}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      login: "",
      show1: false,
      loading: false,
      rules: {
        required: value => !!value || this.$lang.messages.Required,
        min: v => v.length >= 7 || this.$lang.messages.min7char,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || this.$lang.messages.invalidEmail;
        }
      }
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const action = this.isLogin ? "login" : "registration";
        this.$store.dispatch(action, {
          login: this.login,
          password: this.password
        });
        if ((this.$route.name === "login") && localStorage) {
          localStorage.setItem('addiary-login', this.login);
        }
      }
    },

    validateGoogle() {
      this.$store.dispatch('googleLogin');
    }
  },

  created() {
    if ((this.$route.name === "login") && localStorage) {
      const storedLogin = localStorage.getItem('addiary-login');
      if (storedLogin) {
        this.login = storedLogin;
      }
    }
  },

  computed: {
    isError() {
      return this.$store.getters.isError;
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
    isLogin() {
      return this.$route.name === "login";
    },
    formTitle() {
      return this.isLogin
        ? this.$lang.messages.Login
        : this.$lang.messages.Registration;
    }
  },

  watch: {
    isError(value) {
      if (value && this.loading) {
        this.loading = false;
      }
    },
    isAuth(value) {
      if (value) {
        const page = this.isLogin ? '/' : '/profile';
        this.$router.push(page);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  .reg-card
    min-height: 323px
</style>