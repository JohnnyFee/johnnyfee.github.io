---
layout: post
title: Programming Android with Kotlin
category: Kotlin
---

# Kotlin Essentials

Kotlin was created by the JetBrains team from St. Petersburg, Russia. 

Like Java, Kotlin is a statically typed language. 

- **Primitive Types**

  The most obvious difference between Java’s and Kotlin’s type systems is that Kotlin has no notion of a *primitive type*.

- **Null Safety**

  *Nullability* is part of Kotlin’s type system.

  `Any` is the root of the Kotlin type system, just like `Object` in Java. 

   all nonnullable types are subtypes of `Any` and all nullable types are subtypes of `Any?`.

  ```kotlin
  val name: String? = null
  ```

  Variables must be initialized. There is no default value for a variable. 

  ```kotlin
  val name: String // error! Nonnullable types must be initialized!
  ```

- **The Unit Type**

  In Kotlin, all functions, expressions and statement(like `if`) return a value and have a type. 

    ```kotlin
    val n = if (maybe) doThis() else doThat()
    ```
  
  If the code for a function does not return a value explicitly, the function has the value `Unit`.

