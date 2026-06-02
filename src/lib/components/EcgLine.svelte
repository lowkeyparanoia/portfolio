<script>
  import { onMount } from 'svelte';
  let svg;

  onMount(() => {
    const W = 600, H = 60;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    function ecgPath(n = 3) {
      let d = `M 0 ${H / 2}`;
      for (let i = 0; i < n; i++) {
        const x   = (i / n) * W;
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
          <stop offset="0%"   stop-color="#00ff41" stop-opacity="0"/>
          <stop offset="40%"  stop-color="#00ff41" stop-opacity="1"/>
          <stop offset="100%" stop-color="#00ff41" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${ecgPath(3)}" fill="none" stroke="url(#ecgGrad)" stroke-width="2" opacity="0.8">
        <animateTransform attributeName="transform" type="translate"
          from="-${W/3} 0" to="0 0" dur="1.2s" repeatCount="indefinite"/>
      </path>
    `;
  });
</script>

<svg bind:this={svg} preserveAspectRatio="none"></svg>

<style>
  svg { width: 100%; height: 60px; display: block; }
</style>
