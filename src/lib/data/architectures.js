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
};
