## git 命令积累

1. **git describe**

    ```
        git describe <ref>
    ```

    ref 可以是任何能被 git 识别成提交记录的引用。如果没有指定的话，Git 会使用HEAD。

    由于标签在代码库中起着“锚点”的作用，git describe **用来描述离你最近的锚点**（也就是标签）

    git describe 能帮你在提交历史中移动了多次以后找到方向；当你用 git bisect（一个查找产生 Bug 的提交记录的指令）找到某个提交记录时，或者是当你坐在你那刚刚度假回来的同事的电脑前时， 可能会用到这个命令。

    它输出的结果是这样的：
    ```
        <tag>_<numCommits>_g<hash>

        tag 表示的是离 ref 最近的标签， numCommits 是表示这个 ref 与 tag 相差有多少个提交记录， hash 表示的是你所给定的 ref 所表示的提交记录哈希值的前几位。
        当 ref 提交记录上有某个标签时，则只输出标签名称。
    ```

2. **git cherry-pick**

    **本质上是 commit 的合并**。git merge 合并的是分支，git cherry-pick 是选择特定的 commit 与当前 head 指向的 commit 合并。
    
    **但是无法合并新增的文件。**
    
    ```
        git cherry-pick <commit_1> <commit_2> <commit_3> ...
    ```

3. **git branch**
    - **-f**
        ```
            git branch -f <branch_name> <last_commit_target>
        ```
        last_commit_target 可以是任何能被 git 识别成提交记录的引用。

        作用：强制重置分支，可以比 git reset 更加灵活指定分支的走向，但不能对 head 所在的分支(即当前分支)进行操作

    - **-m** : 重命名分支
        ```
            git branch (-m | -M) [<old-branch>] <new-branch>
        ```
        -M : 若 new-branch 已存在，则覆盖

    - **-c** : 复制分支
        ```
           git branch (-c | -C) [<old-branch>] <new-branch>
        ```
        -C : 若 new-branch 已存在，则覆盖

4. git push/fetch/pull remoteRes **source:target**

    source 、target 可以是任何能被 git 识别成提交记录的引用。

    ```
        git push origin master^^:foo  // 向指定的分支推送指定的 last_commit，若 foo 不存在，则会创建该远程分支
        git push origin :foo          // 删除远程分支
        git push                      // 将 head 所在的分支推送到 origin（默认的远程仓库），分离头指针时不可用

        git fetch/pull origin master^^:foo  // 拉取指定的 last_commit 到指定的分支
        git fetch/pull origin :foo          // 若 foo 不存在，将创建本地分支
        git fetch/pull                      // 拉取 origin 的当前分支
    ```

5. **git checkout**
    - **--orphan new_branch_name**

        **基于当前分支创建一个新的“孤儿(orphan)”的分支，没有任何提交历史，但包含当前分支所有内容**。

        执行上述命令后，工作区（Workspace）中所有文件均被认为在该操作中新增(git statue 查看状态，所有文件状态均为 new file）

    - **-** : 切换至上一次的分支
        
6. **git reflog**

    查看所有分支的所有操作记录，包括已经被删除的 commit 的 hash。

    可以根据已删除的 commit 的 hash，**结合 git reset --hard  deleted_hash 或 git branch -f 对误删的 commit 进行恢复**

7. **git merge --no-ff**

    --no-ff(no fast foward)：每一次的合并，都会创建一个新的 commit 记录。
    **使用 --no-ff，可以保持原有分支提交链的完整性，并且当该分支被删除时，提交信息依旧存在**。

    git merge 默认使用 fast-forward，可以通过如下方式，修改为默认使用 --no-ff
    ```
        git config --global merge.commit no
        git config --global merge.ff no
    ```
