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
      components: {
         GChart
      },
      data: () => ({
         items: [],
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

            this.items.forEach((item) => {
               res.push([
                  parseInt(item.day, 10),
                  parseInt(item.sys, 10),
                  getAdColor(item.sys, 'SYS'),
                  parseInt(item.dia, 10),
                  getAdColor(item.dia, 'DIA'),
                  parseInt(item.pulse, 10),
                  '#3366cc'
               ]);
            });

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
