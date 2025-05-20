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
  `${GHPATH}/tutorials/00-grid.gif`,
  `${GHPATH}/tutorials/01-values.gif`,
  `${GHPATH}/tutorials/02-tap.gif`,
  `${GHPATH}/tutorials/03-cycle.gif`,
  `${GHPATH}/tutorials/04-solving.gif`,
  `${GHPATH}/tutorials/05-moves.gif`,
  `${GHPATH}/tutorials/06-multiple.gif`,
  `${GHPATH}/tutorials/07-others.gif`,
  `${GHPATH}/tutorials/08-preview.gif`,
  `${GHPATH}/tutorials/09-cancel.gif`,
  `${GHPATH}/tutorials/10-reverse.gif`,
  `${GHPATH}/tutorials/11-undo.gif`,
  `${GHPATH}/tutorials/12-shuffle.gif`,
  `${GHPATH}/tutorials/13-sixpress.gif`,
  `${GHPATH}/tutorials/14-invert.gif`,
  `${GHPATH}/tutorials/15-corners.gif`,
  `${GHPATH}/tutorials/16-twocolors.gif`,
  `${GHPATH}/tutorials/17-reduce.gif`,
  `${GHPATH}/tutorials/18-install.gif`,
];

self.addEventListener('fetch', event => {
  console.log('Fetch request : ' + event.request.url);
  event.respondWith(
    caches.match(event.request).then(request => {
      if (request) { 
        console.log('Responding with cache : ' + event.request.url);
        return request;
      } else {
        console.log('File is not cached, fetching : ' + event.request.url);
        return fetch(event.request);
      }
    })
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(APP_STATIC_RESOURCES);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      const cacheWhitelist = keyList.filter(key => {
        return key.indexOf(APP_PREFIX);
      });
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map((key, index) => {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[index]);
          return caches.delete(keyList[index]);
        }
      }));
    })
  );
});
