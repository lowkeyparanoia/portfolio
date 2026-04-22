<script>
  import { onMount } from 'svelte';

  let canvas;
  let { opacity = 0.18 } = $props();

  onMount(() => {
    const ctx = canvas.getContext('2d');
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]()#$%&=+-*/\\|;:,.?!@~^_`';

    let W, H, cols, drops;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cols  = Math.floor(W / 16);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    }

    resize();
    window.addEventListener('resize', resize);

    const tick = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, W, H);

      ctx.font = '14px JetBrains Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * 16;

        // Leading char bright
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.fillText(char, i * 16, y);

        // Trail chars in green
        ctx.fillStyle = '#00ff41';
        ctx.globalAlpha = 0.7;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y - 16);

        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#00c032';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y - 32);

        ctx.globalAlpha = 0.15;
        ctx.fillStyle = '#004d10';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y - 48);

        ctx.globalAlpha = 1;

        if (drops[i] * 16 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
    }, 40);

    return () => { clearInterval(tick); window.removeEventListener('resize', resize); };
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
