import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_-Vp6QcRM.mjs';
import { manifest } from './manifest_B12eutNI.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/shared/_slug_.astro.mjs');
const _page3 = () => import('./pages/_lang_/about.astro.mjs');
const _page4 = () => import('./pages/_lang_/contact.astro.mjs');
const _page5 = () => import('./pages/_lang_.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/shared/[slug].astro", _page2],
    ["src/pages/[lang]/about.astro", _page3],
    ["src/pages/[lang]/contact.astro", _page4],
    ["src/pages/[lang]/index.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "c80ce8ce-e557-4729-a2cd-3b8176a0d9a2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
