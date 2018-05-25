<style>
@import url("../../styles/index");
   .revoke-head{
    position: relative;
   }
   .line{
      text-align: center
   }
   #sub{
       padding: 7px 20px;
   }
</style>
<template>
   <div class="revoke-main">
       <div class="revoke-head" style="width: 100%;padding-top: 20px;padding-bottom: 0px;padding-left: 20px;">
           <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="日期范围:" required>
                  <el-col :span="11">
                    <el-form-item prop="date1">
                       <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="ruleForm.date1" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2">
                      <el-date-picker size="mini" type="date" placeholder="选择日期"  v-model="ruleForm.date2" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
               </el-form-item>
               <el-form-item>
                 <el-button id="sub" size="mini" style="color:white;background: #383D41" @click="onSubmit('ruleForm')">确定</el-button>
               </el-form-item>
            </el-form>
       </div>
       <div class="revoke-cont">
           <el-table
             ref="multipleTable"
             :data="tableData"
             tooltip-effect="dark"
             style="width: 942px"
             border
             size="mini"
             v-loading="loading">
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
            label="成交时间"
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
            width="100"
            >
           </el-table-column>
           <el-table-column
            prop="actualAccount"
            label="发生金额"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="number"
            label="成交数量"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
           <el-table-column
            prop="realPrice"
            label="成交单价"
            :resizable="false"
            align="center"
            show-overflow-tooltip
            width="120"
            >
           </el-table-column>
          </el-table>
       </div>
       <div class="block" style="margin-top: 30px;width:942px" align="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.page_sizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalPage">
        </el-pagination>
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
       //提交的按钮
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
       //获取撤单内容
       getTableDatas() {
          return new Promise((resolve,reject) => {
             APIS.currentMake(vm.pagination.currentPage,vm.pagination.pageSize,vm.ruleForm.date1,vm.ruleForm.date2).then((res) => {
                //  console.log(res);
                 if(res.code == 0){
                   let data = res.data;
                   vm.pagination.totalPage = data.totalRow;
                   let result = data.result;
                   if(result.length != 0){
                    result.forEach(element => {
                       element.actualAccount = (element.realPrice * element.number).toFixed(2);
                    });
                   }
                   vm.tableData =  result;
                 }
                 vm.loading = false;
                 resolve(100);
             })
          })
       },
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        vm.pagination.currentPage = 1;
        vm.pagination.pageSize = val;
        vm.getTableDatas();
      },
     handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        vm.pagination.currentPage = val;
        vm.getTableDatas();
     }
      
  }
}
</script>


