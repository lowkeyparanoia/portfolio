<script>
  /* Diagonal meteor shower — pure CSS keyframes, streaks falling top-left → bottom-right.
     Deterministic per-index config (no Math.random) so it's prerender/SSR-safe (no
     hydration mismatch). Sits absolutely behind section content; pointer-events:none;
     respects prefers-reduced-motion. */
  let { count = 18, color = '#bcd6ff' } = $props();

  // pseudo-spread without randomness → stable across SSR + client hydration
  const meteors = $derived(Array.from({ length: count }, (_, i) => ({
    left: (i * 61) % 100,                 // 0–100% horizontal start
    top: -10 - ((i * 37) % 30),           // start above the section
    delay: +(((i * 0.83) % 7).toFixed(2)),
    dur: +(2.6 + ((i * 0.53) % 4.5)).toFixed(2),
    len: 70 + ((i * 17) % 70),            // tail length px
  })));
</script>

<div class="meteors" aria-hidden="true">
  {#each meteors as m}
    <span class="meteor"
      style="left:{m.left}%; top:{m.top}%;
             --len:{m.len}px; --c:{color};
             animation-delay:{m.delay}s; animation-duration:{m.dur}s;"></span>
  {/each}
</div>

<style>
  .meteors { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
  .meteor {
    position: absolute;
    width: var(--len); height: 1px;
    background: linear-gradient(90deg, transparent, var(--c));   /* bright head at the right (leading) end */
    transform: rotate(45deg);
    opacity: 0;
    animation-name: meteor-fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .meteor::after {                       /* glowing head */
    content: ''; position: absolute; right: 0; top: -1.5px;
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--c); box-shadow: 0 0 8px 1px var(--c);
  }
  @keyframes meteor-fall {
    0%   { transform: translate(-24vw, -24vh) rotate(45deg); opacity: 0; }
    8%   { opacity: .85; }
    100% { transform: translate(46vw, 46vh) rotate(45deg); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) { .meteor { animation: none; opacity: 0; } }
</style>
