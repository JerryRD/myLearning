# nvm
### nvm 是 node 版本管理工具，使用 nvm 能够在同一台机器上安装和切换不同版本的node

## 基本命令解析
nvm **arch**                     : Show if node is running in 32 or 64 bit mode.

nvm **install** <version> [arch] : The version can be a node.js version or "latest" for the latest stable version.
                                   Optionally specify whether to install the 32 or 64 bit version (defaults to system arch).
                                   Set [arch] to "all" to install 32 AND 64 bit versions.
                                   Add --insecure to the end of this command to bypass SSL validation of the remote download server.

nvm **list | ls** [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.

nvm **on**                       : Enable node.js version management.

nvm **off**                      : Disable node.js version management.

nvm **proxy** [url]              : Set a proxy to use for downloads. Leave [url] blank to see the current proxy.
                                   Set [url] to "none" to remove the proxy.

nvm **node_mirror** [url]        : Set the node mirror. Defaults to https://nodejs.org/dist/. Leave [url] blank to use default url.

nvm **npm_mirror** [url]         : Set the npm mirror. Defaults to https://github.com/npm/cli/archive/. Leave [url] blank to default url.

nvm **uninstall** <version>      : The version must be a specific version.

nvm **use** [version] [arch]     : Switch to use the specified version. Optionally specify 32/64bit architecture.
                                   nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.

nvm **root** [path]              : Set the directory where nvm should store different versions of node.js.
                                   If <path> is not set, the current root will be displayed.

nvm **version**                  : Displays the current running version of nvm for Windows. Aliased as v.

## 用法
## nvm
### 查看信息
```
# 查看nvm的版本
    nvm version
    nvm v
    # 1.1.6

# 查看电脑系统和当前 nodejs 的位数
    nvm arch
    # System Default: 64-bit.
    # Currently Configured: 64-bit. 

# 查看 nvm 安装路径, node 也安装到此路径下
    nvm root

# 查看帮助
    nvm -h
```    

### 设置代理(具体用法不详)
```
# 查看当前代理
    nvm proxy

# 设置代理
    nvm proxy your_url
```

## node
### node 控制
```
# 打开 node.js 版本控制
    nvm on

# 关闭 node.js 版本控制，不卸载任何版本                      
    nvm off
```

### 安装
```
nvm install <version> [arch]

# 安装稳定版本： 
    nvm install stable

# 安装指定版本： 
    nvm install 8.9.4 64-bit
    nvm install 8.11.3 64-bit
```

### 管理安装源
```-
# 设置 node.js 和 npm 的安装源, 相当于设置 settings.txt 中的 node_mirror 和 npm_mirror 
# 路径最后要有‘/’, 若留空，则使用默认路径，而不是查看当前的路径
# 默认: 
    node: https://nodejs.org/dist/, 
    npm: https://github.com/npm/npm/archive/
# 淘宝镜像：
    node: https://npm.taobao.org/mirrors/node/ , 
    npm: https://npm.taobao.org/mirrors/npm/

    nvm node_mirror your_url
    nvm npm_mirror your_url   
```

### 使用指定版本
```
# nvm use [version] [arch]
    nvm use 8.9.4
    nvm use 8.11.3
```

### 查看 node 版本
``` 
# 查看已经安装的版本
    nvm ls
    nvm list
    nvm list installed

# 查看当前使用版本
    node -v

# 查看可安装的版本
    nvm list available
``` 

### 卸载
```
nvm uninstall <version> 
```

