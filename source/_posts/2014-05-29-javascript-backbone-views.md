layout: post
title: "Backbone Views"
category: JavaScript
tags: [javascript,backbone,mvc]
--- 

> 本文为读 [Backbone.js Cookbook](http://www.salttiger.com/backbone-js-cookbook/) 的读书笔记。

## Rendering a view

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

<!--more-->

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

### Creating a new HTML element associated with a view

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

### Changing the view element dynamically

We may want to change the view element during the working of our code. This could be done with the help of a setElement() method. Both of the following are valid.

    // Change existing element to the new one.
    InvoiceItemView.setElement('li');

    // Change existing element to the one already exists
    // in the DOM tree.
    InvoiceItemView.setElement($('body div'));

When calling the setElement() method, Backbone undelegates events assigned to a previous element, and assigns them to a new element.

### Removing a view

When we have finished working with a view and want to remove it, we also need to remove its elements from the DOM and stop listening to events. To do this, we simply need to call the remove() method.

## Dealing with a view element using jQuery

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

## Rendering a model in a view

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

## Rendering a collection in a view

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

## Splitting a view into subviews

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

## Handling Document Object Model (DOM) events in a view

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

## Switching views using Backbone.Router

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