<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
       <router-link to="/reg">Registration</router-link>
       | <router-link to="/login">Login</router-link>
       | <router-link to="/diary">Diary page</router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({

  })
};
</script>
