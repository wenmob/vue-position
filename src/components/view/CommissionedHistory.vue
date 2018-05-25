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
             style="width: 1202px"
             border
             size="mini"
             v-loading="loading"
             >
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
              width="120"
            >
              <template slot-scope="scope">
                <el-tag type="success" style="border-style:none" v-if="scope.row.status == 3">{{ scope.row.statusStr }}</el-tag>
                <el-tag style="border-style:none" v-else-if="scope.row.status == 0">{{ scope.row.statusStr }}</el-tag>
                <el-tag type="info" style="border-style:none" v-else-if="scope.row.status == 1">{{ scope.row.statusStr }}</el-tag>
                <el-tag style="border-style:none" v-else-if="scope.row.status == 2">{{ scope.row.statusStr }}</el-tag>
                <el-tag type="info" style="border-style:none" v-else-if="scope.row.status == 4">{{ scope.row.statusStr }}</el-tag>
                <el-tag type="warning" style="border-style:none" v-else-if="scope.row.status == 41">{{ scope.row.statusStr }}</el-tag>
              </template>  
           </el-table-column>
          </el-table>
       </div>
       <div class="block" style="margin-top: 30px;width: 1202px" align="center">
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
import Date from '../../utils/utools'
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
       //获取撤单内容
       getTableDatas() {
          // console.log("当前页数："+ vm.pagination.currentPage + "|每条页数："+vm.pagination.pageSize + "|开始时间："+ vm.ruleForm.date1 + "|结束时间：" + vm.ruleForm.date2);
          return new Promise((resolve,reject) => {
             APIS.currentEntrust(vm.pagination.currentPage,vm.pagination.pageSize,vm.ruleForm.date1,vm.ruleForm.date2).then((res) => {
                 if(res.code == 0){
                   let result = res.data.result;
                   vm.pagination.totalPage = res.data.totalRow;
                   vm.tableData =  result;
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
     }
  }
}
</script>


