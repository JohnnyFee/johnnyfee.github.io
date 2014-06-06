---
layout: post
title: "Backbone Events"
category: JavaScript
tags: [javascript,backbone,mvc]
--- 

> 本文为读 [Backbone.js Cookbook](http://www.salttiger.com/backbone-js-cookbook/) 的读书笔记。

## Managing events

Backboneprovides a unified way for triggering and handling events in otherBackbone objects, such as Model, Collection, View, and Router. This becomes possible due to the Backbone.Events object, which provides this functionality and thus can be mixed to any object, including your own.

Perform the following steps to handle object events.

<!--more-->

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

### Unbinding callback from the event

To unbind callbacksfrom the event, we need to use the off() method. The following line of code will unbind a specific callback we set previously.

    object1.off("handshake", hello);

To unbind all callbacks from the event, skip the second parameter.

    object1.off("handshake");

To unbind a specific callback from all events, skip the first parameter.

    object1.off(null, hello);

To unbind all callbacks from all events, skip both parameters.

    object1.off();

### Listening to events on other objects

To listen toevents on other objects, we can use thelistenTo() method.

    object2.listenTo(object1, 'handshake', object2.hello);

It works similar to the on() method, but its advantage is that it allows us to keep a track of the events, and they can be removed all at once later on.

    object2.stopListening(object1);

To stop listening to all objects, run the stopListening() method without parameters.

    object2.stopListening();

## Handling events of Backbone objects

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

### Avoiding event triggering when working with Backbone objects

There is a way to avoid event triggering when working with Backbone events. This can be helpful if you want to update object properties without making event callbacks know about this fact.

For example, you can pass {silent: true} when updating model values.

    model.set('age', 22, {silent: true});

The following line of code is also valid:

    model.set({ age: 25 }, {silent: true});

### Using built-in events

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

## Binding a model to a view

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

## Binding a collection to a view

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

## Bidirectional binding with Backbone.stickit

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

### Overriding model getters and setters

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

### Overriding view element updates

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

### Listening to a specific HTML event

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

## Tutorial

- [Embracing Command Line Tooling with Backbone Applications](http://javascriptplayground.com/blog/2014/03/command-line-backbone-yeoman/)
- [7 Battle tested Backbone.js rules for amazing web apps](http://geeks.bizzabo.com/7-battle-tested-backbonejs-rules-for-amazing-web-apps)