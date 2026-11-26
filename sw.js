const V="schedule-v6",F=["index.html","manifest.webmanifest","icon-192.png","icon-512.png"],IDX=new URL("index.html",self.registration.scope).href;
let up=false;
self.addEventListener("install",e=>{up=!!self.registration.active;e.waitUntil(caches.open(V).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()).then(()=>up&&self.clients.matchAll({type:"window"})).then(cs=>cs&&cs.forEach(c=>c.navigate(c.url))))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!="GET")return;const u=q.mode=="navigate"?IDX:q.url;
 e.respondWith(new Promise((ok,no)=>{const t=setTimeout(()=>caches.match(u).then(c=>c&&ok(c)),3000);
  fetch(u,{cache:"no-cache"}).then(x=>{clearTimeout(t);if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(u,c))}ok(x)}).catch(err=>{clearTimeout(t);caches.match(u).then(c=>c?ok(c):no(err))})}))});
