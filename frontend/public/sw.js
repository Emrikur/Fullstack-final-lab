if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + ".js", i).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, r) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[o]) return;
    let l = {};
    const t = (e) => n(e, o),
      u = { module: { uri: o }, exports: l, require: t };
    s[o] = Promise.all(i.map((e) => u[e] || t(e))).then((e) => (r(...e), l));
  };
}
define(["./workbox-5ffe50d4"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "assets/AlveraDemoBoldSquare-8OwLB--J8nkhjV.otf",
          revision: null,
        },
        {
          url: "assets/AlveraDemoRegularSquare-rvpm9-DRCwPX9U.otf",
          revision: null,
        },
        { url: "assets/apple-icon-180-CZTfB1Z-.png", revision: null },
        { url: "assets/index-CY0SSiz_.js", revision: null },
        { url: "assets/index-IDe3vgqY.css", revision: null },
        { url: "assets/workbox-window.prod.es5-B9K5rw8f.js", revision: null },
        { url: "index.html", revision: "4345e27d483478fc4a43b26dfccc918e" },
        {
          url: "manifest-icon-192.maskable.png",
          revision: "018c8dbc6b53ba2682bfb3e49736ac2a",
        },
        {
          url: "manifest-icon-512.maskable.png",
          revision: "d73d3d38b42636a478524ef6f34e2671",
        },
        {
          url: "manifest.webmanifest",
          revision: "d1256cfb76a13f4bc5ad8532226442d5",
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    );
});
