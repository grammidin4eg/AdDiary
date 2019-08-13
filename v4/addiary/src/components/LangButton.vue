<template>
    <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on }">
        <v-btn text small v-on="on">
          {{curLang}}
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="onChangeLang('en')">
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onChangeLang('ru')">
          <v-list-item-title>Русский</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
    data: () => ({
        
    }),
    methods: {
        onChangeLang(value) {
            this.$lang.setLang(value);
            this.$store.dispatch('setLang', value);
        }
    },
    computed: {
        curLang() {
            return this.$store.getters.lang;
        }
    }
}
</script>