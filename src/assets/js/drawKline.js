let ds_color = {
    upColor: '#fff',
    upBorderColor: '#DF312D',
    downColor: '#0DB408',
    downBorderColor: '#0DB408'
}
export function splitData(rawData) {
    let categoryData = [];
    let values = [];
    for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
    }
    return {
        categoryData: categoryData,
        values: values
    };

}

export function calculateMA(data, dayCount) {
    let result = [];
    let len = 160;
    for (let i = 0; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
            let ss = data.values[i - j];
            if (ss instanceof Array) {
                let ss1 = ss[1];
                sum += ss1 * 1;
            }
        }
        result.push((sum * 1 / dayCount).toFixed(2));
    }
    return result;
}

export function getNumbers(data) {
    let vol = [];
    data.forEach(element => {
        let obj = {
            value: element[4],
            open: element[0],
            close: element[1],
            itemStyle: {
                color: element[1] > element[0] ? '#fff' : '#0DB408',
                borderColor: element[1] > element[0] ? '#DF312D' : '#0DB408',
                borderWidth: 1
            }
        }
        vol.push(obj);
    });
    return vol;
}
export function createOption(data0) {
   let optionDay = {
    tooltip: {
        trigger: 'axis',
        confine: true,
        axisPointer: {
            type: 'cross'
        },
        formatter: (a) => {
            //最低 最高 开盘 收盘 成交量 成交额
            if (a[0].seriesName == "成交量") {
                return '时间：' + a[0].axisValueLabel + '<br/>' +
                    '成交量：' + a[0].value;
            } else {
                let shu1 = a[0].data;
                let open = (shu1[1] * 1).toFixed(2);
                let close = (shu1[2] * 1).toFixed(2);
                let highest = (shu1[4] * 1).toFixed(2);
                let lowest = (shu1[3] * 1).toFixed(2);
                let volnumber = (shu1[5] * 1) + "万";
                return '日期：' + a[0].axisValueLabel + '<br/>' +
                    '开盘：' + open + '<br/>' +
                    '收盘：' + close + '<br/>' +
                    '最高：' + highest + '<br/>' +
                    '最低：' + lowest + '<br/>' +
                    '成交量：' + volnumber
            }
        }


    },
    legend: {
        data: [{ name: 'MA5', textStyle: { color: "rgba(0,152,255,0.8)", fontSize: 10 } }, { name: 'MA10', textStyle: { color: "rgba(17,17,17,0.8)", fontSize: 10 } }, { name: 'MA20', textStyle: { color: "rgba(255,66,0,0.8)", fontSize: 10 } }, { name: 'MA30', textStyle: { color: "rgba(5,137,6,0.8)", fontSize: 10 } }],
        formatter: function (name) {
            switch (name) {
                case 'MA5':
                    return name + ': ' + calculateMA(data0, 5)[159]
                    break;
                case 'MA10':
                    return name + ': ' + calculateMA(data0, 10)[159]
                    break;
                case 'MA20':
                    return name + ': ' + calculateMA(data0, 20)[159]
                    break;
                case 'MA30':
                    return name + ': ' + calculateMA(data0, 30)[159]
                    break;
                default:
                    break;
            }
        },
        itemWidth: 0,
        itemHeight: 0
    },
       grid: [{
           top: '6%',
           left: '96%',
           right: '93%',
           bottom: '98%',
           height: '70%'
       }, {
               top: '78%',
               left: '96%',
               right: '93%',
               bottom: '98%',
               height: '14%'
           }
    ],
    xAxis: [{
        type: 'category',
        data: data0.categoryData,
        scale: true,
        boundaryGap: false,
        axisLabel: {
            show: false,
            margin: 7,
            fontSize: 10,
            rotate: -45
        },
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: "rgba(147,149,155,1)"
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                // 使用深浅的间隔色
                color: ['rgb(241,241,241)']
            }
        },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
        axisTick: { show: false }//去掉刻度线
    }, {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap: false,
            gridIndex: 1,
            axisLabel: {
                show: true,
                margin: 7,
                fontSize: 10
            },
            axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: "rgba(147,149,155,1)"
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['rgb(241,241,241)']
                }
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisTick: { show: true }//去掉刻度线
        }
    ],
    yAxis: [{
        gridIndex: 0,
        name: '',
        scale: true,
        show: true,
        offset: 5,
        splitLine: { show: false },
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
    dataZoom: [
        {
            type: 'inside',
            realtime: true,
            start: 36,
            end: 100,
            minValueSpan: 22,
            maxValueSpan: 100,
            orient: 'horizontal',
            xAxisIndex: [0, 1]
        }
    ],
    series: [
        {
            name: '日K',
            type: 'candlestick',
            data: data0.values,
            barWidth: '86%',
            itemStyle: {
                normal: {
                    color: ds_color.upColor,
                    color0: ds_color.downColor,
                    borderColor: ds_color.upBorderColor,
                    borderColor0: ds_color.downBorderColor
                }
            },
            markPoint: {
                symbolSize: 44,
                label: {
                    normal: {
                        formatter: function (param) {
                            return param != null ? (param.value * 1).toFixed(2) : '';
                        },
                        fontSize: 8
                    }
                },
                data: [
                    {
                        name: 'highest value',
                        type: 'max',
                        valueDim: 'highest',
                        itemStyle: {
                            color: 'rgba(229,118,21, 0.9)'
                        }
                    },
                    {
                        name: 'lowest value',
                        type: 'min',
                        valueDim: 'lowest',
                        itemStyle: {
                            color: 'rgba(0,7,255, 0.9)'
                        }
                    }
                ],
                tooltip: {
                    confine: true,
                    formatter: function (param) {
                        return param.name + '<br>' + (param.data.coord || '');
                    }
                }
            }
        },
        {
            name: 'MA5',
            type: 'line',
            data: calculateMA(data0, 5),
            yAxisIndex: 0,
            symbol: 'none',
            smooth: 0,
            itemStyle: {
                normal: { color: "rgba(0,152,255,0.8)" }
            },
            lineStyle: {
                width: 1
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(data0, 10),
            yAxisIndex: 0,
            symbol: 'none',
            smooth: 0,
            itemStyle: {
                normal: { color: "rgba(17,17,17,0.8)" }
            },
            lineStyle: {
                width: 1
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: calculateMA(data0, 20),
            yAxisIndex: 0,
            symbol: 'none',
            smooth: 0,
            itemStyle: {
                normal: {
                    color: "rgba(255,66,0,0.8)",
                    borderWidth: 0
                }
            },
            lineStyle: {
                width: 1
            }
        },
        {
            name: 'MA30',
            type: 'line',
            data: calculateMA(data0, 30),
            yAxisIndex: 0,
            symbol: 'none',
            smooth: 0,
            itemStyle: {
                normal: { color: "rgba(5,137,6,0.8)" }
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
            data: getNumbers(data0.values),
            barWidth: '65%',
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
}
    return optionDay;
} 