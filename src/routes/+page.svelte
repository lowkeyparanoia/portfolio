<script>
  import { onMount }         from 'svelte';
  import { fly, fade }       from 'svelte/transition';
  import MatrixRain          from '$lib/components/MatrixRain.svelte';
  import CandlestickChart    from '$lib/components/CandlestickChart.svelte';
  import WaveformCanvas      from '$lib/components/WaveformCanvas.svelte';
  import SpectroCanvas       from '$lib/components/SpectroCanvas.svelte';
  import CircuitBoard        from '$lib/components/CircuitBoard.svelte';
  import EcgLine             from '$lib/components/EcgLine.svelte';

  // ── Boot ─────────────────────────────────────────────────────
  let booted      = $state(false);
  let bootLines   = $state([]);
  let heroVisible = $state(false);
  let typedName   = $state('');
  let typedRole   = $state('');

  const BOOT = [
    '> Initialising system...',
    '> Loading: [AI] [Finance] [Backend] [Music] [Audio]',
    '> Connecting to portfolio.db ............ OK',
    '> Decrypting credentials ................. OK',
    '> Identity verified: JRENOTH MISQUITH',
    '> Access granted. Welcome.',
  ];
  const NAME = 'JRENOTH MISQUITH';
  const ROLE = 'Backend Engineer · AI/ML · Quant Trader · Music Tech';

  async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  async function typeText(text, setter, speed = 40) {
    for (let i = 0; i <= text.length; i++) { setter(text.slice(0, i)); await sleep(speed); }
  }

  onMount(async () => {
    // Boot sequence
    for (const line of BOOT) { await sleep(280); bootLines = [...bootLines, line]; }
    await sleep(500);
    booted = true;
    await sleep(200);
    heroVisible = true;
    await typeText(NAME, v => typedName = v, 55);
    await sleep(200);
    await typeText(ROLE, v => typedRole = v, 28);

    // Scroll reveal
    const els = document.querySelectorAll('.reveal');
    const io  = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  // ── Data ─────────────────────────────────────────────────────
  const experience = [
    {
      file: 'banza.sh',
      company: 'Banza', role: 'Backend Developer',
      period: 'Jun–Oct 2025', loc: 'Dubai (Remote)',
      stack: ['FastAPI','Python','PostgreSQL','Microservices','Postman'],
      bullets: [
        'Engineered AI-driven recommendation backend aggregating 8+ platform data sources',
        'Architected event-driven microservices for 10,000+ simulated user profiles',
        'Built FastAPI routes + PostgreSQL analytics layer with minimal downtime',
      ],
    },
    {
      file: 'mycoach.sh',
      company: 'Mycoach Health', role: 'Software Engineer & Data Science Intern',
      period: 'Jun–Sep 2023', loc: 'HKSTP, Hong Kong',
      stack: ['LLM Fine-tuning','Redis','MongoDB','Python','Healthcare AI'],
      bullets: [
        'Fine-tuned LLMs with co-founder for healthcare applications',
        'Built Health GPT model — automated medical inference generation',
        '+40% data retrieval efficiency · −25% doctor review time',
      ],
    },
    {
      file: 'pwc.sh',
      company: 'PricewaterhouseCoopers', role: 'Software Engineering Trainee',
      period: 'Sep 2023–Mar 2024', loc: 'Central, Hong Kong',
      stack: ['Java','Azure','Salesforce API','Power BI','Spring'],
      bullets: [
        'Led intern initiatives for website builders and Salesforce API integrations',
        'Designed Azure architectures; Power BI dashboards for client analytics',
        '−30% development time for client website delivery',
      ],
    },
  ];

  const oss = [
    {
      file: 'contrapunk-audio/contrapunk',
      title: 'Contrapunk',
      type: 'AUDIO TECH · RUST · TAURI · WASM',
      desc: `Real-time counterpoint harmony desktop app — plug in a guitar and hear Bach/Jazz/Palestrina counterpoint generated live. Single-cycle pitch detection, 128-sample buffers, 8 harmony modes, 28 scale modes. Native via Tauri, browser via WebAssembly. Extended with contrapunk_osc_sender.rs — OSC bridge broadcasting audio events to TouchDesigner for music-reactive visuals. Built a TD docs MCP server (556 ops indexed) to accelerate the visual integration.`,
      stack: ['Rust','Tauri','WebAssembly','OSC','TouchDesigner','Real-time Audio'],
      accentColor: 'var(--cyan)',
      tagClass: 'cyan',
    },
    {
      file: 'Rigor-Cloud/rigor → rigorcloud.com',
      title: 'Rigorcloud',
      type: 'LLM SAFETY · RUST · OPA/REGO · AI',
      desc: 'MITM proxy that fact-checks LLM responses mid-stream against Rego policy constraints — kills violating streams and auto-retries with correction feedback. Works with Claude Code, OpenCode. Regorus (pure-Rust OPA engine) for local policy eval. Zero telemetry, Apache 2.0.',
      stack: ['Rust','OPA/Rego','LLM Safety','MITM Proxy','Claude API'],
      accentColor: 'var(--gold)',
      tagClass: 'gold',
    },
  ];

  const projects = [
    {
      file: 'hospital-portal.py', wide: true,
      type: '// Fullstack · PWA · AI', color: 'green',
      title: 'Hospital Patient Portal',
      desc: 'High-performance PWA modernising patient care. Sub-2s loads, real-time "Health Bubble" messaging, fault-tolerant Razorpay payment gateway, 3D UI, AI chatbot integration.',
      stack: ['React 19','FastAPI','PostgreSQL','Razorpay','WebSocket'],
      metrics: [{ t: '−30% admin overhead', c: 'm-green' },{ t: 'Sub-2s load time', c: 'm-green' },{ t: '100% revenue secured', c: 'm-green' }],
    },
    {
      file: 'movie-rec.py', wide: false,
      type: '// Agentic AI · MCP · Data Pipeline', color: 'cyan',
      title: 'AI Movie Recommender',
      desc: '8-platform agentic pipeline (Twitter, Spotify, YouTube, Netflix, Steam…) extracting user preferences. TMDB critic-style recommendations via Claude API + MCP-automated git workflow.',
      stack: ['FastAPI','Pydantic AI','Claude API','MongoDB'],
      metrics: [{ t: '8+ platforms', c: 'm-cyan' },{ t: '10k+ profiles', c: 'm-cyan' }],
    },
    {
      file: 'mugen.py', wide: false,
      type: '// Startup · HKTECH300 · HKSTP Funded', color: 'gold',
      title: 'MuGen — Music Generation',
      desc: 'Gesture-based music editing via finger tracking. Google Magenta AI generation. Azure cloud offload. Dashboard A→Z for track import, AI enhancement and prolongation.',
      stack: ['Azure','Magenta','Docker','Figma'],
      metrics: [{ t: 'HKTECH300 funded', c: 'm-gold' },{ t: 'Best course project', c: 'm-gold' }],
    },
    {
      file: 'hedgefund.py', wide: true,
      type: '// Architecture · Quant · Research', color: 'gold',
      title: 'AI Hedge Fund Platform',
      desc: 'Full system design: TimescaleDB tick data, Kafka event bus, NLP sentiment engine, options GEX analytics, on-chain crypto metrics, Claude API signal aggregation, walk-forward backtesting framework.',
      stack: ['TimescaleDB','Kafka','Qdrant','Claude API','FastAPI'],
      metrics: [{ t: 'Multi-source signals', c: 'm-gold' },{ t: 'Full architecture', c: 'm-gold' },{ t: 'Kafka + TimescaleDB', c: 'm-gold' }],
    },
    {
      file: 'tv-suite.pine', wide: false,
      type: '// Quant · Pine Script · Backtesting', color: 'green',
      title: 'TradingView Strategy Suite',
      desc: 'Custom Pine Script indicators — EMA34/SMA21 cloud with Ichimoku confluence scoring (−5 to +5 regime), Fibonacci rotation entries (0.214–0.25 zone → 0.75–0.786 target, ~70% hit rate w/ candle close + relative strength confirmation). Walk-forward backtested.',
      stack: ['Pine Script','Ichimoku','Fibonacci','EMA/SMA Cloud','Backtesting'],
      metrics: [{ t: '2.5× profit factor', c: 'm-green' },{ t: '~70% Fib hit rate', c: 'm-green' },{ t: 'Walk-forward validated', c: 'm-green' }],
    },
    {
      file: 'ai-tutor.py', wide: false,
      type: '// EdTech · LLM · Adaptive', color: 'cyan',
      title: 'AI DSA & SQL Tutor',
      desc: 'Intelligent tutoring for Python DSA and SQL. Adaptive question gen, step-by-step explanations, personalised difficulty scaling.',
      stack: ['FastAPI','LLM','Adaptive AI'],
      metrics: [{ t: 'Adaptive difficulty', c: 'm-cyan' },{ t: 'SQL mastery', c: 'm-cyan' }],
    },
  ];

  const tradingStats = [
    { val: '2.5×',  label: 'Profit Factor',    sub: 'TradingView strategies',   cls: 'sv-green' },
    { val: '~70%',  label: 'Fib Hit Rate',      sub: 'Close + RS confirmation',  cls: 'sv-green' },
    { val: '10×',   label: 'Market Returns',    sub: 'Indian market 2022–24',    cls: 'sv-gold'  },
    { val: '+13%',  label: 'Hyrotrader',        sub: 'Crypto futures / 1 month', cls: 'sv-cyan'  },
    { val: '#140',  label: 'Bloomberg Rank',    sub: 'Global equity competition',cls: 'sv-gold'  },
    { val: '3%',    label: 'Max Risk / Trade',  sub: 'Strict risk management',   cls: 'sv-green' },
  ];

  const achievements = [
    { idx: '01', text: '100% Academic Merit Scholarship — 140,000 HKD/year',       sub: "Dean's List Sem A 2023/24 · City University of Hong Kong", col: 'gold'  },
    { idx: '02', text: 'Bloomberg Equity Trading — Ranked 140th Globally',          sub: '2024 competition',                                          col: 'green' },
    { idx: '03', text: 'HKTECH300 + HKSTP Seed Fund Recipient',                     sub: 'MuGen Music ML Startup',                                    col: 'cyan'  },
    { idx: '04', text: 'CityHack Finalist — 2nd Runner Up · Most Creative Team',    sub: 'Hackathon award',                                           col: 'green' },
    { idx: '05', text: 'Hyrotrader Challenge Passed — 13% profit in 1 month',       sub: 'Crypto futures prop firm challenge',                         col: 'cyan'  },
    { idx: '06', text: 'Microsoft Student Ambassador · Azure AI Builder Certified', sub: 'Oct 2023–Feb 2024',                                         col: 'green' },
    { idx: '07', text: 'IELTS Score 8.5 — English Proficiency',                     sub: 'Languages: English · Kannada · Konkani · Hindi',            col: 'gold'  },
  ];

  const skills = [
    { file: 'backend/',       cat: 'backend',          items: ['Python','FastAPI','Java','Spring','Node.js','REST','WebSockets']                   },
    { file: 'ai_ml/',         cat: 'AI / ML',          items: ['PyTorch','Transformers','LLM Fine-tuning','Pydantic AI','Claude API','Magenta']    },
    { file: 'databases/',     cat: 'databases',        items: ['PostgreSQL','MongoDB','Redis','TimescaleDB','Qdrant','MySQL']                      },
    { file: 'cloud_ops/',     cat: 'cloud / ops',      items: ['Azure','Docker','Kafka','Celery','GitHub Actions','Git']                           },
    { file: 'audio_systems/', cat: 'audio / music tech',items: ['Rust','Tauri','WASM','TidalCycles','SuperCollider','OSC','TouchDesigner']          },
    { file: 'finance/',       cat: 'quant / finance',  items: ['Bloomberg Terminal','Pine Script','Ichimoku','Fibonacci','Options GEX','Backtesting']},
  ];
</script>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- HERO                                                       -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="hero" class="hero">
  <MatrixRain opacity={0.18} />

  <div class="container hero-inner">
    {#if !booted}
      <div class="boot-term term">
        <div class="term-bar">
          <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
          <span class="term-title">boot — zsh</span>
        </div>
        <div class="term-body boot-body">
          {#each bootLines as line}
            <p class="boot-line" in:fly={{ y: 6, duration: 200 }}>{line}</p>
          {/each}
          {#if bootLines.length < BOOT.length}
            <span class="boot-cursor">█</span>
          {/if}
        </div>
      </div>
    {/if}

    {#if heroVisible}
      <div class="hero-content" in:fade={{ duration: 600 }}>
        <div class="hero-status">
          <span class="dot"></span>
          <span>SYSTEM ONLINE · BENGALURU, INDIA</span>
        </div>
        <h1 class="hero-name glow">{typedName}<span class="cursor-blink">█</span></h1>
        <p class="hero-role">{typedRole}</p>
        <div class="hero-stats">
          <div class="hstat"><span class="hstat-v">3+</span><span class="hstat-l">Companies</span></div>
          <span class="hsep">|</span>
          <div class="hstat"><span class="hstat-v">10+</span><span class="hstat-l">Projects</span></div>
          <span class="hsep">|</span>
          <div class="hstat"><span class="hstat-v gold">10×</span><span class="hstat-l">Returns</span></div>
          <span class="hsep">|</span>
          <div class="hstat"><span class="hstat-v" style="color:var(--cyan)">2.5yr</span><span class="hstat-l">Experience</span></div>
        </div>
        <div class="hero-cta">
          <a href="#projects" class="cta-btn">[  view_projects()  ]</a>
          <a href="#contact"  class="cta-ghost">[ get_in_touch() ]</a>
        </div>
      </div>
    {/if}
  </div>

  <div class="hero-scroll">scroll_down() ↓</div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- EXPERIENCE                                                  -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="experience" class="section alt">
  <div class="container">
    <p class="sec-label">work_experience</p>
    <h2 class="sec-title">Where I've <span>shipped</span></h2>
    <p class="sec-sub">Backend, ML, cloud architecture across Hong Kong and Dubai.</p>
    <div class="exp-grid">
      {#each experience as exp}
        <div class="exp-item reveal">
          <div class="exp-dot"><div class="exp-dot-inner"></div></div>
          <div class="exp-content term">
            <div class="term-bar">
              <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
              <span class="term-title">{exp.file}</span>
            </div>
            <div class="term-body">
              <div class="exp-head">
                <div>
                  <span class="exp-company">{exp.company}</span>
                  <span class="exp-role"> // {exp.role}</span>
                </div>
                <div class="exp-meta">
                  <span class="tag">{exp.period}</span>
                  <span class="exp-loc">📍 {exp.loc}</span>
                </div>
              </div>
              <div class="exp-stack">
                {#each exp.stack as s}<span class="tag">{s}</span>{/each}
              </div>
              <ul class="exp-bullets">
                {#each exp.bullets as b}
                  <li><span class="arrow">→</span>{b}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- OPEN SOURCE                                                 -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="opensource" class="section">
  <div class="container">
    <p class="sec-label">open_source</p>
    <h2 class="sec-title">Open Source <span>Contributions</span></h2>
    <p class="sec-sub">Production contributions to real-world Rust tooling and audio tech.</p>
    <div class="oss-grid reveal">
      {#each oss as o}
        <div class="term oss-card">
          <div class="term-bar">
            <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
            <span class="term-title">{o.file}</span>
          </div>
          <div class="oss-inner" style="--accent:{o.accentColor}">
            <div class="oss-accent-bar"></div>
            <div class="oss-body">
              <div class="oss-title">{o.title}</div>
              <div class="oss-type">{o.type}</div>
              <div class="oss-desc">{o.desc}</div>
              <div class="oss-stack">
                {#each o.stack as s}
                  <span class="tag {o.tagClass}">{s}</span>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- PROJECTS                                                    -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="projects" class="section alt">
  <div class="container">
    <p class="sec-label">projects</p>
    <h2 class="sec-title">Things I've <span>built</span></h2>
    <p class="sec-sub">AI systems, fullstack apps, quant tools, music tech.</p>
    <div class="proj-bento">
      {#each projects as p}
        <div class="term proj-card reveal" class:wide={p.wide} data-color={p.color}>
          <div class="term-bar">
            <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
            <span class="term-title">{p.file}</span>
          </div>
          <div class="term-body">
            <p class="proj-type">{p.type}</p>
            <h3 class="proj-title">{p.title}</h3>
            <p class="proj-desc">{p.desc}</p>
            <div class="proj-stack">{#each p.stack as s}<span class="tag">{s}</span>{/each}</div>
            <div class="proj-metrics">
              {#each p.metrics as m}<span class="metric {m.c}">✓ {m.t}</span>{/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- TRADING                                                     -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="trading" class="section">
  <div class="container">
    <p class="sec-label">trading_and_finance</p>
    <h2 class="sec-title">Quantitative <span>Edge</span></h2>
    <p class="sec-sub">Where finance theory meets algorithmic execution.</p>
    <div class="trading-wrap reveal">
      <div class="trading-left">
        <div class="candle-wrap">
          <div class="candle-header">
            <span class="candle-title">LIVE SIMULATION · EQUITY CURVE</span>
            <span class="candle-badge">● LIVE</span>
          </div>
          <CandlestickChart />
        </div>
        <div class="trading-log term" style="margin-top:16px">
          <div class="term-bar">
            <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
            <span class="term-title">strategy_log.txt</span>
          </div>
          <div class="term-body log-body">
            <p class="prompt log-cmd">cat strategy_overview.md</p>
            <p><span class="kw">TRADINGVIEW SUITE</span> — Pine Script indicators: EMA34/SMA21 cloud, Ichimoku confluence (−5 to +5 regime score), Fibonacci rotation 0.214–0.25 → 0.75–0.786 (~70% hit rate w/ close + RS confirmation). 2.5× profit factor, walk-forward validated.</p>
            <p><span class="kw">LIVE TRACK RECORD</span> — 10× returns Indian equities 2022–24. Hyrotrader: +13% in 1 month. Max 3% risk/trade.</p>
            <p><span class="kw">AI HEDGE FUND</span> — TimescaleDB + Kafka + Claude API + Options GEX + On-chain crypto analytics.</p>
            <p><span class="kw">BLOOMBERG</span> — Ranked #140 globally in equity trading competition 2024.</p>
          </div>
        </div>
      </div>
      <div class="stats-stack">
        {#each tradingStats as s}
          <div class="stat-row term">
            <div class="term-bar">
              <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
            </div>
            <div class="term-body stat-body">
              <span class="stat-val {s.cls}">{s.val}</span>
              <span class="stat-label">{s.label}</span>
              <span class="stat-sub"># {s.sub}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- HEALTHCARE                                                  -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="healthcare" class="section alt">
  <div class="container">
    <p class="sec-label">healthcare_ai</p>
    <h2 class="sec-title">Healthcare <span>Intelligence</span></h2>
    <p class="sec-sub">Building AI that reduces doctor workload and improves patient outcomes.</p>
    <div class="ecg-strip reveal">
      <div class="ecg-label">ECG · PATIENT MONITORING SIGNAL</div>
      <EcgLine />
    </div>
    <div class="health-grid reveal">
      <div class="term">
        <div class="term-bar">
          <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
          <span class="term-title">health_gpt.py</span>
        </div>
        <div class="term-body">
          <p class="proj-type">// Mycoach Health · HKSTP</p>
          <h3 class="health-title">Health GPT</h3>
          <p class="health-desc">Fine-tuned LLM for healthcare applications. Built with co-founder. Automated medical inference generation, cutting doctor review time by 25% and boosting data retrieval efficiency 40%.</p>
          <div class="proj-stack"><span class="tag">LLM Fine-tuning</span><span class="tag">Redis</span><span class="tag">MongoDB</span><span class="tag">Healthcare AI</span></div>
        </div>
      </div>
      <div class="term">
        <div class="term-bar">
          <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
          <span class="term-title">hospital-portal.py</span>
        </div>
        <div class="term-body">
          <p class="proj-type">// React 19 · FastAPI · PWA</p>
          <h3 class="health-title">Hospital Patient Portal</h3>
          <p class="health-desc">Real-time "Health Bubble" messaging, AI chatbot integration, WebSocket-powered alerts, fault-tolerant Razorpay payment gateway, 3D UI components, sub-2s PWA load times.</p>
          <div class="proj-stack"><span class="tag">React 19</span><span class="tag">WebSocket</span><span class="tag">Razorpay</span><span class="tag">AI Chatbot</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- MUSIC                                                       -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="music" class="section">
  <div class="container">
    <p class="sec-label">music_tech</p>
    <h2 class="sec-title">Music <span>Technology</span></h2>
    <p class="sec-sub">From algorithmic composition experiments to AI music generation to real-time audio DSP.</p>
    <div class="music-grid reveal">

      <div class="term music-card">
        <div class="music-vis">
          <WaveformCanvas colorA="#00ff41" colorB="#00e5ff" />
          <div class="music-vis-label">▶ TIDAL · EXPERIMENT</div>
        </div>
        <div class="music-body">
          <div class="music-title">TidalCycles Experiments</div>
          <div class="music-sub">ALGORITHMIC · SUPERCOLLIDER</div>
          <div class="music-desc">Explored TidalCycles + SuperCollider for pattern-based algorithmic composition — playing with rhythmic cycles, harmonic layering, and generative sound design. Fred Again × Kanye West × ambient Hans Zimmer/RUFUS DU SOL references as source material for experimenting with live-coded soundscapes.</div>
          <div class="tidal-code">
            <span class="tc-comment">-- exploring patterns: terrace ambience</span>{'\n'}d1 $ <span class="tc-fn">slow</span> <span class="tc-num">2</span> $ <span class="tc-fn">sound</span> <span class="tc-str">"bd sd hh"</span>{'\n'}  # <span class="tc-fn">gain</span> (<span class="tc-fn">range</span> <span class="tc-num">0.6</span> <span class="tc-num">1.0</span> $ <span class="tc-fn">slow</span> <span class="tc-num">8</span> <span class="tc-fn">sine</span>){'\n'}d2 $ <span class="tc-fn">every</span> <span class="tc-num">4</span> (<span class="tc-fn">fast</span> <span class="tc-num">2</span>) $ <span class="tc-fn">sound</span> <span class="tc-str">"arpy*4"</span>{'\n'}  # <span class="tc-fn">note</span> (<span class="tc-fn">scale</span> <span class="tc-str">"minor"</span> <span class="tc-str">"0 2 4 7"</span>)
          </div>
        </div>
      </div>

      <div class="term music-card">
        <div class="music-vis">
          <SpectroCanvas />
          <div class="music-vis-label">♪ MUGEN · AI GEN</div>
        </div>
        <div class="music-body">
          <div class="music-title">MuGen — AI Music Generation</div>
          <div class="music-sub">HKTECH300 · HKSTP SEED FUNDED</div>
          <div class="music-desc">Gesture-based music editing using real-time finger tracking. Google Magenta AI for generation + prolongation. Cloud-offloaded to Azure. Full dashboard for track import, AI enhancement and export.</div>
          <div class="proj-stack">
            <span class="tag gold">Azure</span><span class="tag gold">Magenta AI</span>
            <span class="tag gold">Finger Tracking</span><span class="tag gold">Docker</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- ACHIEVEMENTS                                               -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="about" class="section alt">
  <div class="container">
    <p class="sec-label">achievements</p>
    <h2 class="sec-title">Track <span>Record</span></h2>
    <div class="ach-list">
      {#each achievements as a}
        <div class="term ach-row reveal">
          <div class="term-body ach-body">
            <span class="ach-idx ach-{a.col}">[{a.idx}]</span>
            <div>
              <span class="ach-main">{a.text}</span>
              <span class="ach-sub">// {a.sub}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- SKILLS                                                     -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="skills" class="section skills-section">
  <CircuitBoard opacity={0.22} />
  <div class="container" style="position:relative;z-index:1">
    <p class="sec-label">tech_stack</p>
    <h2 class="sec-title">ls -la <span>skills/</span></h2>
    <div class="skills-grid">
      {#each skills as s}
        <div class="term reveal">
          <div class="term-bar">
            <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
            <span class="term-title">{s.file}</span>
          </div>
          <div class="term-body">
            <div class="sk-cat">{s.cat}</div>
            <div class="sk-items">
              {#each s.items as item}<span class="sk-item">{item}</span>{/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- CONTACT                                                    -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="contact" class="section alt">
  <div class="container">
    <div class="contact-grid reveal">
      <div class="term contact-term">
        <div class="term-bar">
          <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
          <span class="term-title">contact.sh</span>
        </div>
        <div class="term-body">
          <p class="sec-label">contact</p>
          <h2 class="sec-title" style="margin-bottom:32px">Let's <span>build</span> something</h2>
          <p class="prompt" style="margin-bottom:4px">whoami</p>
          <p class="contact-line">Open to backend, AI/ML, and quant engineering roles.</p>
          <p class="contact-line">Happy to talk trading, music tech, or startup ideas.</p>
          <p class="prompt" style="margin-top:16px;margin-bottom:8px">cat links.txt</p>
          <div class="contact-links">
            <a href="mailto:jrenothmisquith@gmail.com" class="contact-link"><span class="cl-icon">✉</span> jrenothmisquith@gmail.com</a>
            <a href="https://linkedin.com/in/jrenoth-misquith-ba587b1b1/" target="_blank" rel="noopener" class="contact-link"><span class="cl-icon">⊕</span> linkedin.com/in/jrenoth-misquith</a>
            <a href="https://github.com/jrenoth" target="_blank" rel="noopener" class="contact-link"><span class="cl-icon">⌥</span> github.com/jrenoth</a>
            <a href="https://github.com/contrapunk-audio/contrapunk" target="_blank" rel="noopener" class="contact-link"><span class="cl-icon">♪</span> github.com/contrapunk-audio/contrapunk</a>
            <a href="https://rigorcloud.com" target="_blank" rel="noopener" class="contact-link"><span class="cl-icon">⌬</span> rigorcloud.com</a>
          </div>
          <p class="prompt" style="margin-top:16px;margin-bottom:4px">echo $LOCATION</p>
          <p class="contact-line">Bengaluru, India · +91 9148703028</p>
        </div>
      </div>
      <div class="term profile-card">
        <div class="term-bar">
          <span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span>
          <span class="term-title">profile.json</span>
        </div>
        <div class="term-body">
          <p class="prompt" style="margin-bottom:12px">cat about.txt</p>
          <p class="profile-name">Jrenoth Misquith</p>
          <p class="profile-detail">BSc Computer Science · Data Science<br>City University of Hong Kong</p>
          <p class="profile-detail" style="margin-top:8px">
            Languages: English (IELTS 8.5) · Kannada · Konkani · Hindi
          </p>
          <p class="profile-detail" style="margin-top:8px">
            <span style="color:var(--green)">Backend Engineer</span> · AI/ML systems · Quantitative trading · Music technology
          </p>
          <p class="profile-detail" style="margin-top:8px">
            Contributed to: <span style="color:var(--cyan)">contrapunk-audio/contrapunk</span> · <span style="color:var(--gold)">Rigor-Cloud/rigor</span>
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:16px">
            <span class="tag">BSc CS</span><span class="tag cyan">Hong Kong</span><span class="tag gold">Bengaluru</span><span class="tag">Merit Scholar</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
/* ── HERO ──────────────────────────────────────────────────── */
.hero {
  min-height: 100vh; display: flex; flex-direction: column;
  justify-content: center; position: relative; overflow: hidden;
  padding-top: 80px;
}
.hero-inner { position: relative; z-index: 1; padding: 60px 28px; }
.boot-term  { max-width: 560px; margin: 0 auto 32px; }
.boot-body  { padding: 14px 20px; }
.boot-line  { font-size: 0.8rem; color: var(--text-dim); padding: 1px 0; }
.boot-line:first-child { color: var(--cyan); }
.boot-line:last-child  { color: var(--green); }
.boot-cursor { color: var(--green); animation: blink 1s step-end infinite; }

.hero-content { max-width: 800px; }
.hero-status  {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.7rem; color: var(--text-mute); letter-spacing: 0.12em; margin-bottom: 24px;
}
.dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--green); box-shadow: 0 0 8px var(--green);
  animation: pulse 2s infinite;
}
.hero-name {
  font-family: var(--sans);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 800; color: var(--green); line-height: 1;
  margin-bottom: 16px; min-height: 1.1em;
}
.cursor-blink { animation: blink 1s step-end infinite; font-weight: 300; }
.hero-role    {
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  color: var(--cyan); margin-bottom: 40px; letter-spacing: 0.04em; min-height: 1.4em;
}
.hero-stats {
  display: flex; gap: 32px; flex-wrap: wrap; margin-bottom: 44px; align-items: center;
}
.hstat   { display: flex; flex-direction: column; gap: 2px; }
.hstat-v { font-family: var(--sans); font-size: 2rem; font-weight: 800; color: var(--green); }
.hstat-v.gold { color: var(--gold); }
.hstat-l { font-size: 0.65rem; color: var(--text-mute); text-transform: uppercase; letter-spacing: 0.1em; }
.hsep    { color: var(--border2); font-size: 1.4rem; }
.hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.cta-btn {
  padding: 11px 24px; background: var(--green); color: #000;
  font-family: var(--font); font-size: 0.82rem; font-weight: 700;
  border: none; cursor: pointer; transition: 0.2s; letter-spacing: 0.04em;
  text-decoration: none;
}
.cta-btn:hover { background: var(--cyan); box-shadow: 0 0 20px rgba(0,229,255,.3); color: #000; }
.cta-ghost {
  padding: 11px 24px; background: transparent; color: var(--green);
  font-family: var(--font); font-size: 0.82rem;
  border: 1px solid var(--border2); cursor: pointer; transition: 0.2s;
  text-decoration: none; letter-spacing: 0.04em;
}
.cta-ghost:hover { border-color: var(--green); color: var(--cyan); text-decoration: none; }
.hero-scroll {
  position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
  font-size: 0.7rem; color: var(--text-mute); letter-spacing: 0.1em;
  animation: pulse 3s ease infinite;
}

/* ── EXPERIENCE ────────────────────────────────────────────── */
.exp-grid { display: flex; flex-direction: column; gap: 20px; }
.exp-item { display: grid; grid-template-columns: 20px 1fr; gap: 20px; align-items: start; }
.exp-dot  { padding-top: 14px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.exp-dot-inner {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--green); box-shadow: 0 0 8px var(--green);
}
.exp-content { transition: border-color 0.25s; }
.exp-content:hover { border-color: var(--green-dim); box-shadow: 0 0 20px rgba(0,255,65,0.05); }
.exp-head {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 12px; flex-wrap: wrap; margin-bottom: 12px;
}
.exp-company { color: var(--green); font-weight: 700; font-size: 1rem; }
.exp-role    { color: var(--text-mute); font-size: 0.88rem; }
.exp-meta    { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.exp-loc     { font-size: 0.72rem; color: var(--text-mute); }
.exp-stack   { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.exp-bullets li { color: var(--text-dim); font-size: 0.83rem; }

/* ── OPEN SOURCE ───────────────────────────────────────────── */
.oss-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.oss-card  { transition: 0.25s; }
.oss-card:hover { border-color: var(--cyan-d); box-shadow: 0 0 28px rgba(0,229,255,0.06); }
.oss-inner { position: relative; display: flex; }
.oss-accent-bar {
  flex-shrink: 0; width: 3px; background: var(--accent);
  align-self: stretch;
}
.oss-body  { padding: 20px; }
.oss-title { font-family: var(--sans); font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
.oss-type  { font-size: 0.68rem; color: var(--text-mute); letter-spacing: 0.1em; margin-bottom: 12px; }
.oss-desc  { font-size: 0.82rem; color: var(--text-dim); line-height: 1.65; margin-bottom: 12px; }
.oss-stack { display: flex; flex-wrap: wrap; gap: 6px; }

/* ── PROJECTS ──────────────────────────────────────────────── */
.proj-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.proj-card { transition: 0.25s; }
.proj-card.wide { grid-column: span 2; }
.proj-card:hover { box-shadow: 0 0 24px rgba(0,255,65,0.08); }
.proj-card[data-color="cyan"]:hover  { border-color: var(--cyan-d); }
.proj-card[data-color="gold"]:hover  { border-color: var(--gold-d); }
.proj-card[data-color="green"]:hover { border-color: var(--green-dim); }
.proj-type    { font-size: 0.7rem; color: var(--text-mute); margin-bottom: 8px; }
.proj-title   { font-family: var(--sans); font-size: 1rem; font-weight: 700; color: var(--green); margin-bottom: 10px; }
.proj-desc    { font-size: 0.82rem; color: var(--text-dim); line-height: 1.65; margin-bottom: 14px; }
.proj-stack   { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 12px; }
.proj-metrics { display: flex; flex-direction: column; gap: 3px; }

/* ── TRADING ───────────────────────────────────────────────── */
.trading-wrap {
  display: grid; grid-template-columns: 1fr 340px; gap: 24px; align-items: start;
}
.candle-wrap {
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: var(--radius); overflow: hidden; height: 200px; position: relative;
}
.candle-header {
  position: absolute; top: 10px; left: 16px; right: 16px; z-index: 1;
  display: flex; justify-content: space-between; align-items: center;
}
.candle-title { font-size: 0.65rem; color: var(--text-mute); letter-spacing: 0.1em; }
.candle-badge { font-size: 0.65rem; color: var(--green); animation: pulse 2s infinite; }
.log-body     { font-size: 0.8rem; line-height: 2; }
.log-body p   { margin-bottom: 4px; }
.log-cmd      { margin-bottom: 8px; }
.stats-stack  { display: flex; flex-direction: column; gap: 8px; }
.stat-row     { transition: border-color 0.2s; }
.stat-row:hover { border-color: var(--green-dim); }
.stat-body    {
  display: grid; grid-template-columns: 80px 1fr;
  grid-template-rows: auto auto; column-gap: 12px; align-items: center;
  padding: 12px 16px;
}
.stat-val   { font-family: var(--sans); font-size: 1.6rem; font-weight: 800; grid-row: span 2; }
.sv-green   { color: var(--green); text-shadow: 0 0 10px var(--green); }
.sv-gold    { color: var(--gold);  text-shadow: 0 0 10px var(--gold); }
.sv-cyan    { color: var(--cyan);  text-shadow: 0 0 10px var(--cyan); }
.stat-label { font-size: 0.78rem; color: var(--text-dim); font-weight: 600; letter-spacing: 0.04em; }
.stat-sub   { font-size: 0.68rem; color: var(--text-mute); }

/* ── HEALTHCARE ────────────────────────────────────────────── */
.ecg-strip  {
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: var(--radius); overflow: hidden; margin-bottom: 24px;
}
.ecg-label  {
  font-size: 0.65rem; letter-spacing: 0.1em; color: var(--text-mute);
  padding: 8px 16px; border-bottom: 1px solid var(--border);
}
.health-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.health-title {
  font-family: var(--sans); color: var(--green); font-size: 1rem;
  font-weight: 700; margin-bottom: 10px; margin-top: 6px;
}
.health-desc { font-size: 0.82rem; color: var(--text-dim); line-height: 1.65; margin-bottom: 12px; }

/* ── MUSIC ─────────────────────────────────────────────────── */
.music-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.music-card { overflow: hidden; }
.music-vis  {
  position: relative; height: 120px; overflow: hidden; background: #000;
}
.music-vis-label {
  position: absolute; bottom: 10px; left: 16px;
  font-size: 0.65rem; color: var(--text-mute); letter-spacing: 0.1em; z-index: 2;
}
.music-body  { padding: 16px 20px; }
.music-title { font-family: var(--sans); font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
.music-sub   { font-size: 0.65rem; color: var(--text-mute); letter-spacing: 0.1em; margin-bottom: 10px; }
.music-desc  { font-size: 0.82rem; color: var(--text-dim); line-height: 1.65; margin-bottom: 12px; }

/* ── ACHIEVEMENTS ──────────────────────────────────────────── */
.ach-list { display: flex; flex-direction: column; gap: 8px; }
.ach-row  { transition: border-color 0.2s; }
.ach-row:hover { border-color: var(--green-dim); }
.ach-body  { display: flex; align-items: flex-start; gap: 16px; padding: 14px 20px; }
.ach-idx   { font-size: 0.82rem; font-weight: 700; flex-shrink: 0; }
.ach-green { color: var(--green); }
.ach-gold  { color: var(--gold); }
.ach-cyan  { color: var(--cyan); }
.ach-main  { display: block; font-size: 0.88rem; color: var(--text); font-weight: 500; }
.ach-sub   { display: block; font-size: 0.75rem; color: var(--text-mute); margin-top: 2px; }

/* ── SKILLS ────────────────────────────────────────────────── */
.skills-section { position: relative; overflow: hidden; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
.sk-cat   { font-size: 0.7rem; color: var(--text-mute); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
.sk-items { display: flex; flex-wrap: wrap; gap: 6px; }
.sk-item  {
  padding: 3px 10px; background: var(--surface2);
  border: 1px solid var(--border); color: var(--text-dim);
  font-size: 0.78rem; transition: border-color 0.2s, color 0.2s;
}
.sk-item:hover { border-color: var(--green); color: var(--green); }

/* ── CONTACT ───────────────────────────────────────────────── */
.contact-grid { display: grid; grid-template-columns: 1fr 360px; gap: 24px; }
.contact-term { transition: border-color 0.2s; }
.contact-line { font-size: 0.85rem; color: var(--text-dim); padding: 2px 0; }
.contact-links { display: flex; flex-direction: column; gap: 8px; margin: 8px 0; }
.contact-link {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.85rem; color: var(--text-dim); text-decoration: none; transition: color 0.2s;
}
.contact-link:hover { color: var(--cyan); text-decoration: none; }
.cl-icon { color: var(--green); width: 16px; }
.profile-card { transition: border-color 0.2s; }
.profile-name   { font-family: var(--sans); font-size: 1.1rem; font-weight: 700; color: var(--green); margin-bottom: 8px; }
.profile-detail { font-size: 0.8rem; color: var(--text-dim); line-height: 1.6; }

/* ── RESPONSIVE ────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero { padding-top: 56px; }
  .trading-wrap { grid-template-columns: 1fr; }
  .oss-grid     { grid-template-columns: 1fr; }
  .health-grid  { grid-template-columns: 1fr; }
  .music-grid   { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
  .proj-bento   { grid-template-columns: 1fr; }
  .proj-card.wide { grid-column: span 1; }
}
@media (max-width: 640px) {
  .hero-stats { gap: 20px; }
  .hsep       { display: none; }
  .exp-item   { grid-template-columns: 1fr; }
  .exp-dot    { display: none; }
}
</style>
