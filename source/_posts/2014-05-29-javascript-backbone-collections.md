layout: post
title: "Backbone Collections"
category: JavaScript
tags: [javascript,backbone,mvc]
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