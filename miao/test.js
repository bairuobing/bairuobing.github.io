/*
* @Author: BaiRuobing
* @Date:   2018-06-28 09:13:52
* @Last Modified by:   BaiRuobing
* @Last Modified time: 2018-06-30 19:25:15
*/
var hammingDistance = function(x, y) {
    var count = 0
    var z = x ^ y
    z = z.toString()
    for(var i = 0;i<z.length;i++){
        if(z[0]==='1'){
            count++
        }
    }
    return count
};