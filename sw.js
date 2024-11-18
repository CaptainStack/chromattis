const GHPATH = '/chromattis';
const APP_PREFIX = 'chromattis';
const VERSION = '0.00';
const CACHE_NAME = `${APP_PREFIX}-${VERSION}`;


const APP_STATIC_RESOURCES = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/favicon.svg`,
];

self.addEventListener('fetch', e => {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(request => {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(APP_STATIC_RESOURCES)
    })
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      var cacheWhitelist = keyList.filter(key => {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map((key, i) => {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
