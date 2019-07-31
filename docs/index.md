# Qunity Core
Qunity是一个E/C(Entity/Component)架构的实现，如果你会Unity开发，那应该对此很熟悉，Unity就是实现了E/C架构的最典型的例子。  
Qunity与传统E/C架构的不同之处在于：Qunity的Entity子底层实现了Tree的概念，让Entity以树的形式存在，这样更有利于映射到现实世界中的场景。  
Entity本身不包含有逻辑和状态，只是一个标识或者称之为节点，节点上能挂载n个Component，Component则包含了一定的逻辑和状态，并通过生命周期的形式来驱动。  
这样，便形成了一棵有逻辑处理能力的Entity树：  
