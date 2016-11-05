layout: post
title: "Knockout Tutorial"
category : JavaScript
---

## Tools

- [官方网站](http://www.knockoutjs.com)
- [Chrome插件](https://chrome.google.com/webstore/detail/knockoutjs-context-debugg/oddcpmchholgcjgjdnfjmildmlielhof/related?hl=en)

## Tutorial

- [knockthrough](https://github.com/JonKragh/knockthrough) A simple debugging tool to visualize knockoutjs issues.
 
## Debug

调试技巧：

在pre中显示绑定数据（KO 2.1以上版本）：

    <pre data-bind="text: ko.toJSON($data, null, 2)"></pre>

调出Chrome调试器：

    <pre data-bind="text: ko.computed(function() { debugger; })"></pre>

自定义绑定：

```js
ko.bindingHandlers.debug = 
{
    init: function(element, valueAccessor) 
    {
        console.log( 'Knockoutbinding:' );
        console.log( element );
        console.log( valueAccessor() );
    }
};
<ul data-bind="debug: $data">
```
 
See [Any good techniques to debug template binding faults for knockout.js?
Knockout.js Troubleshooting Strategies](http://stackoverflow.com/questions/9261296/any-good-techniques-to-debug-template-binding-faults-for-knockout-js)
