// Prerender the home page to a static index.html so the root URL returns 200
// (instead of falling back to 404.html). The 404.html SPA fallback still covers
// any other path. Client-side boot/animation runs on hydration as before.
export const prerender = true;
