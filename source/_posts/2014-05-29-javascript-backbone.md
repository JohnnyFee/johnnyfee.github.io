---
layout: post
title: "Backbone Tutorial"
category: JavaScript
tags: [javascript]
--- 

> 本文为读 [Backbone.js Cookbook](http://www.salttiger.com/backbone-js-cookbook/) 的读书笔记。

Backbone.js is a lightweight JavaScript framework that is based on the Model-View-Controller (MVC) pattern and allows developers to create single-page web applications. With Backbone, it is possible to update a web page quickly using the REST approach with a minimal amount of data transferred between a client and a server.

Backbone.js was started by Jeremy Ashkenas from DocumentCloud in 2010 and is now being used and improved by lots of developers all over the world using Git.

MVC is adesign pattern that is widely used in user-facing software, such as web applications. It is intended for splitting data and representing it in a way that makes it convenient for user interaction. To understand what it does, understand the following:

<!--more-->

* Model: Thiscontains data and provides business logic used to run the application
* View: Thispresents the model to the user
* Controller: Thisreacts to user input by updating the model and the view

![Designing an application with the MVC pattern](http://johnnyimages.qiniudn.com/backbone-mvc.jpg)

Unlike traditional MVC frameworks, Backbone does not provide any distinct object that implements controller functionality. Instead, the controller is diffused between Backbone.Router and Backbone. View and the following is done:

* A router handles URL changes and delegates application flow to a view. Typically, the router fetches a model from the storage asynchronously. When the model is fetched, it triggers a view update.
* A view listens to DOM events and either updates a model or navigates an application through a router.

The following diagram shows a typical workflow in a Backbone application:

![backbone-router-view.jpg](http://johnnyimages.qiniudn.com/backbone-router-view.jpg)

## Quick Start

1. Download [Backbone.js](http://backbone.js).
2. Download Backbone dependencies.

	Backbone.js depends on the Underscore.js library, which can be downloaded from <http://underscorejs.org>. Underscore is also shipped in three different versions.

	Also, Backbone.js depends on either the jQuery or Zepto libraries. These libraries have the same syntax and both provide useful functionality to the developer. They simplify work with the document tree, event handling, AJAX, and JavaScript animations.

	For many examples in this book, we are going to use the jQuery library, which can be downloaded from <http://jquery.com>. It is provided with both the development and production versions.

3. Create a project directory structure.

	If you follow a specific directory structure, it would be easier to find any file and work with it, because such an application structure brings more order into your project. Here is an example of a directory structure that can be used by a simple Backbone application:

	lib/: This is a directory for third-party libraries, such as the following:
	
	- backbone.js: This is the source code of Backbone.js
	- underscore.js: This is the source code of Underscore.js
	- jquery.js: This has sources of jQuery

	js/: This is the directory of the project's JavaScript files.

	- main.js: This is the main JavaScript file that has been used in the project
	- index.html: This is the main file of our application.

	Create the main file of the application, which is index.html. It should include third-party libraries and your application files, as shown in the following code:

		<!DOCTYPE html>
		<html>
		  <head>
		    <meta charset="utf-8">
		    <title>Backbone.js Cookbook – Application Template</title>
		  
		    <script src="lib/jquery.js"></script>
		    <script src="lib/underscore.js"></script>
		    <script src="lib/backbone.js"></script>

		    <script src="js/main.js"></script>
		  </head>
		  <body></body>

		</html>

4. Create the main JavaScript file named main.js that will contain the code of your application.

		(function($){

		  // Your code is here
		  
		})(jQuery);

	As we include our scripts into the head tag, they are executed before the body content is processed by a browser and before the whole HTML document is loaded.

	In a Backbone application, as in many other JavaScript applications, we want to make sure our program starts to run right after the document is loaded, so `main.js` should look like the following code snippet:

		(function($){
		  // Object declarations goes here

		  $(document).ready(function () {

		   // Start application code goes here

		  });
		})(jQuery);

## Models

In Backbone.js, a model is defined by extending its instance from the Backbone.Model object. In this recipe, we are going to learn how to work with models in Backbone.js.

### Creating a Model

Perform the following steps to define a new model object and create its instance:

Define a model by extending Backbone.Model.

	var InvoiceItemModel = Backbone.Model.extend({

	});

There is no need to define a data structure inside the model object, because Backbone allows it to be defined dynamically when the model is initialized.

Create a Backbone.Model instance and initialize it with attribute values.

	var invoiceItemModel = new InvoiceItemModel({
		date: '2013-04-24',
		description: 'Wooden Toy House',
		price: 22,
		quantity: 3
	});

Perform the following steps to define a new model object and create its instance:

__Cloning a model__

When you assign a model to another variable, it makes one model reflect changes in another model. If you need an independent copy of a model, use the `clone()` method.

newModel = invoiceItemModel.clone();

__Setting default attribute values__

Sometimes, you may want your model to have attributes that are initialized with default values when a new model instance is created, so you don't need to set them manually. Here is how default attributes are defined:

	var InvoiceItemModel = Backbone.Model.extend({
	// Define default attributes.
	defaults: {
	  date: '',
	  description: '',
	  price: 0,
	  quantity: 1
	},
	});

The following example shows that the quantity and date attributes are initialized by default:

	var invoiceItemModel2 = new InvoiceItemModel({
		description: 'Farm Animal Set',
		price: 17
	});
	invoiceItemModel2.get('date') != undefined; // true
	invoiceItemModel2.get('quantity'); // 1

__Setting default attribute values with a multiline expression__

If you want to set default values with a multiline expression you can wrap it into a function and call it when setting default attributes in defaults.

	// Create new model object
	var InvoiceItemModel = Backbone.Model.extend({

	// Set default attributes.
	  defaults: {
	    description: '',
	    price: 0,
	    quantity: 1,
	  
	// Use function for multiline expression.
	    date: function() {
	      var date = new Date();

	    // Return attribute value.
	      return date.toISOString();
	    }
	  }
	});

There is also a way to do the same in the initialize() method, which is called right after the model object is created and initialized with values.

	// Crate new model
	var InvoiceItemModel = Backbone.Model.extend({

	// Set default values.
	defaults: {
	  description: '',
	  price: 0,
	  quantity: 1,
	},

	// Set default values in initialize method.
	// Following method is run after the object is created.
	initialize: function() {

	  // Check that attribute is not initialized yet.
	    if (!this.has('date')) {
	      var date = new Date();
	    
	    // Set attribute value.
	      this.set('date', date.toISOString());
	    }
	  }
	}

__Tip__

If the default attributes are defined, then they can override the attributes defined in the initialize() method, and so we need to remove such attributes from the default values, otherwise they are initialized as defaults instead.

### Operating with model attributes

Attributes are where a model stores all its data. Unlike model properties, which are used for storing internal object information, attributes cannot be accessed via the . operator. There are special methods to work with them, which we are going to learn in this recipe.

Attributes are stored in the attributes property. It is better not to access attributes directly and to use methods we have learned previously; otherwise, it can break the event triggering mechanism or integration with other Backbone extensions.

When a new module is initialized, values from the defaults property are assigned to the attributes one.

The main methods to work with model attributes are get(), set(), unset(),and clear().

1. Use the get() method to get an attribute value.

		var quantity = invoiceItemModel.get('quantity');

	If the attribute is not found, undefined is returned.

2. Use the set() method to update/create a single attribute value.

		invoiceItemModel.set('quantity', 5);

	To update multiple attributes use key-value format.

	    invoiceItemModel.set({
	      quantity: 5,
	      price: 10
	    });

	When setting an attribute if it does not exist, one is created. The set() method returns a reference with the value true to the model, if validation does not fail; otherwise returns the value false. We will learn more about validation in the recipe, Validating model attributes.

4. Use the unset() method to delete an attribute from a model.

		invoiceItemModel.unset('quantity');

5. Use the clear() method to delete all attributes from a model.

	invoiceItemModel.clear();

__Checking if a model has an attribute__

To check if a model has an attribute, use the has() method. It returns true if the attribute exists, otherwise false.

	if (!invoiceItemModel.has('quantity')) {
	  console.log('Quantity attribute does not exists!')
	}

__Getting HTML escaped attribute value__

If you are going to display user-entered text, which you assume is in plain text format, you should worry about security issues. The best way to prevent vulnerability which may lead to possible XSS attacks is to use the escape() method before outputting any user entered text. This disallows the browser to parse any HTML code by escaping HTML characters. Let's figure out how it works:

	var hacker = new Backbone.Model({
		name: "<script>alert('xss')</script>"
	});
	var escaped_name = hacker.escape('name');
	// &lt;script&gt;alert('xss')&lt;/script&gt;

### Operating with the model identifier

Each model has a unique identifier property ID, which allows distinguishing one model from another. When developing a Backbone application it is often required to operate with an identifier.

The id property provides direct access to an attribute where the identifier is stored. By default it is id; however, you can override it by setting idAttribute when extending a model.

	var Meal = Backbone.Model.extend({
		idAttribute: "_id"
	});

When a new model is created, the identifier is empty unless it is manually assigned.

The following steps explains how to set and get the id property:

Setting and getting the id property is really easy.

	invoiceItemModel.id = Math.random().toString(36).substr(2);

Getting the id property looks as follows:

	var id = invoiceItemModel.id;

### Validating model attributes

To prevent unexpected behavior, we often need to validate model attributes.

Perform the following steps to set up an attribute validation:

1. Validation can be done by defining the validate() method.
  
		var InvoiceItemModel = Backbone.Model.extend({
		    // Define validation criteria.
		    validate: function(attrs) {
		      if (attrs.quantity <= 0) {
		        return "quantity can't be negative or equal to zero";
		      }
		    }
		});

	The attrs parameter contains the attribute values that were changed. The validate() method will return an error message if they do not validate.

2. Attribute validation is triggered on the save() method. It can also trigger on the set() method if you pass {validate: true} as the last parameter.

		var invoiceItemModel = new InvoiceItemModel({
			description: 'Wooden Toy House',
			price: 10
		});

	    // Set value that is not valid.
	    invoiceItemModel.set('quantity', -1, {validate: true});

__Tip__

When validating a model you can still access old attribute values with the help of this.get() or this.attributes.

validate is called before save(), and accepts the updated model attributes, which are passed from save(). If validate() returns an error string, save() will not continue, and the model attributes will not be modified. Failed validation triggers the invalid event. If you want validation to be triggered in the set() method, pass {validate: true} as the last parameter.

__Handling validation errors__

If a model does not validate, we often need to continue running an application and provide a custom code for handling events. Let's check out how it is done.

	invoiceItemModel.on("invalid", function(model, error) {
		console.log(error);
	});

Such an error handler should be bound before the validation event is triggered.

There is also another way of handling events, which allows us to pass an error handling function as an option to the set(), fetch(), save(), or destroy() methods.

	var invoiceItemModel2 = new InvoiceItemModel({
		description: 'Animal Farm',
		price: 17
	});

    invoiceItemModel2.set({quantity: 0}, {
      invalid: function(model, error) {
        console.log(error);
      },
      validate: true
    });

__Triggering validation manually__

Though validation is performed every time a model is updated or saved to the storage, sometimes you may want to check manually if the model validates. Let's figure out how to do it.

	var invoiceItemModel3 = new InvoiceItemModel({
		description: 'Wooden Toy House',
		price: 10,
		quantity: -5
	});
	invoiceItemModel3.isValid(); // false

`isValid()` returns true or false, but does not trigger the invalid event.

### Using advanced validation in a model

By default, Backbone provides a simple way for validating model attributes using the validate() method, which allows to create your own validating function, but this can take more developer's time compared to the usage of existing solutions.

Why don't you save time with another Backbone extension named `Backbone.Validation`, which provides lots of features and allows to reuse existing validators. It is available to download from the GitHub page <https://github.com/thedersen/backbone.validation>.

To include this extension into your project, save the backbone-validation.js file in the lib folder and include a reference to it in index.html.

1. Extend Backbone.object() with Backbone.Validation.mixin.
  
		_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

	There is more information about mixins in the Using mixins with Backbone objects recipe in Chapter 8, Special Techniques.

2. Define the validation criteria in the validation property.
 
	var BuyerModel = Backbone.Model.extend({
		// Defining a validation criteria.
		validation: {
		  name: {
		    required: true
		  },
		  email: {
		    pattern: 'email'
		  }
		}
	});

The Backbone.Validation extension overrides the validate() method of Backbone.Model, so we can still call the validate() and isValid() methods as usual, and validation is performed automatically when a model is updated. Let's check this out.

    var buyerModel = new BuyerModel();

    // Set attribute values which do not validate.
    buyerModel.set({
      email: 'http://example.com'
    }, {validate: true});

    // Check if model is valid.
    buyerModel.isValid(); // false
    buyerModel.get('email'); // undefined

__Using built-in validators__

In the previous example, we reused existing validators, such as required and pattern. They are named built-in validators. In this recipe, we are going to learn how to use all of them.

- required: It validates if the attribute is required or not. It can be equal to true or false.
  
		var BuyerModel = Backbone.Model.extend({
			validation: {
			  name: {
			    required: true
			  },
			}
		});

- acceptance: It validates if something has to be accepted, for example, terms of use. It checks whether the attribute value is true or false. It works with boolean attributes.
   
		var UserRegistrationModel = Backbone.Model.extend({
			validation: {
			  terms: {
			    acceptance: true
			  },
			}
		});

- min: It validates that the attribute value has to be a number and equal to or greater than the min value specified.
 
		var BuyerModel = Backbone.Model.extend({
			validation: {
			  age: {
			    min: 18
			  },
			}
		});

- max: It validates that the attribute value has to be a number and equal to or less than the max value specified.

		var EventRegistrationModel = Backbone.Model.extend({
			validation: {
			  guests: {
			    max: 2
			  },
			}
		});

- range: It validates that the attribute value has to be a number and equal to or between the two numbers specified.
  
		var ChildTicketModel = Backbone.Model.extend({
			validation: {
			  age: {
			    range: [2, 12]
			  },
			}
		});

- length: It validates that the attribute value has to be a string with length equal to the length value specified.

		var AddressModel = Backbone.Model.extend({
		validation: {
		  zip: {
		    length: 5
		  },
		}
		});

- minLength: It validates that the attribute value has to be a string with length equal to or greater than the min length value specified.
		
		var UserModel = Backbone.Model.extend({
			validation: {
			  password: {
			    minLength: 8
			  },
			}
		});

- maxLength: It validates that the attribute value has to be a string with length equal to or less than the max length value specified.
  
		var UserModel = Backbone.Model.extend({
			validation: {
			  password: {
			    maxLength: 8
			  },
			}
		});

- rangeLength: It validates that the attribute value has to be a string and equal to or between the two numbers specified.
  
		var BuyerModel = Backbone.Model.extend({
			validation: {
			  phoneNumber: {
			    rangeLength: [10, 12]
			  },
			}
		});

- oneOf: It validates that the attribute value has to be equal to one of the elements in the specified array. It uses case-sensitive matching.
  
		var BuyerModel = Backbone.Model.extend({
			validation: {
			  type: {
			    oneOf: [''person'', ''organization'']
			  },
			}
		});

- equalTo: It validates that the attribute value has to be equal to the value of the attribute with the name specified.
  
		var UserModel = Backbone.Model.extend({
			validation: {
			  password: {
			    required: true
			  },
			  passwordRepeat: {
			    equalTo: 'password'
			  }
			}
		});

- pattern: It validates that the attribute value has to match the pattern specified. It can be a regular expression or the name of one of the built-in patterns.

		var BuyerModel = Backbone.Model.extend({
		  validation: {
		    email: {
		      pattern: 'email'
		    }
		  }
		});

	Pattern can accept one of the following attribute values:

	- number: matches any decimal number
	- digits: matches any digit sequence
	- email: matches a valid email address
	- url: matches any valid URL
	
	You can also specify any regular expression instead.

		var BuyerModel = Backbone.Model.extend({
		  validation: {
		    phoneNumber: {
		      pattern: /^(\+\d)*\s*(\(\d{3}\)\s*)*\d{3}(-{0,1}|\s{0,1})\d{2}(-{0,1}|\s{0,1})\d{2}$/
		    }
		  }
		});

### Validating an HTML form

Most of the web applications use HTML forms for data input, and Backbone is not an exception. An application should let the user know about any validation errors. Implementation of such functionality could fall on the developers' shoulders, but not in Backbone!

Fortunately, [Backbone.Validation](https://github.com/thedersen/backbone.validation) provides integration with a view and works well with HTML forms.

To allow form validation, we need to bind a view to a Backbone.Validation object in the initialize() method of the view.

	Backbone.Validation.bind(this);

Backbone.Validation assumes that your model is stored in this.model and you have implemented getting data from the form elements and updating model values with it.

If a user enters information that does not validate, then Backbone.Validation adds the invalid class to an appropriate form element and sets the data-error attribute with an error message.

The following screenshot illustrates how Backbone.Validation validates wrong data entered into the HTML form:

	(function($){

	  // Define new model.
	  var BuyerModel = Backbone.Model.extend({
	    defaults: {
	      name: '',
	      age: ''
	    },

	    // Define validation criteria.
	    validation: {
	      name: {
	        required: true
	      },
	      age: {
	        min: 18
	      }
	    }
	  });

	  var BuyerModelFormView = Backbone.View.extend({

	    // Bind Backbone.Validation to a view.
	    initialize: function(){
	      Backbone.Validation.bind(this);
	    },

	    // Define a template.
	    template: _.template('\
	      <form>\
	        Enter name:\
	        <input name="name" type="text" value="<%= name %>"><br>\
	        Enter age:\
	        <input name="age" type="text" value="<%= age %>"><br>\
	        <input type="button" name="save" value="Save">\
	      </form>\
	    '),

	    // Render view.
	    render: function(){
	      // Render template with model values.
	      var html = this.template(this.model.toJSON());

	      // Update html.
	      $(this.el).html(html);
	    },

	    // Bind save callback click event.
	    events: {
	      'click [name~="save"]': 'save'
	    },

	    // Save callback.
	    save: function(){
	      
	      // Update model attributes.
	      this.model.set({
	        name: $('[name~="name"]').val(),
	        age: $('[name~="age"]').val()
	      });
	    }
	  });


	  $(document).ready(function () {
	     // Create new model instance.
	     var buyerModel = new BuyerModel();

	     // Create new view instance.
	     var buyerModelFormView = new BuyerModelFormView({
	       model: buyerModel,
	       el: 'body'
	     });

	     // Render view.
	     buyerModelFormView.render();
	  });
	})(jQuery);

![backbone-validate-html.jpg](http://johnnyimages.qiniudn.com/backbone-validate-html.jpg)

### Working with nested attributes in a model

Sometimes nested attributes are required to operate with complex hierarchical structures stored in the model. This is typically done by using JavaScript objects as nested attributes; however, it is not a Backbone way. Fortunately, there is the Backbone-Nested extension, which provides various improvements when working with nested attributes.

You can download the Backbone-Nested extension from the GitHub page <https://github.com/afeld/backbone-nested>. To include this extension into your project, save the backbone-nested.js file into the lib folder and include a reference to it in index.html.

The Backbone-Nested extension provides a new model object Backbone.NestedModel based on Backbone.Model. It overrides existing methods, such as get(), set(), has(), toJSON, and so on. It also provides new add() and remove() methods.

Perform the following steps to use nested attributes in a model:

1. Use Backnone.NestedModel as the base object when extending a new model.

		var BuyerModel = Backbone.NestedModel.extend({

		});

2. Set the nested attribute value with the help of dot syntax provided by the Backbone-Nested extension.

	    buyerModel.set({
	      'name.title': 'Mr',
	      'name.generation': 'II'
	    });

	You can still use object syntax, which is typical to JavaScript, to set multiple values.

	    buyerModel.set({
	      name: {
	        first: 'John',
	        last: 'Smith',
	        middle: {
	          initial: 'P',
	          full: 'Peter'
	        }
	      }
	    });

3. Get the attribute value with the dot syntax.

	    buyerModel.get('name.middle.full'); // Peter
	    buyerModel.get('name.middle');
	    // { full: 'Peter', initial: 'P }
	    buyerModel.get('name.title'); // Mr

#### Working with a nested array of attributes

Of course, there is a way of working with a bit more complex structures, such as nested array of attributes. You can set it using the object syntax as well.

    buyerModel.set({
      'addresses': [
        {city: 'Brooklyn', state: 'NY'},
        {city: 'Oak Park', state: 'IL'}
      ]
    });

Or you can set attributes in the nested array with a dot and bracket syntax, as shown in following example:

    buyerModel.set({
      'addresses[1].state': 'MI'
    });

And the same syntax is used for getting attributes from the nested array.

    buyerModel.get('addresses[0].state'); // NY
    buyerModel.get('addresses[1].state'); // MI

Adding/removing elements to/from a nested array
Backbone-Nested provides additional methods to work with nested arrays. The add method adds a new element to a nested array. Here is how it works.

    buyerModel.add('addresses', {
      city: 'Seattle',
      state: 'WA'
    });

    buyerModel.get('addresses[2]');
    // { city: 'Seattle', state: 'WA' }

The remove() method removes desired elements from a nested array. Let's see how it is done.

    buyerModel.remove('addresses[1]');

    buyerModel.get('addresses').length; // 2

#### Binding callbacks to an events

When binding a callback to an event, you can use the same dot and bracket syntax as described previously. Let's check out the following example of binding a callback to an event:

    buyerModel.bind('change:addresses[0].city', function(model, value){
      console.log(value);
    });

    buyerModel.set('addresses[0].city', 'Chicago');

Moreover, Backbone-Nested provides additional add:* and remove:* events for handling array update events.

### Overriding getters and setters

Sometimes it isrequired to override getters or setters in your application. There can be different reasons to do so:

* An attribute is stored in a different format rather than a format for input or output
* You have a virtual attribute that is not stored in the model, but depends on other attributes
* Prevent illegal values to be assigned to an attribute

The Backbone.Mutators extension overrides the get() and set() methods of Bakcbone.Model. New methods try to call overridden getters and setters. If not, run the original get() or set() methods.

It also overrides the `toJSON()` method and replaces attributes which have overridden getter.

By default, Backbone does not allow users to override getters or setters, but there is an extension named Backbone.Mutators, which allows you to do so.

There is a link to download Backbone.Mutators from the **GitHub** page <https://github.com/asciidisco/Backbone.Mutators>.

To include this extension into your project, save the backbone.mutators.js file into the lib folder and include a reference to it in index.html.

We can specify a getter or setter for a virtual attribute that does not exist. This can be helpful in some cases, for example, if a virtual attribute depends on other attributes.

Introduce a new virtual attribute by overriding getter for it.
	
	var BuyerModel = Backbone.Model.extend({
	    // Use mutators
	    mutators: {
	    // Introduce virtual attribute.
	      fullName: {
	        get: function () {
	          return this.firstName + ' ' + this.lastName;
	        }
	      }
	    }
	});

In the model object, we defined a new mutators attribute, which provides our model with a getter for the new virtual attribute named fullName. This attribute is not assumed to be stored in the model, because it contains values of existing attributes firstName and lastName. Now, let's see how we can use an overridden getter.

	var buyerModel = new BuyerModel();
	buyerModel.set({
	    firstName: 'John',
	    lastName: 'Smith'
	});

    buyerModel.get('fullName'); // John Smith
    buyerModel.get('firstName'); // John
    buyerModel.get('lastName'); // Smith

Override setter, so the virtual attribute is not actually saved in the model, but other attributes are updated instead.
  
	var BuyerModel = Backbone.Model.extend({
		// Use mutators
		mutators: {

		  // Introduce virtual attribute.
		  fullName: {
		    set: function (key, value, options, set) {
		      var names = value.split(' ');
		      this.set('firstName', names[0], options);
		      this.set('lastName', names[1], options);
		    }
		  }
		}
	});

In the setter for the fullName attribute, we split a value into an array and then assign the firstName and lastName attributes with its parts. Here is an example which demonstrates how it can be used:

    var buyerModel2 = new BuyerModel()
    buyerModel2.set('fullName', 'Joe Bloggs');

    buyerModel2.get('fullName'); // Joe Bloggs
    buyerModel2.get('firstName'); // Joe
    buyerModel2.get('lastName'); // Bloggs

**Initialize attributes using the set() method**

If you use setter mutator for an attribute, the only way to trigger it is to call the set() method. Setter mutator won't work if you assign attributes when creating a new model, because in this case the change event is not triggered. Otherwise, you need to trigger the change event for a specific property.

#### Overriding getter and setter of an existing attribute

Overriding setter of an existing attribute may be done if you need the attribute to be stored in a different format rather than the one in which it is outputted or inputted. You can override getter and setter for this attribute and solve this problem. Let's see how to use Backbone.Mutators for existing attributes:

	var BuyerModel = Backbone.Model.extend({
		// Use mutators.
		mutators: {

		  // Override existing attribute.
		  vip: {
		    get: function() {
		      return this.vip === true ? 'VIP' : 'Regular';
		    },
		    set: function (key, value, options, set) {
		      set(key, value === 'VIP', options);
		    }
		  }
		}
	});

In this model, there is the vip attribute, which is boolean. We want this attribute to be represented as a string to the user, so we are going to override getter and setter for it.

The usage syntax stays the same as for a regular attribute.

    var buyerModel3 = new BuyerModel();
    buyerModel2.set({
      fullName: 'Mister X',
      vip: 'VIP'
    });

    buyerModel2.get('vip'); // VIP
    buyerModel2.attributes.vip; // true

__Tip__

Mutators aim to override setters or getters, but they do not modify attribute values itself. You can always get the original attributes by accessing the attributes property of a model.

#### Handling mutators events

You can bind callback to the mutators:set:* event. Here is how it is done:

    buyerModel3.on('mutators:set:fullName',
      function (a, b, c, d) {
        console.log('mutators:set:fullName is triggered');
    });

    buyerModel3.set({
      fullName: 'Mister Y'
    });

### Creating undo points to store/restore a model's state

Sometimes, you may need to manage the states of a model in your application. This can be useful in one of the following cases:

* Your application requires an undo/redo feature
* You want to implement transactions
* Your application emulates some process
* You want to change a model temporarily and then restore it

Typically for all ofthe previous cases developers often use the Memento pattern. There is an implementation of this pattern in Backbone, which is available in the Backbone.Memento extension. This extension allows developers to store or restore a model's state and provides a stack for operating with multiple states.

You can download the Backbone.Memento extension from the GitHub page <https://github.com/derickbailey/backbone.memento>. To include this extension into your project, save the backbone.memento.js file into the lib folder and include a reference to it in index.html.

__Note__

Including a Backbone extension into your project is described in the Extending application with plugins recipe in Chapter 1, Understanding Backbone in detail.

Perform the following steps to operate model states:

1. Extend a model with the Backbone.Memento extension in the initialize() method.

		var InvoiceItemModel = Backbone.Model.extend({
			// Extend model instance with memento instance.
			initialize: function() {
			  _.extend(this, new Backbone.Memento(this));
			}
		});

2. Create the model instance and initialize it with values.

		var invoiceItemModel = new InvoiceItemModel();
		invoiceItemModel.set('price', 10);

3. Use the store() method to save a state.

		invoiceItemModel.store();

4. Update the model with temporary values.
  
  		invoiceItemModel.set('price', 20);

5. Use the restore() method to retrieve a previously saved state.
  
  		invoiceItemModel.restore();

6. Retrieve model values of the saved state.
  
		invoiceItemModel.get('price'); // 10

Memento uses the **LIFO** ( **last in, first out** ) data structure, also known as stack, for storing model states. So it is possible to save model states multiple times, and then restore them in a backward direction. The following diagram shows how it works:

![How it works...](http://johnnyimages.qiniudn.com//backbone_restore.jpg)

Each time you call the store() method, the state is saved on top of the stack. Each time you call the restore() method, thestate that was saved last is restored and deleted from the top of the stack.

#### Restoring from the first state in the stack

Sometimes,it is required to reset a model to the state in which it was first saved in the stack, no matter how many states were saved after. This can be done using the restart() method.

    invoiceItemModel3.restart();

#### Ignoring attributes from being restored

There is an interesting feature in Backbone.Memento, which allows you to ignore some model attributes from being saved or restored. It is very useful if a model contains some technical properties, which is not intended to be used as part of the state. When extending a model in the initialize() method, pass the properties to be ignored in the ignore option.

    var AnotherInvoiceItemModel = Backbone.Model.extend({ 
    	// Extend model instance with memento instance. 
    	// Ignore restoring of description attribute. 
    	initialize: function() { 
    		_.extend(this, new Backbone.Memento( this, {
    			ignore: ["description"]
    		})); 
		}
	});

#### Working with collections

The Memento extension also allows to extend a collection with Memento functionality. It provides the same methods when working with collections store(), restore(), and restart().

### Implementing workflow for a model

If you are implementing a business logic, which assumes that a model can be in different states and there are special rules applied to a state change, you should use the workflow.js extension, which is very helpful for building such kind of functionality.

You can download the workflow.js extension from the GitHub page <https://github.com/kendagriff/workflow.js>. To include this extension into your project, save the workflow.js file into the lib folder and include a reference to it in index.html.

Let's create a workflow for InvoiceModel, because it has a status attribute, which represents the model state and is well suited for a workflow example.

1. Draw a graph of the states and possible transitions.
	
	![How to do it...](http://johnnyimages.qiniudn.com/backbone_workflow.jpg)

	Available states are draft, issued, paid, and canceled. There are also a few transitions available that allow one state to be changed into another. If there is no appropriate transition, then such a change is not possible.

2. Define workflow in code.

		var InvoiceModel = Backbone.Model.extend({

			// Define workflow states.
			workflow: {

			  // Define initial state.
			  initial: 'draft',

			  // Define state transitions.
			  events: [
			    { name: 'issue', from: 'draft', to: 'issued' },
			    { name: 'payout', from: 'issued', to: 'paid' },
			    { name: 'cancel', from: 'draft', to: 'canceled' },
			    { name: 'cancel', from: 'issued', to: 'canceled' },
			  ]
			},

			initialize: function() {
			  // Extend model instance with workflow instance.
			  // Set attribute name which contains status.
			  _.extend(this,
			    new Backbone.Workflow(this, {attrName: 'status'})
			  );
			}
		});

	As we can see, there is a new workflow property which describes our workflow. Transitions are defined in an array, which is assigned to the events property.

	Each element of the transitions array should contain the name of the transition, from state, and to state. Initial state of the model should be defined in the initial property.

	In the previous example, in the initialize() method, we extend our model object with an instance of the Backbone.Workflow object and pass the state attribute name (attrName) as an option, which contains 'status' instead of the default value 'workflow_state'.

3. Trigger workflow transition by calling the triggerEvent() method.
    
	    var invoiceModel = new InvoiceModel();
	    invoiceModel.get('status'); // draft

	    invoiceModel.triggerEvent('issue');
	    invoiceModel.get('status'); // issued

	    invoiceModel.triggerEvent('payout');
	    invoiceModel.get('status') // paid

	As we can see in the preceding code, triggerEvent() accepts a single parameter, which is the transition name. In case if an inappropriate transition is triggered, then an exception is thrown.

There is also another extension named [Backbone.actAs.Mementoable](https://github.com/iVariable/Backbone.actAs.Mementoable), which implements the Memento pattern in a more accurate way, because it uses separate objects for storing states. It is more flexible, but does not provide stack out of the box and cannot ignore specific attributes from being saved/restored.

#### Binding callbacks to transition events

Sometimes, you may want to execute a code when a specific transition is triggered. In this case, you need to bind a callback function to a transition event. This callback is executed if an event is being triggered.

Workflow.js provides two types of events transition:from:* and transition:to:*. The first one is triggered when a workflow loses a specific state, and the second one is triggered when a workflow reaches a specific state. Let's define event bindings for our model.

	var InvoiceModel = Backbone.Model.extend({

		// Define workflow states.
		// [workflow definition goes here]

		initialize: function() {
		  // Extend model instance with workflow instance.
		  // Set attribute name which contains status.
		  _.extend(this,
		    new Backbone.Workflow(this, {attrName: 'status'})
		  );

		  // Bind reaction on event when status changes from
		  // draft to any.
		  this.bind('transition:from:draft', function() {
		    this.set('createdDate', new Date().toISOString());
		  });

		  // Bind reaction on event when status changes
		  // from any to paid.
		  this.bind('transition:to:paid, function() {
		    this.set('payoutDate', new Date().toISOString());
		  });
		}
	});

In the preceding example, we bind a couple of callbacks, which update date attributes when appropriate events are triggered.

The next code snippet is an example which demonstrates what happens when workflow events are triggered.

    var invoiceModel = new InvoiceModel();
    invoiceModel.get('status'); // draft

    invoiceModel.triggerEvent('issue');
    invoiceModel.get('status'); // issued
    invoiceModel.get('createdDate');
    // 2012-05-01T12:00:10.234Z

    invoiceModel.triggerEvent('payout');
    invoiceModel.get('status') // paid
    invoiceModel.get('payoutDate');
    // 2012-05-01T12:00:10.238Z

**Always use the triggerEvent() method when changing state**

Event callback is executed if an event is triggered by the triggerEvent() method only. That is why an event callback is not executed when an object is initialized or if you use the set() method to update the workflow state.

### Implementing a one-to-one relationship

Mostly in any application, we may need to have models that are related to each other. For example, a blog post model can have a relationship with a model of its author or have a connection to a comment model.

We may also need to access comments quickly when dealing with a blog post, or list all blog posts of a specific author. Moreover, we may want to export blog posts with author info and comments in a single JSON format.

In a Backbone app, this can be implemented with the help of the Backbone-relational extension.

You can download the Backbone-relational extension from the GitHub page <https://github.com/PaulUithol/Backbone-relational>. To include Backbone-relational into your project, save the backbone-relational.js file into the lib folder and include a reference to it in index.html.

In this case, we need to store buyer credentials somewhere. It can be a new UserModel associated with an existing BuyerModel. We know that for each user there is a single buyer and vice versa, so we are dealing with a one-to-one relationship. Let's implement one such one-to-one relationship.

Each Backbone.RelationalModel registers itself with Backbone.Store upon creation (and is removed from the Store when destroyed). When creating or updating an attribute that is a key in a relation, removed related objects are notified of their removal, and new related objects are looked up in the Store.

1. Extend models from Backbone.RelationalModel and pass the relations property with a relationship definition.
  
		// Define new model object.
		var UserModel = Backbone.RelationalModel.extend({

		});

		// Define new model object.
		var BuyerModel = Backbone.RelationalModel.extend({

		// Define one-to-one relationship.
		relations: [
		  {
		     // Relationship type
		     type: Backbone.HasOne,

		     // Relationship key in BuyerModel.
		     key: 'user',

		     // Related model.
		     relatedModel: UserModel,

		     // Define reverse relationship.
		     reverseRelation: {
		       type: Backbone.HasOne,
		       key: 'buyer'
		     }
		  }
		]
		});

	As we see from the previous example, the relations property takes an array, so multiple relationships are possible.

2. Initialize a one-to-one relationship by referencing the UserModel instance in the BuyerModel instance or vice versa.
    
	    var userModel1 = new UserModel({
	      login: 'jsmith',
	      email: 'jsmith@example.com'
	    });

	    var buyerModel1 = new BuyerModel({
	      firstName: 'John',
	      lastName: 'Smith',
	      user: userModel1
	    });

	There is also a way to do the same by passing a single input JSON when creating both BuyerModel and UserModel.

	    var buyerModel = new BuyerModel({
	      firstName: 'John',
	      lastName: 'Smith',
	      user: {
	        login: 'jsmith',
	        email: 'jsmith@example.com'
	      }
	    });

3. If a reversed relation is defined, pass a BuyerModel array when initializing UserModel.

	    var userModel = new UserModel({
	      login: 'jsmith',
	      email: 'jsmith@example.com',
	      buyer: {
	        firstName: 'John',
	        lastName: 'Smith'
	      }
	    });

4. Optionally, access the related model with the help of the get() method.
    
	    buyerModel1.get('user').get('email');
	    // jsmith@example.com
	    userModel1.get('buyer').get('lastName'); // Smith

## Collections

Collection is an object used for organizing models into an ordered set. There are specific methods to sort, filter, and iterate through a collection.

### Creating a collection of models

Extend the Backbone.Collection object and pass the model's object name as an option.

    var InvoiceItemCollection = Backbone.Collection.extend
    ({
      model: InvoiceItemModel
    });

Initialize a new collection instance and pass the initial array of models.

    var invoiceItemCollection = new InvoiceItemCollection([
      {description: 'Wooden Toy House', price: 22, quantity: 3},
      {description: 'Farm Animal Set', price: 17, quantity: 1},
      {description: 'Farmer Figure', price: 8, quantity: 1},
      {description: 'Toy Tractor', price: 15, quantity: 1}
    ]);

Backbone.Collection knows which model object to use when creating new instances, because we specified it in the model property. Internally, models are stored in the models array.

We can also initialize a collection with the existing models. Here is how it is done.

    invoiceItemModel1 = new InvoiceItemModel({
        description: 'Wooden Toy House',
        price: 22,
        quantity: 3
      });
    invoiceItemModel2 = new InvoiceItemModel({
        description: 'Farm Animal Set',
        price: 17,
        quantity: 1
      });

    var invoiceItemCollection2 = new InvoiceItemCollection
      ([
        invoiceItemModel1,
        invoiceItemModel2
      ]);

### Getting a model from a collection by its index

Use the `at()` method to get a model from a collection at the specific index.

    var model = invoiceItemCollection.at(2);
    model.get('description'); // Farmer Figure

**Be careful when sorting a collection**

When performing a collection, sorting it can update the model indexes, so the at() method with the same parameter can get different models before and after sorting.

__Getting an index of a collection model__

To get an index of a model stored in a collection, use the indexOf() method inherited from Underscore.js.

    invoiceItemCollection.indexOf(model); // 2

__Getting an independent copy of a model__

The model object that is retrieved from a collection is the same object stored there, so if we modify this object, one object in the collection gets updated.

    model.set('description', 'Superman Figure');
    invoiceItemCollection.at(2).get('description');
    // Superman Figure

If we need to get an independent copy of the model object, we can use the clone() method of a returned model. Changing the attributes of the cloned model does not affect the attributes of the original model.

    var anotherModel = invoiceItemCollection.at(2).clone();
    anotherModel.set('description', 'Another Figure');
    invoiceItemCollection.at(2).get('description');
    // Superman Figure

__Getting the length of a collection__

There is a way to get the length of a collection. It is done with the help of the length() method. The following example gets a collection length and then obtains the last model from the collection:

    var length = invoiceItemCollection.length; //4
    model = invoiceItemCollection.at(length-1);
    model.get('description'); // Toy Tractor

__Getting a model from a collection by its ID__

When getting a model by its ID, Backbone.Collection searches for the model in the _byId array, which stores models mapped to their IDs. Such an implementation guarantees the best performance, because there is no need to loop through all the models in a collection.

1. To get a model from a collection by its identifier, use the get() method.

        model = invoiceItemCollection2.get('4ryurtz3m5gn9udi');

2. To get a model from a collection by its client identifier, you can again use the get() method.

    model = invoiceItemCollection.get('c4');
    model.get('description'); // Toy Tractor

### Adding a model to a collection

Call the add() method to add a new model to the end of a collection.

    invoiceItemCollection.add({
        description: 'Toy Track',
        price: 10,
        quantity: 1
      });

The code in the add() method prevents duplicates from being added to the collection. A unique model is inserted into the models array and is mapped to its ID in the _byId array. Also, a reference to the collection is created in the model object in the collection property.

By default, a new model is added to the end of the collection. But in case sorting is enabled, or insertion index is specified, the model can be inserted at a different position.

When adding a new model to a collection, the add event is being triggered.

__Adding a model at a specific position__

To add a model at a specific position, we need to pass {at: index} as an option.

    invoiceItemCollection.add(
        {description: 'Fisherman Hut', price: 15, quantity: 1},
        {at: 0}
      );
    invoiceItemCollection.at(0).get('description');
    // Fisherman Hut

__Adding multiple models__

We can also add multiple models at the same time.

    invoiceItemCollection.add([
        {description: 'Powerboat', price: 12, quantity: 1},
        {description: 'Jet Ski', price: 12, quantity: 1}
      ]);

__Adding existing models__

We can also use existing model objects as the arguments for the add() method. We can pass a single object as well as an array of existing objects.

### Removing a model from a collection

Call the remove() method to remove a model from a collection.

    invoiceItemCollection.remove(['c0', 'c1', 'c2', 'c3']);

Here we can pass the model's id, cid, or even the model object as a parameter. We can either pass a single value or an array of values.

When calling the remove() method, a model is removed from the models array, and any references between them are removed as well. Thus, the model object itself is not destroyed, and we can still work with it if the need arises.

Sometimes, we may need to delete all the existing models from a collection and add some others. There is a useful reset() method, which does both these jobs simultaneously. Here is how it works.

    invoiceItemCollection.reset   ([
        {description: 'Wooden Toy House', price: 22, quantity: 3},
        {description: 'Farm Animal Set', price: 17, quantity: 1}
      ]);

### Working with a collection as a stack or as a queue

1. Call the push() method to add a model to the end of a collection.

        invoiceItemCollection.push(model);

2. Call the pop() method to remove and return the last model from a collection.

        model = invoiceItemCollection.pop();

3. Call the unshift() method to add a model at the beginning of a collection.

        invoiceItemCollection.unshift(model);

4. Call the shift() method to remove and return the first model from a collection.

        model = invoiceItemCollection.shift();

### Sorting a collection

Assign the comparator callback to the comparator property of a collection to maintain the correct order.

    invoiceItemCollection.comparator = function(model){
        return model.get("price");
    };

The comparator callback accepts a single parameter, which is a model object. It should return a value according to which the collection is sorted.
Optionally, call the sort() method to force sorting.

    invoiceItemCollection.sort();

Check the result.

    invoiceItemCollection.pluck("price"); // [8, 15, 17, 22]

When the comparator callback is defined, Backbone uses it to insert a new model in the models array so that it is inserted in the correct order.

If you assign a new comparator callback to a collection with existing models, you need to trigger sorting manually by calling the sort() method.

You also need to call the sort() method if the model in the collection gets updated. This can be done automatically if you bind sorting on the model's change event.

__Comparing a pair of models in the comparator__

Another way to implement a comparator is to evaluate a pair of models passed as parameters and return one of the following values:

- -1 (or any negative value), if the first model should come before the second
- 0, if they are of the same rank
- 1 (or any positive value), if the first model should come after the second

The following example demonstrates sorting by the length of the description attribute:

    invoiceItemCollection.comparator = function(m1, m1){
        return m1.get("description").length -
        m2.get("description").length;
      };
    invoiceItemCollection.sort();
    invoiceItemCollection.pluck("description");
    // ["Toy Tractor", "Farmer Figure", "Farm Animal Set",
    // "Wooden Toy 

### Filtering models in a collection

To filter models in a collection, use the where() method. It accepts a search criteria and returns an array of found models.

    var result = invoiceItemCollection.where({quantity: 1});
    // Result is just an array of models, so let's create
    // new collection.
    var resultCollection = new InvoiceItemCollection(result);
    resultCollection.pluck('quantity'); // [1, 1, 1]

It is also possible to pass multiple criteria together.

    invoiceItemCollection.where({quantity: 1, price: 10});

### Iterating through a collection

The easiest way to iterate through a collection is to use the each() method provided by Underscore.js.

    var  descriptions_txt = '';
    invoiceItemCollection.each(function(model, index, list){
        descriptions_txt += descriptions_txt ? ', ' : ''; 
        descriptions_txt += model.get('description');
      });
    descriptions_txt; // Wooden Toy House, Farm Animal Set

In the each() method, we pass an iterator function, which is executed for each model. It accepts the following parameters:

* **model** : The model that is being iterated
* **index** : This is the model index
* **list** : This is the whole model array

__Checking every model to match a specific condition__

To check every model in a collection that fulfills a specific criteria, use the every() method. It accepts a callback parameter which should return a Boolean value if the condition is fulfilled.

    var multiple = invoiceItemCollection.every(function(model){
        return model.get('quantity') > 1;
      });

    multiple; // false

__Checking any model to match a specific condition__

To check any model in a collection that fulfills a specific criteria, use the some() method. It accepts a callback parameter which should return a Boolean value if the condition is fulfilled.

    var multiple = invoiceItemCollection.some(function(model){
        return model.get('quantity') > 1;
    });
    multiple; // true

__Getting the attribute from each model in a collection__

In the previous examples, we used the pluck() method, which returns an array of values for the specified attribute from each model in a collection. Let's see how it works.

    var descriptions = invoiceItemCollection.pluck("description");
    descriptions; // ["Wooden Toy House", "Farm Animal Set"]

__Performing specific calculations to each model in a collection__

To perform specific calculations to each model in a collection, use the map() method. It takes callback as a parameter, executes it for each model in a collection, and returns an array of results.

    var amounts = invoiceItemCollection.map(function(model){
        return model.get('quantity') * model.get('price');
      });
    amounts; // [66, 77]

__Boiling down models in a collection into a single value__

Models in a collection can be boiled down to a single value using the reduce() method. Here is how it works.

    var count = invoiceItemCollection.reduce(function(memo,model)
      {
        return memo + model.get('quantity');
      }, 0);
    count; // 4

### Chaining a collection

If you want to perform several Underscore methods in a row, a good way of doing it is by chaining one method to the other method.

Let's consider a simple MapReduce example, which calculates the total amount.

    var amounts = invoiceItemCollection.map(function(model){
        return model.get('quantity') * model.get('price');
      });
    // [66, 77]
    var total_amount = _.reduce(amounts, function(memo, val){
        return memo + val;
      }, 0);
    total_amount; // 83

Here, amounts is a JavaScript array, and it does not provide the reduce() method that we can call. To solve this problem, we are calling the reduce() method provided by Underscore.js, which takes an array as the first parameter.

With chaining, it is possible to call one method right after another using the dot syntax. Here is an example.

    var amount = invoiceItemCollection.chain()
    .map(function(model)
      {
        return model.get('quantity') * model.get('price');
      })
    .reduce(function(memo, val)
      {
        return memo + val;
      })
    .value(); // 83

The `chain()` method wraps a value into an object, which provides different methods that can be executed, which return their result as a wrapped value. To unwrap a result, use the value() method.

### Running No SQL queries on a collection

There are more advanced ways of searching the models in a collection, which can be done with the help of a Backbone extension named Backbone Query. It allows running No SQL (such as MongoDB) queries for searching, sorting, and paging the models in a collection.

You can download the Backbone Query extension from its GitHub page by going to <https://github.com/davidgtonge/backbone_query>. To include this extension into your project, save the backbone-query.js file into the lib folder and include the reference to it in index.html.

1. To allow a No SQL query to be executed, extend a collection from the Backbone.QueryCollection object instead of a Backbone.Collection one.

        var BuyerCollection = Backbone.QueryCollection.extend({
            model: BuyerModel
        });

2. Run the query with the query() method.

        var result = buyerCollection.query({ firstName: 'John' });
        Optionally, run the pluck attribute from the resulting array.
        var resultCollection = new BuyerCollection(result);
        resultCollection.pluck('firstName'); // ["John", "John"]


Backbone.QueryCollection extends Backbone.Collection and provides the new query() method, which parses the base query into subqueries recursively and uses the reduce() method of Underscore.js to run queries of the same group sequentially.

Backbone Query is written initially in CoffeeScript and compiled into JavaScript later. So, if you are interested in understanding its source code, see backbone-query.coffee. It looks quite similar though.

#### Using standard operators

The following operators are common and applied to the attributes of the models stored in a collection.

- $equal

    This performs a strict equality test using ===.

        buyerCollection.query({ firstName: {$equal: 'John'} });

    If no operator is provided, and the query value is neither a regex nor an array, then $equal is assumed.

        buyerCollection.query({ firstName: 'John' });

- $ne

    This means not equal, which is the opposite of $equal, and returns all the models that are not equal to the query value.

        buyerCollection.query({ firstName: {$ne: 'John'} });

- $in

    An array of possible values can be supplied using $in; a model will be returned if any of the supplied values is matched.

        buyerCollection.query({ firstName: {$in: ['John', 'Joe','Patrick']} });

- $nin

    This means not in, which is the opposite of $in, and a model will be returned if none of the supplied values is matched.

        buyerCollection.query({ firstName: {$nin: ['Samuel', 'Victor']} });

- $exists or $has

    This checks for the existence of an attribute, and can be supplied as either true or false.
    
        buyerCollection.query({ middleName: {$exists: true} });
        buyerCollection.query({ middleName: {$has: false} });

#### Combining queries

Multiple queries can be combined together. There are the $and, $or, $nor, and $not operators, which we are going to learn shortly.

- $and

    This is a logical AND operator. The following query selects all the buyers named John and who live in Alexandria:

        buyerCollection.query({ $and: {firstName: 'John', city: 'Alexandria'}});

    The $and operator is used as a glue if no combining operator is supplied.

        buyerCollection.query({ firstName: 'John', city: 'Alexandria' });

- $or

    This is a logical OR operator. The following query selects all the buyers named John or whether the buyers live in Alexandria:

        buyerCollection.query({ $or: {firstName: 'John', city: 'Alexandria'}});

- $nor

This is the opposite of $or. The following query selects all the buyers with a name other than John or if they do not live in Alexandria:

        buyerCollection.query({ $nor: {firstName: 'John', city: 'Alexandria'}});

- $not

    This is the opposite of $and. The following query selects all buyers except anyone whose name is John and who lives in Alexandria:

        buyerCollection.query({ $not: {firstName: 'John', city: 'Alexandria'}});

#### Multiple queries on the same key

If we need to perform multiple queries on the same key, then we can supply the query as an array. The following query returns all the clients with the name John or Joe:

    buyerCollection.query({
        $or:[
          { firstName: 'John' },
          { firstName: 'Joe' }
        ]
      });

#### Sorting query results

To sort results by a property, we need to pass it with the sortBy key in a second argument. We can also specify the order by passing the asc or desc value with the sort key. By default, asc is assumed as the value. The following code shows how sorting is done:

    result = buyerCollection.query(
        { firstName: {$like: 'John'} },
        { sortBy: 'lastName', order: 'desc' }
      );
    resultCollection = new BuyerCollection(result);
    resultCollection.pluck('lastName'); // ["Smith", "Doe"]

#### Paging query results

There is a way to split a big result array on several pages and return a specified one. Let's see how it is done.

    buyerCollection.query({firstName: 'John'}, {limit:10, offset:1, page:2});

We can specify the following properties in the second parameter:

- limit: It limits the resulting array size to a given number. The first N elements are returned. It is a required property.
- page: It returns a specified resulting page. The page size is set by the limit property. It is an optional property.
- offset: It skips the first N result items. It is an optional property.

#### Caching results

For performance reasons, we may want to cache our results. This can greatly decrease the query execution time, especially if using paging, because unpaged results are saved in the cache and a user can quickly navigate through its pages.

To enable caching, simply use the cache property in the second parameter.

    buyerCollection.query({firstName: 'John'}, {limit:10, page:2, cache: true});

__Tips__

Caching is not set by default, because there is no automatic way to flush the cache, so when caching is enabled and the collection is being updated, the cache becomes outdated.

You should be aware of this problem, and manually perform cache flushing every time the collections or models in it are updated. This can be done by calling the reset_query_cache() method.

We can bind the collection's change event to the reset_query_cache() method, and thus, provide automatic cache flushing when the collection gets updated.

    var BuyerCollection = Backbone.QueryCollection.extend({
        initialize: function(){
          this.bind('change', this.reset_query_cache, this);
        }
      });

### Storing models of various types in the same collection

When building complex Backbone applications, you may need to work with models of different types, which should be processed in a similar way, so you may want them to be stored in the same collection. Fortunately, there is a `Backbone.Chosen` extension that allow us to do so.

You can find and download Backbone.Chosen from the following page: <https://github.com/asciidisco/Backbone.Chosen>. To include Backbone.Chosen into your project, save the backbone.chosen.js file into the lib folder and include the reference to it in index.html.

Let's say we have two different model classes, namely IndividualContactModel and OrganizationContactModel, and we want to organize them into a single collection. We can do this by performing the following steps:

1. Define models.

        var IndividualContactModel = Backbone.Model.extend
          ({
            name: function() {
              return this.get('firstName') + ' ' + this.get('lastName');
            }
          });

        var OrganizationContactModel = Backbone.Model.extend
          ({
            name: function() {
              return this.get('businessName') + ', '
              + this.get('businessType');
            }
          });

    As we can see, these models have different attributes, but share a common name() method.

2. Define collection with a chosen attribute.

        var ContactCollection = Backbone.Collection.extend({
            model: {
              // Pass chosen properties.
              chosen: {
                  // Attribute that should contain model type.
                  attr: 'type',

                  // Default model class.
                  defaults: IndividualContactModel,

                  // Mapping attribute values to model classes.
                  map: {
                    individual: IndividualContactModel,
                    organization: OrganizationContactModel
                  }
                }
              }
        });

3. Create a collection instance and specify the mapping attribute in the incoming JSON.

        var contactCollection = new ContactCollection([
            {
              firstName: 'John',
              lastName: 'Smith',
              type: 'individual'
            },
            {
              businessName: 'North American Veeblefetzer',
              businessType: 'LLC',
              type: 'organization'
            }
        ]);

4. Check the result. The newly added models to the collection should be the instance of the correct model class.

        contactCollection.at(0) instanceof IndividualContactModel;
        //true

        contactCollection.at(0).name(); // John Smith

        contactCollection.at(1) instanceof OrganizationContactModel;
        //true

        contactCollection.at(1).name();
        // North American Veeblefetzer, LLC

__Mapping deeply nested attributes__

Backbone.Chosen also supports nested attributes. You can specify the value for the attr property with a dot syntax, for example, options.type, if your incoming JSON looks like the following code:

    var contactCollection = new ContactCollection([
        {
          firstName: 'John',
          lastName: 'Smith',
          options: {type: 'individual'}
        },
        {
          businessName: 'North American Veeblefetzer',
          businessType: 'LLC',
          options: {type: 'organization'}
        }
    ]);

__Use a function to map the models__

Sometimes, we may need to use more complex calculations to map the models. This can be done with the help of the mapping function. Here is how it is done.

    // Set up a collection
    var ContactCollection = Backbone.Collection.extend({
      model: {
        chosen: function (rawData) {
          if (rawData.spice === 'salt') {
            return SaltyModel;
            }
          if (rawData.spice === 'sugar') {
            return SweetyModel;
            }
          return BoringModel;
          }
        }
    });

### Implementing a one-to-many relationship

A one-to-many relationship can be used if the association between a single model and a collection of models of another type takes place. In our invoice application, the relationship between InvoiceModel and InvoiceItemModel is one such relationship. InvoiceItem Model can be multiple and thus is stored in InvoiceItemCollection.

You can download the Backbone-relational extension from its GitHub page at <https://github.com/PaulUithol/Backbone-relational>. To include Backbone.Relational into your project, save the backbone-relational.js file into the lib folder and include the reference to it in index.html.

Implementation of a one-to-many relationship is similar to an implementation of a one-to-one relationship, except that we need to use Backbone.HasMany as a type and specify collectionType, because multiple models should be stored in the collection. We can do this by performing the following steps:

1. Extend the new model object from Backbone.RelationalModel.

        var InvoiceItemModel = Backbone.RelationalModel.extend
          ({
          });

2. Define the collection for this model type.

        var InvoiceItemCollection = Backbone.Collection.extend
          ({
            model: InvoiceItemModel
          });

3. Extend another model object from Backbone.RelationalModel and pass the relations property with a relationship definition.

        var InvoiceModel = Backbone.RelationalModel.extend({
            // Define one-to-many relationship.
            relations: [{
              // Relationship type
              type: Backbone.HasMany,

              // Relationship key in BuyerModel.
              key: 'items',
              // Related model.
              relatedModel: InvoiceItemModel,

              // Collection to store related models.
              collectionType: InvoiceItemCollection,

              // Define reverse relationship.
              reverseRelation: {
                key: 'invoice'
              }
            }]
        });

4. To initialize models with a one-to-many relationship, pass the invoice items' data in a single JSON when creating a new InvoiceModel object instance.

        var invoiceModel = new InvoiceModel({
            referenceNumber: '12345',
            date: '2012-09-01',
            items: [
              { description:'Wooden Toy House', price:22, quantity:3 },
              { description:'Farm Animal Set', price:17, quantity:1 }
            ]
        });

        invoiceModel.get('items').at(0).get('description');
        // Wooden Toy House

        invoiceModel.get('items').at(0).get('invoice').get('referenceNumber'); // 12345

5. Add new records into this relation with the help of the add() method when accessing the related collection using the items attribute.

        // Add new model to a collection
        invoiceModel.get('items').add
          ({
            description: 'Powerboat',
            price: 12,
            quantity: 1
        });

        invoiceModel.get('items').at(2).get('invoice') == invoiceModel;
        // true

    Or we can also create an instance of invoiceItemModel and set the invoice attribute with an instance of invoiceModel; thus, a new relation in both the directions will be created.

        // Add new model
        invoiceItemModel = new InvoiceItemModel
          ({
            description: 'Jet Ski',
            price: 12,
            quantity: 1,
            invoice: invoiceModel
          });

        invoiceModel.get('items').at(3).get('description');
        // Jet Ski

Each Backbone.RelationalModel registers itself with Backbone.Store upon creation, and is removed from Store when destroyed. When creating or updating an attribute that is a key in a relation, the removed related objects are notified of their removal, and new related objects are looked up in Store.

__Implementing a many-to-many relationship__

There is no way to create a many-to-many relationship between two models out of the box, but it can be easily done with the help of a pair of one-to-many relationships between those models and a new intermediate model.

__Exporting related models to JSON__

When exporting a model to JSON, it does include related models. This is how we can export InvoiceModel to JSON.

    JSON.stringify(invoiceModel.toJSON());

And here is a result of such an export.

    {
      "referenceNumber":"12345",
      "date":"2012-09-01",
      "items":[
        {
          "description":"Wooden Toy House","price":22,"quantity":3
        },
        {"description":"Farm Animal Set","price":17,"quantity":1},
        {"description":"Powerboat","price":12,"quantity":1},
        {"description":"Jet Ski","price":12,"quantity":1}
      ]
    }

This is how we can export the InvoiceItemModel model.

JSON.stringify(invoiceModel.get('items').at(0).toJSON())
And the result is the following code snippet:

    {
      "description":"Wooden Toy House",
      "price":22,
      "quantity":3,
      "invoice":{includeInJSON
        "referenceNumber":"12345",
        "date":"2012-09-01",
        "items":[
          null,
          {
            "description":"Farm Animal Set","price":17,
            "quantity":1
          },
          {"description":"Powerboat","price":12,"quantity":1},
          {"description":"Jet Ski","price":12,"quantity":1}
        ]
      }
    }

As we can see, the toJSON() method also exports reversed relationships, but we can control the attributes of the related models that need to be exported by specifying an array of such attributes in the includeInJSON property for direct and reverse relationships.

    var InvoiceModel = Backbone.RelationalModel.extend({
        relations: [{
          type: Backbone.HasMany,
          key: 'items',
          relatedModel: InvoiceItemModel,
          collectionType: InvoiceItemCollection,

          // Restrict related models properties when exporting
          // to JSON.
          includeInJSON: ['description', 'price', 'quantity'], 

          reverseRelation: {
            key: 'invoice',

            // Restrict related models properties when exporting
            // to JSON for reversed relations.
            includeInJSON: ['referenceNumber', 'items'],
          }
        }]
    });

## View

### Rendering a view

1. Define a new view by extending the Backbone.View object:
      
        var InvoiceItemView = Backbone.View.extend({

            // HTML element name, where to render a view.
            el: 'body',

            // Initialize view object values.
            initialize: function() {
              this.html = 'Description: Wooden Toy House. ' +
                'Price: $22. Quantity: 3.'
            },

            // Render view.
            render: function() {
              // Set html for the view element using jQuery.
              $(this.el).html(this.html);
            }
        });

2. Create an instance of the view:
    
        var invoiceItemView = new InvoiceItemView();

3. Call the render() method manually to output HTML code to the user:
    
        invoiceItemView.render();

In the initialize() method of the view, we generate the HTML code and save it in the html property, which we have been using lately in the render() method, where we assign this code to the HTML container defined by the el property. To do so, we invoke jQuery functions, such as $() and html().

When a new view instance is created, the initialize() method is triggered automatically. Additionally, we can pass any standard property to the view from outside of the object when creating its instance. It can be done with the help of the following code snippet:

    var invoiceItemView = new InvoiceItemView({
      el: 'body'
    });

The el property can also be defined as a function if we want it to be calculated dynamically.

When the render() method is called, it runs our code that then renders the view.

#### Creating a new HTML element associated with a view

Sometimes, we may not want to render a view into the existing HTML element in the DOM tree; instead, we may want to create a new one and then add it to the document. Follow the given steps to create a new HTML element associated with a view.

1. Define a view and set its elements and attributes manually by assigning values to the tagName, className, and attributes properties:
  
      // Define new view.
      var InvoiceItemView2 = Backbone.View.extend({
        // Set tag name and its attributes.
        tagName: 'p',
        className: 'item',
        attributes: {
          'align': 'left'
        },

        // Initialize view object values.
        initialize: function() {
          this.html = 'Farm Animal Set. Price: $17. Quantity: 1.'
        },

        // Render view.
        render: function() {

          // Set html for the view element using jQuery.
          $(this.el).html(this.html);
        }
      });

2. Create a new view instance. When doing this, Backbone will automatically assign el with an appropriate value:
    
        // Create new view instance.
        var invoiceItemView2 = new InvoiceItemView2();

        invoiceItemView2.el; // <p align="left" class="item"></p>

3. Render this view. Our render code will create a new HTML object:
    
        invoiceItemView2.render();

4. Insert the newly created HTML object into the DOM:
    
        $('body').append(invoiceItemView2.el);

5. Check the result. The body of our HTML page should contain a code like the following code snippet:

        <body>
            <p align="left" class="item">
                Farm Animal Set. Price: $17. Quantity: 1.
            </p>
        </body>

#### Changing the view element dynamically

We may want to change the view element during the working of our code. This could be done with the help of a setElement() method. Both of the following are valid.

    // Change existing element to the new one.
    InvoiceItemView.setElement('li');

    // Change existing element to the one already exists
    // in the DOM tree.
    InvoiceItemView.setElement($('body div'));

When calling the setElement() method, Backbone undelegates events assigned to a previous element, and assigns them to a new element.

#### Removing a view

When we have finished working with a view and want to remove it, we also need to remove its elements from the DOM and stop listening to events. To do this, we simply need to call the remove() method.

### Dealing with a view element using jQuery

Backbone.js relies on jQuery when dealing with a view.

Follow the given steps to deal with a view element using jQuery.

1. To access a view element with jQuery, use $(this.el):

        $(this.el).show();

2. Use this.$el as a shortened alias for $(this.el):

        this.$el.appendl('<li>An item</li>');

3. To run a query within the scope of a view, use this.$el.find():

        this.$el.find('li').html('Hey there');

4. Use this.$() as a shortened alias for this.$el.find():

        this.$el('li').addClass('highlighted');

Backbone integrates with the jQuery library as well as with Zepto.js and Ender.js. When Backbone is loaded, it determines which library is used and assigns a reference to it in the form of the Backbone.$ variable.

There are a couple of aliases, such as this.$el and this.$(), that simplify access to the library.

Zepto is a minimalist JavaScript library that is 99 percent compatible with jQuery. The design goal of Zepto was to have a small-sized library and faster execution rate, which can be achieved by supporting modern browsers only. As a result, Zepto works much faster on mobile devices.

To use Zepto with Backbone, you need to perform the following steps:

Download the library from <http://zeptojs.com> and include it in the lib folder of your project.

Include Zepto in the index.html file instead of in jQuery.
  
    <script src="lib/zepto.js"></script>

### Rendering a model in a view

Define a new model:
  
    var InvoiceItemModel = Backbone.Model.extend({

    });

Define a view that will render this model:
  
    var InvoiceItemView = Backbone.View.extend({

        // HTML element name, where to render a view.
        el: 'body',

        // Render view.
        render: function() {
          var html = 'Description: ' +
            this.model.get('description') + '. ' +
            'Price: ' + this.model.get('price') + '. ' +
            'Quantity: ' + this.model.get('quantity') + '.';

          // Set html for the view element using jQuery.
          $(this.el).html(html);
        }
    });

Create a model instance:

    var invoiceItemModel = new InvoiceItemModel({
      description: 'Farmer Figure',
      price: 8,
      quantity: 1
    });

Create a view instance and pass the model to it as a parameter:

    var invoiceItemView = new InvoiceItemView({
      
      // Pass model as a parameter to a view.
      model: invoiceItemModel
    });

Render the view:

    invoiceItemView.render();


When initializing a new view object, we pass a model object to the view that is added to its property array by Backbone. In any method of this view, the assigned model can be made available by using the this.model property.

### Rendering a collection in a view

Define a model:

    var InvoiceItemModel = Backbone.Model.extend({

    });

Define a collection:

    var InvoiceItemCollection = Backbone.Collection.extend({
        model: InvoiceItemModel
    });

Define a view:

    var InvoiceItemListView = Backbone.View.extend({

      // HTML element name, where to render a view.
      el: 'body',

      // Render view.
      render: function() {
        var html = '';
        _.each(this.collection.models,function(model,index,list) {    
          var item_html = 'Description: ' +
            model.get('description') + '. ' +
            'Price: ' + model.get('price') + '. ' +
            'Quantity: ' + model.get('quantity') + '.';
          html = html + '<li>' + item_html + '</li>';
        });

        html = '<ul>' + html + '</ul>';

        // Set html for the view element using jQuery.
        $(this.el).html(html);
      }
    });


Create a collection instance:

    var invoiceItemCollection = new InvoiceItemCollection([
      { description: 'Wooden Toy House', price: 22, quantity: 3 },
      { description: 'Farm Animal Set', price: 17, quantity: 1 },
      { description: 'Farmer Figure', price: 8, quantity: 1 },
      { description: 'Toy Tractor', price: 15, quantity: 1 }
    ]);

Create a view instance:

    var invoiceItemListView = new InvoiceItemListView({

      // Pass model as a parameter to a view.
      collection: invoiceItemCollection
    });

Render a view:

    invoiceItemListView.render();

### Splitting a view into subviews

Make sure you have the model and the collection definition:

    var InvoiceItemModel = Backbone.Model.extend({

    });
    var InvoiceItemCollection = Backbone.Collection.extend({
        model: InvoiceItemModel
    });

Define a view for rendering a single model:
  
    // Define new view to render a model.
    var InvoiceItemView = Backbone.View.extend({

        // Define element tag name.
        tagName: 'tr',

        // Render view.
        render: function() {

          // Add cells to the table row.
          $(this.el).html(_.map([
            this.model.get('quantity'),
            this.model.get('description'),
            this.model.get('price'), this.model.calculateAmount(),
          ], function(val, key){
            return '<td>' + val + '</td>'
          }));

          return this;
        }
    });

Define a view for rendering a collection:

    // Define new view to render a collection.
    var InvoiceItemListView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'table',

    // Define element class name.
    className: 'invoice-item-view',

    // Render view.
    render: function() {

      $(this.el).empty();

      // Append table with a table header.
      $(this.el).append($('<tr></tr>').html(
        _.map(['Quantity', 'Description', 'Price', 'Total'], 
          function(val, key){
            return '<th>' + val + '</th>'
        })
      ));

      // Append table  with a row.
      $(this.el).append(
        _.map(this.collection.models, function(model, key) {
          return new InvoiceItemView({
            model: model
          }).render().el;
        })
      );

      return this;
    }
    });

Define a view for rendering a whole page.

    var InvoiceItemListPageView = Backbone.View.extend({

        // Render whole page view.
        render: function() {
          $(this.el).html(new InvoiceItemListView({
            collection: this.collection
          }).render().el);
        }
    });

Create and initialize a collection instance with data.

    var invoiceItemCollection = new InvoiceItemCollection([
      { description: 'Wooden Toy House', price: 22, quantity: 3 },
      { description: 'Farm Animal Set', price: 17, quantity: 1 },
      { description: 'Farmer Figure', price: 8, quantity: 1 },
      { description: 'Toy Tractor', price: 15, quantity: 1 }
    ]);

Create a view instance for a whole page and render it.

    new InvoiceItemListPageView({
      collection: invoiceItemCollection,
      el: 'body'
    }).render();

### Handling Document Object Model (DOM) events in a view

Apply the following changes to InvoiceItemView that we created in the previous recipe.

Define a view:

    // Define new view to render a model.
    var InvoiceItemView = Backbone.View.extend({

        // Define tag name.
        tagName: 'tr',
    });

Introduce a rendering function when the user is viewing an item:

    renderViewMode: function() {
     $(this.el).html(_.map([
        this.model.get('quantity'),
        this.model.get('description'),
        this.model.get('price'),
        this.model.calculateAmount(),
        '<button class="edit">Edit</button>'
      ], function(val, key){
        return '<td>' + val + '</td>'
      }));
    },

Introduce a rendering function when the user is editing an item:

    renderEditMode: function() {
      $(this.el).html(_.map([
        '<input class="quantity" value="' + 
          this.model.get('quantity') + '">',
        '<input class="description" value="' + 
          this.model.get('description') +
        '">',
        '<input class="price" value="' + 
          this.model.get('price') + '">',
        this.model.calculateAmount(),
        '<button class="save">Save</button>' +
        '<button class="cancel">Cancel</button>'
      ], function(val, key){
        return '<td>' + val + '</td>'
      }));
    },

Set a property that will contain a function name that will be called on rendering the view:
    
    renderCallback: 'renderViewMode',

    render: function() {
      this[this.renderCallback]();

      return this;
    },

Map the DOM events to the handlers:

    events: {
      'click button.edit': 'edit',
      'click button.save': 'save',
      'click button.cancel': 'cancel',
    },

Define the event handlers:

    // Edit button click handler.
    edit: function() {
      this.renderCallback = 'renderEditMode';

      this.render();
    },

    // Save button click handler.
    save: function() {
      this.model.set({
        quantity: $(this.el).find('input.quantity').val(),
        description: 
          $(this.el).find('input.description').val(),
        price: $(this.el).find('input.price').val(),
      });

      this.renderCallback = 'renderViewMode';

      this.render();
    },

    // Cancel button click handler.
    cancel: function() {
      this.renderCallback = 'renderViewMode';

      this.render();
    }

Create and initialize a collection instance with data:

    var invoiceItemCollection = new InvoiceItemCollection([
      { description: 'Wooden Toy House', price: 22, quantity: 3 },
      { description: 'Farm Animal Set', price: 17, quantity: 1 },
      { description: 'Farmer Figure', price: 8, quantity: 1 },
      { description: 'Toy Tractor', price: 15, quantity: 1 }
    ]);

Create a view instance for a whole page and render it:

    new InvoiceItemListPageView({
      collection: invoiceItemCollection,
      el: 'body'
    }).render();

![backbone_view_table.jpg](http://johnnyimages.qiniudn.com/backbone_view_table.jpg)

By defining the event property, we can tell Backbone how to map events to the handlers. To do so, we will use the following syntax:

    {"event selector": "callback"}

Backbone.js uses jQuery's on() function to provide declarative callbacks for DOM events within a view. If the selector value is not given, the view's root element (this.el) is assumed.

__Delegating and undelegating events manually__

In some cases, we may need a view to start handling DOM events manually from a specific place in the program. This can be done by calling the delegateEvents() method. It accepts a hash table of event names and their callbacks. If no parameter is given, this.events is used.

If we need a view to stop handling DOM events, we should call the undelegateEvents() method. This can be useful when we hide the view temporarily and need to ensure that no unexpected behavior is caused by the DOM events.

### Switching views using Backbone.Router

We are going to build a Backbone application that will dynamically render an appropriate view on the URL, as well as change and remove the view that was shown tothe user previously in order to prevent a memory leak. The views are going to be switched without a page reload, because Backbone.Router supports hash URLs and pushState.

Let's assume that we already have a model, a collection, and view objects defined. Follow the given steps to create a router that switches views.

Define a router object and its routes:
    var Workspace = Backbone.Router.extend({

    // Define routes
    routes: {
      '': 'invoiceList',
      'invoice': 'invoiceList',
      'invoice/:id': 'invoicePage',
    }

Create a new collection instance in the initialize() method in the router object:

    initialize: function() {

      //  Create collection
      this.invoiceCollection = new InvoiceCollection([
        { referenceNumber: 1234},
        { referenceNumber: 2345},
        { referenceNumber: 3456},
        { referenceNumber: 4567}
      ]);
    }

Define routing callbacks in the router object:

    invoiceList: function() {
      this.changeView(new InvoiceListView({
        collection: this.invoiceCollection
      }));
    },

    invoicePage: function(id) {
      this.changeView(new InvoicePageView({
        model: this.invoiceCollection.get(id)
      }));
    }

Define a changeView() method in the router object that will help us change the current view:

    changeView: function(view) {
        if (this.currentView) {
            if (this.currentView == view) {
              return;
            }

                this.currentView.remove();
            }

            $('body').append(view.render().el);

            this.currentView = view;
        }
    });

Create a router instance and run the Backbone.history.start() method to start our application:

    new Workspace();
    Backbone.history.start();

Many interesting things are happening in the changeView() method. Just for our assurance, we check if the current view is not the one to which we are going to switch and then remove. While removing a view, all the events handled by it need to be unbound, and the corresponding HTML elements removed from the DOM tree. Then, we render a new view and append its element to the body.

Removing previously used views helps us to avoid memory leaks, which can happen when the application is used continuously for a very long time.

## Events and Bindings

### Managing events

Backboneprovides a unified way for triggering and handling events in otherBackbone objects, such as Model, Collection, View, and Router. This becomes possible due to the Backbone.Events object, which provides this functionality and thus can be mixed to any object, including your own.

Perform the following steps to handle object events.

1. Define a new object.
	
		object1 = {};

2. Mix Backbone.Events to your object.

		_.extend(object1, Backbone.Events);

3. Define a callback function.

		var hello = function(msg) {
		  alert("Hello"+ msg);     
		}

4. Bind the callback using the on() method.

		object1.on("handshake", hello);

	Alternatively, you can use the once() method to fire the callback once before it is unbound.

		object1.once("handshake", hello);

5. Trigger an event by calling the trigger() method.

		object1.trigger("handshake", "world!");

#### Unbinding callback from the event

To unbind callbacksfrom the event, we need to use the off() method. The following line of code will unbind a specific callback we set previously.

    object1.off("handshake", hello);

To unbind all callbacks from the event, skip the second parameter.

    object1.off("handshake");

To unbind a specific callback from all events, skip the first parameter.

    object1.off(null, hello);

To unbind all callbacks from all events, skip both parameters.

    object1.off();

#### Listening to events on other objects

To listen toevents on other objects, we can use thelistenTo() method.

    object2.listenTo(object1, 'handshake', object2.hello);

It works similar to the on() method, but its advantage is that it allows us to keep a track of the events, and they can be removed all at once later on.

    object2.stopListening(object1);

To stop listening to all objects, run the stopListening() method without parameters.

    object2.stopListening();

### Handling events of Backbone objects

All Backbone objects implement `Backbone.Events`, and some of them provide built-in events, to which your objects can listen.

For example, a `change` event is fired when a model is changed. Especially for this event, there are several methods in `Backbone.Model` that can be used in the `change` event callback. In this recipe, we are going to learn how to use them.

Perform the following steps to handle model events.

1. Create a new model instance.

	  var model = new Backbone.Model({
	    firstName: 'John',
	    lastName: 'Doe',
	    age: 20,
	  });

2. Bind the callback to the change event.

	  model.on('change', function(model) {

	  }

3. Use the hasChanged() method in the event callback to check if the specific attribute has been changed since the last change event.

	    model.hasChanged("age"); // true
	    model.hasChanged("firstName"); // false

4. Use the changedAttributes() method in the event callback to obtain changed attributes' hash.

	    model.changedAttributes(); // Object {age: 21}

5. Use the previous() method in the event callback to get the value of the previous attribute.

	    model.previous('age'); // 20

6. Use the previousAttributes() method in the event callback to get the hash of the previous attributes.

	    model.previousAttributes();
	      // Object {firstName: "John", lastName: "Doe", age: 20}

7. Change a model attribute to trigger the change event.

	    model.set('age', 21);

#### Avoiding event triggering when working with Backbone objects

There is a way to avoid event triggering when working with Backbone events. This can be helpful if you want to update object properties without making event callbacks know about this fact.

For example, you can pass {silent: true} when updating model values.

    model.set('age', 22, {silent: true});

The following line of code is also valid:

    model.set({ age: 25 }, {silent: true});

#### Using built-in events

The following eventsare used with model objects:

* **change** (model, options): Itisfired when a model's attributes have changed
* **change:[attribute]** (model, value, options): It isfired whena specific attribute has been updated
* **destroy** (model, collection, options): It isfiredwhen a model is destroyed
* **invalid** (model, error, options): Itis fired when amodel's validation fails on the client
* **error** (model, xhr, options): It isfired when a model's savecall fails on the server
* **sync** (model, resp, options): It isfired when a model hasbeen successfully synced with the server

The following events are used with collections:

* **add** (model, collection, options): It isfired when a model isadded to a collection
* **remove** (model, collection, options): Itis firedwhen a model is removed from a collection
* **reset** (collection, options): It isfired when the entirecontent of the collection has been replaced
* **sort** (collection, options): Itis fired when the collectionhas been re-sorted
* **sync** (collection, resp, options): Itis fired when a collectionhas been successfully synced with the server

The following events are used with the router object:

* **route:[name]** (params): Itis firedbythe router when aspecific route is matched
* **route** (router, route, params): It is fired by history (or router) when any route has been matched

The following events are triggered when storage operations are performed:

* **route:[name]** (params): It is fired by the router when a specific route is matched
* **route** (router, route, params): It is fired by history (or router) when any route has been matched

To handleany triggered event, use the special event `all`.

### Binding a model to a view

The view which we are going to implement will be rendered as shown in the following screenshot:

![Binding a model to a view](http://johnnyimages.qiniudn.com/backbone-event-view1.jpg)

In the browser console, we can modify the model values, thus the change event is triggered and the view is re-rendered.

![Binding a model to a view](http://johnnyimages.qiniudn.com/backbone-event-view2.jpg)

Perform the following steps to bind a model to a view.

1. Define a new model.
  
		var InvoiceItemModel = Backbone.Model.extend({

		});

2. Define a view that renders this model.
  
		var InvoiceItemView = Backbone.View.extend({

		// HTML element name, where to render a view.
		el: 'body',

		// Render view.
		render: function() {
		  var html = 'Description: ' + 
		    this.model.get('description') + '. ' +
		    'Price: ' + this.model.get('price') + '. ' +
		    'Quantity: ' + this.model.get('quantity') + '.';
		  // Set html for the view element using jQuery.
		  $(this.el).html(html);
		}
		});

3. Bind the model to InvoiceItemView in the initialize() method.

	    initialize: function() {
	      this.listenTo(this.model, 'change', this.render, this);
	    }

4. Create the model instance.
	    
	    var invoiceItemModel = new InvoiceItemModel({
	      description: 'Farmer Figure',
	      price: 8,
	      quantity: 1
	    });

5. Create a view instance and pass model to it as a parameter.

	    var invoiceItemView = new InvoiceItemView({
	      
	      // Pass model as a parameter to a view.
	      model: invoiceItemModel
	    });

6. Render the view.

	    invoiceItemView.render();

To check how binding works, export the model to be a global variable, so we can update model values in a browser console.

	window.invoiceItemModel = invoiceItemModel;

### Binding a collection to a view

Perform the following steps to bind a collection to a view.

Make sure you have the model and collection definitions.

	var InvoiceItemModel = Backbone.Model.extend({

	});

	var InvoiceItemCollection = Backbone.Collection.extend({
	model: InvoiceItemModel
	});

Define a view for rendering a single model.

	  // Define new view to render a model.
	  var InvoiceItemView = Backbone.View.extend({
	    
	    // Define element tag name.
	    tagName: 'tr',

	    // Render view.
	    render: function() {

	      // Add cells to the table row.
	      $(this.el).html(_.map([
	        this.model.get('quantity'),
	        this.model.get('description'),
	        this.model.get('price'), this.model.calculateAmount(),
	      ], function(val, key){
	        return '<td>' + val + '</td>'
	      }));

	      return this;
	    }
	  });

In the initialize() method of the InvoiceItemView object, bind callback to handle the destroy event of the model.

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.destroy, this);
    }

Add the destroy() method, which removes the view bound to a model.

    destroy: function() {
      this.remove();
    }

Define a view for rendering a collection.

	// Define new view to render a collection.
	var InvoiceItemListView = Backbone.View.extend({

	// Define element tag name.
	tagName: 'table',

	// Define element class name.
	className: 'invoice-item-view',

	// Render view.
	render: function() {

	  $(this.el).empty();

	  // Append table with a table header.
	  $(this.el).append($('<tr></tr>').html(
	    _.map(['Quantity', 'Description', 'Price', 'Total'], 
	      function(val, key){
	        return '<th>' + val + '</th>'
	      }
	    )
	  ));

	  // Append table  with a row.
	  _.each(this.collection.models, function(model, key) {
	    this.append(model);
	  }, this);

	  return this;
	},

	// Add invoice item row to the table.
	append: function(model) {
	  $(this.el).append(
	    new InvoiceItemView({ model: model }).render().el
	  );
	}
	});

Here we used the append() method, which adds InvoiceItemView into the output table. We will use this method later on.

In the initialize() method of the InvoiceItemListView object, bind the callback to handle the add event of the collection.

    initialize: function() {
      this.listenTo(
        this.collection, 'add', this.append, this
      );
    },

Here we have called the same append() method.

1. Define the view with Add and Remove controls.
  
		  var InvoiceItemListControlsView = Backbone.View.extend({
		    render: function() {
		      var html = 
		        '<br><input id="add" type="button"' value="Add" id>' +
		        ' <input id="remove" type="button" value="Remove">';

		      $(this.el).html(html);

		      return this;
		    },

		    // Handle HTML events.
		    events: {
		      'click #add': 'addNewInvoiceItem',
		      'click #remove': 'removeInvoiceItem',
		    },

		    // Add button handler.
		    addNewInvoiceItem: function() {
		      var description = prompt('Enter item description', '');
		      var price = prompt('Enter item price', '0');
		      var quantity = prompt('Enter item quantity', '1');

		      this.collection.add([{
		        description: description,
		        price: price,
		        quantity: quantity
		      }]);
		    },

		    // Remove button handler.
		    removeInvoiceItem: function() {
		      var position =
		        prompt('Enter position of item to remove', '');

		      model = this.collection.at(position);
		      model.destroy();
		    }
		  }); 

2. Define a view for rendering a whole page.
  
		var InvoiceItemListPageView = Backbone.View.extend({

		// Render whole page view.
		render: function() {
		  $(this.el).html(new InvoiceItemListView({
		    collection: this.collection
		  }).render().el);

		  $(this.el).append(new InvoiceItemListControlsView({
		    collection: this.collection
		  }).render().el);
		}
		});

3. Create and initialize the collection instance with data.

		var invoiceItemCollection = new InvoiceItemCollection([
		  { description: 'Wooden Toy House', price: 22, quantity: 3 },
		  { description: 'Farm Animal Set', price: 17, quantity: 1 }
		]);

4. Create the whole page view instance and render it.
    
	    new InvoiceItemListPageView({
	      collection: invoiceItemCollection,
	      el: 'body'
	    }).render();

When a new model is added to the collection, the `add` event is fired, and the model is rendered as a table row and appended to the table.

When a model is destroyed, the `destroy` event is fired, and a view corresponding to this model is removed, also a view element is removed from a DOM tree.

### Bidirectional binding with Backbone.stickit

In Backbone.js, we can bind a model to a view out of the box, but it is not easy to make binding in reverse direction without the need to parse values of HTML elements.

In this recipe, we will speak about the Backbone.stickit extension, which allows developers to implement bidirectional binding of the model properties and view elements in a simple and native Backbone.js way.

Among many similar extensions, `Backbone.stickit` stands out by its perfect documentation, simplicity, and the great advantage that it gives to application developers. It was written in New York Times not so long time ago, and its popularity is being growing day-by-day. It is definitely one of the coolest extensions for Backbone.js.

You can download the `Backbone.stickit` extension from the GitHub page <https://github.com/nytimes/backbone.stickit>. To include this extension into your project, save the backbone.stickit.js file into the lib folder of your project and include the reference to this file in `index.html`.

Perform the following steps to perform a bidirectional binding.

1. Make sure you have a model defined.
  
		var InvoiceItemModel = Backbone.Model.extend({

		});

2. Define the form view.
  
		var InvoiceItemFormView = Backbone.View.extend({

		// Define class name of view element.
		className: 'invoice-item-form-view',
		});

3. Add the bindings hash to the view.
   
	    bindings: {
	      '#description': 'description',
	      '#price': 'price',
	      '#quantity': 'quantity'
	    }

	Here we used short binding definition, which acts as an alias for the detailed definition shown in the next snippet.

	    bindings: {
	      '#description': { observe: 'description' },
	      '#price': { observe: 'price' },
	      '#quantity': { observe: 'quantity' }
	    }

4. Add the render() method to the view and call this.stickit() after rendering.

	    render: function() {
	      var html = '<label>Description:</label>' + 
	        '<input type="text" id="description"></input><br>' +
	        '<label>Price:</label>' +
	        '<input type="text" id="price"></input><br>' +
	        '<label>Quantity:</label>' +
	        '<input type="text" id="quantity"></input><br>';

	      // Set html for the view element using jQuery.
	      $(this.el).html(html);

	      // Here binding occurs.
	      this.stickit();

	      return this;
	    }

5. Define the other view in a similar way.
	  
		var InvoiceItemView = Backbone.View.extend({

		// Define class name of view element.
		className: 'invoice-item-view',

		// Bind HTML elements to the view model.
		bindings: {
		  '#description': 'description',
		  '#price': 'price',
		  '#quantity': 'quantity'
		},

		// Render view.
		render: function() {
		  var html = 'Description:' +
		    '<span id="description"></span>, ' +
		    'Price:  <span id="price"></span>, ' +
		    'Quantity:  <span id="quantity"></span>.';

		  // Set html for the view element using jQuery.
		  $(this.el).html(html);

		  // Here binding occurs.
		  this.stickit();

		  return this;
		},
		});

6. Create a new model instance.

	    var invoiceItemModel = new InvoiceItemModel({
	      description: 'Farmer Figure',
	      price: 8,
	      quantity: 1
	    });

7. Append both views to the HTML body.

	    $('body').append(new InvoiceItemView({
	      model: invoiceItemModel
	    }).render().el);
	    $('body').append(new InvoiceItemFormView({
	      model: invoiceItemModel
	    }).render().el);

Whenever the `stickit()` method is called, the stickit extension initializes `innerHTML` of the HTML elements, which we have defined in the bindings hash. Because of such initialization, Stickit lets us to keep our templates clean, and we don't need to pass model values into the `html` variable manually when rendering the view.

For the `InvoiceItemView` view, one-way binding is configured (model to view), so every time model properties get changed, the corresponding HTML elements are updated.

For the `InvoiceItemFormView` view, Stickit sets up two-way binding (model to view and then, view to model), connecting and reflecting changes in the view elements with changes in bound model attributes.

This section describes advanced usageof the Backbone.stickit extension: overriding model getters and setters, overriding view element updates, and listening to a specific HTML event.

#### Overriding model getters and setters

Whengetting or settingproperties of a model bound to our view, we can override the getting or setting behavior by specifying the onGet and onSet callbacks.

     bindings: {
      '#price': {
        observe: 'price',
        onGet: 'priceGetter',
        onGet: 'priceSetter'
      }
    },
    priceGetter: function(val, options) { 
      return '$ ' + val; 
    },
    priceSetter: function(val, options) { 
      return Number(val.replace(/[^0-9\.]+/g, ''));
    }

#### Overriding view element updates

Thereare different ways inwhich we can override and customize view element updates. We can specify an update callback, which is triggered when an HTML element gets updated or we can specify afterUpdate callback, which will be executed afterwards.

    bindings: {
      '#price': {
        observe: 'price',
        update: function($el, val, model, options) { 
          $el.val(val);
        }
        afterUpdate: 'highlight',
      },
      },
      highlight: function($el, val, options) { 
        $el.animate({ backgroundColor: "#ff9999" }, "fast")
          .animate({ backgroundColor: "#ffffff" }, "fast");
      } 
    }

There is another way in which we can override value update for the view element by specifying updateMethod. By default it uses the text method, but we can change its value to html. If the html method is used, and we want to escape model values before assigning it to an HTML element, we can set the escape option to true.

    bindings: {
      '#price': {
        observe: 'price',
        updateMethod: 'html',
        escape: true
      }
    }

#### Listening to a specific HTML event

By default,for a textbox,textarea and other content-editable HTML elements, the Backbone.stickit extension listens to the following events, keyup, change, cut, and paste. For other elements, the Backbone.stickit extension listens to the change event.

However, there is a way to override this setting by specifying the events array.

    bindings: {
      '#price': {
        observe: 'price',
        events: ['blur'],
      },
    }

In this case,view-to-modelbinding will occur on the blur event of the #price textbox.

## Reference

### Tutorial

- [Embracing Command Line Tooling with Backbone Applications](http://javascriptplayground.com/blog/2014/03/command-line-backbone-yeoman/)
- [7 Battle tested Backbone.js rules for amazing web apps](http://geeks.bizzabo.com/7-battle-tested-backbonejs-rules-for-amazing-web-apps)