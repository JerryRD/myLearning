
### 特殊的 List —— 栈（Stack）
1. 栈的特点 : **后进先出** (LIFO)，只涉及在一端插入和删除数据。

2. 相关概念

  - **顺序栈**：用**数组**实现的栈；**链式栈**：用**链表**实现的栈。

  - **压栈** : 数据进入栈，成为 **栈顶** 元素 ; **弹出** : 栈顶的元素出栈。

    入栈、出栈只涉及栈顶个别数据的操作，时间复杂度都是 **O(1)**

  - **动态扩容的顺序栈** （不常用，复杂度分析为主）
    
    当栈满之后，申请一个更大的数组，并将原来的数据搬移到新数组中。

    **时间复杂度**：最好为 O(1)，最坏为 O(n)，**均摊时间复杂度就为 O(1)**（摊还分析法）

3. **顺序栈** 的实现
    ```
        class StackBasedArray() {
            constructor(size) {
                this.listArray = new Array(size)  // 存放栈的数组
                this.arraySize = size  // 数组的大小，栈的最大长度
                this.listSize = 0  // 栈的大小
            }

            this.push = (item) => {  // 压栈
                if(this.listSize === this.arraySize) {  // 栈已满
                    retrun false
                } else {  // 数据入栈
                    this.list[listSize ++] = item
                    retrun true
                }
            }

            this.pop = () => {  // 出栈
                if(this.listSize === 0) {  // 栈为空，下同
                    return false
                } else {  // 读取栈顶数据返回，栈的长度 - 1
                    return this.list[-- this.listSize]
                }
            }

            this.topValue = () => {  // 读取栈顶元素的值
                if(this.listSize === 0) {
                    return false
                } else {  // 读取栈顶数据返回，栈的长度不变
                    return this.list[this.listSize - 1]
                }
            }

            this.clear = () => {  // 清空栈
                this.listSize = 0
            }
        }
    ```

4. 应用案例 —— 利用 **后进先出** 的特点

- **函数调用栈**

  操作系统给每个线程分配了一块独立的内存空间，这块内存被组织成 **栈** 这种结构, **用来存储**函数调用时的**临时变量**。
  
  进入函数，就会将每个临时变量作为一个栈帧入栈；当被调用函数执行完返回之后，将该函数对应的栈帧出栈。

  **为什么函数调用要用“栈”来保存临时变量呢？**

  其实，我们不一定非要用栈来保存临时变量，只不过如果这个函数调用符合后进先出的特性，用栈这种数据结构来实现，是最顺理成章的选择。

  从调用函数进入被调用函数，对于数据来说，变化的是**作用域**。所以根本上，只要能保证每进入一个新的函数，都是一个新的作用域就可以。而要实现这个，用栈就非常方便。在进入被调用函数的时候，分配一段栈空间给这个函数的变量，在函数结束的时候，将栈顶复位，正好回到调用函数的作用域内。

  ![](https://static001.geekbang.org/resource/image/17/1c/17b6c6711e8d60b61d65fb0df5559a1c.jpg)


- 编译原理 —— **表达式求值**
  
  ![](https://static001.geekbang.org/resource/image/bc/00/bc77c8d33375750f1700eb7778551600.jpg)


- **浏览器的前进 / 后退** —— **两个栈**

  使用两个栈，X 和 Y，把首次浏览的页面依次压入栈 **X；当点击后退按钮时，再依次从栈 X 中出栈，并将出栈的数据依次放入栈 Y。**

  当点击前进按钮时，依次从栈 Y 中取出数据，放入栈 X 中。当栈 X 为空时，就没有页面可以继续后退浏览了。当栈 Y 中没有数据时，那就说明没有页面可以点击前进按钮浏览了。

- 判断括号是否匹配 : 如 `((())(())))`

5. 关于栈的练习
- [leetcode 20 - 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

- [leetcode 155 - 最小栈](https://leetcode-cn.com/problems/min-stack)

- [leetcode 232 - 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

- [leetcode 844 - 比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)

- [leetcode 224 - 基本计算器](https://leetcode-cn.com/problems/basic-calculator/)

- [leetcode 682 - 棒球比赛](https://leetcode-cn.com/problems/baseball-game/)

- [leetcode 496 - 下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i/)

