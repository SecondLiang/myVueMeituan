import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goods: [],
    seller: {},
    selecdGoods: []
  },
  mutations: {
    add(state, option) {
      option.num++;
      if (state.selecdGoods.length === 0) {
        state.selecdGoods.push(option);
      } else {
        var count = 0;
        for (var i = 0; i < state.selecdGoods.length; i++) {
          if (state.selecdGoods[i].id === option.id) {
            count++;
          }
        }
        if (count === 0) {
          state.selecdGoods.push(option);
        }
      }
    },
    reduce(state, option) {
      option.num--;
      if (state.selecdGoods.length > 0) {
        for (var i = 0; i < state.selecdGoods.length; i++) {
          if (state.selecdGoods[i].num === 0) {
            state.selecdGoods.splice(i, 1);
          }
        }
      }
      
    },
    getGoodsData(state) {
      axios
        .get("meituan/api/goods")
        .then(res => {
          if (res.data.code === 0) {
            res.data.data.forEach((ele, index) => {
              ele.foods.forEach((item, i) => {
                item.num = 0;
                item.id = index + "-" + i;
              });
            });
            state.goods = res.data.data;
          }
        })
        .catch(error => console.log(error));
    },
    getSellerData(state) {
      axios
        .get("meituan/api/seller")
        .then(res => {
          if (res.data.code === 0) {
            state.seller = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    empty(state){
        state.selecdGoods = [];
        state.goods.forEach((ele,index) => {
            ele.foods.forEach(item => {
                item.num = 0;
            })
        })
    }
  },
  getters: {
    getCount(state){
      var count = 0;
      if(state.selecdGoods.length > 0){
        state.selecdGoods.forEach((ele) => {
          count += ele.num;
        })
      }
      return count;
    }
  },
  actions: {
    asycnGoods(state) {
      state.commit("getGoodsData");
    },
    asycnSeller(state) {
      state.commit("getSellerData");
    }
  }
});
