# npx
- [**npx介绍1**](https://www.jianshu.com/p/a4d2d14f4c0e) 
- [**npx介绍2**](https://blog.csdn.net/zhulin2609/article/details/80388156#%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%90%8C%E7%9A%84node%E7%89%88%E6%9C%AC%E8%BF%90%E8%A1%8C%E5%91%BD%E4%BB%A4)
- [**npx使用**](http://www.ruanyifeng.com/blog/2019/02/npx.html)

## 基本命令
从 npm 的可执行包执行命令

  npx [选项] <命令>[@版本] [命令的参数]

  npx [选项] [-p|--package <包>] <命令> [命令的参数]

  npx [选项] -c '<命令的字符串>'

  npx --shell-auto-fallback [命令行解释器]

  常用选项:

  **--package, -p** :          包安装的路径                                   [字符串]

  **--cache** :                npm 缓存路径                                   [字符串]

  **--always-spawn** :         总是派生一个子进程来执行命令                     [布尔]

  **--no-install** :           如果有包缺失，跳过安装                           [布尔]

  **--ignore-existing** :      忽略 $PATH 或工程里已有的可执行文件，
                               这会强制使 npx 临时安装一次，并且使用其最新的版本  [布尔]

  **--userconfig** :           当前用户的 npmrc 路径                           [字符串]

  **--call, -c** :             像执行 npm run-script 一样执行一个字符串         [字符串]

  **--shell, -s** :            执行命令用到的解释器，可选                       [字符串] [默认值: false]

  **--shell-auto-fallback** :  产生“找不到命令”的错误码                         [字符串] [可选值: "", "bash", "fish", "zsh"]

  **--quiet, -q** :            隐藏 npx 的输出，子命令不会受到影响               [布尔]

  **--npm** :                  为了执行内部操作的 npm 可执行文件                 [字符串] [默认值: 
                                                                                "D:\Development\nvm\v10.16.3\node_modules\npm\bin\npm-cli.js"]
     
  **--node-arg, -n** :         调用 node 二进制时使用额外的 node 参数。          [字符串]

  **--version, -v** :          显示版本号                                       [布尔]

  **--help, -h** :             显示帮助信息                                     [布尔]

  [所有选项](https://www.npmjs.com/package/npx#for-bash)

## 用法
### 调用项目安装的模块，而不需要配置 npm run-script
npx 的原理很简单，就是运行的时候，会到 node_modules/.bin 路径和环境变量 $PATH 里面，检查命令是否存在，**所以系统命令也可以调用**。

**任何 command 都可以通过 npx在 machine 任何位置使用**
```
  $ npm install -D mocha
  $ npx mocha --version

  $ npx ls
  # 等同于 ls
```

### 执行一次性命令，避免全局安装模块
  - 下面代码运行时，npx 将create-react-app下载到一个临时目录，使用以后再删除.以后再次执行该命令，会重新下载create-react-app。

    **若 npx 后面的模块无法在本地发现，就会下载同名模块**。安装的包不会出现在你的全局安装中，所以不用担心长期使用所带来的全局污染。
  ```
    $ npx create-react-app my-cool-new-app  

    # 可以指定包的版本
    $ npx uglify-js@3.1.0 main.js -o ./dist/main.js
  ```

  - --no-install 参数和--ignore-existing 参数

    `--no-install 参数` : 让 npx **强制使用本地模块**，不下载远程模块。如果本地不存在该模块，就会报错。

    `--ignore-existing 参数` ：**忽略本地的同名模块**，强制安装使用远程模块。

  ```
    $ npx --ignore-existing create-react-app my-react-app
  ```

### 使用不同版本的 node
  - 利用 npx 可以下载模块这个特点，可以指定某个版本的 Node 运行脚本。
    某些场景下，这个方法用来切换 Node 版本，要比 nvm 那样的版本管理器方便一些。
  
    下面命令会使用 0.12.8 版本的 Node 执行脚本，原理是从 npm 下载这个版本的 node，使用后再删掉。
  ```
    $ npx node@0.12.8 -v
    v0.12.8
  ```

  - `-p 参数` : 指定 npx 所要安装的模块, 对于需要安装多个模块的场景很有用。
  ```
    $ npx -p lolcatjs -p cowsay [command]

    $ npx -p node@0.12.8 node -v
    v0.12.8
  ```

  - `-c 参数` : 
    如果 npx 安装多个模块，默认情况下，所执行的命令之中，只有第一个可执行项会使用 npx 安装的模块，后面的可执行项还是会交给 Shell 解释。
    **-c 参数可以将所有命令都用 npx 解释**。

    ```
    $ npx -p lolcatjs -p cowsay 'cowsay hello | lolcatjs'
    # 报错，第一项 cowsay 由 npx 解释，而第二项命令 localcatjs  由 Shell 解释，但是 lolcatjs 并没有全局安装。

    $ npx -p lolcatjs -p cowsay -c 'cowsay hello | lolcatjs'
    # 正常执行
    ```

    -c 参数的另一个作用是: 将环境变量带入所要执行的命令。
    举例来说，npm 提供当前项目的一些环境变量，-c 参数可以把这些 npm 的环境变量带入 npx 命令。
    ```
      $ npm run env | grep npm_

      $ npx -c 'echo "$npm_package_name"'
    ```

### 执行 GitHub 源码
  - **远程代码必须是一个模块，即必须包含package.json和入口脚本。**
  ```
  # 执行 Gist 代码
  $ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

  # 执行仓库代码
  $ npx github:piuccio/cowsay hello
  ``` 