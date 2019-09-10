import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home';
import Login from '@/components/Login';
import Detail from '@/components/Detail';
import Vacation_form from '@/components/Vacation_form';
import Overtime_form from '@/components/Overtime_form';

Vue.use(Router)

var router = new Router({
  mode:'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/vacation_form/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/vacation_form',
      name: 'vacation_form',
      component: Vacation_form
    },
    {
      path: '/overtime_form',
      name: 'overtime_form',
      component: Overtime_form
    },
    {
      path: '*',
      redirect: '/home'
    }

  ]
})

//添加全局路由导航守卫
//每一次路由跳转 都会执行
router.beforeEach((to,from,next) => {
  
  //console.log(to,from);

  //取出token,判断是否登陆
  var token = localStorage.getItem('token');
  if (token)//已登陆
  {
    if (to.path == '/login')
    {
      next(from.path); //留在当前页面
    }
    else
    {
      next(); //渲染对应的页面
    }
  }
  else//未登陆
  {
    if (to.path == '/login')
    {
      next(); //渲染对应的页面
    }
    else
    {
      next('/login');
    }
  }


})

export default router;