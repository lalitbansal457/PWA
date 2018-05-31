# PWA
This repo describe about progressive web app with example.


Progressive Web Apps (PWAs) are web applications that are regular web pages or websites, but can appear to the user like **traditional applications** or native mobile applications. The application type attempts to combine features offered by most modern browsers with the benefits of a mobile experience.

### Benefits: 

1. Notification: With PWAs we can send push notifications.
2. Offline: PWAs can work offline and store data locally on the device.
3. Low on Data : An app which takes close to 10 MBs as a native app, can be reduced to about 500KB when made an PWA.
4. No Updates Required : PWAs gets updated like web-pages. we get the latest version when we use. No need to update them every now and then.
5. First use then trust : We don’t need to install them to start using. They are simple web-pages. Users choose to ‘install’ when they like it. 
6.Sharing is Easy : Unlike an app we can share a PWA with its URL.


### Uses:

1. Create a **Manifest** file in the root directory.
2. Configure the **Manifest** file according to our need.
```
{
    "short_name": "PWA", // short name of app
    "name": "Progresive web app", // name of app
    "icons": [
    {
      "src":"images/fireworks-icon192x192.png", // icon to be used
      "sizes": "192x192",
      "type": "image/png"
    }],
    "start_url": "/", // start url of app
    "background_color": "#3367D6", // background color of splash screen
    "display": "standalone", // dispplay mode 
    "theme_color": "#3367D6" // toolbar color 
}
```

3. Create a **service worker** file in the root directory
4. Register a service worker

```
if ('serviceWorker' in navigator) {
    console.log("Will service worker register?");
    navigator.serviceWorker.register('sw.js').then(function(reg){
      console.log("Yes it did.");
    }).catch(function(err) {
      console.log("No it didn't. This happened: ", err)
    });
}
```

5. Install and fetch atleast one service worker.

```

### sw.js
var CACHE_NAME = 'app-v5';
var urlsToCache = [
  '/'
];

self.addEventListener('install', function(event) {
  console.log(event)
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

```



