<script>
  /* Interactive 3D business card (ported from lowkeyparanoia/ar-card):
     move the mouse / finger to tilt it in 3D, click/tap to flip, "View in AR"
     opens the marker-AR view. Matches the portfolio's terminal theme. */
  import { base } from '$app/paths';

  let flipped = $state(false);
  let rx = $state(0);
  let ry = $state(0);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry = px * 20; rx = -py * 20;
  }
  function reset() { rx = 0; ry = 0; }
</script>

<div class="arc">
  <div class="card-scene" onpointermove={onMove} onpointerleave={reset}
    onclick={() => (flipped = !flipped)} role="button" tabindex="0"
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipped = !flipped; } }}
    aria-label="3D business card — click to flip">
    <div class="card-tilt" style="transform: rotateX({rx}deg) rotateY({ry}deg)">
      <div class="card-inner" class:flipped>
        <!-- FRONT -->
        <div class="face front">
          <div class="row top">
            <div class="hex"><span>J·M</span></div>
            <span class="hint">// tap to flip ↻</span>
          </div>
          <div>
            <div class="cname">JRENOTH MISQUITH</div>
            <div class="chips">
              <span class="chip g">Backend</span><span class="chip c">AI/ML</span>
              <span class="chip go">Quant</span><span class="chip p">Music Tech</span>
              <span class="chip o">Projection</span>
            </div>
          </div>
          <div class="row bottom"><span class="handle">lowkeyparanoia</span><span class="loc">BENGALURU · IN</span></div>
        </div>
        <!-- BACK -->
        <div class="face back">
          <div class="bcol left">
            <div class="bname">JRENOTH MISQUITH</div>
            <div class="links">
              <a href="https://github.com/lowkeyparanoia" target="_blank" rel="noopener"><span class="blk">gh</span>lowkeyparanoia</a>
              <a href="https://linkedin.com/in/jrenoth" target="_blank" rel="noopener"><span class="blk">li</span>jrenoth</a>
              <a href="{base}/" target="_blank" rel="noopener"><span class="blk">↗</span>portfolio</a>
            </div>
            <div class="bstats">3 continents · 5 companies · Bloomberg #140</div>
          </div>
          <div class="bcol right">
            <div class="blabel">// stack</div>
            <div class="bskills">
              <span class="bsk g">Rust</span><span class="bsk c">Python</span><span class="bsk g">FastAPI</span>
              <span class="bsk p">TouchDesigner</span><span class="bsk go">Pine</span><span class="bsk c">Go</span>
              <span class="bsk g">Supabase</span><span class="bsk p">Claude</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <a class="ar-btn" href="{base}/ar.html" target="_blank" rel="noopener">◈ &nbsp;./view_in_ar.sh&nbsp; — place the card in real space</a>
  <span class="ar-sub">move your cursor to tilt · click to flip · open AR on a phone</span>
</div>

<style>
  .arc { display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .card-scene { width: 340px; max-width: 100%; height: 200px; perspective: 1100px; cursor: pointer; user-select: none; }
  .card-tilt { width: 100%; height: 100%; transition: transform 0.12s ease-out; transform-style: preserve-3d; }
  .card-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.65s cubic-bezier(.4,.2,.2,1); }
  .card-inner.flipped { transform: rotateY(180deg); }
  .face { position: absolute; inset: 0; border-radius: 7px; backface-visibility: hidden; clip-path: inset(0 round 7px); padding: 15px 17px; display: flex; flex-direction: column; justify-content: space-between; }
  .front { background: var(--bg); border: 1px solid var(--border2); box-shadow: inset 0 0 20px rgba(0,255,65,0.12), 0 0 40px rgba(0,255,65,0.15); }
  .front::before, .back::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
  .front::before { background: linear-gradient(90deg, var(--green), var(--cyan)); }
  .back { transform: rotateY(180deg); background: #07111b; border: 1px solid var(--border2); box-shadow: inset 0 0 24px rgba(0,229,255,0.07), 0 0 30px rgba(0,229,255,0.1); flex-direction: row; gap: 0; }
  .back::before { background: linear-gradient(90deg, var(--cyan), #9a6cf0); }
  .row { display: flex; align-items: center; }
  .top { justify-content: space-between; }
  .bottom { justify-content: space-between; align-items: flex-end; }
  .hex { width: 30px; height: 30px; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); background: linear-gradient(135deg, var(--green), var(--cyan)); display: grid; place-items: center; }
  .hex span { font-family: var(--sans); font-size: 10px; font-weight: 800; color: #000; }
  .hint { font-size: 8px; color: var(--text-mute); }
  .cname { font-family: var(--sans); font-size: 19px; font-weight: 800; color: #fff; line-height: 1; text-shadow: 0 0 20px rgba(0,255,65,0.35); }
  .chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
  .chip { font-size: 8px; padding: 2px 7px; border-radius: 3px; border: 1px solid; font-family: var(--font); }
  .chip.g { color: var(--green); border-color: rgba(0,255,65,.35); } .chip.c { color: var(--cyan); border-color: rgba(0,229,255,.3); }
  .chip.go { color: var(--gold); border-color: rgba(255,215,0,.3); } .chip.p { color: #9a6cf0; border-color: rgba(154,108,240,.3); }
  .chip.o { color: #f07a30; border-color: rgba(240,122,48,.3); }
  .handle { font-size: 9px; color: var(--text-mute); } .loc { font-size: 8px; color: var(--text-mute); }
  .bcol.left { flex: 1; display: flex; flex-direction: column; justify-content: space-between; border-right: 1px solid var(--border); padding-right: 11px; min-width: 0; }
  .bname { font-family: var(--sans); font-size: 10px; font-weight: 800; color: #fff; }
  .links { display: flex; flex-direction: column; gap: 5px; }
  .links a { font-size: 9px; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 5px; }
  .links a:hover { color: var(--cyan); }
  .blk { font-size: 7px; color: var(--cyan); background: rgba(0,229,255,.1); border: 1px solid rgba(0,229,255,.2); padding: 1px 3px; border-radius: 2px; min-width: 16px; text-align: center; }
  .bstats { font-size: 7.5px; color: var(--gold); line-height: 1.4; }
  .bcol.right { width: 140px; flex-shrink: 0; padding-left: 11px; }
  .blabel { font-size: 8px; color: var(--text-mute); margin-bottom: 6px; }
  .bskills { display: flex; flex-wrap: wrap; gap: 3px; }
  .bsk { font-size: 7.5px; padding: 2px 5px; border-radius: 2px; border: 1px solid; white-space: nowrap; }
  .bsk.g { color: var(--green); border-color: rgba(0,255,65,.3); } .bsk.c { color: var(--cyan); border-color: rgba(0,229,255,.25); }
  .bsk.go { color: var(--gold); border-color: rgba(255,215,0,.25); } .bsk.p { color: #9a6cf0; border-color: rgba(154,108,240,.25); }

  .ar-btn { padding: 12px 20px; background: var(--green-mute); border: 1px solid var(--green-dim); color: var(--green); font-family: var(--font); font-size: 12px; letter-spacing: 0.5px; text-decoration: none; border-radius: 4px; transition: 0.15s; }
  .ar-btn:hover { background: rgba(0,255,65,0.1); box-shadow: 0 0 16px rgba(0,255,65,0.12); color: var(--cyan); }
  .ar-sub { font-family: var(--font); font-size: 0.66rem; color: var(--text-mute); letter-spacing: 0.04em; }

  @media (prefers-reduced-motion: reduce) { .card-tilt { transition: none; } }
</style>
