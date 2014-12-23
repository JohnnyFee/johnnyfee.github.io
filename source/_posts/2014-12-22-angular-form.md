---
layout: post
title: "Angular Form"
category : Angular
tags : [angular, tutorial]
--- 

## Understanding the input directives

You can use all the standard HTML input types in your forms. The input directives work with the `ngModel` directive to support additional functionality, such as validation or binding to the model. The AngularJS `input` directive checks the `type` attribute to identify what kind of functionality to add to the input element.

All the basic input directives support the use of the `required` (or `ngRequired`) attribute. 

If you type into the e-mail input, the e-mail field in the model is blank until the input box contains a valid e-mail string. This means that your model never contains an invalid e-mail address. This is one of the benefits of decoupling the model from the view.

In addition to these validations all the text-based directives allow you to specify minimum and maximum lengths for the text as well as an arbitrary regular expression that must match. This is done with the ngMinLength, ngMaxLength, and ngPattern directives:

```html
<input type="password" ng-model="user.password"
  ng-minlength="3" ng-maxlength="10"
  ng-pattern="/^.*(?=.*\d)(?=.*[a-zA-Z]).*$/">
```

Note that these built-in validation features do not stop the user from entering an invalid string. The input directive just clears the model field if the string is invalid.

### Using checkbox inputs

[Checkboxes simply indicate a ]()[boolean input. In our form, the input directive assigns `true` or `false` to the model field that is specified by `ngModel`. You can see this ]()[happening in our User Info Form for the "Is Administrator" field.]()

    <input type="checkbox" ng-model="user.admin">

[The value of `user.admin` is set to `true` if the checkbox is checked and `false` otherwise. Conversely, the checkbox will be ticked if the value of `user.admin` is `true`.]()

[You can also specify different strings for `true` and `false` values to be used in the model. For example, we could have used `admin` and `basic` in a role field.]()

    <input type="checkbox" ng-model="user.role" ng-true-value="admin" ng-false-value="basic">

In this case, the `user.role` model, [would contain either `admin` or ]()[`basic` ]()[depending on whether the checkbox was ticked or not.]()

### Using radio inputs

[Radio buttons provide a fixed ]()[group of choices for a field. AngularJS ]()[makes this really simple to implement: Just bind all the radio buttons in a group to the same model field. The standard HTML `value` attribute is then used to specify what value to put in the model when the radio is selected:]()

```
<label><input type="radio" ng-model="user.sex" value="male"> Male</label>
<label><input type="radio" ng-model="user.sex" value="female"> Female</label>
```

### Using select inputs

[The `select` input directive ]()[allows you to create a drop-down list, from which the ]()[user can select one or more items. AngularJS lets you specify options for the drop down statically or from an array on the scope.]()

[If you have a static list of options ]()[from which to select you can simply provide them as `option` elements below the `select` element:]()

```html
<select ng-model="sex">
    <option value="m" ng-selected="sex=='m'">Male</option>
    <option value="f" ng-selected="sex=='f'">Female</option>
</select>
```

[Be aware that since the `value` attribute can only take a string, the value to which you bind can only be a string.]()

[AngularJS provides an additional syntax for dynamically defining a complex list of options for a `select` directive. If you want to bind the value of a `select` directive to an object, rather than a simple string, ]()[then use `ngOptions`. ]()[This attribute accepts a <span class="strong">**comprehension expression**</span> that defines what options are to be displayed. The form of this expression is:]()

![](http://johnnyimages.qiniudn.com/angular-form-select-data-source.jpg)

[The `dataSource `]()[`expression` describes the source of the information about the options to be displayed. It describes elements in an array or properties on an object. One select option will be generated for each item in the `dataSource expression`.]()

[The `optionBinding` ]()[expression describes what should be extracted from each data source item and how that item should be bound to the `select` option.]()

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

[If the data source will be an ]()[array then the `arrayExpression` should evaluate to an array. The directive will iterate over each of the items in the array, assigning the current item in the array to the `value` variable.]()

The list of select options will be displayed in the same order as the items appear in the array.

[If the data source will be an object then the `objectExpression` should evaluate to an object. The directive will iterate over each property of the object, assigning the value of the property to the `value` variable and the key of the member to the `key` variable.]()

The list of select options will be ordered alphabetically by the value of the key.

#### optionBinding expression

[The `optionBinding` expression ]()[defines how to get the label and value for each option and how to group the options from the items provided by the `dataSource expression`. This expression can take advantage of all the AngularJS expression syntax, including the use of filters. The general syntax is:]()

    value as label group by grouping

[If the `value` expression is not provided then the data item itself will be used as the value to assign to the model when this item is selected. If you provide a grouping expression, it should evaluate to the name of the group for the given option.]()