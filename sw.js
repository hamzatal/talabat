const CACHE='talabat-v1';
const ASSETS=['./','./index.html'];
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>{if(e.request.url.startsWith(self.location.origin))c.put(e.request,copy)});
      return res;
    }).catch(()=>caches.match('./')))
  );
});
