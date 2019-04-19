<template>
  <div class="container-fluid adtable">
    <div v-if="regError" class="alert alert-danger" role="alert">{{ regError }}</div>
    <editor v-if="showEditor" :itemProp="curEditItem" @endEdit="editorEndEdit"/>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" colspan="3">Утро</th>
          <th scope="col" colspan="3">Вечер</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
        <tr>
          <th scope="col">Дата</th>
          <th scope="col">sys</th>
          <th scope="col">dia</th>
          <th scope="col">пульс</th>
          <th scope="col">sys</th>
          <th scope="col">dia</th>
          <th scope="col">пульс</th>
          <th scope="col">Состояние</th>
          <th scope="col">Лекарства</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="table-row" @click="onItemClick(item)">
          <th scope="row">{{ item.date }}</th>
          <td>{{ item.period1.sys }}</td>
          <td>{{ item.period1.dia }}</td>
          <td>{{ item.period1.pulse }}</td>
          <td>{{ item.period2.sys }}</td>
          <td>{{ item.period2.dia }}</td>
          <td>{{ item.period2.pulse }}</td>
          <td>{{ item.comment }}</td>
          <td>{{ item.med }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdDiaryService from "../addiary-service";
import Editor from './Editor';

const adDiaryService = new AdDiaryService();

export default {
  name: "AdTable",
  props: {
    user: Object
  },
  data() {
    return {
      regError: null,
      itemsData: null,
      curEditItem: {},
      showEditor: false
    };
  },
  computed: {
    items() {      
      if (this.user) {
        if (this.itemsData) {
          return this.itemsData;
        } else {
          this.loadTable();
          return null;
        }
      } 

      return null;      
    }
  },
  methods: {
    loadTable() {
      adDiaryService.list(this.user.id).then(result => {
        console.log("result list", result);
         this.itemsData = result;
      }, this.showError);
    },

    onItemClick(item) {
      console.log('item click', item);
      this.curEditItem = item;
      this.showEditor = true;
    },

    editorEndEdit() {
      this.showEditor = false;
    }
  },
  components: {
    Editor
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th, td {
  text-align: center;
}

tr.table-row:hover {
  background-color: blanchedalmond;
  cursor: pointer;
}

.adtable {
  flex-grow: 1;
}
</style>