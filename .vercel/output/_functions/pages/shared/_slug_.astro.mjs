import { e as createAstro, f as createComponent } from '../../chunks/astro/server_BEoxjYPR.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://rpcide.cloud");
const prerender = false;
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  return Astro2.redirect(`https://app.rpcide.cloud/shared/${slug}`);
}, "/home/user/landing-page/src/pages/shared/[slug].astro", void 0);

const $$file = "/home/user/landing-page/src/pages/shared/[slug].astro";
const $$url = "/shared/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
