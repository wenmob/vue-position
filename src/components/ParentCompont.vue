<style>
   @import url("../assets/font/style.css");
   @import url("../styles/index");
   .pos-head{
       min-width: 1400px;
       height: 34px;
       background-color: #CED8EA;
       border-bottom: 1px groove #fff;
   }
   .pos-h-left{
       float: left;
       width: 160px;
       height: 34px;
       transition: all 0.5s;
       -moz-transition: all 0.5s;
       -webkit-transition: all 0.5s;
       -o-transition: all 0.5s;
   }
   .pos-h-left span{
       font-size: 29px;
       line-height: 34px;
   }
   .pos-h-right{
       float: left;
       width: 600px;
       height: 34px;
   }
   .pos-h-right1{
       float: right;
       margin-top: 2px;
       margin-right: 7px;
   }
   .pos-h-right2{
       float: right;
       margin-right: 65px;
       margin-top: 2px;
   }
   .pos-h-right span{
       display: inline-block;
       line-height: 34px;
       font-size: 13px;
   }
   .pos-cont{
       position: relative;
       min-width: 1100px;
       height: calc(100% - 34px);
   }
   .pos-cont-left{
       float: left;
       width: 160px;
       height: 100%;
       background-color: #CED8EA;
       overflow: hidden;
       border-right: 1px groove #fff;
       transition: all 0.5s;
       -moz-transition: all 0.5s;
       -webkit-transition: all 0.5s;
       -o-transition: all 0.5s;
   }
   .pos-cont-left-1{
       width: 160px;
       height: auto;
   }
  .pcl-a1{
      display: block;
      width: 160px;
      height: 32px;
      background-color: #CED8EA;
  }
  .pcl-a1 span:nth-child(1) {
      float: left;
      font-size: 19px;
      margin-left: 14px;
      margin-top: 5px;
  }
  .pcl-a1 span:nth-child(2) {
      float: left;
      font-size: 13px;
      margin-left: 16px;
      margin-top: 8px;
      color: #606266;
  }
  .pcl-a1:hover{
      background-color: #fff;
  }
  .pos-cont-left-2{
      width: 160px;
      height: 192px;
      transition: all 0.8s;
      -moz-transition: all 0.8s;
      -webkit-transition: all 0.8s;
      -o-transition: all 0.8s;
      overflow: hidden;
  }
  .pcl-a2{
      display: block;
      width: 160px;
      height: 32px;
      background-color: #CED8EA;
     
  }
  .pcl-a2 span:nth-child(1) {
      float: left;
      font-size: 19px;
      margin-left: 28px;
      margin-top: 5px;
  }
  .pcl-a2 span:nth-child(2) {
      float: left;
      font-size: 13px;
      margin-left: 16px;
      margin-top: 8px;
  }
  .pcl-a2:hover{
      background-color: #fff;
  }
  .pos-cont-right{
      min-width: 900px;
      height: 100%;
  }
  #btnSn1 {
      font-size: 22px;
  }
</style>
<template>
   <div class="app-main">
       <!--头部-->
      <div class="pos-head">
        <div class="pos-h-left" align="center">
          <span class="icon-h" id="btnSn1" @click="clickBtnSn1"></span>
        </div>
        <div class="pos-h-right">  
           <span style="margin-left:20px;">可用金额：{{acountCashAggregationBean.balance}}</span>
           <span style="margin-left:20px;">冻结金额：{{acountCashAggregationBean.freeze}}</span>
           <span style="margin-left:20px;">股票市值：{{acountCashAggregationBean.marketValue}}</span>
           <span style="margin-left:20px;">总资产：{{acountCashAggregationBean.assets}}</span>
        </div>
        <div class="pos-h-right2" v-if="doCan">
           <el-button size="mini" @click="exit">退出</el-button>
        </div>
        <div class="pos-h-right1" v-if="doCan">
           <el-select v-model="value" placeholder="请选择" size="mini" @change="chooseUn">
                <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.name"
                 :value="item.value"
                 >
               </el-option>
           </el-select>
        </div>
        <div style="clear:both"></div>
      </div>
      <!--内容区域-->
      <div class="pos-cont">
        <div class="pos-cont-left">
            <!--1-->
           <div class="pos-cont-left-1">
              <a class="pcl-a1" @click="goPath('buy')" :style="nStatus == 'buy' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-in"></span><span :style="nStatus == 'buy' ?'color:#fff':'color:#000'">买入</span></a>
              <a class="pcl-a1" @click="goPath('sale')" :style="nStatus == 'sale' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-out"></span><span :style="nStatus == 'sale' ?'color:#fff':'color:#000'">卖出</span></a>
              <a class="pcl-a1" @click="goPath('revoke')" :style="nStatus == 'revoke' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-back"></span><span :style="nStatus == 'revoke' ?'color:#fff':'color:#000'">撤单</span></a>
              <a class="pcl-a1" id="btnA1" @click="clickBtnA1"><span class="icon-bot"></span><span style="color:#000">查询</span></a>
           </div>
            <!--2-->
           <div class="pos-cont-left-2">
              <a class="pcl-a2" @click="goPath('fundPosition')" :style="nStatus == 'fundPosition' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-a"></span><span :style="nStatus == 'fundPosition' ?'color:#fff':'color:#313131'">资金持仓</span></a>
              <a class="pcl-a2" @click="goPath('dayOrder')" :style="nStatus == 'dayOrder' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-b"></span><span :style="nStatus == 'dayOrder' ?'color:#fff':'color:#313131'">当日委托</span></a>
              <a class="pcl-a2" @click="goPath('dayTrande')" :style="nStatus == 'dayTrande' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-c"></span><span :style="nStatus == 'dayTrande' ?'color:#fff':'color:#313131'">当日成交</span></a>
              <a class="pcl-a2" @click="goPath('commissionedHistory')" :style="nStatus == 'commissionedHistory' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-d"></span><span :style="nStatus == 'commissionedHistory' ?'color:#fff':'color:#313131'">历史委托</span></a>
              <a class="pcl-a2" @click="goPath('trandeHistory')" :style="nStatus == 'trandeHistory' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-e"></span><span :style="nStatus == 'trandeHistory' ?'color:#fff':'color:#313131'">历史成交</span></a>
              <a class="pcl-a2" @click="goPath('accountCapital')" :style="nStatus == 'accountCapital' ? 'background-color:#2A70FF;color:#fff;': ''"><span class="icon-f"></span><span :style="nStatus == 'accountCapital' ?'color:#fff':'color:#313131'">资金流水</span></a>
           </div>
        </div>
        <!--右边-->
        <div class="pos-cont-right">
           <transition name="fade" mode="out-in">
             <!-- <router-view :key="key"></router-view> -->
             <router-view v-on:listenStatus="statusFun" v-if="isRouterAlive"></router-view>
           </transition>
        </div>
      </div>
   </div>
</template>
<script>
let vm;
import APIS from '../utils/apis'
import { getDomain,getUserArray,getUserKey,setToken,removeToken } from '@/utils/auth'
export default {
  data() {
      return {
        isRouterAlive: true,  
        btnSn1suor: 0,
        btnA1suor: 0,
        doCan: true,
        nStatus: this.Nstatus,
        acountCashAggregationBean:{
				assets:0.00,//总资产
//					startValue:100000,//初期金额
				marketValue:0.00,//市值
                balance: 0.00, //可用余额
                freeze: 0.00 //冻结资金
        },
        resvl:undefined,
        canResvl: false,
        options: [],
        value: ''
      }
  },
  beforeDestroy() {
    window.clearInterval(vm.resvl);
    vm.canResvl = false;
    vm.resvl = undefined;
    vm = undefined;
  },
  updated() {
   vm.nStatus = this.Nstatus;
  },
  mounted() {
     vm = this;  
     let doMain = getDomain();
     if(doMain != undefined){
        vm.doCan = false;
     }else{
        vm.doCan = true; 
        vm.getOptions();
     }
     vm.canResvl = true;
     
     vm.beginRe();
  },
  methods:{
      //刷新当前界面的方法
      reload () {
       this.isRouterAlive = false
       this.$nextTick(() => (this.isRouterAlive = true))
      }, 
     //获取以前登录的记录
     getOptions() {
       let arr = getUserArray();
       vm.options = JSON.parse(arr);
       vm.value = getUserKey();
     },
     chooseUn(data) { 
        setToken(data);
        vm.reload()
        
     },
     clickBtnSn1() {
         if(vm.btnSn1suor == 0){
              $("#btnSn1").removeClass("icon-h");
              $("#btnSn1").addClass("icon-s");
              $(".pos-h-left").css("width","50px");
              $(".pos-cont-left").css("width","50px");
              $(".pos-cont-right").css("margin-left","-110px");
              vm.btnSn1suor = 1;
         }else{
              $("#btnSn1").removeClass("icon-s");
              $("#btnSn1").addClass("icon-h");
              $(".pos-h-left").css("width","160px");
              $(".pos-cont-left").css("width","160px");
              $(".pos-cont-right").css("margin-left","0px");
              vm.btnSn1suor = 0;
         }
       
     },
      clickBtnA1() {
          if(vm.btnA1suor == 0) {
             $(".pos-cont-left-2").css("height","0px");
             vm.btnA1suor = 1;
          }else{
             $(".pos-cont-left-2").css("height","192px");
             vm.btnA1suor = 0;
          }
      },
      //跳转
      goPath(uri){
          switch (uri) {
              case 'buy':
                  vm.nStatus = 'buy';
                  vm.$router.push({path:'/'})
                  break;
              case 'sale':
                  vm.nStatus = 'sale';
                  vm.$router.push({path:'/sale'})
                  break;
              case 'revoke':
                  vm.nStatus = 'revoke';
                  vm.$router.push({path:'/revoke'})
                  break;
              case 'fundPosition':
                  vm.nStatus = 'fundPosition';
                  vm.$router.push({path:'/fundPosition'})
                  break;
             case 'dayOrder':
                  vm.nStatus = 'dayOrder';
                  vm.$router.push({path:'/dayOrder'})
                  break;
             case 'commissionedHistory':
                  vm.nStatus = 'commissionedHistory';
                  vm.$router.push({path:'/commissionedHistory'})
                  break;
             case 'trandeHistory':
                  vm.nStatus = 'trandeHistory';
                  vm.$router.push({path:'/trandeHistory'})
                  break;
             case 'accountCapital':
                  vm.nStatus = 'accountCapital';
                  vm.$router.push({path:'/accountCapital'})
                  break; 
             case 'dayTrande':
                  vm.nStatus = 'dayTrande';
                  vm.$router.push({path:'/dayTrande'})
                  break;                             
              default:
                  break;
          }
      },
     //更新资管的内容
    beginRe() {
       vm.resvl = self.setInterval(function() {
            if(vm.canResvl){
                vm.canResvl = false;
                APIS.positionCommon().then(res => {
                    if(res.code == 0){
                       let positionCommonData = res.data;
                       let acountCashAggregationBean = positionCommonData.acountCashAggregationBean;
                       vm.acountCashAggregationBean.balance = (acountCashAggregationBean.balance*1).toFixed(2);
                       vm.acountCashAggregationBean.assets = (acountCashAggregationBean.assets*1).toFixed(2);
                       vm.acountCashAggregationBean.freeze = (acountCashAggregationBean.freeze*1).toFixed(2);
                       vm.acountCashAggregationBean.marketValue = (acountCashAggregationBean.marketValue*1).toFixed(2);
                       window.parent.postMessage(vm.acountCashAggregationBean,'*');
                    }
                    vm.canResvl = true;
                }).catch(err => {
                    vm.canResvl = true;
                })
            }
       },1000)
    },
    //监听儿子的状态值
    statusFun(e){
       this.nStatus = e;
        
    },
    //退出的功能
    exit() {
        this.$confirm('是否退出当前账号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           removeToken();
           vm.$router.push("/login");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>

