<script>
  import { base } from '$app/paths';
  let { images = [] } = $props(); // [{ src, cap }]
  let active = $state(0);
</script>

{#if images.length}
  <div class="sg">
    <div class="sg-main">
      <img src="{base}{images[active].src}" alt={images[active].cap} />
      <span class="sg-badge">live capture</span>
    </div>
    <div class="sg-cap">{images[active].cap}</div>
    <div class="sg-thumbs">
      {#each images as im, i}
        <button class="sg-th" class:on={i === active} onclick={() => (active = i)} aria-label={im.cap}>
          <img src="{base}{im.src}" alt={im.cap} loading="lazy" />
        </button>
      {/each}
    </div>
  </div>
{/if}

<style>
  .sg-main { position: relative; border: 1px solid var(--border2); border-radius: var(--radius); overflow: hidden; background: #000; }
  .sg-main img { width: 100%; display: block; max-height: min(46vh, 380px); object-fit: contain; }
  .sg-badge {
    position: absolute; top: 8px; right: 8px; font-family: var(--font); font-size: 0.6rem;
    color: var(--green); background: rgba(2,4,8,0.7); border: 1px solid var(--border); padding: 2px 7px; border-radius: 3px;
  }
  .sg-cap { font-family: var(--font); font-size: 0.74rem; color: var(--text-dim); margin: 10px 0; }
  .sg-thumbs { display: flex; gap: 8px; flex-wrap: wrap; }
  .sg-th { padding: 0; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; cursor: pointer; background: none; width: 84px; height: 50px; }
  .sg-th.on { border-color: var(--green); box-shadow: 0 0 0 1px var(--green); }
  .sg-th img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>
