<template>
        <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Registration</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="e-mail"
                    name="login"
                    prepend-icon="person"
                    v-model="login"
                    :rules="[rules.required, rules.email]"
                    :disabled="loading"
                    type="mail"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    counter
                    v-model="password"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    :disabled="loading"
                    @click:append="show1 = !show1"
                    hint="At least 8 characters"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="validate()" 
                :loading="loading" :disabled="loading">Registration</v-btn>
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
                password: '',
                login: '',
                show1: false,
                loading: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 7 || 'Min 7 characters',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                }
            }
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()) {
                  this.loading = true;
                  this.$store.dispatch('registration', {
                    login: this.login,
                    password: this.password
                  });
                  //console.log('validate');
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>