
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
    //即创建一个新数组,这个数组中的值,为第一个数字（array 参数）排除了给定数组中的值
    difference: function(array, ...values) {
        var res = []
        var map = {}
        for (var i = 0; i < values.length; i++) {
            if (!map[values[i]]) {
                map[values[i]] = true
            }
        }
        for (var i = 0; i < array.length; i++) {
            if (!(array[i] in map)) {
                res.push(array[i])
            }
        }
        return res
    },

}