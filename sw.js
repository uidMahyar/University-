const V="schedule-v1",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;e.respondWith(caches.open(V).then(async c=>{const r=await c.match(e.request);const n=fetch(e.request).then(x=>{c.put(e.request,x.clone());return x}).catch(()=>r);return r||n}))});
