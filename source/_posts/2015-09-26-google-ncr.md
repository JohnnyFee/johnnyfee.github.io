layout: post
title: "Force Your Browser To Use Google.com And Ignore Your Location"
description: ""
category: Google
tags: [google, tutorial]
---

See <http://www.addictivetips.com/web/force-your-browser-to-use-google-com-and-ignore-your-location/>

I’ve had to switch to using a different laptop recently and it took some time to set it up the way I had things set up on my old laptop. Surprisingly, one of the harder things for me to do was to get my browser to play nice. Every time I Googled something, it would default to Google local search. I previously had it set up to always use Google.com but the trick to it was long forgotten and took more time than I cared to invest to figure out again. Why can’t they make it simpler? Ponder that if you will but if you’re trying to get your browser to ignore Google local search and just stick to using Google.com, here is the trick to getting  it to do that in Firefox, Chrome, and Internet Explorer.

### The Temporary Fix

I’m going to share this for the benefit of anyone trying to search on Google.com on a public system or any other system you plan to use temporarily. Normally, if you type Google in the search bar, and go to the Google home page, you will get a localised version. What you should do, regardless of which browser you’re using is type ‘google.com’ in the URL bar and hit enter. Google will again redirect to your local Google search page with one small difference. At the bottom right corner you will see the Use Google.com option. Click it and you will no longer be redirected to your local search. This is a temporary solution.

[![use google_com](http://cloud.addictivetips.com/wp-content/uploads/2014/11/use-google_com.jpg)](http://cloud.addictivetips.com/wp-content/uploads/2014/11/use-google_com.jpg)

### Chrome

To permanently get Chrome to ignore local search and always use Google.com, go to Settings>Search>Manage Search Engines. Choose any other search engine that you might have listed and delete Google (trust me). Now scroll down to where it lets you add a new search engine. Enter Google in the name field, google.com in the keyword field, and _http://www.google.com/search?hl=en_ in the query field. Click done and then make it the new default search engine.

[![googlecom_set](http://cloud.addictivetips.com/wp-content/uploads/2014/11/googlecom_set.png)](http://cloud.addictivetips.com/wp-content/uploads/2014/11/googlecom_set.png)

### Firefox

Firefox is easily the trickiest one if you’re using version 32 or above because all versions after Firefox 32 have disabled a very useful string called _keyword.url._ If you do have an older version, go to the about:config page and search for “keyword.url” set its value to _http://google.com/search?q=%s_  and you’re good to go (restart Firefox for good measure).

<!--Ad Injection:random-->

<ins id="aswift_1_expand" style="display:inline-table;border:none;height:90px;margin:0;padding:0;position:relative;visibility:visible;width:658px;background-color:transparent"><ins id="aswift_1_anchor" style="display:block;border:none;height:90px;margin:0;padding:0;position:relative;visibility:visible;width:658px;background-color:transparent"><iframe width="658" height="90" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" onload="var i=this.id,s=window.google_iframe_oncopy,H=s&amp;&amp;s.handlers,h=H&amp;&amp;H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&amp;&amp;d&amp;&amp;(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}" id="aswift_1" name="aswift_1" style="left:0;position:absolute;top:0;"></iframe></ins></ins>  

If you are on the latest version of Firefox though, things are going to be different and more restrictive. You need to use an add-on because the preference mentioned above has been removed in the newer versions. There is an add-on that claims to bring it back but it failed to do so in our tests and it is experimental according to the developer. Use always “.com” – Google.com (in English) instead to get Firefox to always search on Google.com.

[Install always “.com” – Google.com (in English) For Firefox](https://addons.mozilla.org/en-US/firefox/addon/always-com-googlecom-in-englis/)

### Internet Explorer

According to Microsoft, setting and managing search engines is something you can only accomplish through add-ons. To add Google.com as your default search engine, click the arrow at the right of the URL bar and select ‘Add’. You will be redirected to the Internet Explorer add-on page where you can install Google as a search engine and it will always open Google.com.

[![internet explorer google](http://cloud.addictivetips.com/wp-content/uploads/2014/11/internet-explorer-google.png)](http://cloud.addictivetips.com/wp-content/uploads/2014/11/internet-explorer-google.png)

[Install Google Search For Internet Explorer](http://www.iegallery.com/en-us/Addons/Details/813)

In all instances where you can manually input the search parameter, you can replace the “.com” with anything else like “.uk” if you would prefer to use local search. The option isn’t going to work with Firefox but Internet Explorer will let you edit the search parameter from the add-on manager.