---
layout: post
title: "Node Full Stack —— MEAN"
category: Node
tags: [node, mean]
--- 

## Tutorial

- [也谈基于NodeJS的全栈式开发经验技巧](http://www.w3cfuns.com/article-1315-1.html)
- [An Introduction to the MEAN Stack](http://www.sitepoint.com/introduction-mean-stack/)
- [Introduction to the MEAN Stack - Tuts+ Code Tutorial](http://code.tutsplus.com/tutorials/introduction-to-the-mean-stack--cms-19918)
- [MEAN Stack – A Quick Start Guide | Flippin' Awesome](http://flippinawesome.org/2014/04/21/mean-stack-a-quick-start-guide/)
- [Synth - The back-end web framework designed to make (Angular](http://www.synthjs.com) The back-end web framework designed to make (Angular|Ember|Backbone)JS web apps easy to create and manage.

## Framework

- [MEAN.io - A Fullstack Javascript Framework](http://www.mean.io/#!/)/[linnovate/mean](https://github.com/linnovate/mean)
- [MEAN.JS Generator](http://meanjs.org/)

### Difference between MEAN.js and MEAN.io

See [javascript - Difference between MEAN.js and MEAN.io - Stack Overflow](http://stackoverflow.com/questions/23199392/difference-between-mean-js-and-mean-io)

They're essentially the same... They both use swig for templating, they both use karma and mocha for tests, grunt with livereload, passport integration, nodemon, etc. 

Why so similar? Mean.js is a fork of Mean.io and both initiatives were started by [the same guy](https://github.com/amoshaviv)... Mean.io is now under the umbrella of the company Linnovate and looks like the guy (Amos Haviv) stopped his collaboration with this company and started Mean.js. You can read more about the reasons [here](http://blog.meanjs.org/post/76726660228/forking-out-of-an-open-source-conflict). 

Now... main (or little) differences you can see right now are:

**SCAFFOLDING AND BOILERPLATE GENERATION**

Mean.io uses a custom cli tool named 'mean' (very original name)  
Mean.js uses Yeoman Generators

**MODULARITY**

Mean.io uses a more self-contained node packages modularity with client and server files inside the modules.  
Mean.js uses modules just in the front-end (for angular), and connects them with Express. Although they're working on [vertical modules](https://github.com/meanjs/mean/tree/vertical-test) as well...

**DOCUMENTATION**

Mean.io has ok docs  
Mean.js has AWESOME docs

**COMMUNITY**

Mean.io is clearly winner and growing faster  
Mean.js has less momentum cos it is a few months old

On a personal level, I like more the philosophy and openness of MeanJS and more the traction and modules/packages approach of MeanIO. Both are nice, and you'll end probably modifying them, so you can't really go wrong picking one or the other. Just take them as starting point and as a learning exercise.

## ALTERNATIVE “MEAN” SOLUTIONS

MEAN is a generic way (coined by [Valeri Karpov](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)) to describe a boilerplate/framework that takes "Mongo + Express + Angular + Node" as the base of the stack. You can find frameworks with this stack that use other denomination, some of them really good for RAD (Rapid Application Development) and building SPAs. Eg:

* **[StrongLoop Loopback](http://strongloop.com/mobile-application-development/loopback/)** (the main Node.js core contributors and [Express maintainers](http://strongloop.com/strongblog/tj-holowaychuk-sponsorship-of-express/))
* [Generator Angular Fullstack](https://github.com/DaftMonk/generator-angular-fullstack)
* [Sails.js](http://www.quora.com/Node-js/Should-I-use-a-MEAN-stack-or-Angular-+-Sails-js-for-a-node-js-powered-back-end-structure-or-framework)
* [Cleverstack](http://cleverstack.io/)
* Deployd, etc (there are more)

You also have [Hackathon Starter](https://github.com/sahat/hackathon-starter). It doesn't have A of MEAN (it is 'MEN'), but it rocks..
