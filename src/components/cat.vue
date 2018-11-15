<template>
    <div id="cat-warp">
        <div class="left"></div>
        <div class="center">
            <span class="pay-price border-1px-right">￥{{catOrder.total}}</span>
            <span class="transport-info">另需配送费￥{{catInfo.deliveryPrice}}元</span>
        </div>
        <div class="right">
            <span class="transport-require">￥{{catInfo.minPrice}}起送</span>
        </div>
        <div class="cat-logo-box" @click="catPage()" ref="catLogoBox">
            <span id="cat-logo" class="icon-shopping_cart cat-logo" ref="catLogo"></span>
        </div>
        <div class="order-page" ref="orderPage">
            <div class="title border-1px">
                <span class="name">购物车</span>
                <span class="empty" @click="empty()">清空</span>
            </div>
            <div class="order-list">
                <ul>
                    <li class="list-itme border-1px" v-for="(itme,index) in catOrder.foodSelected">
                        <div class="order-left">{{itme.name}}</div>
                        <div class="order-right">
                            <span class="price">￥{{itme.price}}</span>
                            <span class="reduce icon-remove_circle_outline"></span>
                            <span class="count">{{itme.counts}}</span>
                            <span class="add icon-add_circle"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg-page" ref="bgPage"></div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return {
            catOrder:this.order,
            flag:true
        }
    },
    props:{
        catInfo:{
            type:Object
        },
        payPrice:{
            type:Number
        },
        order:{
            type:Object
        }
    },
    methods:{
        catPage(){
            // console.log(this.catOrder);
            if(this.catOrder.foodSelected.length == 0){
                return;
            }
            if(this.flag){
                this.$refs.bgPage.style.display = 'block';
                this.$refs.bgPage.style.width = document.body.offsetWidth + 'px';
                this.$refs.bgPage.style.height = document.body.offsetHeight + 'px';
                
                this.$refs.orderPage.style.display = 'block';
                this.$refs.catLogo.style.color = 'rgb(255,255,255)';
                this.$refs.catLogoBox.style.backgroundColor = 'rgb(0,160,220)';

                this.flag = false;
            }else{
                this.$refs.bgPage.style.display = 'none';
                this.$refs.orderPage.style.display = 'none';
                this.$refs.catLogo.style.color = 'rgb(150,150,150)';
                this.$refs.catLogoBox.style.backgroundColor = 'rgb(90,90,90)';
                this.flag = true;
            }
        },
        empty(){
            this.catPage();
            this.catOrder.foodSelected = [];
            this.catOrder.total = 0;
            
        }
    },
    watch:{
        catOrder:{
            foodSelected(){
                this.$emit('tellme');
            }
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
    .order-page{
        position absolute
        bottom 48px
        left 0px
        z-index 18
        background-color #fff
        width 100%
        height 256px
        display none 
        overflow-y auto
        .title{
            height 40px
            width 100%
            padding 0 18px
            box-sizing border-box
            background-color #f3f5f7
            border-1px(rgba(7,17,27,0.2))
            .name,.empty{
                display inline-block
                font-size 14px
                line-height 40px    
            }
            .name{
                float left
                font-weight 500
                color rgb(7,17,27);
            }
            .empty{
                float right 
                color rgb(0,160,220);
            }    
        }
        .order-list{
            box-sizing border-box
            width 100%
            padding 0 18px
            position relative;
            .list-itme{
                height 48px
                box-sizing border-box
                border-1px(rgba(7,17,27,0.1))
                .order-left{
                    float left
                    font-size 14px
                    color rgb(7,17,27)
                    line-height 48px
                }
                .order-right{
                    position absolute
                    right 0px
                    top 0px
                    font-size 0px
                    .price{
                        display inline-block
                        vertical-align top
                        font-size 14px
                        font-weight 700
                        color rgb(240,20,20)
                        line-height 48px
                        padding-right 12px
                    }   
                    .reduce,.add{
                        font-size 24px
                        color rgb(0,160,220)
                        line-height 48px
                    }
                    .reduce{
                        
                    }
                    .add{
                        
                    }
                    .count{
                        display inline-block
                        vertical-align top
                        width 24px
                        font-size 10px
                        color rgb(147,153,159)
                        line-height 48px
                        text-align center
                    }
                }
            }
            
        }
    }
    .bg-page{
        position fixed
        left 0px
        top 0px
        z-index -1
        background-color rgba(7,17,27,0.8);   
        display none  
    }
}

</style>