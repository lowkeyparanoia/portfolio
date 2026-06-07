/* Featured / "work" projects — shared by the 3D carousel (Carousel3D) and the
   grid (FeaturedWork). Each card opens the interactive viz modal via onOpenViz(key). */
export const featured = [
  {
    key: 'champiq', visual: 'img', img: '/projects/champiq.png',
    badge: { t: 'Freelance · ChampionsGroup', c: 'cyan' },
    domain: 'Marketing · SDR',
    title: 'ChampIQ', tagline: 'AI-native SDR canvas',
    hook: 'Per-client knowledge graph + signal-grounded AI outreach on a durable DAG. 3–5× reply lift.',
    stack: ['Sim', 'Knowledge Graph', 'Claude', 'React'],
    arch: ['champiq', 'champsim'],
  },
  {
    key: 'fieldstone', visual: 'img', img: '/projects/fieldstone/01-dashboard.png',
    badge: { t: 'In-house · Open source', c: 'gold' },
    domain: 'Developer Infrastructure',
    title: 'Fieldstone', tagline: 'in-house PocketBase alternative',
    hook: 'A single Go binary: REST + GraphQL + gRPC over Postgres with real RLS, WASM plugins, a realtime hub.',
    stack: ['Go', 'Postgres', 'gRPC', 'WASM'],
    arch: ['fieldstone'], viz: '/fieldstone-concurrency.html',
    repo: 'https://github.com/lowkeyparanoia/fieldstone',
  },
  {
    key: 'longevity', visual: 'img', img: '/projects/longevity/01-home-today-dashboard.png',
    badge: { t: 'Team · Champ-Deep', c: 'green' },
    domain: 'Healthcare · Longevity',
    title: '100xLongevity', tagline: 'clinical longevity platform',
    hook: 'Biological-age scoring, wearables, on-device CV, and physician-gated AI consults — DPDPA-compliant.',
    stack: ['React Native', 'Supabase', 'Zoom', 'Ollama'],
    arch: ['longevity'],
  },
  {
    key: 'contrapunk', visual: 'wave',
    badge: { t: 'Open source · Rust', c: 'cyan' },
    domain: 'Music Tech',
    title: 'Contrapunk', tagline: 'real-time counterpoint engine',
    hook: 'Plug in a guitar → rule-correct Bach / Jazz / Palestrina harmony in <10 ms. One Rust core, four surfaces.',
    stack: ['Rust', 'Tauri', 'WASM', 'VexFlow'],
    repo: 'https://github.com/contrapunk-audio/contrapunk', live: 'https://contrapunk.com',
    note: 'demo video coming',
  },
];
