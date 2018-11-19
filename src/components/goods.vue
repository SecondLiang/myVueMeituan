<template>
    <div id="goods">
        <div class="menu-warp">
            <div class="menus" v-for="(item,index) in goods" :key="index" v-on:click="selectMenu(index,$event)">
                <div class="item-menu border-1px">
                    <span class="icon" :class="foodMap[item.type]" v-show="item.type > 0"></span>
                    <span class="menu-con">{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="foods-warp">
            <ul class="lists">
                <li class="list" v-for="(itme,index) in goods" :key="index">
                    <div class="list-title">{{itme.name}}</div>
                    <ul class="foods-lists">
                        <li class="food-list border-1px" v-for="(list,index2) in itme.foods" :key="index2">
                            <div class="avatar-box">
                                <img :src="list.icon" alt="">
                            </div>
                            <div class="describe">
                                <div class="name">{{list.name}}</div>
                                <div class="description" v-show="list.description != ''">{{list.description}}</div>
                                <div class="Sale-box">
                                    <span class="Sale">月售{{list.sellCount}}份</span>
                                    <span class="rating">好评率{{list.rating}}%</span>
                                </div>
                                <div class="price-box">
                                    <span class="new-price">￥{{list.price}}</span>
                                    <span class="old-price" v-show="list.oldPrice != ''">￥{{list.oldPrice}}</span>
                                </div>
                                <v-addreduce :list="list" class="add-reduce"></v-addreduce>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            
        </div>
        <div class="cat">
            <v-cat></v-cat>
        </div>
    </div>
</template>

<script>
// import cat from './cat.vue'
const cat = () => import("./cat.vue");
const addreduce = () => import('./add_reduce.vue');
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
import axios from "axios";
export default {
  data() {
    return {
    //   goods: [],
    //   order:{
    //       total:0
    //   },
    };
  },
  components: {
    "v-cat": cat,
    "v-addreduce":addreduce
  },

  computed:{
      ...mapState({
          goods:'goods'
      })
  },
  methods: {
    selectMenu(index, event) {
      var tagName = event.target.tagName.toLowerCase();
      if (tagName === "span" || tagName === "div") {
        var menus = document.getElementsByClassName("menus");
        for (var i = 0; i < menus.length; i++) {
          menus[i].classList.remove("active1");
          menus[i]
            .getElementsByClassName("menu-con")[0]
            .classList.remove("active2");
        }
        menus[index].classList.add("active1");
        menus[index]
          .getElementsByClassName("menu-con")[0]
          .classList.add("active2");
        this.scrollLists(index);
      } else {
        return;
      }
    },
    scrollLists(index) {
      var lists = document.getElementsByClassName("list");
      var warp = document.getElementsByClassName("foods-warp")[0];
      var scroll = document.getElementsByClassName("foods-warp")[0].scrollTop;
      var numScroll = 0;
      if (index > 0) {
        for (var i = 0; i < index; i++) {
          numScroll += parseInt(lists[i].offsetHeight);
        }
      }
      this.animation(numScroll, scroll, warp);
    },
    animation(target, current, ele) {
      var timer;
      clearInterval(timer);
      var moveLen = Math.abs(Math.round(target - current));
      var unitMove = moveLen / 100;

      if (target == current) {
        return;
      } else {
        timer = setInterval(function() {
          if (target - current > 0) {
            ele.scrollTop += unitMove;
          } else {
            ele.scrollTop -= unitMove;
          }
          if ((Math.abs(ele.scrollTop - target)) < 10 ) {
            clearInterval(timer);
          }
        }, 1);
      }
    },
  },
  
  created() {

    this.foodMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>


<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl';

#goods {
    position: absolute;
    top: 174px;
    left: 0px;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 48px;

    .menu-warp {
        flex: 0 0 80px;
        background-color: #ddd;

        .menus {
            padding: 0 12px;

            &.active1 {
                background-color: #fff;
                color: rgb(0, 0, 0) !important;
            }

            .item-menu {
                display: table-cell;
                vertical-align: middle;
                width: 100%;
                height: 54px;
                border-1px(rgba(7, 17, 27, 0.1));

                .icon {
                    display: inline-block;
                    vertical-align: middle;
                    width: 14px;
                    height: 14px;
                    background-size: 14px 14px;

                    &.decrease {
                        bg-image('decrease_3');
                    }

                    &.discount {
                        bg-image('discount_3');
                    }

                    &.guarantee {
                        bg-image('guarantee_3');
                    }

                    &.invoice {
                        bg-image('invoice_3');
                    }

                    &.special {
                        bg-image('special_3');
                    }
                }

                .menu-con {
                    font-size: 12px;
                    font-weight: 300;
                    line-height: 14px;

                    &.active2 {
                        font-weight: 700;
                        color: #000;
                    }
                }
            }
        }
    }

    .foods-warp {
        flex: 1;
        height: 486px;
        overflow: auto;

        .list-title {
            height: 26px;
            padding: 0 18px;
            font-size: 16px;
            font-weight: 500;
            color: #999;
            line-height: 26px;
            background-color: #ddd;
            border-left: 3px solid #ccc;
        }

        .foods-lists {
            padding: 18px;
            background-color: #fff;

            .food-list {
                display: flex;
                padding: 18px 0;
                border-1px(rgba(7, 17, 27, 0.2));

                &:first-child {
                    padding-top: 0px;
                }
                .avatar-box {
                    flex: 0 0 57px;

                    img {
                        width: 57px;
                        height: 57px;
                    }
                }
                .describe {
                    position:relative;
                    flex: 1;
                    padding: 0 0 0 10px;
                    overflow: hidden;
                    .name {
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                        line-height: 14px;
                        margin-top: 2px;
                    }
                    .description {
                        margin-top: 8px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        line-height: 16px;
                    }
                    .Sale-box {
                        margin-top: 8px;
                        font-size: 0px;

                        .Sale {
                            display: inline-block;
                            font-size: 10px;
                            line-height: 10px;
                        }

                        .rating {
                            display: inline-block;
                            font-size: 10px;
                            line-height: 10px;
                            margin-left: 12px;
                        }
                    }
                    .price-box {
                        margin-top: 8px;

                        .new-price {
                            font-size: 14px;
                            font-weight: 700;
                            color: red;
                        }

                        .old-price {
                            font-size: 12px;
                            font-weight: 300;
                            color: #666;
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }
    }

    .cat {
        position: fixed;
        bottom: 0px;
        left: 0px;
        z-index 1
        width: 100%;
        height: 48px;
        // background-color:rgba(0,0,0,0.1);
    }
}
</style>