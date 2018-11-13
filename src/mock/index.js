import Mock from 'mockjs'
import data from '../../data.json'

Mock.mock('meituan/api/goods',{
    code:0,
    codeMsg:'成功',
    data:data.goods
})

Mock.mock('meituan/api/seller',{
    code:0,
    codeMsg:'成功',
    data:data.seller
})

Mock.mock('meituan/api/ratings',{
    code:0,
    codeMsg:'成功',
    data:data.ratings
})