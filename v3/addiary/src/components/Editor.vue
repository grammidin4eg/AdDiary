<template>
    <div class="editor">
        <div class="first">
            <div class="date">{{item.date}}</div>
            <div class="period-buttons">
                <button type="button" class="btn btn-primary">Утро</button>
                <button type="button" class="btn btn-primary">Вечер</button>
            </div>
        </div>
        <div class="ad">
            <input                                
                type="text"
                class="form-control"
                id="regEmail"
                placeholder="sys/dis/пульс"
              >
        </div>
        <div class="meds"></div>
        <div class="comment"></div>
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
            item: this.itemProp
        }
    }
}
</script>
<style scoped>

</style>


