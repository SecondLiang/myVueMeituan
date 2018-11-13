<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab border-1px">
      <div class="itme godds-btn">
        <router-link :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="itme ratings-btn">
        <router-link :to="{name:'ratings'}">评价</router-link>
      </div>
      <div class="itme seller-btn">
        <router-link :to="{name:'seller'}">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import header from './components/header'
import goods from './components/goods'
import seller from './components/seller'
// import ratings from './components/ratings'

const ratings = () => import('./components/ratings')  //异步加载组件

import axios from 'axios'
export default {
  data(){
    return {
      seller:{}
    }
  },
  name: 'App',
  components:{
    'v-header':header,
    'v-goods':goods,
    'v-ratings':ratings,
    'v-seller':seller
  },
  // 页面创建完成 取数据
  created(){
    axios.get('meituan/api/seller').then(res => {
      if(res.data.code === 0){
        this.seller = res.data.data;
        console.log(this.seller);
      }
    }).catch(error => {
      console.log(error);
    })
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus'>
@import '../static/reset.css';
@import '../static/style.css'; 

/* 使用stylus css预处理框架 */
/* 下载 stylus、stylus-loader、style-loader、css-loader、postcss-loader 到开发环境中*/

/* 导入基础.styl文件 */
@import './assets/stylus/index.styl';
html
body
  width 100%
  height 100%
  overflow hidden
  #app
    position relative
    .header
      width 100%
      height 134px
    .tab
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(240,20,20,0.1))
      display flex 
      .itme
        flex 1
        font-size 14px
        text-align center
        a
          text-decoration none
          font-weight 200
        a.router-link-exact-active
          color rgb(240,20,20)
</style>
