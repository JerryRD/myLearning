# vscode

## code 基本命令

1. `code <uri>` : 打开文件

   若不提供 `<uri>`, 则新开一个编辑器窗口。可以同时使用下面的参数：
   - `-n | --new-window` : 强制在新窗口打开（与 -r 互斥）。
   - `-r | --reuse-window` : 强制在已有的窗口打开（与 -n 互斥）。
   - `-w | --wait` : 等待文件关闭后再返回。文件未关闭时无法继续使用命令。

   扩展命令：
   
   `code <-g | --goto> <fileUrl:line[:character]>` : 打开文件并转到指定的行(line)和字符列(character)

   ```
    code  ..\axios.js ..\noderead.js ..\test.htm  ..\draft\
    # 文件和文件夹路径可以并列

    code .
    # 打开当前文件夹

    code
    # 无任何参数，则新开一个编辑器窗口

    code -g ..\axios.js:20:10
    # 打开 axios.js, 光标移动到第 20 行第 10 个字符后
   ```

2. `code -d | --diff <fileUrl> <fileUrl>` : 比较两个文件差异
   若 `<file>` 参数多于两个，则会直接打开文件。

   ```
    code -d ./npm.md ./npx.md
    # 比较 npm.md 和 npx.md 的差异
   ```

3. `code <-a | --add> <folderUrl>` : 把文件夹添加到最近活跃的编辑器的目录（不是打开），对文件路径无效
   ```
    code -a ..\..\npm\
    # 左侧的目录会增加 npm 这个目录
   ```
   
4. 其他参数
- `--user-data-dir <dir>` : 指定保存用户数据的目录。可用于打开多个不同的代码实例。

- `-v | --version` : 查看版本和位数。

- `-h | --help` : 查看帮助。

- `--telemetry` : Shows all telemetry events which VS code collects.

- `--locale <locale>` : The locale to use (e.g. en-US or zh-TW).

5. 与扩展相关的参数

  `--extensions-dir <dir>` : 设置扩展的根路径。
  
  `--list-extensions` : 列出安装的扩展。
  - `--show-versions` : 显示扩展的版本，**与 --list-extension 同时使用才有效**。
  
  - `--category` : 按提供的类别筛选已安装的扩展, **与 --list-extension 同时使用才有效**。
    每个扩展的 package.json 中的 categories 会指定该扩展的category（类别），命令会根据这个来筛选。
    只有这几种值：[Languages, Snippets, Linters, Themes, Debuggers, Other]。

  ```
    code --list-extensions --show-versions --category=Themes
    # 显示类别为 Themes 的扩展及其版本号
  ```

  `--install-extension [--force] <extension-id | path-to-vsix>` : 安装扩展，`--force` 参数可以忽略提示。
  - **extension-id** : **在线安装**，提供扩展的id值。**扩展的 id 格式为 `${publisher}.${name}`**，在扩展商店中扩展名称后面显示。

  - **path-to-vsix** : **本地安装**，提供本地的 .vsix 文件路径。

  ```
    code --install-extension  D:\Download\msjsdiag.debugger-for-chrome-4.12.0.vsix

    code --install-extension msjsdiag.debugger-for-chrome 
  ```

  `--uninstall-extension <extension-id>` : 卸载扩展，需要扩展 id。

  `--enable-proposed-api <extension-id>` : 使扩展的 api 生效，支持多个扩展 id 参数， 较少使用。

6. 与检查故障相关的参数

  --verbose                          Print verbose output (implies --wait).
  --log <level>                      Log level to use. Default is 'info'.
                                     Allowed values are 'critical', 'error',
                                     'warn', 'info', 'debug', 'trace', 'off'.
  -s --status                        Print process usage and diagnostics
                                     information.
  --prof-startup                     Run CPU profiler during startup
  --disable-extensions               Disable all installed extensions.
  --disable-extension <extension-id> Disable an extension.
  --inspect-extensions <port>        Allow debugging and profiling of
                                     extensions. Check the developer tools for
                                     the connection URI.
  --inspect-brk-extensions <port>    Allow debugging and profiling of
                                     extensions with the extension host being
                                     paused after start. Check the developer
                                     tools for the connection URI.
  --disable-gpu                      Disable GPU hardware acceleration.
  --max-memory                       Max memory size for a window (in Mbytes).