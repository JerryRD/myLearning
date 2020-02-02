# npm
npm 是 Node 包管理器的命令行工具，可以通过它来查找、安装、删除、发布模块。

## 使用
### 什么是package
  A package is:
  - (a) a folder containing a program described by a **package.json** file
  - (b) a **gzipped tarball containing (a)**
  - (c) a **url that resolves to (b)**
  - (d) a **<name>@<version> that is published on the registry** (see npm-registry) with (c)
  - (e) a <name>@<tag> (see npm-dist-tag) that points to (d)
  - (f) a **<name> that has a "latest" tag** satisfying (e)
  - (g) a **<git remote url> that resolves to (a)**

package（包）
主要有两个重要的属性：
1. `Scope（作用域，范围）`

  一旦注册个人或者团体账户，就获得了与个人或者团体名相匹配的 scope，可以用这个 scope 作为包的命名空间，例如 @yuyy、@58。
  作用：为你自己发布的包提供命名空间，防止与他人的包名冲突。

  分类：
  - unscoped：如 babel
  - scoped：
    - user： 如 @yuyy/babel
    - org：  如 @babel/parser

2. `Accessibility（可访问性）`

  属性值有：
  private：私有，仅作者本人或团队成员可见；
  public：公有，所有人可见

3. 两个属性关系：
![](https://segmentfault.com/img/bVblqar?w=897&h=236)

### package安装: npm install | i | add

  1. **常规安装**
  
  - npm install (`with no args, in package dir`) ：
  默认情况下, npm install 会安装 package.json 所有的包依赖。但是
  ```
    npm 
  ```

  - npm install [`<@scope>/`]<pkg>[`@<tag>` | @<`version` | `version range`>] :

    - `不带 @<tag> 或 @<version>`：默认为 `@latest`，安装最新版本；
    ```
      npm install webapck
    ```

    - `@<tag>` : 根据发布的 tag 来指定版本。tag 由作者在发布时（--tag 参数）或者发布后（npm dist-tag add）添加。
      **使用不存在的 tag 会报错**。
      tag 查看：npm info <pkg> 或 npm dist-tag ls <pkg>
    ```
      npm install vue@beta
    ```

    - `@<version | version range>` : 指定安装版本或版本范围。
    ```
      npm install @myorg/privatepackage@0.2.0
      npm install sax@">=0.1.0 <0.2.0"
    ```

  - 相关参数
    1. 四个互斥参数
    - `-P`, --save, --save-prod : 默认参数，安装的包会出现在 package.json 的 `dependencies` 中。

    - `-D`, --save-dev : 安装的包会出现在 package.json 的 `devDependencies` 中。

    - `-O`, --save-optional : 安装的包会出现在 package.json 的 `optionalDependencies` 中。

    - `--no-save` : 安装的包`不保存`到 package.json 的 dependencies 中。

    2. 两个可与上述参数同时使用的参数
    - `-E`, --save-exact: 安装的包对应的版本为确定的版本，而非一个版本范围。

    - `-B`, --save-bundle: 安装的包会出现在 package.json 的 `bundleDependencies`。 
    
    3. 几种依赖包的区别
    - `dependencies` : **生产环境**的依赖包（应用依赖，或者叫做业务依赖，**最常用**）。
      这些依赖是应用发布后正常执行时所需要的，**当其他人安装你的包时，这种依赖包也会同时被安装**。因此**测试时或本地打包时所使用的包不应该放到这里**。

    - `devDependencies` : **开发环境**的依赖包，如单元测试、打包工具（gulp, grunt, webpack, moca, coffee 等）。
      **当其他人安装你的包时，这种依赖包不会安装**。因此**不能把生产环境的依赖包放到这里**。

    - `optionalDependencies` : 

    - `bundledDependencies` / `bundleDependencies` : 


    - peerDepe`ndencies : 

  2. **非常规安装**

  - npm install `<folder>` : 
  从文件夹（路径）安装，文件夹必须包含 package.json， package.json 必须包含 name 和 version
  ```
    npm install E:\Temporary\TemporaryProject\test-publish
  ```

  - npm install `<tarball file | tarball url>` : 
  从压缩文件安装，文件扩展名必须为 `.tar`、`.tar.gz` 或者 `.tgz`，其余同2.

  从在线压缩文件安装，仅支持 `http` 和 `https` 协议。
  ```
    npm install E:/Temporary/Temporax`ryProject/reduxexample/node_modules/util.tar

    npm install https://github.com/indexzero/forever/tarball/v0.5.6
  ```

  从github安装
  npm install <git:// url>

  npm install <github username>/<github project>

### package.json
                                                                                                         