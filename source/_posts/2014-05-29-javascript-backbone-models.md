---
layout: post
title: "Backbone Models"
category: JavaScript
tags: [javascript]
--- 

> 本文为读 [Backbone.js Cookbook](http://www.salttiger.com/backbone-js-cookbook/) 的读书笔记。

In Backbone.js, a model is defined by extending its instance from the Backbone.Model object. In this recipe, we are going to learn how to work with models in Backbone.js.

## Creating a Model

Perform the following steps to define a new model object and create its instance:

Define a model by extending Backbone.Model.

	var InvoiceItemModel = Backbone.Model.extend({

	});

<!--more-->

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

## Operating with model attributes

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

## Operating with the model identifier

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

## Validating model attributes

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

## Using advanced validation in a model

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

## Validating an HTML form

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

## Working with nested attributes in a model

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

### Working with a nested array of attributes

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

### Binding callbacks to an events

When binding a callback to an event, you can use the same dot and bracket syntax as described previously. Let's check out the following example of binding a callback to an event:

    buyerModel.bind('change:addresses[0].city', function(model, value){
      console.log(value);
    });

    buyerModel.set('addresses[0].city', 'Chicago');

Moreover, Backbone-Nested provides additional add:* and remove:* events for handling array update events.

## Overriding getters and setters

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

### Overriding getter and setter of an existing attribute

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

### Handling mutators events

You can bind callback to the mutators:set:* event. Here is how it is done:

    buyerModel3.on('mutators:set:fullName',
      function (a, b, c, d) {
        console.log('mutators:set:fullName is triggered');
    });

    buyerModel3.set({
      fullName: 'Mister Y'
    });

## Creating undo points to store/restore a model's state

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

### Restoring from the first state in the stack

Sometimes,it is required to reset a model to the state in which it was first saved in the stack, no matter how many states were saved after. This can be done using the restart() method.

    invoiceItemModel3.restart();

### Ignoring attributes from being restored

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

### Working with collections

The Memento extension also allows to extend a collection with Memento functionality. It provides the same methods when working with collections store(), restore(), and restart().

## Implementing workflow for a model

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

### Binding callbacks to transition events

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

## Implementing a one-to-one relationship

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

## Tutorial

- [Embracing Command Line Tooling with Backbone Applications](http://javascriptplayground.com/blog/2014/03/command-line-backbone-yeoman/)
- [7 Battle tested Backbone.js rules for amazing web apps](http://geeks.bizzabo.com/7-battle-tested-backbonejs-rules-for-amazing-web-apps)