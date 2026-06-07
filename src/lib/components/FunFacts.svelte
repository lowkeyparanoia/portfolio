<script>
  /* Terminal-style "did you know" pop-ups — a few performance / unique-build facts
     about this site. Svelte 5 runes, prerender-safe, reduced-motion aware,
     dismissible (remembers via localStorage). Matches the matrix/terminal theme. */
  import { fly, fade } from 'svelte/transition';

  const FACTS = [
    {
      tag: 'perf',
      title: '100% static — zero server',
      body: 'Shipped as a static single-page app (SvelteKit + adapter-static) on GitHub Pages. No backend, no database — just files on a CDN, so it loads in well under a second.'
    },
    {
      tag: 'craft',
      title: 'Hand-rolled visuals, no libraries',
      body: 'The matrix rain, candlesticks, ECG line, circuit board and spectrogram are all written from scratch in Canvas 2D / SVG. No charting, no animation, no WebGL dependency shipped.'
    },
    {
      tag: 'stack',
      title: 'Svelte 5 runes — tiny & reactive',
      body: 'Built on Svelte 5’s runes ($state / $derived) with fine-grained reactivity and no virtual DOM. The interactive layer is a few KB of JS, not a megabyte framework.'
    },
    {
      tag: 'detail',
      title: 'Scroll reveals from one observer',
      body: 'Sections fade in through a single IntersectionObserver, and the typed boot-sequence hero is a hand-written state machine — micro-interactions without the bundle cost.'
    }
  ];

  let mounted   = $state(false);
  let visible   = $state(false);
  let closed    = $state(false);
  let paused    = $state(false);
  let reduce    = $state(false);
  let i         = $state(0);

  // appear shortly after load; respect prior dismissal + reduced motion
  $effect(() => {
    mounted = true;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch {}
    try { if (localStorage.getItem('ff-dismissed') === '1') { closed = true; return; } } catch {}
    const t = setTimeout(() => { visible = true; }, 2200);
    return () => clearTimeout(t);
  });

  // auto-advance through the facts (pauses on hover / when closed)
  $effect(() => {
    if (!visible || closed || paused) return;
    void i; // re-arm timer whenever the card changes
    const t = setTimeout(() => { i = (i + 1) % FACTS.length; }, 9000);
    return () => clearTimeout(t);
  });

  function next()  { i = (i + 1) % FACTS.length; }
  function close() { closed = true; try { localStorage.setItem('ff-dismissed', '1'); } catch {} }
</script>

{#if mounted && visible && !closed}
  <aside
    class="ff"
    role="status"
    aria-label="Site fun facts"
    onmouseenter={() => (paused = true)}
    onmouseleave={() => (paused = false)}
    in:fly={{ y: reduce ? 0 : 24, duration: reduce ? 0 : 320 }}
    out:fade={{ duration: reduce ? 0 : 180 }}
  >
    <div class="ff-bar">
      <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
      <span class="ff-file">did_you_know.sh</span>
      <button class="ff-x" onclick={close} aria-label="Dismiss fun facts">✕</button>
    </div>

    {#key i}
      <div class="ff-body" in:fade={{ duration: reduce ? 0 : 220 }}>
        <div class="ff-tag">// {FACTS[i].tag}</div>
        <div class="ff-title"><span class="caret">▸</span> {FACTS[i].title}</div>
        <p class="ff-text">{FACTS[i].body}</p>
      </div>
    {/key}

    <div class="ff-foot">
      <div class="ff-dots" aria-hidden="true">
        {#each FACTS as _, d}
          <span class="pip" class:on={d === i}></span>
        {/each}
      </div>
      <button class="ff-next" onclick={next}>next ›</button>
    </div>
  </aside>
{/if}

<style>
  .ff {
    position: fixed;
    right: 22px; bottom: 22px;
    z-index: 9998;
    width: min(330px, calc(100vw - 32px));
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: var(--radius);
    box-shadow: 0 18px 50px -12px rgba(0,0,0,.7), 0 0 0 1px rgba(0,255,65,.06);
    font-family: var(--font);
    overflow: hidden;
  }
  .ff-bar {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 10px;
    background: var(--bg3);
    border-bottom: 1px solid var(--border);
  }
  .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
  .dot.r { background: var(--red); }
  .dot.y { background: var(--gold); }
  .dot.g { background: var(--green); }
  .ff-file {
    flex: 1; margin-left: 6px;
    font-size: .68rem; letter-spacing: .04em;
    color: var(--text-dim);
  }
  .ff-x {
    background: none; border: none; cursor: pointer;
    color: var(--text-mute); font-size: .8rem; line-height: 1;
    padding: 2px 4px; border-radius: 3px;
  }
  .ff-x:hover { color: var(--red); }

  .ff-body { padding: 14px 16px 4px; }
  .ff-tag {
    font-size: .62rem; letter-spacing: .12em; text-transform: uppercase;
    color: var(--green-dim); margin-bottom: 7px;
  }
  .ff-title {
    font-family: var(--sans); font-weight: 700; font-size: .96rem;
    color: var(--green); line-height: 1.25; margin-bottom: 7px;
  }
  .caret { color: var(--cyan); }
  .ff-text {
    font-size: .76rem; line-height: 1.55; color: var(--text-dim);
  }

  .ff-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px 13px;
  }
  .ff-dots { display: flex; gap: 6px; }
  .pip {
    width: 14px; height: 3px; border-radius: 2px;
    background: var(--border2); transition: background .2s;
  }
  .pip.on { background: var(--green); box-shadow: 0 0 6px var(--green-dim); }
  .ff-next {
    background: none; border: none; cursor: pointer;
    font-family: var(--font); font-size: .72rem; letter-spacing: .04em;
    color: var(--cyan);
  }
  .ff-next:hover { color: var(--green); }

  @media (prefers-reduced-motion: reduce) {
    .pip { transition: none; }
  }
</style>
