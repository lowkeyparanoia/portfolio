<script>
  /* Rich per-project visualization modal: tabs for architecture (Svelte Flow),
     live motion.dev flows, a Threlte 3D view, and real running-app snapshots.
     Heavy bits (Svelte Flow, three.js) are lazy-imported per tab. */
  import { fade } from 'svelte/transition';
  import { architectures } from '$lib/data/architectures.js';
  import MotionFlow from './viz/MotionFlow.svelte';
  import LongevityScores from './viz/LongevityScores.svelte';
  import SnapshotGallery from './viz/SnapshotGallery.svelte';
  import WaveformCanvas from './WaveformCanvas.svelte';

  let { open = $bindable(false), project = null } = $props();
  let tab = $state(0);
  let reduce = $state(false);

  const CONFIG = {
    champiq: {
      title: 'ChampIQ', sub: 'AI-native SDR canvas · per-client knowledge graph',
      tabs: [
        { id: 'arch', label: 'Canvas flow' },
        { id: 'pack', label: 'Pack architecture' },
        { id: 'shots', label: 'Screens' },
      ],
    },
    fieldstone: {
      title: 'Fieldstone', sub: 'in-house Go BaaS · PocketBase × Supabase',
      tabs: [
        { id: 'arch', label: 'System map' },
        { id: 'flows', label: 'Live flows' },
        { id: '3d', label: '3D' },
        { id: 'admin', label: 'Running admin' },
      ],
    },
    longevity: {
      title: '100xLongevity', sub: 'clinical longevity platform · physician-gated AI',
      tabs: [
        { id: 'arch', label: 'Architecture' },
        { id: 'score', label: 'Scoring engine' },
        { id: 'app', label: 'App screens' },
      ],
    },
    contrapunk: {
      title: 'Contrapunk', sub: 'real-time counterpoint engine · Rust',
      tabs: [
        { id: 'arch', label: 'Architecture' },
        { id: 'audio', label: 'Audio' },
      ],
    },
  };

  const ARCH = { champiq: 'champiq', fieldstone: 'fieldstone-system', longevity: 'longevity', contrapunk: 'contrapunk' };

  const FLOWS = {
    req: {
      accent: '#00e5ff', caption: '✓ one request, every subsystem — goroutine-coordinated, RLS-isolated.',
      steps: [
        { label: 'HTTP in', sub: 'a request hits the chi router over HTTP / WS / gRPC' },
        { label: 'auth mw', tag: 'JWT', sub: 'middleware validates the JWT → auth.Context' },
        { label: 'gateway', tag: 'REST/GraphQL', sub: 'the gateway builds a parameterized query over real tables' },
        { label: 'BEGIN tx', tag: 'set_config', sub: 'beginRLS opens a tx, sets request.jwt.claims (local to the tx)' },
        { label: 'RLS', sub: 'Postgres RLS filters rows by tenant / policy' },
        { label: 'COMMIT', sub: 'commit → only permitted rows returned' },
      ],
    },
    hub: {
      accent: '#9a6cf0', caption: '✓ one hub goroutine fans out to thousands of sockets; slow clients drop, never block.',
      steps: [
        { label: 'WS connect', sub: 'a client connects; two goroutines spawn (read / write pump)' },
        { label: 'register←', tag: 'channel', sub: 'the client is sent on the register channel' },
        { label: 'select{}', tag: 'goroutine', sub: 'the hub’s single select-loop picks the ready channel' },
        { label: 'broadcast←', tag: '256-buf', sub: 'an event arrives on the buffered broadcast channel' },
        { label: 'fan-out', sub: 'non-blocking send to every client’s buffered Send channel' },
      ],
    },
    zoom: {
      accent: '#5bc0ff', caption: '✓ no Zoom token ever touches the client — provisioned server-side, role-based URLs.',
      steps: [
        { label: 'request link', tag: 'JWT', sub: 'patient / physician asks the video-token edge function' },
        { label: 'authorize', sub: 'verify JWT + ownership of the consultation row' },
        { label: 'S2S OAuth', tag: 'Zoom', sub: 'server-to-server OAuth token (account_credentials)' },
        { label: 'create', sub: 'POST /users/{host}/meetings (waiting room on)' },
        { label: 'role url', tag: 'host/patient', sub: 'physician gets start_url, patient gets join_url' },
      ],
    },
  };

  const SHOTS = {
    champiq: [
      { src: '/projects/champiq.png', cap: 'ChampIQ canvas — the signal-first SDR DAG' },
      { src: '/projects/champiq-graph.png', cap: 'ChampGraph — per-client knowledge graph' },
    ],
    longevity: [
      { src: '/projects/longevity/01-home-today-dashboard.png', cap: 'Member “Today” — brain-age, sleep + ring gauges' },
      { src: '/projects/longevity/02-recovery-vitals.png', cap: 'Recovery & vitals — sleep / strain / recovery' },
      { src: '/projects/longevity/03-patient-biomarkers.png', cap: 'Physician console — biomarkers & brain markers' },
      { src: '/projects/longevity/04-consultations-zoom.png', cap: 'Zoom consultations — start / join meeting' },
      { src: '/projects/longevity/05-login.png', cap: 'Auth — member / physician / admin roles' },
    ],
    // real running-admin captures (built + run on SQLite) + the concurrency explainer
    fieldstone: [
      { src: '/projects/fieldstone/01-dashboard.png', cap: 'Admin dashboard — running locally on SQLite' },
      { src: '/projects/fieldstone/02-collections.png', cap: 'Collections — 3 live collections in the DB' },
      { src: '/projects/fieldstone/04-gateway-tables.png', cap: 'Tables (Gateway) — auto-REST over Postgres' },
      { src: '/projects/fieldstone/05-graphql.png', cap: 'GraphQL playground' },
      { src: '/projects/fieldstone/06-edge-functions.png', cap: 'Edge Functions — invoke panel' },
      { src: '/projects/fieldstone/07-plugins.png', cap: 'WASM plugins — version / status / memory' },
      { src: '/projects/fieldstone-viz.png', cap: 'Interactive Go-concurrency explainer (motion.dev)' },
    ],
  };

  const cfg = $derived(project ? CONFIG[project] : null);
  const curTab = $derived(cfg ? cfg.tabs[Math.min(tab, cfg.tabs.length - 1)] : null);

  function close() { open = false; }
  $effect(() => { if (open) tab = 0; });
  $effect(() => { try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch {} });
  $effect(() => {
    if (!open) return;
    const k = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  });
</script>

{#if open && cfg}
  <div class="ov" role="dialog" aria-modal="true" aria-label="{cfg.title} visualizations" tabindex="-1"
    onclick={(e) => { if (e.target === e.currentTarget) close(); }}
    onkeydown={(e) => { if (e.key === 'Escape') close(); }}
    transition:fade={{ duration: reduce ? 0 : 160 }}>
    <div class="term shell">
      <div class="term-bar">
        <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
        <span class="term-title">{project}.viz</span>
        <button class="x" onclick={close} aria-label="Close">✕</button>
      </div>
      <div class="head">
        <h3>{cfg.title}</h3><p>{cfg.sub}</p>
      </div>
      <div class="tabs" role="tablist">
        {#each cfg.tabs as t, i}
          <button class="tb" class:on={i === tab} role="tab" aria-selected={i === tab} onclick={() => (tab = i)}>{t.label}</button>
        {/each}
      </div>

      <div class="content">
        {#if curTab.id === 'arch' || curTab.id === 'pack'}
          {#key project + curTab.id}
            {#await import('./ArchDiagram.svelte')}
              <div class="loading">loading interactive diagram…</div>
            {:then m}
              <m.default diagram={architectures[curTab.id === 'pack' ? 'champsim' : ARCH[project]]} height="min(52vh, 440px)" />
            {/await}
          {/key}

        {:else if curTab.id === 'flows'}
          <div class="flow-blk"><h4>Request lifecycle</h4><MotionFlow {...FLOWS.req} /></div>
          <div class="flow-blk"><h4>Realtime hub — select-loop fan-out</h4><MotionFlow {...FLOWS.hub} /></div>
          <p class="note">More interactive Go-concurrency demos (goroutines · channels · RWMutex · token bucket · WASM sandbox) in the <a href="/fieldstone-concurrency.html" target="_blank" rel="noopener">full concurrency explainer →</a></p>

        {:else if curTab.id === '3d'}
          {#await import('./viz/Fieldstone3D.svelte')}
            <div class="loading">loading 3D scene…</div>
          {:then m}
            <m.default />
          {/await}

        {:else if curTab.id === 'admin'}
          <SnapshotGallery images={SHOTS.fieldstone} />

        {:else if curTab.id === 'score'}
          <LongevityScores />
          <div class="flow-blk" style="margin-top:18px"><h4>Zoom consultation — server-side provisioning</h4><MotionFlow {...FLOWS.zoom} /></div>

        {:else if curTab.id === 'app'}
          <SnapshotGallery images={SHOTS.longevity} />

        {:else if curTab.id === 'shots'}
          <SnapshotGallery images={SHOTS.champiq} />

        {:else if curTab.id === 'audio'}
          <div class="wave"><WaveformCanvas colorA="#00e5ff" colorB="#9a6cf0" /></div>
          <p class="note">Guitar audio → MIDI in <b>&lt;10 ms</b>, harmonized by species counterpoint, rendered live on a VexFlow staff. Demo video coming. <a href="https://contrapunk.com" target="_blank" rel="noopener">contrapunk.com →</a></p>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .ov { position: fixed; inset: 0; z-index: 10000; background: rgba(2,4,8,0.8); backdrop-filter: blur(4px); display: grid; place-items: center; padding: 3vw; }
  .shell { width: min(1080px, 96vw); max-height: 92vh; display: flex; flex-direction: column; }
  .term-bar { position: relative; }
  .x { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-mute); cursor: pointer; font-size: 0.85rem; padding: 2px 6px; border-radius: 3px; }
  .x:hover { color: var(--red); }
  .head { padding: 14px 20px 8px; }
  .head h3 { font-family: var(--sans); font-size: 1.1rem; color: var(--green); margin-bottom: 2px; }
  .head p { font-size: 0.78rem; color: var(--text-dim); }
  .tabs { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 20px 12px; border-bottom: 1px solid var(--border); }
  .tb { font-family: var(--font); font-size: 0.74rem; padding: 6px 13px; border-radius: 6px; cursor: pointer; background: var(--surface); border: 1px solid var(--border2); color: var(--text-dim); }
  .tb:hover { border-color: var(--green-dim); color: var(--green); }
  .tb.on { background: var(--green); border-color: var(--green); color: #000; font-weight: 700; }
  .content { padding: 18px 20px; overflow-y: auto; }
  .loading { height: 300px; display: grid; place-items: center; color: var(--text-mute); font-family: var(--font); font-size: 0.8rem; }
  .flow-blk { margin-bottom: 22px; }
  .flow-blk h4 { font-family: var(--font); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-mute); margin-bottom: 4px; }
  .note { font-size: 0.78rem; color: var(--text-dim); line-height: 1.6; margin-top: 14px; }
  .note a { color: var(--cyan); }
  .wave { height: 160px; border: 1px solid var(--border2); border-radius: var(--radius); overflow: hidden; background: #000; }
</style>
