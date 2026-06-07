<script>
  /* Project card: optional media hover-preview, full description (kept),
     context badge, stack/metrics, links, and "view architecture" buttons. */
  import { base } from '$app/paths';

  let { p, onViewArch } = $props();

  const ARCH_LABEL = {
    champiq: 'Canvas flow',
    champsim: 'Pack architecture',
    fieldstone: 'RLS request path',
  };
  const archKeys = $derived(Array.isArray(p.arch) ? p.arch : p.arch ? [p.arch] : []);
</script>

<div class="term proj-card" class:wide={p.wide} data-color={p.color}>
  {#if p.img}
    <div class="pc-media">
      <img src="{base}{p.img}" alt="{p.title} screenshot" loading="lazy" />
      <span class="pc-media-tag">▶ live preview</span>
    </div>
  {/if}
  <div class="term-bar">
    <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
    <span class="term-title">{p.file}</span>
    {#if p.context}<span class="pc-ctx pc-{p.context.cls}">{p.context.label}</span>{/if}
  </div>
  <div class="term-body">
    <p class="proj-type">{p.type}</p>
    <h3 class="proj-title">{p.title}</h3>
    {#if p.hook}<p class="pc-hook">{p.hook}</p>{/if}
    <p class="proj-desc">{p.desc}</p>
    {#if p.why}<p class="pc-why"><span class="pc-why-k">// why:</span> {p.why}</p>{/if}
    <div class="proj-stack">{#each p.stack as s}<span class="tag">{s}</span>{/each}</div>
    <div class="proj-metrics">
      {#each p.metrics as m}<span class="metric {m.c}">✓ {m.t}</span>{/each}
    </div>
    {#if archKeys.length || p.viz || p.repo || p.live}
      <div class="pc-actions">
        {#each archKeys as k}
          <button class="pc-btn" onclick={() => onViewArch(k)}>◧ {ARCH_LABEL[k] ?? 'Architecture'} →</button>
        {/each}
        {#if p.viz}<a class="pc-btn ghost" href="{base}{p.viz}" target="_blank" rel="noopener">▶ interactive viz</a>{/if}
        {#if p.repo}<a class="pc-btn ghost" href={p.repo} target="_blank" rel="noopener">⌥ repo</a>{/if}
        {#if p.live}<a class="pc-btn ghost" href={p.live} target="_blank" rel="noopener">↗ live</a>{/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .proj-card { transition: 0.25s; display: flex; flex-direction: column; overflow: hidden; flex: 1; min-width: 0; }
  .proj-card:hover { box-shadow: 0 0 24px rgba(0,255,65,0.08); }
  .proj-card[data-color="cyan"]:hover  { border-color: var(--cyan-d); }
  .proj-card[data-color="gold"]:hover  { border-color: var(--gold-d); }
  .proj-card[data-color="green"]:hover { border-color: var(--green-dim); }

  /* media hover-preview */
  .pc-media { position: relative; aspect-ratio: 16/9; overflow: hidden; border-bottom: 1px solid var(--border); background: #000; }
  .pc-media img {
    width: 100%; height: 100%; object-fit: cover; object-position: top left; display: block;
    filter: brightness(0.82); transition: transform 0.45s ease, filter 0.3s ease;
  }
  .proj-card:hover .pc-media img { transform: scale(1.05); filter: brightness(1); }
  .pc-media-tag {
    position: absolute; bottom: 8px; left: 10px; font-family: var(--font);
    font-size: 0.6rem; letter-spacing: 0.08em; color: var(--green);
    background: rgba(2,4,8,0.7); border: 1px solid var(--border); padding: 2px 7px; border-radius: 3px;
  }

  .term-bar { position: relative; }
  .pc-ctx {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    font-family: var(--font); font-size: 0.58rem; letter-spacing: 0.04em;
    padding: 2px 7px; border-radius: 3px; border: 1px solid var(--border2); color: var(--text-dim);
  }
  .pc-cyan  { color: var(--cyan);  border-color: var(--cyan-d); }
  .pc-gold  { color: var(--gold);  border-color: var(--gold-d); }
  .pc-green { color: var(--green); border-color: var(--green-dim); }

  .proj-type  { font-size: 0.7rem; color: var(--text-mute); margin-bottom: 8px; }
  .proj-title { font-family: var(--sans); font-size: 1rem; font-weight: 700; color: var(--green); margin-bottom: 8px; }
  .pc-hook    { font-size: 0.85rem; color: var(--cyan); font-weight: 500; line-height: 1.5; margin-bottom: 10px; font-style: italic; }
  .proj-desc  { font-size: 0.82rem; color: var(--text-dim); line-height: 1.65; margin-bottom: 10px; }
  .pc-why     { font-size: 0.78rem; color: var(--text-mute); line-height: 1.6; margin-bottom: 12px; }
  .pc-why-k   { color: var(--green); }
  .proj-stack { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 12px; }
  .proj-metrics { display: flex; flex-direction: column; gap: 3px; margin-bottom: 12px; }

  .pc-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
  .pc-btn {
    font-family: var(--font); font-size: 0.7rem; letter-spacing: 0.03em;
    padding: 6px 11px; border-radius: 4px; cursor: pointer; text-decoration: none;
    background: var(--green); color: #000; border: none; font-weight: 700; transition: 0.2s;
  }
  .pc-btn:hover { background: var(--cyan); color: #000; }
  .pc-btn.ghost { background: transparent; color: var(--green); border: 1px solid var(--border2); font-weight: 500; }
  .pc-btn.ghost:hover { border-color: var(--green); color: var(--cyan); background: transparent; }

  @media (max-width: 900px) { .proj-card.wide { grid-column: span 1; } }
</style>
