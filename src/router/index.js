import Vue from 'vue'
import Router from 'vue-router'
import ParentCompont from '@/components/ParentCompont'
import Login from '@/components/user/Login'
import APIS from '@/utils/apis'
import { setToken, setDomain, getDomain } from '@/utils/auth'
import { MessageBox } from 'element-ui'
import { setStatuc } from '@/utils/request'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: '登录界面',
      component: Login,
      meta: {
        requireAuth: false
      }
    },

    {
      path: '/',
      name: '超级父组件',
      component: ParentCompont,
      children: [
        {
          path: '',
          name: '买入',
          component: () => import('@/components/view/Buy'),
          meta: {
            title: "买入",
            nstatus: 'buy',
            requireAuth: true
          }
        },
        {
          path: 'sale',
          name: '卖出',
          component: () => import('@/components/view/Sale'),
          meta: {
            title: "卖出",
            nstatus: 'sale',
            requireAuth: true
          }
        },
        {
          path: 'revoke',
          name: '撤单',
          component: () => import('@/components/view/Revoke'),
          meta: {
            title: "撤单",
            nstatus: 'revoke',
            requireAuth: true
          }
        },
        {
          path: 'fundPosition',
          name: '资金持仓',
          component: () => import('@/components/view/FundPosition'),
          meta: {
            title: "资金持仓",
            nstatus: 'fundPosition',
            requireAuth: true
          }
        },
        {
          path: 'dayOrder',
          name: '当日委托',
          component: () => import('@/components/view/DayOrder'),
          meta: {
            title: "当日委托",
            nstatus: 'dayOrder',
            requireAuth: true
          }
        },
        {
          path: 'commissionedHistory',
          name: '历史委托',
          component: () => import('@/components/view/CommissionedHistory'),
          meta: {
            title: "历史委托",
            nstatus: 'commissionedHistory',
            requireAuth: true
          }
        },
        {
          path: 'dayTrande',
          name: '当日成交',
          component: () => import('@/components/view/DayTrande'),
          meta: {
            title: "当日成交",
            nstatus: 'dayTrande',
            requireAuth: true
          }
        },
        {
          path: 'trandeHistory',
          name: '历史成交',
          component: () => import('@/components/view/TrandeHistory'),
          meta: {
            title: "历史成交",
            nstatus: 'trandeHistory',
            requireAuth: true
          }
        },
        {
          path: 'accountCapital',
          name: '资金流水',
          component: () => import('@/components/view/AccountCapital'),
          meta: {
            title: "资金流水",
            nstatus: 'accountCapital',
            requireAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  setStatuc(0);
  let ttoken = to.query.token;
  if (ttoken) {
    setToken(ttoken);
  }

  let domain = to.query.domain;
  if (domain) {
    domain = domain + to.hash
    setDomain(domain);
  }
  
  if (to.matched.some(record => record.meta.requireAuth)){
    APIS.checklogin().then((res) => {
      if (res.code == 0) {
        Vue.prototype.Nstatus = to.meta.nstatus;
        next();
      }else{
        MessageBox.alert("由于你长时间未操作，请重新进入",{
          confirmButtonText: '确定',
          callback: action => {
            let dm = getDomain()
            if (dm){
              window.parent.postMessage('reload', '*');
            }else{
              next('/login');
            }
   
          }
        })
      }
    }).catch(error => {
      console.log(error);
    })
  }else{
    next();
  }
})

export default router
