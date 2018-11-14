<template>
    <div class="header-warpper">
        <div class="title-warp">
            <div class="avatar-box">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="top-shop">
                    <span class="brand"></span>
                    <span class="shop-name">{{seller.name}}</span>
                </div>
                <div class="center-logistics">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="bottom-favourable" v-if="seller.supports">
                    <span class="favourable-logo"></span>
                    <span class="favourable-describe">{{seller.supports[0].description}}</span>
                </div>
                <div class="right-btn" v-if="seller.supports" @click="noticePage()">
                    <span class="num">{{seller.supports.length}}个</span>
                    <span class="icon-keyboard_arrow_right more"></span>
                </div>
            </div>
        </div>
        <div class="notice-warp" @click="noticePage()">
            <span class="notice-logo"></span>
            <span class="notice-describe">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right more"></span>
        </div>
        <div class="bg-warp">
            <img :src="seller.avatar" alt="">
        </div>
        <div class="notice-page">
            <div class="shop-name"></div>
            <div class="favourable-info"></div>
            <div class="seller-notice"></div>
            <div class="close" @click="close()">
                <span class="icon-close icon"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            notice:null
        }
    },
    props:{
        seller:{
            type:Object
        }
    },
    methods:{
        noticePage(){
            this.notice = document.getElementsByClassName('notice-page')[0]
            this.notice.style.display = 'block';
            this.notice.style.height = document.body.offsetHeight + 'px';
            this.notice.style.width = document.body.offsetWidth + 'px';
            this.notice.style.position = 'fixed';
            this.notice.style.top = '0px';
            this.notice.style.left = '0px';
            this.notice.style.zIndex = 50;
            this.notice.style.backgroundColor = 'rgba(7,17,27,0.8)';
        },
        close(){
            this.notice.style.display = 'none';
        }
    }
}
</script>


<style lang='stylus' ref='stylesheet/stylus'>

.header-warpper
  position relative
  overflow hidden
  .title-warp
    position relative
    padding 24px 24px 18px 24px
    background-color rgba(7,17,27,0.5)
    .avatar-box
      float left 
      img
        width 64px
        height 64px;
        border-radius 2px
    .content
      margin-left 64px
      padding-left 16px
      .top-shop
        margin-top 2px
        width 100%
        height 18px
        font-size 0px
        overflow hidden
        .brand
          display inline-block
          width 32px
          height 100%
          background url('../assets/images/brand@2x.png') 0 0/100% 100% no-repeat
        .shop-name
          display inline-block
          height 18px
          color rgb(255,255,255)
          font-size 16px
          font-weight bold
          line-height 18px
          margin-left 6px
          vertical-align top
      .center-logistics
        font-size 12px
        color rgb(255,255,255)
        line-height 12px
        margin-top 8px
      .bottom-favourable
        margin-top 10px
        font-size 0px;
        .favourable-logo
          display inline-block
          width 14px
          height 14px
          background url('../assets/images/discount_1@2x.png') 0 0/100% 100% repeat
        .favourable-describe
          display inline-block
          font-size 10px
          color rgb(255,255,255)
          font-weight 200
          line-height 12px
          margin-left 4px;
          vertical-align top
      .right-btn
        position absolute
        right 24px
        bottom 14px
        z-index 10
        width 48px
        height 24px
        border-radius 15px
        background-color rgba(0,0,0,0.2)
        font-size 10px;
        color rgb(255,255,255)
        font-weight 200
        text-align center
        .num
          display inline-block
          line-height 24px
  .notice-warp
    height 28px
    color rgb(255,255,255)
    padding 0 12px
    display flex 
    background-color rgba(7,17,27,0.2)
    font-size 0px
    span 
      display inline-block
      line-height 28px
    .notice-logo
      position relative
      top 7px
      width 20px
      height 14px
      background url('../assets/images/bulletin@2x.png') 0 0/100% 100% no-repeat 
    .notice-describe
      flex 1
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      font-size 10px
      margin-left 4px
    .more
      width 10px
      height 10px
      font-size 10px
      margin-left 4px
  .bg-warp
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    filter blur(10px)
    img 
      width 100%
  .notice-page
    display none 
    // filter blur(10px)
    .close
      position absolute 
      bottom 32px;
      left 50%;
      width 32px;
      height 32px;
      transform translateX(-50%)
      .icon
        font-size 32px
        font-weight 700
        color rgba(255,255,255,0.5);

      
      








</style>
