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
        id="adEdit"
        placeholder="sys/dis/пульс"
        v-model="inputModel"
        v-on:focus="activatedEdit()"
      />
    </div>
        <div class="meds">
            <label for="adMeds">Лекарства</label>
            <input
                type="text"
                class="form-control"
                id="adMeds"
                placeholder="Лекарства"
                v-model.trim="item.med"
            />
        </div>
        <div class="comment">
            <label for="adComment">Комментарий</label>
            <input
                type="text"
                class="form-control"
                id="adComment"
                placeholder="Комментарий. Например, самочувствие."
                v-model.trim="item.comment"
            />
    </div>
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
            objDay: this.itemProp.period1,
            objEvening: this.itemProp.period2,
            inputObj: this.itemProp.period1,
            inputModel: this.getObjText(this.itemProp.period1),
            lastInputModel: null
        };
    },
    beforeUpdate() {
        console.log("beforeUpdate obj:", this.inputObj, "model:", this.inputModel);
        if (this.lastInputModel !== this.inputModel) {            
            const valueList = this.inputModel.split("/");
            let curIndex = valueList.length - 1;
            let value = parseInt(valueList[curIndex], 10);
            if (isNaN(value)) {
                value = 0;
            }
            if (value > 400) {
                value = valueList[curIndex].charAt(valueList[curIndex].length - 1);
                curIndex++;
            }
            switch (curIndex) {
                case 0:
                    this.inputObj.sys = value;
                    break;
                case 1:
                    this.inputObj.dia = value;
                    break;
                case 2:
                    this.inputObj.pulse = value;
                    break;
            }
            let res =
                this.inputObj.sys && !isNaN(this.inputObj.sys) ?
                "" + this.inputObj.sys :
                "";
            if (this.inputObj.dia && !isNaN(this.inputObj.dia)) {
                res += "/" + this.inputObj.dia;
            }
            if (this.inputObj.pulse && !isNaN(this.inputObj.pulse)) {
                res += "/" + this.inputObj.pulse;
            }
            const nextValue = value * 10;
            if (curIndex < 2 && nextValue > 400) {
                res += "/";
            }
            this.inputModel = res;
            this.lastInputModel = res;
        }

        if (this.item.comment && (this.item.comment.length > 100)) {
            this.item.comment = this.item.comment.substr(0, 100);
        }
    },

    methods: {
        close() {
            this.$emit("endEdit");
        },

        switchBtn(val) {
            this.switcherDay = val;
            this.inputObj = val ? this.objDay : this.objEvening;
            this.inputModel = this.getObjText(this.inputObj);
            console.log('switch', val, this.getObjText(this.inputObj));
        },

        getObjText(obj) {
            return `${obj.sys}/${obj.dia}/${obj.pulse}`;
        },

        activatedEdit(event) {
            console.log("activated");
            this.inputModel = "";
            this.inputObj.sys = 0;
            this.inputObj.dia = 0;
            this.inputObj.pulse = 0;
            //this.inputModel = this.getObjText(this.inputObj);
        },

        loadAnotherItem(item) {
            this.item = item;
            this.switcherDay = true;
            this.objDay = item.period1;
            this.objEvening = item.period2;
            this.inputObj = item.period1;
            this.inputModel = this.getObjText(item.period1);
            this.lastInputModel = null;
        }
    },
    computed: {
        butonDayClass() {
            return this.switcherDay ? "btn-success" : "btn-light";
        },

        butonNightClass() {
            return this.switcherDay ? "btn-light" : "btn-success";
        }
    }
};
</script>

<style scoped>
.editor {
    position: absolute;
    height: 315px;
    min-width: 312px;    
    width: 50%;
    background-color: aliceblue;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: solid 2px #908b8b;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

.meds,
.comment {
    margin: 8px 0;
}
</style>
