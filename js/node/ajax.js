/*
 * @Author: Win
 * @Date:   2018-09-04 20:07:08
 * @Last Modified by:   Win
 * @Last Modified time: 2018-09-05 22:27:09
 */
function ajax(url, option) {
    //对option进行解析
    var method = option["method"]
    var headers = option["headers"]
    var data = option["data"]
    var success = option["success"]
    var failed = option["failed"]
    var timeout = option["timeout"]

    var xhr = new XMLHttpRequest()

    xhr.open(method, url)

    //发送请求头信息
    for (var key in headers) {
        xhr.setRequestHeader(key, headers[key])
    }


    xhr.onreadystatechange = function() { //Call a function when the state changes.
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // 请求结束后,在此处写处理代码,XMLHttpRequest.DONE === 4
            xhr.addEventListener('load', () => {
                success(xhr.responseText)
            })
        }
        if (xhr.status >= 400 && xhr.status < 500) { //失败HTTP状态码
            
            xhr.addEventListener('load', () => {
                failed()
            })
        }
        if (xhr.status >= 500) { //超时HTTP状态码
            
            xhr.addEventListener('load', () => {
                timeout()
            })
        }
    }
    xhr.send(data)
}













ajax('xxx.json', {
    method: 'post',
    headers: {
        'Content-Type': 'text/xml',
        'XXX': 'YYY',
    },
    data: 'the request body',
    success: function() {

    },
    failed: function() {

    },
    timeout: function() {

    }
})


//案例POST
var xhr = new XMLHttpRequest();
xhr.open("POST", '/server', true);

//发送合适的请求头信息
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() { //Call a function when the state changes.
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // 请求结束后,在此处写处理代码
    }
}
xhr.send("foo=bar&lorem=ipsum");
// xhr.send('string'); 
// xhr.send(new Blob()); 
// xhr.send(new Int8Array()); 
// xhr.send({ form: 'data' }); 
// xhr.send(document);