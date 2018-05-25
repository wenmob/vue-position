<style>
  .login-main{
     position: relative;
     width: 100%; 
     height: 100%;
     background-color: #2C3440;
     border-top:1px solid #2C3440;
  }
  .login-container{
     position: relative;
     width: 300px;
     height: 300px;
     background-color: transparent;
     left: 50%;
     margin-left: -150px;
     top: 50%;
     margin-top: -230px;
     overflow: hidden;
  }
  .login-cc{
      padding-top: 30px;
      padding-bottom: 30px;
  }
  .login-cc img{
      width: 64px;
      margin-left: 53px;
  }
  .login-cc h3{
      padding: 0;
      margin-top: 7px;
      font-size: 18px;
      color: white;
      margin-left: 53px;
  }
  .login-in1{
      width: 200px;
      height: 32px;
      padding: 7px;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -o-transition: all 0.3s;
  }
   .feelYue .el-form-item{
    margin-bottom: 10px !important;
  }
   .feelYue .el-form-item__label{
    font-size: 15px;
    color: white;
  }

</style>
<template>
   <div class="login-main">
       <div class="login-container">
           <div align="center" class="login-cc">
               <img src="../../assets/images/logo.png"/>
               <h3>用户登录</h3>
               <el-form :model="user" class="feelYue" :rules="userRule" ref="userForm" label-width="68px" size="small" style="width:240px;margin-top:30px">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="user.username" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="user.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="margin-top:20px;">
                 <el-button type="primary" @click="submitForm('userForm')" style="width:100%;font-size:14px;">登录</el-button>   
                </el-form-item>     
               </el-form>
           </div>
       </div>
   </div>
</template>
<script>
import APIS from '../../utils/apis'
import { setToken,setUserKey,getUserKey,setUserArray,getUserArray } from '../../utils/auth'
let vm;
export default {
  data() {
      return {
         user: {
             username: '',
             password: ''
         },
         userRule: {
            username: [
              { required: true, message: ' ', trigger: 'blur' }
            ],
         password: [
              { required: true, message: ' ', trigger: 'blur' }
            ]
         }
      }
  },
  beforeDestroy() {
   
  },
  mounted() {
   vm = this;
   let usname = getUserKey();
   if(usname){
       vm.user.username = usname;
   }
   vm.seeEnter();
  },
  methods:{
    //登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
             APIS.login(vm.user.username,vm.user.password).then(result => {
                if(result.code == 0){
                   setToken(result.data);
                   setUserKey(vm.user.username);
                   let obj = {
                       name: vm.user.username,
                       value: result.data 
                   }
                   setUserArray(obj);
                   vm.$router.push({path: '/fundPosition'})
                }else{
                   this.$message({
                      message: result.data,
                      type: 'warning'
                   }); 
                }
             }).catch(err => {
                this.$message.error('出错了，请刷新页面后重试');
             })
          } else {
            this.$message({
              message: '用户名和密码不能为空',
              type: 'warning'
            });
            return false;
          }
        });
    },
    //监听enter事件
     seeEnter() {
        $(document).keypress(function(e) {  
         // 回车键事件  
         if(e.which == 13) {  
            vm.submitForm('userForm');
         }  
        }); 
     }
  }
}
</script>

