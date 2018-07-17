
var bairuobing = {
    //切片,创建一个元素数组,如果数组无法均匀分割,则最终的块将是剩余的元素
    chunk: function(array, size = 1) {
        var len = array.length
        var tmp = []
        var res = []
        var count = 0
        for(var i = 0; i < len; i++) {
            tmp.push(array[i])
            count++
            if(count === size || i === len - 1) {
                res.push(tmp)
                tmp = []
                count = 0
            }
        }
        return res
    },
    //紧凑,创建一个数组,将所有无效值都去除
    compact: function(array) {
        var res = []
        for(var i = 0; i < array.length; i++) {
            if(array[i]) {
                res.push(array[i])
            }
        }
        return res
    },
    concat: function(array, ...values) {
        var val = values[0]
        var res = array
        for (var i = 1; i < values.length; i++) {
            val = val.concat(values[i])
        }
        res = res.concat(val)
        return res
    },
    //即创建一个新数组,这个数组中的值,为第一个数字（array 参数）排除了给定数组中的值
    difference: function(array, ...values) {
        var res = []
        var map = {}
        var val = values[0]
        //合并剩余参数数组
        for (var i = 1; i < values.length; i++) {
            val = val.concat(values[i])
        }
        //遍历建图
        for (var i = 0; i < val.length; i++) {
            if (!map[val[i]]) {
                map[val[i]] = true
            }
        }
        for (var i = 0; i < array.length; i++) {
            if (!(array[i] in map)) {
                res.push(array[i])
            }
        }
        return res
    },
    //
    differenceBy: function(array, ...values) {

    },
    drop: function(array, number = 1) {
        return array.slice(number,array.length)
    },
    //创建一个只接受一个参数的函数并返回,并且忽略掉其他参数
    unary: function(func) {
        return function(value){
            return func(value)
        }
    },
    //创建一个否定一个判定函数的函数,接受到的任何参数都给原函数,只不过返回的是原函数的相反函数罢了
    negate: function(func) {
        return function(...args) {
            return !func(...args)
        }
    },
    //forEach(collection, [iteratee=_.identity])
    //collection (Array|Object): 一个用来迭代的集合
    //[iteratee=_.identity] (Function): 每次迭代调用的函数
    forEach: function(collection, func) {
        if(Array.isArray(collection)) {
            for(var i = 0; i < collection.length; i++) {
                func(collection[i])
            }
            return collection
        }
        if(typeof collection === 'object') {
            for(var item in collection) {
                func(item,collection[item])
            }
            return collection
        }
    },
    //先JSON序列化,再反序列化看来实现深复制
    cloneDeep: value => JSON.parse((JSON.stringify(value))),
    //
    filter: function(collection, test) {
        var res = []
        if(Array.isArray(collection)) {
            for(var i = 0; i < collection.length; i++) {
                if(test(collection[i])){
                    res.push(collection[i])
                }
            }
            return res
        }
        if(typeof collection === 'object') {
            for(var item in collection) {
                if(test(item,collection[item])){
                    res.push(collection[item])
                }
            }
            return res
        }
    },
    //
    map: function(collection, mapper) {
        var res = []
        if(Array.isArray(collection)) {
            for(var i = 0; i < collection.length; i++) {
                res.push(mapper(collection[i]))
            }
            return res
        }
        if(typeof collection === 'object') {
            for(var item in collection) {
                res.push(mapper(item,collection[item]))
            }
            return res
        }
    },
    //
    reduce: function(collection, reducer, initialValue) {
        if(Array.isArray(collection)){
            for(var i = 0; i < collection.length; i++) {
                initialValue = reducer(initialValue, collection[i])
            }
            return initialValue
        }
        if(typeof collection === 'object') {
            for(var item in collection) {
                initialValue = reducer(initialValue, item, collection[item])
            }
            return initialValue
        }
    },
}
var __ = bairuobing