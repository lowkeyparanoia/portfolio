<script>
  import { onMount } from 'svelte';
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let candles = [];

    function genCandle(prev) {
      const base = prev ? prev.close : 100;
      const change = (Math.random() - 0.46) * 4;
      const open  = base;
      const close = base + change;
      const high  = Math.max(open, close) + Math.random() * 2;
      const low   = Math.min(open, close) - Math.random() * 2;
      return { open, close, high, low };
    }
    for (let i = 0; i < 80; i++) candles.push(genCandle(candles[candles.length - 1]));

    let offset = 0;

    function draw() {
      const W = canvas.width  = canvas.offsetWidth;
      const H = canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const visible = candles.slice(-Math.floor(W / 12));
      const prices  = visible.flatMap(c => [c.high, c.low]);
      const minP = Math.min(...prices), maxP = Math.max(...prices);
      const range = maxP - minP || 1;
      const pad = 20;
      const toY = v => pad + (1 - (v - minP) / range) * (H - pad * 2);
      const cw  = Math.floor(W / visible.length);

      ctx.strokeStyle = 'rgba(0,255,65,0.05)'; ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = pad + (i / 4) * (H - pad * 2);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      visible.forEach((c, i) => {
        const x    = i * cw + cw / 2;
        const bull = c.close >= c.open;
        const col  = bull ? '#00ff41' : '#ff4444';
        ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, toY(c.high)); ctx.lineTo(x, toY(c.low)); ctx.stroke();
        const bodyTop = toY(Math.max(c.open, c.close));
        const bodyH   = Math.max(1, Math.abs(toY(c.open) - toY(c.close)));
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x - cw / 2 + 1, bodyTop, cw - 2, bodyH);
        ctx.globalAlpha = 1;
      });

      const maLen = 20;
      ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.6;
      ctx.beginPath();
      visible.forEach((c, i) => {
        if (i < maLen) return;
        const slice = visible.slice(i - maLen, i);
        const ma = slice.reduce((s, v) => s + v.close, 0) / maLen;
        const x  = i * cw + cw / 2;
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
    return () => window.removeEventListener('resize', draw);
  });
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas { display: block; width: 100%; height: 100%; }
</style>
