<template>
  <v-container fluid fill-height>
    <v-layout class="ml-8">
      <v-flex>
        <v-row>
          <div class="title">{{$lang.messages.UserSettings}}</div>
        </v-row>
        <v-row>
          <div class="subtitle-1">{{userName}}</div>
        </v-row>
        <v-row class="mt-8 ml-8">
          <v-form ref="form">
            <v-text-field
                    :label="$lang.messages.Age"
                    name="birth"
                    v-model="birth"
                    type="number"
                    :rules="[rules.lenAge]"
            ></v-text-field>
            <v-text-field
                    :label="$lang.messages.Weight"
                    name="weight"
                    v-model="weight"
                    type="number"
                    :rules="[rules.lenAge]"
            ></v-text-field>
          </v-form>
        </v-row>
        <v-row class="mt-8 ml-8">
          <v-btn
                  color="primary"
                  @click.prevent="saveUserOptions()"
          >{{$lang.messages.Save}}
          </v-btn>
           <router-link to="/" class="ml-4" tag="span">
              <v-btn>{{$lang.messages.Cancel}}</v-btn>
           </router-link>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
   export default {
      name: 'UserProfile',
      data() {
         return {
            birth: null,
            weight: null,
            rules: {
               lenAge: value => {
                  return !value || this.ruleNumber(value, 300);
               }
            }
         }
      },
      created() {
         this.$store.dispatch('getUserProfile');
      },
      methods: {
         saveUserOptions() {
            if (this.$refs.form.validate()) {
               this.$store.dispatch('setUserProfile', {
                  birth: this.birth,
                  weight: this.weight
               });
               this.$router.push('/');
            }
         },

         ruleNumber(value, len) {
            const val = parseInt(value, 10);
            if (!val || (value.match && !value.match(/^\d+$/)) || isNaN(val)) {
               return this.$lang.messages.ruleNumber;
            }
            return val > len ? this.$lang.messages.ruleNumberVal : false;
         }
      },
      computed: {
         userName() {
            return this.$store.getters.userName;
         },
         userProfile() {
            return this.$store.getters.userProfile;
         }
      },
      watch: {
         userProfile(value) {
            this.birth = value.birth;
            this.weight = value.weight;
         }
      }
   }
</script>