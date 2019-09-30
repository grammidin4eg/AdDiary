<template>
    <div class="month-sum">
        <span>{{$lang.messages.MonthSumText}}: </span>
        <span>{{sum}}</span>
    </div>
</template>

<script>
    export default {
        name: "MonthSum",
        props: ['items'],
        computed: {
            sum() {
                let sysSum = 0;
                let diaSum = 0;
                if (!this.items || !this.items.length) {
                    return '';
                }
                this.items.forEach((item) => {
                    sysSum += parseInt(item.sys, 10);
                    diaSum += parseInt(item.dia, 10);
                });
                sysSum = Math.round(sysSum / this.items.length);
                diaSum = Math.round(diaSum / this.items.length);
                return `${sysSum}/${diaSum}`;
            }
        }
    }
</script>

<style scoped>
    .month-sum {
        width: 100%;
        padding: 1rem;
        background-color: #ececec;
        text-align: center;
    }

    .month-sum span {
        font-size: 1rem;
    }
</style>