<template>
   <div :class="{'fullside' : !isMobile, 'minimized': minimized}">
      <div class="chart-title">
         <div class="ml-1 chart-title-text" v-if="showChart"> SYS/DIA/PULSE</div>
         <v-btn text icon color="black" x-small class="mr-1 ml-1" @click="toggleMinimized()">
            <v-icon>{{minButtonIcon}}</v-icon>
         </v-btn>
      </div>
      <GChart
              v-if="showChart"
              type="ColumnChart"
              :data="chartData"
              :options="chartOptions"
      />
   </div>
</template>
<script>
   import {GChart} from 'vue-google-charts';
   import {isMobile} from 'mobile-device-detect';

   export default {
      name: 'Chart',
      props: ['items'],
      created() {
         if (localStorage) {
            this.minimized = (localStorage.getItem('addiary-chart-min') === 'true');
         }
      },
      components: {
         GChart
      },
      data: () => ({
         minimized: false
      }),
      computed: {
         chartData() {
            let res = [
               ['day', 'SYS', { role: 'style' }, 'DIA', { role: 'style' }, 'Pulse', { role: 'style' }]
            ];

            const ADLEVEL = {
               'SYS': [129, 139],
               'DIA': [85, 89]
            };

            function getAdColor(value, type) {
               value = parseInt(value, 10);
               let color = 'color: #97D05A';
               if (value > ADLEVEL[type][0]) {
                  color = 'color: #E8DD10';
               }
               if (value > ADLEVEL[type][1]) {
                  color = 'color: #CA3C3C';
               }
               return color;
            }

            let curDay;
            let curSys = [];
            let curDia = [];
            let curPulse = [];

            let itemDay = 0;
            let itemSys = 0;
            let itemDia = 0;
            let itemPulse = 0;

            function getAvg(grades) {
               const total = grades.reduce((acc, c) => acc + c, 0);
               return total / grades.length;
            }
            
            function pushToRes(_day, _sys, _dia, _pulse) {
               const _curSys = getAvg(_sys);
               const _curDia = getAvg(_dia);
               res.push([
                  _day,
                  _curSys,
                  getAdColor(_curSys, 'SYS'),
                  _curDia,
                  getAdColor(_curDia, 'DIA'),
                  getAvg(_pulse),
                  '#67a0cc'
               ]);
            }

            this.items.forEach((item) => {

               itemDay = parseInt(item.day, 10);
               itemSys = parseInt(item.sys, 10);
               itemDia = parseInt(item.dia, 10);
               itemPulse = parseInt(item.pulse, 10);

               if (curDay && (curDay !== item.day)) {
                  pushToRes(curDay, curSys, curDia, curPulse);

                  curDay = 0;
                  curSys = [];
                  curDia = [];
                  curPulse = [];
               }

               curDay = itemDay;
               curSys.push(itemSys);
               curDia.push(itemDia);
               curPulse.push(itemPulse);
            });

            pushToRes(curDay, curSys, curDia, curPulse);

            return res;
         },
         chartOptions() {
            return {
               chart: {
                  title: '',
                  subtitle: '',
               },
               legend: {
                  position: 'none'
               },
               chartArea:{left:0,top:0,width:'100%',height:'90%'},
               width: (isMobile ? this.windowWidth : this.windowWidth / 2)
            }
         },
         showChart() {
            return (this.items.length > 3) && !this.minimized;
         },
         isMobile() {
            return isMobile;
         },
         minButtonIcon() {
            return this.minimized ? 'mdi-chart-bar' : 'mdi-minus';
         }
      },
      methods: {
         toggleMinimized() {
            this.minimized = !this.minimized;
            if (localStorage) {
               localStorage.setItem('addiary-chart-min', this.minimized);
            }
         }
      }
   }
</script>
<style lang="scss">
   .fullside {
      position: absolute;
      top: 63px;
      right: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.5)
   }

   .chart-title {
      background-color: beige;
      display: flex;
      align-items: center;
   }

   .chart-title-text {
      flex-grow: 1;
   }
</style>
