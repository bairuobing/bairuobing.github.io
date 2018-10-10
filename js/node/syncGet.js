//封装好的异步执行
function get(url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => { //异步体现
        callback(xhr.responseText)
    })
    xhr.open('GET', url)
    xhr.send()
}
