<script>
  /* 100xLongevity scoring engine, animated: a Daily Vitality ring + the 8
     biological ages filling in (motion.dev stagger). Deterministic demo data. */
  import { onMount } from 'svelte';

  const VITALITY = 78;
  const AGES = [
    { k: 'Brain',          bio: 27, chrono: 30 },
    { k: 'Energy',         bio: 29, chrono: 30 },
    { k: 'Metabolic',      bio: 31, chrono: 30 },
    { k: 'Cardiovascular', bio: 26, chrono: 30 },
    { k: 'Inflammation',   bio: 33, chrono: 30 },
    { k: 'Musculoskeletal',bio: 28, chrono: 30 },
    { k: 'Hormonal',       bio: 30, chrono: 30 },
    { k: 'Gut',            bio: 25, chrono: 30 },
  ];
  const tone = (a) => (a.bio < a.chrono ? 'good' : a.bio > a.chrono ? 'warn' : 'mid');

  let bars = $state([]);
  let ringOff = $state(314);

  onMount(async () => {
    // ring
    requestAnimationFrame(() => { ringOff = 314 - (314 * VITALITY) / 100; });
    // bars via motion.dev stagger (fallback to CSS if it won't load)
    try {
      const { animate, stagger } = await import('motion');
      bars.forEach((el, i) => {
        if (!el) return;
        const pct = Math.max(8, 100 - (AGES[i].bio / 40) * 100);
        animate(el, { width: ['0%', `${pct}%`] }, { duration: 0.7, delay: i * 0.08, ease: 'easeOut' });
      });
    } catch {
      bars.forEach((el, i) => { if (el) el.style.width = `${Math.max(8, 100 - (AGES[i].bio / 40) * 100)}%`; });
    }
  });
</script>

<div class="ls">
  <div class="ls-top">
    <div class="ls-ring">
      <svg viewBox="0 0 120 120" width="118" height="118" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" stroke-width="9" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--green)" stroke-width="9" stroke-linecap="round"
          stroke-dasharray="314" stroke-dashoffset={ringOff} transform="rotate(-90 60 60)"
          style="transition: stroke-dashoffset 1.3s ease" />
      </svg>
      <div class="ls-ring-c"><b>{VITALITY}</b><span>vitality /100</span></div>
    </div>
    <div class="ls-blurb">
      <div class="ls-h">Daily Vitality Score</div>
      <p>Z-scored against the user’s own 30-day baseline — not a population average. Feeds a gamified Longevity Progress Score (0–1000) and 6 XP levels.</p>
      <div class="ls-chips"><span class="tag">deterministic</span><span class="tag">auditable</span><span class="tag">no black-box ML</span></div>
    </div>
  </div>

  <div class="ls-ages">
    <div class="ls-ages-h">8 biological ages <span>· bio vs chronological (30)</span></div>
    {#each AGES as a, i}
      <div class="ls-age">
        <span class="ls-age-k">{a.k}</span>
        <div class="ls-bar"><div class="ls-fill ls-{tone(a)}" bind:this={bars[i]}></div></div>
        <span class="ls-age-v ls-{tone(a)}">{a.bio}<small>y</small></span>
      </div>
    {/each}
  </div>
</div>

<style>
  .ls { width: 100%; }
  .ls-top { display: flex; gap: 22px; align-items: center; margin-bottom: 18px; flex-wrap: wrap; }
  .ls-ring { position: relative; display: grid; place-items: center; flex-shrink: 0; }
  .ls-ring-c { position: absolute; text-align: center; }
  .ls-ring-c b { font-family: var(--sans); font-size: 1.9rem; font-weight: 800; color: var(--green); display: block; }
  .ls-ring-c span { font-family: var(--font); font-size: 0.55rem; color: var(--text-mute); letter-spacing: 0.05em; }
  .ls-blurb { flex: 1; min-width: 220px; }
  .ls-h { font-family: var(--sans); font-weight: 700; color: #fff; font-size: 1rem; margin-bottom: 6px; }
  .ls-blurb p { font-size: 0.82rem; color: var(--text-dim); line-height: 1.6; margin-bottom: 10px; }
  .ls-chips { display: flex; flex-wrap: wrap; gap: 5px; }

  .ls-ages-h { font-family: var(--font); font-size: 0.7rem; color: var(--text-mute); letter-spacing: 0.06em; margin-bottom: 10px; }
  .ls-ages-h span { color: var(--text-mute); opacity: 0.7; }
  .ls-age { display: grid; grid-template-columns: 120px 1fr 46px; align-items: center; gap: 12px; margin-bottom: 7px; }
  .ls-age-k { font-family: var(--font); font-size: 0.74rem; color: var(--text-dim); }
  .ls-bar { height: 8px; border-radius: 999px; background: var(--bg3); overflow: hidden; }
  .ls-fill { height: 100%; width: 0; border-radius: 999px; }
  .ls-good { background: var(--green); }   .ls-age-v.ls-good { color: var(--green); }
  .ls-warn { background: var(--gold); }     .ls-age-v.ls-warn { color: var(--gold); }
  .ls-mid  { background: var(--cyan); }      .ls-age-v.ls-mid  { color: var(--cyan); }
  .ls-age-v { font-family: var(--sans); font-weight: 700; font-size: 0.85rem; text-align: right; }
  .ls-age-v small { font-size: 0.6rem; color: var(--text-mute); font-weight: 400; }
</style>
