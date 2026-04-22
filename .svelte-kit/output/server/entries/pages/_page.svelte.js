import { a3 as attr_style, a4 as stringify, e as ensure_array_like, c as escape_html, b as attr, a as attr_class } from "../../chunks/renderer.js";
function MatrixRain($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { opacity = 0.18 } = $$props;
    $$renderer2.push(`<canvas${attr_style(`opacity:${stringify(opacity)}`)} class="svelte-757w69"></canvas>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let bootLines = [];
    const experience = [
      {
        company: "Banza",
        role: "Backend Developer",
        period: "Jun–Oct 2025",
        loc: "Dubai (Remote)",
        stack: [
          "FastAPI",
          "Python",
          "PostgreSQL",
          "Microservices",
          "Postman"
        ],
        bullets: [
          "Engineered AI-driven recommendation backend aggregating 8+ platform data sources",
          "Architected event-driven microservices for 10,000+ simulated user profiles",
          "Built FastAPI routes + PostgreSQL analytics layer with minimal downtime"
        ]
      },
      {
        company: "Mycoach Health",
        role: "Software Engineer & Data Science Intern",
        period: "Jun–Sep 2023",
        loc: "HKSTP, Hong Kong",
        stack: [
          "LLM Fine-tuning",
          "Redis",
          "MongoDB",
          "Python",
          "Healthcare AI"
        ],
        bullets: [
          "Fine-tuned LLMs with co-founder for healthcare applications",
          "Built Health GPT model — automated medical inference generation",
          "+40% data retrieval efficiency · −25% doctor review time"
        ]
      },
      {
        company: "PricewaterhouseCoopers",
        role: "Software Engineering Placement Trainee",
        period: "Sep 2023–Mar 2024",
        loc: "Central, Hong Kong",
        stack: ["Java", "Azure", "Salesforce API", "Power BI", "Spring"],
        bullets: [
          "Led intern initiatives for website builders and Salesforce API integrations",
          "Designed Azure architectures; Power BI dashboards for client analytics",
          "−30% development time for client website delivery"
        ]
      }
    ];
    const projects = [
      {
        id: "hospital-portal",
        title: "Hospital Patient Portal",
        type: "Fullstack · PWA · AI",
        stack: ["React 19", "FastAPI", "PostgreSQL", "Razorpay", "WebSocket"],
        desc: 'High-performance PWA modernising patient care. Sub-2s loads, real-time "Health Bubble" messaging, fault-tolerant payment gateway, 3D UI, AI chatbot integration.',
        metrics: [
          "−30% admin overhead",
          "Sub-2s load",
          "100% revenue secured",
          "60% UI improvement"
        ],
        color: "green"
      },
      {
        id: "movie-rec",
        title: "AI Movie Recommender",
        type: "Agentic AI · Data Pipeline · MCP",
        stack: [
          "FastAPI",
          "MongoDB",
          "PostgreSQL",
          "Pydantic AI",
          "Claude API"
        ],
        desc: "8-platform agentic pipeline (Twitter, Spotify, YouTube, Netflix, Steam…) extracting user preferences. TMDB-integrated critic-style recommendations with MCP-automated git workflow.",
        metrics: ["8+ platforms", "10k+ profiles", "AI critic explanations"],
        color: "cyan"
      },
      {
        id: "mugen",
        title: "MuGen — Music Generation",
        type: "Startup · HKTECH300 · HKSTP Funded",
        stack: ["Azure", "Magenta", "Vanilla JS", "Figma", "Docker"],
        desc: "Gesture-based music editing using finger tracking. Google Magenta AI for music generation. Cloud-offloaded to Azure. Dashboard A→Z for track import, AI enhancement and prolongation.",
        metrics: ["HKTECH300 funded", "HKSTP Seed Fund", "Best course project"],
        color: "gold"
      },
      {
        id: "hedgefund",
        title: "AI Hedge Fund Platform",
        type: "Architecture · Quant · Research",
        stack: [
          "Python",
          "FastAPI",
          "TimescaleDB",
          "Kafka",
          "Qdrant",
          "Claude API"
        ],
        desc: "Full system design: TimescaleDB tick data, Kafka event bus, NLP sentiment engine, options GEX analytics, on-chain crypto metrics, Claude signal aggregation, walk-forward backtesting.",
        metrics: [
          "Multi-source signals",
          "Full architecture",
          "Kafka + TimescaleDB"
        ],
        color: "gold"
      },
      {
        id: "tradingview",
        title: "TradingView Strategy Suite",
        type: "Quant · Pine Script · Backtesting",
        stack: [
          "Pine Script",
          "TradingView",
          "Elliott Wave",
          "Pivot Analysis"
        ],
        desc: "Custom indicators with rigorous backtesting. 2.5 profit factor + 45% hit rate on pivot-based strategies. Obsidian trading journal with knowledge graph for pattern recognition.",
        metrics: [
          "2.5× profit factor",
          "45% hit rate",
          "Walk-forward validated"
        ],
        color: "green"
      },
      {
        id: "ai-tutor",
        title: "AI DSA & SQL Tutor",
        type: "EdTech · LLM · Adaptive",
        stack: ["Python", "FastAPI", "LLM", "Adaptive AI"],
        desc: "Intelligent tutoring system for Python Data Structures & Algorithms and SQL. Adaptive question generation, step-by-step explanations, personalised difficulty scaling, progress tracking.",
        metrics: ["Python DSA", "SQL mastery", "Adaptive difficulty"],
        color: "cyan"
      }
    ];
    const tradingStats = [
      {
        label: "Profit Factor",
        value: "2.5×",
        sub: "TradingView strategies",
        color: "green"
      },
      {
        label: "Hit Rate",
        value: "45%",
        sub: "Pivot-based systems",
        color: "green"
      },
      {
        label: "Market Returns",
        value: "10×",
        sub: "Indian market 2022–24",
        color: "gold"
      },
      {
        label: "Hyrotrader",
        value: "+13%",
        sub: "Crypto futures / 1 month",
        color: "cyan"
      },
      {
        label: "Bloomberg Rank",
        value: "#140",
        sub: "Global equity competition",
        color: "gold"
      },
      {
        label: "Max Risk / Trade",
        value: "3%",
        sub: "Strict risk management",
        color: "green"
      }
    ];
    const ideas = [
      {
        title: "AI Hedge Fund Platform",
        status: "DESIGNING",
        desc: "Full-stack quant platform — TimescaleDB, Kafka, multi-source sentiment NLP, GEX analytics, on-chain data, Claude API signal aggregation."
      },
      {
        title: "Obsidian Trading Journal",
        status: "IN PROGRESS",
        desc: "Knowledge graph-integrated trade journal — pattern recognition, AI trade review, backtested strategy documentation, win/loss analytics."
      },
      {
        title: "TidalCycles Terrace Set",
        status: "LIVE",
        desc: "Full live-coded DJ set — Fred Again × Kanye West × ambient Hans Zimmer/RUFUS DU SOL soundscapes. Built in TidalCycles + SuperCollider."
      },
      {
        title: "DocuForm AI (VLM SaaS)",
        status: "IDEATING",
        desc: "Fine-tuned VLM (Qwen2.5-VL) for document reformatting and validation — bookstore, legal, accounting verticals."
      }
    ];
    const achievements = [
      {
        text: "100% Academic Merit Scholarship — 140,000 HKD/year",
        sub: "Dean's List Sem A 2023/24",
        col: "gold"
      },
      {
        text: "Bloomberg Equity Trading — Ranked 140th Globally",
        sub: "2024 competition",
        col: "green"
      },
      {
        text: "HKTECH300 + HKSTP Seed Fund Recipient",
        sub: "MuGen Music ML Startup",
        col: "cyan"
      },
      {
        text: "CityHack Finalist — 2nd Runner Up",
        sub: "Most Creative Team Award",
        col: "green"
      },
      {
        text: "Hyrotrader Challenge Passed",
        sub: "13% profit · crypto futures · 1 month",
        col: "cyan"
      },
      {
        text: "Microsoft Student Ambassador",
        sub: "Azure AI Builder certified · Oct 23–Feb 24",
        col: "green"
      }
    ];
    const skills = [
      {
        cat: "backend",
        items: [
          "Python",
          "FastAPI",
          "Java",
          "Spring",
          "Node.js",
          "REST",
          "WebSockets"
        ]
      },
      {
        cat: "ai/ml",
        items: [
          "PyTorch",
          "Transformers",
          "LLM Fine-tuning",
          "Pydantic AI",
          "Claude API",
          "Magenta"
        ]
      },
      {
        cat: "databases",
        items: [
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "TimescaleDB",
          "MySQL",
          "Qdrant"
        ]
      },
      {
        cat: "cloud/ops",
        items: [
          "Azure",
          "Docker",
          "Kafka",
          "Celery",
          "GitHub Actions",
          "Git"
        ]
      },
      {
        cat: "frontend",
        items: ["React", "SvelteKit", "Vanilla JS", "Figma", "Tailwind"]
      },
      {
        cat: "finance",
        items: [
          "Bloomberg Terminal",
          "Pine Script",
          "Elliott Wave",
          "Options Analytics",
          "Backtesting"
        ]
      }
    ];
    $$renderer2.push(`<section id="hero" class="hero svelte-1uha8ag">`);
    MatrixRain($$renderer2, { opacity: 0.22 });
    $$renderer2.push(`<!----> <div class="container hero-inner svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="boot-term term svelte-1uha8ag"><div class="term-bar"><span class="term-btn r"></span> <span class="term-btn y"></span> <span class="term-btn g"></span> <span class="term-title">boot — zsh</span></div> <div class="term-body"><!--[-->`);
      const each_array = ensure_array_like(bootLines);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let line = each_array[$$index];
        $$renderer2.push(`<p class="boot-line svelte-1uha8ag">${escape_html(line)}</p>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (bootLines.length < 6) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="cursor"></span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="hero-scroll svelte-1uha8ag">scroll_down() ↓</div></section>  <section id="experience" class="section"><div class="container"><p class="sec-label">work_experience</p> <h2 class="sec-title">Where I've shipped</h2> <p class="sec-sub">Backend, ML, cloud architecture across Hong Kong and Dubai.</p> <div class="exp-list svelte-1uha8ag"><!--[-->`);
    const each_array_1 = ensure_array_like(experience);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let exp = each_array_1[i];
      $$renderer2.push(`<div class="term exp-term svelte-1uha8ag"><div class="term-bar"><span class="term-btn r"></span> <span class="term-btn y"></span> <span class="term-btn g"></span> <span class="term-title">${escape_html(exp.company.toLowerCase())}.sh</span></div> <div class="term-body"><div class="exp-head svelte-1uha8ag"><div><span class="exp-company svelte-1uha8ag">${escape_html(exp.company)}</span> <span class="exp-role svelte-1uha8ag">// ${escape_html(exp.role)}</span></div> <div class="exp-meta svelte-1uha8ag"><span class="tag">${escape_html(exp.period)}</span> <span class="exp-loc svelte-1uha8ag">📍 ${escape_html(exp.loc)}</span></div></div> <div class="exp-stack svelte-1uha8ag"><!--[-->`);
      const each_array_2 = ensure_array_like(exp.stack);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let s = each_array_2[$$index_1];
        $$renderer2.push(`<span class="tag">${escape_html(s)}</span>`);
      }
      $$renderer2.push(`<!--]--></div> <ul class="exp-bullets svelte-1uha8ag"><!--[-->`);
      const each_array_3 = ensure_array_like(exp.bullets);
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let b = each_array_3[$$index_2];
        $$renderer2.push(`<li class="svelte-1uha8ag"><span class="arrow svelte-1uha8ag">→</span> ${escape_html(b)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>  <section id="projects" class="section alt-bg svelte-1uha8ag"><div class="container"><p class="sec-label">projects</p> <h2 class="sec-title">Things I've built</h2> <p class="sec-sub">AI systems, fullstack apps, quant tools, music tech.</p> <div class="proj-grid svelte-1uha8ag"><!--[-->`);
    const each_array_4 = ensure_array_like(projects);
    for (let $$index_6 = 0, $$length = each_array_4.length; $$index_6 < $$length; $$index_6++) {
      let p = each_array_4[$$index_6];
      $$renderer2.push(`<div class="term proj-card svelte-1uha8ag"${attr("data-color", p.color)}><div class="term-bar"><span class="term-btn r"></span> <span class="term-btn y"></span> <span class="term-btn g"></span> <span class="term-title">${escape_html(p.id)}.py</span></div> <div class="term-body proj-body svelte-1uha8ag"><p class="proj-type svelte-1uha8ag">// ${escape_html(p.type)}</p> <h3 class="proj-title svelte-1uha8ag">${escape_html(p.title)}</h3> <p class="proj-desc svelte-1uha8ag">${escape_html(p.desc)}</p> <div class="proj-stack svelte-1uha8ag"><!--[-->`);
      const each_array_5 = ensure_array_like(p.stack);
      for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
        let s = each_array_5[$$index_4];
        $$renderer2.push(`<span class="tag">${escape_html(s)}</span>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="proj-metrics svelte-1uha8ag"><!--[-->`);
      const each_array_6 = ensure_array_like(p.metrics);
      for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
        let m = each_array_6[$$index_5];
        $$renderer2.push(`<span${attr_class(`metric metric-${stringify(p.color)}`, "svelte-1uha8ag")}>✓ ${escape_html(m)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>  <section id="trading" class="section"><div class="container"><p class="sec-label">trading_and_finance</p> <h2 class="sec-title">Quantitative edge</h2> <p class="sec-sub">Where finance theory meets algorithmic execution.</p> <div class="stats-grid svelte-1uha8ag"><!--[-->`);
    const each_array_7 = ensure_array_like(tradingStats);
    for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
      let s = each_array_7[$$index_7];
      $$renderer2.push(`<div class="stat-card term svelte-1uha8ag"><div class="term-bar"><span class="term-btn r"></span> <span class="term-btn y"></span> <span class="term-btn g"></span></div> <div class="term-body stat-body svelte-1uha8ag"><span${attr_class(`stat-v stat-${stringify(s.color)}`, "svelte-1uha8ag")}>${escape_html(s.value)}</span> <span class="stat-l svelte-1uha8ag">${escape_html(s.label)}</span> <span class="stat-s svelte-1uha8ag"># ${escape_html(s.sub)}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="trading-detail svelte-1uha8ag"><div class="term td-term svelte-1uha8ag"><div class="term-bar"><span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span> <span class="term-title">strategy_log.txt</span></div> <div class="term-body"><p class="prompt">cat strategy_overview.md</p> <br/> <p><span class="kw svelte-1uha8ag">TRADINGVIEW SUITE</span> — Custom Pine Script indicators.</p> <p>Pivot-based strategies, walk-forward backtested. 2.5 profit factor, 45% hit rate.</p> <br/> <p><span class="kw svelte-1uha8ag">LIVE TRACK RECORD</span> — 10× returns on Indian equities (2022–24).</p> <p>Hyrotrader challenge: +13% in one month. Max 3% portfolio risk per trade.</p> <br/> <p><span class="kw svelte-1uha8ag">AI HEDGE FUND</span> — Full architecture designed.</p> <p>TimescaleDB + Kafka + Claude API + Options GEX + On-chain crypto analytics.</p> <br/> <p><span class="kw svelte-1uha8ag">OBSIDIAN JOURNAL</span> — Knowledge graph trade journal.</p> <p>Pattern recognition, AI trade review, backtested strategy docs.</p></div></div></div></div></section>  <section id="ideas" class="section alt-bg svelte-1uha8ag"><div class="container"><p class="sec-label">current_ideas</p> <h2 class="sec-title">What I'm working on</h2> <p class="sec-sub">Active projects, research, and side explorations.</p> <div class="ideas-list svelte-1uha8ag"><!--[-->`);
    const each_array_8 = ensure_array_like(ideas);
    for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
      let idea = each_array_8[$$index_8];
      $$renderer2.push(`<div class="term idea-item"><div class="term-bar"><span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span> <span class="term-title">${escape_html(idea.title.toLowerCase().replace(/ /g, "_"))}</span></div> <div class="term-body idea-body svelte-1uha8ag"><div class="idea-head svelte-1uha8ag"><span class="idea-title svelte-1uha8ag">${escape_html(idea.title)}</span> <span${attr_class(`status-badge status-${stringify(idea.status.split(" ")[0].toLowerCase())}`, "svelte-1uha8ag")}>[${escape_html(idea.status)}]</span></div> <p class="idea-desc svelte-1uha8ag"># ${escape_html(idea.desc)}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>  <section id="about" class="section"><div class="container"><p class="sec-label">achievements</p> <h2 class="sec-title">Track record</h2> <div class="ach-list svelte-1uha8ag"><!--[-->`);
    const each_array_9 = ensure_array_like(achievements);
    for (let i = 0, $$length = each_array_9.length; i < $$length; i++) {
      let a = each_array_9[i];
      $$renderer2.push(`<div class="ach-row term svelte-1uha8ag"><div class="term-body ach-body svelte-1uha8ag"><span${attr_class(`ach-idx ach-${stringify(a.col)}`, "svelte-1uha8ag")}>[${escape_html(String(i + 1).padStart(2, "0"))}]</span> <div class="ach-text-block svelte-1uha8ag"><span class="ach-main svelte-1uha8ag">${escape_html(a.text)}</span> <span class="ach-sub svelte-1uha8ag">// ${escape_html(a.sub)}</span></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>  <section class="section alt-bg svelte-1uha8ag"><div class="container"><p class="sec-label">tech_stack</p> <h2 class="sec-title">ls -la skills/</h2> <div class="skills-grid svelte-1uha8ag"><!--[-->`);
    const each_array_10 = ensure_array_like(skills);
    for (let $$index_11 = 0, $$length = each_array_10.length; $$index_11 < $$length; $$index_11++) {
      let s = each_array_10[$$index_11];
      $$renderer2.push(`<div class="term sk-group"><div class="term-bar"><span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span> <span class="term-title">${escape_html(s.cat)}/</span></div> <div class="term-body"><p class="prompt sk-prompt svelte-1uha8ag">ls ${escape_html(s.cat)}/</p> <div class="sk-items svelte-1uha8ag"><!--[-->`);
      const each_array_11 = ensure_array_like(s.items);
      for (let $$index_10 = 0, $$length2 = each_array_11.length; $$index_10 < $$length2; $$index_10++) {
        let item = each_array_11[$$index_10];
        $$renderer2.push(`<span class="sk-item svelte-1uha8ag">${escape_html(item)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>  <section id="contact" class="section"><div class="container contact-wrap svelte-1uha8ag"><div class="term contact-term svelte-1uha8ag"><div class="term-bar"><span class="term-btn r"></span><span class="term-btn y"></span><span class="term-btn g"></span> <span class="term-title">contact.sh</span></div> <div class="term-body"><p class="sec-label">contact</p> <h2 class="sec-title" style="margin-bottom:32px">Let's build something</h2> <p class="prompt">whoami</p> <p class="contact-line svelte-1uha8ag">Open to backend, AI/ML, and quant engineering roles.</p> <p class="contact-line svelte-1uha8ag">Also happy to talk trading, music tech, or startup ideas.</p> <br/> <p class="prompt">cat links.txt</p> <div class="contact-links svelte-1uha8ag"><a href="mailto:jrenothmisquith@gmail.com" class="contact-link svelte-1uha8ag"><span class="cl-icon svelte-1uha8ag">✉</span> jrenothmisquith@gmail.com</a> <a href="https://linkedin.com/in/jrenoth-misquith" target="_blank" rel="noopener" class="contact-link svelte-1uha8ag"><span class="cl-icon svelte-1uha8ag">⊕</span> linkedin.com/in/jrenoth-misquith</a> <a href="https://github.com/jrenoth" target="_blank" rel="noopener" class="contact-link svelte-1uha8ag"><span class="cl-icon svelte-1uha8ag">⌥</span> github.com/jrenoth</a></div> <br/> <p class="prompt">echo $LOCATION</p> <p class="contact-line svelte-1uha8ag">Bengaluru, India · +91 9148703028</p> <div class="profile-block svelte-1uha8ag"><div class="avatar-placeholder svelte-1uha8ag"><span>[ PHOTO ]</span></div> <div class="profile-note svelte-1uha8ag"><p class="pn-name svelte-1uha8ag">Jrenoth Misquith</p> <p class="pn-edu svelte-1uha8ag"># BSc Computer Science · Data Science · City University of Hong Kong</p> <p class="pn-lang svelte-1uha8ag"># Languages: English (IELTS 8.5) · Kannada · Konkani · Hindi</p></div></div></div></div></div></section>`);
  });
}
export {
  _page as default
};
