<template>
    <v-flex xs11 sm5 class="headline__link__month-picker-panel">
      <v-btn class="mx-2" fab small outlined @click="changeDate(-1)" :disabled="diaryLoading">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn> 
      <div class="headline__link__month-picker-panel__field"> 
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        :disabled="diaryLoading"
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label=""
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker @input="chooseMonth" v-model="date" type="month" no-title scrollable>
        </v-date-picker>
      </v-menu>
      </div>

      <v-btn class="mx-2" fab small outlined @click="changeDate(1)" :disabled="diaryLoading">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      </v-flex>
</template>

<script>
export default {
    name: 'MonthPicker',
    data: () => ({
        date: new Date().toISOString().substr(0, 7),
        menu: false
    }),
    computed: {
       diaryLoading() {
          return this.$store.getters.diaryLoading;
       }
    },
    methods: {
        getDateObj(date) {
          if (!date) {
            date = this.date;
          }
          return new Date(date + '-01');
        },

        changeDate(delimer) {
            const curDate = this.getDateObj();
            const curMonth = curDate.getMonth() + delimer;
            curDate.setMonth(curMonth);
            this.setNewDate(curDate);
        },

        chooseMonth(date) {
          this.$refs.menu.save(date);
          this.menu = false;
          this.setNewDate(this.getDateObj(date));
        },

        setNewDate(curDate) {
          this.date = curDate.toISOString().substr(0, 7);
          this.$store.dispatch('setSelectedDate', {
            year: curDate.getFullYear(),
            month: (curDate.getMonth() + 1)
          })
        }
    }
}
</script>

<style lang="sass" scoped>  
  .headline__link
    text-decoration: none
  
  .headline__link__month-picker-panel
    margin-top: 18px
    display: inline-flex
    align-items: baseline
  
  .headline__link__month-picker-panel__field
    max-width: 123px
  
</style>