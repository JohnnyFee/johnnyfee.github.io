layout: post
title: "jQuery Defered"
category: JavaScript
tags: [javascript]
--- 

## Deferred Object Pattern

The Deferred Object pattern is the key pattern used by a number of JavaScript applications for decoupling of the request from the code that handles the results of the request and allows multiple callbacks to be attached upon notification of a result. To achieve such a decoupling, the Deferred Object provides functions that allow the callback functions to be registered for handling the success, failure, or the progress of the request. Deferred Object framework is available as part of the jQuery library.
Here’s how to create a deferred object in jQuery:

<!--more-->

```js
var deferred = $.Deferred();
// var deferred =  new Deferred();
// var deferred = jQuery.Deferred();
```

### Register Success Callback Using deferred.done()

The `.done()` function allows a callback function to be registered with the Deferred Object. This callback function will be called once the request is successfully completed when `.resolve()` is called on the Deferred Object.

```js
deferred.done(function(data) {
    console.log("Success callback: " + data);
});
```

### Register Failure Callback Using deferred.fail()

The `.fail()` function allows the registration of a callback that will be called if the request fails with any error when `.reject()` is called on the Deferred Object. The function can provide the appropriate error code and message that describes the error encountered.

```js
deferred.fail(function(errCode, errMsg) {
   console.log("Failure callback: " + errCode + " - " + errMsg);
});
```

### Register Progress Callback Using deferred.progress()

The `.progress()` function provides the option to update the caller of the progress of the request. The callback function can be called multiple times during the lifetime of the request while `.notify()` is being called on the Deferred Object. In contrast, the `.done()` and `.fail()` callbacks are executed only once per lifecycle of the request.

```js
deferred.progress(function(percentage) {
    console.log("Progress callback: " + percentage);
});
```

In addition to using the Deferred Object to indicate success or failure of the request, it can be used to indicate the status of the request as well. The callback function that needs to be provided with the status update of the request can be registered using the `.progress()` or using the third parameter of the `.then()` function.

To be able to update the status by calling the progress callback registered, the Deferred Object provides the `.notify()` function that takes the progress update parameters as arguments. For example, this callback can be used to update the UI elements such as the progress bar for providing feedback to the user.

```js
function progressBar() {
    var deferred = $.Deferred();

    var i = 0;
    var intervalId = setInterval(function() {
        deferred.notify(++i);
        if (i == 99) {
                        clearInterval(intervalId);
                }
    }, 1000);

    return deferred.promise();
};

var promise = progressBar();

promise.progress(function(percentage) {
        console.log(percentage + "% completed");
});
```

The progress callback function can be called multiple times during the lifetime of the request. In contrast, the `deferred.resolve()` and `deferred.reject()` functions are only executed once per the lifecycle of the request.

In the following simple example, we can see the whole picture of how the Deferred Object is used.

```js
function requestDB() {
    // 1 - create the Deferred
    var deferred = $.Deferred();

    XMLHttpRequest xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/contact", true);
    xhr.addEventListener('load', function() {
            if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status <= 300)
                            || xhr.status == 304) {
                            // 3a - triggers the .then() or
                            // .done() callbacks
                            var response = { name: "O'reilly" };
                            deferred.resolve(response);
                    } else {
                            // 3b - triggers the .fail() callback with
                            // an error code and a message
                            deferred.reject(404, "File not found.");
                    }
            }
    }, false);
    xhr.send();

    // 2 - return the promise right away
    return deferred.promise();
}

$.when(RequestDB()).then(function(response) {
    // 3a1 - access to returned parameters
    console.log(data.name);
}).fail(function(errCode, errMsg) {
    // 3b1 - access to fail messages
    console.log("Failure callback: " + errCode + " - " + errMsg);
});
```

When the `requestDB()` function is called by the `$.when()` function, there are four steps expected to happen:

1.  We create a Deferred Object that can then facilitate callbacks to be fired based on the expected results from the program.
2.  Once the Deferred Object is created, we return this object immediately so the consumer application can attach different utility functions, such as `.done()`, `.then()`, or `.fail()`, to handle its outcome.
3.  If the application returns a result successfully from the source, then we have to let the consumer application know about this outcome. In this case, we call the `.resolve()` function with or without return parameter `response`.
        1.  Once the Deferred Object resolves the result with a success outcome and passes any parameters to a handling function we can access these parameters (including the `response` parameter) from the anonymous callback functions in `.done()` or `.then()`. In our case, the `response` JSON object holds the return data, and we should be able to access the key/value pairs within the callback function.
        2.  If the outcome results in a failure, we can also let the consumer application know about it. It is good practice to pass descriptive messages to the consumer application about what went wrong while processing the request. In our case, we pass an error code and a message to the consumer application to handle the result accordingly.
        3.  if we receive a failure from our request, then the `.fail()` function is able to pass us the parameters that are dispatched from `.reject()`. In our case, we can access the error code and the message from our anonymous function in order to handle this failure with a friendlier error message to the users in the UI.

### Simpler Callback registration with .then()

The `.then()` function provides a convenient way to specify the success, fail, and progress callback functions in one place. All of the callback parameters are optional, which allows the developer to declare the callbacks only for the functions that are of interest. The `.then()` function is fired when the `.resolve()` or `.reject()` functions are called on the Deferred Object.

The structure of the `deferred.then()` function is as follows:

    deferred.then(successCallback, failCallback, progressCallback);

Combining the example given for `.done()`, `.fail()`, and `.progress()`, to use the `.then()` function, we would be able to achieve an equivalent behavior as shown here:

```js
deferred.then(function() {
        console.log("Success callback");
}, function(errCode, errMsg) {
        console.log("Failure callback: " + errCode + " - " + errMsg);
}, function() {
        console.log("Progress callback");
});
```

### Synchronizing Multiple Asynchronous Events with $.when()

You can also synchronize one or more events using deferred’s `$.when()` helper function, as in the following example. The `$.when()` function waits for all its tasks to be executed, and once supplied deferred events are resolved, depending on the events’ success and failure states, `.then()` or `.fail()` callbacks will be fired. If one of the tasks fails, then `.fail()` will be invoked.

```js
function doThis() {
   return $.get('this.html');
}

function doThat() {
   return $.get('that.html');
}

$.when(doThis(), doThat()).then(function(data) {
        console.log("Both events are successful.");
}).fail(function(errCode, errMsg) {
        console.log("One or more events are failed.");
});
```

### Resolve a Deferred Object

The potential of the Deferred Object is seen by allowing the success callback(s) to be called when the request is completed successfully.

The Deferred Object can be used to invoke the success callback(s) by calling the `.resolve()` function on the Deferred Object. The `.resolve()` function can be used to provide the callback function(s) with the arguments that communicate the artifacts of the request.

```js
var deferred =  new Deferred();

// register the success callback with two args
deferred.done(function(arg1, arg2) {
        alert("Success callback with two artifacts");
};
// Do some processing resulting in artifact1 and artifact2
        .
        .
        .
// Calling the resolve function on the Deferred Object with two artifacts as
// arguments will trigger the success callback to be called with the same.
deferred.resolve(artifact1, artifact2);
```

### Reject a Deferred Object

Similarly, the other important usage of the Deferred Object is to notify any interested parties to the failure of an async request.

The Deferred Object can be used to invoke the failure callback(s) by calling the `.reject()` function on the Deferred Object. Similar to the success callback, the `.reject()` function can be used to provide the failure callback(s) with error codes and error messages that describe the cause of the failure.

```js
var deferred =  new Deferred();

// register the failure callback with the errorCode and errorMsg args
deferred.fail(function(errorCode, errorMsg) {
        alert("Failure callback: " +errorCode+ " & message" + errorMsg);
};
// Do some processing resulting in an error with errCode and corresponding
// error message errMsg
        .
        .
// Calling the reject function on the Deferred Object with the error code
// and err message would be passed back to the callback function(s) that
// have been registered.
deferred.reject(errCode, errMsg);
```

## Use of Promise

A typical usage of a Deferred Object pattern would be to provide the caller of a function with a handle to a Deferred Object. The caller can use the handle to set the callbacks that it is interested in.

In addition, the function that created the Deferred Object would want to restrict the ability to finalize the Deferred Object by calling `.resolve()` or `.reject()`, to only itself or its downstream functions.

Both the requirements are supported in the Deferred Object framework by the `.promise()` function. The `.promise()` function returns a Deferred Object that can be used only to set the callbacks but not call the functions that could alter the state of the object. The called function can return this to the caller, which can then set the callback functions required upon the Deferred action completion.

For example, consider an Ajax request to download a web page. The call flow showing the usage of promise is as follows:

```js
function ajaxRequest(url) {
        var deferred =  new Deferred();

        // Initiate the request to download url and pass the
        // Deferred Object to enable the downstream downloader
        // to call resolve() or reject() and progress() as necessary
        download(url, deferred);

        // Return the Deferred Promise Object to enable the
        // callbacks to be set by the caller
        return deferred.promise();
}

function caller() {
        ajaxRequest("http://oreilly.com").then(function() {
                alert("Page successfully downloaded");
        }, function(errCode, errorMsg) {
                alert("Failure Callback: " + errCode + " - " + errorMsg);
        }, function() {
                console.log("Progress update called");
        });
}
```
