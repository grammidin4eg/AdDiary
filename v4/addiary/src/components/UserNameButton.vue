<template>
    <v-menu transition="slide-y-transition" bottom v-if="userName">
      <template v-slot:activator="{ on }">
        <v-btn text small v-on="on" :title="userName">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="v-list-item--link">
           <router-link to="/profile" tag="div">{{$lang.messages.UserSettings}}</router-link>
        </v-list-item>
        <v-list-item @click="onLogOut()">
          <v-list-item-title>{{$lang.messages.Exit}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'LangButton',
    data: () => ({
        
    }),
    methods: {
        onLogOut() {
            this.$store.dispatch('clearUser');
            this.$router.push("/login");
        }
    },
    computed: {
        userName() {
            return this.$store.getters.userName;
        }
    }
}
</script>

<style lang="sass" scoped>
  .headline__user-name
    display: inline-block
    max-width: 200px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    color: gray
  
</style>