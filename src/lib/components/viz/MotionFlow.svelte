<script>
  /* A small motion.dev-powered animated step sequence: a token travels through
     stages, each lights up, with a status line. Lazy-imports the `motion` lib. */
  import { onMount } from 'svelte';

  let { steps = [], accent = 'var(--green)', caption = '', auto = true } = $props();

  let tokenEl = $state(null);
  let stageEls = $state([]);
  let status = $state('');
  let playing = $state(false);
  let animate = null;

  onMount(async () => {
    try { ({ animate } = await import('motion')); } catch {}
    status = steps[0]?.sub ?? '';
    if (auto) setTimeout(play, 400);
  });

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function play() {
    if (playing || !steps.length) return;
    playing = true;
    stageEls.forEach((e) => e && e.classList.remove('on', 'done'));
    for (let i = 0; i < steps.length; i++) {
      stageEls.forEach((e, j) => { if (e) { e.classList.toggle('on', j === i); if (j < i) e.classList.add('done'); } });
      const s = stageEls[i];
      if (s && tokenEl) {
        const x = s.offsetLeft + s.offsetWidth / 2 - 9;
        if (animate) animate(tokenEl, { left: `${x}px` }, { duration: 0.42, ease: 'easeInOut' });
        else tokenEl.style.left = `${x}px`;
      }
      status = steps[i].sub ?? steps[i].label;
      await wait(580);
    }
    stageEls.forEach((e) => e && e.classList.add('done'));
    status = caption || status;
    playing = false;
  }
</script>

<div class="mf">
  <div class="mf-track" style="--ac:{accent}">
    {#each steps as s, i}
      <div class="mf-stage" bind:this={stageEls[i]}>
        <span class="mf-lab">{s.label}</span>
        {#if s.tag}<span class="mf-stag">{s.tag}</span>{/if}
      </div>
    {/each}
    <div class="mf-token" bind:this={tokenEl} style="background:{accent}"></div>
  </div>
  <div class="mf-foot">
    <span class="mf-status">{status}</span>
    <button class="mf-replay" onclick={play} disabled={playing}>↻ replay</button>
  </div>
</div>

<style>
  .mf { width: 100%; }
  .mf-track { position: relative; display: flex; gap: 8px; padding-top: 10px; }
  .mf-stage {
    flex: 1; min-width: 0; text-align: center; border: 1px solid var(--border);
    border-radius: 9px; padding: 11px 6px; background: var(--bg3); transition: 0.25s;
    display: flex; flex-direction: column; gap: 2px;
  }
  .mf-lab { font-family: var(--font); font-size: 0.66rem; color: var(--text-dim); line-height: 1.3; }
  .mf-stag { font-family: var(--font); font-size: 0.56rem; color: var(--text-mute); }
  /* .on / .done are toggled in JS — scope via the parent + :global so Svelte keeps them */
  .mf-track :global(.mf-stage.on) { border-color: var(--ac); background: color-mix(in srgb, var(--ac) 14%, transparent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--ac) 12%, transparent); }
  .mf-track :global(.mf-stage.on .mf-lab) { color: var(--ac); }
  .mf-track :global(.mf-stage.done) { border-color: color-mix(in srgb, var(--ac) 45%, var(--border)); }
  .mf-token {
    position: absolute; top: 0; left: 0; width: 18px; height: 18px; border-radius: 50%;
    box-shadow: 0 0 12px var(--ac); pointer-events: none;
  }
  .mf-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 12px; }
  .mf-status { font-family: var(--font); font-size: 0.74rem; color: var(--text-dim); line-height: 1.4; }
  .mf-replay {
    flex-shrink: 0; font-family: var(--font); font-size: 0.68rem; color: var(--cyan);
    background: transparent; border: 1px solid var(--border2); border-radius: 4px;
    padding: 5px 10px; cursor: pointer;
  }
  .mf-replay:hover { border-color: var(--cyan); }
  .mf-replay:disabled { opacity: 0.5; cursor: default; }
  @media (max-width: 700px) { .mf-stag { display: none; } }
  @media (max-width: 520px) {
    .mf-track { gap: 4px; }
    .mf-stage { padding: 9px 3px; }
    .mf-lab { font-size: 0.56rem; }
    .mf-status { font-size: 0.68rem; }
  }
</style>
