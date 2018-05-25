//创建时间
export function createTime() {
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
}
//分时线的配置
export let optionTime = {
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

