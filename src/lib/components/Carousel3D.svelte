<script>
  /* 3D carousel for the work section — a Svelte 5 port of the React ThreeDCarousel.
     Active card centered; prev/next peek (scaled + faded); the rest hidden.
     Auto-rotates while in view (pauses on hover), supports prev/next, dots, and
     touch swipe. Each card's CTA opens the interactive viz modal. Terminal-themed.
     Reduced-motion aware. */
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { featured } from '$lib/data/featured.js';
  import WaveformCanvas from './WaveformCanvas.svelte';

  let {
    onOpenViz,
    items = featured,
    autoRotate = true,
    rotateInterval = 5000,
    cardHeight = 460,
  } = $props();

  const n = $derived(items.length);
  let active = $state(0);
  let inView = $state(false);
  let hovering = $state(false);
  let isMobile = $state(false);
  let reduce = $state(false);
  let root = $state(null);

  let touchStart = null;
  const MIN_SWIPE = 45;

  function next() { active = (active + 1) % n; }
  function prev() { active = (active - 1 + n) % n; }
  function goTo(i) { active = i; }

  function posClass(i) {
    if (i === active) return 'c-active';
    if (i === (active + 1) % n) return 'c-next';
    if (i === (active - 1 + n) % n) return 'c-prev';
    return 'c-hidden';
  }

  onMount(() => {
    try {
      isMobile = window.matchMedia('(max-width: 760px)').matches;
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}
    let io;
    if (root) {
      io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.2 });
      io.observe(root);
    }
    return () => io && io.disconnect();
  });

  // auto-rotate while in view and not hovering (and motion allowed)
  $effect(() => {
    if (!autoRotate || !inView || hovering || reduce || n <= 1) return;
    void active; // re-arm after manual navigation
    const t = setInterval(next, rotateInterval);
    return () => clearInterval(t);
  });

  function onTouchStart(e) { touchStart = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStart == null) return;
    const d = touchStart - e.changedTouches[0].clientX;
    if (d > MIN_SWIPE) next();
    else if (d < -MIN_SWIPE) prev();
    touchStart = null;
  }
</script>

<div class="c3d" bind:this={root} class:reduce
  style="--ch:{cardHeight}px"
  role="group" aria-roledescription="carousel" aria-label="Featured work"
  onmouseenter={() => (hovering = true)} onmouseleave={() => (hovering = false)}
  ontouchstart={onTouchStart} ontouchend={onTouchEnd}>

  <div class="c3d-stage">
    {#each items as item, i}
      <article class="c3d-card {posClass(i)}" data-c={item.badge.c}
        aria-hidden={i !== active} aria-label="{item.title}">
        <!-- media -->
        <div class="c3d-media">
          {#if item.visual === 'wave'}
            <WaveformCanvas colorA="#00e5ff" colorB="#9a6cf0" />
          {:else}
            <img src="{base}{item.img}" alt="{item.title} preview" loading="lazy" />
          {/if}
          <div class="c3d-media-ov">
            <div class="c3d-mdomain">{item.domain}</div>
            <div class="c3d-mtitle">{item.title}</div>
            <div class="c3d-rule"></div>
            <div class="c3d-mtag">{item.tagline}</div>
          </div>
        </div>
        <!-- body -->
        <div class="c3d-body">
          <div class="c3d-meta">
            <span class="c3d-badge c3d-{item.badge.c}">{item.badge.t}</span>
          </div>
          <p class="c3d-hook">{item.hook}</p>
          <div class="c3d-tags">{#each item.stack as s}<span class="tag">{s}</span>{/each}</div>
          <div class="c3d-actions">
            <button class="c3d-btn" tabindex={i === active ? 0 : -1} onclick={() => onOpenViz(item.key)}>◧ Explore visualizations →</button>
            {#if item.live}<a class="c3d-btn ghost" tabindex={i === active ? 0 : -1} href={item.live} target="_blank" rel="noopener">↗ live</a>{/if}
            {#if item.repo}<a class="c3d-btn ghost" tabindex={i === active ? 0 : -1} href={item.repo} target="_blank" rel="noopener">⌥ repo</a>{/if}
          </div>
        </div>
      </article>
    {/each}
  </div>

  {#if !isMobile}
    <button class="c3d-nav left" onclick={prev} aria-label="Previous project">‹</button>
    <button class="c3d-nav right" onclick={next} aria-label="Next project">›</button>
  {/if}

  <div class="c3d-dots" role="tablist">
    {#each items as item, i}
      <button class="c3d-dot" class:on={active === i} role="tab" aria-selected={active === i}
        onclick={() => goTo(i)} aria-label="Show {item.title}"></button>
    {/each}
  </div>
</div>

<style>
  .c3d { position: relative; width: 100%; max-width: 920px; margin: 0 auto; }
  .c3d-stage {
    position: relative; height: calc(var(--ch) + 16px);
    display: flex; align-items: flex-start; justify-content: center;
    overflow: hidden; perspective: 1400px;
  }
  .c3d-card {
    position: absolute; top: 8px; left: 50%; width: min(88vw, 360px); height: var(--ch);
    display: flex; flex-direction: column; overflow: hidden;
    background: var(--surface); border: 1px solid var(--border2); border-radius: 8px;
    box-shadow: 0 18px 50px -18px rgba(0,0,0,.7);
    transform-origin: center center; will-change: transform, opacity;
    transition: transform .55s cubic-bezier(.4,.2,.2,1), opacity .55s, box-shadow .3s;
  }
  .reduce .c3d-card { transition: none; }
  /* stacking positions */
  .c-active { transform: translateX(-50%) scale(1);                 opacity: 1;   z-index: 20; }
  .c-next   { transform: translateX(calc(-50% + 46%)) scale(.84);   opacity: .45; z-index: 10; pointer-events: none; }
  .c-prev   { transform: translateX(calc(-50% - 46%)) scale(.84);   opacity: .45; z-index: 10; pointer-events: none; }
  .c-hidden { transform: translateX(-50%) scale(.74);               opacity: 0;   z-index: 1;  pointer-events: none; }
  .c-active[data-c="cyan"]  { border-color: var(--cyan-d);  box-shadow: 0 18px 50px -18px rgba(0,229,255,.3); }
  .c-active[data-c="gold"]  { border-color: var(--gold-d);  box-shadow: 0 18px 50px -18px rgba(255,215,0,.25); }
  .c-active[data-c="green"] { border-color: var(--green-dim);box-shadow: 0 18px 50px -18px rgba(0,255,65,.28); }

  /* media header */
  .c3d-media { position: relative; height: 168px; flex-shrink: 0; background: #000; overflow: hidden; }
  .c3d-media img { width: 100%; height: 100%; object-fit: cover; object-position: top center; filter: brightness(.55); }
  .c3d-media-ov { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 12px; background: linear-gradient(180deg, rgba(2,4,8,.25), rgba(2,4,8,.55)); }
  .c3d-mdomain { font-family: var(--font); font-size: .6rem; letter-spacing: .14em; text-transform: uppercase; color: var(--green); margin-bottom: 8px; }
  .c3d-mtitle { font-family: var(--sans); font-size: 1.5rem; font-weight: 800; color: #fff; line-height: 1; }
  .c3d-rule { width: 40px; height: 2px; background: var(--green); margin: 8px auto; }
  .c3d-mtag { font-family: var(--font); font-size: .72rem; color: var(--text-dim); }

  /* body */
  .c3d-body { flex: 1; min-height: 0; padding: 15px 17px; display: flex; flex-direction: column; gap: 10px; }
  .c3d-meta { display: flex; flex-wrap: wrap; gap: 8px; }
  .c3d-badge { font-family: var(--font); font-size: .58rem; letter-spacing: .04em; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--border2); color: var(--text-dim); }
  .c3d-cyan  { color: var(--cyan);  border-color: var(--cyan-d); }
  .c3d-gold  { color: var(--gold);  border-color: var(--gold-d); }
  .c3d-green { color: var(--green); border-color: var(--green-dim); }
  .c3d-hook { font-size: .84rem; color: var(--text-dim); line-height: 1.55; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 4; line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .c3d-tags { display: flex; flex-wrap: wrap; gap: 5px; }
  .c3d-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
  .c3d-btn { font-family: var(--font); font-size: .72rem; letter-spacing: .03em; padding: 7px 12px; border-radius: 4px; cursor: pointer; text-decoration: none; border: none; font-weight: 700; background: var(--green); color: #000; transition: .2s; }
  .c3d-btn:hover { background: var(--cyan); color: #000; }
  .c3d-btn.ghost { background: transparent; color: var(--green); border: 1px solid var(--border2); font-weight: 500; }
  .c3d-btn.ghost:hover { border-color: var(--green); color: var(--cyan); }

  /* nav arrows */
  .c3d-nav { position: absolute; top: calc(var(--ch) / 2); transform: translateY(-50%); z-index: 30;
    width: 38px; height: 38px; border-radius: 50%; cursor: pointer;
    background: var(--surface); border: 1px solid var(--border2); color: var(--green);
    font-size: 20px; line-height: 1; display: grid; place-items: center; transition: .2s; }
  .c3d-nav:hover { border-color: var(--green); color: var(--cyan); transform: translateY(-50%) scale(1.08); }
  .c3d-nav.left { left: 2%; }
  .c3d-nav.right { right: 2%; }

  /* dots */
  .c3d-dots { display: flex; justify-content: center; gap: 9px; margin-top: 14px; }
  .c3d-dot { width: 8px; height: 8px; border-radius: 999px; cursor: pointer; border: none; padding: 0;
    background: var(--border2); transition: .3s; }
  .c3d-dot.on { width: 22px; background: var(--green); box-shadow: 0 0 8px var(--green-dim); }

  @media (max-width: 760px) { .c3d-card { width: 88vw; } }
  @media (prefers-reduced-motion: reduce) { .c3d-card { transition: none; } }
</style>
