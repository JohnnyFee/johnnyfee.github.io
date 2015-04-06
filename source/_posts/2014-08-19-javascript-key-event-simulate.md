layout: post
title: "Simulate JavaScript Key Events"
category : JavaScript
tags : [javascript, event]
---

## Question

What I want is to simulate typing in `<input>` field using javascript.

I have the following code:

```
var press = jQuery.Event("keydown");
press.ctrlKey = false;
press.which = 65;
$("#test").trigger(press);
```

<!-- more -->

But when I load the page, the `#test` input field has no typed characters,  the keycode of '65' represents 'A', but there is no 'A' input.

## Answer By [Brock Adams](http://stackoverflow.com/users/331508/brock-adams)

You can send key events, and anything listening for them will get them, **but they will not change the input**, so you will not see the letter `A` appear, for example.  This is mostly a security thing; see ["Manually firing events"](http://www.howtocreate.co.uk/tutorials/javascript/domevents#domevld1) for a discussion about that.

Actually, There is __no way__ to programmatically trigger input keys in the sandboxed browser environment under normal circumstances.

So, if you want the letter to appear, you must __alter the input's value__ as you send the key event.  There is a jQuery plugin for that, see ["The `$.fn.sendkeys` Plugin"](http://bililite.com/blog/2011/01/23/improved-sendkeys/).

You can see how an `<input>` reacts with user-applied keys, key events, and that plugin at [**this jsFiddle**](http://jsfiddle.net/DxER9/).

<iframe width="100%" height="300" src="http://jsfiddle.net/DxER9/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

That plugin should be sufficient if you are just trying to "simulate typing on an `<input>`".  However, depending on what you are _really_ trying to do, you may need to do one or more of the following:

1.  Just set the text to what you want it to be.
2.  Send a `keydown` event, if the page's javascript triggers off of that.
3.  Likewise, send a `change` event, etc., if the page's javascript triggers off of that.
4.  Just find and call the page's javascript directly.  Use _script injection_, the _location hack_, `unsafeWindow`, and/or `@grant none` mode to do that.

See [javascript - How to simulate typing in input field using jQuery?](http://stackoverflow.com/questions/13944835/how-to-simulate-typing-in-input-field-using-jquery)

## Trigger KeyboardEvent

### With jQuery

You can trigger keyevent with jQuery like in the example above:

```js
$("#eventTarg").trigger ( {
    type: 'keypress', keyCode: keyVal, which: keyVal, charCode: keyVal
} );
```

jQuery's event handling system is a layer on top of native browser events. When an event handler is added using `.on( "click", function() {...} )`, it can be triggered using jQuery's `.trigger( "click" )` because jQuery stores a reference to that handler when it is originally added. Additionally, it will trigger the JavaScript inside the `onclick` attribute. The `.trigger()` function cannot be used to mimic native browser events, such as clicking on a file input box or an anchor tag. This is because, there is no event handler attached using jQuery's event system that corresponds to these events.

In order to trigger a native browser event, you have to use [document.createEventObject](http://msdn.microsoft.com/en-us/library/ie/ms536390%28v=vs.85%29.aspx) for < IE9 and  [document.createEvent](https://developer.mozilla.org/en/DOM/document.createEvent) for all other browsers.
Using these two APIs, you can programmatically create an event that behaves exactly as if someone has actually clicked on a file input box. The default action will happen, and the browse file dialog will display.

The jQuery UI Team created [jquery.simulate.js](https://github.com/eduardolundgren/jquery-simulate/blob/master/jquery.simulate.js) in order to simplify triggering a native browser event for use in their automated testing. Its usage is modeled after jQuery's trigger.

    // Triggering a native browser event using the simulate plugin
    $( "a" ).simulate( "click" );

This will not only trigger the jQuery event handlers, but also follow the link and change the current page.

See [Triggering Event Handlers](http://learn.jquery.com/events/triggering-event-handlers/).

### With `document.createEvent`

Also you can trigger native event with no jQuery:

```js
var keyboardEvent = document.createEvent("KeyboardEvent");
var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

keyboardEvent[initMethod](
                   "keydown", // event type : keydown, keyup, keypress
                    true, // bubbles
                    true, // cancelable
                    window, // viewArg: should be window
                    false, // ctrlKeyArg
                    false, // altKeyArg
                    false, // shiftKeyArg
                    false, // metaKeyArg
                    40, // keyCodeArg : unsigned long the virtual key code, else 0
                    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
);
document.dispatchEvent(keyboardEvent);
```

See Also:

- [Simulate JavaScript Key Events - Stack Overflow](http://stackoverflow.com/questions/596481/simulate-javascript-key-events)
- [keydown - Event reference](https://developer.mozilla.org/en-US/docs/Web/Events/keydown)
- [KeyboardEvent - DOM](https://developer.mozilla.org/zh-CN/docs/DOM/KeyboardEvent)

Even though, the `KeyboardEvent` cann't change the `<input>` value, but the `MouseEvent`  can do that:

<iframe width="100%" height="300" src="http://jsfiddle.net/feiqiang/9o9c0ccx/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

See [document.createEvent - Web API Interfaces](https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent)

## 在 `iframe` 中的应用

因为在 `iframe` 中可以通过以下方法获取 `iframe` 内部的元素，所以本质上和非 `iframe` 的情况没什么区别：

    var iframe = document.getElementById('iframeId');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

或者 jQuery 版本：

    $("#iFrame").contents().find("#someDiv").removeClass("hidden");

Once you get the inner doc, you can just access its internals the same way as you would access any element on your current page. (`innerDoc.getElementById`...etc.)

**IMPORTANT:** Make sure that the iframe is on the same domain, otherwise you can't get access to its internals. That would be cross-site scripting.

See [Javascript - Get element from within an iFrame - Stack Overflow](http://stackoverflow.com/questions/1088544/javascript-get-element-from-within-an-iframe)

另外，还需要注意的是，操作 iframe 中的 DOM 时，需要等到 iframe 中的 DOM 加载完成：

    $('#iframe').on("load", function() {
        alert(1);
    }

See [jQuery/JavaScript: accessing contents of an iframe - Stack Overflow](http://stackoverflow.com/questions/364952/jquery-javascript-accessing-contents-of-an-iframe)

See [the example online](http://inching.org/examples/keyboard-event-simulate/index.html)

## 虚拟键盘

以上例子都需要获取接受输入的文本框。假如我们要实现软键盘的功能，对最后获取到焦点的文本框输入内容。大概的思路为监听所有文本框的 `focus` 事件，在相应函数中将该文本框对象保存到全局变量中，当按下虚拟键盘的时候，更改当前文本框的内容。

See [the example on line](/examples/vertual-keyboard/virtual-keyboard.html)

这个例子中只实现了普通按键，对于特殊按键请参考以下开源代码：

- [sdeering/onscreenkeyboard](https://github.com/sdeering/onscreenkeyboard)
- [jQuery On-Screen Keyboard Demo](http://www.jquery4u.com/demos/onscreenkeyboard/)