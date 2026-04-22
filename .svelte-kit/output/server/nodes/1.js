

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BnMVh1Tp.js","_app/immutable/chunks/CqTN4O4N.js","_app/immutable/chunks/BgemXhw2.js","_app/immutable/chunks/D7BY12jk.js"];
export const stylesheets = [];
export const fonts = [];
