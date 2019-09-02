<template>
  <div class="diary">
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="diaryLoading"
      disable-sort
      hide-default-footer
      :items-per-page="100"
      class="elevation-1"
      ref="datatable"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="600px">
            <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>-->
            <v-card>
              <v-form ref="form">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs3 sm3 md2>
                      <v-text-field
                        v-model="editedItem.day"
                        :label="$lang.messages.Day"
                        :rules="[rules.required, rules.lenMonth]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md3>
                      <v-menu
                              ref="timeMenu"
                              v-model="timeMenu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="editedItem.time"
                              transition="scale-transition"
                              offset-y
                              full-width
                              max-width="290px"
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  v-model="editedItem.time"
                                  :label="$lang.messages.Time"
                                  prepend-icon="access_time"
                                  readonly
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                                v-if="timeMenu"
                                v-model="editedItem.time"
                                format="24hr"
                                full-width
                                @click:minute="$refs.timeMenu.save(editedItem.time)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="editedItem.sys"
                        label="SYS"
                        v-if="dialog"
                        autofocus
                        :rules="[rules.required, rules.lenField]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="editedItem.dia"
                        label="DIA"
                        :rules="[rules.required, rules.lenField]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="editedItem.pulse"
                        v-on:keypress.enter.prevent="save()"
                        :label="$lang.messages.Pulse"
                        :rules="[rules.required, rules.lenField]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex>
                      <v-text-field
                        v-model="editedItem.comment"
                        v-on:keypress.enter.prevent="save()"
                        :label="$lang.messages.Comment"
                        :rules="[rules.maxStr]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn color="red darken-1" text @click="deleteItem(editedItem);close()">{{$lang.messages.Delete}}</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{$lang.messages.Cancel}}</v-btn>
                <v-btn color="blue darken-1" text @click="save">{{$lang.messages.Save}}</v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item="{item}">
        <tr @click="editItem(item)" class="data-grid-row">
          <td class="text-left">
            <span v-if="!item.secondDay">{{item.day}}</span>
          </td>
          <td class="text-start">
            <span v-if="!isPmValue(item)">{{$lang.messages.Morning}}</span>
            <span v-if="isPmValue(item)">{{$lang.messages.Evening}}</span>
          </td>
          <td class="text-start">{{item.time}}</td>
          <td class="text-start">{{item.sys}}</td>
          <td class="text-start">{{item.dia}}</td>
          <td class="text-start">{{item.pulse}}</td>
          <td class="text-start">{{item.comment}}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn color="pink" dark fixed right fab class="add-button" @click="createItem">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import { mask } from 'vue-the-mask';

export default {
  directives: {mask},
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        day: 0,
        sys: 0,
        dia: 0,
        pulse: 0,
        comment: 0,
        time: '',
        timeMask: '##:##'
      },
      defaultItem: {
        day: new Date().getDate(),
        sys: null,
        dia: null,
        pulse: null,
        comment: null,
        time: new Date().toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'}),
        timeMask: '##:##'
      },
      rules: {
        required: value => !!value || this.$lang.messages.Required,
        lenMonth: value => {
          return this.ruleNumber(value, 31);
        },
        lenField: value => {
          return this.ruleNumber(value, 300);
        },
        maxStr: v => !v || v.length < 60 || this.$lang.messages.ruleMaxComment
      },
      timeMenu: null
    };
  },

  computed: {
    headers() {
      return [
        {
          text: this.$lang.messages.Day,
          align: "left",
          width: 40,
          value: "day",
          divider: true,
          sortable: false
        },
        {
          text: this.$lang.messages.TimesOfDay,
          width: 50,
          value: "am",
          divider: true,
          sortable: false
        },
        {
          text: this.$lang.messages.Time,
          width: 50,
          value: "time",
          divider: true,
          sortable: false
        },
        { text: "SYS", value: "sys", width: 50, sortable: false },
        { text: "DIA", value: "dia", width: 50, sortable: false },
        {
          text: this.$lang.messages.Pulse,
          value: "pulse",
          width: 50,
          divider: true,
          sortable: false
        },
        {
          text: this.$lang.messages.Comment,
          value: "comment",
          sortable: false
        }
      ];
    },
    formTitle() {
      let title =
        this.editedIndex === -1
          ? this.$lang.messages.NewItem
          : this.$lang.messages.EditItem;
      return `${title} (${this.editedItem.day}.${this.monthText}.${this.year})`;
    },
    items() {
      return this.$store.getters.items;
    },
    year() {
      return this.$store.getters.year;
    },
    month() {
      return this.$store.getters.month;
    },
    monthText() {
      return this.month < 10 ? "0" + this.month : this.month;
    },
    diaryLoading() {
      return this.$store.getters.diaryLoading;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.timeMask = this.defaultItem.timeMask;
      this.editedItem.time = item.time || '';
      this.dialog = true;
    },

    createItem() {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedItem.time = new Date().toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'});
      this.dialog = true;
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation();
        }
      }, 200);
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      if (confirm(this.$lang.messages.DELETE_MSG)) {
        this.$store.dispatch('deleteItem', item.id);
        this.items.splice(index, 1);
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem);
          this.$store.dispatch('setItem', this.editedItem);
        } else {
          this.items.push(this.editedItem);
          this.$store.dispatch('addItem', this.editedItem);
        }
        this.close();
      }
    },

    ruleNumber(value, len) {
      const val = parseInt(value, 10);
      if (!val || isNaN(val)) {
        return this.$lang.messages.ruleNumber;
      }
      return val > len ? this.$lang.messages.ruleNumberVal : false;
    },

    isPmValue(item) {
       if (!item || !item.time) {
          return null;
       }
       return (parseInt(item.time.substr(0, 2), 10) > 17);
    }
  }
};
</script>

<style lang="sass" scoped>
.add-button
  bottom: 15px

.data-grid-row
  cursor: pointer
</style>

<style lang="scss">
.diary .v-toolbar__content {
  display: none;
  visibility: hidden;
}

.diary .v-data-table__wrapper {
  margin-top: 8px;
}

.diary .v-data-table-header-mobile {
  display: none;
}

tr.data-grid-row {
  cursor: pointer;
}
</style>