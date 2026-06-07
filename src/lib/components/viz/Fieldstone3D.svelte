<script>
  /* WebGL wrapper (Threlte Canvas) for the Fieldstone subsystem orbit.
     Lazy-loaded only when the 3D tab opens, so three.js never hits the landing bundle. */
  import { Canvas } from '@threlte/core';
  import Scene from './Fieldstone3DScene.svelte';

  const legend = [
    ['#00e5ff', 'HTTP / WS / gRPC'], ['#ffd700', 'REST + GraphQL'], ['#9a6cf0', 'Realtime hub'],
    ['#e6489a', 'WASM plugins'], ['#f97316', 'Job queue'], ['#5bc0ff', 'cache / ratelimit'],
    ['#00ff41', 'Auth / JWT'], ['#46d19a', 'storage / cron'],
  ];
</script>

<div class="f3d">
  <div class="f3d-canvas"><Canvas><Scene /></Canvas></div>
  <div class="f3d-legend">
    {#each legend as [c, l]}<span class="f3d-li"><i style="background:{c}"></i>{l}</span>{/each}
  </div>
  <p class="f3d-hint">drag to orbit · scroll to zoom — the green wireframe core is the single Go binary; the nodes are its subsystems, all coordinated by goroutines + channels.</p>
</div>

<style>
  .f3d-canvas {
    height: min(46vh, 380px); border: 1px solid var(--border2); border-radius: var(--radius);
    overflow: hidden; background: radial-gradient(circle at 50% 40%, #07140f, #030806);
  }
  .f3d-legend { display: flex; flex-wrap: wrap; gap: 10px 16px; margin-top: 12px; }
  .f3d-li { display: flex; align-items: center; gap: 6px; font-family: var(--font); font-size: 0.7rem; color: var(--text-dim); }
  .f3d-li i { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
  .f3d-hint { font-family: var(--font); font-size: 0.7rem; color: var(--text-mute); margin-top: 10px; line-height: 1.5; }
</style>
