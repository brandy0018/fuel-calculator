const CACHE_NAME='fuelcalc-v1.31.2';
const APP_SHELL=['./','./index.html','./manifest.webmanifest',
  './ocr/eng.traineddata.gz',
  './ocr/tesseract-core-lstm.js',
  './ocr/tesseract-core-lstm.wasm',
  './ocr/tesseract-core-lstm.wasm.js',
  './ocr/tesseract-core-relaxedsimd-lstm.js',
  './ocr/tesseract-core-relaxedsimd-lstm.wasm',
  './ocr/tesseract-core-relaxedsimd-lstm.wasm.js',
  './ocr/tesseract-core-relaxedsimd.js',
  './ocr/tesseract-core-relaxedsimd.wasm',
  './ocr/tesseract-core-relaxedsimd.wasm.js',
  './ocr/tesseract-core-simd-lstm.js',
  './ocr/tesseract-core-simd-lstm.wasm',
  './ocr/tesseract-core-simd-lstm.wasm.js',
  './ocr/tesseract-core-simd.js',
  './ocr/tesseract-core-simd.wasm',
  './ocr/tesseract-core-simd.wasm.js',
  './ocr/tesseract.min.js',
  './ocr/worker.min.js'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET') return;

  if(request.mode==='navigate'){
    event.respondWith(
      fetch(request).then(response=>{
        const copy=response.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy));
        return response;
      }).catch(()=>caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached=>{
      const network=fetch(request).then(response=>{
        if(response && response.status===200 && response.type!=='opaque'){
          const copy=response.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));
        }
        return response;
      }).catch(()=>cached);
      return cached || network;
    })
  );
});
