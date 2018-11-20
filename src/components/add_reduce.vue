<template>
    <div class="add-reduce">
        <span class="reduce icon-remove_circle_outline" v-show="list.num > 0" @click="reduce(list)"></span>
        <span class="count" v-show="list.num > 0">{{list.num}}</span>
        <span class="add icon-add_circle" @click="add(list)"></span>
    </div>
</template>

<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return {
            
        }
    },
    props:{
        list:{
            type:Object
        }
    },
    methods:{
       ...mapMutations({
         add:'add',
         reduce:'reduce'
       }),
    },
    computed:{
        


    }
};
</script>

<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl';
.add-reduce {
    position: absolute;
    right: 0px;
    bottom: 0px;
    font-size: 0px;
    .reduce,
    .add {
        display: inline-block;
        color: rgb(0, 160, 220);
        font-size: 24px;
        line-height: 24px;
    }
    .reduce {
        // display: none;
    }
    .count {
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 24px;
        width: 24px;
        text-align: center;
    }
    .add {
    }
}
</style>
