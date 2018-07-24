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

        // BAD  
        class CardConverter {
            @Inject PublicKeyManager publicKeyManager;
            @Inject public CardConverter() {}  
        }

* Forgetting an `@Inject` on a field introduces a `NullPointerException`.

        // BAD  
        class CardConverter {
        
            @Inject PublicKeyManager publicKeyManager;  
            Analytics analytics; // Oops, forgot to @Inject
        
            @Inject public CardConverter() {}  
        }
    
* Constructor injection is better because it allows for **immutable** and therefore **thread safe** objects that don’t have a partially constructed state.

        // GOOD  
        class CardConverter {
        
            private final PublicKeyManager publicKeyManager;
        
            @Inject public CardConverter(PublicKeyManager publicKeyManager) {  
            this.publicKeyManager = publicKeyManager;  
          }  
        }
    
* Kotlin eliminates the constructor injection boilerplate:

        class CardConverter  
        @Inject constructor(private val publicKeyManager: PublicKeyManager)
    
* We still use field injection for objects constructed by the system, such as Android activities:

        public class MainActivity extends Activity {
        
            public interface Component {  
                void inject(MainActivity activity);
            }
        
            @Inject ToastFactory toastFactory;
        
            @Override protected void onCreate(Bundle savedInstanceState) {  
                super.onCreate(savedInstanceState);  
                Component component = SquareApplication.component(this);  
                component.**inject**(this);  
           }  
        }
    
### Singletons should be extremely rare

* Singletons are useful when we need a **centralized access to a mutable state**.

        // GOOD
        @Singleton
        public class BadgeCounter {
        
            public final Observable<Integer> badgeCount;
        
            @Inject public BadgeCounter(...) {  
                badgeCount = ...  
          }
        }
    
* If an object has no mutable state, it doesn’t need to be a singleton.

        //BAD, should not be a singleton!

        @Singleton
        class RealToastFactory implements ToastFactory {  
          private **final** Application context;
        
              @Inject public RealToastFactory(Application context) {  
            this.context = context;  
          }
        
              @Override public Toast makeText(int resId, int duration) {  
            return Toast.makeText(context, resId, duration);  
          }  
        }
    
* On **rare occasions**, we use scoping to cache instances that are expensive to create, or that are repeatedly created and thrown away.

### Favor @Inject over @Provides

* `@Provides` methods should not duplicate the constructor boilerplate.
* Code is easier to understand when coupled concerns are in one place.

        @Module  
        class ToastModule {  
          // BAD, remove this binding and add @Inject to RealToastFactory  
            @Provides RealToastFactory realToastFactory(Application context) {  
                return new RealToastFactory(context);  
           }  
        }
    
* This is especially important for **singletons**; it’s a key **implementation detail** that you need to know when reading that class.

        // GOOD, I have all the details I need in one place.**  
        @Singleton**  
        public class BadgeCounter {

              @Inject public BadgeCounter(...) {}    
        }
    
### Favor static @Provides methods

* Dagger `@Provides` methods can be static.

        @Module  
        class ToastModule {  
          @Provides  
          static ToastFactory toastFactory(RealToastFactory factory) {  
            return factory;  
          }  
        }
    
* The generated code can directly invoke the method instead of having to create a module instance. That method call can be inlined by the compiler.

        @Generated  
        public final class DaggerAppComponent extends AppComponent {  
          // ...
        
            @Override public ToastFactory toastFactory() {  
                return ToastModule.toastFactory(realToastFactoryProvider.get())  
          }  
        }
    
* One static method won’t change much, but all bindings being static will result in a sizable performance increase.
* Make your modules abstract and Dagger [will fail](https://github.com/google/dagger/issues/621#issuecomment-321868005) at compile time if one of the `@Provides` methods isn’t static.

        @Module  
        abstract class ToastModule {  
          @Provides  
          static ToastFactory toastFactory(RealToastFactory factory) {  
            return factory;  
          }  
        }

### Favor @Binds over @Provides

* `@Binds` replaces `@Provides` for when you’re mapping one type to another.

        @Module  
        abstract class ToastModule {  
            @Binds
            abstract **ToastFactory** toastFactory(**RealToastFactory** factory);  
        }
    
* The method must be abstract. It will never be invoked; the generated code will know to directly use the implementation.

        @Generated  
        public final class DaggerAppComponent extends AppComponent {  
          // ...
        
              private DaggerAppComponent() {  
            // ...  
            this.toastFactoryProvider = (Provider) **realToastFactoryProvider;
          }
        
              @Override public ToastFactory toastFactory() {  
            return toastFactoryProvider.get();  
          }  
        }

### Avoid @Singleton on interface bindings

> Statefulness is an implementation detail

* Only implementations know if they need to ensure centralized access to mutable state.
* When binding an implementation to an interface, there shouldn’t be any scoping annotation.

        @Module  
        abstract class ToastModule {  
          // BAD, remove @Singleton  
          @Binds @Singleton**
          abstract ToastFactory toastFactory(**RealToastFactory** factory);  
        }
    
### Enable error-prone

Several Square teams are using it to detect common Dagger mistakes, [check it out](https://github.com/google/error-prone).

### Conclusion

These guiding principles work well for our context: small heterogeneous teams working on a large shared Android codebase. Since your context is likely different, you should apply what makes the most sense for your team.

## Resource

- [Dagger 2 Generated Code. – Mindorks – Medium](https://medium.com/mindorks/dagger-2-generated-code-9def1bebc44b)
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
- [Understanding Dagger 2 Multibindings + ViewModel – Kotlin Academy](https://blog.kotlin-academy.com/understanding-dagger-2-multibindings-viewmodel-8418eb372848)
- [Dagger 2 : Component Relationships & Custom Scopes – ProAndroidDev](https://proandroiddev.com/dagger-2-component-relationships-custom-scopes-8d7e05e70a37)
- [Understanding Dagger 2 Multibindings + ViewModel – Kotlin Academy](https://blog.kotlin-academy.com/understanding-dagger-2-multibindings-viewmodel-8418eb372848)
- [Android testing using Dagger 2, Mockito and a custom JUnit rule](https://medium.com/@fabioCollini/android-testing-using-dagger-2-mockito-and-a-custom-junit-rule-c8487ed01b56)
- [Android Dagger2: Critical things to know before you implement.](https://medium.com/mindorks/android-dagger2-critical-things-to-know-before-you-implement-275663aecc3e)
- [Implementing MVVM using LiveData, RxJava, Dagger Android](https://proandroiddev.com/mvvm-architecture-using-livedata-rxjava-and-new-dagger-android-injection-639837b1eb6c)
- [Dagger 2 Annotations: @Binds & @ContributesAndroidInjector](https://proandroiddev.com/dagger-2-annotations-binds-contributesandroidinjector-a09e6a57758f)
- [Multi-scoping Dagger components – ProAndroidDev](https://proandroiddev.com/multi-scoping-dagger-components-89b6f4bdb73b)

### Mock

- [How to be a Mock-Star…😎 – Fueled Android – Medium](https://medium.com/fueled-android/how-to-be-a-mock-star-fc00714d8c2f#.9a8fj7mcj)

### Sample

- [android10/Android-CleanArchitecture](https://github.com/android10/Android-CleanArchitecture)
