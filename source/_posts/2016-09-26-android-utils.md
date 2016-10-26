layout: post
title: "Android Util Gson"
description: ""
category: Android
tags: [android, utils, gson]
---

## How to exclude specific fields

### transient

Any fields you don't want serialized in general you should use the "transient" modifier, and this also applies to json serializers (at least it does to a few that I have used, including gson).

If you don't want name to show up in the serialized json give it a transient keyword, eg:

```java
private transient String name;
```

See [java - Gson: How to exclude specific fields from Serialization without annotations - Stack Overflow](http://stackoverflow.com/questions/4802887/gson-how-to-exclude-specific-fields-from-serialization-without-annotations)

### @Expose

Nishant provided a good solution, but there's an easier way. Simply mark the desired fields with the @Expose annotation, such as:

```java
@Expose private Long id;
```

Leave out any fields that you do not want to serialize. Then just create your Gson object this way:

```java
Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
```

### ExclusionStrategy

This `ExclusionStrategy` will do the thing, but you need to pass "Fully Qualified Field Name". See below:

```java
public class TestExclStrat implements ExclusionStrategy {

        private Class<?> c;
        private String fieldName;
        public TestExclStrat(String fqfn) throws SecurityException, NoSuchFieldException, ClassNotFoundException
        {
            this.c = Class.forName(fqfn.substring(0, fqfn.lastIndexOf(".")));
            this.fieldName = fqfn.substring(fqfn.lastIndexOf(".")+1);
        }
        public boolean shouldSkipClass(Class<?> arg0) {
            return false;
        }

        public boolean shouldSkipField(FieldAttributes f) {

            return (f.getDeclaringClass() == c && f.getName().equals(fieldName));
        }

    }
```

Here is how we can use it generically.

```java
Gson gson = new GsonBuilder()
        .setExclusionStrategies(new TestExclStrat("in.naishe.test.Country.name"))
        //.serializeNulls()
        .create();
    Student src = new Student();
    String json = gson.toJson(src);
    System.out.println(json);
```

It returns

> {"firstName":"Philip","middleName":"J.","initials":"P.F","lastName":"Fry","country":{"id":91}}
