import request from '@/utils/request'
const APIS = {
    //登录的接口
    login: (username, password) => {
        return request({
            url: '/user/login/check',
            method: 'post',
            data: {
                username: username,
                password: password
            }
        })
    },
    // 检查是否登陆
    checklogin: () => {
        return request({
            url: '/user/status/login',
            method: 'post',
            data: {}
        })
    },
    //点击买入的接口
    buySubmit: (stockCode, price, number) => {
        return request({
            url: '/user/entrust/buy/save',
            method: 'post',
            data: {
                stockCode: stockCode.toUpperCase(),
                price: price,
                number: number
            }
        })
    },
    //卖出的接口
    saleSubmit: (stockCode, price, number) => {
        return request({
            url: '/user/entrust/sell/save',
            method: 'post',
            data: {
                stockCode: stockCode.toUpperCase(),
                price: price,
                number: number
            }
        })
    },
    //持仓公用部分
    positionCommon: () => {
            return request({
                url: '/user/transaction',
                method: 'get',
                data: {}
            })
    },
    //获取撤单的接口
    getRevokeList: () => {
        return request({
            url: '/user/revoke/list',
            method: 'get',
            data: {}
        })
    },
    //撤单
    cancelOrder: (id) => {
        return request({
            url: '/user/revoke/done',
            method: 'post',
            data: {id}
        })
    },
    //资金持仓
    getFundPosition: (page,pageSize,dateAddBegin,dateAddEnd) => {
        return request({
            url: '/user/transactionLsj?page=' + page + "&pageSize=" + pageSize + "&dateAddBegin=" + dateAddBegin + "&dateAddEnd=" + dateAddEnd,
            method: 'get',
            data: {}
        })
    },
    //历史委托
    currentEntrust: (page,pageSize,dateAddBegin,dateAddEnd) => {
        return request({
            url: '/user/transaction/logsNewLsj?page=' + page + "&pageSize=" + pageSize + "&dateAddBegin=" + dateAddBegin + "&dateAddEnd=" + dateAddEnd,
            method: 'get',
            data: {}
        })
    },
    //历史成交
    currentMake: (page, pageSize, dateAddBegin, dateAddEnd) => {
        return request({
            url: '/user/transaction/logsLsj?page=' + page + "&pageSize=" + pageSize + "&dateAddBegin=" + dateAddBegin + "&dateAddEnd=" + dateAddEnd,
            method: 'get',
            data: {}
        })
    },
    //资金流水
    accountCapital: (page, pageSize, dateAddBegin, dateAddEnd) => {
        return request({
            url: '/user/acountCashLog/list?page=' + page + "&pageSize=" + pageSize + "&dateAddBegin=" + dateAddBegin + "&dateAddEnd=" + dateAddEnd,
            method: 'get',
            data: {}
        })
    }

}

export default APIS