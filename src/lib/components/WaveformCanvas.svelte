<script>
  import { onMount } from 'svelte';
  let { colorA = '#00ff41', colorB = '#00e5ff' } = $props();
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let t = 0;
    const bands = 64;
    let raf;

    function draw() {
      canvas.width  = canvas.offsetWidth;
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
        ctx.fillStyle = grad; ctx.globalAlpha = 0.85;
        ctx.fillRect(i * bw + 1, H - h, bw - 2, h);
      }
      ctx.globalAlpha = 1;
      t += 0.022;
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
