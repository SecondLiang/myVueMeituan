import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import header from '../components/header'
import goods from '../components/goods'
import seller from '../components/seller'
// import ratings from '../components/ratings'
const ratings = () => import('../components/ratings')  //路由懒加载 方法一
// const ratings = resolve => require(['../components/ratings'],resolve)  //路由懒加载 方法一


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      // component: goods
      redirect:'/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
