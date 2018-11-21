<template>
  <div id="app">
    <div class="header" ref="headWarp">
      <v-header></v-header>
    </div>
    <div class="tab border-1px" ref="tabWarp">
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
    <div class="content" ref="contentWarp">
      <router-view class="goods" ref="goodsWarp"></router-view>
    </div>
    <div class="cat" ref="catWarp">
      <v-cat></v-cat>
    </div>
  </div>
</template>

<script>
import header from './components/header.vue'
import goods from './components/goods.vue'
import seller from './components/seller.vue'
const cat = () => import("./components/cat.vue");
const ratings = () => import('./components/ratings')  //异步加载组件

import axios from 'axios'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  data(){
    return {
      
    }
  },
  name: 'App',
  components:{
    'v-header':header,
    'v-goods':goods,
    'v-ratings':ratings,
    'v-seller':seller,
    "v-cat": cat
  },
  methods:{
    ...mapActions({
        asycnGoods:'asycnGoods',
        asycnSeller:'asycnSeller'
    })
  },
  // 页面创建完成 取数据
  created(){
    this.asycnSeller();
    this.asycnGoods();
  },
  // 页面渲染完
  mounted(){
    console.log(document.body.offsetHeight 
                                            - this.$refs.headWarp.offsetHeight 
                                            - this.$refs.catWarp.offsetHeight
                                            - this.$refs.tabWarp.offsetHeight);

  },
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
  // overflow hidden
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
          display block
          width 100%
          height 100%
        a.router-link-exact-active
          color rgb(240,20,20)
    .cat 
      position: fixed;
      bottom: 0px;
      left: 0px;
      z-index 1
      width: 100%;
      height: 48px;
    
</style>
