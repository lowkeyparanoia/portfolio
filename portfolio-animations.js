
/* =====================================================
   PORTFOLIO ANIMATIONS — canvas + DOM utils
   ===================================================== */

// ── Matrix Rain ────────────────────────────────────────
function initMatrixRain(canvasId, opacity = 0.18) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>{}[]#$%&=+-*/';
  let cols, drops;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols = Math.floor(canvas.width / 16);
    drops = Array.from({ length: cols }, () => Math.random() * -60);
  }
  resize();
  window.addEventListener('resize', resize);

  setInterval(() => {
    ctx.fillStyle = 'rgba(2,4,8,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
      const y = drops[i] * 16;
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.fillStyle = '#ffffff'; ctx.globalAlpha = 0.9;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y);
      ctx.fillStyle = '#00ff41'; ctx.globalAlpha = 0.55;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y - 16);
      ctx.fillStyle = '#00c032'; ctx.globalAlpha = 0.25;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y - 32);
      ctx.globalAlpha = 1;
      if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    }
  }, 40);
}

// ── Candlestick Chart ──────────────────────────────────
function initCandlestick(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let candles = [];
  let offset = 0;

  function genCandle(prev) {
    const base = prev ? prev.close : 100;
    const change = (Math.random() - 0.46) * 4;
    const open = base;
    const close = base + change;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    return { open, close, high, low };
  }

  for (let i = 0; i < 80; i++) candles.push(genCandle(candles[candles.length - 1]));

  function draw() {
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    const visible = candles.slice(-Math.floor(W / 12));
    const prices = visible.flatMap(c => [c.high, c.low]);
    const minP = Math.min(...prices), maxP = Math.max(...prices);
    const range = maxP - minP || 1;
    const pad = 20;

    const toY = v => pad + (1 - (v - minP) / range) * (H - pad * 2);
    const cw = Math.floor(W / visible.length);

    // Grid lines
    ctx.strokeStyle = 'rgba(0,255,65,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = pad + (i / 4) * (H - pad * 2);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    visible.forEach((c, i) => {
      const x = i * cw + cw / 2;
      const bull = c.close >= c.open;
      const color = bull ? '#00ff41' : '#ff4444';
      ctx.strokeStyle = color; ctx.fillStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, toY(c.high)); ctx.lineTo(x, toY(c.low)); ctx.stroke();
      const bodyTop = toY(Math.max(c.open, c.close));
      const bodyH = Math.max(1, Math.abs(toY(c.open) - toY(c.close)));
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x - cw / 2 + 1, bodyTop, cw - 2, bodyH);
      ctx.globalAlpha = 1;
    });

    // Moving average line
    const maLen = 20;
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.6;
    ctx.beginPath();
    visible.forEach((c, i) => {
      if (i < maLen) return;
      const slice = visible.slice(i - maLen, i);
      const ma = slice.reduce((s, v) => s + v.close, 0) / maLen;
      const x = i * cw + cw / 2;
      i === maLen ? ctx.moveTo(x, toY(ma)) : ctx.lineTo(x, toY(ma));
    });
    ctx.stroke(); ctx.globalAlpha = 1;
  }

  function animate() {
    offset++;
    if (offset % 30 === 0) {
      candles.push(genCandle(candles[candles.length - 1]));
      if (candles.length > 200) candles.shift();
    }
    draw();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', draw);
  animate();
}

// ── Waveform Bars ──────────────────────────────────────
function initWaveform(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const bars = 48;
  el.innerHTML = Array.from({ length: bars }, (_, i) => {
    const delay = (i * 0.04).toFixed(2);
    const h = 20 + Math.random() * 60;
    return `<div class="wv-bar" style="animation-delay:${delay}s;height:${h}%"></div>`;
  }).join('');
}

// ── ECG Line ──────────────────────────────────────────
function initECG(svgId) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const W = 600, H = 60;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  function ecgPath(n = 3) {
    let d = `M 0 ${H / 2}`;
    for (let i = 0; i < n; i++) {
      const x = (i / n) * W;
      const seg = W / n;
      d += ` L ${x + seg * 0.3} ${H / 2}`;
      d += ` L ${x + seg * 0.38} ${H * 0.15}`;
      d += ` L ${x + seg * 0.42} ${H * 0.85}`;
      d += ` L ${x + seg * 0.48} ${H / 2 - 10}`;
      d += ` L ${x + seg * 0.52} ${H / 2}`;
      d += ` L ${x + seg} ${H / 2}`;
    }
    return d;
  }

  svg.innerHTML = `
    <defs>
      <linearGradient id="ecgGrad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#00ff41" stop-opacity="0"/>
        <stop offset="40%" stop-color="#00ff41" stop-opacity="1"/>
        <stop offset="100%" stop-color="#00ff41" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${ecgPath(3)}" fill="none" stroke="url(#ecgGrad)" stroke-width="2" opacity="0.8">
      <animateTransform attributeName="transform" type="translate" from="-${W/3} 0" to="0 0" dur="1.2s" repeatCount="indefinite"/>
    </path>
  `;
}

// ── Scroll Reveal ─────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

// ── Nav active link ───────────────────────────────────
function initNav() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    document.querySelector('nav').classList.toggle('scrolled', scrolled);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }, { passive: true });

  // Live clock
  const clock = document.getElementById('clock');
  if (clock) setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
  }, 1000);
}

// ── Ticker tape ───────────────────────────────────────
function initTicker() {
  const el = document.getElementById('ticker');
  if (!el) return;
  const items = [
    { sym: 'PF', val: '2.5×', chg: '+150%', up: true },
    { sym: 'HIT', val: '45%', chg: '+5%', up: true },
    { sym: 'RET', val: '10×', chg: '+900%', up: true },
    { sym: 'CRYPTO', val: '+13%', chg: '1mo', up: true },
    { sym: 'RANK', val: '#140', chg: 'Bloomberg', up: true },
    { sym: 'RISK', val: '3%', chg: 'max/trade', up: false },
    { sym: 'HKTECH', val: 'FUNDED', chg: 'Seed', up: true },
    { sym: 'MERIT', val: '140K', chg: 'HKD/yr', up: true },
    { sym: 'IELTS', val: '8.5', chg: 'score', up: true },
  ];
  const html = [...items, ...items].map(i =>
    `<span class="tick-item"><span class="tick-sym">${i.sym}</span><span class="tick-val ${i.up ? 'up' : 'down'}">${i.val}</span><span class="tick-chg">${i.chg}</span></span>`
  ).join('');
  el.innerHTML = html;
}

// ── Waveform Canvas (music) ────────────────────────────
function initWaveformCanvas(canvasId, colorA, colorB) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;
  const bands = 64;

  function draw() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const bw = W / bands;
    for (let i = 0; i < bands; i++) {
      const freq = i / bands;
      const h = H * 0.1 + H * 0.7 * (
        0.4 * Math.abs(Math.sin(t * 1.7 + freq * 8)) +
        0.3 * Math.abs(Math.sin(t * 2.3 + freq * 5.5 + 1)) +
        0.3 * Math.abs(Math.sin(t * 0.9 + freq * 12))
      );
      const grad = ctx.createLinearGradient(0, H, 0, H - h);
      grad.addColorStop(0, colorA);
      grad.addColorStop(1, colorB);
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(i * bw + 1, H - h, bw - 2, h);
    }
    ctx.globalAlpha = 1;
    // Reflection
    ctx.save();
    ctx.scale(1, -0.2);
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < bands; i++) {
      const freq = i / bands;
      const h = H * 0.1 + H * 0.7 * (
        0.4 * Math.abs(Math.sin(t * 1.7 + freq * 8)) +
        0.3 * Math.abs(Math.sin(t * 2.3 + freq * 5.5 + 1)) +
        0.3 * Math.abs(Math.sin(t * 0.9 + freq * 12))
      );
      ctx.fillStyle = colorA;
      ctx.fillRect(i * bw + 1, -H, bw - 2, h);
    }
    ctx.restore();
    ctx.globalAlpha = 1;
    t += 0.022;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Spectro Canvas (MuGen circular) ───────────────────
function initSpectroCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;

  function draw() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.32;
    const bars = 80;
    for (let i = 0; i < bars; i++) {
      const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
      const amp = 0.35 * Math.abs(Math.sin(t * 1.8 + i * 0.25)) +
                  0.35 * Math.abs(Math.sin(t * 2.6 + i * 0.18 + 1.2)) +
                  0.3 * Math.abs(Math.sin(t * 1.1 + i * 0.4));
      const len = R * 0.2 + R * 0.8 * amp;
      const x1 = cx + Math.cos(angle) * R;
      const y1 = cy + Math.sin(angle) * R;
      const x2 = cx + Math.cos(angle) * (R + len);
      const y2 = cy + Math.sin(angle) * (R + len);
      const hue = (i / bars) * 60 + 30; // gold to amber
      ctx.strokeStyle = `hsl(${hue},100%,60%)`;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.7 + 0.3 * amp;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    // Core glow
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.6);
    grad.addColorStop(0, 'rgba(255,215,0,0.15)');
    grad.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.6, 0, Math.PI * 2); ctx.fill();
    t += 0.018;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Projection Mapping (skills bg) ────────────────────
function initProjectionMapping(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;

  const nodes = Array.from({ length: 28 }, () => ({
    x: Math.random(), y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0006,
    vy: (Math.random() - 0.5) * 0.0006,
  }));

  function draw() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > 1) n.vx *= -1;
      if (n.y < 0 || n.y > 1) n.vy *= -1;
    });

    // Draw edges (Delaunay-ish: connect nearby nodes)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = (nodes[i].x - nodes[j].x) * W;
        const dy = (nodes[i].y - nodes[j].y) * H;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          const alpha = (1 - dist / 220) * 0.5;
          ctx.strokeStyle = `rgba(0,255,65,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
          ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
          ctx.stroke();
        }
      }
    }

    // Draw geometric overlays — projected rectangles
    for (let k = 0; k < 5; k++) {
      const phase = t * 0.3 + k * 1.26;
      const cx = W * (0.15 + k * 0.18);
      const cy = H * (0.3 + 0.4 * Math.sin(phase * 0.7));
      const w = 80 + 40 * Math.sin(phase);
      const h = 50 + 30 * Math.cos(phase * 1.3);
      const skew = Math.sin(phase * 0.5) * 0.3;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.transform(1, skew, 0, 1, 0, 0);
      ctx.strokeStyle = `rgba(0,229,255,${0.08 + 0.06 * Math.sin(phase)})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(-w / 2, -h / 2, w, h);
      // Inner cross-hairs
      ctx.strokeStyle = `rgba(0,255,65,${0.05 + 0.04 * Math.cos(phase)})`;
      ctx.beginPath(); ctx.moveTo(-w/2, 0); ctx.lineTo(w/2, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -h/2); ctx.lineTo(0, h/2); ctx.stroke();
      ctx.restore();
    }

    // Scan line sweep
    const scanY = ((t * 60) % (H + 80)) - 40;
    const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
    scanGrad.addColorStop(0, 'rgba(0,255,65,0)');
    scanGrad.addColorStop(0.5, 'rgba(0,255,65,0.06)');
    scanGrad.addColorStop(1, 'rgba(0,255,65,0)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 20, W, 40);

    // Nodes
    nodes.forEach(n => {
      ctx.fillStyle = 'rgba(0,255,65,0.5)';
      ctx.beginPath();
      ctx.arc(n.x * W, n.y * H, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    t += 0.016;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Circuit Board (skills bg) ─────────────────────────
function initCircuitBoard(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;

  // Static grid of circuit traces (generated once, re-drawn each frame)
  let traces = [];
  let junctions = [];

  function buildLayout(W, H) {
    traces = [];
    junctions = [];
    const cols = Math.floor(W / 60);
    const rows = Math.floor(H / 50);
    const cw = W / cols, ch = H / rows;

    // Horizontal traces
    for (let r = 0; r <= rows; r++) {
      let x = 0;
      const y = r * ch;
      while (x < W) {
        const segLen = cw * (1 + Math.floor(Math.random() * 3));
        traces.push({ x1: x, y1: y, x2: Math.min(x + segLen, W), y2: y, horiz: true, phase: Math.random() * Math.PI * 2 });
        x += segLen + (Math.random() > 0.4 ? cw : 0);
      }
    }
    // Vertical traces
    for (let c = 0; c <= cols; c++) {
      let y = 0;
      const x = c * cw;
      while (y < H) {
        const segLen = ch * (1 + Math.floor(Math.random() * 2));
        traces.push({ x1: x, y1: y, x2: x, y2: Math.min(y + segLen, H), horiz: false, phase: Math.random() * Math.PI * 2 });
        y += segLen + (Math.random() > 0.5 ? ch : 0);
      }
    }
    // Junction pads at intersections (random subset)
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        if (Math.random() > 0.65) {
          junctions.push({ x: c * cw, y: r * ch, r: 2 + Math.random() * 2, phase: Math.random() * Math.PI * 2 });
        }
      }
    }
  }

  function draw() {
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    if (traces.length === 0) buildLayout(W, H);
    ctx.clearRect(0, 0, W, H);

    // Traces
    traces.forEach(tr => {
      const pulse = 0.3 + 0.2 * Math.sin(t * 1.4 + tr.phase);
      const isCyan = tr.phase > Math.PI;
      ctx.strokeStyle = isCyan ? `rgba(0,229,255,${pulse})` : `rgba(0,255,65,${pulse})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(tr.x1, tr.y1);
      ctx.lineTo(tr.x2, tr.y2);
      ctx.stroke();

      // Travelling dot along trace
      const speed = 0.4 + (tr.phase % 1) * 0.6;
      const prog = ((t * speed + tr.phase) % (Math.PI * 2)) / (Math.PI * 2);
      const dx = tr.x1 + (tr.x2 - tr.x1) * prog;
      const dy = tr.y1 + (tr.y2 - tr.y1) * prog;
      ctx.fillStyle = isCyan ? 'rgba(0,229,255,0.9)' : 'rgba(0,255,65,0.9)';
      ctx.beginPath();
      ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Junction pads
    junctions.forEach(j => {
      const glow = 0.4 + 0.3 * Math.sin(t * 2 + j.phase);
      ctx.strokeStyle = `rgba(0,229,255,${glow})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(j.x, j.y, j.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(0,229,255,${glow * 0.4})`;
      ctx.fill();
    });

    t += 0.012;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Boot ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain('matrix-canvas');
  initCandlestick('candle-canvas');
  initWaveform('waveform-bars');
  initECG('ecg-svg');
  initWaveformCanvas('waveform-canvas', '#00ff41', '#00e5ff');
  initSpectroCanvas('spectro-canvas');
  initCircuitBoard('circuit-canvas');
  initScrollReveal();
  initNav();
  initTicker();

  // Typewriter
  async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  async function type(el, text, speed = 45) {
    for (let i = 0; i <= text.length; i++) {
      el.textContent = text.slice(0, i);
      await sleep(speed);
    }
  }

  async function runBoot() {
    const bootEl = document.getElementById('boot-term');
    const heroEl = document.getElementById('hero-content');
    const lines = [
      '> Initialising system...',
      '> Loading: [AI] [Finance] [Backend] [Music] [Audio]',
      '> Connecting to portfolio.db ............ OK',
      '> Decrypting credentials ................. OK',
      '> Identity verified: JRENOTH MISQUITH',
      '> Access granted. Welcome.',
    ];
    const lineContainer = bootEl.querySelector('.boot-lines');
    for (const line of lines) {
      await sleep(280);
      const p = document.createElement('p');
      p.className = 'boot-line';
      p.textContent = line;
      lineContainer.appendChild(p);
    }
    await sleep(500);
    bootEl.style.opacity = '0';
    bootEl.style.transform = 'translateY(-10px)';
    await sleep(400);
    bootEl.style.display = 'none';
    heroEl.style.opacity = '1';
    heroEl.style.transform = 'translateY(0)';
    const nameEl = document.getElementById('typed-name');
    const roleEl = document.getElementById('typed-role');
    await type(nameEl, 'JRENOTH MISQUITH', 55);
    await sleep(200);
    await type(roleEl, 'Backend Engineer · AI/ML · Quant Trader · Music Tech', 28);
  }

  runBoot();
});
