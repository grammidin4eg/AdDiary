<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="day"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.day" :label="$lang.messages.Day"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.sys" label="SYS"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.dia" label="DIA"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.pulse" :label="$lang.messages.Pulse"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.comment" :label="$lang.messages.Comment"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">{{$lang.messages.Cancel}}</v-btn>
              <v-btn color="blue darken-1" text @click="save">{{$lang.messages.Save}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:item.am="{ item }">
      <span v-if="item.am">{{$lang.messages.Morning}}</span>
      <span v-if="!item.am">{{$lang.messages.Evening}}</span>
    </template>
    <template v-slot:item.day="{ item }">
      <span v-if="!item.secondDay">{{item.day}}</span>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      editedIndex: -1,
      editedItem: {
        day: '',
        sys: 0,
        dia: 0,
        pulse: 0,
        comment: 0,
      },
      defaultItem: {
        day: '',
        sys: 0,
        dia: 0,
        pulse: 0,
        comment: 0,
      },
    }),

    computed: {
      headers() {
        return [
          {text: this.$lang.messages.Day, align: 'left', width: 40, value: 'day', divider: true },
          {text: this.$lang.messages.TimesOfDay, width: 50, value: 'am', divider: true, sortable: false },
          { text: 'SYS', value: 'sys', width: 50, sortable: false},
          { text: 'DIA', value: 'dia', width: 50, sortable: false },
          { text: this.$lang.messages.Pulse, value: 'pulse', width: 50, divider: true, sortable: false },
          { text: this.$lang.messages.Comment, value: 'comment', sortable: false },
          { text: '', value: 'action', sortable: false, align: 'right', width: 100 },
        ];
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      items() {
          return this.$store.getters.items;
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm(this.$lang.messages.DELETE_MSG) && this.items.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>