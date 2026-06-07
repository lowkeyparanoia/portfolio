<script>
  /* One of three section background treatments, alternated across the page for
     rhythm:
       · synth — the animated synthwave perspective-grid floor (most prominent)
       · solid — a clean flat surface a touch lighter than the base black
       · glow  — a very light ambient brand-green wash (simple, on-theme)
     All sit behind section content (which is lifted to z-index:2 globally). */
  import SynthwaveGrid from './SynthwaveGrid.svelte';
  let { variant = 'solid', intensity = 0.72 } = $props();
</script>

{#if variant === 'synth'}
  <SynthwaveGrid {intensity} />
{:else if variant === 'glow'}
  <div class="sbg sbg-glow" aria-hidden="true"></div>
{:else}
  <div class="sbg sbg-solid" aria-hidden="true"></div>
{/if}

<style>
  .sbg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
  /* solid: the repo's secondary surface — a subtle band over the base black */
  .sbg-solid { background: var(--bg2); }
  /* glow: ambient brand-green radial over the base black; light, not heavy */
  .sbg-glow {
    background: radial-gradient(78% 60% at 50% 6%, rgba(0,255,65,0.06), transparent 72%);
  }
</style>
