layout: post
title: "PHP Libraries, External APIs, and Web Services"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

We mentioned GitHub more than a few times, but it is a great place to find functionality you may be looking for. Another good resource for code can be other PHP-based open source projects like Drupal or Joomla. If the functionality you are looking for doesn’t exist as a WordPress plugin but does as a Drupal module, take the code and make it work with WordPress.

Depending on what your requirements are, you can interact with various libraries and APIs in many different ways. You can cache data from an API in a transient. You can create posts and post metadata. You can create users and user meta. You can sideload post attachments. You can push post data to a web service. These are just a few examples; the sky’s the limit!

<!-- more -->

We are going to walk through some popular libraries and APIs that can be easily integrated into WordPress and talk about some use cases.

## Imagick

Imagick is a powerful piece of software that allows you to resize and manipulate image files. It’s like Photoshop for the command line, which can be useful for building [mindless meme generators](http://www.quickmeme.com/caption) amongst other more productive things.

Imagick can be installed on your server and then run through the command line via the `shell_exec()` or `exec()` PHP functions or you can use the [Imagick PHP library](http://bit.ly/imagick-php) as a wrapper for the underlying software. The Imagick library is not bundled with PHP and must be installed separately along with the Imagick software itself.

Imagick can be very useful if you require all of the images on your web application to be watermarked with your URL so if anybody hijacks your images at least they will have your web address embedded onto it. Justin Sternberg of WebDevStudios made some really easy-to-use methods for overlaying any text on any image and then saving the separate image as an attachment against a WordPress post. Check his code out at [WordPress-Image-Watermark](http://bit.ly/image-waterm).

## MaxMind GeoIP

[MaxMind GeoIP](http://bit.ly/geo-ip) gets data from a users’ IP address such as their location and Internet provider. There are many services out there like MaxMind, but we like to use this service because it has a very extensive API and a free downloadable database.

Maybe a school wants to add an extra layer of security for its web application and only wants to give access to the login page to people from within the same town or state that the school is in. This type of security feature might only be necessary if you want to lock down your application to a particular geographical location or locations, but it could greatly reduce the amount of potential hack attempts. Instead of only allowing access to your web application, you could also lock out particular locations, let’s say China. Maybe depending on your application, you know that anyone visiting from China should not have access.

Maybe a state website using WordPress wants to be able to show its visitors schools in the area when the website first loads. Let’s say “schools” are a CPT with address information stored as post meta. This can also be achieved by getting the end users’ locations and doing a meta query to match schools in their area.

You can download the PHP library with all of the functionality from the MaxMind website. To utilize its API, download the code from [GitHub](http://bit.ly/geoip-github).

```
<?php
add_action( 'init', 'schoolpress_maxmind' );
function schoolpress_maxmind(){

    // Omni service code is 'e'
    $service = 'e';
    // MaxMind Licence Key
    $key = 'sELZl0ELZMrx97T'; // This is a fake key, get your own!

    // Build an array of the licence key and the ip address of the end user
    $params = getopt( 'l:i:' );
    if ( !isset( $params['l'] ) ) $params['l'] = $key;
    $ip = $_SERVER['REMOTE_ADDR'];
    if ( !isset( $params['i'] ) ) $params['i'] = $ip;

    /*
    $params should be an array siumlar to:
    Array
    (
        [l] => sELZl0ELZMrx97T
        [i] => 96.234.61.86
    )
    */

    // MaxMind request URL
    $query = 'https://geoip.maxmind.com/';
    $query.= $service . '?' . http_build_query( $params );
    // Get response from the URL
    $response = wp_remote_get( $query );
    $results = $response['body'];
    // Turn response into array to easily grab what we need
    $results = explode(',', $results);

    echo '<pre>';
    print_r($results);
    echo '</pre>';
    exit();

    /*
    $results should be an array simular to:
    Array
    (
        [0] => US
        [1] => "United States"
        [2] => NJ
        [3] => "New Jersey"
        [4] => Belmar
        [5] => 40.1784
        [6] => -74.0218
        [7] => 501
        [8] => 732
        [9] => America/New_York
        [10] => NA
        [11] =>
        [12] => "Verizon FiOS"
        [13] => "Verizon FiOS"
        [14] => verizon.net
        [15] => "AS701 MCI Communications Services
        [16] =>  Inc. d/b/a Verizon Business"
        [17] => Cable/DSL
        [18] => residential
        [19] => 7
        [20] => 99
        [21] => 31
        [22] => 93
        [23] =>
        [24] =>
    )
    */
}
?>
```

When working with MaxMind GeoIP data, it might be a good idea to utilize cookies to store a user’s geolocation data so you don’t have to keep querying MaxMind’s API or querying the .dat file if you downloaded the free database.


## Google Maps JavaScript API v3

`Everyone knows what Google Maps is, and I’m sure you have seen some WordPress plugins using it.`` Google offers a [JavaScript-based API](http://bit.ly/googlemaps-api) for interacting with its maps, and you can build anything from a basic map zoomed into a specified location to a custom map with markers depicting various WordPress posts from a specific custom post type.`

`Besides all of the map functionality available via the Google Maps JavaScript API, Google also has some other API services related to its maps.`

### Directions

You can use this service to calculate directions between various locations and return step-by-step directions of what route(s) to follow. When creating a directions request, you can pass in an origin or a location for your directions to start and a destination or the end location. You can also specify the travel mode: driving (default), bicycling, transit, or walking.

### Distance Matrix

The Google Distance Matrix API is a service that provides travel distance and time for a matrix of origins and destinations. The information returned is based on the recommended route between the start and endpoints, as calculated by the Google Maps API, and consists of rows containing duration and distance values for each pair.

### Elevation

This API provides a way to query elevation data for provided locations.

### Geocoding

This API will allow you to query geolocation data like latitude and longitude from a provided address. You can also use reverse geocoding to provide the closest address for a given latitude and longitude.

### Street View Service

This API allows you to interact with Google Street View. This API is really cool because you can access all of the photos and locations available in Google Street View.

### Practical App

We are going to create a custom meta box called Location that will allow a user to associate an address with a post. We will also display a Google Map in the meta box with a marker of a user-specified address. Sometimes the markers on a map don’t line up exactly on the map where they should actually be. In our example code, you can drag and drop the marker to a new location, and when the post is updated, the marker will be saved in the location you moved it to.

```
<?php
// Only turn this on in the backend
add_action( 'admin_init', 'sp_register_meta_directions' );

// Add Directions Meta Box
function sp_register_meta_directions() {
    add_meta_box(
        'sp-directions-meta',
        'Address Information',
        'sp_directions_meta_box',
        'post',
        'normal',
        'high'
    );
    add_action( 'save_post', 'sp_directions_save_meta' );
}

// Meta Box
function sp_directions_meta_box( $post='' ) {
    // Get curretn post ID
    $post_id = $post->ID;
    // Get pos meta data if exists
    $sp_directions_address = get_post_meta( $post_id,
        '_sp_directions_address',
        true
    );
    $sp_directions_latitude = get_post_meta( $post_id,
        '_sp_directions_latitude',
        true
    );
    $sp_directions_longitude = get_post_meta( $post_id,
        '_sp_directions_longitude',
        true
    );
    // Output text box to collect any address?>
    <input type="text"
        id="sp_directions_address"
        name="sp_directions_address"
        value="<?php echo $sp_directions_address;?>"
        size="60" />
    *123 Main St, New York, NY
    <input type="hidden"
        id="sp_directions_latitude"
        name="sp_directions_latitude"
        value="<?php echo $sp_directions_latitude;?>"/>
    <input type="hidden"
        id="sp_directions_longitude"
        name="sp_directions_longitude"
        value="<?php echo $sp_directions_longitude;?>"/>
    <?php // Javascript for the Map?>
    <script type="text/javascript"
        src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript">
    // sets the hidden text boxes for lat & lng to the lat & lng of the dragged
    // and dropped marker
    function updateMarkerPosition(latLng) {
    document.getElementById('sp_directions_latitude').value = latLng.lat();
    document.getElementById('sp_directions_longitude').value = latLng.lng();
    }

    // initialize the Google map
    function sp_map_initialize() {
    var map = new google.maps.Map(document.getElementById("map_canvas"), {
    scaleControl: true});
    var bounds = new google.maps.LatLngBounds();
    map.setMapTypeId(google.maps.MapTypeId.HYBRID);

    var myLatLng = new google.maps.LatLng(
        <?php echo $sp_directions_latitude;?>,
        <?php echo $sp_directions_longitude;?>
    );
    bounds.extend(myLatLng);

    var marker<?php echo $post_id;?> = new google.maps.Marker(
        {map: map, draggable: true, position:
    new google.maps.LatLng(
        <?php echo $sp_directions_latitude;?>,
        <?php echo $sp_directions_longitude;?>)});

    google.maps.event.addListener(
      marker<?php echo $post_id;?>,
      'dragend',
      function(){
        updateMarkerPosition(
            marker<?php echo $post_id;?>.getPosition())
        ;
      }
    );

    map.fitBounds(bounds);
    }

    setTimeout("sp_map_initialize()",10);
    </script>
    <div id="map_canvas" style="height:300px;width:100%;"></div>
    <?php
}

// Save Data
function sp_directions_save_meta( $post_id ) {
    $address=strip_tags( $_POST['sp_directions_address'] );
    $lat=strip_tags( $_POST['sp_directions_latitude'] );
    $lng=strip_tags( $_POST['sp_directions_longitude'] );
    if ( $address != get_post_meta( $post_id, '_sp_directions_address', 1 ) ) {
        sp_get_lat_lng( $post_id, $address );
    }elseif ( $lat ) {
        update_post_meta( $post_id, '_sp_directions_latitude', $lat );
        update_post_meta( $post_id, '_sp_directions_longitude', $lng );
    }
}


// Get lat & lng from address and update post meta
function sp_get_lat_lng( $post_id, $address ) {
    global $wpdb, $bp;
    if ( $address ) {
        // Get GeoLocattion data from Google by passin in an address
        $url = 'http://maps.googleapis.com/maps/api/geocode/json';
        $g_address = $url . '?sensor=true&address='.urlencode( $address );
        $g_address = wp_remote_get( $g_address );
        $g_address = $g_address["body"];
        $g_address = json_decode( $g_address );
        $lat = $g_address->results[0]->geometry->location->lat;
        $lng = $g_address->results[0]->geometry->location->lng;

        /*
        // Uncomment if you want to see the raw JSON response
        echo '<pre>';
        print_r($g_address);
        echo '</pre>';
        exit();
        */

        // update post meta for lat and lng
        update_post_meta( $post_id, '_sp_directions_latitude', $lat );
        update_post_meta( $post_id, '_sp_directions_longitude', $lng );
    }else {
        // if no address then delete post meta
        delete_post_meta( $post_id, '_sp_directions_latitude' );
        delete_post_meta( $post_id, '_sp_directions_longitude' );
    }
}
?>
```

## Google Translate

What if you wanted to auto-translate pieces of content into various languages? You can do this utilizing Google’s [translation API](http://bit.ly/translate-api). There are quite a few WordPress plugins that leverage this API; but depending on your scenario, you may want to translate various strings of text on the fly, and you can certainly use this API to do so.

This API is not free but can be well worth the cost depending on how important it is to you to automatically translate any of your content.

## Google+

Google’s social network, Google+, has [a pretty extensive API](http://bit.ly/goo-api). Unlike Facebook’s and Twitter’s APIs, the Google+ API doesn’t allow you to push data to it; it only allows you to pull data. Hopefully one day it will open it up to allow third-party developers to post data to it.

Google+ offers specific APIs for Android, iOS, Hangouts, and the Web via JavaScript and an extensive HTTP API. For integrating with WordPress, it is best to use the JavaScript and/or the HTTP API.

There are four main resource types within the HTTP API, and each resource type has a few methods. Each method returns its results in a JSON data structure.

### People

The people resource type allows you to access information about Google+ members. You can return data from specific member’s profiles, search profiles for particular keywords, and return data lists of members that have +1’d or shared activity.

### Activities

The activity resource type allows you to access any activity or stream notes of a particular user in a list. You can return specific activity by ID, and you can search any public activity.

### Comments

A comment is a reply to any activity. The comments resource allows you to access a list of all comments for a provided activity. You can also get a specific comment by its ID.

### Moments

Moments describe activities that users engage within your app. The app activities comprise a moment type, a target, and many optional fields. The fields that are required when inserting moments depend on the type of moment. Your app can also list moments and delete moments that it previously wrote for the authenticated user.

Most of Google’s APIs are very similar, so once you learn one or two, you should be able to pick up most of them fairly quickly. For a complete reference of Google’s APIs, go to their [API Explorer](http://bit.ly/api-explorer).

## Amazon Product Advertising API

Lots of people buy and sell products on Amazon.com, everything from golf balls to video games to kitchen sinks. Most of the product data is made available via [Amazon’s Product Advertising API](http://bit.ly/api-list). You can access basic product information, including a product’s price, categories, customer reviews, similar products, and accessories. Most of the information that is available on any product on Amazon.com is also available via its API.

The first thing you will need to do to start using the API is to become an [Amazon Associate](http://bit.ly/amazon-affil) and get your Associate Tag/Associate ID. This is a unique identifier you will need to make requests on the API. Once you sign up, you should receive an email with your Associate Tag in it.
Along with an Associate Tag, you will also need an AWS Access Key ID and Secret Access Key. You can get those using your basic Amazon account information at _https://affiliate-program.amazon.com/gp/flex/advertising/api/sign-in.html_.
Once  you are signed in, click the Manage Your Account link, then click the Click Here link in the Access Identifiers box; this will take you to a page where you can generate/access both your Access Key ID and Secret Access Key.

Amazon.com is a great source of product information if you are looking to build any type of web application that has anything to do with various products and their data. You can bet that no matter what the product is, Amazon will most likely have data on it. In our example, we will be building a script to save various school supplies and their data from Amazon’s API as individual WordPress posts.

### Request Parameters

When creating a request to Amazon, you will need the following required parameters:

<dl>
    <dt>
        Service
    </dt>
    <dd>
        Specifies the Product Advertising API service. Amazon offers some other web services, but we will be focusing on the Product Advertising API, so the value should be “AWSECommerceService”.
    </dd>
    <dt>
        AssociateTag
    </dt>
    <dd>
        This is your Amazon Associate Tag/Associate ID.
    </dd>
    <dt>
        AWSAccessKeyId
    </dt>
    <dd>
        This is your AWS Access Key ID.
    </dd>
    <dt>
        Operation
    </dt>
    <dd>
        The operation you would like to perform.
    </dd>
</dl>

### Operations

Depending on what operation you use, you can pass in additional request parameters to help refine your results. The following is a list of the available operations and what additional request parameters can be passed in with them:

<dl>
    <dt>
        BrowseNodeLookup
    </dt>
    <dd>
        Given a browse node ID, BrowseNodeLookup returns the specified browse node’s name, children, and ancestors. The names and browse node IDs of the children and ancestor browse nodes are also returned.
    </dd>
    <dt>
        CartAdd
    </dt>
    <dd>
        The CartAdd operation enables you to add items to an existing remote shopping cart. CartAdd can only be used to place a new item in a shopping cart.
    </dd>
    <dt>
        CartClear
    </dt>
    <dd>
        The CartClear operation enables you to remove all of the items in a remote shopping cart.
    </dd>
    <dt>
        CartCreate
    </dt>
    <dd>
        The CartCreate operation enables you to create a remote shopping cart.
    </dd>
    <dt>
        CartGet
    </dt>
    <dd>
        The CartGet operation enables you to retrieve the IDs, quantities, and prices of all of the items, including SavedForLater items, in a remote shopping cart.
    </dd>
    <dt>
        CartModify
    </dt>
    <dd>
        The CartModify operation enables you to change the quantity of items that are already in a remote shopping cart and move items from the active area of a cart to the SaveForLater area or the reverse.
    </dd>
    <dt>
        ItemLookup
    </dt>
    <dd>
        Given an Item identifier, the ItemLookup operation returns some or all of the item attributes, depending on the response group specified in the request. By default, ItemLookup returns an item’s ASIN, Manufacturer, and ProductGroup, as well as the Title of the item.
    </dd>
    <dt>
        ItemSearch
    </dt>
    <dd>
        The ItemSearch operation returns up to 10 search results per page. When condition equals “All,” ItemSearch returns additional offers for those items, one offer per condition type.
    </dd>
    <dt>
        SimilarityLookup
    </dt>
    <dd>
        The SimilarityLookup operation returns up to 10 products per page that are similar to one or more items specified in the request. This operation is typically used to pique a customer’s interest in buying something similar to what she’s already ordered.
    </dd>
</dl>

### Response Groups

A response group helps target the information returned by a query. Each operation has specific response groups that it can use. Some response groups utilize other response groups.

Amazon keeps a [full list of response groups](http://bit.ly/response-groups) in the AWS documentation.

We are going to query Amazon for any books about WordPress. This script can be used to import books into a CPT called Books. You could create post meta for all of the additional book information and even save the images as post attachments.

```php
<?php
add_action( 'init', 'wds_get_aws_products' );

function wds_get_aws_products() {

    //set our aws associate tag, access key id & secret access key
    $AssociateTag = 'webd167-423234';
    $AWSAccessKeyId = 'ACAJBDXQSKILGQDWZSNK';
    $AWSSecretAccessKey = '26AB/UhHl2kYu/YF8QokT1+078p5Ax/tgECtWbwug';

    //set up our search parameters
    $params = array(
        'AWSAccessKeyId' => $AWSAccessKeyId,
        'AssociateTag' => $AssociateTag,
        'Service' => 'AWSECommerceService',
        'ItemPage' => '10',
        'Operation' => 'ItemSearch',
        'SearchIndex' => 'Books',
        'Keywords' => "WordPress",
        'ResponseGroup' => 'Offers,ItemAttributes,OfferFull,Images' );

    $params['Timestamp'] = gmdate( "Y-m-d\TH:i:s.\\0\\0\\0\\Z", time() );
    $url_parts = array();
    foreach ( array_keys( $params ) as $key ) {
        $part = str_replace( '%7E', '~', rawurlencode( $params[ $key ] ) );
        $url_parts[] = $key . '=' . $part;
    }

    sort( $url_parts );
    $url_string = implode( "&", $url_parts );
    $string_to_sign = "GET\necs.amazonaws.com\n/onca/xml\n" . $url_string;
    $signature = hash_hmac( "sha256",
        $string_to_sign,
        $AWSSecretAccessKey,
        TRUE
    );
    $signature = urlencode( base64_encode( $signature ) );
    $url = 'http://ecs.amazonaws.com/onca/xml?';
    $url.= $url_string . "&Signature=" . $signature;
    $response = file_get_contents( $url );

    $xml = simplexml_load_string( $response );

    echo '<pre>';
    print_r( $xml );
    echo '</pre>';
    exit();

}
?>
```

## Twitter REST API v1.1

Twitter has an [extensive API](http://bit.ly/twitter-apis) for publishing and getting tweets from its platform as well as allowing its users to sign in to any web application via a Twitter app. With the Twitter API, you can access data from and make updates to some of the following resources:

<dl>
    <dt>
        Timelines
    </dt>
    <dd>
        Timelines are collections of various tweets, ordered with the most recent first.
    </dd>
    <dt>
        Tweets
    </dt>
    <dd>
        Tweets are what make up Twitter; they are 140-character status updates with additional associated metadata.
    </dd>
    <dt>
        Search
    </dt>
    <dd>
        You can find tweets based on queries with provided keywords.
    </dd>
    <dt>
        Direct Messages
    </dt>
    <dd>
        You can access these private messages sent back and forth between users of your application.
    </dd>
    <dt>
        Friends and Followers
    </dt>
    <dd>
        You can access relationships between various users as well as manage some of those relationships for authenticated users.
    </dd>
    <dt>
        Users
    </dt>
    <dd>
        You can access user data as well as update it for authenticated users.
    </dd>
    <dt>
        Suggested Users
    </dt>
    <dd>
        You can access suggested users for authenticated users.
    </dd>
    <dt>
        Favorites
    </dt>
    <dd>
        Users favorite tweets that they like. You can access favorited tweets as well as favorite specific tweets for authenticated users.
    </dd>
    <dt>
        Lists
    </dt>
    <dd>
        Collections of tweets, called from a curated list of Twitter users. You can access lists as well as create lists for authenticated users.
    </dd>
    <dt>
        Saved Searches
    </dt>
    <dd>
        Allows users to save their search criteria for reuse later.
    </dd>
    <dt>
        Places and Geo
    </dt>
    <dd>
        Allows you to access geolocation data attached to tweets that have that data available. You can also attach location data to any tweets of authenticated users.
    </dd>
    <dt>
        Trends
    </dt>
    <dd>
        The Trends methods allow you to explore what’s trending on Twitter.
    </dd>
    <dt>
        Spam Reporting
    </dt>
    <dd>
        Can be used to report spam to Twitter.
    </dd>
    <dt>
        OAuth
    </dt>
    <dd>
        Twitter offers applications the ability to issue authenticated requests on behalf of the application itself (as opposed to on behalf of a specific user). Twitter’s implementation is based on the Client Credentials Grant flow of the OAuth 2 specification.
    </dd>
</dl>

The application-only auth flow follows these steps:

1.  An application encodes its consumer key and secret into a specially encoded set of credentials.
2.  An application makes a request to the POST oauth2/token endpoint to exchange these credentials for a bearer token.
3.  When accessing the REST API, the application uses the bearer token to authenticate.

### Set Up Your App on Twitter.com

To set up a new Twitter app, you must be signed in to Twitter and go to _https://dev.twitter.com/apps_. You can click the Create New App button to get started building your app. Fill out all of the required fields on the form and submit your app. On your app details page, you will find all of the information you will need for interacting with your app from within WordPress. Pay attention to the following:

* Consumer Key
* Consumer Secret
* Access Token
* Access Token Secret

You will need to copy these values later.

### Leverage a PHP Library

There are several PHP libraries available out there for interacting with Twitter’s API; we like to use [twitteroauth](http://bit.ly/awilliams-oauth) by Abraham Williams. It’s very simple to drop the necessary files you need in a subdirectory of a custom plugin and reference them.

You can download the ZIP file and extract the files into a _lib_ directory in your custom plugin or theme. You will just need to reference the library in a manner like the following in your code: `require_once lib/twitteroauth.php;`.

We are going to search Twitter for any tweets that contain the keyword “bwawwp.”

```
<?php
/*Plugin Name: BWAwWP - Twitter */

// reference the php library we downloaded from GitHub
require_once 'lib/twitteroauth.php';


// Copy over credentials from the Twitter app you created. Below are not real keys.
define( 'C_KEY', '0LU1wUibUKP3bccx2NFlK' );
define( 'C_SECRET', 'KGYQnbZlZaNPqdg2INldACazetPLwvprRqbo' );
define( 'A_TOKEN', '11018212-3qMnqt8D4HpCb2ACzyVoK1kAW' );
define( 'A_TOKEN_SECRET', 'jUMC3Ocy6Yx7JV4xRFhZ5eiCbiIyjc' );

add_action( 'init', 'sp_twitter_search' );
function sp_twitter_search() {
        // our search term
        $q = 'bwawwp';

        // call TwitterOAuth and pass in Twitter credentials.
        $toa = new TwitterOAuth( 'C_KEY', 'C_SECRET', 'A_TOKEN', 'A_TOKEN_SECRET' );

        // call the search tweets method
        $search = $toa->get( 'search/tweets', array( 'q' => $q ) );

        echo "<pre>";
        print_r( $search );
        echo "</pre>";
        exit();

}
?>
```


You can start to imagine the possible ways Twitter data can be integrated with WordPress. Our example code could be useful for searching Twitter for any keywords and pulling those tweets into posts in a CPT. They could be saved as BuddyPress activities for a
BuddyPress group. You could search for tweets having to do with various keywords and locations and plot them on a Google Map. The possibilities are really endless.

If you are utilizing Twitter’s API to post data, like favoriting and retweeting tweets or following other users, make sure you comply with Twitter’s usage terms and don’t go over your ``[rate limit](http://bit.ly/rate-limiting). You don’t want to get your account banned, and you especially don’t want to get a user of your application’s account banned.

## Facebook

Do you Facebook it up all the time? If you don’t, there are millions of people who do. Facebook has a [few different APIs available](http://bit.ly/fb-javascript), but its Graph API allows access to most of the data available to users. You can leverage WordPress to make native Facebook apps because a Facebook canvas page is basically an iframe. Why build something from scratch when you can link Facebook users to WordPress users and utilize WordPress as a Facebook app any way you see fit?

We are going to briefly go over Facebook’s Graph API, the primary way that data is retrieved from or posted to Facebook.

### Pictures

You can add _/picture_ to the end of most object URLs like people, events, groups, pages, applications, and photo albums. You can also add the following query strings to the end of a picture URL to change how the image is returned:

* type—Values can be square, small, normal, or large (type=square).
* width—A numerical value of the width you want the image to be (width=200).
* height—A numerical value of the height you want the image to be (height=200).
* return_ssl_resources—If set to 1, the image will be returned over a secure connection.

For example, if you go to the URL _https://graph.facebook.com/bmess/picture?type=large_, you will see my latest Facebook profile picture in a large view. Try this out with your Facebook profile name and some of the query string arguments you can use.

### Search

All Graph API search queries require an access token passed in with the `access_token=<token>` parameter. The type of access token you need depends on the type of search you’re running. Searches across page and place objects require an app access token, while all other endpoints require a user access token.

Facebook supports searching the following objects:

* Public Posts
* People
* Pages
* Events
* Groups
* Places
* Checkins

### Permissions

Your application may need to interact with Facebook users in various ways, and you may need permission from end users to access some of their information via the Graph API:

<dl>
    <dt>
        Email Permissions
    </dt>
    <dd>
        Email is a protected property and must be specifically asked for and granted.
    </dd>
    <dt>
        Extended Permissions
    </dt>
    <dd>
        Because these permissions give access to more sensitive info and the ability to publish and delete data, they are optional when presented to users in the login dialog. They can also be removed by a user through privacy settings. Apps should be built to handle revoked permissions without reducing the user experience.
    </dd>
    <dt>
        Extended Profile Properties
    </dt>
    <dd>
        These permissions cannot be revoked in the login dialog during the login flow, meaning they are nonoptional for users when logging in to your app. If you want them to be optional, you should structure your app to only request them when absolutely necessary and not upon initial login.
    </dd>
    <dt>
        Open Graph Permissions
    </dt>
    <dd>
        These permissions allow your app to publish actions to the Open Graph and also to retrieve actions published by other apps.
    </dd>
    <dt>
        Page Permissions
    </dt>
    <dd>
        Permissions related to management of Facebook Pages.
    </dd>
    <dt>
        Public Profile and Friend List
    </dt>
    <dd>
        The Public Profile and Friend List is the basic information available to an app. All other permissions and content must be explicitly asked for.
    </dd>
</dl>

### Building an Application

To build a basic Facebook app and/or to use Facebook to log in users to your web app, you will need to create an app on Facebook. Go to [the UI](https://developers.facebook.com/apps) and click on the Create New App button. Follow the instructions. If you need help, search online; we don’t want to walk through all the ins and outs of creating a basic app. Once you have created an app, you will have access to the App ID/API Key and the App Secret Key. You now have a very basic Facebook app.

### Leverage What’s Out There

You could build your own login process for Facebook, but why? Use what is already out there. We like to leverage the plugin [WordPress Social Login](http://bit.ly/wp-social-login). This plugin provides you with a nice UI for managing logins to your WordPress site for Facebook and a number of other social networks. This plugin only really authenticates users: what if we need to do more than that? What if we need to access specific users’ posts and friends or even post to a user’s wall using the [Graph API](http://bit.ly/fb-g-api)? We can build an add-on plugin that uses an already authenticated user from the WordPress Social Login to handle whatever functionality we may require.

You may need to alter the WordPress Social Login plugin a little, depending on what you want to to do. The has all of the Facebook permissions that we need. If you were building something that requires additional permissions, you would need to alter the plugin itself.

If you download the plugin and open up _/plugins/wordpress-social-login/hybridauth/Hybrid/Providers/Facebook.php_, you will see a `Hybrid_Providers_Facebook` class with a variable named `scope` that looks like this:

    public $scope = "email, user_about_me, user_birthday, user_hometown,
    user_website, read_stream, offline_access, publish_stream, read_friendlists";

You can alter the scope string to the exact permissions you need for your application.


## Twilio

Need to be able to send customized SMS alert messages to members? Maybe your application needs an additional layer of security and you need to verify user accounts via random activation codes text messaged to mobile phones. [Twilio](http://www.twilio.com/sms/api) has a great web service that lets you send and receive SMS messages back and forth between users’ cell phones and your account(s) with them.

Maybe a school would like to verify the contact numbers of parents so they can later send text message alerts with import information like if their child is playing hooky and has cut a class. The first thing you should do is [download the Twilio PHP library from GitHub](http://bit.ly/twilio-php). If you are building a custom plugin, drop _Twilio.php_ and the Twilio directory into a lib directory in your plugin. Your directory structure should look something like _/wp-content/plugins/your-plugin/lib/Twilio_.

We recommend interacting with the Twilio API over SSL.

## Microsoft Sharepoint

Microsoft? A lot of people in the open source world like to bash Microsoft. The fact of the matter is governments and big businesses across the world use many Microsoft products; and although we think that open source will one day change this, it isn’t going to happen anytime soon. [SharePoint](http://msdn.microsoft.com/) is Microsoft’s flagship collaboration product these days; it’s web based and super powerful. If you have ever seen a large-scale SharePoint deployment, then you know how useful and integrated into a business’s workflow it can be. One of SharePoint’s most impressive features is its integration with the entire Microsoft Office suite.

SharePoint has a web service available for almost every feature it offers. You can actually push and pull almost any data available in a SharePoint deployment via these web services:

<dl>
    <dt>
        Administration Web service
    </dt>
    <dd>
        Provides methods for managing a deployment of Microsoft Windows SharePoint Services, such as for creating or deleting site collections.
    </dd>
    <dt>
        Alerts Web Service
    </dt>
    <dd>
        List and delete alert subscriptions. Alert subscriptions specify when and how notifications are sent to users when changes are made to content stored on the server. The protocol does not specify the creation or editing of alert subscriptions.
    </dd>
    <dt>
        Authentication Web Service
    </dt>
    <dd>
        Provides classes for logging on to a SharePoint site that is using forms-based authentication.
    </dd>
    <dt>
        Copy Web Service
    </dt>
    <dd>
        Provides services for copying files within a SharePoint site and between SharePoint sites.
    </dd>
    <dt>
        Document Workspace Web Service
    </dt>
    <dd>
        Exposes methods for managing Document Workspace sites and the data they contain.
    </dd>
    <dt>
        Forms Web Service
    </dt>
    <dd>
        Provides methods for returning forms that are used in the user interface when working with the contents of a list.
    </dd>
    <dt>
        Imaging Web Service
    </dt>
    <dd>
        Provides methods that enable you to create and manage picture libraries.
    </dd>
    <dt>
        List Data Retrieval Web Service
    </dt>
    <dd>
        An adapter service that provides a method for performing queries against SharePoint lists.
    </dd>
    <dt>
        Lists Web Service
    </dt>
    <dd>
        The Lists Web service provides methods for working with SharePoint lists, content types, list items, and files.
    </dd>
    <dt>
        Meetings Web Service
    </dt>
    <dd>
        Enables the creation and management of Meeting Workspace sites.
    </dd>
    <dt>
        People Web Service
    </dt>
    <dd>
        Provides classes that can be used to associate user identifiers with security groups for Windows SharePoint Services website permissions. User IDs are validated against Active Directory Domain Services as well as various role or membership providers. SPGroup security information may also be stored in a collection of cross-site groups for the site collection.
    </dd>
    <dt>
        Permissions Web Service
    </dt>
    <dd>
        The Permissions Web service provides methods for working with list and site permissions in Windows SharePoint Services.
    </dd>
    <dt>
        SharePoint Directory Management Web Service
    </dt>
    <dd>
        Provides classes that enable requests for various management operations for email distribution groups.
    </dd>
    <dt>
        Site Data Web Service
    </dt>
    <dd>
        The Site Data web service supports site indexing by external indexing services. Indexing is the process of building an external index of the website, facilitating search, auditing, or cataloging of the site content.
    </dd>
    <dt>
        Sites Web Service
    </dt>
    <dd>
        The Sites Web service provides methods and properties that support export and import operations using SOAP calls against Windows SharePoint Services websites (SPWeb instances) to allow migrating site content from one location to another. The Sites Web service provides one of three ways to migrate content from one Windows SharePoint Services website to another.
    </dd>
    <dt>
        Search Web Service
    </dt>
    <dd>
        Enterprise Search in Microsoft Office SharePoint Server exposes its search functionalities through the Query web service. This allows you to access Enterprise Search results from client applications and web applications outside of the context of a SharePoint site.
    </dd>
    <dt>
        Users and Groups Web Service
    </dt>
    <dd>
        The Users and Groups Web service provides methods for working with users and groups in Windows SharePoint Services.
    </dd>
    <dt>
        Versions Web Service
    </dt>
    <dd>
        The Versions Web service provides methods for working with file versions in SharePoint document libraries.
    </dd>
    <dt>
        Views Web Service
    </dt>
    <dd>
        The Views Web service provides methods for creating, deleting, or updating list views in Windows SharePoint Services.
    </dd>
    <dt>
        Web Part Pages Web Service
    </dt>
    <dd>
        Provides methods for working with Web Parts.
    </dd>
    <dt>
        Webs Web Service
    </dt>
    <dd>
        Provides methods for working with sites and subsites.
    </dd>
</dl>

For more information, check out the [Microsoft Developer Network](http://msdn.microsoft.com/).

You can imagine how useful it might be pushing and pulling data to and from a document library. Think of document libraries or lists in SharePoint as custom post types in WordPress. You can create custom fields and custom forms to store metadata, attach documents, interact with other lists, and more when building document libraries. If you needed a custom web app built with WordPress and needed to sync it with specific data stored in a SharePoint site, you could use these web services. Also, if you need to completely manage data in a SharePoint site and you don’t know the first thing about developing in .NET, you could use these web services.

## We Missed a Few

We have just mentioned a few available PHP libraries,  web services, and APIs you could leverage, depending on what you are trying to accomplish. These are some of the more popular ones, but they are really just the tip of the iceberg of what’s available across the Internet.

Don’t reinvent the wheel. Before you build anything, look to see what resources are available to you. Leverage data from external data sources, and integrate your data with external social networks and directories. Work smarter, not harder!

The following are some other popular web services you might want to mess around with:

* [FourSquare](https://developer.foursquare.com/)
* [Instagram](http://instagram.com/developer/)
* [Salesforce](http://bit.ly/soap-api)
* [flickr](http://www.flickr.com/services/api/)
* [YouTube](https://developers.google.com/youtube/)
* [eBay](http://developer.ebay.com/common/api/)
* [Dropbox](https://www.dropbox.com/developers)
* [LinkedIn](http://developer.linkedin.com/apis)
* [MailChimp](http://apidocs.mailchimp.com/)
* [Constant Contact](https://developer.constantcontact.com/)






