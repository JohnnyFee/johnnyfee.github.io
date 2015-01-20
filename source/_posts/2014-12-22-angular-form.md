---
layout: post
title: "Angular Form"
category : Angular
tags : [angular, tutorial]
--- 

本文基于 [Mastering Web Application Development with AngularJS](http://www.salttiger.com/mastering-web-application-development-angularjs/) 的读书笔记。

## Understanding the input directives

You can use all the standard HTML input types in your forms. The input directives work with the `ngModel` directive to support additional functionality, such as validation or binding to the model. The AngularJS `input` directive checks the `type` attribute to identify what kind of functionality to add to the input element.

All the basic input directives support the use of the `required` (or `ngRequired`) attribute. 

<!-- more -->

If you type into the e-mail input, the e-mail field in the model is blank until the input box contains a valid e-mail string. This means that your model never contains an invalid e-mail address. This is one of the benefits of decoupling the model from the view.

In addition to these validations all the text-based directives allow you to specify minimum and maximum lengths for the text as well as an arbitrary regular expression that must match. This is done with the ngMinLength, ngMaxLength, and ngPattern directives:

```html
<input type="password" ng-model="user.password"
  ng-minlength="3" ng-maxlength="10"
  ng-pattern="/^.*(?=.*\d)(?=.*[a-zA-Z]).*$/">
```

Note that these built-in validation features do not stop the user from entering an invalid string. The input directive just clears the model field if the string is invalid.

### Using checkbox inputs

Checkboxes simply indicate a boolean input. In our form, the input directive assigns `true` or `false` to the model field that is specified by `ngModel`. You can see this happening in our User Info Form for the "Is Administrator" field.

    <input type="checkbox" ng-model="user.admin">

The value of `user.admin` is set to `true` if the checkbox is checked and `false` otherwise. Conversely, the checkbox will be ticked if the value of `user.admin` is `true`.

You can also specify different strings for `true` and `false` values to be used in the model. For example, we could have used `admin` and `basic` in a role field.

    <input type="checkbox" ng-model="user.role" ng-true-value="admin" ng-false-value="basic">

In this case, the `user.role` model, would contain either `admin` or `basic` depending on whether the checkbox was ticked or not.

### Using radio inputs

Radio buttons provide a fixed group of choices for a field. AngularJS makes this really simple to implement: Just bind all the radio buttons in a group to the same model field. The standard HTML `value` attribute is then used to specify what value to put in the model when the radio is selected:

```
<label><input type="radio" ng-model="user.sex" value="male"> Male</label>
<label><input type="radio" ng-model="user.sex" value="female"> Female</label>
```

### Using select inputs

The `select` input directive allows you to create a drop-down list, from which the user can select one or more items. AngularJS lets you specify options for the drop down statically or from an array on the scope.

If you have a static list of options from which to select you can simply provide them as `option` elements below the `select` element:

```html
<select ng-model="sex">
    <option value="m" ng-selected="sex=='m'">Male</option>
    <option value="f" ng-selected="sex=='f'">Female</option>
</select>
```

Be aware that since the `value` attribute can only take a string, the value to which you bind can only be a string.

AngularJS provides an additional syntax for dynamically defining a complex list of options for a `select` directive. If you want to bind the value of a `select` directive to an object, rather than a simple string, then use `ngOptions`. This attribute accepts a <span class="strong">**comprehension expression**</span> that defines what options are to be displayed. The form of this expression is:

![](http://johnnyimages.qiniudn.com/angular-form-select-data-source.jpg)

The `dataSource` expression describes the source of the information about the options to be displayed. It describes elements in an array or properties on an object. One select option will be generated for each item in the `dataSource expression`.

The `optionBinding` expression describes what should be extracted from each data source item and how that item should be bound to the `select` option.

#### ngOptions

__Using array data sources:__

Select a user object with user.email as the label:

    ng-options="user.email for user in users"

Select a user object with a computed label (the function would be defined on the scope):

    ng-options="getFullName(user) for user in users"

Select a user's e-mail rather than the whole user object, with their full name as the label:

    ng-options="user.email as getFullName(user) for user in users

Select a user object with the list grouped by sex:

    ng-options="getFullName(user) group by user.sex for user in users"

__Using object data sources__

Let's provide two objects that relate country names to codes:

```js
$scope.countriesByCode = {
  'AF' : 'AFGHANISTAN',
  'AX' : 'ÅLAND ISLANDS',
  ...
};
$scope.countriesByName = {
  'AFGHANISTAN' : 'AF',
  'ÅLAND ISLANDS' : 'AX',
  ...
};
```

To select a country code by country name, ordered by country code:

    ng-options="code as name for (code, name) in countriesByCode"

To select a country code by country name, ordered by country name:

    ng-options="code as name for (name, code) in countriesByName"

#### dataSource

If the data source will be an array then the `arrayExpression` should evaluate to an array. The directive will iterate over each of the items in the array, assigning the current item in the array to the `value` variable.

The list of select options will be displayed in the same order as the items appear in the array.

If the data source will be an object then the `objectExpression` should evaluate to an object. The directive will iterate over each property of the object, assigning the value of the property to the `value` variable and the key of the member to the `key` variable.

The list of select options will be ordered alphabetically by the value of the key.

#### optionBinding expression

The `optionBinding` expression defines how to get the label and value for each option and how to group the options from the items provided by the `dataSource expression`. This expression can take advantage of all the AngularJS expression syntax, including the use of filters. The general syntax is:

    value as label group by grouping

If the `value` expression is not provided then the data item itself will be used as the value to assign to the model when this item is selected. If you provide a grouping expression, it should evaluate to the name of the group for the given option.

#### Using empty options with the select directive

What should the `select` directive do when the bound model value doesn't match with any of the values in the option list? In this case, the `select` directive will show an empty option at the top of the list of options.

The empty option will be selected whenever the model does not match any of the options. If the user manually selects the empty option then the model will be set to `null`. It will not be set to `undefined`.

You can define an empty option by adding an `option` element as a child of the `select` element that has an empty string for its value:

```html
<select ng-model="..." ng-options="...">
    <option value="">-- No Selection --</option>
</select>
```

Here, we defined an empty option, which will display the `-- No Selection --` label.

If you define your own empty option then it will always be shown in the list of options and can be selected by the user.

If you do not define your own empty option in the declaration of the `select` directive it will generate its own.

If the directive generates the empty option, it will be shown only when the model does not match any items in the list. So the user will not be able to manually set the `select` value to `null/undefined`.

It is possible to hide the empty option by defining your own and setting its style to `display: none`.

    <option style="display:none" value=""></option>

In this case the `select` directive will use our empty option but the browser will not show it. Now, if the model does not match any options the `select` directive will be blank and invalid but there will not be a blank option shown in the list.

#### select and object equivalence

The `select` directive matches the model value to the `option` value using the object equivalence operator (`===`). This means that if your option values are objects and not simply values (like numbers and strings) you must use a reference to the actual option value for your model value. Otherwise the `select` directive will think that the objects are different and will not match it to the option.

In a controller we might set up the options and selected items as an array of objects:

```js
app.controller('MainCtrl', function($scope) {
  $scope.sourceList = [
    {'id': '10005', 'name': "Anne"},
    {'id': '10006', 'name': "Brian"},
    {'id': '10007', 'name': "Charlie"}
  ];
  $scope.selectedItemExact = $scope.sourceList[0];
  $scope.selectedItemSimilar = {'id': '10005', 'name': "Anne"};
});
```

Here, `selectedItemExact` actually references the first item in the `sourceList`, while `selectedItemSimilar` is a different object, even though the fields are identical:

```html
<select
  ng-model="selectedItemExact"
  ng-options=" item.name for item in sourceList">
</select>
<select
  ng-model="selectedItemSimilar"
  ng-options="item.name for item in sourceList">
</select>
```

Here, we create two `select` directives that are bound to these values. The one bound to `selectedItemSimilar` will not have an option selected. Therefore, you should always bind the value of the select to an item in the `ng-options` array. You may have to search the array for the appropriate option.

#### Selecting multiple options

If you want to select multiple items, you simply apply the `multiple` attribute to the `select` directive. The `ngModel` bound to this directive is then an array containing a reference to the value of each selected option.

AngularJS provides the `ngMultiple` directive, which takes an expression to decide whether to allow multiple selections. Currently, the `select` directive does not watch changes as to whether it accepts multiple selections, so the `ngMultiple` directive has limited use.

### Working with traditional HTML hidden input fields

In AngularJS, we store all our model data in the scope so that there is rarely any need to use hidden input fields. Therefore, AngularJS has no hidden input directive. There are two cases where you might use hidden input fields: embedding values from the server and supporting traditional HTML form submission.

__Embedding values from the server__

You use a server-side templating engine to create the HTML and you pass data from the server to AngularJS via the template. In this case, it is enough to put an `ng-init` directive into the HTML that is generated by the server, which will add values to the scope:

    <form ng-init="user.hash='13513516'">

Here the HTML sent from the server contains a form element that includes an `ng-init` directive that will initialize `user`, `hash` on the scope of the form.

__Submitting a traditional HTML form__

Traditionally, you might have wanted to submit values to the server that are not in the view, that is, not a visible input control. This would have been achieved by adding hidden fields to your form. In AngularJS, we work from a model that is decoupled from the form, so we do not need these hidden fields. We simply add such values to the scope and then simulate the form submission using the $http service.

## ngModelController

Each `ngModel` directive creates an instance of `ngModelController`. This controller is made available to all the directives on the `input` element.

![](http://johnnyimages.qiniudn.com/angular-form-ng-modelController.jpg)

The `ngModelController` is responsible for managing the data binding between the value stored in the model (specified by `ngModel`) and the value displayed by the `input` element.

The `ngModelController` also tracks whether the view value is valid and whether it has been modified by the input element.

### Transforming the value between the model and the view

The `ngModelController` has a transformation pipeline that it applies each time the data binding is updated. This consists of two arrays: `$formatters` that transforms from model into view and `$parsers` that transforms from view to model. Each directive on the `input` element can add in their own formatters and parsers to this pipeline in order to modify what happens to the data binding as shown in the following image:

![](http://johnnyimages.qiniudn.com/ng-form-ngmodel-transfrom.jpg)

Here two directives are adding to the transformation pipeline. The `date` directive is parsing and formatting dates. The `ng-required` directive is checking that the value is not missing.

### Tracking whether the value has changed

Along with transforming the value between the model and the view, the `ngModelController` tracks whether the value has changed since it was initialized and whether the value is valid.

When it is first initialized the `ngModelController` marks the value as pristine, that is, it has not been modified. It exposes this as an `ng-pristine` CSS class on the input element. When the view changes, say through typing in an input box, the value is marked as dirty. It replaces the `ng-pristine` CSS class with the `ng-dirty` CSS class.

By providing CSS styles for these classes, we can change the appearance of the input element based on whether the user has entered or modified the data:

```
.ng-pristine { border: solid black 1px; }
.ng-dirty { border: solid black 3px; }
```

Here we make the border of the element thicker if the user has made changes to the input.

### Tracking input field validity

Directives on an input element can also tell the `ngModelController` whether they believe the value is `valid` or `invalid`. This is normally done by hooking into the transformation pipeline and checking the value rather than transforming it. The `ngModelController` tracks the validity and applies the `ng-valid` or `ng-invalid` CSS classes accordingly. We can provide further styles to change the appearance of the element based on these classes:

```css
.ng-valid.ng-dirty { border: solid green 3px;}
.ng-invalid.ng-dirty { border: solid red 3px;}
```

Here, we are using a combination of `pristine` and `invalid` to ensure that only fields that have been changed by user input are styled: thick red border when `invalid` and thick green border when `valid`.

### Demo

我们以一个确认密码输入验证器的例子为例，当确认密码和输入密码相同时，才认为输入合法。

```html
<form name="passwordForm">
  <input type="password" name="password" ng-model="user.password">
  <input type="password" name="confirmPassword" ng-model="confirmPassword" validate-equals="user.password">
</form>
```

```js
myModule.directive('validateEquals', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ngModelCtrl) {
      function validateEqual(myValue) {
        var valid = (myValue === scope.$eval(attrs.validateEquals));
        ngModelCtrl.$setValidity('equal', valid);
        return valid ? myValue : undefined;
      }

      ngModelCtrl.$parsers.push(validateEqual);
      ngModelCtrl.$formatters.push(validateEqual);

      scope.$watch(attrs.validateEquals, function() {
        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
      });
    }
  };
});
```

我们创建了一个 `validateEqual(value)` 的函数来比较传入的值和表达式的值。我们这个函数放在 `$parsers` 和 `$formatters` 管道中，所以验证函数在模型或者试图的值发生变化时都将被触发。

在这个指令中，我们也必须通过 `watch` 函数来监听比较的值（`attrs.validateEquals`）。当监听的值发生变化时，我们通过 `$setViewValue()` 手动触发 `$parsers` 管道。这保证了模型一旦发生变化，`$parsers` 所有函数将会运行。

`ngModelController`  的相关属性和方法：

Name                                        | Description
------------------------------------------- | -----------
`$parsers`                                  | 当输入元素的值发生变化时，函数管道将以此运行。
`$formatters`                               | 当模型的值发生变化时，函数管道将依次运行。
`$setValidity(validationErrorKey, isValid)` | A function called to set whether the model is valid for a given kind of validation error.       
`$valid`                                    | True if there is no error.                                                                      
`$error`                                    | An object that contains information about any validation errors on the model.                   

`$parsers` and `$formatters` 中的函数接收一个值返回一个值，如 `function(value) { return value; }`。接收的值是管道中的前一个函数的返回值。我们的验证逻辑将放在这些函数中。

我们同样可以使用类似的方式实现远程验证：

```html
<input ng-model="user.email" unique-email>
```

```js
myModule.directive('uniqueEmail', ["Users", function (Users) {
  return {
    require:'ngModel',
    link:function (scope, element, attrs, ngModelCtrl) {
      var original;
      ngModelCtrl.$formatters.unshift(function(modelValue) {
        original = modelValue;
        return modelValue;
      });
      
      ngModelCtrl.$parsers.push(function (viewValue) {
        if (viewValue && viewValue !== original ) {
          Users.query({email:viewValue}, function (users) {
            if (users.length === 0) {
              ngModelCtrl.$setValidity('uniqueEmail', true);
            } else {
              ngModelCtrl.$setValidity('uniqueEmail', false);
            }
          });
          return viewValue;
        }
      });
    }
  };
}]);
```

当用户输入发生变化时，我们只在 `$parser` 中和服务区比较验证。如果值通过设置模型来更新，我们认为应用逻辑保证了 e-mail 的正确性。如编辑一个已经存在的用户，我们认为这里的 e-mail 是正确的。

通常，在验证函数中，如果值是非法的，我们返回 `undefined`，这可以防止使用一个非法的值来改变模型。在这个例子中，函数返回我们仍不知道值是否合法，所以我们先将值返回，然后在响应的回调函数中设置有效性。

我们为 `$formatters` 添加一个函数来跟踪设置到 model 的原值。当用户再次输入原值的时候，可以防止和服务器发生交互。

## ngFormController

Each `form` (or `ngForm)` directive creates an instance of `ngFormController`. The `ngFormController` object manages whether the form is valid or invalid and whether it is pristine or dirty. Importantly, it works with `ngModelController` to track each `ngModel` field within the form.

When an `ngModelController` is created, it registers itself with the first `ngFormController` it comes across as it traverses up its list of parent elements. This way, the `ngFormController` knows what input directives it should track. It can check whether these fields are valid/invalid or pristine/dirty and set whether the form is valid/invalid or pristine/dirty accordingly.

### Using the name attribute to attach forms to the scope

You can make the `ngFormController` appear on the local scope by giving the form a name. Any input elements within the form that also have names will have their `ngModelController` object attached as a property to this `ngFormController` object.

### Adding dynamic behavior to the User Information Form

Our form allows us to enter values into fields and we can change the appearance of the input elements based on the values entered. But for a more responsive user experience, we would like to show and hide validation messages and change the state of buttons on our form depending upon the state of the form fields.

Having the `ngFormController` and `ngModelControllers` objects on our scope allows us to work with the state of the form programmatically. We can use values like `$invalid` and `$dirty` to change what is enabled or visible to our user.

#### Showing validation errors

We can show error messages for inputs and for the form as a whole if something is not valid. In the template:

```html
<form name="userInfoForm">
  <div class="control-group"
       ng-class="getCssClasses(userInfoForm.email)">

    <label>E-mail</label>
    <input type="email" ng-model="user.email"
           name="email" required>

    <span ng-show="showError(userInfoForm.email, 'email')" ...>
       You must enter a valid email
    </span>

    <span ng-show="showError(userInfoForm.email, 'required')" ...>
       This field is required
    </span>
  </div>
  ...
</form>
```

In the controller:

```js
app.controller('MainCtrl', function($scope) {
  $scope.getCssClasses = function(ngModelContoller) {
    return {
      error: ngModelContoller.$invalid && ngModelContoller.$dirty,
      success: ngModelContoller.$valid && ngModelContoller.$dirty
    };
  };
  $scope.showError = function(ngModelController, error) {
    return ngModelController.$error[error];
  }; 
});
```

This example shows the e-mail input from our User Form. We are using Twitter Bootstrap CSS to style the form, hence the `control-group` and `inline-help` CSS classes. We have also created two helper functions in the controller.

The `ng-class` directive will update the CSS classes on `div` that contains the label, the input, and the help text. It calls the `getCssClasses()` method, passing in an object and an error name.

The object parameter is actually the `ngModelController`, which has been exposed on the `ngFormController`, which in turn is exposed on the `scope.userInfoForm.email` scope.

The `getCssClasses()` method returns an object that defines which CSS classes should be added. The key of each object refers to the name of a CSS class. The value of each member is `true` if the class is to be added. In this case `getCssClasses()` will return `error` if the model is dirty and invalid and `success` if the model is dirty and valid.

#### Disabling the save button

We can disable the save button when the form is not in a state to be saved.

```html
<form name="userInfoForm">
  ...
  <button ng-disabled="!canSave()">Save</button>
</form>
```

In our view, we add a `Save` button with an `ngDisabled` directive. This directive will disable the button whenever its expression evaluates to true. In this case it is negating the result of calling the `canSave()` method. We provide the `canSave()` method on the current scope. We will do this in our main controller:

```js
app.controller('MainCtrl', function($scope) {
  $scope.canSave = function() {
    return $scope.userInfoForm.$dirty &&
           $scope.userInfoForm.$valid;
  };
});
```

The `canSave()` method checks whether the `userInfoForm` has the `$dirty` and `$valid` flags set. If so, the form is ready to save.

#### Disabling native browser validation

Modern browsers naturally try to validate the input values in a form. Normally this occurs when the form is submitted. For instance, if you have a required attribute on an input box, the browser will complain independently of AngularJS, if the field does not contain a value when you try to submit the form.

Since we are providing all the validation through AngularJS directives and controllers, we do not want the browser to attempt its own native validation. We can turn off this by applying the HTML5 novalidate attribute to the form element:

    <form name="novalidateForm" novalidate>

This form is called `novalidateForm` and the `novalidate` attribute will tell the browser not to attempt the validation on any of the inputs in the form.

### Nesting forms in other forms

Unlike standard HTML forms, AngularJS forms can be nested inside each other. Since form tags inside other form tags are invalid HTML, AngularJS provides the `ngForm` directive for nesting forms.

Each form that provides a name will be added to its parent form, or directly to the scope if it has no parent form.

A nested form acts like a composite field that exposes its own validation information based on the fields that it contains. Such forms can be used to reuse as subforms by including them in container forms. Here we group two input boxes together to create a password and password confirmation widget:

```html
<script type="text/ng-template" id="password-form">
  <ng-form name="passwordForm">
    <div ng-show="user.password != user.password2">
      Passwords do not match
    </div>
    <label>Password</label>
    <input ng-model="user.password" type="password" required>
    <label>Confirm Password</label>
    <input ng-model="user.password2" type="password" required>
  </ng-form>
</script>

<form name="form1" novalidate>
  <legend>User Form</legend>
  <label>Name</label>
  <input ng-model="user.name" required>
  <ng-include src="'password-form'"></ng-include>
</form>
```

We define our subform in a partial template. In this case it is inline in a script block but it could be in a separate file also. Next we have our container form, `form1`,which includes the subform by using the `ngInclude` directive.

The subform has its own validity state and related CSS classes. Also, notice that because the subform has a name attribute, it appears as a property on the container form.

### Repeating subforms

Sometimes, we have fields in a form that needs to be repeated by an arbitrary number of times based on the data in the model. This is a common situation where you want to provide a single form that can display a one-to-many relationship in the data.

In our SCRUM app, we would like to allow users to have zero or more website URLs in their User Info profile. We can use an `ngRepeat` directive to set this up:

```html
  <form ng-controller="MainCtrl">
  <h1>User Info</h1>
  <label>Websites</label>
  <div ng-repeat="website in user.websites">
    <input type="url" ng-model="website.url">
    <button ng-click="remove($index)">X</button>
  </div>
  <button ng-click="add()">Add Website</button>
</form>
```

The controller initializes the model and provides the helper functions, `remove()` and `add()`:

```js
app.controller('MainCtrl', function($scope) {
  $scope.user = {
    websites: [
      {url: 'http://www.bloggs.com'},
      {url: 'http://www.jo-b.com'}
    ]
  };
  $scope.remove = function(index) {
    $scope.user.websites.splice(index, 1);
  };
  $scope.add = function() {
    $scope.user.websites.push({ url: ''});
  };
});
```

In the template, we have an `ngRepeat` directive that iterates over the websites in the user's profile. Each input directive in the repeat block is data bound to the appropriate `website.url` in the `user.websites` model. The helper functions take care of adding and removing items to and from the array and AngularJS data binding does the rest.

It is tempting for each website item in the website's array to be a simple string containing the URL. This will not work since, in JavaScript, strings are passed by value and so the reference between the string in the `ngRepeat` block and the string in the array will be lost when you modify the value of the input box.

__Validating repeated inputs__

The problem with this approach comes when you want to do work with validation on these repeated fields. We need each input to have a unique name within the form in order to access that field's validity, `$valid`, `$invalid`, `$pristine`, `$dirty`, and so on. Unfortunately, AngularJS does not allow you to dynamically generate the name attribute for `input` directives. The name must be a fixed string.

We solve this problem by using nested forms. Each exposes itself on the current scope, so if we place a nested form inside each repeated block that contains the repeated input directives, we will have access on that scope to the field's validity.

Template:

```html
<form novalidate ng-controller="MainCtrl" name="userForm">
  <label>Websites</label>
  <div ng-show="userForm.$invalid">The User Form is invalid.</div>
  <div ng-repeat="website in user.websites" ng-form="websiteForm">
    <input type="url" name="website"
           ng-model="website.url" required>
    <button ng-click="remove($index)">X</button>
    <span ng-show="showError(websiteForm.website, 'url')">
       Pleae must enter a valid url</span>
    <span ng-show="showError(websiteForm.website, 'required')">
       This field is required</span>
  </div>
  <button ng-click="addWebsite()">Add Website</button>
</form>
```

Controller:

```html
app.controller('MainCtrl', function($scope) {
  $scope.showError = function(ngModelController, error) {
    return ngModelController.$error[error];
  };
  $scope.user = {
    websites: [
      {url: 'http://www.bloggs.com'},
      {url: 'http://www.jo-b.com'}
    ]
  };  
});
```

Here, we are applying the `ngForm` directive to `div`, to create a nested form, which is repeated for each website in the array of `websites` on the scope. Each of the nested forms is called `websiteForm` and each input in the form is called `website`. This means that we are able to access the validity of the `ngModel` for each website from within the `ngRepeat` scope.

We make use of this to show an error message when the input is invalid. The two `ng-show` directives will show their error messages when the `showError` function returns `true`. The `showError` function checks the passed in `ngModelController` to see if it has the relevant validation entry in the `$error` field. We can pass `websiteForm.website` to this function since this refers to the `ngModelController` object for our website input box.

Outside the `ngForm` we cannot reference the `websiteForm` (`ngFormController`) object on the scope or the `websiteForm.website` (`ngModelController`) object since they do not exist in this scope. We can, however, access the containing `userForm` (`ngFormController)` object. This form's validity is based upon the validity of all its child inputs and forms. If one of the `websiteForms` is invalid, so is the `userForm`. The div at the top of the form displays an overall error message only if `userForms.$valid` is true.

### Handling traditional HTML form submission

In this section we take a look at how AngularJS handles submission of forms. Single Page AJAX Applications, for which AngularJS is perfect, don't tend to follow the same process of direct submission to the server as traditional web application do. But sometimes your application must support this. Here we show the various submission scenarios that you may wish to implement when submitting form data back to a server.

#### Submitting forms directly to the server

If you include an `action` attribute on a form in an AngularJS application, then the form will submit as normal to the URL defined in the action:

```html
<form method="get" action="http://www.google.com/search">
  <input name="q">
</form>
```

#### Handling form submission events

If you don't include an `action` attribute, then AngularJS assumes that we are going to handle the submission on the client side by calling a function on the scope. In this case, AngularJS will prevent the form trying to directly submit to the server.

We can trigger this client-side function by using the `ngClick` directive on a `button` or the `ngSubmit` directive on the `form`.

You should not use both the `ngSubmit` and `ngClick` directives on the same `form` because the browser will trigger both directives and you will get double submission.

#### Using ngSubmit to handle form submission

To use `ngSubmit` on a form, you provide an expression that will be evaluated when the form is submitted. The form submission will happen when the user hits <span class="emphasis">_Enter_</span> in one of the inputs or clicks on one of the buttons:

```html
<form ng-submit="showAlert(q)">
  <input ng-model="q">
</form>
```

Here, hitting _Enter_ while in the input will call the `showAlert `method.

You should use `ngSubmit` only on a form that has only one input and not more than one button, such as our search form in the example.

#### Using ngClick to handle form submission

To use `ngClick`, on a `button` or `input[type=submit]`, you provide an expression that will be evaluated when the button is clicked:

```html
<form>
  <input ng-model="q">
  <button ng-click="showAlert(q)">Search</button>
</form>
```

Here, clicking on the button or hitting <span class="emphasis">_Enter_</span> in the input field will call the `showAlert` method.

### Resetting the User Info form

In our User Info form, we would like to cancel the changes and reset the form back to its original state. We do this by holding a copy of the original model with which we can overwrite any changes that the user has made.

Template:

```html
<form name="userInfoForm">
  ...
  <button ng-click="revert()" ng-disabled="!canRevert()">Revert Changes</button>
</form>
```

Controller:

```js
app.controller('MainCtrl', function($scope) {
  ...
  $scope.user = {
    ...
  };
  $scope.passwordRepeat = $scope.user.password;

  var original = angular.copy($scope.user);
  
  $scope.revert = function() {
    $scope.user = angular.copy(original);
    $scope.passwordRepeat = $scope.user.password;
    $scope.userInfoForm.$setPristine();
  };
  
  $scope.canRevert = function() {
    return !angular.equals($scope.user, original);
  };

  $scope.canSave = function() {
    return $scope.userInfoForm.$valid &&
      !angular.equals($scope.user, original);
  };
});
```

Here, we have a button to revert the model back to its original state. Clicking on this button calls `revert()` on the scope. The button is disabled if `canRevert()` returns `false`.

In the controller, you can see that we use `angular.copy()` to make a copy of the model and place it in a local variable. The `revert()` method copies this original back over to the working `user` model and sets the form back to a pristine state so that all the CSS classes are no longer set to `ng-dirty`.