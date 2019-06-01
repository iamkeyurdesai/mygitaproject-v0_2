/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
  "/precache-manifest.6494f0432486c8ae516c8ef10fb1ccae.js"
);

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html", {
  
  blacklist: [/auth/],
});

workbox.routing.registerRoute(/full\/gita.*\.mp3$/, workbox.strategies.cacheFirst({ "cacheName":"my-mp3-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":5,"maxAgeSeconds":157680000,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/.*(?:googleapis|gstatic|cdn\.firebase)\.com.*$/, workbox.strategies.cacheFirst({ "cacheName":"my-lib-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":20,"maxAgeSeconds":157680000,"purgeOnQuotaError":false})] }), 'GET');
