layout: post
title: "JS 文档生成工具——JsDuck"
category : JavaScript
tags : [js, doc]
---

和其他 JavaScript 文档生成工具的比较请参考 [Javascript 异步加载](/2014/05/26/javascript-async-load/)。

## Installation

## Usage

JsDuck 使用 [Markdown](/tags/markdown) 语法来编写文档，如：

    /**
     * Returns description of the time of the day.
     *
     * Different heuristics are used to come up with the **most** appropriate
     * wording for the current user.
     *
     * @return {String} Possible return values are:
     *
     * - midday
     * - late night
     * - early morning
     * - just before lunch
     * - tea time
     */
    getDayTime: function() {

你也可以是在文档中使用 HTML 标签，因为 Markdown 本身也支持内置 HTML 标签。

## Classes

JsDuck 将自动识别 ExtJS 4 的 class 定义：

    /**
     * A duck, not just a stupid bird.
     */
    Ext.define("Duck", {
        extend: "Bird",
        mixins: {
            observe: 'Ext.util.Observable',
            fly: 'Fliable'
        },
        singleton: true,

如果使用其他定义 class 的方法，可以显示地使用 [@extends](https://github.com/senchalabs/jsduck/wiki/@extends), [@mixins](https://github.com/senchalabs/jsduck/wiki/@mixins) and [@singleton](https://github.com/senchalabs/jsduck/wiki/@singleton)。如：

    /**
     * @class Duck
     * A duck, not just a stupid bird.
     * @extends Bird
     * @mixins Ext.util.Observable
     * @mixins Fliable
     * @singleton
     */
    var x = {};

## Members

All doc-comments following a class doc-comment will be assumed to be members of that class. There are six types of members: [configs](https://github.com/senchalabs/jsduck/wiki/@cfg), [properties](https://github.com/senchalabs/jsduck/wiki/@property), [methods](https://github.com/senchalabs/jsduck/wiki/@method), [events](https://github.com/senchalabs/jsduck/wiki/@event), [SCSS variables](https://github.com/senchalabs/jsduck/wiki/@var), [SCSS mixins](https://github.com/senchalabs/jsduck/wiki/@scss-mixin).

Only methods and configs inside `config: {...}` are auto-detected. Everything not looking like a method will be assumed to be a property. So be sure to always use [@event](https://github.com/senchalabs/jsduck/wiki/@event) and [@cfg](https://github.com/senchalabs/jsduck/wiki/@cfg) for documenting events.

## Methods

Here's an example of typical method documentation with [@param](https://github.com/senchalabs/jsduck/wiki/@param) and [@return](https://github.com/senchalabs/jsduck/wiki/@return) tags:

    /**
     * Returns a unique ID for use in HTML id attribute.
     * @param {String/Number} nr A name or number of the ID.
     * @param {String} [prefix="id-"] The prefix for the ID.
     * @return {String} the new ID
     */
    createId: function(nr, prefix){
    },

JSDuck will also auto-detect all the methods without a doc-comment inside `Ext.define()` as private methods:

    /** */
    Ext.define("MyClass", {
        privateMethod: function() {
        },
    
        statics: {
            staticPrivateMethod: function() {
            }
        }
    });

Constructors are documented just like normal methods:

    /**
     * Creates new Duck from proper duck egg.
     * @param {DuckEgg} egg  Egg with DNA configuration for new duck.
     */
    constructor: function(egg) {

See [@method](https://github.com/senchalabs/jsduck/wiki/@method) for details.

## Events

Events are a lot like methods, except that they don't have return values.

    /**
     * @event
     * Triggered after component gets hidden.
     * @param {Ext.Component}
     */
    "hide",

`@event` tag can be followed by event name, but in the above case it is auto-detected.

See [@event](https://github.com/senchalabs/jsduck/wiki/@event) for details.

### link

{@link Class#member link text}

## FAQ

1. 各种 warning 的屏蔽：<https://github.com/senchalabs/jsduck/wiki/Usage>
2. 例子：<http://tidesdk.multipart.net/docs/user-dev/generated/#!/api>
