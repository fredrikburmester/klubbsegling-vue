if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const t=e=>i(e,o),d={module:{uri:o},exports:l,require:t};s[o]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(r(...e),l)))}}define(["./workbox-fae7736f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_index.html",revision:"09ad08f0f1942258804ffb3b0bb202a3"},{url:"assets/index.055f53db.css",revision:null},{url:"assets/index.e789b6ed.js",revision:null},{url:"assets/Profile.0dde13d9.js",revision:null},{url:"assets/Profile.7ffe3254.css",revision:null},{url:"assets/vendor.219d5239.js",revision:null},{url:"index.html",revision:"6e60aec86781e18c693b0016b003c608"},{url:"favicon.ico",revision:"51caf0d9ba2834403feccac40a23086e"},{url:"robots.txt",revision:"5e0bd1c281a62a380d7a948085bfe2d1"},{url:"manifest.webmanifest",revision:"164f452022dede6a70600eae9d0cdf6d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
