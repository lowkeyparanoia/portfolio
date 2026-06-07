<script>
  /* The "hook" section above Experience — leads with visuals, not text.
     Four flagship builds, each with a live visual + an interactive architecture. */
  import { base } from '$app/paths';
  import WaveformCanvas from './WaveformCanvas.svelte';

  let { onOpenViz } = $props();

  const featured = [
    {
      key: 'champiq', visual: 'img', img: '/projects/champiq.png',
      badge: { t: 'Freelance · ChampionsGroup', c: 'cyan' },
      title: 'ChampIQ', tagline: 'AI-native SDR canvas',
      hook: 'Per-client knowledge graph + signal-grounded AI outreach on a durable DAG. 3–5× reply lift.',
      stack: ['Sim', 'Knowledge Graph', 'Claude', 'React'],
      arch: ['champiq', 'champsim'],
    },
    {
      key: 'fieldstone', visual: 'img', img: '/projects/fieldstone-viz.png',
      badge: { t: 'In-house · Open source', c: 'gold' },
      title: 'Fieldstone', tagline: 'in-house PocketBase alternative',
      hook: 'A single Go binary: REST + GraphQL + gRPC over Postgres with real RLS, WASM plugins, a realtime hub.',
      stack: ['Go', 'Postgres', 'gRPC', 'WASM'],
      arch: ['fieldstone'], viz: '/fieldstone-concurrency.html',
      repo: 'https://github.com/lowkeyparanoia/fieldstone',
    },
    {
      key: 'longevity', visual: 'ring', score: 78,
      badge: { t: 'Team · Champ-Deep', c: 'green' },
      title: '100xLongevity', tagline: 'clinical longevity platform',
      hook: 'Biological-age scoring, wearables, on-device CV, and physician-gated AI consults — DPDPA-compliant.',
      stack: ['React Native', 'Supabase', 'Zoom', 'Ollama'],
      arch: ['longevity'],
    },
    {
      key: 'contrapunk', visual: 'wave',
      badge: { t: 'Open source · Rust', c: 'cyan' },
      title: 'Contrapunk', tagline: 'real-time counterpoint engine',
      hook: 'Plug in a guitar → rule-correct Bach / Jazz / Palestrina harmony in <10 ms. One Rust core, four surfaces.',
      stack: ['Rust', 'Tauri', 'WASM', 'VexFlow'],
      repo: 'https://github.com/contrapunk-audio/contrapunk', live: 'https://contrapunk.com',
      note: 'demo video coming',
    },
  ];

</script>

<div class="fw-grid">
  {#each featured as f}
    <article class="term fw-tile" data-c={f.badge.c}>
      <div class="fw-visual">
        {#if f.visual === 'img'}
          <img src="{base}{f.img}" alt="{f.title} preview" loading="lazy" />
        {:else if f.visual === 'wave'}
          <WaveformCanvas colorA="#00e5ff" colorB="#9a6cf0" />
          <span class="fw-vtag">♪ audio-reactive</span>
        {:else if f.visual === 'ring'}
          <div class="fw-ring">
            <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" stroke-width="8" />
              <circle class="fw-ring-arc" cx="60" cy="60" r="50" fill="none" stroke="var(--green)"
                stroke-width="8" stroke-linecap="round"
                stroke-dasharray="314" stroke-dashoffset={314 - (314 * f.score) / 100}
                transform="rotate(-90 60 60)" />
            </svg>
            <div class="fw-ring-num">{f.score}<span>/100</span></div>
          </div>
          <span class="fw-vtag">vitality score</span>
        {/if}
      </div>

      <div class="fw-body">
        <span class="fw-badge fw-{f.badge.c}">{f.badge.t}</span>
        <h3 class="fw-title">{f.title} <span class="fw-tag">— {f.tagline}</span></h3>
        <p class="fw-hook">{f.hook}</p>
        <div class="fw-stack">{#each f.stack as s}<span class="tag">{s}</span>{/each}</div>
        <div class="fw-actions">
          <button class="fw-btn" onclick={() => onOpenViz(f.key)}>◧ Explore visualizations →</button>
          {#if f.live}<a class="fw-btn ghost" href={f.live} target="_blank" rel="noopener">↗ live</a>{/if}
          {#if f.repo}<a class="fw-btn ghost" href={f.repo} target="_blank" rel="noopener">⌥ repo</a>{/if}
          {#if f.note}<span class="fw-note">{f.note}</span>{/if}
        </div>
      </div>
    </article>
  {/each}
</div>

<style>
  .fw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .fw-tile { display: flex; flex-direction: column; overflow: hidden; transition: border-color 0.25s, box-shadow 0.25s; }
  .fw-tile[data-c="cyan"]:hover  { border-color: var(--cyan-d);  box-shadow: 0 0 30px rgba(0,229,255,0.08); }
  .fw-tile[data-c="gold"]:hover  { border-color: var(--gold-d);  box-shadow: 0 0 30px rgba(255,215,0,0.07); }
  .fw-tile[data-c="green"]:hover { border-color: var(--green-dim);box-shadow: 0 0 30px rgba(0,255,65,0.08); }

  .fw-visual {
    position: relative; aspect-ratio: 16/8; overflow: hidden; background: #000;
    border-bottom: 1px solid var(--border); display: grid; place-items: center;
  }
  .fw-visual img { width: 100%; height: 100%; object-fit: cover; object-position: top left; filter: brightness(0.85); transition: transform 0.5s ease, filter 0.3s; }
  .fw-tile:hover .fw-visual img { transform: scale(1.05); filter: brightness(1); }
  .fw-vtag {
    position: absolute; bottom: 8px; left: 10px; font-family: var(--font); font-size: 0.6rem;
    letter-spacing: 0.08em; color: var(--cyan); background: rgba(2,4,8,0.65);
    border: 1px solid var(--border); padding: 2px 7px; border-radius: 3px;
  }
  /* longevity ring */
  .fw-ring { position: relative; display: grid; place-items: center; }
  .fw-ring-arc { animation: fw-fill 1.4s ease forwards; }
  @keyframes fw-fill { from { stroke-dashoffset: 314; } }
  .fw-ring-num { position: absolute; font-family: var(--sans); font-size: 1.7rem; font-weight: 800; color: var(--green); }
  .fw-ring-num span { font-size: 0.7rem; color: var(--text-mute); font-weight: 400; }

  .fw-body { padding: 16px 18px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
  .fw-badge { align-self: flex-start; font-family: var(--font); font-size: 0.58rem; letter-spacing: 0.04em; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--border2); color: var(--text-dim); }
  .fw-cyan  { color: var(--cyan);  border-color: var(--cyan-d); }
  .fw-gold  { color: var(--gold);  border-color: var(--gold-d); }
  .fw-green { color: var(--green); border-color: var(--green-dim); }
  .fw-title { font-family: var(--sans); font-size: 1.15rem; font-weight: 800; color: #fff; }
  .fw-tag   { font-family: var(--font); font-size: 0.78rem; font-weight: 400; color: var(--text-mute); }
  .fw-hook  { font-size: 0.84rem; color: var(--text-dim); line-height: 1.6; }
  .fw-stack { display: flex; flex-wrap: wrap; gap: 5px; }
  .fw-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: auto; padding-top: 4px; }
  .fw-btn {
    font-family: var(--font); font-size: 0.72rem; letter-spacing: 0.03em; padding: 7px 12px;
    border-radius: 4px; cursor: pointer; text-decoration: none; border: none; font-weight: 700;
    background: var(--green); color: #000; transition: 0.2s;
  }
  .fw-btn:hover { background: var(--cyan); color: #000; }
  .fw-btn.ghost { background: transparent; color: var(--green); border: 1px solid var(--border2); font-weight: 500; }
  .fw-btn.ghost:hover { border-color: var(--green); color: var(--cyan); }
  .fw-note { font-family: var(--font); font-size: 0.66rem; color: var(--text-mute); font-style: italic; }

  @media (max-width: 900px) { .fw-grid { grid-template-columns: 1fr; } }
  @media (prefers-reduced-motion: reduce) { .fw-ring-arc { animation: none; } }
</style>
