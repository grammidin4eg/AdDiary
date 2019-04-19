<template>
    <div class="editor">
        <div class="first">
            <div class="date">{{item.date}}</div>
            <div class="resizer"></div>
            <div class="period-buttons">
                <button type="button" class="btn" :class="butonDayClass" @click="switchBtn(true)">Утро</button>
                <button type="button" class="btn" :class="butonNightClass" @click="switchBtn(false)">Вечер</button>
            </div>
        </div>
        <div class="ad">
            <input                                
                type="text"
                class="form-control"
                id="regEmail"
                placeholder="sys/dis/пульс"
                v-model="inputModel"
              >
        </div>
        <div class="meds"></div>
        <div class="comment"></div>
        <div class="func-button">
            <button type="button" class="btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-primary" @click="close">Закрыть</button>
            <button type="button" class="btn btn-primary">Удалить</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "editor",
    props: {
        itemProp: Object
    },
    data() {
        return {
            item: this.itemProp,
            switcherDay: true,
            inputModel: '',
            imputObj: this.itemProp.period1,
            firstLoad: true
        }
    },
    beforeUpdate() {
        console.log('update', this.firstLoad, this.imputObj, this.inputModel);
        if (!this.firstLoad) {
            this.firstLoad = false;
            if (this.imputObj.sys) {
                this.inputModel = `${this.imputObj.sys}/${this.imputObj.dia}/${this.imputObj.pulse}`;
            }
        }        
    },
    methods: {
        close() {
            this.$emit('endEdit');
        },

        switchBtn(val) {            
            this.switcherDay = val;
        }
    },
    computed: {
        butonDayClass() {
            return (this.switcherDay) ? 'btn-success' : 'btn-light';
        },

        butonNightClass() {
            return (this.switcherDay) ? 'btn-light' : 'btn-success';
        }
    }
}
</script>
<style scoped>
.editor {
    position: absolute;
    height: 180px;
    width: 50%;
    background-color: aliceblue;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: solid 2px #908b8b;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    padding: 12px;
}

button {
    margin-left: 2px;
}

.first {
    display: flex;
    margin-bottom: 12px;
    align-items: center;
}

.resizer {
    flex-grow: 1;
}

.func-button {
    float: right;
}
</style>


