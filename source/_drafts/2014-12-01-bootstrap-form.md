---
layout: post
title: "Bootstrap 表单"
category: JavaScript
tags: [javascript]
---

<link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/css/bootstrap.css">

## 表单控件

单独的表单控件会被自动赋予一些全局样式。所有设置了 `.form-control` 类的 `<input>`、`<textarea>` 和 `<select>` 元素都将被默认设置宽度属性为 `width: 100%;`。 将 `label` 元素和前面提到的控件包裹在 `.form-group` 中可以获得最好的排列。

不要将表单组直接和输入框组混合使用。建议将输入框组嵌套到表单组中使用。

```css
.form-control {
  display: block;
  width: 100%;
  
  // Make inputs at least the height of their button counterpart (base line-height + padding + border)
  height: @input-height-base; 
  padding: @padding-base-vertical @padding-base-horizontal;
  font-size: @font-size-base;
  line-height: @line-height-base;

  color: @input-color;
  background-color: @input-bg;
  // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
  background-image: none; 
  
  border: 1px solid @input-border;
  border-radius: @input-border-radius;
  .box-shadow(inset 0 1px 1px rgba(0,0,0,.075));
  .transition(~"border-color ease-in-out .15s, box-shadow ease-in-out .15s");

  // Customize the `:focus` state to imitate native WebKit styles.
  .form-control-focus();

  // Placeholder
  .placeholder();

  // Disabled and read-only inputs
  //
  // HTML5 says that controls under a fieldset > legend:first-child won't be
  // disabled if the fieldset is disabled. Due to implementation difficulty, we
  // don't honor that edge case; we style them as disabled anyway.
  &[disabled],
  &[readonly],
  fieldset[disabled] & {
    cursor: not-allowed;
    background-color: @input-bg-disabled;
    opacity: 1; // iOS fix for unreadable disabled content
  }

  // Reset height for `textarea`s
  textarea& {
    height: auto;
  }
}
```


其中：

```
@input-height-base: (@line-height-computed + (@padding-base-vertical * 2) + 2);
@line-height-computed: floor((@font-size-base * @line-height-base)); // ~20px
@padding-base-vertical:     6px;

@padding-base-horizontal:   12px;
@input-border:                   #ccc;

@input-border-radius:            @border-radius-base;
@border-radius-base:        4px;
```

编译后输出为：

```css
.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
```

### 输入框

包括大部分表单控件、文本输入域控件，还支持所有 HTML5 类型的输入控件： `text`、`password`、`datetime`、`datetime-local`、`date`、`month`、`time`、`week`、`number`、`email`、`url`、`search`、`tel` 和 `color`。

<input type="text" class="form-control" placeholder="Text input">

### 文本域

支持多行文本的表单控件。可根据需要改变 `rows` 属性。

<textarea class="form-control" rows="3"></textarea>

### 多选和单选框

多选框（checkbox）用于选择列表中的一个或多个选项，而单选框（radio）用于从多个选项中只选择一个。

设置了 `disabled` 属性的单选或多选框都能被赋予合适的样式。对于和多选或单选框联合使用的 `<label>` 标签，如果也希望将悬停于上方的鼠标设置为“禁止点击”的样式，请将 `.disabled` 类赋予 `.radio`、`.radio-inline`、`.checkbox`、`.checkbox-inline` 或 `<fieldset>`。

```
// Checkboxes and radios
//
// Indent the labels to position radios/checkboxes as hanging controls.

.radio,
.checkbox {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;

  label {
    min-height: @line-height-computed; // Ensure the input doesn't jump when there is no text
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: normal;
    cursor: pointer;
  }
}
.radio input[type="radio"],
.radio-inline input[type="radio"],
.checkbox input[type="checkbox"],
.checkbox-inline input[type="checkbox"] {
  position: absolute;
  margin-left: -20px;
  margin-top: 4px \9;
}

.radio + .radio,
.checkbox + .checkbox {
  margin-top: -5px; // Move up sibling radios or checkboxes for tighter spacing
}

// Radios and checkboxes on same line
.radio-inline,
.checkbox-inline {
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  vertical-align: middle;
  font-weight: normal;
  cursor: pointer;
}
.radio-inline + .radio-inline,
.checkbox-inline + .checkbox-inline {
  margin-top: 0;
  margin-left: 10px; // space out consecutive inline controls
}

// Apply same disabled cursor tweak as for inputs
// Some special care is needed because <label>s don't inherit their parent's `cursor`.
//
// Note: Neither radios nor checkboxes can be readonly.
input[type="radio"],
input[type="checkbox"] {
  &[disabled],
  &.disabled,
  fieldset[disabled] & {
    cursor: not-allowed;
  }
}
// These classes are used directly on <label>s
.radio-inline,
.checkbox-inline {
  &.disabled,
  fieldset[disabled] & {
    cursor: not-allowed;
  }
}
// These classes are used on elements with <label> descendants
.radio,
.checkbox {
  &.disabled,
  fieldset[disabled] & {
    label {
      cursor: not-allowed;
    }
  }
}
```

如：

```html
<div class="checkbox">
  <label>
    <input type="checkbox" value="">
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
<div class="checkbox disabled">
  <label>
    <input type="checkbox" value="" disabled>
    Option two is disabled
  </label>
</div>

<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
    Option two can be something else and selecting it will deselect option one
  </label>
</div>
<div class="radio disabled">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
    Option three is disabled
  </label>
</div>
```

### 下拉列表（select）

使用默认选项或添加 `multiple` 属性可以同时显示多个选项。

```html
<select class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>

<select multiple class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>
```

### 内联单选和多选框

通过将 `.checkbox-inline` 或 `.radio-inline` 类应用到一系列的多选框（checkbox）或单选框（radio）控件上，可以使这些控件排列在一行。

```
.radio input[type="radio"],
.radio-inline input[type="radio"],
.checkbox input[type="checkbox"],
.checkbox-inline input[type="checkbox"] {
  position: absolute;
  margin-left: -20px;
  margin-top: 4px \9;
}
```

如：

<label class="checkbox-inline">
  <input type="checkbox" value="option1"> 1
</label>
<label class="checkbox-inline">
  <input type="checkbox" value="option2"> 2
</label>
<label class="checkbox-inline">
  <input type="checkbox" value="option3"> 3
</label>

<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" value="option1"> 1
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" value="option2"> 2
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" value="option3"> 3
</label>

```html
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
</label>
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
</label>
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
</label>

<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
</label>
```

### 静态控件

如果需要在表单中将一行纯文本和 `label` 元素放置于同一行，为 `<p>` 元素添加 `.form-control-static` 类即可。

```html
<form class="form-horizontal" role="form">
  <div class="form-group">
    <label class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <p class="form-control-static">email@example.com</p>
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
    </div>
  </div>
</form>
```

### 输入框图标

你还可以针对校验状态为输入框添加额外的图标。只需设置相应的 `.has-feedback` 类并添加正确的图标即可。

**Feedback icons only work with textual `<input class="form-control">` elements.**

对于不带有 `label` 标签的输入框以及右侧带有附加组件的[输入框组](http://v3.bootcss.com/components#input-groups)，需要手动为其图标定位。为了让所有用户都能访问你的网站，我们强烈建议为所有输入框添加 `label` 标签。如果你不希望将 `label` 标签展示出来，可以通过添加 `sr-only` 类来实现。如果的确不能添加 `label` 标签，请调整图标的 `top` 值。对于输入框组，请根据你的实际情况调整 `right` 值。

```
// Form control feedback states
//
// Apply contextual and semantic states to individual form controls.

.has-feedback {
  // Enable absolute positioning
  position: relative;

  // Ensure icons don't overlap text
  .form-control {
    padding-right: (@input-height-base * 1.25);
  }
}


// Reposition feedback icon if input has visible label above
.has-feedback label {

  & ~ .form-control-feedback {
     top: (@line-height-computed + 5); // Height of the `label` and its margin
  }
  &.sr-only ~ .form-control-feedback {
     top: 0;
  }
}

// Validation states
//
// Reposition the icon because it's now within a grid column and columns have
// `position: relative;` on them. Also accounts for the grid gutter padding.
.has-feedback .form-control-feedback {
    right: (@grid-gutter-width / 2);
}
```

<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputSuccess2">Input with success</label>
  <input type="text" class="form-control">
  <span class="glyphicon glyphicon-ok form-control-feedback"></span>
</div>
<div class="form-group has-warning has-feedback">
  <label class="control-label" for="inputWarning2">Input with warning</label>
  <input type="text" class="form-control">
  <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
</div>
<div class="form-group has-error has-feedback">
  <label class="control-label" for="inputError2">Input with error</label>
  <input type="text" class="form-control">
  <span class="glyphicon glyphicon-remove form-control-feedback"></span>
</div>

```html
<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputSuccess2">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess2">
  <span class="glyphicon glyphicon-ok form-control-feedback"></span>
</div>
<div class="form-group has-warning has-feedback">
  <label class="control-label" for="inputWarning2">Input with warning</label>
  <input type="text" class="form-control" id="inputWarning2">
  <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
</div>
<div class="form-group has-error has-feedback">
  <label class="control-label" for="inputError2">Input with error</label>
  <input type="text" class="form-control" id="inputError2">
  <span class="glyphicon glyphicon-remove form-control-feedback"></span>
</div>
```

同样，可以水平排列的表单和内联表单设置可选的图标:

```html
<form class="form-horizontal" role="form">
  <div class="form-group has-success has-feedback">
    <label class="control-label col-sm-3" for="inputSuccess3">Input with success</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="inputSuccess3">
      <span class="glyphicon glyphicon-ok form-control-feedback"></span>
    </div>
  </div>
</form>
```

```html
<form class="form-inline" role="form">
  <div class="form-group has-success has-feedback">
    <label class="control-label" for="inputSuccess4">Input with success</label>
    <input type="text" class="form-control" id="inputSuccess4">
    <span class="glyphicon glyphicon-ok form-control-feedback"></span>
  </div>
</form>
```

## 表单

默认表单控件是堆叠排放。

<form role="form">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" placeholder="Enter email">
  </div>
</form>

```html
<form role="form">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
  </div>
</form>
```

源码：

```css
// Form groups
//
// Designed to help with the organization and spacing of vertical forms. For
// horizontal forms, use the predefined grid classes.
.form-group {
  margin-bottom: 15px;
}

label {
  display: inline-block;
  // Force IE8 to wrap long content (see https://github.com/twbs/bootstrap/issues/13141)
  max-width: 100%; 
  margin-bottom: 5px;
  font-weight: bold;
}
```

### 水平排列的表单

通过为表单添加 `.form-horizontal` 类，并联合使用 Bootstrap 预置的栅格类，可以将 `label` 标签和控件组水平并排布局。这样做将改变 `.form-group` 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 `.row` 了。

<form class="form-horizontal" role="form">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
</form>

```html
<form class="form-horizontal" role="form">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
</form>
```

源码：

```
// Horizontal forms
//
// Horizontal forms are built on grid classes and allow you to create forms with
// labels on the left and inputs on the right.

.form-horizontal {

  // Consistent vertical alignment of radios and checkboxes
  //
  // Labels also get some reset styles, but that is scoped to a media query below.
  .radio,
  .checkbox,
  .radio-inline,
  .checkbox-inline {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: (@padding-base-vertical + 1); // Default padding plus a border
  }
  // Account for padding we're adding to ensure the alignment and of help text
  // and other content below items
  .radio,
  .checkbox {
    min-height: (@line-height-computed + (@padding-base-vertical + 1));
  }

  // Make form groups behave like rows
  .form-group {
    .make-row();
  }

  // Reset spacing and right align labels, but scope to media queries so that
  // labels on narrow viewports stack the same as a default form example.
  @media (min-width: @screen-sm-min) {
    .control-label {
      text-align: right;
      margin-bottom: 0;
      padding-top: (@padding-base-vertical + 1); // Default padding plus a border
    }
  }

  // Validation states
  //
  // Reposition the icon because it's now within a grid column and columns have
  // `position: relative;` on them. Also accounts for the grid gutter padding.
  .has-feedback .form-control-feedback {
    right: (@grid-gutter-width / 2);
  }

  // Form group sizes
  //
  // Quick utility class for applying `.input-lg` and `.input-sm` styles to the
  // inputs and labels within a `.form-group`.
  .form-group-lg {
    @media (min-width: @screen-sm-min) {
      .control-label {
        padding-top: ((@padding-large-vertical * @line-height-large) + 1);
      }
    }
  }
  .form-group-sm {
    @media (min-width: @screen-sm-min) {
      .control-label {
        padding-top: (@padding-small-vertical + 1);
      }
    }
  }
}
```


### 内联表单

为 `<form>` 元素添加 `.form-inline` 类可使其内容左对齐并且表现为 `inline-block` 级别的控件。只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）。

在 Bootstrap 中，输入框和单选/多选框控件默认被设置为 `width: 100%;` 宽度。在内联表单，我们将这些元素的宽度设置为 `width: auto;`，因此，多个控件可以排列在同一行。

如果你没有为每个输入控件设置 `label` 标签，屏幕阅读器将无法正确识别。对于这些内联表单，你可以通过为 `label` 设置 `.sr-only` 类将其隐藏。

<form class="form-inline" role="form">
  <div class="form-group">
    <input type="email" class="form-control" placeholder="Enter email">
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Remember me
    </label>
  </div>
  <div class="form-group">
    <label class="sr-only" for="exampleInputPassword2">Password</label>
    <input type="password" class="form-control" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-default">Sign in</button>
</form>

```html
<form class="form-inline" role="form">
  <div class="form-group">
    <input type="email" class="form-control" placeholder="Enter email">
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Remember me
    </label>
  </div>
  <div class="form-group">
    <label class="sr-only" for="exampleInputPassword2">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-default">Sign in</button>
</form>
```

源码：

```
// Inline forms
//
// Make forms appear inline(-block) by adding the `.form-inline` class. Inline
// forms begin stacked on extra small (mobile) devices and then go inline when
// viewports reach <768px.
//
// Requires wrapping inputs and labels with `.form-group` for proper display of
// default HTML form controls and our custom form controls (e.g., input groups).
//
// Heads up! This is mixin-ed into `.navbar-form` in navbars.less.

.form-inline {

  // Kick in the inline
  @media (min-width: @screen-sm-min) {
    // Inline-block all the things for "inline"
    .form-group {
      display: inline-block;
      margin-bottom: 0;
      vertical-align: middle;
    }

    // In navbar-form, allow folks to *not* use `.form-group`
    .form-control {
      display: inline-block;
      width: auto; // Prevent labels from stacking above inputs in `.form-group`
      vertical-align: middle;
    }

    // Make static controls behave like regular ones
    .form-control-static {
      display: inline-block;
    }

    .input-group {
      display: inline-table;
      vertical-align: middle;

      .input-group-addon,
      .input-group-btn,
      .form-control {
        width: auto;
      }
    }

    // Input groups need that 100% width though
    .input-group > .form-control {
      width: 100%;
    }

    .control-label {
      margin-bottom: 0;
      vertical-align: middle;
    }

    // Remove default margin on radios/checkboxes that were used for stacking, and
    // then undo the floating of radios and checkboxes to match (which also avoids
    // a bug in WebKit: https://github.com/twbs/bootstrap/issues/1969).
    .radio,
    .checkbox {
      display: inline-block;
      margin-top: 0;
      margin-bottom: 0;
      vertical-align: middle;

      label {
        padding-left: 0;
      }
    }
    .radio input[type="radio"],
    .checkbox input[type="checkbox"] {
      position: relative;
      margin-left: 0;
    }

    // Re-override the feedback icon.
    .has-feedback .form-control-feedback {
      top: 0;
    }
  }
}
```

## 表单状态

### 禁用状态

为输入框设置 `disabled` 属性可以防止用户输入，并能对外观做一些修改，使其更直观。

<input class="form-control" type="text" placeholder="Disabled input here..." disabled>

```html
<input class="form-control" id="disabledInput" type="text" placeholder="Disabled input here..." disabled>
```

为`<fieldset>` 设置 `disabled` 属性,可以禁用 `<fieldset>` 中包含的所有控件。

```
<form role="form">
  <fieldset disabled>
    <div class="form-group">
      <label for="disabledTextInput">Disabled input</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input">
    </div>
    <div class="form-group">
      <label for="disabledSelect">Disabled select menu</label>
      <select id="disabledSelect" class="form-control">
        <option>Disabled select</option>
      </select>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox"> Can't check this
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
```

### 只读状态

为输入框设置 `readonly` 属性可以禁止用户输入，并且输入框的样式也是禁用状态。

<input class="form-control" type="text" placeholder="Readonly input here…" readonly>

    <input class="form-control" type="text" placeholder="Readonly input here…" readonly>

### 校验状态

Bootstrap 对表单控件的校验状态，如 error、warning 和 success 状态，都定义了样式。使用时，添加 `.has-warning`、`.has-error` 或 `.has-success` 类到这些控件的父元素即可。任何包含在此元素之内的 `.control-label`、`.form-control` 和 `.help-block` 元素都将接受这些校验状态的样式。

<div class="form-group has-success">
  <label class="control-label" >Input with success</label>
  <input type="text" class="form-control">
</div>
<div class="form-group has-warning">
  <label class="control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control">
</div>
<div class="form-group has-error">
  <label class="control-label" for="inputError1">Input with error</label>
  <input type="text" class="form-control">
</div>
<div class="has-success">
  <div class="checkbox">
    <label>
      <input type="checkbox" value="option1">
      Checkbox with success
    </label>
  </div>
</div>
<div class="has-warning">
  <div class="checkbox">
    <label>
      <input type="checkbox" value="option1">
      Checkbox with warning
    </label>
  </div>
</div>
<div class="has-error">
  <div class="checkbox">
    <label>
      <input type="checkbox" value="option1">
      Checkbox with error
    </label>
  </div>
</div>

```html
<div class="form-group has-success">
  <label class="control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess1">
</div>
<div class="form-group has-warning">
  <label class="control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control" id="inputWarning1">
</div>
<div class="form-group has-error">
  <label class="control-label" for="inputError1">Input with error</label>
  <input type="text" class="form-control" id="inputError1">
</div>
<div class="has-success">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxSuccess" value="option1">
      Checkbox with success
    </label>
  </div>
</div>
<div class="has-warning">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxWarning" value="option1">
      Checkbox with warning
    </label>
  </div>
</div>
<div class="has-error">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxError" value="option1">
      Checkbox with error
    </label>
  </div>
</div>
```

源码：

```
// Feedback states
.has-success {
  .form-control-validation(@state-success-text; @state-success-text; @state-success-bg);
}
.has-warning {
  .form-control-validation(@state-warning-text; @state-warning-text; @state-warning-bg);
}
.has-error {
  .form-control-validation(@state-danger-text; @state-danger-text; @state-danger-bg);
}

// Reposition feedback icon if input has visible label above
.has-feedback label {

  & ~ .form-control-feedback {
     top: (@line-height-computed + 5); // Height of the `label` and its margin
  }
  &.sr-only ~ .form-control-feedback {
     top: 0;
  }
}
```

其中：

```
// Form validation states
//
// Used in forms.less to generate the form validation CSS for warnings, errors,
// and successes.

.form-control-validation(@text-color: #555; @border-color: #ccc; @background-color: #f5f5f5) {
  // Color the label and help text
  .help-block,
  .control-label,
  .radio,
  .checkbox,
  .radio-inline,
  .checkbox-inline,
  &.radio label,
  &.checkbox label,
  &.radio-inline label,
  &.checkbox-inline label  {
    color: @text-color;
  }
  // Set the border and box shadow on specific inputs to match
  .form-control {
    border-color: @border-color;
    .box-shadow(inset 0 1px 1px rgba(0,0,0,.075)); // Redeclare so transitions work
    &:focus {
      border-color: darken(@border-color, 10%);
      @shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 6px lighten(@border-color, 20%);
      .box-shadow(@shadow);
    }
  }
  // Set validation states also for addons
  .input-group-addon {
    color: @text-color;
    border-color: @border-color;
    background-color: @background-color;
  }
  // Optional feedback icon
  .form-control-feedback {
    color: @text-color;
  }
}
```

## 控件尺寸

### 控件高度

通过 `.input-lg` 类似的类可以为控件设置高度，通过 `.col-lg-*` 类似的类可以为控件设置宽度。

使用 `input-lg` 控制较大一点的尺寸，`input-sm` 控制较小一点的尺寸，适用于 `input`、`select` 等控件。

<input class="form-control input-lg" type="text" placeholder=".input-lg">

<input class="form-control" type="text" placeholder="Default input">

<input class="form-control input-sm" type="text" placeholder=".input-sm">

```html
<input class="form-control input-lg" type="text" placeholder=".input-lg">
<input class="form-control" type="text" placeholder="Default input">
<input class="form-control input-sm" type="text" placeholder=".input-sm">
```

通过添加 `.form-group-lg` 或 `.form-group-sm` 类，为 `.form-horizontal` 包裹的 `label` 元素和表单控件快速设置尺寸。

```
<form class="form-horizontal" role="form">
  <div class="form-group form-group-lg">
    <label class="col-sm-2 control-label" for="formGroupInputLarge">Large label</label>
    <div class="col-sm-10">
      <input class="form-control" type="text" id="formGroupInputLarge" placeholder="Large input">
    </div>
  </div>
  <div class="form-group form-group-sm">
    <label class="col-sm-2 control-label" for="formGroupInputSmall">Small label</label>
    <div class="col-sm-10">
      <input class="form-control" type="text" id="formGroupInputSmall" placeholder="Small input">
    </div>
  </div>
</form>
```

源码：

```
// Form control sizing
//
// Build on `.form-control` with modifier classes to decrease or increase the
// height and font-size of form controls.

.input-sm,
.form-group-sm .form-control {
  .input-size(@input-height-small; @padding-small-vertical; @padding-small-horizontal; @font-size-small; @line-height-small; @input-border-radius-small);
}

.input-lg,
.form-group-lg .form-control {
  .input-size(@input-height-large; @padding-large-vertical; @padding-large-horizontal; @font-size-large; @line-height-large; @input-border-radius-large);
}

.input-lg + .form-control-feedback {
  width: @input-height-large;
  height: @input-height-large;
  line-height: @input-height-large;
}
.input-sm + .form-control-feedback {
  width: @input-height-small;
  height: @input-height-small;
  line-height: @input-height-small;
}

```

其中：

```
// Form control sizing
//
// Relative text size, padding, and border-radii changes for form controls. For
// horizontal sizing, wrap controls in the predefined grid classes. `<select>`
// element gets special love because it's special, and that's a fact!
.input-size(@input-height; @padding-vertical; @padding-horizontal; @font-size; @line-height; @border-radius) {
  height: @input-height;
  padding: @padding-vertical @padding-horizontal;
  font-size: @font-size;
  line-height: @line-height;
  border-radius: @border-radius;

  select& {
    height: @input-height;
    line-height: @input-height;
  }

  textarea&,
  select[multiple]& {
    height: auto;
  }
}
```

### 控件宽度

用栅格系统中的列（column）包裹输入框或其任何父元素，都可很容易的为其设置宽度。

<div class="row">
  <div class="col-xs-2">
    <input type="text" class="form-control" placeholder=".col-xs-2">
  </div>
  <div class="col-xs-3">
    <input type="text" class="form-control" placeholder=".col-xs-3">
  </div>
  <div class="col-xs-4">
    <input type="text" class="form-control" placeholder=".col-xs-4">
  </div>
</div>

```
<div class="row">
  <div class="col-xs-2">
    <input type="text" class="form-control" placeholder=".col-xs-2">
  </div>
  <div class="col-xs-3">
    <input type="text" class="form-control" placeholder=".col-xs-3">
  </div>
  <div class="col-xs-4">
    <input type="text" class="form-control" placeholder=".col-xs-4">
  </div>
</div>
```

## 按钮

基本样式：

```
// Base styles
// --------------------------------------------------

.btn {
  display: inline-block;
  margin-bottom: 0; // For input.btn
  font-weight: @btn-font-weight;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none; // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
  border: 1px solid transparent;
  white-space: nowrap;
  .button-size(@padding-base-vertical; @padding-base-horizontal; @font-size-base; @line-height-base; @border-radius-base);
  .user-select(none);

  &,
  &:active,
  &.active {
    &:focus,
    &.focus {
      .tab-focus();
    }
  }

  &:hover,
  &:focus,
  &.focus {
    color: @btn-default-color;
    text-decoration: none;
  }

  &:active,
  &.active {
    outline: 0;
    background-image: none;
    .box-shadow(inset 0 3px 5px rgba(0,0,0,.125));
  }

  &.disabled,
  &[disabled],
  fieldset[disabled] & {
    cursor: not-allowed;
    pointer-events: none; // Future-proof disabling of clicks
    .opacity(.65);
    .box-shadow(none);
  }
}
```

### 按钮类

为 `<a>`、`<button>` 或 `<input>` 元素应用按钮类。

<a class="btn btn-default" href="#" role="button">Link</a>
<button class="btn btn-default" type="submit">Button</button>
<input class="btn btn-default" type="button" value="Input">
<input class="btn btn-default" type="submit" value="Submit">

```
<a class="btn btn-default" href="#" role="button">Link</a>
<button class="btn btn-default" type="submit">Button</button>
<input class="btn btn-default" type="button" value="Input">
<input class="btn btn-default" type="submit" value="Submit">
```

### 预定义样式

使用下面列出的类可以快速创建一个带有预定义样式的按钮。

<button type="button" class="btn btn-default">Default</button>
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button>

```html
<!-- Standard button -->
<button type="button" class="btn btn-default">Default</button>

<!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
<button type="button" class="btn btn-primary">Primary</button>

<!-- Indicates a successful or positive action -->
<button type="button" class="btn btn-success">Success</button>

<!-- Contextual button for informational alert messages -->
<button type="button" class="btn btn-info">Info</button>

<!-- Indicates caution should be taken with this action -->
<button type="button" class="btn btn-warning">Warning</button>

<!-- Indicates a dangerous or potentially negative action -->
<button type="button" class="btn btn-danger">Danger</button>

<!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
<button type="button" class="btn btn-link">Link</button>
```

源码：

```
// Alternate buttons
// --------------------------------------------------

.btn-default {
  .button-variant(@btn-default-color; @btn-default-bg; @btn-default-border);
}
.btn-primary {
  .button-variant(@btn-primary-color; @btn-primary-bg; @btn-primary-border);
}
// Success appears as green
.btn-success {
  .button-variant(@btn-success-color; @btn-success-bg; @btn-success-border);
}
// Info appears as blue-green
.btn-info {
  .button-variant(@btn-info-color; @btn-info-bg; @btn-info-border);
}
// Warning appears as orange
.btn-warning {
  .button-variant(@btn-warning-color; @btn-warning-bg; @btn-warning-border);
}
// Danger and error appear as red
.btn-danger {
  .button-variant(@btn-danger-color; @btn-danger-bg; @btn-danger-border);
}
```

其中：

```
.button-variant(@color; @background; @border) {
  color: @color;
  background-color: @background;
  border-color: @border;

  &:hover,
  &:focus,
  &.focus,
  &:active,
  &.active,
  .open > .dropdown-toggle& {
    color: @color;
    background-color: darken(@background, 10%);
        border-color: darken(@border, 12%);
  }
  &:active,
  &.active,
  .open > .dropdown-toggle& {
    background-image: none;
  }
  &.disabled,
  &[disabled],
  fieldset[disabled] & {
    &,
    &:hover,
    &:focus,
    &.focus,
    &:active,
    &.active {
      background-color: @background;
          border-color: @border;
    }
  }

  .badge {
    color: @background;
    background-color: @color;
  }
}
```

### 尺寸

需要让按钮具有不同尺寸吗？使用 `.btn-lg`、`.btn-sm` 或 `.btn-xs` 可以获得不同尺寸的按钮。

<p>
  <button type="button" class="btn btn-primary btn-lg">Large button</button>
  <button type="button" class="btn btn-default btn-lg">Large button</button>
</p>
<p>
  <button type="button" class="btn btn-primary">Default button</button>
  <button type="button" class="btn btn-default">Default button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-sm">Small button</button>
  <button type="button" class="btn btn-default btn-sm">Small button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-xs">Extra small button</button>
  <button type="button" class="btn btn-default btn-xs">Extra small button</button>
</p>

```
<p>
  <button type="button" class="btn btn-primary btn-lg">Large button</button>
  <button type="button" class="btn btn-default btn-lg">Large button</button>
</p>
<p>
  <button type="button" class="btn btn-primary">Default button</button>
  <button type="button" class="btn btn-default">Default button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-sm">Small button</button>
  <button type="button" class="btn btn-default btn-sm">Small button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-xs">Extra small button</button>
  <button type="button" class="btn btn-default btn-xs">Extra small button</button>
</p>
```

通过给按钮添加 `.btn-block` 类可以将其拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素。

<button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
<button type="button" class="btn btn-default btn-lg btn-block">Block level button</button>

```html
<button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
<button type="button" class="btn btn-default btn-lg btn-block">Block level button</button>
```

源码：

```
// Button Sizes
// --------------------------------------------------

.btn-lg {
  // line-height: ensure even-numbered height of button next to large input
  .button-size(@padding-large-vertical; @padding-large-horizontal; @font-size-large; @line-height-large; @border-radius-large);
}
.btn-sm {
  // line-height: ensure proper height of button next to small input
  .button-size(@padding-small-vertical; @padding-small-horizontal; @font-size-small; @line-height-small; @border-radius-small);
}
.btn-xs {
  .button-size(@padding-xs-vertical; @padding-xs-horizontal; @font-size-small; @line-height-small; @border-radius-small);
}
```

```
// Block button
// --------------------------------------------------

.btn-block {
  display: block;
  width: 100%;
}

// Vertically space out multiple block buttons
.btn-block + .btn-block {
  margin-top: 5px;
}
```

其中：

```
// Button sizes
.button-size(@padding-vertical; @padding-horizontal; @font-size; @line-height; @border-radius) {
  padding: @padding-vertical @padding-horizontal;
  font-size: @font-size;
  line-height: @line-height;
  border-radius: @border-radius;
}
```

### 激活状态

当按钮处于激活状态时，其表现为被按压下去（底色更深、边框夜色更深、向内投射阴影）。对于 `<button>` 元素，是通过 `:active` 状态实现的。对于 `<a>` 元素，是通过 `.active` 类实现的。然而，你还可以将 `.active` 应用到 `<button>` 上，并通过编程的方式使其处于激活状态。

由于 `:active` 是伪状态，因此无需额外添加，但是在需要让其表现出同样外观的时候可以添加 `.active` 类。

<button type="button" class="btn btn-primary btn-lg active">Primary button</button>
<button type="button" class="btn btn-default btn-lg active">Button</button>

<a href="#" class="btn btn-primary btn-lg active" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg active" role="button">Link</a>

```html
<button type="button" class="btn btn-primary btn-lg active">Primary button</button>
<button type="button" class="btn btn-default btn-lg active">Button</button>

<a href="#" class="btn btn-primary btn-lg active" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg active" role="button">Link</a>
```

### 禁用状态

通过为按钮的背景设置 `disabled` 属性就可以呈现出无法点击的效果。我们把 `.disabled` 作为工具类使用，就像 `.active` 类一样，因此不需要增加前缀。

上面提到的类只是通过设置 `pointer-events: none` 来禁止 `<a>` 元素作为链接的原始功能，但是，这一 CSS 属性并没有被标准化，并且 Opera 18 及更低版本的浏览器并没有完全支持这一属性，同样，Internet Explorer 11 也不支持。因此，为了安全起见，建议通过 JavaScript 代码来禁止链接的原始功能。

虽然按钮类可以应用到 `<a>` 和 `<button>` 元素上，但是，导航和导航条只支持 `<button>` 元素。

<button type="button" class="btn btn-lg btn-primary" disabled="disabled">Primary button</button>
<button type="button" class="btn btn-default btn-lg" disabled="disabled">Button</button>

<a href="#" class="btn btn-primary btn-lg disabled" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg disabled" role="button">Link</a>

```html
<a href="#" class="btn btn-primary btn-lg disabled" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg disabled" role="button">Link</a>
<a href="#" class="btn btn-primary btn-lg disabled" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg disabled" role="button">Link</a>
```

## 按钮组

通过按钮组容器把一组按钮放在同一行里。通过与[按钮插件](http://v3.bootcss.com/javascript/#buttons)联合使用，可以设置为单选框或多选框的样式和行为。

当为 `.btn-group` 中的元素应用工具提示或弹出框时，必须指定 `container: 'body'` 选项，这样可以避免不必要的副作用（例如工具提示或弹出框触发时，会让页面元素变宽和/或失去圆角）。

Wrap a series of buttons with .btn in .btn-group.

<div class="btn-group">
  <button type="button" class="btn btn-default">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>

```html
<div class="btn-group">
  <button type="button" class="btn btn-default">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>
```

源码：

```
// Make the div behave like a button
.btn-group,
.btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle; // match .btn alignment given font-size hack above
  > .btn {
    position: relative;
    float: left;
    // Bring the "active" button to the front
    &:hover,
    &:focus,
    &:active,
    &.active {
      z-index: 2;
    }
    &:focus {
      // Remove focus outline when dropdown JS adds it after closing the menu
      outline: 0;
    }
  }
}

// Prevent double borders when buttons are next to each other
.btn-group {
  .btn + .btn,
  .btn + .btn-group,
  .btn-group + .btn,
  .btn-group + .btn-group {
    margin-left: -1px;
  }
}
```

### 按钮工具栏

把一组 `<div class="btn-group">` 组合进一个 `<div class="btn-toolbar">` 中就可以做成更复杂的组件。

<div class="btn-toolbar" role="toolbar" style="margin: 0;">
  <div class="btn-group">
    <button type="button" class="btn btn-default">1</button>
    <button type="button" class="btn btn-default">2</button>
    <button type="button" class="btn btn-default">3</button>
    <button type="button" class="btn btn-default">4</button>
  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-default">5</button>
    <button type="button" class="btn btn-default">6</button>
    <button type="button" class="btn btn-default">7</button>
  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-default">8</button>
  </div>
</div>

```html
<div class="btn-toolbar" role="toolbar">
  <div class="btn-group">...</div>
  <div class="btn-group">...</div>
  <div class="btn-group">...</div>
</div>
```

源码：

```
// Optional: Group multiple button groups together for a toolbar
.btn-toolbar {
  margin-left: -5px; // Offset the first child's margin
  &:extend(.clearfix all);

  .btn-group,
  .input-group {
    float: left;
  }
  > .btn,
  > .btn-group,
  > .input-group {
    margin-left: 5px;
  }
}
```

### 尺寸

只要给 `.btn-group` 加上 `.btn-group-*` 类，就省去为按钮组中的每个按钮都赋予尺寸类了。

```
<div class="btn-group btn-group-lg">...</div>
<div class="btn-group">...</div>
<div class="btn-group btn-group-sm">...</div>
<div class="btn-group btn-group-xs">...</div>
```

源码：

```
// Sizing
//
// Remix the default button sizing classes into new ones for easier manipulation.

.btn-group-xs > .btn { &:extend(.btn-xs); }
.btn-group-sm > .btn { &:extend(.btn-sm); }
.btn-group-lg > .btn { &:extend(.btn-lg); }
```

### 嵌套

想要把下拉菜单混合到一系列按钮中，只须把 `.btn-group` 放入另一个 `.btn-group` 中。

<div class="btn-group">
  <button type="button" class="btn btn-default">1</button>
  <button type="button" class="btn btn-default">2</button>

  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      Dropdown
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">Dropdown link</a></li>
      <li><a href="#">Dropdown link</a></li>
    </ul>
  </div>
</div>

```
<div class="btn-group">
  <button type="button" class="btn btn-default">1</button>
  <button type="button" class="btn btn-default">2</button>

  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      Dropdown
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">Dropdown link</a></li>
      <li><a href="#">Dropdown link</a></li>
    </ul>
  </div>
</div>
```

### 垂直排列

让一组按钮垂直堆叠排列显示而不是水平排列。**分列式按钮下拉菜单不支持这种方式。**

<div class="btn-group-vertical">
  <button type="button" class="btn btn-default">Button</button>
  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
      Dropdown
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="btnGroupVerticalDrop1">
      <li><a href="#">Dropdown link</a></li>
      <li><a href="#">Dropdown link</a></li>
    </ul>
  </div>
</div>

```html
<div class="btn-group-vertical">
  ...
</div>
```

源码：

```
// Vertical button groups
// ----------------------

.btn-group-vertical {
  > .btn,
  > .btn-group,
  > .btn-group > .btn {
    display: block;
    float: none;
    width: 100%;
    max-width: 100%;
  }

  // Clear floats so dropdown menus can be properly placed
  > .btn-group {
    &:extend(.clearfix all);
    > .btn {
      float: none;
    }
  }

  > .btn + .btn,
  > .btn + .btn-group,
  > .btn-group + .btn,
  > .btn-group + .btn-group {
    margin-top: -1px;
    margin-left: 0;
  }
}

.btn-group-vertical > .btn {
  &:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
  &:first-child:not(:last-child) {
    border-top-right-radius: @border-radius-base;
    .border-bottom-radius(0);
  }
  &:last-child:not(:first-child) {
    border-bottom-left-radius: @border-radius-base;
    .border-top-radius(0);
  }
}
.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group-vertical > .btn-group:first-child:not(:last-child) {
  > .btn:last-child,
  > .dropdown-toggle {
    .border-bottom-radius(0);
  }
}
.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {
  .border-top-radius(0);
}
```

### 两端对齐排列的按钮组

让一组按钮拉长为相同的尺寸，填满父元素的宽度。对于按钮组中的按钮式下拉菜单也同样适用。只须将一系列 `.btn` 元素包裹到 `.btn-group.btn-group-justified` 中即可。

<div class="btn-group btn-group-justified">
  <a href="#" class="btn btn-default" role="button">Left</a>
  <a href="#" class="btn btn-default" role="button">Middle</a>
  <a href="#" class="btn btn-default" role="button">Right</a>
</div>

```
<div class="btn-group btn-group-justified">
  ...
</div>
```

由于对两端对齐的按钮组使用了特定的 HTML 和 CSS （即 `display: table-cell`），两个按钮之间的边框叠加在了一起。在普通的按钮组中，`margin-left: -1px` 用于将边框重叠，而没有删除任何一个按钮的边框。然而，`margin` 属性不支持 `display: table-cell`。因此，根据你对 Bootstrap 的定制，你可以删除或重新为按钮的边框设置颜色。

源码：

```
// Justified button groups
// ----------------------

.btn-group-justified {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  > .btn,
  > .btn-group {
    float: none;
    display: table-cell;
    width: 1%;
  }
  > .btn-group .btn {
    width: 100%;
  }

  > .btn-group .dropdown-menu {
    left: auto;
  }
}
```

## 输入框组

通过在文本输入框 `<input>` 前面、后面或是两边加上文字或按钮，可以实现对表单控件的扩展。为 `.input-group` 赋予 `.input-group-addon` 类，可以给 `.form-control` 的前面或后面添加额外的元素。

支持文本输入框 `<input>`，这里请避免使用 `<select>` 元素，因为 WebKit 浏览器不能完全绘制它的样式。避免使用 `<textarea>` 元素，由于它们的 `rows` 属性在某些情况下不被支持。

为 `.input-group` 中所包含的元素应用工具提示（tooltip）或popover（弹出框）时，必须设置 `container: 'body'` 参数，为的是避免意外的副作用（例如，工具提示或弹出框被激活后，可能会让当前元素变得更宽或/和变得失去其圆角）。

不要将表单组或栅格列（column）类直接和输入框组混合使用。而是将输入框组嵌套到表单组或栅格相关元素的内部。

不支持在输入框的单独一侧添加多个额外元素，不支持在单个输入框组中添加多个表单控件。

<div class="form">
<div class="form-group">
    <div class="input-group">
      <span class="input-group-addon">@</span>
      <input type="text" class="form-control" placeholder="Username">
    </div>
</div>
<div class="form-group">
    <div class="input-group">
      <input type="text" class="form-control">
      <span class="input-group-addon">.00</span>
    </div>
</div>
<div class="form-group">
    <div class="input-group">
      <span class="input-group-addon">$</span>
      <input type="text" class="form-control">
      <span class="input-group-addon">.00</span>
    </div>
    </div>
</div>

```html
<div class="input-group">
  <span class="input-group-addon">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group">
  <input type="text" class="form-control">
  <span class="input-group-addon">.00</span>
</div>

<div class="input-group">
  <span class="input-group-addon">$</span>
  <input type="text" class="form-control">
  <span class="input-group-addon">.00</span>
</div>
```

源码：

```css
// Text input groups
// -------------------------
.input-group-addon {
  padding: @padding-base-vertical @padding-base-horizontal;
  font-size: @font-size-base;
  font-weight: normal;
  line-height: 1;
  color: @input-color;
  text-align: center;
  background-color: @input-group-addon-bg;
  border: 1px solid @input-group-addon-border-color;
  border-radius: @border-radius-base;

  // Sizing
  &.input-sm {
    padding: @padding-small-vertical @padding-small-horizontal;
    font-size: @font-size-small;
    border-radius: @border-radius-small;
  }
  &.input-lg {
    padding: @padding-large-vertical @padding-large-horizontal;
    font-size: @font-size-large;
    border-radius: @border-radius-large;
  }

  // Nuke default margins from checkboxes and radios to vertically center within.
  input[type="radio"],
  input[type="checkbox"] {
    margin-top: 0;
  }
}
```

### 尺寸

为 `.input-group` 添加相应的尺寸类，其内部包含的元素将自动调整自身的尺寸。不需要为输入框组中的每个元素重复地添加控制尺寸的类。

<div class="form">
    <div class="form-group">
        <div class="input-group input-group-lg">
          <span class="input-group-addon">@</span>
          <input type="text" class="form-control" placeholder="Username">
        </div>
    </div>

    <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon">@</span>
          <input type="text" class="form-control" placeholder="Username">
        </div>
    </div>

    <div class="form-group">
        <div class="input-group input-group-sm">
          <span class="input-group-addon">@</span>
          <input type="text" class="form-control" placeholder="Username">
        </div>
    </div>
</div>

```html
<div class="input-group input-group-lg">
  <span class="input-group-addon">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group">
  <span class="input-group-addon">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group input-group-sm">
  <span class="input-group-addon">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>
```

源码：

```css
// Sizing options
//
// Remix the default form control sizing classes into new ones for easier
// manipulation.

.input-group-lg > .form-control,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .btn {
  .input-lg();
}
.input-group-sm > .form-control,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .btn {
  .input-sm();
}
```

### 作为额外元素的多选框和单选框

可以将多选框或单选框作为额外元素添加到输入框组中。

<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox">
      </span>
      <input type="text" class="form-control">
    </div>
  </div>
  <div class="col-lg-6">
    <div class="input-group">
      <span class="input-group-addon">
        <input type="radio">
      </span>
      <input type="text" class="form-control">
    </div>
  </div>
</div>

```html
<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox">
      </span>
      <input type="text" class="form-control">
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
  <div class="col-lg-6">
    <div class="input-group">
      <span class="input-group-addon">
        <input type="radio">
      </span>
      <input type="text" class="form-control">
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
</div><!-- /.row -->
```

### 作为额外元素的按钮式下拉菜单

<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li class="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div><!-- /btn-group -->
      <input type="text" class="form-control">
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
  <div class="col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button>
        <ul class="dropdown-menu dropdown-menu-right" role="menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li class="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div><!-- /btn-group -->
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
</div>

```html
<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">...</a></li>
        </ul>
      </div><!-- /btn-group -->
      <input type="text" class="form-control">
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
  <div class="col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button>
        <ul class="dropdown-menu dropdown-menu-right" role="menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">...</a></li>
        </ul>
      </div><!-- /btn-group -->
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
</div><!-- /.row -->
```

## 辅助文本

针对表单控件的“块（block）”级辅助文本。

<div class="form-group">
    <input type="text" class="form-control">
    <span class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
</div>

```html
<div class="form-group">
    <input type="text" class="form-control">
    <span class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
</div>
```

