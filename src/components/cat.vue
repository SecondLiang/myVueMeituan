<template>
    <div id="cat-warp">
        <div class="left"></div>
        <div class="center">
            <span class="pay-price" :class="{payPriceOk:getCount > 0}">￥{{getTotal}}</span>
            <span class="transport-info">另需配送费￥{{seller.deliveryPrice}}元</span>
        </div>
        <div class="right" ref="rightBox">
            <span class="transport-require" :class="{transportRequireOk:getTotal >= seller.minPrice}" ref="transportRequire">{{returnTotal}}</span>
        </div>
        <div class="cat-logo-box" :class="{catLogoBoxOk:selecdGoods.length > 0}" @click="catPage()" ref="catLogoBox">
            <span id="cat-logo" class="icon-shopping_cart cat-logo" ref="catLogo"></span>
            <span class="hint" ref="hint" v-show="getCount > 0" >{{getCount}}</span>
        </div>
        <div class="order-page" v-show="flag">
            <div class="title border-1px">
                <span class="name">购物车</span>
                <span class="empty" @click="clickEmpty">清空</span>
            </div>
            <div class="order-list">
                <ul>
                    <li class="list-itme border-1px" v-for="(itme,index) in selecdGoods">
                        <div class="order-left">{{itme.name}}</div>
                        <div class="order-right">
                            <span class="price">￥{{itme.price}}</span>
                            <span class="reduce icon-remove_circle_outline" @click="reduce(itme)"></span>
                            <span class="count">{{itme.num}}</span>
                            <span class="add icon-add_circle" @click="add(itme)"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg-page" v-show="flag" ref="bgPage"></div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      flag: false
    };
  },
  computed: {
    ...mapState({
      seller: "seller",
      selecdGoods: "selecdGoods"
    }),
    ...mapGetters({
      getCount: "getCount"
    }),
    getTotal(){
        var num = 0;
        if(this.selecdGoods.length > 0){
            this.selecdGoods.forEach((ele) => {
                num += ele.price * ele.num;
            })
        }
        return num;
    },
    returnTotal(){
        if(!this.getTotal){
            return `￥${this.seller.minPrice}起送`
        }else if(this.getTotal > 0 && this.getTotal < 20){
            return `还差${this.seller.minPrice - this.getTotal}起送`;
        }else{
            return `去结算`;
        }
    }
  },
    //页面渲染完成之后   
  mounted(){
      this.$refs.bgPage.style.height = document.body.offsetHeight + 'px';
      this.$refs.bgPage.style.width = document.body.offsetWidth + 'px';
  },
  watch:{
      selecdGoods(){
          if(this.selecdGoods.length === 0){
              this.flag = false;
          }
      }
  },
  methods: {
    catPage(event) {
        if(this.selecdGoods.length > 0){
            this.flag = !this.flag;
        }
    },
    clickEmpty(){
        this.empty();
        this.flag = false;
    },
    ...mapMutations({
      add: "add",
      reduce: "reduce",
      empty: "empty"
    })
  }
};
</script>


<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl';

#cat-warp {
    width: 100%;
    height: 100%;
    display: flex;

    .left {
        flex: 0 0 80px;
        background-color: #141d27;
        text-align: right;
        position: relative;
    }

    .center {
        flex: 1;
        background-color: #141d27;
        font-size: 0px;

        .pay-price {
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
            color: rgba(255, 255, 255, 0.6);
            border-right:1px solid rgba(255, 255, 255, 0.4);
            padding-right: 10px;
            &.payPriceOk{
                color rgb(255,255,255)
            }
        }

        .transport-info {
            font-size: 14px;
            font-weight: lighter;
            line-height: 48px;
            color: rgba(255, 255, 255, 0.6);
            padding-left: 10px;
        }
    }

    .right {
        flex: 0 0 90px;
        box-sizing: border-box;
        text-align: center;
        .transport-require {
            display:inline-block;
            font-size: 16px;
            font-weight: 700;
            line-height: 48px;
            width:100%;
            height: 100%;
            color: rgb(160, 160, 160);
            background-color: rgb(90, 90, 90);
            &.transportRequireOk{
                color: rgb(255, 255, 255);
                background-color: rgb(0, 128, 0);
            }
        }
    }

    .cat-logo-box {
        position: absolute;
        bottom: 4px;
        left: 12px;
        z-index: 20;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 6px solid #141d27;
        background-color: rgb(90, 90, 90);
        color: rgb(150, 150, 150);
        &.catLogoBoxOk{
            background-color: rgb(0, 160, 220);
            color: rgb(255, 255, 255);
        }
        

        .cat-logo {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            font-size: 26px;
        }

        .hint {
            position: absolute;
            left: 32px;
            top: -6px;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 10px;
            font-size: 9px;
            color: rgb(255, 255, 255);
            font-weight: 700;
            background-color: rgb(240, 20, 20);
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
        }
    }

    .order-page {
        position: absolute;
        bottom: 48px;
        left: 0px;
        z-index: 18;
        background-color: #fff;
        width: 100%;
        max-height: 256px;
        // display: none;
        overflow-y: auto;

        .title {
            height: 40px;
            width: 100%;
            padding: 0 18px;
            box-sizing: border-box;
            background-color: #f3f5f7;
            border-1px(rgba(7, 17, 27, 0.2));

            .name, .empty {
                display: inline-block;
                font-size: 14px;
                line-height: 40px;
            }

            .name {
                float: left;
                font-weight: 500;
                color: rgb(7, 17, 27);
            }

            .empty {
                float: right;
                color: rgb(0, 160, 220);
            }
        }

        .order-list {
            box-sizing: border-box;
            width: 100%;
            max-height:216px;
            padding: 0 18px;
            position: relative;
            overflow-y: auto;
            padding-bottom:10px;
            .list-itme {
                height: 48px;
                box-sizing: border-box;
                border-1px(rgba(7, 17, 27, 0.1));

                .order-left {
                    float: left;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    line-height: 48px;
                }

                .order-right {
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    font-size: 0px;

                    .price {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                        line-height: 48px;
                        padding-right: 12px;
                    }

                    .reduce, .add {
                        font-size: 24px;
                        color: rgb(0, 160, 220);
                        line-height: 48px;
                    }

                    .reduce {
                    }

                    .add {
                    }

                    .count {
                        display: inline-block;
                        vertical-align: top;
                        width: 24px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        line-height: 48px;
                        text-align: center;
                    }
                }
            }
        }
    }

    .bg-page {
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: -1;
        background-color: rgba(7, 17, 27, 0.8);
        // display: none;
    }
}
</style>