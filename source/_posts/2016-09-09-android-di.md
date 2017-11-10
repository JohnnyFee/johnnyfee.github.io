layout: post
title: "Android Dagger2 - Dependency Injection"
description: ""
category: Android
tags: [android]
---

[google/dagger](https://github.com/google/dagger) A fast dependency injector for Android and Java.

Dagger 2 is a great dependency injection library, but its sharp edges can be tricky to handle. Let’s go over a few best practices that Square follows to keep mobile engineers from hurting themselves!

### Favor constructor injection over field injection

- Field injection requires the fields to be non final and non private.

    <pre name="3abb" id="3abb" class="graf graf--pre graf-after--li">
    // BAD  
    class CardConverter {
    </pre>

    <pre name="a2c5" id="a2c5" class="graf graf--pre graf-after--pre">
    **@Inject** PublicKeyManager publicKeyManager;
    </pre>

    <pre name="5ad6" id="5ad6" class="graf graf--pre graf-after--pre">
    **@Inject** public CardConverter() {}  
    }
    </pre>

* Forgetting an `@Inject` on a field introduces a `NullPointerException`.

    <pre name="adda" id="adda" class="graf graf--pre graf-after--li">
    // BAD  
    class CardConverter {
    </pre>

    <pre name="9f60" id="9f60" class="graf graf--pre graf-after--pre">
      **@Inject** PublicKeyManager publicKeyManager;  
      Analytics analytics; // Oops, forgot to @Inject
    </pre>

    <pre name="bbdc" id="bbdc" class="graf graf--pre graf-after--pre">
      **@Inject** public CardConverter() {}  
    }
    </pre>

* Constructor injection is better because it allows for **immutable** and therefore **thread safe** objects that don’t have a partially constructed state.

    <pre name="3aa3" id="3aa3" class="graf graf--pre graf-after--li">
    // GOOD  
    class CardConverter {
    </pre>

    <pre name="2d9f" id="2d9f" class="graf graf--pre graf-after--pre">
      private final PublicKeyManager publicKeyManager;
    </pre>

    <pre name="628b" id="628b" class="graf graf--pre graf-after--pre">
    **@Inject** public CardConverter(PublicKeyManager publicKeyManager) {  
        this.publicKeyManager = publicKeyManager;  
      }  
    }
    </pre>

* Kotlin eliminates the constructor injection boilerplate:

    <pre name="260b" id="260b" class="graf graf--pre graf-after--li">
    class CardConverter  
    **@Inject** **constructor**(  
      private val publicKeyManager: PublicKeyManager  
    )
    </pre>

* We still use field injection for objects constructed by the system, such as Android activities:

    <pre name="5366" id="5366" class="graf graf--pre graf-after--li">
    public class MainActivity extends Activity {
    </pre>

    <pre name="27e6" id="27e6" class="graf graf--pre graf-after--pre">
      public interface Component {  
    **void inject(MainActivity activity);**  
      }
    </pre>

    <pre name="be3a" id="be3a" class="graf graf--pre graf-after--pre">
    **@Inject** ToastFactory toastFactory;
    </pre>

    <pre name="7290" id="7290" class="graf graf--pre graf-after--pre">
      @Override protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        Component component = SquareApplication.component(this);  
        component.**inject**(this);  
      }  
    }
    </pre>

### Singletons should be extremely rare

* Singletons are useful when we need a **centralized access to a mutable state**.

    <pre name="5c54" id="5c54" class="graf graf--pre graf-after--li">
    // GOOD**  
    @Singleton**  
    public class BadgeCounter {
    </pre>

    <pre name="02bf" id="02bf" class="graf graf--pre graf-after--pre">
      public final **Observable<Integer> badgeCount**;
    </pre>

    <pre name="c1ae" id="c1ae" class="graf graf--pre graf-after--pre">
      @Inject public BadgeCounter(...) {  
         badgeCount = ...  
      }    
    }
    </pre>

* If an object has no mutable state, it doesn’t need to be a singleton.

    <pre name="fd9f" id="fd9f" class="graf graf--pre graf-after--li">
    **//** BAD**,** should not be a singleton!**    
    @Singleton**  
    class RealToastFactory implements ToastFactory {  
      private **final** Application context;
    </pre>

    <pre name="e0e3" id="e0e3" class="graf graf--pre graf-after--pre">
      @Inject public RealToastFactory(Application context) {  
        this.context = context;  
      }
    </pre>

    <pre name="b4e0" id="b4e0" class="graf graf--pre graf-after--pre">
      @Override public Toast makeText(int resId, int duration) {  
        return Toast.makeText(context, resId, duration);  
      }  
    }
    </pre>

* On **rare occasions**, we use scoping to cache instances that are expensive to create, or that are repeatedly created and thrown away.

### Favor @Inject over @Provides

* `@Provides` methods should not duplicate the constructor boilerplate.
* Code is easier to understand when coupled concerns are in one place.

    <pre name="811c" id="811c" class="graf graf--pre graf-after--li">
    @Module  
    class ToastModule {  
      // BAD, remove this binding and add @Inject to RealToastFactory  
    **@Provides** RealToastFactory realToastFactory(Application context) {  
        return **new RealToastFactory(context)**;  
      }  
    }
    </pre>

* This is especially important for **singletons**; it’s a key **implementation detail** that you need to know when reading that class.

<pre name="8e56" id="8e56" class="graf graf--pre graf-after--li">
// GOOD, I have all the details I need in one place.**  
@Singleton**  
public class BadgeCounter {
</pre>

    <pre name="84cd" id="84cd" class="graf graf--pre graf-after--pre">
      **@Inject** public BadgeCounter(...) {}    
    }
    </pre>

### Favor static @Provides methods

* Dagger `@Provides` methods can be static.

    <pre name="d1b4" id="d1b4" class="graf graf--pre graf-after--li">
    @Module  
    class ToastModule {  
      @Provides  
    **static** ToastFactory toastFactory(RealToastFactory factory) {  
        return factory;  
      }  
    }
    </pre>

* The generated code can directly invoke the method instead of having to create a module instance. That method call can be inlined by the compiler.

    <pre name="8ad1" id="8ad1" class="graf graf--pre graf-after--li">
    @Generated  
    public final class DaggerAppComponent extends AppComponent {  
      // ...
    </pre>

    <pre name="6b18" id="6b18" class="graf graf--pre graf-after--pre">
      @Override public ToastFactory toastFactory() {  
        return **ToastModule.toastFactory**(realToastFactoryProvider.get())  
      }  
    }
    </pre>

* One static method won’t change much, but all bindings being static will result in a sizable performance increase.
* Make your modules abstract and Dagger [will fail](https://github.com/google/dagger/issues/621#issuecomment-321868005) at compile time if one of the `@Provides` methods isn’t static.

    <pre name="efd7" id="efd7" class="graf graf--pre graf-after--li">
    @Module  
    **abstract** class ToastModule {  
      @Provides  
    **static** ToastFactory toastFactory(RealToastFactory factory) {  
        return factory;  
      }  
    }
    </pre>

### Favor @Binds over @Provides

* `@Binds` replaces `@Provides` for when you’re mapping one type to another.

    <pre name="7965" id="7965" class="graf graf--pre graf-after--li">
    @Module  
    abstract class ToastModule {  
    **@Binds**  
    **abstract** **ToastFactory** toastFactory(**RealToastFactory** factory);  
    }
    </pre>

* The method must be abstract. It will never be invoked; the generated code will know to directly use the implementation.

    <pre name="361d" id="361d" class="graf graf--pre graf-after--li">
    @Generated  
    public final class DaggerAppComponent extends AppComponent {  
      // ...
    </pre>

    <pre name="507b" id="507b" class="graf graf--pre graf-after--pre">
      private DaggerAppComponent() {  
        // ...  
        this.**toastFactoryProvider =** (Provider) **realToastFactoryProvider;**  
      }
    </pre>

    <pre name="b9c6" id="b9c6" class="graf graf--pre graf-after--pre">
      @Override public ToastFactory toastFactory() {  
        return toastFactoryProvider.get();  
      }  
    }
    </pre>

### Avoid @Singleton on interface bindings

> Statefulness is an implementation detail

* Only implementations know if they need to ensure centralized access to mutable state.
* When binding an implementation to an interface, there shouldn’t be any scoping annotation.

    <pre name="70e6" id="70e6" class="graf graf--pre graf-after--li">
    @Module  
    abstract class ToastModule {  
      // BAD, remove @Singleton  
      @Binds **@Singleton**  
      abstract **ToastFactory** toastFactory(**RealToastFactory** factory);  
    }
    </pre>

### Enable error-prone

Several Square teams are using it to detect common Dagger mistakes, [check it out](https://github.com/google/error-prone).

### Conclusion

These guiding principles work well for our context: small heterogeneous teams working on a large shared Android codebase. Since your context is likely different, you should apply what makes the most sense for your team.

## Resource

- [Dagger ‡ A fast dependency injector for Android and Java.](http://google.github.io/dagger/users-guide.html) <sup>official</sup>
- [Tasting Dagger 2 on Android – Fernando Cejas](http://fernandocejas.com/2015/04/11/tasting-dagger-2-on-android/)
    + [详解Dagger2](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0519/2892.html) <sup>translation</sup>
- [从零开始的Android新项目5 - Repository层(上) Retrofit、Repository组装](http://blog.zhaiyifan.cn/2016/04/30/android-new-project-from-0-p5/)
- [使用Dagger 2进行依赖注入](http://codethink.me/2015/08/06/dependency-injection-with-dagger-2/) <sup>simple</sup>
- [使用Dagger 2进行依赖注入](http://codethink.me/2015/08/06/dependency-injection-with-dagger-2/) <sup>analyse</sup>
- [Android：dagger2让你爱不释手-重点概念讲解、融合篇 - 简书](http://www.jianshu.com/p/1d42d2e6f4a5) <sup>analyse</sup>
- [从零开始的Android新项目4 - Dagger2篇](http://blog.zhaiyifan.cn/2016/03/27/android-new-project-from-0-p4/#) <sup>important</sup>

### Usage

- [Rewriting Uber Engineering’s Android Rider App with Deep Scope Hierarchies](https://eng.uber.com/deep-scope-hierarchies)
- [Retaining Dagger components across configuration change using Service-Tree](https://medium.com/@Zhuinden/retaining-dagger-components-across-configuration-change-using-service-tree-3709c78bf6d2#.6jvjx2tb6)

### Mock

- [How to be a Mock-Star…😎 – Fueled Android – Medium](https://medium.com/fueled-android/how-to-be-a-mock-star-fc00714d8c2f#.9a8fj7mcj)

### Sample

- [android10/Android-CleanArchitecture](https://github.com/android10/Android-CleanArchitecture)
