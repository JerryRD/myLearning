# nrm
### nrm(npm registry manager)是 npm 的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换。
## 基本命令解析
**Options:**

  -V, --version :                           output the version number

  -h, --help :                              output usage information

**Commands:**

  ls :                                      List all the registries

  current :                                 Show current registry name

  use <registry> :                          Change registry to registry

  add <registry> <url> [home] :             Add one custom registry

  set-auth [options] <registry> [value] :   Set authorize information for a custom registry with a base64 encoded string or username and pasword

  set-email <registry> <value> :            Set email for a custom registry

  set-hosted-repo <registry> <value> :      Set hosted npm repository for a custom registry to publish packages

  del <registry> :                          Delete one custom registry

  home <registry> [browser] :               Open the homepage of registry with optional browser

  publish [options] [<tarball>|<folder>] :  Publish package to current registry if current registry is a custom registry.
                                            If you're not using custom registry, this command will run npm publish directly

  test [registry] :                         Show response time for specific or all registries

  help :                                    Print this help


## 用法
### 查看信息
```
# 查看 nrm 版本
    nrm -V || --version

# 查看 nrm 帮助
    nrm -h || --help || help

# 查看可用的源，带*的是当前使用的源
    nrm ls

    *npm ---- https://registry.npmjs.org/
    cnpm --- http://r.cnpmjs.org/
    taobao - http://registry.npm.taobao.org/
    eu ----- http://registry.npmjs.eu/
    au ----- http://registry.npmjs.org.au/
    sl ----- http://npm.strongloop.com/
    nj ----- https://registry.nodejitsu.com/

# 查看当前使用源的名称
    nrm current

    taobao
```
### 使用
```
# 切换源
    nrm use <registry>

# 增加定制的源，特别适用于添加企业内部的私有源
    nrm add <registry> <url> [home]

# 删除源
    nrm del <registry>

# 测试源速度
    nrm test [registry]
    
    npm ---- 958ms
    yarn --- 1623ms
    cnpm --- 1089ms
    * taobao - 772ms
    nj ----- Fetch Error
    npmMirror  2363ms
    edunpm - Fetch Error
```