<template>
    <div id="goods">
        <div class="menu-warp">
            <div class="menus" v-for="(item,index) in goods" :key="index">
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
const cat = () => import('./cat.vue')
import axios from "axios";
export default {
  data() {
    return {
      goods: []
    };
  },
  components:{
      'v-cat':cat
  },
  created() {
    axios
      .get("meituan/api/goods")
      .then(res => {
        if (res.data.code === 0) {
          this.goods = res.data.data;
          console.log(this.goods);
        }
      })
      .catch(error => console.log(error));

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
    flex-direction:row;
    width:100%;
    // overflow hidden;
    .menu-warp {
        flex: 0 0 80px;
        background-color:#eee;
        .menus {
            width: 56px;
            margin-left: 12px;
            .item-menu {
                display: table-cell;
                vertical-align: middle;
                width: 100%;
                height: 54px;
                &.active{
                    background-color:#fff;
                }
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
            font-size:16px;
            font-weight:500;
            color:#999;
            line-height:26px;
            background-color:#eee;
            border-left:3px solid #ccc;
        }
        .foods-lists{
            padding:18px;
            background-color:#fff;
            .food-list{
                display:flex;
                padding:18px 0;
                border-1px(rgba(7,17,27,0.1))
                &:first-child{
                    padding-top:0px;
                }
                .avatar-box{
                    flex:0 0 57px;

                    img{
                        width:57px;
                        height:57px;
                    }
                }
                .describe{
                    flex:1;
                    padding:0 10px;
                    overflow:hidden;
                    .name{
                        font-size:14px;
                        color:rgb(7,17,27);
                        line-height:14px;
                        margin-top:2px;
                        text-overflow:ellipsis;
                        white-space nowrap;
                    }
                    .description{
                        margin-top:8px;
                        font-size:10px;
                        color:rgb(147,153,159);
                        height:10px;
                        line-height:10px;
                        text-overflow:ellipsis;
                        white-space nowrap;
                    }
                    .Sale-box{
                        margin-top:8px;
                        font-size:0px;
                        .Sale{
                            display:inline-block;
                            font-size:10px;
                            line-height:10px;
                        }
                        .rating{
                            display:inline-block;
                            font-size:10px;
                            line-height:10px;
                            margin-left:12px;
                        }
                    }
                    .price-box{
                        margin-top:8px;
                        .new-price{
                            font-size:14px;
                            font-weight:700;
                            color:red;

                        }
                        .old-price{
                            font-size:12px;
                            font-weight:300;
                            color:#666;
                            text-decoration:line-through;
                        }
                    }
                }
            }
        }
        
    }

    .cat{
        position:fixed;
        bottom:0px;
        left:0px;
    }
}
</style>