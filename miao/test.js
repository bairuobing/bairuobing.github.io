/* 用于LeetCode函数编写与其他代测码试
 * @Author: BaiRuobing
 * @Date:   2018-06-28 09:13:52
 * @Last Modified by:   BaiRuobing
 * @Last Modified time: 2018-09-12 16:36:40
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
// ---------------------------------------------------------
function array2list(array) {
    var nodes = []
    for (var i = 0; i < array.length; i++) {
        var node = new ListNode(array[i])
        nodes.push(node)
    }

    for (var i = 0; i < nodes.length - 1; i++) {
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
    if (l1.val > l2.val) {
        head = l2
        l2 = l2.next
    } else {
        head = l1
        l1 = l1.next
    }

    head.next = mergeTwoLists2(l1, l2)
    return head
};



function array2tree(ary, rootIndex) {
    if (ary[rootIndex] == null) {
        return null
    }
    var rootNode = new TreeNode(ary[rootIndex])
    var leftRootIndex = rootIndex * 2 + 1
    var rightRootIndex = rootIndex * 2 + 2

    var leftTree = array2tree(ary, leftRootIndex)
    var rightTree = array2tree(ary, rightRootIndex)

    rootNode.left = leftTree
    rootNode.right = rightTree
    return rootNode
}


var result = []

function tree2array(root, rootIndex) {
    if (!root) {
        return
    }
    result[rootIndex] = root.val
    var leftRootIndex = rootIndex * 2 + 1
    var rightRootIndex = rootIndex * 2 + 2

    tree2array(root.left, leftRootIndex)
    tree2array(root.right, rightRootIndex)

    return result

}

var mergeTrees = function(t1, t2) {
    var tmp = new TreeNode(0)
    if (t1 || t2) {
        if (t1 && t2) {
            tmp.val = t1.val + t2.val
        }
        if (t1 && !t2) {
            tmp.val = t1.val
        }
        if (!t1 && t2) {
            tmp.val = t2.val
        }
    } else {
        return null
    }
    tmp.left = mergeTrees(t1 !== null ? t1.left : null, t2 !== null ? t2.left : null)
    tmp.right = mergeTrees(t1 !== null ? t1.right : null, t2 !== null ? t2.right : null)
    return tmp
};


var averageOfLevels = function(root) {
    var res = []
    var queue = []
    queue.push(root)

    while (queue.length !== 0) {
        var n = queue.length
        var sum = 0
        for (var i = 0; i < n; i++) {
            var tmp = queue.shift()
            if (tmp !== null) {
                sum += tmp.val
                if (tmp.left) {
                    queue.push(tmp.left)
                }
                if (tmp.right) {
                    queue.push(tmp.right)
                }
            }
        }
        res.push(sum / n)
    }
    return res
};


var trimBST = function(root, L, R) {
    if (root == null) {
        return null
    }
    var value = root.val
    if (value < L) {
        return trimBST(root.right, L, R)
    } else if (value > R) {
        return trimBST(root.left, L, R)
    }
    if (root !== null) {
        root.left = trimBST(root.left, L, R)
        root.right = trimBST(root.right, L, R)
    }
    return root
};

function bubbleSort(nums) {
    var i = nums.length
    while (i > 0) {
        var laseExchange = 0;
        for (var j = 0; j < i; j++) {
            if (nums[j + 1] < nums[j]) {
                var tmp
                tmp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = tmp
                laseExchange = j
            }
        }
        i = laseExchange
    }
}

function selectSort(array) {
    for (var i = 0; i < array.length - 1; i++) {
        var minIndex = i
        for (var j = i; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j
            }
        }
        var tmp = array[i]
        array[i] = array[minIndex]
        array[minIndex] = tmp
    }
    return array
}

function insertSort(array) {
    for (var i = 1; i < array.length; i++) {
        var j = i
        var tmp = array[i]
        while (j > 0 && tmp < array[j - 1]) {
            array[j] = array[j - 1]
            j--
        }
        array[j] = tmp
    }
}

function insert(root, val) {
    if (root == null) {
        var node = new TreeNode(val)
        return root = node
    }
    if (val < root.val) {
        root.left = insert(root.left, val)
    } else {
        root.right = insert(root.right, val)
    }
    return root
}

var maxDepth = function(root) {
    if (root == null) {
        return 0
    }
    var count = 0
    var queue = []
    queue.push(root)
    while (queue.length !== 0) {
        count++
        var n = queue.length
        for (var i = 0; i < n; i++) {
            var head = queue.shift()
            if (head !== null) {
                if (head.left) {
                    queue.push(head.left)
                }
                if (head.right) {
                    queue.push(head.right)
                }
            }
        }
    }
    return count
};


var invertTree = function(root) {
    if (root == null) {
        return root
    }
    var tmp = root.left
    root.left = root.right
    root.right = tmp
    if (root.left !== null) {
        root.left = invertTree(root.left)
    }
    if (root.right !== null) {
        root.right = invertTree(root.right)
    }
    return root
};
//超时

var isSameTree = function(p, q) {
    var result1 = []
    var result2 = []
    tree2array(p, 0, result1)
    tree2array(q, 0, result2)
    return result1.toString() == result2.toString()

    function tree2array(root, rootIndex, result) {
        if (!root) {
            return
        }
        result[rootIndex] = root.val
        var leftRootIndex = rootIndex * 2 + 1
        var rightRootIndex = rootIndex * 2 + 2

        tree2array(root.left, leftRootIndex, result)
        tree2array(root.right, rightRootIndex, result)

        return result
    }
};

var isSymmetric = function(root) {
    var result = []
    var result_re = []
    tree2array(root, 0, result)
    retree2array(root, 0, result_re)

    return result.toString() == result_re.toString()

    function tree2array(root, rootIndex, result) {
        if (!root) {
            return
        }
        result[rootIndex] = root.val
        var leftRootIndex = rootIndex * 2 + 1
        var rightRootIndex = rootIndex * 2 + 2

        tree2array(root.left, leftRootIndex, result)
        tree2array(root.right, rightRootIndex, result)

        return result
    }

    function retree2array(root, rootIndex, result) {
        if (!root) {
            return
        }
        result[rootIndex] = root.val
        var leftRootIndex = rootIndex * 2 + 2
        var rightRootIndex = rootIndex * 2 + 1

        retree2array(root.right, rightRootIndex, result)
        retree2array(root.left, leftRootIndex, result)

        return result
    }
};


var sumOfLeftLeaves = function(root) {
    var sum = 0
    legal(root, 0)
    return sum

    function legal(root, flag) {
        if (!root) {
            return
        }
        if (flag === 1) {
            if (root.left == null && root.right == null) {
                sum += root.val
            }
        }
        legal(root.left, 1)
        legal(root.right, 0)
    }
};


var addTwoNumbers = function(l1, l2) {
    var node = new ListNode(0)
    var result = node
    var sum
    var flag = 0
    while (l1 || l2) {
        sum = 0
        if (l1 !== null) {
            sum += l1.val
            l1 = l1.next
        }

        if (l2 !== null) {
            sum += l2.val
            l2 = l2.next
        }

        node.next = new ListNode((sum + flag) % 10)
        flag = parseInt((sum + flag) / 10)
        node = node.next
    }
    if (flag) {
        var tail = new ListNode(flag)
        node = tail
    }
    return result.next
}

// Array.prototype.salice2 = function(start = 0, end = this.length) {
//     var res = []
//     end = end > this.length ? this.length : end
//     for (var i = start; i < end; i++) {
//         res.push(this[i])
//     }
//     return res
// }



// function toArray(val) {
//     return [].slice.call(val)
// }

// toArray = [].slice.call.bind([].slice)



var leafSimilar = function(root1, root2) {
    var ary1 = []
    var ary2 = []
    preOrder(root1, ary1)
    preOrder(root2, ary2)
    var len2 = ary2.length
    var len1 = ary1.length
    if (len1 !== len2) {
        return false
    } else {
        for (var i = 0; i < len1; i++) {
            if (ary1[i] !== ary2[i]) {
                return false
            }
        }
        return true
    }

    function preOrder(root, array) {
        if (!root) {
            return
        }
        if (root.left == null && root.right == null) {
            array.push(root.val)
        }
        preOrder(root.left, array)
        preOrder(root.right, array)
    }
};

function objToString(val) {
    return val.constructor.name
}

//用call来实现继承
function Product(name, price) {
    this.name = name
    this.price = price
}

function Food(name, price) {
    Product.call(this, name, price)
    this.category = 'food'
}



var convert = function(s, numRows) {
    var len = s.length
    if (len == 0 || nRows <= 1) {
        return s
    }
    var result = new Array(numRows)
    Arrays.fill(result, "")
    var row = 0
    var delta = 1
    for (var i = 0; i < len; i++) {
        result[row] += s[i]
        row += delta
        if (row >= nRows) {
            row = nRows - 2
            delta = -1
        }
        if (row < 0) {
            row = 1
            delta = 1
        }
    }
    result = result.join("")
    return result

};



// let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
// let result = arr.sort().reduce((init, current) => {
//     if (init.length === 0 || init[init.length - 1] !== current) {
//         init.push(current);
//     }
//     return init;
// }, []);
// console.log(result); //[1,2,3,4,5]



var largeGroupPositions = function(S) {

};


// [3, 5, 2, 7, 8, 1, 4, 9].reduce(function(memo, value, index, array) {
//     if (index === 0) {
//         min = memo < value ? memo : value
//         max = memo > value ? memo : value
//     } else {
//         if (value > max) {
//             max = value
//         }
//         if (value < min) {
//             min = value
//         }
//     }
//     memo += value
//     if (index === this.length - 1) {
//         return (memo - min - max) / (this.length - 2)
//     } else {
//         return memo
//     }
// })

function restoreTree(inOrder, postOrder) {
    var root = new TreeNode(postOrder[postOrder.length - 1])

    var leftTree = inOrder.slice(0, inOrder.indexOf(postOrder[postOrder.length - 1]))
    var rightTree = inOrder.slice(inOrder.indexOf(postOrder[postOrder.length - 1]) + 1)


}
//爆栈
var buildTree2 = function(preorder, inorder) {
    var preStart = 0
    if (preorder.length === 0 || inorder.length === 0) {
        return null
    }
    return helper(preorder, inorder)

    function helper(preorder, inorder) {
        var node = preorder[preStart++]
        var root = new TreeNode(node)


        var leftInOrder = inorder.slice(0, inorder.indexOf(node))
        if (leftInOrder.length === 0) {
            return root
        }
        var rightInOrder = inorder.slice(inorder.indexOf(node) + 1)
        if (rightInOrder.length === 0) {
            return root
        }

        root.left = buildTree(preorder, leftInOrder)
        root.right = buildTree(preorder, rightInOrder)

        return root
    }
};
//没爆栈
var buildTree = function(preorder, inorder) {
    var preStart = 0
    if (preorder.length === 0 || inorder.length === 0) {
        return null
    }
    return helper(0, inorder.length - 1, preorder, inorder)

    function helper(inStart, inEnd, preorder, inorder) {
        // Base情况
        if (preStart > preorder.length || inStart > inEnd) {
            return null
        }
        var root = new TreeNode(preorder[preStart])
        var inMid = 0
        // 找到根在中序序列中的位置，从而知道先序中的分割点
        for (var i = inStart; i <= inEnd; i++) {
            if (inorder[i] == preorder[preStart]) {
                inMid = i
            }
        }
        preStart++
        // 例如先序序列 1(234)(567) 中2是左子树的根
        root.left = helper(inStart, inMid - 1, preorder, inorder)
        // 先序序列 1(234)(567) 中5是右子树的根
        root.right = helper(inMid + 1, inEnd, preorder, inorder)
        return root
    }
}



var buildTree3 = function(inorder, postorder) {
    var postEnd = postorder.length - 1
    return helper(postorder, inorder, 0, inorder.length - 1)

    function helper(postorder, inorder, inStart, inEnd) {
        if (postEnd < 0 || inStart > inEnd) {
            return null;
        }
        var root = new TreeNode(postorder[postEnd--])
        var inMid = 0;
        // 找到中序序列的根节点
        for (var i = inStart; i <= inEnd; i++) {
            if (inorder[i] == root.val) {
                inMid = i
                break
            }
        }
        // 建好右子树
        root.right = helper(postorder, inorder, inMid + 1, inEnd)
        // 建好左子树
        root.left = helper(postorder, inorder, inStart, inMid - 1)
        return root
    }
}

var inorderTraversal = function(root) {
    var stack = []
    var res = []
    while (stack.length > 0 || root) {
        if (root) {
            stack.push(root)
            root = root.left
        } else {
            root = stack.pop()
            res.push(root.val)
            root = root.right
        }
    }
    return res
};


var preorderTraversal = function(root) {
    var stack = []
    var res = []
    if (root) {
        stack.push(root)
    } else {
        return res
    }
    while (stack.length > 0) {
        root = stack.pop()
        res.push(root.val)
        if (root.right) {
            stack.push(root.right)
        }
        if (root.left) {
            stack.push(root.left)
        }
    }
    return res
};

var postorderTraversal = function(root) {
    function hasChild(treeNode) {
        return (treeNode.left != null) || (treeNode.right != null)
    }
    var stack = []
    var map = []
    var res = []
    if (root) {
        stack.push(root)
        map.push(root)
    } else {
        return res
    }
    while (stack.length > 0) {
        root = stack[stack.length - 1]
        if (hasChild(root)) {
            if (map.includes(root.left) || map.includes(root.right)) {
                root = stack.pop()
                res.push(root.val)
            } else {
                if (root.right) {
                    stack.push(root.right)
                    map.push(root.right)
                }
                if (root.left) {
                    stack.push(root.left)
                    map.push(root.left)
                }
            }
        } else {
            root = stack.pop()
            res.push(root.val)
        }
    }
    return res
};

var climbStairs = function(n) {
    var res = 0
    helper(n, res)
    return res

    function helper(num) {
        if (num === 0) {
            res++
            return
        }
        if (num < 0) {
            return
        }
        helper(num - 1)
        helper(num - 2)
    }
};

String.raw = function raw(parts, ...insertions) {
    return parts.raw.reduce((result, part, i) => {
        return result + insertions[i - 1] + part
    })
}


function decipherThis(str) {
    var ary = str.replace(/\d+/g, function(match, p1, p2, p3, offset, string) {
        return String.fromCharCode(parseInt(match))
    }).split(' ')


    for (var i = 0; i < ary.length; i++) {
        var items = ary[i].split('')
        if (items.length > 2) {
            var tmp = items[1]
            items[1] = items[items.length - 1]
            items[items.length - 1] = tmp
            ary[i] = items.join('')
        }
    }
    return ary.join(' ')
};


var BSTIterator = function(root) {
    this.stack = new Array()
    while (root) {
        this.stack.push(root)
        root = root.left
    }
};

BSTIterator.prototype.hasNext = function() {
    return this.stack.length > 0
};

BSTIterator.prototype.next = function() {
    var node = this.stack.pop()
    var res = node.val
    if (node.right) {
        node = node.right
        while (node) {
            this.stack.push(node)
            node = node.left
        }

    }
    return res
};


var evalRPN = function(tokens) {
    var stack = []
    for (var i = 0; i < tokens.length; i++) {
        if (/\d+/.test(tokens[i])) { //是操作数
            stack.push(parseInt(tokens[i]))
        } else { //是操作符
            var B = stack.pop()
            var A = stack.pop()
            switch (tokens[i]) {
                case '+':
                    stack.push(A + B)
                    break
                case '-':
                    stack.push(A - B)
                    break
                case '*':
                    stack.push(A * B)
                    break
                case '/':
                    stack.push(A / B)
                    break
            }
        }
    }
    return stack.pop()
};

var restoreIpAddresses = function(s) {
    var result = []
    var parts = []
    helper(s, 3)
    return result

    function isLegal(str) {
        if (str.length === 0) {
            return false
        } else if (str.length > 3) {
            return false
        } else if (str.length === 3) {
            if (str < 100 || str > 255) {
                return false
            } else {
                return true
            }
        } else if (str.length === 2) {
            if (str < 10) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    function helper(str, n) {
        if (n === 0) {
            if (!isLegal(str)) {
                return
            } else {
                parts.push(str)
                result.push(parts.join('.'))
                parts.pop()
                return
            }
        }
        for (var i = 1; i <= 3; i++) {
            var part = str.slice(0, i)
            if (isLegal(part)) {
                parts.push(part)
            } else {
                continue
            }
            helper(str.slice(i), n - 1)
            parts.pop()
        }
    }

};

var calculate = function(s) {
    var str = s.replace(/\s+/g, "")
    var exp = str.split('')
    exp.push('\0')

    var num_stack = []
    var sym_stack = []
    sym_stack.push('\0') //哨兵
    var i = 0
    var reg = /\d/
    var reg2 = /[\(\)\+\-\0]/
    while (sym_stack.length !== 0) {
        if (reg.test(exp[i])) { //是操作数
            var num = 0
            while (reg.test(exp[i])) {
                num = num * 10 + parseInt(exp[i++])
            }
            if (sym_stack[sym_stack.length - 1] === '+') {
                num_stack.push((num + parseInt(num_stack.pop())).toString())
                sym_stack.pop()
            } else if (sym_stack[sym_stack.length - 1] === '-') {
                num_stack.push((parseInt(num_stack.pop()) - num).toString())
                sym_stack.pop()
            } else {
                num_stack.push(num.toString())
            }

            continue
        } else if (reg2.test(exp[i])) { //是运算符
            switch (exp[i]) {
                case '(':
                case '+':
                case '-':
                    sym_stack.push(exp[i])
                    break
                case ')':
                    sym_stack.pop()
                    if (sym_stack[sym_stack.length - 1] === '+') {
                        var A = +num_stack.pop()
                        var B = +num_stack.pop()
                        num_stack.push((B + A).toString())
                        sym_stack.pop()
                    } else if (sym_stack[sym_stack.length - 1] === '-') {
                        var A = +num_stack.pop()
                        var B = +num_stack.pop()
                        num_stack.push((B - A).toString())
                        sym_stack.pop()
                    }
                    break
                case '\0':
                    sym_stack.pop()
                    break
            }
            i++
        }
    }
    return num_stack.pop()
};

var decodeString = function(s) {
    var res = ""
    var num_stack = []
    var sym_stack = []
    var i = 0
    while (i < s.length) {
        if (/[a-zA-Z]|\[/.test(s[i])) {
            sym_stack.push(s[i++])
        } else if (/[0-9]/.test(s[i])) {
            var n = 0
            while (/[0-9]/.test(s[i])) {
                n = n * 10 + parseInt(s[i])
                i++
            }
            num_stack.push('' + n)
        } else if (s[i] === ']') {
            var num = num_stack.pop()
            var unit = ""
            while (sym_stack[sym_stack.length - 1] !== '[') {
                unit = sym_stack.pop() + unit
            }
            sym_stack.pop() //去左括号
            var tmp = unit
            var tmp2 = ""
            while (num > 0) {

                tmp2 = tmp + tmp2
                num--
            }
            sym_stack.push(tmp2)
            i++
        }
    }
    res = sym_stack.join('')
    return res
};

function randomArray(num, largest = 10) {
    //随机正整数数组，参数列表【数组元素个数，随机值最大值】
    var ary = []
    for (var i = 0; i < num; i++) {
        ary.push(Math.floor(Math.random() * largest + 1))
    }
    return ary
}
class HeapOrPriortyQueue {
    constructor() {
        this.tree = new Array()
    }

    swap(idx1, idx2) {
        var tmp = this.tree[idx1]
        this.tree[idx1] = this.tree[idx2]
        this.tree[idx2] = tmp
    }

    add(value) {
        var index = this.tree.length
        this.tree.push(value)
        var parentIndext = Math.floor((index - 1) / 2)
        while (index > 0) {
            if (this.tree[index] < this.tree[parentIndext]) {
                this.swap(index, parentIndext)
                index = (index - 1) >> 1
                parentIndext = (parentIndext - 1) >> 1
            } else {
                break
            }
        }
        return this
    }

    delete() {
        var target = this.tree[0]
        var last = this.tree.pop()
        this.tree[0] = last //至少会留有一个节点

        var index = 0
        while (true) {
            var minIndex = index
            if (this.tree[index * 2 + 1] < this.tree[minIndex]) {
                minIndex = index * 2 + 1
            }
            if (this.tree[index * 2 + 2] < this.tree[minIndex]) {
                minIndex = index * 2 + 2
            }
            if (index !== minIndex) {
                this.swap(minIndex, index)
                index = minIndex
            } else {
                break
            }
        }
        return target
    }
}

var mergeKLists = function(lists) {
    if (lists.length === 0) {
        return null
    }
    var result = [] //待数组转化为链表作为结果输出
    var heap = new HeapOrPriortyQueueBasedList()
    for (var i = 0; i < lists.length; i++) {
        //将每个链表（整链）分别压入堆中
        if (lists[i]) {
            heap.add(lists[i])
        }
        //此时当已小顶堆（数组）将最小值冒出
    }
    while (heap.tree.length !== 0) {
        var item = heap.delete()
        result.push(item.val)
        item = item.next
        if (item) {
            heap.add(item)
        } else {
            if (heap.tree.length === 0) {
                break
            }
        }
    }
    var finalRes
    return finalRes = array2list(result)

};
class HeapOrPriortyQueueBasedList {
    //小顶堆，本题的没个结点应为链表
    constructor() {
        this.tree = new Array()
    }

    swap(idx1, idx2) {
        var tmp = this.tree[idx1]
        this.tree[idx1] = this.tree[idx2]
        this.tree[idx2] = tmp
    }

    add(value) {
        var index = this.tree.length
        this.tree.push(value)
        var parentIndext = Math.floor((index - 1) / 2)
        while (index > 0) {
            if (this.tree[index].val < this.tree[parentIndext].val) {
                this.swap(index, parentIndext)
                index = (index - 1) >> 1
                parentIndext = (parentIndext - 1) >> 1
            } else {
                break
            }
        }
        return this
    }

    delete() {
        var target = this.tree[0]
        var last = this.tree.pop()
        if (this.tree.length === 0) {
            return target
        }
        this.tree[0] = last

        var index = 0
        while (true) {
            var minIndex = index
            if ((this.tree[index * 2 + 1]) && (this.tree[index * 2 + 1].val < this.tree[minIndex].val)) {
                minIndex = index * 2 + 1
            }
            if ((this.tree[index * 2 + 2]) && (this.tree[index * 2 + 2].val < this.tree[minIndex].val)) {
                minIndex = index * 2 + 2
            }
            if (index !== minIndex) {
                this.swap(minIndex, index)
                index = minIndex
            } else {
                break
            }
        }
        return target
    }
}

var findRelativeRanks = function(nums) {
    //排序
    var sortNums = Array.prototype.slice.call(nums).sort((a, b) => b - a)
    var map = {}
    var result = []
    for (var i = 0; i < nums.length; i++) {
        var medal = i + 1
        if (medal === 1) {
            map[sortNums[i]] = 'Gold Medal'
        } else if (medal === 2) {
            map[sortNums[i]] = 'Silver Medal'
        } else if (medal === 3) {
            map[sortNums[i]] = 'Bronze Medal'
        } else {
            map[sortNums[i]] = '' + (i + 1)
        }
    }

    for (var i = 0; i < nums.length; i++) {
        result.push(map[nums[i]])
    }
    return result
};


// ==================== 451. Sort Characters By Frequency ===============


var frequencySort = function(s) {
    var arr = s.split('')
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        if (!obj[item]) {
            obj[item] = 1
        } else {
            obj[item] = obj[item] + 1
        }
    }

    //排序
    var arr = []
    for (var atrr in obj) {
        arr.push([atrr, obj[atrr]])
    }
    arr.sort(function(a, b) {
        return b[1] - a[1]

    })
    var result = ''
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i][1]; j++) {
            result += arr[i][0]
        }
    }
    return result
};

var calPoints = function(ops) {
    function isNumber(n) {
        var val = parseInt(n)
        if (val != val) {
            return false
        }
        return Object.prototype.toString.call(val) === '[object Number]'
    }

    var stack1 = []
    var res = 0
    for (var i = 0; i < ops.length; i++) {
        if (isNumber(ops[i])) {
            if (stack1[stack1.length - 1]) {
                res += parseInt(ops[i])
            } else {
                res = parseInt(ops[i])
            }
            stack1.push(ops[i])
        } else {
            switch (ops[i]) {
                case 'C':
                    var div = stack1.pop()
                    res -= parseInt(div)
                    break
                case 'D':
                    var tmp = 2 * parseInt(stack1[stack1.length - 1])
                    res += tmp
                    stack1.push(tmp)
                    break
                case '+':
                    var n1 = parseInt(stack1[stack1.length - 1])
                    var n2 = parseInt(stack1[stack1.length - 2])
                    var tmp = n1 + n2
                    res += tmp
                    stack1.push(tmp)
                    break
            }
        }
    }
    return res
};

var nextGreaterElement = function(findNums, nums) {
    var map = new Map()
    var res = []
    for (var i = 0; i < nums.length - 1; i++) {
        var max = -1
        for (var j = i + 1; j < nums.length; j++) {
            if (nums[j] > nums[i]) {
                max = nums[j]
                break
            }
        }
        map.set(nums[i], max)
    }
    for (var i = 0; i < findNums.length; i++) {
        if (!map.has(findNums[i])) {
            res.push(-1)
        } else {
            res.push(map.get(findNums[i]))
        }
    }
    return res
};

var dailyTemperatures = function(temperatures) {
    var res = []
    var stack = []
    for (var i = 0; i < temperatures.length; i++) {
        if (stack.length === 0) {
            stack.push(i)
        } else {
            while ((temperatures[i] > temperatures[stack[stack.length - 1]]) && (stack.length != 0)) {
                var part = i - stack[stack.length - 1]
                res[stack[stack.length - 1]] = part
                stack.pop()
            }
            stack.push(i)
        }
    }
    for (var i = 0; i < temperatures.length; i++) {
        if (!res[i]) {
            res[i] = 0
        }
    }
    return res
};

var generate = function(numRows) {
    var result = []
    for (var x = 0; x < numRows; x++) {
        result[x] = new Array()
    }
    var i = 0
    while (i < numRows) {
        for (var j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                result[i][j] = 1
            } else {
                result[i][j] = result[i - 1][j - 1] + result[i - 1][j]
            }
        }
        i++
    }
    return result
};

var isIsomorphic = function(s, t) {
    var mapS = {}
    var mapT = {}

    for (var i = 0; i < s.length; i++) {
        var valueS = s[i]
        var valueT = t[i]

        if (!mapS[valueS]) {
            mapS[valueS] = valueT
        } else if (mapS[valueS] != valueT) {
            return false
        }

        if (!mapT[valueT]) {
            mapT[valueT] = valueS
        } else if (mapT[valueT] != valueS) {
            return false
        }
    }

    return true
};

var flatten = function(root) {
    if (!root) {
        return
    }
    if (root.left) {
        flatten(root.left)
    }
    if (root.right) {
        flatten(root.right)
    }
    var tmp = root.right
    root.right = root.left
    root.left = null
    while (root.right) {
        root = root.right
    }
    root.right = tmp
};

var thirdMax = function(nums) {
    let first = nums[0]
    let second = -Infinity
    let third = -Infinity
    for (var i = 1; i < nums.length; i++) {
        if (nums[i] > first) {
            third = second
            second = first
            first = nums[i]
        } else if (nums[i] > second && nums[i] !== first) {
            third = second
            second = nums[i]
        } else if (nums[i] > third && nums[i] !== first && nums[i] !== second) {
            third = nums[i]
        }
    }
    if (third === -Infinity) {
        return first
    } else {
        return third
    }
};

//异步Map
function asyncMap(ary, asyncMapper, callback) {
    let result = []
    let count = 0
    for (let i = 0; i < ary.length; i++) {
        asyncMapper(ary[i], function(err, val) {
            count++
            result[i] = val
            if (count === ary.length()) {
                callback(null, result) //每一项都处理完成则调用callback
            }
        })
    }
}

function square(val, callback) {
    callback(null, val * val)
}

// asyncMap([1,2,3,4,5], square, function(err, results) {
//     results is now an array of stats for each file
// });