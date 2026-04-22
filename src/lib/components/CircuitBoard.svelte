<script>
  import { onMount } from 'svelte';
  let { opacity = 0.22 } = $props();
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let t = 0, raf;
    let traces = [], junctions = [];

    function buildLayout(W, H) {
      traces = []; junctions = [];
      const cols = Math.floor(W / 60);
      const rows = Math.floor(H / 50);
      const cw = W / cols, ch = H / rows;

      for (let r = 0; r <= rows; r++) {
        let x = 0; const y = r * ch;
        while (x < W) {
          const segLen = cw * (1 + Math.floor(Math.random() * 3));
          traces.push({ x1: x, y1: y, x2: Math.min(x + segLen, W), y2: y, phase: Math.random() * Math.PI * 2 });
          x += segLen + (Math.random() > 0.4 ? cw : 0);
        }
      }
      for (let c = 0; c <= cols; c++) {
        let y = 0; const x = c * cw;
        while (y < H) {
          const segLen = ch * (1 + Math.floor(Math.random() * 2));
          traces.push({ x1: x, y1: y, x2: x, y2: Math.min(y + segLen, H), phase: Math.random() * Math.PI * 2 });
          y += segLen + (Math.random() > 0.5 ? ch : 0);
        }
      }
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          if (Math.random() > 0.65)
            junctions.push({ x: c * cw, y: r * ch, r: 2 + Math.random() * 2, phase: Math.random() * Math.PI * 2 });
        }
      }
    }

    function draw() {
      const W = canvas.width  = canvas.offsetWidth;
      const H = canvas.height = canvas.offsetHeight;
      if (traces.length === 0) buildLayout(W, H);
      ctx.clearRect(0, 0, W, H);

      traces.forEach(tr => {
        const pulse   = 0.3 + 0.2 * Math.sin(t * 1.4 + tr.phase);
        const isCyan  = tr.phase > Math.PI;
        ctx.strokeStyle = isCyan ? `rgba(0,229,255,${pulse})` : `rgba(0,255,65,${pulse})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(tr.x1, tr.y1); ctx.lineTo(tr.x2, tr.y2); ctx.stroke();

        const speed = 0.4 + (tr.phase % 1) * 0.6;
        const prog  = ((t * speed + tr.phase) % (Math.PI * 2)) / (Math.PI * 2);
        const dx = tr.x1 + (tr.x2 - tr.x1) * prog;
        const dy = tr.y1 + (tr.y2 - tr.y1) * prog;
        ctx.fillStyle = isCyan ? 'rgba(0,229,255,0.9)' : 'rgba(0,255,65,0.9)';
        ctx.beginPath(); ctx.arc(dx, dy, 1.5, 0, Math.PI * 2); ctx.fill();
      });

      junctions.forEach(j => {
        const glow = 0.4 + 0.3 * Math.sin(t * 2 + j.phase);
        ctx.strokeStyle = `rgba(0,229,255,${glow})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(j.x, j.y, j.r, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = `rgba(0,229,255,${glow * 0.4})`; ctx.fill();
      });

      t += 0.012;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  });
</script>

<canvas bind:this={canvas} style="opacity:{opacity}"></canvas>

<style>
  canvas {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    pointer-events: none;
  }
</style>
