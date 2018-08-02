var bairuobing = function() {
    return {
        iteratee: iteratee,
        identity: identity,
        property: property,
        matches: matches,
        matchesProperty: matchesProperty,
        fromPairs: fromPairs,
        toPairs: toPairs,
        unary: unary,
        negate: negate,
        chunk: chunk,
        compact: compact,
        concat: concat,
        difference: difference,
        differenceBy: differenceBy,
        differenceWith: differenceWith,
        drop: drop,
        dropRight: dropRight,
        dropRightWhile: dropRightWhile,
        dropWhile: dropWhile,
        fill: fill,
        findIndex: findIndex,
        head: head,
        indexOf: indexOf,
        initial: initial,
        intersection: intersection,
        forEach: forEach,
        cloneDeep: cloneDeep,
        filter: filter,
        map: map,
        reduce: reduce,
        flatten: flatten,
        flattenDeep: flattenDeep,
        flattenDepth: flattenDepth,
        isMatch: isMatch,
        isEqual: isEqual,
        uniq: uniq,
        uniqBy: uniqBy,
        every: every,
        some: some
    }

    function iteratee(shorthand = identity) {
        if (typeof shorthand === 'function') {
            return shorthand
        } else if (typeof shorthand === 'string') {
            return property(shorthand)
        } else if (Array.isArray(shorthand)) {
            return matchesProperty(shorthand)
        } else {
            return matches(shorthand)
        }
    }
    function identity(value){
        return value
    }
    //通过字符串参数获取对象的某属性值
    function property(propName) {
        return obj => obj[propName]
    }
    function matches(source) {
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
    }
    function matchesProperty(array) {
        return matches(fromPairs(array))
    }

    function fromPairs(pairs) {
        var res = {}
        for (var item of pairs) {
            res[item[0]] = item[1]
        }
        return res
    }
    function toPairs(object) {
        var res = []
        for (var item in object) {
            if (object.hasOwnProperty(item)) {
                res.push([item, object[item]])
            }

        }
        return res
    }

    function unary(func) {
        return function(value) {
            return func(value)
        }
    }
    //创建一个否定一个判定函数的函数,接受到的任何参数都给原函数,只不过返回的是原函数的相反函数罢了
    function negate(func) {
        return function(...args) {
            return !func(...args)
        }
    }
    /**
     * 切片,创建一个元素数组,如果数组无法均匀分割,则最终的块将是剩余的元素
     * @param  {[type]} array [description]
     * @param  {Number} size  [description]
     * @return {[type]}       [description]
     */
    function chunk(array, size = 1) {
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
    }
    //紧凑,创建一个数组,将所有无效值都去除
    function compact(array) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                res.push(array[i])
            }
        }
        return res
    }
    /**
     * [concat description]
     * @param  {[type]}    array  [description]
     * @param  {...[type]} values [description]
     * @return {[type]}           [description]
     */
    function concat(array, ...values) {
        var val = values[0]
        var res = array
        for (var i = 1; i < values.length; i++) {
            val = val.concat(values[i])
        }
        res = res.concat(val)
        return res
    }
    function difference(array, ...values) {
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
    }
    //iteratee标准情况为一个function, 也可以传一个 字符串 (需要 property())
    function differenceBy(array, ...args) {
        var iteratee //函数签名为参数,但由于剩余参数只能为参数列表最后一项,所以声明为函数内部变量,还需要深度展开函数
        //参数归一化
        if (typeof args[args.length - 1] === 'string') {
            var f = iteratee(args.pop()) //iteratee === 'x'
            var argues = []
            var res = []
            argues = flattenDeep(args)
            for (var item of array) {
                for (var index of argues) {
                    if (f(item) !== f(index)) {
                        res.push(item)
                    }
                }
            }
            return res
        } else if (typeof args[args.length - 1] === 'function') {
            iteratee = args.pop()
            var argues = []
            var res = []
            argues = flattenDeep(args)
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
            iteratee = identity
            return difference(array, ...args)
        }
    }
    //isEqual 已经考虑到多种情况,故在此不多做考虑
    function differenceWith(array, ...args) {
        var comparator = iteratee(args.pop())
        var argues = flattenDeep(args)
        var res = []
        for (var item of array) {
            for (var index of argues) {
                if (!comparator(item, index)) {
                    res.push(item)
                }
            }
        }
        return res
    }
    function drop(array, number = 1) {
        return array.slice(number, array.length)
    }
    function dropRight(array, number = 1) {
        if (number >= array.length) {
            number = array.length
        }
        return array.slice(0, array.length - number)
    }
    function dropRightWhile(array, predicate = identity) {
        predicate = iteratee(predicate)
        for (var i = array.length - 1; i >= 0; i--) {
            if (!predicate(array[i])) {
                return array.slice(0, i + 1)
            }
        }
    }
    function dropWhile(array, predicate = identity) {
        predicate = iteratee(predicate)
        for (var i = array.length - 1; i >= 0; i--) {
            if (!predicate(array[i])) {
                return array.slice(i)
            }
        }
    }
    function fill(array, value, start = 0, end = array.length) {
        for (var i = start; i < end; i++) {
            array[i] = value
        }
        return array
    }
    function findIndex(array, predicate = identity, fromIndex = 0) {
        predicate = iteratee(predicate)
        for (var i = fromIndex; i < array.length; i++) {
            if (predicate(array[i])) {
                return i
            }
        }
        return -1
    }
    function head(array) {
        return array[0]
    }
    function indexOf(array, value, fromIndex = 0) {
        fromIndex < 0 ? fromIndex = 0 : fromIndex
        for (var i = fromIndex; i < array.length; i++) {
            if (array[i] === value) {
                return i
            }
        }
        return -1
    }
    function initial(array) {
        return array.slice(0, array.length - 1)
    }
    function intersection(...arrays) {
        var res = []
        for (var j = 0; j < arrays[0].length; j++) {
            var target = arrays[0][j]
            for (var i = 1; i < arrays.length; i++) {
                if (arrays[i].includes(target)) {
                    if (i === arrays.length - 1) {
                        res.push(target)
                    }
                    continue
                } else {
                    break
                }
            }
        }
        return res
    }
    //forEach(collection, [iteratee=_.identity])
    function forEach(collection, func) {
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
    }
    //先JSON序列化,再反序列化看来实现深复制
    function cloneDeep(value) {
        return JSON.parse((JSON.stringify(value)))
    }
    //分两种情况,数组 和 对象
    function filter(collection, test) {
        test = iteratee(test)
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
    }
    //
    function map(collection, mapper) {
        mapper = iteratee(mapper)
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
    }
    //
    function reduce(collection, reducer, initialValue) {
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
    }
    function flatten(array) {
        return flattenDepth(array)
    }
    function flattenDeep(array) {
        return flattenDepth(array, Infinity)
    }
    function flattenDepth(array, depth = 1) {
        if (depth === 0) {
            return array.slice() //array 的副本
        }
        var res = []
        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                var tmp = flattenDepth(array[i], depth - 1)
                res = [...res, ...tmp]
            } else {
                res.push(array[i])
            }
        }
        return res
    }

    function isMatch(object, source) {
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
    }
    function isEqual(value, other) {
        if (value === other) {
            return true
        }
        if (value !== value && other !== other) {
            return true
        }
        if ((Array.isArray(value)) && (Array.isArray(other))) {
            if (value.length !== other.length) {
                return false
            }
            for (var i = 0; i < value.length; i++) {
                if (!isEqual(value[i], other[i])) {
                    return false
                }
            }
        }

        if (typeof value === 'object' && typeof other === 'object') {
            if (Array.isArray(value) || Array.isArray(other)) {
                return false
            }
            var propName = []
            for (var item in value) {
                propName.push(item)
            }
            for (var item in other) {
                propName.push(item)
            }
            propName = uniq(propName)
            for (var i = 0; i < propName.length; i++) {
                if (!isEqual(value[i], other[i])) {
                    return false
                }
            }
            return true
        }
    }
    //用indexOf简化两层for循环
    function uniq(array) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            if (res.indexOf(array[i]) === -1) {
                res.push(array[i])
            }
        }
        return res
    }
    function uniqBy(array, iteratee = identity) {
        if (typeof iteratee === 'function') {
            var func = iteratee(iteratee)
            var model = []
            var res = []
            for (var i = 0; i < array.length; i++) {
                if (model.indexOf(func(array[i])) === -1) {
                    model.push(func(array[i]))
                    res.push(array[i])
                }
            }
            return res
        }
        if (typeof iteratee === 'string') {
            var prop = iteratee(iteratee)
            var model = []
            var res = []
            for (var item of array) {
                if (model.indexOf(prop(item)) === -1) {
                    model.push(prop(item))
                    res.push(item)
                }
            }
            return res
        }
    }
    function every(ary, test) {
        test = iteratee(test)
        for (var i = 0; i < ary.length; i++) {
            if (!test(ary[i], i, ary)) {
                return false
            }
        }
        return true
    }
    function some(ary, test) {
        test = iteratee(test)
        for (var i = 0; i < ary.length; i++) {
            if (test(ary[i], i, ary)) {
                return true
            }
        }
        return false
    }

}()