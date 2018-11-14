<template>
    <div id="cat-warp">
        <div class="left"></div>
        <div class="center">
            <span class="pay-price border-1px-right">￥{{payPrice}}</span>
            <span class="transport-info">另需配送费￥{{catInfo.deliveryPrice}}元</span>
        </div>
        <div class="right">
            <span class="transport-require">￥{{catInfo.minPrice}}起送</span>
        </div>
        <div class="cat-logo-box" @click="catPage()">
            <span class="icon-shopping_cart cat-logo"></span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        catInfo:{
            type:Object
        },
        payPrice:{
            type:Number
        }
    },
    methods:{
        catPage(){
            
        }
    }
}
</script>


<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl';

#cat-warp{
    width 100%
    height 100%
    display flex 
    .left{
        flex 0 0 80px
        background-color rgb(60,60,60)
        text-align right
        position relative
    }
    .center{
        flex 1
        background-color rgb(60,60,60)
        font-size 0px
        .pay-price{
            font-size 16px 
            font-weight 700
            line-height 48px
            color rgba(255,255,255,0.6)
            border-1px-right(rgba(255,255,255,0.4))
            padding-right 10px
        }
        .transport-info{
            font-size 14px
            font-weight lighter 
            line-height 48px
            color rgba(255,255,255,0.6)
            padding-left 10px
        }
    }
    .right{
        flex 0 0 90px
        background-color rgb(90,90,90)
        padding 0 8px;
        box-sizing border-box
        .transport-require{
            font-size 16px
            font-weight 700
            line-height 48px
            color rgb(160,160,160)    
        }
    }
    .cat-logo-box{
        position absolute
        bottom 4px
        left 12px
        z-index 20
        width 48px
        height 48px
        border-radius 50%
        border 6px solid rgb(60,60,60)
        background-color rgb(90,90,90)
        .cat-logo{
            position absolute
            left 50%
            top 50%
            transform translate3d(-50%,-50%,0)
            font-size 26px
            color rgb(150,150,150)
        }
    }
}

</style>