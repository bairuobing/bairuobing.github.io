/*
 * @Author: BaiRuobing
 * @Date:   2018-07-31 21:27:52
 * @Last Modified by:   BaiRuobing
 * @Last Modified time: 2018-08-04 17:21:12
 */
function MyMap(iterable) {
    if (!(this instanceof MyMap)) {
        return new MyMap(iterable)
    }
    this.map = []
    if (iterable) {
        if (!Array.isArray(iterable)) {
            throw new Error('MyMap 仅支持数组作为参数')
        }
        oooops: for (var i = 0; i < iterable.length; i++) {
            for (var item of this.map) {
                var k = Object.getOwnPropertyNames(item)
                if (k[0] === iterable[i][0].toString()) {
                    item[k] = iterable[i][1]
                    continue oooops
                }
            }
            var obj = new Object()
            obj[iterable[i][0]] = iterable[i][1]
            this.map.push(obj)
        }
    }
}

MyMap.prototype = {
    clear: function() {
        this.map = []
    },
    constructor: function() {
        return MyMap
    },
    delete: function(key) {
        var idx = -1
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i].hasOwnProperty(key)) {
                idx = i
                break
            }
        }
        if (idx < 0) {
            return false
        } else {
            this.map = this.map.filter(function(element, index) {
                return index !== idx
            })
            return true
        }
    },
    entries: function() {
        return this
    },

    get: function(key) {
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i].hasOwnProperty(key)) {
                return this.map[i][key]
            }
        }
        return undefined
    },
    has: function(key) {
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i].hasOwnProperty(key)) {
                return true
            }
        }
        return false
    },
    set: function(key, value) {
        var obj = new Object()
        obj[key] = value
        this.map.push(obj)
    }
}
Object.defineProperty(MyMap.prototype, "size", {
    get: function() {
        return this.map.length
    }
})
//=====================================================================
function MySet(iterable) {
    this.set = []
    if (iterable) {
        for (var i = 0; i < iterable.length; i++) {
            if (this.set.indexOf(iterable[i]) < 0) {
                this.set.push(iterable[i])
            }
        }
    }
}

Object.defineProperty(MySet.prototype, "size", {
    get: function() {
        return this.set.length
    }
})

MySet.prototype.add = function(value) {
    if (this.set.indexOf(value) < 0) {
        this.set.push(value)
    }
    return this
}
MySet.prototype.clear = function() {
    this.set = []
}
MySet.prototype.delete = function(value) {
    var idx = this.set.indexOf(value)
    if (idx < 0) {
        return false
    } else {
        var tmp = this.set[idx]
        this.set = this.set.filter(function(element) {
            return element !== tmp
        })
        return true
    }
}
MySet.prototype.entries = function() {
    var obj = new MySet(this.set)
    return obj
}
MySet.prototype.has = function(value) {
    return (this.set.indexOf(value) >= 0)
}
MySet.prototype.values = function() {
    var SetIterator  = []
    this.set.forEach(function(element) {
        SetIterator.push(element)
    })
    return SetIterator 
}

//=======================================================================
function MyArray(...iterable) {
    if (iterable.length === 0) {
        this.array = {}
    } else if (iterable.length === 1) {
        if (iterable[0] < 0) {
            throw new Error('无效的MyArray长度')
        }
        this.array = {}
        for (var i = 0; i < iterable[0]; i++) {
            this.array[i] = null
        }
    } else if (iterable.length > 1) {
        this.array = {}
        for (var i = 0; i < iterable.length; i++) {
            this.array[i] = iterable[i]
        }
    }
}

Object.defineProperty(MyArray.prototype, "_length", {
    get: function() {
        return Object.values(this.array).length //现将其还原为数组
    },
    set: function(value) {
        if(value < this._length) {
            var len = this._length
            for(var i = value; i < len; i++) {
                delete this.array[i]
            }
        } else if (value > this._length) {
            var len = this._length
            for(var i = len; i < value; i++) {
                this.array[i] = null
            }
        }
        
    }
})


MyArray.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}

MyArray.of = function(...iterable) {
    var o = new MyArray()
    if (iterable.length === 0) {
        return o
    } else if (iterable.length > 0) {
        o.array = {}
        for (var i = 0; i < iterable.length; i++) {
            o.array[i] = iterable[i]
        }
    }
    return o
}

MyArray.prototype.concat = function() {

}