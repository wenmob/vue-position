<style>
@import url("../../styles/index");
   .revoke-head{
    position: relative;
    width: 100%;
    padding: 15px 20px;
   }
   .revoke-head a{
       display: inline-block;
       padding: 7px 15px;
       font-size: 13px;
   }
</style>
<template>
   <div class="revoke-main">
       <div class="revoke-head">
            <a style="background:#383D41;color: #fff;" @click="toggleSelection">全部选中</a>
            <a style="background:#C9C9C9;color: #44494D;margin-left:10px;" @click="deleteRows">撤单</a>
            <a style="background:#C9C9C9;color: #44494D;margin-left:10px;" @click="deleteAllRows">全撤</a>
       </div>
       <div class="revoke-cont">
          <el-table
             v-loading="loading"
             ref="multipleTable"
             :data="tableData"
             tooltip-effect="dark"
             style="width: 1357px;"
             border
             size="mini"
             @selection-change="handleSelectionChange">
           <el-table-column
            type="selection"
            :resizable="false"
            align="center"
            width="55">
           </el-table-column>
           <el-table-column
            prop="acountId"
            label="订单编号"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120">
           </el-table-column>
           <el-table-column
            prop="dateAdd"
            label="委托时间"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="140"
            >
           </el-table-column>
           <el-table-column
            prop="stockCode"
            label="证券代码"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="100"
            >
           </el-table-column>
           <el-table-column
            prop="stockName"
            label="证券名称"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="behaviorStr"
            label="操作"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="entrustPrice"
            label="委托价格"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="currentPrice"
            label="当前价格"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="number"
            label="委托数量"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="numberDone"
            label="成交数量"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="averagePrice"
            label="成交均价"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
              prop="statusStr"
              label="状态"
              :resizable="false"
              align="center"
              show-overflow-tooltip
              width="100"
              >
              <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.statusStr }}</el-tag>
              </template>  
           </el-table-column>
          </el-table>
       </div>
   </div>
</template>
<script>
let vm;
import APIS from '../../utils/apis'
import { Loading } from 'element-ui'
export default {
  data() {
      return {
        tableData: [],
        loading: true,
        multipleSelection: [],
        buis:undefined
      }
  },
  beforeDestroy(){
    window.clearInterval(vm.buis);
    vm.buis = undefined;
    vm = undefined;
  },
  mounted() {
    vm = this;
    vm.getTableDatas();
  },
  methods: {
       handleSelectionChange(val) {
         this.multipleSelection = val;
       },
       //获取撤单内容
       getTableDatas() {
          return new Promise((resolve,reject) => {
             APIS.getRevokeList().then((res) => {   
                console.log(res);
                 if(res.code == 0){
                    let arry = res.data.entrustOrderses;
                    arry.forEach(element => {
                      let stockEntrustBuyPriceMap = res.data.acountCashAggregationBean.stockEntrustBuyPriceMap; 
                      if($.isEmptyObject(stockEntrustBuyPriceMap)){
                         element.currentPrice = "--";
                      }else{
                        let price = stockEntrustBuyPriceMap[element.stockCode].price;
                        element.currentPrice = price;
                        //  element.currentPrice = stockPriceMap[element.stockCode].price;
                      }  
                    })
                    vm.tableData = arry;
                 }else{
                    vm.tableData = [];
                 }
                 vm.loading = false;
                 resolve(100);
             })
          })
       },
       //点击全部的效果
       toggleSelection() {
         let rows = [];
         for(let i = 0; i < vm.tableData.length; i++){
             rows.push(vm.tableData[i]);
         }
         if (rows) {
           rows.forEach(row => {
             vm.$refs.multipleTable.toggleRowSelection(row);
           });
        } else {
          vm.$refs.multipleTable.clearSelection();
        }
     },
     //撤单的功能
     deleteRows() {
         if(vm.multipleSelection.length == 0){
             return;
         }
          for(let i = 0;i < vm.multipleSelection.length; i++){
             vm.cancelOrder(vm.multipleSelection[i].id);
          }
     },
     //撤单的方法
     cancelOrder(id){
       return new Promise((resolve,reject) => {
             APIS.cancelOrder(id).then(res => {
                   let n = vm.tableData.findIndex(element => {
                      return element.id == id;
                   })
                   vm.tableData.splice(n,1);
                   resolve(2222);
             })
       })
        
     },
     //全部撤单的效果
     deleteAllRows() {
        if(vm.tableData.length == 0){
            return;
        }
        for(let i = 0; i < vm.tableData.length; i++){
           vm.cancelOrder(vm.tableData[i].id);
        }
     }
  }
}
</script>


