### 特殊的 List —— 队列（Queue）
1. 队列的特点 : **先进先出** (FIFO)。

2. 相关概念

  - **入队** : 从 **队尾** 进入队列 ; **出队** : 从 **队头** 离开队列。

  - **链式队列** ：用**链表**实现的队列。

  - **顺序队列** ：用**数组**实现的队列

    队列中，数组的删除操作会导致数组中的数据不连续，需要进行**数据搬移**的操作

    数据搬移的优化方案：在出队时可以不移动数据，仅移动队列的尾指针。**当队列头到达数组的末尾时，比较队列大小和数组的大小，如果有空闲空间了，再触发一次数据搬移**。

    复杂度分析：最好：O(1)，最坏O(n)，**摊还：O(1)**。

  - **循环顺序队列** ：将数组逻辑上看作环形，用指针标记队列的首尾，从而**避免了数据搬移**。

    关键：**首尾指针位置的计算**

    初始化队列时：head = 0, tail = -1（head 要比 tail 大 1，相当于 head 指向下一个入队的元素）

    运行时：

    **tailIndex = (tailIndex + 1) % maxSize**， maxSize 为数组的大小

    **headIndex = (headIndex + 1) % maxSize**

    当运行中队列变为空时，无论 head 处于什么位置，都会满足 head 要比 tail 大 1。

  - **阻塞队列** —— 在队列基础上增加了阻塞操作。
  
    在队列为空的时候，从队头取数据会被阻塞，此时还没有数据可取，直到队列中有了数据才能返回；

    如果队列已经满了，那么插入数据的操作就会被阻塞，直到队列中有空闲位置后再插入数据，然后再返回。

    可以使用阻塞队列，轻松实现一个 **生产者 - 消费者模型**

  - **并发队列**
  
    在多线程情况下，会有多个线程同时操作队列，这个时候就会存在线程安全问题。能够使线程安全的队列叫作并发队列。
    
    **循环顺序队列 + CAS 原子操作**，可以实现非常**高效的并发队列**。

3. **循环顺序队列**的实现
```
    class Queue() {
        constructor(maxSize) {
            if(parseInt(maxSize) > 0) {
                this.maxSize = maxSize
                this.queue = new Array(parseInt(maxSize))
                // 当 queueSize 为 0 时，head 要比 tail 大 1，相当于 head 指向下一个入队的元素
                this.head = 0 , this.tail = -1
                this.queueSize = 0
            } else {
                return 'illegal maxSize'
            }
        }

        this.enqueue = (item) => {
            if(this.queueSize < this.maxSize) {
                this.tail = (this.tail + 1) % this.maxSize
                this.queue[this.tail] = item
                this.queueSize ++
                return true
            } else return false
        }

        this.dequeue = () => {
            if(this.queueSize) {
                this.head = (this.head + 1) % this.maxSize
                this.queueSize --
                return ture
            } else return false
        }

        this.headValue = () => {
            if(this.queueSize) {
                return this.queue[this.head]
            }
            // 空队列
            return false
        }

        this.tailValue = () => {
            if(this.queueSize) {
                return this.queue[this.tail]
            }
            // 空队列
            return false
        }

        this.clear = () => {
            if(this.queueSize) {
                this.queueSize = 0
                this.head = 0, this.tail = -1
            }
        }
    }
```

4. **链式队列** 的实现
```
    // 一般定义链表的 head 指针指向 队尾，tail 指针指向 队头
    class Queue() {
        constructor() {
            this.head = this.tail = this.position = new Node(void 0, null)
            this.listSize = 0
        }

        this.enqueue = (item) => {  // 入队
            this.tail.next = new Node(item, null)
            this.tail = this.tail.next
            this.listSize ++
        }

        this.dequeue = () => {  // 出队
            if(this.listSize) {
                let temp = head
                this.head = this.head.next
                delete temp
                this.listSize --
            } else {  // 空队列
                retrun false
            }
        }

        this.headValue = () => {  // 读取队头元素的值，不改变队列
            if(this.listSize) {
                return this.tail.value
            }
            // 空队列
            retrun false
        }

        this.clear = () => {  // 清空队列
            while(this.tail !== this.head) {
                let temp = head
                this.head = this.head.next
                delete temp
            }
            this.tail.value = void 0
            this.listSize = 0
        }
    }
```

5. 应用案例 —— 利用 **先进先出** 的特点

  - I/O设备的缓冲区的消息队列

  - 操作系统的消息队列

  - **LRU 缓存淘汰算法**

  LRU （英文：Least Recently Used）, 意为最近最少使用。这个算法的精髓在于如果一块数据最近被访问，那么它将来被访问的几率也很高，根据数据的历史访问来淘汰长时间未使用的数据。

  实现思路：**有序单链表**，链表头部是最近访问的数据。当新的数据被访问时，从链表头开始遍历链表。

  1. 如果此数据之前已经被缓存在链表中了，我们遍历得到这个数据对应的结点，并将其从原来的位置删除，然后再插入到链表的头部。
  
  2. 如果此数据没有在缓存链表中，又可以分为两种情况：
  
    - 如果此时缓存未满，则将此结点直接插入到链表的头部；

    - 如果此时缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。

6. 队列的练习
  - []()
  - []()
  - []()
  - []()
  - []()
