<script>
  /* Full-screen modal that lazy-loads the Svelte Flow diagram on open, so the
     flow library + its CSS never touch the landing bundle. */
  import { fade } from 'svelte/transition';
  import { architectures } from '$lib/data/architectures.js';

  let { open = $bindable(false), diagramKey = null } = $props();

  let reduce = $state(false);
  const diagram = $derived(diagramKey ? architectures[diagramKey] : null);

  function close() { open = false; }

  $effect(() => {
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch {}
  });
  $effect(() => {
    if (!open) return;
    const onKey = (ev) => { if (ev.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  });
</script>

{#if open && diagram}
  <div class="ov" role="dialog" aria-modal="true" aria-label={diagram.title} tabindex="-1"
    onclick={(e) => { if (e.target === e.currentTarget) close(); }}
    onkeydown={(e) => { if (e.key === 'Escape') close(); }}
    transition:fade={{ duration: reduce ? 0 : 160 }}>
    <div class="term shell">
      <div class="term-bar">
        <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
        <span class="term-title">architecture · {diagramKey}.flow</span>
        <button class="x" onclick={close} aria-label="Close diagram">✕</button>
      </div>
      <div class="head">
        <h3>{diagram.title}</h3>
        <p>{diagram.subtitle}</p>
        <span class="hint">drag nodes · scroll to zoom · drag canvas to pan</span>
      </div>
      {#await import('./ArchDiagram.svelte')}
        <div class="loading">loading interactive diagram…</div>
      {:then mod}
        <mod.default {diagram} height="min(62vh, 540px)" />
      {/await}
    </div>
  </div>
{/if}

<style>
  .ov {
    position: fixed; inset: 0; z-index: 10000;
    background: rgba(2, 4, 8, 0.78); backdrop-filter: blur(4px);
    display: grid; place-items: center; padding: 4vw;
  }
  .shell { width: min(1080px, 96vw); max-height: 92vh; display: flex; flex-direction: column; }
  .term-bar { position: relative; }
  .x {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: var(--text-mute); cursor: pointer;
    font-size: 0.85rem; padding: 2px 6px; border-radius: 3px;
  }
  .x:hover { color: var(--red); }
  .head { padding: 16px 20px 10px; border-bottom: 1px solid var(--border); }
  .head h3 { font-family: var(--sans); font-size: 1.05rem; color: var(--green); margin-bottom: 4px; }
  .head p  { font-size: 0.8rem; color: var(--text-dim); margin-bottom: 8px; }
  .hint {
    font-family: var(--font); font-size: 0.66rem; letter-spacing: 0.06em;
    color: var(--text-mute); text-transform: uppercase;
  }
  .loading {
    height: 320px; display: grid; place-items: center;
    color: var(--text-mute); font-family: var(--font); font-size: 0.8rem;
  }
</style>
