/* 用于LeetCode函数编写与其他代测码试
 * @Author: BaiRuobing
 * @Date:   2018-06-28 09:13:52
 * @Last Modified by:   BaiRuobing
 * @Last Modified time: 2018-07-24 12:52:13
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