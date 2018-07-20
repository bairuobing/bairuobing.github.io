var bairuobing = {
    iteratee(shorthand = this.identity) {
        if (typeof shorthand === 'function') {
            return shorthand
        } else if (typeof shorthand === 'string') {
            return this.property(shorthand)
        } else if (Array.isArray(shorthand)) {
            return this.matchesProperty(shorthand)
        } else {
            return this.matches(shorthand)
        }
    },
    identity: value => value,
    //通过字符串参数获取对象的某属性值
    property: function(propName) {
        return obj => obj[propName]
    },
    unary: function(func) {
        return function(value) {
            return func(value)
        }
    },
    //创建一个否定一个判定函数的函数,接受到的任何参数都给原函数,只不过返回的是原函数的相反函数罢了
    negate: function(func) {
        return function(...args) {
            return !func(...args)
        }
    },
    /**
     * 切片,创建一个元素数组,如果数组无法均匀分割,则最终的块将是剩余的元素
     * @param  {[type]} array [description]
     * @param  {Number} size  [description]
     * @return {[type]}       [description]
     */
    chunk: function(array, size = 1) {
        var len = array.length
        var tmp = []
        var res = []
        var count = 0
        for (var i = 0; i < len; i++) {
            tmp.push(array[i])
            count++
            if (count === size || i === len - 1) {
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
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                res.push(array[i])
            }
        }
        return res
    },
    /**
     * [concat description]
     * @param  {[type]}    array  [description]
     * @param  {...[type]} values [description]
     * @return {[type]}           [description]
     */
    concat: function(array, ...values) {
        var val = values[0]
        var res = array
        for (var i = 1; i < values.length; i++) {
            val = val.concat(values[i])
        }
        res = res.concat(val)
        return res
    },
    /**
     * 即创建一个新数组,这个数组中的值,为第一个数字（array 参数）排除了给定数组中的值
     * @param  {[type]}    array  [description]
     * @param  {...[type]} values [description]
     * @return {[type]}           [description]
     */
    difference: function(array, ...values) {
        var res = []
        var val = []
        //合并剩余参数数组
        for (var i = 0; i < values.length; i++) {
            val = val.concat(values[i])
        }
        for (var i = 0; i < array.length; i++) {
            if (!(val.includes(array[i]))) {
                res.push(array[i])
            }
        }
        return res
    },
    //iteratee标准情况为一个function, 也可以传一个 字符串 (需要 property())
    differenceBy: function(array, ...args) {
        var iteratee //函数签名为参数,但由于剩余参数只能为参数列表最后一项,所以声明为函数内部变量,还需要深度展开函数
        //参数归一化
        if (typeof args[args.length - 1] === 'string') {
            var f = this.iteratee(args.pop()) //iteratee === 'x'
            var argues = []
            var res = []
            argues = this.flattenDeep(args)
            for(var item of array) {
                for(var index of argues) {
                    if(f(item) !== f(index)) {
                        res.push(item)
                    }
                }
            }
            return res
        } else if (typeof args[args.length - 1] === 'function') {
            iteratee = args.pop()
            var argues = []
            var res = []
            argues = this.flattenDeep(args)
            for (var i = 0; i < argues.length; i++) {
                argues[i] = iteratee(argues[i])
            }
            for (var i = 0; i < array.length; i++) {
                if (!(argues.includes(iteratee(array[i])))) {
                    res.push(array[i])
                }
            }
            return res
        } else {
            iteratee = this.identity
            return this.difference(array, ...args)
        }
    },
    drop: function(array, number = 1) {
        return array.slice(number, array.length)
    },
    //创建一个只接受一个参数的函数并返回,并且忽略掉其他参数

    //forEach(collection, [iteratee=_.identity])
    forEach: function(collection, func) {
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                func(collection[i])
            }
            return collection
        }
        if (typeof collection === 'object') {
            for (var item in collection) {
                func(item, collection[item])
            }
            return collection
        }
    },
    //先JSON序列化,再反序列化看来实现深复制
    cloneDeep: value => JSON.parse((JSON.stringify(value))),
    //分两种情况,数组 和 对象
    filter: function(collection, test) {
        var res = []
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                if (test(collection[i])) {
                    res.push(collection[i])
                }
            }
            return res
        }
        if (typeof collection === 'object') {
            for (var item in collection) {
                if (test(item, collection[item])) {
                    res.push(collection[item])
                }
            }
            return res
        }
    },
    //
    map: function(collection, mapper) {
        var res = []
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                res.push(mapper(collection[i]))
            }
            return res
        }
        if (typeof collection === 'object') {
            for (var item in collection) {
                res.push(mapper(item, collection[item]))
            }
            return res
        }
    },
    //
    reduce: function(collection, reducer, initialValue) {
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                initialValue = reducer(initialValue, collection[i])
            }
            return initialValue
        }
        if (typeof collection === 'object') {
            for (var item in collection) {
                initialValue = reducer(initialValue, item, collection[item])
            }
            return initialValue
        }
    },
    flatten: function(array) {
        return this.flattenDepth(array)
    },
    flattenDeep: function(array) {
        return this.flattenDepth(array, Infinity)
    },
    flattenDepth(array, depth = 1) {
        if (depth === 0) {
            return array.slice() //array 的副本
        }
        var res = []
        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                var tmp = this.flattenDepth(array[i], depth - 1)
                res = [...res, ...tmp]
            } else {
                res.push(array[i])
            }
        }
        return res
    },

    isMatch: function(object, source) {
        if (typeof object !== 'object' || typeof source !== 'object') {
            return false
        }
        for (var item in source) {
            if (source[item] !== object[item]) {
                if (!isMatch(object[item], source[item])) {
                    return false
                } else {
                    return true
                }
            }
        }
    },
    matches: function(source) {
        return function(obj) {
            for (var item in obj) {
                if (source[item] !== obj[item]) {
                    if (!isMatch(source[item], obj[item])) {
                        return false
                    } else {
                        return true
                    }
                }
            }
            return true
        }
    },
    matchesProperty: function(array) {
        return this.matches(this.fromPairs(array))
    },
    /**
     * [fromPairs description]
     * @param  {[type]} Array [description]
     * @return {[type]} Object [description]
     */
    fromPairs: function(pairs) {
        var res = {}
        for (var item of pairs) {
            res[item[0]] = item[1]
        }
        return res
    },
    /**
     * [toPairs description]
     * @param  {[type]} Object [description]
     * @return {[type]} Array [description]
     */
    toPairs: function(object) {
        var res = []
        for (var item in object) {
            res.push([item, object[item]])
        }
        return res
    },
}