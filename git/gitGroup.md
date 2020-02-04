## 团队工作流

1. 主干开发

    适用于：
    - 团队系统设计和开发能力强，有有效的特性切换机制，需要快速迭代。
    - 组件开发的团队。成员能力强，人员少，沟通顺畅，用户升级组件成本低。

2. Git Flow
    
    适用于：不具备主干开发。有预定的发布周期，需要执行严格的发布流程。
    
3. Github Flow
    
    适用于：不具备主干开发。随时集成随时发布，分支集成时经过代码评审和自动化测试，可以立即发布。

4. Gitlab Flow

    适用于：无法控制发布时间，或有多个发布版本（新旧版本共存），但是需要持续集成。**相比于Github Flow，多了 production/pre-production分支（发布/环境分支），用于发布。**

## 分支集成策略

  merge : 常规 merge

  squash & merge : 将 feature 分支的 commit 合并（squash）为一个，并 merge 到主分支，feature 分支不变

  rebase & merge : 同 rebase

## 