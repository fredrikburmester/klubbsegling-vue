/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-a51b997a'], (function (workbox) { 'use strict';

  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });




  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([
    {
      "url": "_index.html",
      "revision": "09ad08f0f1942258804ffb3b0bb202a3"
    },
    {
      "url": "assets/index.7b7d250b.js",
      "revision": null
    },
    {
      "url": "assets/index.e11c04bd.css",
      "revision": null
    },
    {
      "url": "assets/Profile.c3f56788.css",
      "revision": null
    },
    {
      "url": "assets/Profile.db628ae8.js",
      "revision": null
    },
    {
      "url": "assets/vendor.f4f07c6f.js",
      "revision": null
    },
    {
      "url": "index.html",
      "revision": "42203914936a90306f7b3630ed363cf2"
    },
    {
      "url": "favicon.ico",
      "revision": "51caf0d9ba2834403feccac40a23086e"
    },
    {
      "url": "robots.txt",
      "revision": "5e0bd1c281a62a380d7a948085bfe2d1"
    },
    {
      "url": "img/icons/apple-touch-icon.png",
      "revision": "52ec76aa45f1aed626c168f01048b51d"
    },
    {
      "url": "img/icons/android-chrome-192x192.png",
      "revision": "84af42a18d627fe50bb966b412d02037"
    },
    {
      "url": "manifest.webmanifest",
      "revision": "9499c081f20f4c48a7d08a675c9fd46b"
    }
  ], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
