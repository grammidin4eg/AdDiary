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
                    :rules="[rules.lenAge]"
                    type="text"
            ></v-text-field>
            <v-text-field
                    :label="$lang.messages.Weight"
                    name="weight"
                    v-model="weight"
                    :rules="[rules.lenAge]"
                    type="text"
            ></v-text-field>
          </v-form>
        </v-row>
        <v-row class="mt-8 ml-8">
          <v-btn
                  color="primary"
                  @click.prevent="saveUserOptions()"
          >{{$lang.messages.Save}}
          </v-btn>
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
      computed: {

      },
      methods: {
         saveUserOptions() {
            if (this.$refs.form.validate()) {
               //
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
         }
      }
   }
</script>