/* 用于LeetCode函数编写与其他代测码试
 * @Author: BaiRuobing
 * @Date:   2018-06-28 09:13:52
 * @Last Modified by:   BaiRuobing
 * @Last Modified time: 2018-07-31 21:28:55
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

