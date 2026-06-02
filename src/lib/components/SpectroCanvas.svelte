<script>
  import { onMount } from 'svelte';
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let t = 0, raf;

    function draw() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const R  = Math.min(W, H) * 0.32;
      const bars = 80;
      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
        const amp   =
          0.35 * Math.abs(Math.sin(t * 1.8 + i * 0.25)) +
          0.35 * Math.abs(Math.sin(t * 2.6 + i * 0.18 + 1.2)) +
          0.3  * Math.abs(Math.sin(t * 1.1 + i * 0.4));
        const len = R * 0.2 + R * 0.8 * amp;
        const x1 = cx + Math.cos(angle) * R;
        const y1 = cy + Math.sin(angle) * R;
        const x2 = cx + Math.cos(angle) * (R + len);
        const y2 = cy + Math.sin(angle) * (R + len);
        const hue = (i / bars) * 60 + 30;
        ctx.strokeStyle = `hsl(${hue},100%,60%)`;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.7 + 0.3 * amp;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.6);
      grad.addColorStop(0, 'rgba(255,215,0,0.15)');
      grad.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.globalAlpha = 1; ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.6, 0, Math.PI * 2); ctx.fill();
      t += 0.018;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  });
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas { display: block; width: 100%; height: 100%; }
</style>
