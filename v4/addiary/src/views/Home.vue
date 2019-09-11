<template>
  <v-container fluid fill-height class="home-backgroung">
    <v-layout align-center justify-center>
      <section>
        <v-layout column align-center justify-center class="white--text">
            <h1
              class="white--text mb-2 display-1 text-xs-center"
              style="font-weight: 900; text-shadow: 3px 2px #000000"
            >{{$lang.messages.AppName}}</h1>
            <div
              class="white--text subheading mb-3 text-xs-center"
              style="font-weight: 900; text-shadow: 2px 2px #000000"
            >{{userName}}</div>
            <v-btn class="blue lighten-2 mt-5" dark large href="/diary">{{$lang.messages.gotoDiary}}</v-btn>
          </v-layout>
      </section>
    </v-layout>
  </v-container>
</template>

<script>
export default {
   computed: {
      userName() {
        return this.$store.getters.userName;
      }
   }
};
</script>

<style lang="sass">
  .home-backgroung
    background-image: url('https://firebasestorage.googleapis.com/v0/b/addiary-f4f05.appspot.com/o/bright-light-textures2.jpg?alt=media&token=6f5d2c92-848c-43cc-9674-6d8ef7bfebaa')
    background-repeat: repeat
</style>
