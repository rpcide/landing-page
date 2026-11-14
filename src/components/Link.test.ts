import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Link from "./Link.astro";

describe("Link.astro", () => {
  let container: AstroContainer;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  const render = (path: string, props: Record<string, unknown>) =>
    container.renderToString(Link, {
      props,
      slots: { default: "About" },
      request: new Request(`https://rpcide.com${path}`),
    });

  it.each([
    ["/es/", "/es/about"],
    ["/pt/contact", "/pt/about"],
    ["/en", "/en/about"],
  ])("on %s links to %s", async (page, expected) => {
    const html = await render(page, { href: "/about" });
    expect(html).toContain(`href="${expected}"`);
    expect(html).toContain("About");
  });

  it("passes target and class through", async () => {
    const html = await render("/es", { href: "/", target: "_blank", className: "font-bold" });
    expect(html).toContain('target="_blank"');
    expect(html).toContain('class="font-bold"');
  });
});
