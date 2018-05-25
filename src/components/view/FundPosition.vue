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
   .blackFont{
      color: #606266;
   }
   .redFont{
     color: red;
   }
   .greenFont{
     color: #0047AB;
   }

   #sub{
       padding: 9px 20px;
   }
   .funclass .el-table__row{
    cursor: pointer !important;
   }
</style>
<template>
   <div class="revoke-main">
       <!-- <div class="revoke-head" style="width: 100%;padding-top: 20px;padding-bottom: 0px;padding-left: 20px;">
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="日期范围:" required>
                  <el-col :span="11">
                    <el-form-item prop="date1">
                       <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
               </el-form-item>
               <el-form-item>
                 <el-button id="sub" style="color:white;background: #383D41" @click="onSubmit('ruleForm')">确定</el-button>
               </el-form-item>
            </el-form>
       </div> -->
       <div class="revoke-cont">
          <el-table
             ref="multipleTable"
             :data="tableData"
             class="funclass"
             tooltip-effect="dark"
             style="width: 1130px;" 
             border 
             size="mini"
             :cell-class-name="changeSty"
             @row-dblclick="handleSale"
             @cell-mouse-enter="cellhover"
             v-loading="loading">
           <!-- <el-table-column
            prop="dateAdd"
            label="时间"
            align="center"
            show-overflow-tooltip
            >
           </el-table-column>   -->
           <el-table-column
            prop="stockCodeFull"
            label="证券代码"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="100"
            >
           </el-table-column>
           <el-table-column
            prop="stockName"
            label="证券名称"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="number"
            label="证券数量"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="100"
            >
           </el-table-column>
           <el-table-column
            prop="numberGreeze"
            label="可用数量"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="100"
            >
           </el-table-column>
           <el-table-column
            prop="curPrice"
            label="市价"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="100"
            >
           </el-table-column>
           <el-table-column
            prop="priceCost"
            label="成本价"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="accountTotle"
            label="市值"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="profit"
            label="浮动盈亏"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="100"
            >
           </el-table-column>
           <el-table-column
            prop="profitOfLoss"
            label="盈亏比例"
            align="center"
            show-overflow-tooltip
            :resizable="false"
            width="120"
            >
           </el-table-column>
           <el-table-column
             label="操作"
             width="147"
             :resizable="false"
             align="center">
             <template slot-scope="scope">
              <el-button @click="handleBuy(scope.row)" type="danger" style="padding:5px 7px" size="mini">买入</el-button>
              <el-button @click="handleSale(scope.row)" type="primary" style="padding:5px 7px" size="mini">卖出</el-button>
             </template>
          </el-table-column>
          </el-table>
       </div>
       <div class="block" style="margin-top: 30px;" align="center">
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.page_sizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalPage">
        </el-pagination> -->
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
        loading: true,
        ruleForm: {
            date1: '',
            date2: ''
        },
        tableData: [],
        pagination:{
          pageSize: 10,
          page_sizes: [10,20,30,50],
          currentPage: 1,
          totalPage: 10
        },
        rules: {
          date1: [
              { required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
              { required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      }
  },
  beforeDestroy(){
    vm = undefined;
  },
  mounted() {
    vm = this;
    vm.getTableDatas();
  },
  methods: {
       onSubmit(formName) {
          vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.pagination.currentPage = 1;
            vm.getTableDatas();  
          } else {
            return false;
          }
         });
       },  
       changeSty(obj){
           if(obj.row.profit*1 < 0){
             return 'greenFont'
           }else if(obj.row.profit*1 > 0){
             return 'redFont'
           }else{
             return 'blackFont'
           }
       }, 
        //获取撤单内容
       getTableDatas() {
          return new Promise((resolve,reject) => {
             APIS.getFundPosition(vm.pagination.currentPage,vm.pagination.pageSize,vm.ruleForm.date1,vm.ruleForm.date2).then((res) => {
              //  console.log(res);
                 if(res.code == 0){
                    vm.pagination.totalPage = res.data.totalRow;
                    let result = res.data.result;
                    let acountCashAggregationBean = res.data.acountCashAggregationBean;
                    if(result.length != 0){
                     result.forEach(element => {
                       element.numberGreeze = element.number - element.numberFreeze;
                       element.curPrice = (acountCashAggregationBean.stockPriceMap[element.stockCode].price).toFixed(3);
                       element.priceCost = (element.priceCost*1).toFixed(3);
                       element.accountTotle = (element.curPrice*element.number).toFixed(2);
                       element.profit = element.number == 0? element.profix.toFixed(2) : (element.number * element.curPrice - element.costTotle).toFixed(2);
                       element.profitOfLoss = element.number == 0? ((element.profit/element.costTotle)*100).toFixed(3)+"%" : (element.profit/(element.priceCost*element.number)*100).toFixed(3)+"%";
                     });
                    }
                    vm.tableData = result;
                 }
                 vm.loading = false;
                 resolve(100);
             })
          })
       },
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        vm.pagination.pageSize = val;
        vm.pagination.currentPage = 1;
        vm.getTableDatas();

      },
     handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        vm.pagination.currentPage = val;
        vm.getTableDatas();
     },
     //点击买入
     handleBuy(obj){
      let stockCode = obj.stockCodeFull.toLowerCase();
      this.Nstatus = "buy";
      this.$emit('listenStatus','buy');
      vm.$router.push({path:'/',query:{stockCode:stockCode,stockName:obj.stockName}})
      
     },
     //点击卖出
     handleSale(obj){
      let stockCode = obj.stockCodeFull.toLowerCase();
      this.Nstatus = "sale";
      this.$emit('listenStatus','sale');
      vm.$router.push({path:'/sale',query:{stockCode:stockCode,stockName:obj.stockName}})
     },
     cellhover(row){
       console.log(row);
       
     }
   
  }
}
</script>


