<template>
    <div class="add-reduce">
        <span class="reduce icon-remove_circle_outline" @click="reduce(index,index2,list)"></span>
        <span class="count"></span>
        <span class="add icon-add_circle" @click="add(index,index2,list)"></span>
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

    },
    methods:{
       add(index,index2,list){
        var listObj = document.getElementsByClassName('list')[index].getElementsByClassName('food-list')[index2];
        listObj.getElementsByClassName('reduce')[0].style.display = 'inline-block';
        var count = listObj.getElementsByClassName('count')[0].innerHTML;

        if(this.order.foodSelected.length == 0 || this.order.foodSelected.length == []){
            this.createListObject(true,index,index2,list);
        }else{
            this.createListObject(false,index,index2,list);
        }
        this.goods[index].foods[index2].count += 1; 
        this.order.total += list.price; //删
    },
    reduce(index,index2,list){
        var listObj = document.getElementsByClassName('list')[index].getElementsByClassName('food-list')[index2];
        listObj.getElementsByClassName('count')[0].innerHTML = parseInt(listObj.getElementsByClassName('count')[0].innerHTML) - 1;
        var count = parseInt(listObj.getElementsByClassName('count')[0].innerHTML);
        if(count === 0){
            listObj.getElementsByClassName('reduce')[0].style.display = 'none';
            listObj.getElementsByClassName('count')[0].innerHTML = '';
            this.updateListObject(true,index,index2);
        }
        this.updateListObject(false,index,index2);
        this.order.total -= list.price; //删

        
    },
    createListObject(flag,index,index2,list){
        if(flag){
            var obj = {
                index:index,
                index2:index2,
                name:list.name,
                price:list.price,
                counts:1
            }
           this.order.foodSelected.push(obj);
        }else{
            this.order.foodSelected.forEach((ele,num) => {
                if(ele.index === index && ele.index2 === index2){
                    ele.counts += 1;
                    return;
                }
            })
        }
    },
    updateListObject(flag,index,index2){
        this.order.foodSelected.forEach((ele,i) =>{
            if(ele.index === index && ele.index2 === index2){
                if(flag){
                    this.order.foodSelected.splice(i,1);
                }else{
                    ele.counts -= 1;
                    return;
                }
            }
        })
        
    }, 
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
        display: none;
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
