# Qunity Core
![Logo](https://rockyf.github.io/qunity-core/assets/Logo.png)  
QunityCore是E/C(实体/组件)架构的实现，如果你会Unity开发，那应该对此很熟悉，Unity就是实现了E/C架构的最典型的例子。  
## QunityCore
与传统E/C架构的不同之处在于：QunityCore的实体在底层实现了Tree的概念，让实体以树的形式存在，这样更有利于映射到现实世界中的场景。  
实体本身不包含有逻辑和状态，只是一个标识或者称之为节点，节点上能挂载n个组件，组件则包含了一定的逻辑和状态，并通过生命周期的形式来驱动。  
这样，便形成了一棵有逻辑处理能力的实体树：  
![EntityTree](https://rockyf.github.io/qunity-core/assets/EntityTree.png)
## QunityCore的优势
QunityCore所实现的E/C架构，能让逻辑解耦成各种单独模块，模块与模块可以自由组合，产生各种逻辑组合效果。  
例如：组件A让实体向前运动，组件B让实体跳动，这两个组件组合可以产生四种效果：
1. 不加载任何组件，则实体静止
2. 只挂载组件A，则实体匀速移动
3. 只挂载组件B，则实体跳动
4. 挂载组件A和组件B，则实体会向前跳动

## QunityCore能干什么？
QunityCore只是一次架构的实现，所以适用于所有的应用场景(APP，游戏前端，服务器…)，但是QunityCore的设计初衷是为了游戏前端的开发。  
[QunityEngine](https://rockyf.github.io/qunity-engine/)就是使用QunityCore来实现了组件化开发的游戏引擎。
## 组件生命周期
![ComponentLifecycle](https://rockyf.github.io/qunity-core/assets/component-lifecycle.png)