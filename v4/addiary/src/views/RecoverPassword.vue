<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 class="reg-card">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{$lang.messages.Restore}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/reg"><v-btn class="ml-2" outlined color="white">{{$lang.messages.Registration}}</v-btn></router-link>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="validate()"
              :loading="loading"
              :disabled="loading"
            >{{$lang.messages.Restore}}</v-btn>
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
      login: "",
      show1: false,
      loading: false,
      rules: {
        required: value => !!value || this.$lang.messages.Required,
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
        this.$store.dispatch("recover", this.login);
      }
    }
  },

  computed: {
    isError() {
      return this.$store.getters.isError;
    },
    getEvent() {
      return this.$store.getters.getEvent;
    }
  },

  watch: {
    isError(value) {
      if (value && this.loading) {
        this.loading = false;
      }
    },
    getEvent(value) {
      if (value === 'recover-done') {
        this.$store.dispatch("clearEvent");
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  .reg-card
    min-height: 323px
</style>