/* 用于LeetCode函数编写与测试
 * @Author: BaiRuobing
 * @Date:   2018-06-28 09:13:52
 * @Last Modified by:   Win
 * @Last Modified time: 2018-07-21 18:10:42
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
};

function array2list(array) {
    var nodes = []
    for (var i = 0; i < array.length; i++) {
        var node = {}
        node.val = array[i]
        node.next = null
        nodes.push(node)
    }

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].next = nodes[i + 1]
    }
    return nodes[0]
}


var mergeTwoLists1 = function(l1, l2) {
    if (!l1) {
        return l2
    }
    if (!l2) {
        return l1
    }
    var nodes = []
    while (l1 || l2) {
        if (!l1 && l2) {
            var node = new ListNode(l2.val)
            nodes.push(node)
            l2 = l2.next
        } else if (l1 && !l2) {
            var node = new ListNode(l1.val)
            nodes.push(node)
            l1 = l1.next
        } else {
            if (l1.val > l2.val) {
                var node = new ListNode(l2.val)
                nodes.push(node)
                l2 = l2.next
            } else if (l1.val <= l2.val) {
                var node = new ListNode(l1.val)
                nodes.push(node)
                l1 = l1.next
            }
        }
    }
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].next = nodes[i + 1]
    }
    return nodes[0]
};
//递归实现
var mergeTwoLists2 = function(l1, l2) {
    if (!l1) {
        return l2
    }
    if (!l2) {
        return l1
    }
    var head = new ListNode(0)
    if(l1.val > l2.val) {
        head = l2
        l2 = l2.next
    } else {
        head = l1
        l1 = l1.next
    }

    head.next = mergeTwoLists2(l1,l2)
    return head
};