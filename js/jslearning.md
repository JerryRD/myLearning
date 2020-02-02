# [javascript 教程](https://wangdoc.com/javascript/)
## 标签（label）
- 标签可以是任意的标识符，但不能是保留字，语句部分可以是任意语句。

- 标签通常与 break 语句和 continue 语句配合使用，跳出特定的循环；也可以用于跳出代码块。
```
  top:
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if (i === 1 && j === 1) break top;
        console.log('i=' + i + ', j=' + j);
      }
    }

  foo: {
    console.log(1);
    break foo;
    console.log('本行不会输出');
  }
  console.log(2);
```

## 数据类型
### JavaScript 的数据类型，共有六种。（ES6 又新增了第七种 Symbol 类型的值）
- 数值（number）：整数和小数（比如 1 和 3.14）

- 字符串（string）：文本。

- 布尔值（boolean）：表示真伪的两个特殊值，即 true（真）和 false（假）

- 对象（object）：各种值组成的集合。

- undefined：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值

- null：表示空值，即此处的值为空。

### 对象(object)：
- 狭义的对象（object）
- 数组（array）
- 函数（function）

### typeof
- 返回值类型：string

- **typeof null === "object"** 
- null的类型是object，这是由于历史原因造成的。1995年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑null，只把它当作object的一种特殊值。后来null独立出来，作为一种单独的数据类型，为了兼容以前的代码，typeof null返回object就没法改变了。

### null 和 undefined
- 区别：
- **null**是一个表示“空”的对象，**转为数值时为 0**；**undefined**是一个表示"此处无定义"的原始值，**转为数值时为NaN**

- 调用函数时，某个参数未设置任何值，这时就可以传入 null，表示该参数为空。比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入 null，表示未发生错误。

- undefined 表示“未定义”，下面是返回 undefined 的典型场景。
1. 声明了但**未赋值的变量**
  ```
    var i;
    i // undefined
  ```
2. **调用函数时缺省的参数**
  ```
    function f(x) {
      console.log(x)
    }
    f() 
    // undefined
  ```
3. **对象中没有赋值的属性**
  ```
    var  o = new Object();
    o.p // undefined
  ```

4. **没有返回值的函数**，默认返回 undefined
  ```
    function f() {}
    f() // undefined
  ```

### 布尔值
- 如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是**除了下面六个值被转为 false，其他值都视为 true**。
  
  ```
    0, undefined, null, false, NaN, ""('', 空字符串)
  ```

### 数值
- JavaScript 内部，所有数字都是以 **64 位浮点数**形式储存，使用 **IEEE 754** 标准
  ```
    (-1)^符号位 * 1.xx...xx * 2^指数部分
  ```

- 精度最多只能到 53 个二进制位，即 -2^53 到 2^53 的整数（15 位的十进制整数），都可以精确表示。
- 指数部分的长度是 11 个二进制位，这部分用移码表示（余 1023），即指数可表示的范围为 2^(-1023) 到 2^(1024) 
- 如果一个数大于等于 2^1024，那么就会发生“正向溢出”，这时就会返回 Infinity。
- 如果一个数小于等于 2^-1075（指数部分最小值 -1023 ，再加上小数部分的 52 位），那么就会发生为“负向溢出”，这时会直接返回 0（node 会返回  5e-324）。
  ```
    Math.pow(2, 1024) // Infinity
    Math.pow(2, -1075) // 0 或 5e-324
  ```
- 以下两种情况，JavaScript 会自动将数值转为科学计数法表示，其他情况都采用字面形式直接表示：
 **(1) 小数点前的数字多于21位。**
 **(2) 小数点后的零多于5个。**
  ```
    1234567890123456789012
    // 1.2345678901234568e+21

    123456789012345678901
    // 123456789012345680000

    0.0000003 // 3e-7
    0.000003 // 0.000003
  ```

- 进制 ： JavaScript 不再允许将带有前缀 0 的数字视为八进制数，而是要求忽略这个 0

- ### 特殊数值
1. 正零和负零
- JavaScript 内部实际上存在2个0：一个是+0，一个是-0，区别就是64位浮点数表示法的符号位不同。**它们是等价的**。
唯一有区别的场合是，**+0 或 -0 当作分母，返回的值是不相等的**。
  ```
    (1 / +0) === (1 / -0) 
    // false
    // 因为除以 +0 得到 +Infinity，除以 -0 得到 -Infinity
  ```

2. NaN
- NaN 是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。

- **NaN** 不是独立的数据类型，而**是一个特殊数值，它的数据类型依然属于 Number** (**typeof NaN === 'number'**)。

- **NaN 不等于任何值，包括它本身**； 
  **NaN 与任何数（包括它自己）的运算，得到的都是 NaN**；
  **NaN 与任何指比较都返回false**；
  NaN 在布尔运算时被当作 false。
  ```
    NaN === NaN 
    // false
    [NaN].indexOf(NaN) // -1
    // 因为数组的 indexOf 方法内部使用的是严格相等运算符，所以该方法对 NaN 不成立。

    NaN + NaN // NaN
    NaN - 32  // NaN
    NaN * 32  // NaN
    NaN / 32  // NaN

    Boolean(NaN) 
    // false

    NaN - NaN      // false 
    NaN - Infinity // false
  ```

3. Infinity
- 表示“无穷”，用来表示两种场景：一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是**非0数值**除以0，得到Infinity。
- **Infinity 有正负之分**，Infinity 表示正无穷，-Infinity 表示负无穷。Infinity 大于一切数值（除了 NaN），-Infinity 小于一切数值（除了 NaN）。
  ```
    Math.pow(2, 1024) // Infinity
    0 / 0             // 0：NaN
    1 / 0             // 非零值：Infinity

    1 / -0    // -Infinity
    -1 / -0   // Infinity

    Infinity - 1000   // true
    -Infinity < -1000 // true
  ```

- Infinity 的四则运算，符合无穷的数学计算规则: 
- **0 乘以 Infinity，返回NaN**；0 除以 Infinity，返回 0；Infinity 除以 0，返回 Infinity。
- Infinity 加上或乘以 Infinity，返回的还是 Infinity; **Infinity 减/除以 Infinity，得到 NaN**。
- Infinity 与 null 计算时，null会转成 0，等同于与 0 的计算。
  ```
    5 * Infinity  // Infinity
    5 - Infinity  // -Infinity
    Infinity / 5  // Infinity
    5 / Infinity  // 0

    0 * Infinity  // NaN
    0 / Infinity  // 0
    Infinity / 0  // Infinity

    Infinity + Infinity  // Infinity
    Infinity * Infinity  // Infinity
    Infinity - Infinity  // NaN
    Infinity / Infinity  // NaN

    null * Infinity   // NaN
    null / Infinity   // 0
    Infinity / null   // Infinity
  ```

4. 特殊常量
- Number.EPSILON： 2^-52, 表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值，**实质是一个可以接受的最小误差范围**。
- 用法： 1. 判断运算结果是否相等；2. 作为基数，用来设置“能够接受的误差范围”。
  ```
    // Number.EPSILON 使用：
    // 1. 判断运算结果是否相等的正确做法：
    var x = 0.2, y = 0.3, z = 0.1;
    equal = (Math.abs(x - y + z) < Number.EPSILON);

    // 2. 可以用来设置“能够接受的误差范围”
    a < Number.EPSILON * Math.pow(2, 2)
  ```
- Number.MAX_VALUE：1.7976931348623157e+308, 在 JavaScript 里所能表示的最大数值；Number.MIN_VALUE：5e-324, 在 JavaScript 里所能表示的**最小的正值**。
- Number.MAX_SAFE_INTEGER: 2^53 - 1, 常量表示在 JavaScript 中最大的安全整数; Number.MIN_SAFE_INTEGER：在 JavaScript中最小的安全的integer型数字 (-(2…^53 - 1))。

- ### 与数值相关的全局方法
1. **parseInt()**： 将字符串转为整数。
- 如果字符串头部有空格，空格会被自动去除。
- 如果 parseInt 的参数不是字符串，则会先转为字符串再转换。
- 字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。
- **如果字符串的第一个字符不能转化为数字（包括空字符串）（后面跟着数字的正负号除外），返回NaN**。
  ```
    parseInt('   81') // 81

    parseInt(1.23)    // 1
    // 等同于
    parseInt('1.23')  // 1

    parseInt('8a')    // 8
    parseInt('12**')  // 12
    parseInt('15px')  // 15

    parseInt('abc')   // NaN
    parseInt('.3')    // NaN
    parseInt('')      // NaN
  ```
- 如果字符串以 0x 或 0X 开头，parseInt 会将其按照十六进制数解析。如果字符串以 0 开头，将其按照 10 进制解析。
- 对于那些会自动转为科学计数法的数字，parseInt 会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。

- parseInt 方法还可以接受第二个参数（2 到 36 之间），表示**被解析值的进制**， **返回**该值对应的**十进制数**。
- 默认情况下，parseInt 的第二个参数为 10，即默认是十进制转十进制。
- 如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，超出这个范围，则返回 NaN。如果第二个参数是 0、undefined 和 null，则直接忽略。
  ```
    parseInt(1000000000000000000000.5) // 1
    // 等同于
    parseInt('1e+21')                  // 1

    parseInt(0.0000008) // 8
    // 等同于
    parseInt('8e-7')    // 8

    parseInt('1000', 2) // 8
    parseInt('1000', 6) // 216
    parseInt('1000', 8) // 512

    parseInt('10', 37)  // NaN
    parseInt('10', 1)   // NaN
    parseInt('10', 0)   // 10
  ```

2. **parseFloat()**: 将一个字符串转为浮点数
- **如果字符串符合科学计数法，也会进行相应的转换**。
- 如果包含不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分
- parseFloat 方法会自动过滤字符串前导的空格。
- 如果参数不是字符串，或者字符串的第一个字符不能转化为浮点数，则返回 NaN。

- parseFloat 的转换结果不同于 Number 函数
  ```
  parseFloat('314e-2')     // 3.14
  parseFloat('0.0314E+2')  // 3.14

  parseFloat('3.14more non-digit characters') // 3.14

  parseFloat('\t\v\r12.34\n ')  // 12.34

  parseFloat([])      // NaN
  parseFloat('FF2')   // NaN
  parseFloat('')      // NaN

  parseFloat(true)  // NaN
  Number(true)      // 1

  parseFloat(null)  // NaN
  Number(null)      // 0

  parseFloat('')    // NaN
  Number('')        // 0

  parseFloat('123.45#')   // 123.45
  Number('123.45#')       // NaN
  ```

3. **isNaN()**：
- 判断一个值是否为 NaN
- isNaN 只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成 NaN，所以最后返回 true。
- **也就是说，isNaN 为 true 的值，有可能不是 NaN，而是一个字符串**。因此，使用 isNaN 之前，最好判断一下数据类型。
- **判断NaN更可靠的方法是，利用 NaN 为唯一不等于自身的值的这个特点**。
  ```
  isNaN(NaN)   // true
  isNaN(123)   // false

  isNaN('Hello')          // true
  // 相当于
  isNaN(Number('Hello'))  // true

  // 判断数据类型
  function myIsNaN(value) {
    return typeof value === 'number' && isNaN(value);
  }

  // NaN 为唯一不等于自身的值
  function myIsNaN(value) {
    return value !== value;
  }
  ```

4. **isFinite()**： 
- 返回一个布尔值，表示某个值**是否为有穷值**
- 除了 **Infinity、-Infinity、NaN 和 undefined 会返回 false**（**null会返回true**），isFinite 对于其他的数值都会返回 true。
  ```
    isFinite(Infinity)       // false
    isFinite(-Infinity)      // false
    isFinite(NaN)            // false
    isFinite(undefined)      // false
    isFinite(null)           // true
    isFinite(-1)             // true
  ```

### 字符串
- 单引号字符串的内部，可以使用双引号。双引号类似。
- 由于 HTML 语言的属性值使用双引号，所以很多项目约定 JavaScript 语言的字符串只使用单引号。
- 如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。建议使用“ + ”运算进行拼接
  ```
    var a = 'key = "value"'
    console.log(a) // key = "value", 双引号解析成字符

    var longString = 'Long \
    long \
    long \
    string'
    console.log(longString)
    // "Long long long string"

    var longString = 'Long '
      + 'long '
      + 'long '
      + 'string'
    console.log(longString)
    // "Long long long string"
  ```
- 如果要输出多行字符串，有一种利用多行注释的变通方法。
  ```
    // 输出多行字符串，有一种利用多行注释的变通方法
    (function () { /*
    line 1
    line 2
    line 3
    */}).toString().split('\n').slice(1, -1).join('\n')

    // "line 1
    // line 2
    // line 3"
  ```
- 字符串可以被视为字符数组，但字符串内部的单个字符无法改变和增删。
- length属性返回字符串的长度，该属性也是无法改变的。**对于码点在 U+10000 到 U+10FFFF 之间的字符，JavaScript 总是认为它们是两个字符（length 属性为 2）**。也就是说，**JavaScript 返回的字符串长度可能是不正确的**。
  ```
    var s = 'hello';
    delete s[0];      // false
    s[1] = 'a';
    console.log(s)    // "hello"

    '𝌆'.length       // 2
  ```

- ### Base64 转码
- Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。作用是为了不出现特殊字符，简化程序的处理。
- JavaScript 原生提供两个 Base64 相关的方法，但是**node环境似乎没有这两个方法**。
  
  btoa()：任意值转为 Base64 编码。
  
  atob()：Base64 编码转为原来的值。
- **这两个方法不适合非 ASCII 码的字符**, ASCII 码的字符需要**转码**，才能使用这两个方法。
- 转码方法：
- **escape()**：采用 ISO Latin 字符集对指定的字符串进行编码。所有的空格符、标点符号、特殊字符以及其他 非ASCII 字符都会转化成 %xx 格式的字符编码（xx代表此字符在字符集表里编码的 16 进制数字，比如，空格符的对应编码是 %20），**不会对 ASCII 字符和数字进行编码**。不会被此方法编码的字符：@ * / +。反向编码函数：**unescape()**。
- **encodeURI()**：把URI字符串采用 UTF-8 编码格式转化成 escape 格式的字符串。不会被此方法编码的字符：! @ # $ & ( ) = ： / ; ? + '。反向编码函数：**decodeURI()**。
- **encodeURIComponent()**：把 URI 字符串采用URF-8编码格式转化成escape格式的字符串。与encodeURI相比，这个函数会将更多的字符进行编码，比如"/"等字符。所以如果字符串里面包含了URI的几个部分的话，不能用这个来进行编码，否则“/”字符被编码后将URL显示错误。不会被此方法编码的字符：! * ( )，反向编码函数：**decodeURIComponent()**。

  ```
    var string = 'Hello World!'
    btoa(string) // "SGVsbG8gV29ybGQh"
    atob('SGVsbG8gV29ybGQh') // "Hello World!"

    function b64Encode(str) {
      return btoa(encodeURIComponent(str))
    }

    function b64Decode(str) {
      return decodeURIComponent(atob(str))
    }

    b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
    b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
  ```

### 对象
- 对象的**所有键名都是字符串**（ES6 又引入了 Symbol 值也可以作为键名），**如果键名是数值，会被自动转为字符串**。但如果键名不符合标识名的条件（比如第一个字符为数字，或者含有空格或运算符），且也不是数字，则必须加上引号。
- 键值（属性）：可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。
  行首的 { foo: 'sdaf'} ，一律解释成代码块，而不是对象。
  ```
    var obj = {
      foo: 'Hello',
      'bar': 'World',
      1: 'a',
      .234: true,
      0xFF: true,
      100: true,

      p: 'Hello World',
      0.7: 'Hello World'
    }

    // 一律解释成代码块，而不是对象
    { foo: 'bar' }
  ```
- 属性的访问：点运算符、方括号运算符。
  ```
    obj.p     // "Hello World"
    obj['p']  // "Hello World"
    obj[0.7]  // 数字键可以不加引号，会自动转成字符串。
  ```
- 属性的赋值：**可以在任意时刻新增属性**
- 查看一个对象本身的所有属性：Object.keys( targetObj )
  ```
    Object.keys(obj)
    // ['p', '0.7']
  ```
- 属性的删除：**delete** 命令, **删除成功后返回 true**。

 **删除一个不存在的属性，delete 不报错，而且返回 true**。

 **delete 只能删除对象本身的属性，无法删除继承的属性，而且 delete 还是会返回 true**。
  ```
    // 删除属性
    delete obj.p     // true
    delete obj.none  // true
    obj.p            // undefined

    delete obj.toString   // true
    obj.toString          // function toString() { [native code] }
  ```
- 属性是否存在：**in** 运算符，返回 **hasOwnProperty** 方法：**判断是否为对象自身的属性**。
  ```
    'p' in obj          // true
    'toString' in obj   // true

    // hasOwnProperty方法
    if ('toString' in obj) {
      console.log(obj.hasOwnProperty('toString'))   // false
    }
  ```
- 属性的遍历：**for in** 循环，它遍历的是对象所有 **可遍历（enumerable）的属性**，会跳过不可遍历的属性。

  它不仅遍历对象自身的属性，还遍历继承的属性。**只想遍历对象自身的属性，可以结合 hasOwnProperty 方法**。
  ```
    for (var i in obj) {
      console.log('键名：', i)
      if(obj.hasOwnProperty(i)) {
        console.log('键值：', obj[i])
      }
    }
  ```
- with（**建议不要使用**）
  
  操作同一个对象的多个属性。如果 with 区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量。
  ```
  with(obj) {
    // 语句
  }
  ```

### 函数
- 声明方法：function 命令、函数表达式、Function 构造函数（**不要使用**）
- 函数的重复声明：如果同一个函数被多次声明，后面的声明就会覆盖前面的声明。 
  ```
    function print(s) {
      console.log(s)
    }
    var print = function(s) {
      console.log(s)
    }
    // 这个匿名函数又称函数表达式

    // Function构造函数接受传递任意数量的参数，除了最后一个参数是add函数的“函数体”，其他参数都是add函数的参数。如果只有一个参数，该参数就是函数体。
    var add = new Function(
      'x',
      'y',
      'return x + y'
    );

    // 等同于
    function add(x, y) {
      return x + y;
    }
  ```
- JavaScript 将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。**凡是可以使用值的地方，就能使用函数**。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。
  ```
    function add(x, y) {
      return x + y;
    }

    // 将函数赋值给一个变量
    var operator = add;

    // 将函数作为参数和返回值
    function a(op){
      return op;
    }
  ```
- 函数名的提升：JavaScript 引擎将函数名视同变量名，所以采用function命令声明函数时，**整个函数会像变量声明一样，被提升到代码头部，且在变量的前面**。
-  **如果同时采用function命令和赋值语句声明同一个函数**，那么function命令声明总是提升到赋值语句的前面，从而被覆盖，所以最后**总是采用赋值语句的定义**。
  ```
    // 正确
    f();
    function f() {}

    // 报错
    f();
    var f = function (){};
    // 等同于
    var f;
    f();
    f = function () {};
  ```
  ```
    // f 2 提升到这里
    console.log(f.toString())
    // function f () {
    //     return 2
    // }
    var f = function () {
        return 1
    }
    console.log(f.toString())
    // function f () {
    //     return 1
    // }
    
    f = 2  // 再次把 f 覆盖
    function f () {
        return 2
    }
    console.log(f.toString())
    // 2
  ```
- ### 函数的属性
- name：返回函数名
- 如果变量的值是一个具名函数，那么 name 属性返回 function 关键字之后的那个函数名。
  
  但是**这个名字只在函数体内部可用**，指代函数表达式本身。
  其作用是：一是可以在函数体内部调用自身，二是方便除错（除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数）。
```
  var f2 = function () {}
  f2.name // 'f2'

  var f3 = function myName() {}
  f3.name // 'myName'
```

- length：返回函数**预期传入的参数个数**，不是调用时传入的参数个数。

  length 属性提供了一种机制，判断定义时和调用时参数的差异，以便实现面向对象编程的“方法重载”。
  ```
    function f(a, b) {}
    f.length // 2
  ```

- toString()：返回一个字符串，内容是函数的源码，**内部的注释也可以返回**。
  
  对于那些原生的函数，toString()方法返回 function (){[native code]}。
  ```
    function f() {/*
      这是一个
      多行注释
    */}

    f.toString()
    // "function f(){/*
    //   这是一个
    //   多行注释
    // */}"
  ```
- ### 函数作用域
- 在 ES5 的规范中，JavaScript 只有两种作用域：一种是全局作用域，变量在整个程序中一直存在，所有地方都可以读取。

- 在函数内部定义的变量，外部无法读取，称为“局部变量”（local variable）。函数内部定义的变量，会在该作用域内覆盖同名全局变量。
- 函数内部声明变量的时候，**一定要使用var命令**，**否则声明了一个全局变量**。

- 函数作用域内部也会产生“变量提升”现象。**var 命令声明的变量，不管在什么位置，变量声明都会被提升到函数体的头部**。

- 函数本身也是一个值，也有自己的作用域。函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。
  **函数体内部声明的函数，作用域绑定函数体内部**。
  ```
    var x = function () { console.log(a) }
    function y(f) { var a = 2; f(); }
    y(x)
    // ReferenceError: a is not defined

    function foo() {
      var x = 1
      function bar() { console.log(x) }
      return bar
    }

    var x = 2
    var f = foo()
    f() // 1
  ```

- ### 函数的参数
- 函数参数不是必需的，JavaScript 允许省略参数。运行时无论提供多少个参数（或者不提供参数），JavaScript 都不会报错。
  但只能省略靠后的参数。
  ```
    function f(a, b) { return a }

    f(1, 2, 3) // 1
    f(1) // 1
    f() // undefined
    f( , 1) // SyntaxError: Unexpected token ,(…)
  ```
- 如果参数是原始类型的值（**数值、字符串、布尔值**），传递方式是传值传递（passes by value），传入的是原始值的拷贝，在函数体内修改参数，**不会影响原始值**。
- 如果函数参数是复合类型的值（**数组、对象、其他函数**），传递方式是传址传递（pass by reference），传入的是原始值的地址，在函数内部修改参数，将**会影响到原始值**。如果函数内部修改的，不是参数对象的某个属性，而是**替换掉整个参数，这时不会影响到原始值**。
  ```
    var obj = { p: 1 }
    function f1(o) {
      o.p = 2
    }
    f1(obj)
    obj.p   // 2

    function f2(o) {
      o = [2, 3, 4]
    }
    f2(obj)

    obj // { p: 1 }
  ```
- 如果有**同名的参数**，则取最后出现的那个值，即使**最后的参数没有值或被省略，也是以其为准**。
- arguments 对象（**不是数组**）：包含了函数运行时的所有参数，**只有在函数体内部才可以使用**。
  正常模式下，arguments对象可以在运行时修改。**严格模式下，arguments对象与函数参数不具有联动关系**，修改arguments对象不会影响到实际参数。
- arguments.length：返回函数调用时的参数个数。
- arguments.callee：返回所对应的原函数，可以用此来调用函数自身。这个属性在严格模式里面是禁用的，因此**不建议使用**。
  ```
    var f = function (a, b) {
      // 正常模式
      console.log(arguments[0], arguments[1], arguments[2])
      arguments[0] = 10, arguments[1] = 10
      console.log(a + b)

      console.log(arguments.length)
    }

    f(1, 2, 3) 
    // 1, 2, 3
    // 20
    // 3 
    var f = function (a, b) {
      'use strict';         // 开启严格模式
      arguments[0] = 10, arguments[1] = 10
      console.log(a + b)
    }

    f(1, 2, 3) 
    // 1, 2, 3
    // 3
  ```
- ### [闭包（closure）](https://mp.weixin.qq.com/s/LQrWcBZ8w7o6ShByf9D1zA)
- 闭包就是定义在一个函数内部的，且**可以在外部访问父函数内部变量**的函数。在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

- 它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。

- 三个条件：内部函数使用了外部函数的变量、外部函数已经退出、内部函数可以访问。

- 闭包只能取得包含函数中任何变量的最后一个值,闭包所保存的是整个变量对象，而不是某个特殊变量。

- ### 匿名函数
- 匿名函数的执行环境是全局性的，其 this 指向全局对象，但是可以使用call, apply, bind 改变其 this 指向。

  ```
    var name = 'window'
    var person = {
      name : 'Alan',
      sayOne: function () {
        console.log(this.name)
      },
      sayTwo:function () {
        return function () {
          console.log(this.name)
        }
      }
    }
    person.sayOne()     //Alan
    person.sayTwo()()   // window
  ```