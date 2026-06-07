/* Architecture diagram data for the interactive Svelte Flow viewer.
   Each diagram is { title, subtitle, nodes, edges } in @xyflow/svelte format.
   Terminal-theme styling is applied inline so nodes match the site. */

const C = {
  panel: '#0a1922', line: '#1a3d5c', ink: '#b8d4c8',
  green: '#00ff41', cyan: '#00e5ff', gold: '#ffd700',
  teal: '#14b8a6', violet: '#9c7bf0', orange: '#f97316',
  pink: '#e6489a', blue: '#5bc0ff', grey: '#6b7280', red: '#ff4455',
};

// node factory — LR flow, accent-bordered, pre-line labels
function n(id, label, x, y, accent = C.line, opts = {}) {
  return {
    id,
    position: { x, y },
    data: { label },
    sourcePosition: opts.sp || 'right',
    targetPosition: opts.tp || 'left',
    style:
      `background:${C.panel};border:1px solid ${accent};` +
      `color:${C.ink};font-family:'JetBrains Mono',monospace;font-size:10.5px;` +
      `border-radius:7px;padding:8px 10px;width:${opts.w || 156}px;` +
      `white-space:pre-line;text-align:center;line-height:1.4;` +
      (opts.style || ''),
  };
}
function e(s, t, accent = C.line, opts = {}) {
  return {
    id: `${s}-${t}`,
    source: s, target: t,
    animated: opts.animated ?? true,
    label: opts.label,
    style: `stroke:${accent};stroke-width:1.5`,
    labelStyle: `fill:${C.ink};font-family:'JetBrains Mono',monospace;font-size:9px`,
    labelBgStyle: `fill:${C.panel}`,
  };
}

export const architectures = {
  // ── ChampIQ canvas — the signal-first SDR DAG ──────────────────────────
  champiq: {
    title: 'ChampIQ — signal-first SDR canvas',
    subtitle: 'Durable parallel DAG on Sim · per-client KG · human-gated AI calls',
    nodes: [
      n('harbinger', 'ChampHarbinger\ndiscover + signals', 0, 120, C.pink),
      n('graph', 'ChampGraph\nenrich → client KG', 210, 120, C.teal),
      n('llm', 'Personalize\nsignal-grounded LLM', 420, 120, C.violet),
      n('mail', 'ChampMail\nsend sequence', 630, 120, C.orange),
      n('wait', 'Wait\ndurable snapshot/resume', 840, 120, C.grey),
      n('classifier', 'Reply classifier\npositive / neutral / neg', 1050, 120, C.gold),
      n('approval', 'Human approval gate', 1260, 30, C.blue),
      n('voice', 'ChampVoice\nconsent-gated call', 1470, 30, C.blue),
      n('log', 'Log → graph\noutcomes = new edges', 1320, 210, C.teal),
    ],
    edges: [
      e('harbinger', 'graph', C.pink),
      e('graph', 'llm', C.teal),
      e('llm', 'mail', C.violet),
      e('mail', 'wait', C.orange),
      e('wait', 'classifier', C.grey),
      e('classifier', 'approval', C.gold, { label: 'positive' }),
      e('classifier', 'log', C.gold, { label: 'neutral/neg' }),
      e('approval', 'voice', C.blue, { label: 'approved' }),
      e('voice', 'log', C.blue),
    ],
  },

  // ── champiq-sim-pack — the moat layered on the Sim engine ──────────────
  champsim: {
    title: 'champiq-sim-pack — the moat on a rented engine',
    subtitle: 'Knowledge graph + GraphRAG + zerolang guardrail over Sim’s durable DAG',
    nodes: [
      n('scout', 'ChampScout\nmulti-channel signals', 0, 150, C.pink),
      n('kg', 'Per-client KG\nbi-temporal episodes', 210, 150, C.teal),
      n('rag', 'GraphRAG\nbriefing · stakeholders · gaps', 420, 150, C.cyan),
      n('tools', 'Tools\nGraph · Mail · Voice · Brief', 640, 150, C.orange),
      n('sim', 'Sim runtime\ndurable parallel DAG', 860, 150, C.green),
      n('guard', 'zerolang guardrail\nchecked edits + consent gate', 640, 30, C.red, { w: 200 }),
    ],
    edges: [
      e('scout', 'kg', C.pink),
      e('kg', 'rag', C.teal),
      e('rag', 'tools', C.cyan),
      e('tools', 'sim', C.orange),
      e('sim', 'kg', C.green, { label: 'outcomes write back', animated: true }),
      e('guard', 'tools', C.red, { label: 'gates every write' }),
    ],
  },

  // ── Fieldstone — the RLS-in-transaction request path ───────────────────
  fieldstone: {
    title: 'Fieldstone — RLS-in-transaction request path',
    subtitle: 'The load-bearing detail: SET LOCAL only applies inside a transaction',
    nodes: [
      n('client', 'Client + JWT\nGET /api/v1/patients', 0, 140, C.cyan),
      n('router', 'chi router\nCORS + auth middleware', 220, 140, C.green),
      n('auth', 'validate JWT\n→ auth.Context', 440, 140, C.green),
      n('begin', 'BEGIN tx\n(beginRLS)', 650, 140, C.gold),
      n('setcfg', "set_config(\n'request.jwt.claims', …, true)", 850, 140, C.gold, { w: 190 }),
      n('rls', 'Postgres RLS\nfilters rows by policy', 1090, 140, C.violet),
      n('commit', 'COMMIT\n→ only permitted rows', 1310, 140, C.green),
    ],
    edges: [
      e('client', 'router', C.cyan),
      e('router', 'auth', C.green),
      e('auth', 'begin', C.green),
      e('begin', 'setcfg', C.gold),
      e('setcfg', 'rls', C.gold),
      e('rls', 'commit', C.violet),
    ],
  },

  // ── 100xLongevity — secrets stay server-side; Zoom via S2S OAuth edge fn ──
  longevity: {
    title: '100xLongevity — trust boundary + Zoom consults',
    subtitle: 'No third-party token ever ships to a client; AI suggestions are physician-gated',
    nodes: [
      n('mobile', 'Expo mobile\n+ Next.js web', 0, 60, C.cyan, { w: 150 }),
      n('auth', 'Supabase Auth\nOTP → JWT', 250, 60, C.green),
      n('pg', 'Postgres + RLS\nbiomarkers · scores', 250, 200, C.violet),
      n('edge', 'Edge Functions (Deno)\nvideo-token · score · sms', 520, 130, C.gold, { w: 200 }),
      n('zoom', 'Zoom API\nS2S OAuth', 820, 60, C.blue),
      n('wear', 'Fitbit / Oura\nwearables', 820, 200, C.orange),
      n('cron', 'pg_cron\ndaily score compute', 520, 280, C.grey, { w: 200 }),
    ],
    edges: [
      e('mobile', 'auth', C.cyan),
      e('mobile', 'pg', C.cyan, { label: 'RLS reads/writes' }),
      e('mobile', 'edge', C.green, { label: 'JWT' }),
      e('edge', 'pg', C.gold, { label: 'service role' }),
      e('edge', 'zoom', C.blue),
      e('edge', 'wear', C.orange),
      e('cron', 'edge', C.grey),
    ],
  },

  // ── Fieldstone — full subsystem map (one Go binary) ────────────────────
  'fieldstone-system': {
    title: 'Fieldstone — one Go binary, every subsystem',
    subtitle: 'chi router fans requests into auth, gateways, realtime, jobs, plugins — all goroutine-coordinated',
    nodes: [
      n('in', 'HTTP / WS / gRPC', 0, 170, C.cyan),
      n('router', 'chi router\n+ CORS + auth mw', 220, 170, C.green),
      n('auth', 'Auth · JWT · WebAuthn', 460, 20, C.green, { w: 168 }),
      n('rest', 'REST gateway /api/v1', 460, 100, C.gold, { w: 168 }),
      n('gql', 'GraphQL /api/graphql', 460, 180, C.gold, { w: 168 }),
      n('rt', 'Realtime hub /ws\nselect-loop goroutine', 460, 260, C.violet, { w: 168 }),
      n('wasm', 'WASM plugins (wazero)', 460, 340, C.pink, { w: 168 }),
      n('jobs', 'Job queue · workers', 460, 420, C.orange, { w: 168 }),
      n('pg', 'Postgres + RLS', 760, 130, C.violet),
      n('cache', 'cache · ratelimit', 760, 250, C.blue),
      n('store', 'storage · cron · webhooks', 760, 370, C.grey, { w: 180 }),
    ],
    edges: [
      e('in', 'router', C.cyan),
      e('router', 'auth', C.green), e('router', 'rest', C.gold), e('router', 'gql', C.gold),
      e('router', 'rt', C.violet), e('router', 'wasm', C.pink), e('router', 'jobs', C.orange),
      e('rest', 'pg', C.gold), e('gql', 'pg', C.gold), e('rt', 'pg', C.violet),
      e('jobs', 'store', C.orange), e('auth', 'cache', C.green),
    ],
  },

  // ── Contrapunk — one Rust core, four surfaces ──────────────────────────
  contrapunk: {
    title: 'Contrapunk — one Rust core, four surfaces',
    subtitle: 'Guitar → MIDI in <10 ms → species counterpoint → synth + CLAP host',
    nodes: [
      n('guitar', 'Guitar / MIDI in', 0, 150, C.gold),
      n('audio', 'contrapunk-audio\nonset · pitch · string/fret', 220, 150, C.pink, { w: 180 }),
      n('harm', 'contrapunk-harmony\nspecies counterpoint', 470, 150, C.cyan, { w: 180 }),
      n('synth', '8-voice synth\n→ delay → reverb', 720, 150, C.violet, { w: 168 }),
      n('clap', 'CLAP plugin host', 960, 150, C.green),
      n('cli', 'CLI', 470, 30, C.grey, { w: 80 }),
      n('tauri', 'Tauri app', 600, 30, C.grey, { w: 90 }),
      n('web', 'WASM web', 730, 30, C.grey, { w: 100 }),
      n('plug', 'VST3/CLAP', 870, 30, C.grey, { w: 100 }),
    ],
    edges: [
      e('guitar', 'audio', C.gold),
      e('audio', 'harm', C.pink, { label: '~2.7 ms' }),
      e('harm', 'synth', C.cyan),
      e('synth', 'clap', C.violet),
      e('harm', 'cli', C.grey, { animated: false }), e('harm', 'tauri', C.grey, { animated: false }),
      e('harm', 'web', C.grey, { animated: false }), e('harm', 'plug', C.grey, { animated: false }),
    ],
  },
};
