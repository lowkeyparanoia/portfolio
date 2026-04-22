import "clsx";
import { a as attr_class, e as ensure_array_like, b as attr, c as escape_html } from "../../chunks/renderer.js";
function Nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let scrolled = false;
    let menuOpen = false;
    let time = "";
    const links = [
      { href: "#experience", label: "experience" },
      { href: "#projects", label: "projects" },
      { href: "#trading", label: "trading" },
      { href: "#ideas", label: "ideas" },
      { href: "#about", label: "about" },
      { href: "#contact", label: "contact" }
    ];
    $$renderer2.push(`<nav${attr_class("svelte-1h32yp1", void 0, { "scrolled": scrolled })}><div class="container nav-inner svelte-1h32yp1"><a href="#hero" class="logo svelte-1h32yp1">jm<span class="at svelte-1h32yp1">@</span>dev<span class="cursor-blink svelte-1h32yp1">_</span></a> <ul${attr_class("nav-links svelte-1h32yp1", void 0, { "open": menuOpen })}><!--[-->`);
    const each_array = ensure_array_like(links);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { href, label } = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", href)} class="svelte-1h32yp1"><span class="slash svelte-1h32yp1">/</span>${escape_html(label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul> <div class="nav-right svelte-1h32yp1"><span class="clock svelte-1h32yp1">${escape_html(time)}</span> <button class="burger svelte-1h32yp1" aria-label="menu">${escape_html("[≡]")}</button></div></div></nav>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  Nav($$renderer);
  $$renderer.push(`<!----> `);
  children($$renderer);
  $$renderer.push(`<!----> <footer class="svelte-12qhfyh"><div class="container"><span class="prompt-str svelte-12qhfyh">jm@dev</span><span class="tilde svelte-12qhfyh">:~$</span> <span class="ft-text svelte-12qhfyh">echo "built with SvelteKit · hosted on GitHub Pages"</span></div></footer>`);
}
export {
  _layout as default
};
