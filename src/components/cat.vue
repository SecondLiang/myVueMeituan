<template>
    <div id="cat-warp">
        <div class="left"></div>
        <div class="center">
            <span class="pay-price border-1px-right" ref="payPrice">￥{{total}}</span>
            <span class="transport-info">另需配送费￥{{seller.deliveryPrice}}元</span>
        </div>
        <div class="right" ref="rightBox">
            <span class="transport-require" ref="transportRequire">￥{{seller.minPrice}}起送</span>
            <span class="toPayment" ref="toPayment">去结算</span>
        </div>
        <div class="cat-logo-box" @click="catPage($event)" ref="catLogoBox">
            <span id="cat-logo" class="icon-shopping_cart cat-logo" ref="catLogo"></span>
            <span class="hint" ref="hint">{{getCount}}</span>
        </div>
        <div class="order-page" ref="orderPage">
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
        <div class="bg-page" ref="bgPage"></div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      flag: true
    };
  },
  computed: {
    ...mapState({
      seller: "seller",
      total: "total",
      selecdGoods: "selecdGoods"
    }),
    ...mapGetters({
      getCount: "getCount"
    })
  },
  watch: {
    getCount(newCount) {
      if (newCount > 0) {
        this.$refs.hint.style.display = "inline-block";
      } else {
        this.$refs.hint.style.display = "none";
      }
    },
    selecdGoods() {
      if (this.getCount > 0) {
        this.$refs.catLogo.style.color = "rgb(255,255,255)";
        this.$refs.catLogoBox.style.backgroundColor = "rgb(0,160,220)";
        this.$refs.payPrice.style.color = "#fff";
      } else {
        this.$refs.bgPage.style.display = "none";
        this.$refs.orderPage.style.display = "none";  
        this.$refs.catLogo.style.color = "rgb(150,150,150)";
        this.$refs.catLogoBox.style.backgroundColor = "rgb(90,90,90)";
        this.$refs.payPrice.style.color = "rgb(255,255,255,0.6)";
        this.flag = true;
      }
    },
    total(news) {
      if (news > this.seller.minPrice) {
        this.$refs.rightBox.style.backgroundColor = "rgb(0,128,0)";
        this.$refs.transportRequire.style.display = "none";
        this.$refs.toPayment.style.display = "inline-block";
        this.$refs.toPayment.style.color = "rgb(255,255,255)";
      } else {
        this.$refs.rightBox.style.backgroundColor = "rgb(90,90,90)";
        this.$refs.transportRequire.style.display = "inline-block";
        this.$refs.toPayment.style.display = "none";
        this.$refs.toPayment.style.color = "rgb(160,160,160)";
        
      }
    }
  },
  methods: {
    catPage(event) {
      if (this.selecdGoods.length > 0) {
        //   console.log(this.selecdGoods.length,this.flag)
        if (this.flag) {
          this.$refs.bgPage.style.display = "block";
          this.$refs.bgPage.style.width = document.body.offsetWidth + "px";
          this.$refs.bgPage.style.height = document.body.offsetHeight + "px";
          this.$refs.orderPage.style.display = "block";

          this.flag = false;
        } else {
          this.$refs.bgPage.style.display = "none";
          this.$refs.orderPage.style.display = "none";
          this.flag = true;
        }
      }
    },
    clickEmpty(){
        this.empty();
        this.$refs.bgPage.style.display = "none";
        this.$refs.orderPage.style.display = "none";
        this.flag = true;
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
        background-color: rgb(60, 60, 60);
        text-align: right;
        position: relative;
    }

    .center {
        flex: 1;
        background-color: rgb(60, 60, 60);
        font-size: 0px;

        .pay-price {
            font-size: 16px;
            font-weight: 700;
            line-height: 48px;
            color: rgba(255, 255, 255, 0.6);
            border-1px-right(rgba(255, 255, 255, 0.4));
            padding-right: 10px;
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
        background-color: rgb(90, 90, 90);
        padding: 0 8px;
        box-sizing: border-box;
        text-align: center;

        .transport-require {
            font-size: 16px;
            font-weight: 700;
            line-height: 48px;
            color: rgb(160, 160, 160);
        }

        .toPayment {
            display: none;
            font-size: 16px;
            font-weight: 700;
            line-height: 48px;
            color: rgb(255, 255, 255);
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
        border: 6px solid rgb(60, 60, 60);
        background-color: rgb(90, 90, 90);

        .cat-logo {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            font-size: 26px;
            color: rgb(150, 150, 150);
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
            display: none;
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
        display: none;
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
        display: none;
    }
}
</style>