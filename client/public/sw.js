if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const f=e=>i(e,a),o={module:{uri:a},exports:t,require:f};s[a]=Promise.all(n.map((e=>o[e]||f(e)))).then((e=>(c(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"204ae3309ab572a6c00065fa6c5fd335"},{url:"/_next/static/_9xK7f10gpSqYRD5q1oD5/_buildManifest.js",revision:"34631641eaab3137b65d5b1dfb000af3"},{url:"/_next/static/_9xK7f10gpSqYRD5q1oD5/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e762574-dedea6590e9c8b94.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/113-29539a3cdeeee1b2.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/149-3fe48abcba238778.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/152-fa301ae4b3451a48.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/164f4fb6-5ba32ffe074102ed.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/235-ebe14bbd8f7d51da.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/262-5cd861a93bdc8217.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/321-47c63c59a5d50af2.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/366-954fa77278b7c67e.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/429-5b57c266696b4397.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/442-0ea102f5d43f3a0a.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/4bd1b696-31ceb63d4c39d5a4.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/517-779e17b84b6b925c.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/53c13509-ed32ccc4a5143415.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/59650de3-11dfa3f8de01698c.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/631.bef5dccc895fb0ee.js",revision:"bef5dccc895fb0ee"},{url:"/_next/static/chunks/756.c50e0fb7628c270b.js",revision:"c50e0fb7628c270b"},{url:"/_next/static/chunks/772-9db231f7b8aed0e6.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/795d4814-320d1180d53061d5.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/839.b4c77dcf0035a4d4.js",revision:"b4c77dcf0035a4d4"},{url:"/_next/static/chunks/8e1d74a4-cc74723e16ae5d40.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/ad2866b8.f1442ee25fd052ff.js",revision:"f1442ee25fd052ff"},{url:"/_next/static/chunks/app/_not-found/page-8687976e52e8dbcf.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/app/admin/page-67d0f27e2e5625f7.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/app/error-685d9e37edc7973d.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/app/estudiantes/%5Bid%5D/page-c9bd95d17335ba15.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/app/estudiantes/page-6dce5d7d239bfc79.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/app/layout-c3729a718d0c0c98.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/app/page-82bd0b14085be5ae.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/app/recibos/page-3005db1ccbb05d88.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/bc98253f.63ca06ab087b2181.js",revision:"63ca06ab087b2181"},{url:"/_next/static/chunks/ca377847-11a87a50b0eaf542.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/e34aaff9-0ae2c0a7022523ef.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/f97e080b-661babc726bcbb71.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/framework-58f97e80b1d6e3ea.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/main-9e519c395ea8fb58.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/main-app-2756f88a3a183782.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/pages/_app-abffdcde9d309a0c.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/pages/_error-94b8133dd8229633.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-dfc2a48f35ad2859.js",revision:"_9xK7f10gpSqYRD5q1oD5"},{url:"/_next/static/css/7ffed52a68484770.css",revision:"7ffed52a68484770"},{url:"/_next/static/css/c541e80218d274fd.css",revision:"c541e80218d274fd"},{url:"/_next/static/media/122c360d7fe6d395-s.p.woff2",revision:"9b2795fb691d8f8a83312a4436f5a453"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/9bbb7f84f3601865-s.woff2",revision:"d8134b7ae9ca2232a397ef9afa6c8d30"},{url:"/_next/static/media/9f05b6a2725a7318-s.woff2",revision:"afbfd524bdefea1003f0ee71b617e50e"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/a8eac78432f0a60b-s.woff2",revision:"be605f007472cc947fe6b6bb493228a5"},{url:"/_next/static/media/c740c1d45290834f-s.woff2",revision:"bff99a4bbc4740c49b75b52f290be90e"},{url:"/_next/static/media/d0697bdd3fb49a78-s.woff2",revision:"50b29fea20cba8e522c34a1413592253"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/favicon.ico",revision:"b75fdb2855699643a629b4e332e81106"},{url:"/fonts/cooper-normal.js",revision:"a8768608df074f61f1434c6379ddcc03"},{url:"/fonts/roboto-normal.js",revision:"5125ef3a5a312be629075c19205b8fcc"},{url:"/fonts/sfbold-normal.js",revision:"c1cbbc1d250d3c5d3484dcf0d50cbe68"},{url:"/fonts/thunder-normal.js",revision:"b8107b26f512ca6aa9cbdd66b66981f7"},{url:"/images/icons/icon-128x128.png",revision:"830aa57f8e141143b1a46e33db6c6334"},{url:"/images/icons/icon-144x144.png",revision:"422ae3e2e3fbca5b6ea03c092766ead0"},{url:"/images/icons/icon-152x152.png",revision:"3ed011000f4f0b103bb2fa7f6347c5c6"},{url:"/images/icons/icon-192x192.png",revision:"909c536cebcfec6a84313940ac4d4834"},{url:"/images/icons/icon-384x384.png",revision:"33f4b8f43bb84ddabe8cf53c8f6e1aee"},{url:"/images/icons/icon-512x512.png",revision:"e902282b70c313d0e329075e748321df"},{url:"/images/icons/icon-72x72.png",revision:"f9274404ef29b1b848e98532d2baeb1c"},{url:"/images/icons/icon-96x96.png",revision:"49a18f21b9517e70844e2f7ed02ccd7d"},{url:"/img/jec.png",revision:"f403cc2c62fc5f36ad70d6938dd00590"},{url:"/img/jmm.png",revision:"00d6d8be447afb551c8910ffde547334"},{url:"/manifest.json",revision:"5c78a04bed3508cfd1777473353a591e"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
