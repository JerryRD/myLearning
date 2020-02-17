## 线性表 —— List

### 基础概念
1. List 的**定义**：由 **相同数据元素** 组成的序列。

2. List 中的**操作**：**插入**、**删除** 和 **读取** 元素，查找指定元素（上一个/下一个）。

3. **栅栏**(fence, position)：记录当前位置，List 的操作将**作用于栅栏后面的元素**。

4. List 的抽象类
    ```
    class List() {
        var position, list

        this.setPosition = (pos) => {
            this.position = pos;
        }

        this.insert = () => {
            // 插入元素
        }

        this.delete = () => {
            // 删除元素
        };

        this.gerValue = () => {
            return this.list[this.position]
        }
    }
    ```

### List 的实现 —— 数组
1. 代码实现
    ```
    class ListBasedArray() {
        constructor(arrSize, pos) {
            this.list = new Array(arrSize)
            this.maxSize = arrSize
            this.listSize = this.position = 0
        }

        this.setPosition = (pos) => {  // 设置栅栏位置
            if(pos >= 0 && pos <= this.maxSize) {
                this.position = pos;
                return true
            }
            return false
        }

        this.gerValue = () => {  // 读取栅栏后的元素的值
            if(this.position === this.listSize) {  // 栅栏后无元素
                return false
            }
            return this.list[this.position]
        }

        this.insert = (element) => { // 在栅栏后插入元素
            if(this.maxSize === this.listSize) {  // 数组已满
                return false
            } else {
                for(let i = this.listSize; i > this.position; -- i) {
                    this.list[i] = this.list[i - 1]
                }
                this.listSize ++
                return ture
            }
        }

        this.delete = () => { // 删除栅栏后的元素
            if(this.positon === this.listSize) {  // 栅栏在最后
                return false
            } else {
                for(let i = this.positon; i < this.listSize - 1; ++ i) {
                    this.list[i] = this.list[i + 1]
                }
                this.listSize --
                return true
            }
        }
    }
    ```

2. 性能评价

- **设置栅栏位置** (setPosition) : `θ(1)`
  
  这意味着 **数组支持快速访问指定位置的元素**，即 **随机访问**。

- **在栅栏后** 插入 / 删除 1 个元素 (insert / delete) : 平均情况下 `θ(n)`, **在数组末尾操作为 `θ(1)`**

- **在指定位置** 插入 / 删除 1 个元素（即先设置栅栏，再插入/删除）: 平均情况下 `θ(n)`, **在数组末尾操作为 `θ(1)`**

- **读取栅栏后的元素的值** (getValue) : `θ(1)`

3. **插入操作的特殊情况**

  数组中存储的数据并没有任何规律，数组只是被当作一个存储数据的集合。如果要将某个数组插入到第 k 个位置，可以避免大规模的数据搬移。
  
  如果数组有序，必须严格按顺序移动数据。
  
- **具体思路** : **直接将第 k 位的数据搬移到数组元素的最后，把新的元素直接放入第 k 个位置**。

- **具体实现**
    ```
        this.insert = (element) => { // 在栅栏后插入元素
            if(this.maxSize === this.listSize) {  // 数组已满
                return false
            } else {
                this.list[this.listSize] = this.list[this.position]
                this.[position] = item
                this.listSize ++
                return ture
            }
        }
    ```

4. **删除操作的特殊情况**

  在某些特殊场景下，我们并不一定非得追求数组中数据的连续性。因此如果将多次删除操作集中在一起执行，删除的效率会提高很多。

- **具体操作**

  先对要删除的位置做一个标记，每次的删除操作并不是真正地搬移数据，只是**记录数据已经被删除**。**当数组没有更多空间存储数据时，再触发执行一次真正的删除操作**。 JVM 标记清除垃圾回收算法也是这样处理的。

- 具体实现
    ```
        this.delete = () => {  // 删除数据，使用 undefined 标记
            if(this.positon === this.listSize) {  // 栅栏在最后
                return false
            } else {
                this.list[this.position] = void 0
                this.listSize --
                return true
            }
        }
        
        this.insert = (element) => { 
            if(this.maxSize === this.listSize) {  // 数组已满
                if(this.remove() === this.listSize) {  // 在插入且数组已满时调用
                    return false
                }
            }
            /* 根据实际情况进行插入操作 */
        }

        this.move = () => {  // 真正移动数据
            if(this.listSize === this.maxSize) {
                for(var i = 0, j = 0; i < this.listSize; i ++) {
                    if(this.list[i] !== void 0) {
                        this.list[j] = this.list[i]
                        j ++
                    }
                }
                this.listSize = j
                retrun j
            } relse {
                return false
            }
        }
    ```

5. 补充
-  数组的寻址方式
    ```
        a[k]_address = base_address + k * type_size
        //  数组使用连续的空间存储，base_address 为首地址，因此根据公式随机访问效率为 θ(1)
    ```

### List 的实现 —— 链表
1. 代码实现
    ```
        class Node() {  // 结点类
            constructor(value, next) {
                this.element = value
                this.next = next
            }
        }

        class LinkedList() {  // 链表类
            constructor() {
                this.head = this.tail = this.position = new Node(void 0, null)
                this.listSize = 0
            }

            this.setPosition = (pos) => {  // 设置栅栏位置
                if(pos <= 0 && pos >= this.listSize) {
                    retrun false
                }
                this.position = this.head
                for(let i = 0; i < pos; ++i) {  // 移动 pos 次
                    this.position = this.position.next
                }
                return true
            }

            this.getValue = () => {  // 获取栅栏后的值
                if(this.position === this.tail) {  // 链表尾部
                    return false
                } else {
                    // 返回 position 的下一个节点的值
                    return this.position.next.element
                }
            }

            this.insert = () => {  // 在栅栏后插入元素
                this.position.next = new Node(item, this.position.next)
                this.listSize ++
                if(this.position === this.tail) {  // 尾部插入数据，tail 要移动
                    this.tail = this.position.next
                }
                return ture
            }

            this.delete = () => {  // 在栅栏后删除元素
                if(this.position.next === null) {  // 链表为空
                    return false
                } else {
                    let delTarget = this.position.next
                    this.position.next = delTaget.next
                    if(this.tail === delTaget) { // 尾部删除数据，tail 要移动
                        this.tail = this.position
                    }
                    delete delTarget
                    this.listSize --
                    return true
                }
            }

        }
    ```
2. **性能评价**
- **设置栅栏位置** (setPosition) : 平均情况下 `θ(n)`
  
  即**随机访问指定位置的元素，需要从头到开始遍历**，低效

- **在栅栏后** 插入 / 删除 1 个元素 (insert / delete) : `θ(1)`

- **在指定位置** 插入 / 删除 1 个元素（即先设置栅栏，再插入/删除）: 平均情况下 `θ(n)`, **在链表首尾操作为 `θ(1)`**

- **读取栅栏后的元素的值** (getValue) : `θ(1)`

### 链表代码的技巧

1. 理解指针或引用的含义

  将某个变量赋值给指针，实际上就是将这个变量的地址赋值给指针。或者反过来说，指针中存储了这个变量的内存地址，指向了这个变量，通过指针就能找到这个变量。

2. 警惕指针丢失和内存泄漏

  - 插入结点时，要注意**操作的顺序**

  - 删除链表结点时，要记得**手动释放内存空间**

3. 利用哨兵简化实现难度——**带头链表**

  由于针对链表的插入、删除操作，需要对**插入第一个结点**和**删除最后一个结点**的情况进行特殊处理。

  因此引入哨兵结点，在任何时候，不管链表是否为空，head 指针都会一直指向这个哨兵结点，哨兵结点是不存储数据的。

  从而插入第一个结点和插入其他结点，删除最后一个结点和删除其他结点，都可以统一为相同的代码实现逻辑了。

  我们也把这种有哨兵结点的链表叫带头链表，**上面链表的代码实现已经采用这种方法**。

4. 重点留意边界条件处理

  我经常用来检查链表代码是否正确的边界条件有这样几个：

  - **链表为空时**

  - **链表只包含一个结点时**

  - **链表只包含两个结点时**

  - **处理头结点和尾结点时**

5. 举例画图，辅助思考

6. 多写多练，没有捷径

7. 常见链表操作的练习

  - [leetcode 206 - 单链表反转](https://leetcode-cn.com/problems/reverse-linked-list/)
  
  - [leetcode 21 - 两个有序的链表合并](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
  
  - [leetcode 19 - 删除链表倒数第 n 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

8. **快慢指针的使用** ：**fast = fast.next.next, slow = slow.next**

  - 求链表中点
    - [leetcode 876 - 求链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

  - 判断链表中是否有环，以及查找环开始的位置
    - [leetcode 141 - 链表中环的检测](https://leetcode-cn.com/problems/linked-list-cycle/)

    - [leetcode 141 - 链表中环的检测 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
