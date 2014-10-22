1. 方案一：
    
    1. UI-Router
    
    2.1. 嵌套 Controller($emit、$on) + 粗粒度directive
    
    2.2. 嵌套Controller + 细粒度directive

2. 方案二：

    1. ngRoute（第一层） 
    
    2. ngSwitch（交易步骤） + ngInclude（交易步骤） 

    3.1. 嵌套Controller($emit、$on) | 粗粒度directive

    4.1. | (嵌套Controller + 细粒度directive)

通信机制：
directive -- @&=
Template + Controller -- $emit+$on

directive：
粗粒度 -- 一个directive对应一个步骤
细粒度 -- 一个directive对应一个局部控件（金额输入框）