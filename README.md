# Jrenoth Misquith — Portfolio

Built with SvelteKit 5 + Svelte 5 runes syntax.

## Setup
```bash
cd portfolio
npm install
npm run dev        # → http://localhost:5173
npm run build      # production build → build/
npm run preview    # preview production build
```

## Deploy options
### Vercel (recommended — free, auto HTTPS)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### GitHub Pages
Change adapter in svelte.config.js to `@sveltejs/adapter-static`, push to gh-pages branch.

## Customise
- **Content**: All data arrays are at the top of `src/routes/+page.svelte`
- **Colours**: CSS variables in `src/app.css` under `:root`
- **Links**: Update LinkedIn/GitHub hrefs in the Contact section
- **Profile photo**: Add `static/avatar.jpg` and reference in hero section
