const GHPATH = '/chromattis';
const APP_PREFIX = 'chromattis';
const VERSION = '0.00';
const CACHE_NAME = `${APP_PREFIX}-${VERSION}`;


const APP_STATIC_RESOURCES = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/favicon.svg`,
  `${GHPATH}/audio/song17.ogg`,
  `${GHPATH}/audio/song21.ogg`,
  `${GHPATH}/audio/charm.ogg`,
  `${GHPATH}/audio/island.ogg`,
  `${GHPATH}/audio/synthwave.ogg`,
  `${GHPATH}/audio/crystalcave.ogg`,
  `${GHPATH}/audio/underwater.ogg`,
  `${GHPATH}/audio/sevenandeight.ogg`,
  `${GHPATH}/audio/upclick.ogg`,
  `${GHPATH}/audio/downclick.ogg`,
  `${GHPATH}/audio/updownclick.ogg`,
  `${GHPATH}/tutorial/00-grid.gif`,
  `${GHPATH}/tutorial/01-values.gif`,
  `${GHPATH}/tutorial/02-tap.gif`,
  `${GHPATH}/tutorial/03-cycle.gif`,
  `${GHPATH}/tutorial/04-solving.gif`,
  `${GHPATH}/tutorial/05-moves.gif`,
  `${GHPATH}/tutorial/06-multiple.gif`,
  `${GHPATH}/tutorial/07-others.gif`,
  `${GHPATH}/tutorial/08-preview.gif`,
  `${GHPATH}/tutorial/09-cancel.gif`,
  `${GHPATH}/tutorial/10-reverse.gif`,
  `${GHPATH}/tutorial/11-undo.gif`,
  `${GHPATH}/tutorial/12-shuffle.gif`,
  `${GHPATH}/tutorial/13-sixpress.gif`,
  `${GHPATH}/tutorial/14-invert.gif`,
  `${GHPATH}/tutorial/15-corners.gif`,
  `${GHPATH}/tutorial/16-twocolors.gif`,
  `${GHPATH}/tutorial/17-reduce.gif`,
  `${GHPATH}/tutorial/18-install.gif`,
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
