---
layout: post
title: "Backbone Collections"
category: JavaScript
tags: [javascript]
--- 

> 本文为读 [Backbone.js Cookbook](http://www.salttiger.com/backbone-js-cookbook/) 的读书笔记。

Collection is an object used for organizing models into an ordered set. There are specific methods to sort, filter, and iterate through a collection.

## Creating a collection of models

Extend the Backbone.Collection object and pass the model's object name as an option.

    var InvoiceItemCollection = Backbone.Collection.extend
    ({
      model: InvoiceItemModel
    });

<!--more-->

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

## Getting a model from a collection by its index

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

## Adding a model to a collection

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

## Removing a model from a collection

Call the remove() method to remove a model from a collection.

    invoiceItemCollection.remove(['c0', 'c1', 'c2', 'c3']);

Here we can pass the model's id, cid, or even the model object as a parameter. We can either pass a single value or an array of values.

When calling the remove() method, a model is removed from the models array, and any references between them are removed as well. Thus, the model object itself is not destroyed, and we can still work with it if the need arises.

Sometimes, we may need to delete all the existing models from a collection and add some others. There is a useful reset() method, which does both these jobs simultaneously. Here is how it works.

![backbone-collection-snippet.png](http://johnnyimages.qiniudn.com/backbone-collection-snippet.png)

## Working with a collection as a stack or as a queue

1. Call the push() method to add a model to the end of a collection.

        invoiceItemCollection.push(model);

2. Call the pop() method to remove and return the last model from a collection.

        model = invoiceItemCollection.pop();

3. Call the unshift() method to add a model at the beginning of a collection.

        invoiceItemCollection.unshift(model);

4. Call the shift() method to remove and return the first model from a collection.

        model = invoiceItemCollection.shift();

## Sorting a collection

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

## Filtering models in a collection

To filter models in a collection, use the where() method. It accepts a search criteria and returns an array of found models.

    var result = invoiceItemCollection.where({quantity: 1});
    // Result is just an array of models, so let's create
    // new collection.
    var resultCollection = new InvoiceItemCollection(result);
    resultCollection.pluck('quantity'); // [1, 1, 1]

It is also possible to pass multiple criteria together.

    invoiceItemCollection.where({quantity: 1, price: 10});

## Iterating through a collection

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

## Chaining a collection

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

## Running No SQL queries on a collection

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

### Using standard operators

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

### Combining queries

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

### Multiple queries on the same key

If we need to perform multiple queries on the same key, then we can supply the query as an array. The following query returns all the clients with the name John or Joe:

    buyerCollection.query({
        $or:[
          { firstName: 'John' },
          { firstName: 'Joe' }
        ]
      });

### Sorting query results

To sort results by a property, we need to pass it with the sortBy key in a second argument. We can also specify the order by passing the asc or desc value with the sort key. By default, asc is assumed as the value. The following code shows how sorting is done:

    result = buyerCollection.query(
        { firstName: {$like: 'John'} },
        { sortBy: 'lastName', order: 'desc' }
      );
    resultCollection = new BuyerCollection(result);
    resultCollection.pluck('lastName'); // ["Smith", "Doe"]

### Paging query results

There is a way to split a big result array on several pages and return a specified one. Let's see how it is done.

    buyerCollection.query({firstName: 'John'}, {limit:10, offset:1, page:2});

We can specify the following properties in the second parameter:

- limit: It limits the resulting array size to a given number. The first N elements are returned. It is a required property.
- page: It returns a specified resulting page. The page size is set by the limit property. It is an optional property.
- offset: It skips the first N result items. It is an optional property.

### Caching results

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

## Storing models of various types in the same collection

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

## Implementing a one-to-many relationship

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

## Events and Bindings

## Managing events

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