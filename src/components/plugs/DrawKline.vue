<style>
 .cmp_b_G{
     width: 100%;
     height: 436px;
     margin-top: 20px;
 }
</style>
<template>
   <div class="cmp_b_G" id="mychart2"></div>
</template>
<script>
import echarts from 'echarts'
import {splitData,calculateMA,createOption,getNumbers} from '../../assets/js/drawKline'
import {getDayChart} from '../../utils/out'
let vmt;
let data0;
export default {
   data() {
       return {
          stockCode:"",
          mychart2: undefined,
          sevnl: undefined,
          sevCan: false
       }
   },
   beforeDestroy() {
     vmt.sevCan = false  
     vmt.mychart2 = undefined;
     window.clearInterval(vmt.sevnl);
     vmt.sevnl = undefined;
     vmt = undefined;
   },
   mounted() {
     this.chartInit();
   },
   methods: {
      //初始化的方法
      chartInit() {
        vmt = this;
        vmt.mychart2 = echarts.init(document.getElementById('mychart2'));
        vmt.sevCan = true;
        vmt.miuFun();
        vmt.resizeChart();
      }, 
     //远端获取数据
     getBaiduData(){
         return new Promise((resolve,reject) => {
          //创建K线图
          getDayChart(vmt.stockCode,function(data) {
              let kLine = data.data;
              let rawData = [];
              for(let i = (kLine.length -1); i >= 0; i--){
               let rds = [];
               let dataStr0 = kLine[i].values['' + 1 +''] + '';
               let dataStr1 = dataStr0.substring(0,4) + "/" + dataStr0.substring(4,6) + "/" + dataStr0.substring(6,8);
               rds.push(dataStr1);
               let open = kLine[i].values['' + 3 +''].values['' + 3 + '']; 
               rds.push(open);
               let close = kLine[i].values['' + 3 +''].values['' + 6 + ''];
               rds.push(close);
               let lowest = kLine[i].values['' + 3 +''].values['' + 5 + ''];
               rds.push(lowest);
               let highest =  kLine[i].values['' + 3 +''].values['' + 4 + ''];
               rds.push(highest);
               let volnumber = ((kLine[i].values['' + 3 +''].values['' + 7 + ''])/10000).toFixed(2);
               rds.push(volnumber);
               rawData.push(rds);
              }
             data0 = splitData(rawData);
             let op = createOption(data0);
             vmt.mychart2.setOption(op);
             resolve(1)
          })
         })
     },
    //每分钟创建的数据
     miuFun() {
         vmt.sevnl = self.setInterval(function() {
             if(vmt.sevCan){
                 vmt.sevCan = false; 
                 if(vmt.stockCode != ""){
                     vmt.getBaiduData().then(() => {
                       vmt.sevCan = true;
                     });
                 }   
             } 
         },60000);
     },
   //监听chart
   resizeChart() {
     let chart = vmt.mychart2;
     window.onresize = function() {
       chart.resize();
     }
   }
   }
}
</script>


