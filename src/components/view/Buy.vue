<style>
  .buy-d1{
      float: left;
      width: 18%;
      height: 100%;

  }
  .buy-d2{
      float: left;
      width: 15%;
      height: 100%;

  }
  .buy-d3{
      float: left;
      width: 50%;
      height: 100%;

  }
  .cmp_cont{
    padding-top: 20px;
  }
  .cmp_b_c1{
      padding-top: 10px;
      padding-left: 30px;
      padding-right: 30px;
  }
  .cmp_b_c1_1{
      width: 100%;
      display: flex;
      justify-content: space-between;
  }
  .cmp_b_c2{
     padding-top: 10px;
     padding-left: 10px;
     padding-right: 10px;
     padding-bottom: 10px;
     border-left: 1px solid #D9DEE4;
     border-right: 1px solid #D9DEE4;
  }
  .cmp_b_c1_2{
      position: relative;
      padding-left: 12px;
      height: 22px;
      text-align: center;
  }
  .cmp_b_c1_2 span:nth-child(1){
      position: absolute;
      color: #606266;
      font-size: 12px;
      line-height: 20px;
      left: 12px;
  }
  .cmp_b_c1_2 span:nth-child(2){
      color: #606266;
      font-size: 12px;
      line-height: 20px;
  }
  .cmp_b_c1_2 span:nth-child(3){
      position: absolute;
      color: #606266;
      font-size: 12px;
      line-height: 20px;
      right: 12px;
  }
  .cmp_b_T{
      font-size: 17px;
      color:  #404548;
      padding-left: 12px;
      padding-right: 12px;
      margin: 0px;
  }
  .cmp_b_S :nth-child(1){
      float: left;
      font-size: 20px; 
      margin-left: 12px;
  }
  .cmp_b_S :nth-child(2){
      float: left;
      width: 24px;
      margin-top: 2px;
  }
  .cmp_b_S :nth-child(3){
      float: left;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 10px;
  }
  .cmp_b_S :nth-child(4){
      float: left;
      font-size: 12px;
      margin-left: 7px;
      margin-top: 10px;
  }
  .cmp_b_H{
      width: 100%;
      display: flex;
      justify-content: space-between;
  }
  .cmp_b_H_ee{
      padding-top: 0px;
      padding-bottom: 10px;
      padding-left: 12px;
      padding-right: 12px;
  }
  .cmp_b_H_ee span{
    display: inline-block;

  }
  .cmp_b_N{
      padding-left: 18px;
  }
  .cmp_b_N a{
    font-size: 14px;
  }
  .cmp_b_N span{
     font-size: 14px; 
  }
  .atn{
      color: #1e1e1e;
  }
 .el-input.is-disabled .el-input__inner{
     color: #D91020 !important;
 }
 .d1 p{
   width: 160px;
   display: inline-block;
 }
 .d1 p span{
    display: inline-block;
 }
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance:textfield;
}
input[type="number"]{
  -moz-appearance: textfield;
}
.el-form-item{
    margin-bottom: 0px !important;
}
.el-form-item__label{
    font-size: 12px;
}
</style>
<template>
   <div class="pos-main">
       <!--买入/卖出-->
       <div class="buy-d1">
         <div class="cmp_cont">
             <div class="cmp_b_c1">
                 <!--表单-->
                 <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="股票代码" prop="stockStr" size="mini">
                     <el-select
                     v-model="form.stockStr"
                     style="width:100%"
                     filterable
                     clearable
                     remote
                     reserve-keyword
                     placeholder="请输入股票代码/简拼"
                     :remote-method="remoteMethod"
                     @change="getDone"
                     :loading="form.loading">
                     <el-option
                     v-for="item in form.options"
                     :key="item.stockCode"
                     :label="item.str"
                     :value="item.stockCode">
                     <span style="float: left">{{ item.stockName }}&nbsp;-&nbsp;</span>
                     <span style="float: left; color: #8492a6; font-size: 13px">{{ item.stockCode.toUpperCase() }}</span>
                     </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="股票名称" prop="stockName" size="mini">
                      <el-input v-model="form.stockName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="买入价格" prop="buyPrice" size="mini">
                      <el-input type="number" id="py1" onmousewheel="return false;"  v-model.number="form.buyPrice" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="可买股数" prop="canBuyNum" size="mini">
                      <el-input v-model="form.canBuyNum" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="买入股数" prop="buyNum" size="mini">
                      <el-col :span="15">  
                       <el-input type="number" onmousewheel="return false;" v-model.number="form.buyNum" clearable></el-input>
                      </el-col> 
                      <el-col :span="6" :offset="1">  
                       <el-button style="border-style:none;color:#2D8DDF;padding-left:7px;padding-right:7px;" @click="dianMe">全部</el-button>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="预计金额" prop="planPrice" size="mini">
                      <el-input v-model="form.planPrice" disabled></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="submitForm('form')" style="background:#D91020;color:#fff;float:left;margin-top:7px;" size="mini">买入</el-button>
                    </el-form-item>
                </el-form>
                <!--显示的相关的数据-->
                <div class="cmp_b_c1_1" style="margin-top:35px;">
                    <span style="font-size:12px;color:#606266">可用余额</span>
                    <span style="font-size:12px;color:#606266">{{acountCashAggregationBean.balance}}</span>
                </div>
                <div class="cmp_b_c1_1" style="margin-top:15px;">
                    <span style="font-size:12px;color:#606266">冻结金额</span>
                    <span style="font-size:12px;color:#606266">{{acountCashAggregationBean.freeze}}</span>
                </div>
                <div class="cmp_b_c1_1" style="margin-top:15px;">
                    <span style="font-size:12px;color:#606266">股票市值</span>
                    <span style="font-size:12px;color:#606266">{{acountCashAggregationBean.marketValue}}</span>
                </div>
                <div class="cmp_b_c1_1" style="margin-top:15px;">
                    <span style="font-size:12px;color:#606266">总资产</span>
                    <span style="font-size:12px;color:#606266">{{acountCashAggregationBean.assets}}</span>
                </div>
             </div>

         </div>
       </div>
       <!--实时查看-->
       <div class="buy-d2">
          <div class="cmp_cont">
              <div class="cmp_b_c2">
                 <h3 class="cmp_b_T">{{posRig[0] == undefined||posRig[0] == "" ? "-" : posRig[0]}}<span style="font-size:14px;color:#616568">{{form.stockCode == undefined ||form.stockCode == "" ? "-" :"("+form.stockCode.toUpperCase()+")"}}</span></h3>
                 <div class="cmp_b_S" style="margin-top:10px;">
                    <template v-if="posRig[3]*1 == 0">
                    <span style="color:#404548">{{posRig[3]==""||posRig[3]==undefined?"-":(posRig[3]*1).toFixed(2)}}</span>
                    <img src="../../assets/images/RED.png" style="display:none"/>
                    <span style="color:#404548">{{0.00}}</span>
                    <span style="color:#404548">{{0.00 + "%"}}</span>
                    </template>

                    <template v-else-if="posRig[3]*1 > posRig[2]*1">
                    <span style="color:red">{{posRig[3]==""||posRig[3]==undefined?"-":(posRig[3]*1).toFixed(2)}}</span>
                    <img src="../../assets/images/RED.png"/>
                    <span style="color:red">{{"+"+(posRig[3]*1 - posRig[2]*1).toFixed(2)}}</span>
                    <span style="color:red">{{"+"+(((posRig[3]*1 - posRig[2]*1)/posRig[2])*100).toFixed(2) + "%"}}</span>
                    </template>

                    <template v-else-if="posRig[3]*1 == posRig[2]*1">
                    <span style="color:#404548">{{posRig[3]==""||posRig[3]==undefined?"-":(posRig[3]*1).toFixed(2)}}</span>
                    <img src="../../assets/images/RED.png" style="display:none"/>
                    <span style="color:#404548">{{(posRig[3]*1 - posRig[2]*1).toFixed(2)}}</span>
                    <span style="color:#404548">{{0.00 + "%"}}</span>
                    </template>

                    <template v-else-if="posRig[3]*1 < posRig[2]*1">
                    <span style="color:#018101">{{posRig[3]==""||posRig[3]==undefined?"-":(posRig[3]*1).toFixed(2)}}</span>
                    <img src="../../assets/images/GREEN.png"/>
                    <span style="color:#018101">{{(posRig[3]*1 - posRig[2]*1).toFixed(2)}}</span>
                    <span style="color:#018101">{{(((posRig[3]*1 - posRig[2]*1)/posRig[2])*100).toFixed(2) + "%"}}</span>
                    </template>

                    <template v-else>
                    <span style="color:#404548">-</span>
                    <img src="../../assets/images/RED.png" style="display:none"/>
                    <span style="color:#404548">-</span>
                    <span style="color:#404548">-</span>
                    </template>
                    <div style="clear:both"></div>
                </div>
                <!--显示简单的当日行情-->
                 <div class="cmp_b_c1_1" style="padding-top:7px;">
                    <div class="cmp_b_H_ee" algin="center">
                       <span style="color:black;font-size:12px;">今开：</span>
                       <span style="color:#494949;font-size:12px;">{{posRig[1] == undefined||posRig[1] == "" ? "-" : (posRig[1]*1).toFixed(2)}}</span>
                   </div>
                   <div class="cmp_b_H_ee" algin="center">
                       <span style="color:black;font-size:12px;">昨收：</span>
                       <span style="color:#494949;font-size:12px;">{{posRig[2] == undefined||posRig[2] == "" ? "-" : (posRig[2]*1).toFixed(2)}}</span>
                   </div>
                 </div> 
                 <div class="cmp_b_c1_1" style="padding-top:0px;">
                   <div class="cmp_b_H_ee" algin="center">
                       <span style="color:black;font-size:12px;">最高：</span>
                       <span style="color:#494949;font-size:12px;">{{posRig[4] == undefined||posRig[4] == "" ? "-" : (posRig[4]*1).toFixed(2)}}</span>
                   </div>
                   <div class="cmp_b_H_ee" algin="center">
                       <span style="color:black;font-size:12px;">最低：</span>
                       <span style="color:#494949;font-size:12px;">{{posRig[5] == undefined||posRig[5] == "" ? "-" : (posRig[5]*1).toFixed(2)}}</span>
                   </div> 
                 </div>
                 <div class="cmp_b_c1_1" style="padding-top:0px;">
                    <div class="cmp_b_H_ee" algin="center">
                       <span style="color:black;font-size:12px;">涨停价：</span>
                       <span style="color:#494949;font-size:12px;">{{posRig[posRig.length - 2]}}</span>
                   </div>
                   <div class="cmp_b_H_ee" algin="center">
                       <span style="color:black;font-size:12px;">跌停价：</span>
                       <span style="color:#494949;font-size:12px;">{{posRig[posRig.length - 1]}}</span>
                   </div> 
                 </div>          
                 <!--显示行情数据-->
                 <div class="cmp_b_c1_2" style="margin-top:7px;height:0px;border-top:1px solid #D9DEE4"></div>
                 <div class="cmp_b_c1_2" style="margin-top: 7px;">
                    <span>卖五</span>
                    <span :style="styleStatus(posRig[29],posRig[2])">{{posRig[29]==""||posRig[29]==undefined?"-":(posRig[29]*1).toFixed(2)}}</span>
                    <span>{{posRig[28]==""||posRig[28]==undefined?"-":Math.round(posRig[28]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>卖四</span>
                    <span :style="styleStatus(posRig[27],posRig[2])">{{posRig[27]==""||posRig[27]==undefined?"-":(posRig[27]*1).toFixed(2)}}</span>
                    <span>{{posRig[26]==""||posRig[26]==undefined?"-":Math.round(posRig[26]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>卖三</span>
                    <span :style="styleStatus(posRig[25],posRig[2])">{{posRig[25]==""||posRig[25]==undefined?"-":(posRig[25]*1).toFixed(2)}}</span>
                    <span>{{posRig[24]==""||posRig[24]==undefined?"-":Math.round(posRig[24]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>卖二</span>
                    <span :style="styleStatus(posRig[23],posRig[2])">{{posRig[23]==""||posRig[23]==undefined?"-":(posRig[23]*1).toFixed(2)}}</span>
                    <span>{{posRig[22]==""||posRig[22]==undefined?"-":Math.round(posRig[22]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>卖一</span>
                    <span :style="styleStatus(posRig[21],posRig[2])">{{posRig[21]==""||posRig[21]==undefined?"-":(posRig[21]*1).toFixed(2)}}</span>
                    <span>{{posRig[20]==""||posRig[20]==undefined?"-":Math.round(posRig[20]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;height:0px;border-top:1px solid #D9DEE4"></div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>买一</span>
                    <span :style="styleStatus(posRig[11],posRig[2])">{{posRig[11]==""||posRig[11]==undefined?"-":(posRig[11]*1).toFixed(2)}}</span>
                    <span>{{posRig[10]==""||posRig[10]==undefined?"-":Math.round(posRig[10]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>买二</span>
                    <span :style="styleStatus(posRig[13],posRig[2])">{{posRig[13]==""||posRig[13]==undefined?"-":(posRig[13]*1).toFixed(2)}}</span>
                    <span>{{posRig[12]==""||posRig[12]==undefined?"-":Math.round(posRig[12]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>买三</span>
                    <span :style="styleStatus(posRig[15],posRig[2])">{{posRig[15]==""||posRig[15]==undefined?"-":(posRig[15]*1).toFixed(2)}}</span>
                    <span>{{posRig[14]==""||posRig[14]==undefined?"-":Math.round(posRig[14]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>买四</span>
                    <span :style="styleStatus(posRig[17],posRig[2])">{{posRig[17]==""||posRig[17]==undefined?"-":(posRig[17]*1).toFixed(2)}}</span>
                    <span>{{posRig[16]==""||posRig[16]==undefined?"-":Math.round(posRig[16]/100)}}</span>
                 </div>
                 <div class="cmp_b_c1_2" style="margin-top:7px;">
                    <span>买五</span>
                    <span :style="styleStatus(posRig[19],posRig[2])">{{posRig[19]==""||posRig[19]==undefined?"-":(posRig[19]*1).toFixed(2)}}</span>
                    <span>{{posRig[18]==""||posRig[18]==undefined?"-":Math.round(posRig[18]/100)}}</span>
                 </div>
              </div>    
          </div>
       </div>
       <!--股票行情-->
       <div class="buy-d3">
          <div class="cmp_cont">
             <div class="cmp_b_c2" style="border-style:none">
                <!--按钮选择图-->
                <div class="cmp_b_N"><a style="color:#FA5882" class="atn" @click="clickAn($event)">分时图</a><span> | </span><a class="atn" @click="clickAn($event)">K线图</a></div>
                <!--gif图-->
                <drawTime v-if="optionDex == 0" ref="drawTime"></drawTime>
                <drawKline ref="drawKline" v-else></drawKline>
             </div>    
          </div>
       </div>
   </div>
</template>
<script>
import APIS from '../../utils/apis'
import {getStock,getBuyAndSale} from '../../utils/out'
import DrawKline from '../plugs/DrawKline'
import DrawTime from '../plugs/DrawTime'
import { setStatuc } from '@/utils/request'
let vm;
export default {
  data() {
      return {
         form: {
          stockStr: '',
          stockCode: '',
          stockName: '-',
          buyPrice: undefined,
          canBuyNum: undefined,
          buyNum: undefined,
          planPrice: undefined,
          loading: false,
          stocknumber: undefined,
          options: []
        },
        acountCashAggregationBean:{
				assets:0.00,//总资产
//					startValue:100000,//初期金额
				marketValue:0.00,//市值
                balance: 0.00, //可用余额
                freeze: 0.00 //冻结资金
		},
        rules:{
          stockStr:[
              { required: true, message: '请输入股票代码', trigger: 'change' }
          ],
          buyPrice: [
              {required: true, message: '请输入买入价格', trigger: 'blur'},
              {
                  validator:function(rule,value,callback){
                      if(isNaN(value)){
                        //不是数字的情况
                        callback("请输入正确的价格")
                        return false;
                      }else{
                       //是数字的情况
                       if(vm.posRig.length == 0){
                           callback("请选择股票");
                           return false;
                       }else{
                        //    console.log(posRig[posRig.length - 2]);
                           
                           if(value*1 > vm.posRig[vm.posRig.length - 2]){
                               callback("买入价格大于涨停价格");
                               return false;
                           }
                           if(value*1 < vm.posRig[vm.posRig.length - 1]){
                               callback("买入价格小于跌停价格");
                               return false;
                           }
                           callback();
                       }
                       
                      }
                  },
                  trigger: 'blur'
              }
          ],
          buyNum: [
             { required: true, message: '请输入买入股票的数量', trigger: 'blur' },
             {
                validator: function(rule,value,callback) {
                    if (!(/(^[1-9]\d*$)/.test(value))) { 
　　　                  callback('输入的不是正整数');
                        return false;
　　　　             }else { 
                       let bai = value % 100 == 0 ? true : false;
                       if(bai){
                         if(value*1 > vm.form.canBuyNum*1){
                             callback('买入数量大于可买数量');
                             return false;
                         }
                         callback();
                         return true;
                       }else{
                         callback('买入数量必须是100的倍数'); 
                         return false;
                       }
　　　　　　            
　　　　            } 
                },
                trigger: 'blur' 
             }
          ]
        },
        posRig:[],
        optionDex: 0,
        styleStatus:(p1,p2) =>{ //对右边状态的把控 p1是当前值 p2是昨天收盘价
           if(p1 > p2){
               return "color:red"
           }else if(p1 < p2){
               if(p1 == 0){
                   return "color:#363636"
               }
               return "color:#17B73B"
           }else{
               return "color:#363636"
           }
        },
        ntime: 0,
        nday: 0,
        firbuyPrice: 0,
        eIvn: undefined,
        autoGo: false
      }
  },
  components:{
    "drawKline": DrawKline,
    "drawTime": DrawTime
  },
  beforeDestroy() {
    vm.autoGo = false;
    window.clearInterval(vm.eIvn);
    vm.eIvn = undefined;
    vm = undefined;
  },
  mounted() {
    vm = this;
    vm.hasStockCode();
    vm.timeFun();
    // vm.timeSharder();
  },
  methods: {
      submitForm(formName) {
        vm.getBs(vm.form.stockCode).then(vm.positionCommon()).then(() => { 
        vm.$refs[formName].validate((valid) => {
            if(valid){
                 vm.$confirm('<div class="d1"><p><span>证券名称：</span><span>'+vm.form.stockName+'</span></p><p><span>证券代码：</span><span>'+vm.form.stockCode+'</span></p></div>' +
                            '<div class="d1"><p><span>委托价格：</span><span>'+vm.form.buyPrice+'</span></p><p><span>委托数量：</span><span>'+vm.form.buyNum+'</span></p></div>' +
                            '<div class="d1"><p><span>当前持仓：</span><span>'+vm.form.stocknumber+'</span></p><p><span>预计金额：</span><span>'+vm.form.planPrice+'</span></p></div>', '提示', {
                         dangerouslyUseHTMLString: true,
                         confirmButtonText: '确定',
                         cancelButtonText: '取消',
                         type: ''
                       }).then(() => {
                            setStatuc(0);
                            APIS.buySubmit(vm.form.stockCode,vm.form.buyPrice,vm.form.buyNum).then((res) => {
                                        if(res.code == 0) {
                                             this.$message({
                                               message: '买入成功',
                                               type: 'success'
                                             });
                                        }else{
                                            this.$message({
                                              message: res.msg,
                                              type: 'warning'
                                            });
                                        }
                            }).catch(err => {
                                this.$message.error('出现错误，请稍后再试');
                            })                   
                    }).catch(() => {
                         this.$message({
                         type: 'info',
                         message: '已取消删除'
                        });          
                    });
                
             
            }else{
              vm.$message.error('提交失败，请检查输入内容是否正确');
              return false;
            }
        })
        }).catch(err => {
            console.log(err);   
        });
      },
       remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          let t = (new Date()).valueOf();
          getStock(t,query,function() {
             vm.form.options = [];
             let suggestdata = eval("suggestdata_"+t);
             if(suggestdata == undefined || suggestdata == ""){
                 return;
             }
             let arr = suggestdata.split(";");
             arr.forEach(element => {
                 let arr1 = element.split(",");
                 if(arr1[1] == 11){
                    let obj = {
                     stockCode: arr1[3],
                     stockName: arr1[4],
                     str: arr1[3].substring(2)
                    }
                    vm.form.options.push(obj);
                 }
             })
          })
        } else {
          vm.form.options = [];
        }
       },
     //显示列表的效果  
     getDone(data) {
        // console.log(data) sz300104
        if(data == undefined || data == ""){
            return;
        }
         vm.form.stockCode = data;
         vm.startBS(data);
         vm.ntime = 0;
         vm.nday = 0;
         vm.firbuyPrice = 0;
     },
     //选择分时图还是k线图
     clickAn(e) { 
         vm.ntime = 0;
         vm.nday = 0;
        let ele = e.target;
        let _this = $(ele);
        _this.css("color","#FA5882");
        let n = _this.index(".atn");
        $(".atn").not(_this).css("color","#1E1E1E");
        if(n == 0){
            //分时线的图
            vm.optionDex = 0;
        }else{
            vm.optionDex = 1;
        }
     },
     //刚进入时的效果
     startBS(stockCode){
               vm.getBs(stockCode).then(function() {
                   vm.autoGo = true;
                   vm.positionCommon();
               }).catch(err => {
                console.log(err);   
               });     
     },
     //获取买入卖出的接口
     getBs(stockCode) {
        return new Promise((resolve, reject) => {
             getBuyAndSale(stockCode,function() {
             let hq_str = eval("hq_str_"+stockCode);
             let arr = hq_str.split(",");
            //  console.log(arr);
             let up = "--";
             let down = "--";
             let zf = "--";
            //  console.log(arr[0].substring(1,3));
             vm.form.stockName = arr[0];
             if(arr[0].substring(1,3) == "ST"){
                up = (arr[2]*1 + arr[2]*0.05).toFixed(2);
                down = (arr[2]*1 - arr[2]*0.05).toFixed(2);
                zf = "5%";
             }else{
                up = (arr[2]*1 + arr[2]*0.1).toFixed(2);
                down = (arr[2]*1 - arr[2]*0.1).toFixed(2);
                 zf = "10%";
             }
             arr.push(zf);
             arr.push(up);
             arr.push(down);
             //给买入金额第一次赋值。
             if(vm.firbuyPrice == 0){
                 vm.form.buyPrice = (arr[3]*1).toFixed(2);
                 vm.firbuyPrice = 1;
             }

             let b1 =Math.abs( (arr[4]*1) - (arr[2]*1) );
             let b2 =Math.abs( (arr[5]*1) - (arr[2]*1) );
             vm.posRig = arr;
             //每秒钟给出的到底是分时图，还是K线图
             if(vm.optionDex == 0){
                //分时线图    
                if(b1 > b2){
                 vm.$refs.drawTime.canvaMax = (arr[4]*1).toFixed(2);
                 vm.$refs.drawTime.canvaMin = (arr[2]*1 - b1).toFixed(2);
                }else{
                 vm.$refs.drawTime.canvaMax = (arr[2]*1 + b2).toFixed(2);
                 vm.$refs.drawTime.canvaMin = (arr[5]*1).toFixed(2);
                }
                vm.$refs.drawTime.stockCode = vm.form.stockCode;
                vm.$refs.drawTime.posRig = vm.posRig;
                if(vm.$refs.drawTime.mychart1 != undefined){//判断是否创建分时线图
                      if(vm.ntime == 0){
                         //vm.ntime 执行一次时，创建分时图
                         vm.autoGo = false;
                         vm.$refs.drawTime.chartInit();
                         vm.$refs.drawTime.mychart1.clear();
                         vm.$refs.drawTime.getBaiduData().then(() => { 
                           vm.ntime = 1;
                           vm.autoGo = true;
                         })
                      }else{
                         //之后每秒更新数据 
                         let p = vm.$refs.drawTime.mychart1.getOption();
                         p.yAxis[0].min = vm.$refs.drawTime.canvaMin;
                         p.yAxis[0].max = vm.$refs.drawTime.canvaMax;
                         vm.$refs.drawTime.datay.splice((vm.$refs.drawTime.datay.length-1),1,(arr[3]*1).toFixed(2));               
                         p.series[0].data = vm.$refs.drawTime.datay;
                         vm.$refs.drawTime.mychart1.setOption(p);
                      }                                  
                }  
             }else{  
                //K线图       
                vm.$refs.drawKline.stockCode = vm.form.stockCode;
                if(vm.$refs.drawKline.mychart2 != undefined){//判断是否创建K线图
                   if(vm.nday == 0) {
                      //vm.nday 用来执行一次即可，每秒处理
                      vm.autoGo = false;
                      vm.$refs.drawKline.mychart2.clear();
                      vm.$refs.drawKline.getBaiduData().then(() => {
                        vm.nday = 1;
                        vm.autoGo = true;
                      })
                   }
                }
                
             }
             resolve(0);
            });
        })
     },
    //每秒钟获取数据
    timeFun() {
        vm.eIvn = self.setInterval(function() {
            if(vm.autoGo){
               vm.autoGo = false;
               vm.getBs(vm.form.stockCode).then(vm.positionCommon()).catch(err => {
                console.log(err);   
               });
            }
             
        },1000)     

    },
    //点击全部的效果
    dianMe() {
      vm.form.buyNum = vm.form.canBuyNum;
    },
    //获取持仓的值
   positionCommon() {     
       return new Promise((resolve,reject) => {
                 if(vm.form.stockCode == "--"){
                     return;
                 }
				APIS.positionCommon().then(function(res) {
                  if(res.code != 0){
						return;
					}
				   let positionCommonData = res.data;
                   let acountCashAggregationBean = positionCommonData.acountCashAggregationBean;
                //    console.log(acountCashAggregationBean);
                   
                   let balance = acountCashAggregationBean.balance;
                   let limitAmout = acountCashAggregationBean.limitAmount;
                   let x1 = balance*1 - limitAmout*1;
                   //可卖股数赋值
                   if(vm.form.buyPrice == undefined || vm.form.buyPrice == 0){
                       vm.form.canBuyNum = undefined;
                   }else{
                       let cn = parseInt((x1/vm.form.buyPrice)/100)*100;
                       if(isNaN(cn)){
                           vm.form.canBuyNum = undefined;
                       }else{
                           vm.form.canBuyNum = cn; 
                       }
                   }
                   vm.acountCashAggregationBean.balance = (acountCashAggregationBean.balance*1).toFixed(2);
                   vm.acountCashAggregationBean.assets = (acountCashAggregationBean.assets*1).toFixed(2);
                   vm.acountCashAggregationBean.freeze = (acountCashAggregationBean.freeze*1).toFixed(2);
                   vm.acountCashAggregationBean.marketValue = (acountCashAggregationBean.marketValue*1).toFixed(2);
                   let code = '';
                   if(vm.form.stockCode.indexOf("ST") != -1){
                     code = vm.form.stockCode.substring(vm.form.stockCode.indexOf("ST")+1,vm.form.stockCode.length);
                   }else{
                     code = vm.form.stockCode.substring(2,vm.form.stockCode.length);
                   }
                  
                   vm.$emit('listenPos',vm.acountCashAggregationBean);//抛出资管数据
                     //给预计的金额赋值
                     let val = vm.form.buyPrice*vm.form.buyNum;
                     if(isNaN(val)){
                        vm.form.planPrice = undefined;
                     }else{
                        vm.form.planPrice = val.toFixed(2);
                     }

                   //获取当前持仓的内容
                   let positions = positionCommonData.positions;
                   if(positions.length == 0){
                       vm.form.stocknumber = 0;
                   }else{
                      //判断是否有该股票 
                      let jnj =  positions.findIndex(ele => {
                          return ele.stockCode == code;
                      });
                      if(jnj == -1){
                         vm.form.stocknumber = 0; 
                      }else{
                         vm.form.stocknumber =  positions[jnj].number;
                      }
                   }
                    vm.autoGo = true;
                    resolve(880);
				})
				.catch(function(error) {
					console.log(error)
                })
              }) 
            },
     //刚进入界面时判断是否有stockCode
     hasStockCode() {
         if(vm.$route.query.stockCode){
             vm.form.stockStr = vm.$route.query.stockCode.substring(2);
             vm.getDone(vm.$route.query.stockCode);
         }
     }
      
  }
}
</script>


