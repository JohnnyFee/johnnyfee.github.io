---
layout: post
title: "CSS Viewport"
category: CSS
tags: [web, css]
--- 

## 何謂 viewport

根據 w3c 對於 [CSS Device Adaptation](http://www.w3.org/TR/css-device-adapt/) 的解釋，他大致上是在做這些事情，

* 根據裝置的顯示區域來展示文件
* 放大或縮小文件，來符合或設定上給予裝置的可視區域
* 允許設定或初始化縮放的級別，或是其他規則

實際上，他是跟著 _顯示裝置_ 在運作的，所以他的所有設定都跟顯示裝置有關，而這裡的顯示裝置跟 `Media Query` 裡面的 `screen`, `projection`, `print`, `tv`, `tty`, `aural`, `handheld`, `embossed`, `braille`  這幾樣東西是不太一樣的。雖然，`Media Query` 上述那幾項規則設定，很明顯都與其顯示的裝置有關，但是，他們的目的不同，操作的方式也不一樣。

歐，你說 `print` 為什麼也算_顯示_裝置，因為對印表機而言，印出來也是顯示的一種（但是印出來有 `@page` 可以用喔！

@viewport vs. @media
--------------------

舉個例子來說，

    @viewport {
        width: device-width;
        initial-scale: 1;
    }

    @media screen and (min-width: 768px) {
        h1 {
            font-size: 16px;
        }
    }
    @media screen and (max-width: 768px) {
        h1 {
            font-size: 26px;
        }
    }

上面那個 `@viewport` 與 `@media` 初始化設定中是無關的。這樣理解嗎？什麼？不行？那先看一下步驟:

* `viewport` 規則套用，寬度設定為 `device-width`，且初始縮放數值為 `1`
* `@media` 套用於 `screen` 與其條件 `(min-width: 768px)`
* `@media` 套用於 `screen` 與其條件 `(max-width: 768px)`

對於我們的視角來說，`device-width` 可以解釋為_我們所看見_的裝置的寬度，而 `768px` 這件事情，則是告訴_該顯示的本文_遇到這個條件時，應該要顯示的結果。所以，條件會顯示的結果是看 `@media` 來決定。舉個例子來解釋這個例子，

* 假設我們的裝置 `device-width` 是 `800px`
* 那麼_第一個條件_會成立

疑？無法理解？

    @viewport {
        width: 768px;
    }

    @media only screen and (width: 768px) {
        h1 {
            font-size: 16px;
        }
    }

    @media only screen and (width: 1200px) {
        h1 {
            font-size: 26px;
        }
    }

那這樣應該相當好理解了吧！這就是 `@viewport` 在做的事情，另外，由於 `@viewport` 有絕對優先權，所以他會比 `@media` 還要早執行，所以就算這樣寫，也是會成立的，

    @media only screen and (width: 768px) {
        h1 {
            font-size: 16px;
        }
    }

    @media only screen and (width: 1200px) {
        h1 {
            font-size: 26px;
        }
    }

    @viewport {
        width: 768px;
    }

另外，我這裡就不要解釋 `actual viewport` 這件事情，我想稍微帶過就好，底下會附上參考文章給大家，

* `@viewport` 有兩種（

    <strike>就跟斯斯有兩種一樣（被巴頭</strike>

* 第一是 `initial viewport`

    * `initial viewport` 是指裝置本身的_實際_展示的尺寸或相關設定

* 其二是 `actual viewport`

    * `actual viewport` 是指經由 `initial viewport` 初始化後，內容本文的展示尺寸或相關設定

另外一種說法是，顯示裝置的_實際_展示尺寸叫做 `visual viewport`，底下這兩篇精彩文章請詳閱，

這裡有兩篇相當精彩的文章，推薦閱讀，  
[A tale of two viewports — part one](http://www.quirksmode.org/mobile/viewports.html)  
[A tale of two viewports — part two](http://www.quirksmode.org/mobile/viewports2.html)  
另外一篇關於 viewport 與瀏覽器的相關文章，  
[Browser compatibility — viewports](http://www.quirksmode.org/mobile/tableViewport.html)

屬性與設定
-----

首先請先參考一下 w3c 所列出來的 [Property Index](http://www.w3.org/TR/css-device-adapt/#property-index)，這些是我們可以使用的設定。然而有幾項比較特殊的 `meta` 標籤使用的設定在這裡 [Property](http://www.w3.org/TR/css-device-adapt/#meta-properties)。

我們先看一下 `meta` 標籤可用的設定有哪些，

* `width` 給予寬度，可視區域寬度，有 `device-width` 這個關鍵字可用，任何非法值會轉成 `1px`，負數會直接失效
* `height` 給予高度，可視區域高度，有 `device-height` 這個關鍵字可用，任何非法會轉成 `1px`，負數會直接失效
* `initial-scale` 預設縮放等級，數值範圍從 0.1 ~ 10，若使用 `device-width` 或 `device-height` 則會等於 `10`，`yes` 會等於 `1`，`no` 或任何非法值會轉成 `0.1`，負數會直接失效
* `minimum-scale` 最小縮放等級，其他設定同 `initial-scale`
* `maximum-scale` 最大縮放等級，其他設定同 `initial-scale`
* `user-scalable` 使用者是否可以進行縮放動作，可以使用關鍵字 `yes`, `no`，數值範圍從 -1 ~ 1，若使用 `device-width` 或 `device-height` 則為 `yes`，其他值則為 `no`
* `target-densityDpi` 這只能使用在大部份的 Android 手機上，數值範圍從 70 ~ 400，單位是 `dpi`，有 `device-dpi`, `low-dpi`, `medium-dpi`, `high-dpi` 等關鍵字可用，其他值會直接失效

以上的 `meta` 可用屬性設定，都可以被轉換為 `@viewport` 的設定，以下說明，

    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes, target-densityDpi=low-dpi">

    @viewport {
        width: device-width;
        zoom: 1.0;
        min-zoom: 0.5;
        max-zoom: 2.0;
        user-zoom: zoom;
        resolution: 120dpi;
    }

是的，`meta` 轉換為 `@viewport` 並不是直接複製貼上就好，他們的屬性設定是不同的，關於這點 w3c 有說明，請勿把這兩種屬性混在一起寫，
<strike>就算混在一起也做不出撒尿牛丸的！</strike>

我們再來看看 `@viewport` 的屬性設定，

* `width` 可視區域寬度，只給這個值則表示最大、最小值相同，可以使用 `auto`, `device-width`, `device-height`, 含單位數值與百分比數值
* `max-width`, `min-width` 可視區域寬度最大、最小值，可用值同 `width`
* `height` 可視區域高度，只給這個值則表示最大、最小值相同，可用值同 `width`
* `max-height`, `min-height` 可視區域高度最大、最小值，可用值同 `width`
* `zoom` 可視區域預設縮放等級，可以使用 `auto`，初始值 `1.0` 或 `100%`，數值大於此則進行縮放動作
* `max-zoom`, `min-zoom` 設定可視區域最大、最小允許縮放等級，可用值同 `zoom`
* `user-zoom` 允許使用者使用縮放，可用值為 `zoom`, `fixed`，前者代表可以，後者則否
* `orientation` 可視區域的轉向，可用值為 `auto`, `portrait`, `landscape`
* `resolution` 可視區域的解析度，單位為 `dpi` 或 `dpcm`，可用值為 `auto`, `device` 或是自行指定數值

其中 `resolution` 與 `target-densityDpi` 的轉換關係為，

* `device-dpi` = `device`
* `low-dpi` = `120dpi`
* `midium-dpi` = `160dpi`
* `high-dpi` = `240dpi`

然後，我自己實際使用 iPhone4/iPhone4S/iPad，皆無法對 `resolution` 與 `target-densityDpi` 的設定產生效果，但是 Android 可用，所以 w3c 沒有騙人，

> This property differ from the others since it is from the WebKit implementation used in the Android browser and not supported in Safari.

應用盲點
----

由於剛剛提到那兩篇文章很明確的指出 `viewport` 在裝置上的狀況，所以其實在應用上確實會有許多問題點，倒也不是 `@viewport` 或是 `@media` 之間的問題，而是網站在設計本身是否有_考量到_所謂的不同顯示界面的問題。

舉個干擾到 `@viewport` 的例子來看，假設我們使用的是 iPhone4，直式顯示方式，

    @viewport {
        width: 300px;
        user-zoom: fixed;
    }

    html, body {
        margin: 0;
        padding: 0;
        border: 0;
    }

    #container {
        width: 400px;
        overflow: hidden;
    }
    #container > .navigation {
        width: 100%;
    }

當你的 HTML 所展示出來的結果，超出了原有 `@viewport` 的寬度設定，畫面就可能會被切掉（
<strike>好像是廢話</strike>），我們知道幾件事情，

* `@media` 的 `device-width` 是 `320px`
* `@viewport` 的 `width` 是 `300px`
* `document.documentElement.offsetWidth` 將會是 `300px`
* `screen.width` 將會是 `320px`
* `#container` 的寬度將會是 `400px`

這樣講很難想像，總要有個畫面比較準確，但是，我這麼說好了，這個畫面在裝置上_顯示完全無異常_，既然無異常我附圖也沒有意義嘛。那麼，如果讓他有異常呢？

加上 `zoom: 1.0`（等同於 `initial-scale: 1.0`）就會有了，

* `@media` 的 `device-width` 是 `320px`
* `@viewport` 的 `width` 是 `300px`
* `document.documentElement.offsetWidth` 將會是 `320px`
* `screen.width` 將會是 `320px`
* `#container` 的寬度將會是 `400px`

疑？你會覺得好像加上 `zoom: 1.0` 之後，所反應出來的數值比較正常。但是，我們在換個方式做，

    @viewport {
        width: 900px;
        user-zoom: fixed;
        zoom: 1.0;
    }

結果勒（
<strike>結果勒～結果勒結果勒～</strike>

* `@media` 的 `device-width` 是 `320px`
* `@viewport` 的 `width` 是 `900px`
* `document.documentElement.offsetWidth` 將會是 `900px`
* `screen.width` 將會是 `320px`
* `#container` 的寬度將會是 `400px`

<strike>WTF!!!</strike> 這就是一個典型的 `actual viewport` 的實際範例了。

* `@media` 的 `device-width` 是 `320px`
* `@viewport` 的 `width` 是 `900px`
* `document.documentElement.offsetWidth` 將會是 `900px`
* `screen.width` 將會是 `320px`
* `#container` 的寬度將會是 `400px`

<strike>WTF!!!</strike> 這就是一個典型的 `actual viewport` 的實際範例了。

Could you tell me why?
----------------------

NO, you tell me.
================

好啦，我開玩笑的
<strike>（被揍飛</strike>，會變成這樣的理由很簡單，我剛剛有說過了 `@viewport` 有兩種，第一種（`initial viewport`）你無法干涉，第二種（`actual viewport`）是由你的文本所產生出來的結果。

所以上面的例子就很明顯可以分割成這兩種區塊，

* 這裡是 `actual viewport`

    * `viewport` 設定為 `900px` 表示我的可視區域就是 `900px`
    * 故然，我的 `document.documentElement.offsetWidth` 當然就與我的可視區域同大

* 這裡是 `initial viewport`

    * `device-width` 理所當然是 `320px`
    * `screen.width` 理所當然跟 `device-width` 一樣大

那如果把 `#container` 設定成 `width: 1200px` 呢？嗯，大概就橫向的捲軸會變得比較長一點吧。是的，雖然取得 `document.documentElement.offsetWidth` 還是 `900px`，但是本文設定成 `1200px` 的話，他還是會全部呈現出來，只是你所取得的 `offsetWidth` 就不是真正的寬度了。

_其實，寬度應該以本文總寬度為準，不應該以 `actual viewport` 為準。_

那到底 `@viewport` 做了什麼事情呢？

## Reference

- [在移动浏览器中使用viewport元标签控制布局 - Mobile](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag)
- [@viewport - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@viewport)

