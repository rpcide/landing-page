import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_BEoxjYPR.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D6KN1mgA.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/user/landing-page/","cacheDir":"file:///home/user/landing-page/node_modules/.astro/","outDir":"file:///home/user/landing-page/dist/","srcDir":"file:///home/user/landing-page/src/","publicDir":"file:///home/user/landing-page/public/","buildClientDir":"file:///home/user/landing-page/dist/client/","buildServerDir":"file:///home/user/landing-page/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/shared/[slug]","isIndex":false,"type":"page","pattern":"^\\/shared\\/([^/]+?)\\/?$","segments":[[{"content":"shared","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/shared/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://rpcide.cloud","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/user/landing-page/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/home/user/landing-page/src/pages/[lang]/about.astro",{"propagation":"none","containsHead":true}],["/home/user/landing-page/src/pages/[lang]/contact.astro",{"propagation":"none","containsHead":true}],["/home/user/landing-page/src/pages/[lang]/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/shared/[slug]@_@astro":"pages/shared/_slug_.astro.mjs","\u0000@astro-page:src/pages/[lang]/about@_@astro":"pages/_lang_/about.astro.mjs","\u0000@astro-page:src/pages/[lang]/contact@_@astro":"pages/_lang_/contact.astro.mjs","\u0000@astro-page:src/pages/[lang]/index@_@astro":"pages/_lang_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B12eutNI.mjs","/home/user/landing-page/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_gQ__SgOU.mjs","/home/user/landing-page/src/components/LanguageToggle":"_astro/LanguageToggle.CsjzRLLC.js","@astrojs/react/client.js":"_astro/client.DOEe5J6n.js","/home/user/landing-page/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DJFWlTNo.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/user/landing-page/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var v=()=>{window.va||(window.va=function(...i){window.vaq||(window.vaq=[]),window.vaq.push(i)})},w=\"@vercel/analytics\",h=\"2.0.1\";function f(){return typeof window<\"u\"}function l(){try{const e=\"production\"}catch{}return\"production\"}function m(e=\"auto\"){if(e===\"auto\"){window.vam=l();return}window.vam=e}function y(){return(f()?window.vam:l())||\"production\"}function d(){return y()===\"development\"}function b(e,i){if(!e||!i)return e;let n=e;try{const t=Object.entries(i);for(const[r,s]of t)if(!Array.isArray(s)){const o=u(s);o.test(n)&&(n=n.replace(o,`/[${r}]`))}for(const[r,s]of t)if(Array.isArray(s)){const o=u(s.join(\"/\"));o.test(n)&&(n=n.replace(o,`/[...${r}]`))}return n}catch{return e}}function u(e){return new RegExp(`/${g(e)}(?=[/?#]|$)`)}function g(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}function E(e){return e.scriptSrc?a(e.scriptSrc):d()?\"https://va.vercel-scripts.com/v1/script.debug.js\":e.basePath?a(`${e.basePath}/insights/script.js`):\"/_vercel/insights/script.js\"}function k(e,i){var n;let t=e;if(i)try{t={...(n=JSON.parse(i))==null?void 0:n.analytics,...e}}catch{}m(t.mode);const r={sdkn:w+(t.framework?`/${t.framework}`:\"\"),sdkv:h};return t.disableAutoTrack&&(r.disableAutoTrack=\"1\"),t.viewEndpoint&&(r.viewEndpoint=a(t.viewEndpoint)),t.eventEndpoint&&(r.eventEndpoint=a(t.eventEndpoint)),t.sessionEndpoint&&(r.sessionEndpoint=a(t.sessionEndpoint)),d()&&t.debug===!1&&(r.debug=\"false\"),t.dsn&&(r.dsn=t.dsn),t.endpoint?r.endpoint=t.endpoint:t.basePath&&(r.endpoint=a(`${t.basePath}/insights`)),{beforeSend:t.beforeSend,src:E(t),dataset:r}}function a(e){return e.startsWith(\"http://\")||e.startsWith(\"https://\")||e.startsWith(\"/\")?e:`/${e}`}function S(e={debug:!0},i){var n;if(!f())return;const{beforeSend:t,src:r,dataset:s}=k(e,i);if(v(),t&&((n=window.va)==null||n.call(window,\"beforeSend\",t)),document.head.querySelector(`script[src*=\"${r}\"]`))return;const o=document.createElement(\"script\");o.src=r;for(const[c,p]of Object.entries(s))o.dataset[c]=p;o.defer=!0,o.onerror=()=>{const c=d()?\"Please check if any ad blockers are enabled and try again.\":\"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.\";console.log(`[Vercel Web Analytics] Failed to load script from ${r}. ${c}`)},document.head.appendChild(o)}function $({route:e,path:i}){var n;(n=window.va)==null||n.call(window,\"pageview\",{route:e,path:i})}function A(){try{return}catch{}}function j(){try{return}catch{}}customElements.define(\"vercel-analytics\",class extends HTMLElement{constructor(){super();try{const i=JSON.parse(this.dataset.props??\"{}\"),n=JSON.parse(this.dataset.params??\"{}\");S({...i,disableAutoTrack:!0,framework:\"astro\",basePath:A(),beforeSend:window.webAnalyticsBeforeSend},j());const t=this.dataset.pathname;$({route:b(t??\"\",n),path:t})}catch(i){throw new Error(`Failed to parse WebAnalytics properties: ${i}`)}}});"]],"assets":["/_astro/about.CyNx__EB.css","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/logo.svg","/logo.webp","/robots.txt","/site.webmanifest","/_astro/LanguageToggle.CsjzRLLC.js","/_astro/client.DOEe5J6n.js","/_astro/index.B0Uyvdbg.js","/assets/c.png","/assets/cplus.png","/assets/csharp.png","/assets/golang.png","/assets/java.png","/assets/javascript.png","/assets/kotlin.png","/assets/python.png","/assets/rust.png","/404.html","/index.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["es","en","pt"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"yUgT2EabXj0AiUksnNgdMVSyT+prykHuT7L4bQCzBYg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
