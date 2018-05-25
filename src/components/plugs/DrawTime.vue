<style>
  .cmp_b_G{
     width: 100%;
     height: 436px;
     margin-top: 10px;
  }
</style>
<template>
   <div class="cmp_b_G" id="mychart1"></div>
</template>
<script>
import echarts from 'echarts'
import {createTime,optionTime} from '../../assets/js/drawTime'
import {getimeChart} from '../../utils/out'
let vmt;
export default {
   data() {
       return{
           stockCode:"",
           datay: [],
           dataJx: [],
           canvaMax: 0,
           canvaMin: 0,
           datatimes: [],
           optionTime: undefined,
           posRig: [],
           dataVolnum: [],
           mychart1: undefined,
           sevnl: undefined,
           sevCan: false
       }
   },
   beforeDestroy() {
     vmt.sevCan = false;  
     vmt.mychart1 = undefined;
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
        vmt.datatimes = vmt.createTime();
        vmt.optionTime = vmt.createOption();
        vmt.mychart1 = echarts.init(document.getElementById('mychart1'));
        vmt.optionTime.xAxis[0].data = vmt.datatimes;
        vmt.optionTime.xAxis[1].data = vmt.datatimes;
        //  vmt.mychart1.setOption(optionTime);
        vmt.sevCan = true;
        vmt.miuFun();
        vmt.resizeChart();
      }, 
     //远端获取数据
     getBaiduData(){
        return new Promise((resolve,reject) => {
          //创建分时线图
          getimeChart(vmt.stockCode,function (data) {
             let timeline = data.data.timeline.timeline;
             vmt.datay = [];
             vmt.dataJx = [];
             vmt.dataVolnum = [];
             let sset = new Set(vmt.datatimes);
             for(let i = 0; i < timeline.length; i++){
                  let s_ = timeline[i].values['' + 2 + ''] + '';
                  let s_0 = s_.substring(0,s_.length - 5);
                  let n_0 = Math.floor(s_0.length/2);
                  let s_1 = s_0.substring(0,n_0) + ":" + s_0.substring(n_0,s_0.length); //获取时间段 
                  if(sset.has(s_1)){
                       let p_0 = (timeline[i].values['' + 4 + '']*1).toFixed(2); //获取对应时间段价格
                       vmt.datay.push(p_0);
                       let p_1 = (data.data.preclose*1).toFixed(2);
                       if(i != 0){
                            p_1 = (timeline[i-1].values['' + 4 + '']*1).toFixed(2);
                        }
                       let vol_0 = (timeline[i].values['' + 5 + ''] / 10000).toFixed(2);
                       let obj = {
                           value: vol_0,
                           itemStyle: {
                           color: p_0 > p_1 ? '#F70303' : '#0DB408',
                           borderColor: 'transparent',
                           borderWidth: 0.5
                           }
                       }
                       vmt.dataVolnum.push(obj); 
                       //console.log(vmt.dataVolnum);
                       let jx = (timeline[i].values['' + 6 + '']*1).toFixed(2); //均线数据
                       vmt.dataJx.push(jx);
                  }
             }
            //  console.log(vm.datay);
             
             vmt.optionTime.xAxis[0].data = vmt.datatimes;
             vmt.optionTime.yAxis[0].min = vmt.canvaMin;
             vmt.optionTime.yAxis[0].max = vmt.canvaMax;
             vmt.optionTime.series[0].data = vmt.datay;
             vmt.optionTime.series[1].data = vmt.dataJx;
             vmt.optionTime.series[2].data = vmt.dataVolnum;
             vmt.optionTime.series[0].markLine.data = [{
                   name: vmt.posRig[2],
                   yAxis: (vmt.posRig[2]*1).toFixed(2)
             }]
             vmt.mychart1.setOption(vmt.optionTime);
             resolve(1);
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
    //创建时间
    createTime() {
    let h = 9;
    let m = 30;
    let t1 = "";
    let xx = [];
    for (let i = 0; i < 242; i++) {
        if (m == 59) {
            t1 = h + ":" + m;
            xx.push(t1);
            h++;
            m = 0;
        } else {
            if (m >= 10) {
                t1 = h + ":" + m;
                xx.push(t1);
                if (m == 30) {
                    if (h == 11) {
                        h = 13;
                        m = 0;
                    } else {
                        m++;
                    }
                } else {
                    m++;
                }
            } else {
                t1 = h + ":0" + m;
                xx.push(t1);
                m++;
            }

        }
    }
    return xx;
},
 //创建option
  createOption() {
    let optionTime = {
    grid: [{
        top: '2%',
        left: '96%',
        right: '93%',
        bottom: '98%',
        height: '70%'
    },{
        top: '75%',
        left: '96%',
        right: '93%',
        bottom: '98%',
        height: '18%'
    }],
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: 'cross'
        },
        formatter: function (a) {
            if (a[0].seriesName == "成交量") {
                return '时间：' + a[0].axisValueLabel + '<br/>' +
                    '成交量：' + a[0].value + '万';
            } else {
                return '时间：' + a[0].axisValueLabel + '<br/>' +
                    '价格：' + a[0].data;
            }

        }
    },
    dataZoom: [
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
            xAxisIndex: [0, 1]
        }
    ],
    xAxis: [{
        type: 'category',
        data: [],
        scale: true,
        boundaryGap: false,
        axisLabel: {
            show: false,
            margin: 7,
            fontSize: 12
        },
        axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
                color: "rgba(170,175,189,1)"
            }
        },
        splitLine: {
            show: false,
            lineStyle: {
                // 使用深浅的间隔色
                color: ['rgb(241,241,241)']
            }
        },
        axisTick: { show: false }//去掉刻度线
    },
        {
            type: 'category',
            data: [],
            scale: true,
            boundaryGap: false,
            gridIndex: 1,
            axisLabel: {
                show: true,
                margin: 7,
                fontSize: 12,

            },
            axisLine: {
                show: true,
                onZero: false,
                lineStyle: {
                    color: "rgba(170,175,189,1)"
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['rgb(241,241,241)']
                }
            }
        },
    ],
    yAxis: [{
        name: '股票行情',
        scale: true,
        show: true,
        axisLabel: {
            show: true,
            margin: 5,
            fontSize: 12,
            formatter: (e) => {
                return (e*1).toFixed(2)          
            }
        },
        splitLine: { show: false },
        min: 0.00,
        max: 0.00,
        splitNumber: 0.05,
        splitArea: {
            show: false
        }
    },
        {
            name: '',
            scale: true,
            show: true,
            gridIndex: 1,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                margin: 7,
                fontSize: 12
            },
            splitLine: { show: false },
            splitArea: {
                show: false
            }
        }
    ],
    series: [{
        name: '分时线',
        data: [],
        type: 'line',
        smooth: 0,
        symbol: 'none',
        itemStyle: {
            normal: { color: 'rgba(76,133,186,0.8)' }
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
        areaStyle: {
            color: "rgba(214,225,245,0.8)"
        },
        lineStyle: {
            width: 1
        },
        markLine: {
            symbol: 'pin',
            symbolSize: 0,
            label: {
                show: true,
                position: "start",
                formatter: (e) => {
                    return e.value = (e.value*1).toFixed(2);
                }
            },
            data: [
                
            ],
            lineStyle: {
                color: '#626262'
            }
        }  
    },
    //均线
    {
        name: '均线',
        type: 'line',
        symbol: 'none',
        data: [],
        itemStyle: {
            normal: { color: 'rgba(229,175,46,1)' }
        },
        lineStyle: {
            width: 1
        }

    },
    //成交量
        {
            name: '成交量',
            xAxisIndex: 1,
            yAxisIndex: 1,
            type: 'bar',
            data: [],
            barWidth: '40%',
            markPoint: {
                symbol: 'arrow',
                symbolSize: 10,
                symbolRotate: 180,
                label: {
                    show: true,
                    normal: {
                        formatter: function (param) { 
                            return param != null ? param.value + "万" : '';
                        },
                        fontSize: 11,
                        color: '#1c1c1c',
                        position: 'right'
                    }
                },
                data: [
                    {
                        name: 'vol max',
                        type: 'max',
                        itemStyle: {
                            color: 'rgba(229,118,21, 0.9)'
                        }
                    }
                ]
            }
        }

    ]
   };
   return optionTime;
  },
   //监听chart
   resizeChart() {
     let chart = vmt.mychart1;
     window.onresize = function() {
       chart.resize();
     }
   }
   }
}
</script>
