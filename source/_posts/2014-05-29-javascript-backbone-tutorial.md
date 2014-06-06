---
layout: post
title: "Backbone Tutorial"
category: JavaScript
tags: [javascript,backbone,mvc]
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

## Tutorial

- [Embracing Command Line Tooling with Backbone Applications](http://javascriptplayground.com/blog/2014/03/command-line-backbone-yeoman/)
- [7 Battle tested Backbone.js rules for amazing web apps](http://geeks.bizzabo.com/7-battle-tested-backbonejs-rules-for-amazing-web-apps)