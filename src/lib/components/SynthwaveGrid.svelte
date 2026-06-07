<script>
  /* Synthwave perspective-grid floor + horizon glow for a section background.
     Sits absolutely behind the section content (which is lifted to z-index:2
     globally). The grid scrolls toward the viewer for the moving-horizon depth.
     `intensity` (0–1) scales how prominent it is; reduced-motion stops the scroll. */
  let { intensity = 1 } = $props();
</script>

<div class="sw" style="opacity:{intensity}" aria-hidden="true">
  <div class="sw-glow"></div>
  <div class="sw-grid"></div>
</div>

<style>
  .sw { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
  .sw-glow {
    position: absolute; left: 0; right: 0; bottom: 0; height: 60%;
    background: linear-gradient(180deg,
      transparent 0%,
      rgba(0,255,65,0.035) 55%,
      rgba(0,255,65,0.13) 72%,
      rgba(0,255,65,0.035) 75%,
      transparent 100%);
  }
  .sw-grid {
    position: absolute; bottom: 0; left: -50%; right: -50%; height: 64%;
    background-image:
      linear-gradient(rgba(0,255,65,0.18) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,65,0.18) 1px, transparent 1px);
    background-size: 62px 62px;
    transform: perspective(340px) rotateX(70deg);
    transform-origin: bottom center;
    animation: sw-scroll 3.2s linear infinite;
    -webkit-mask-image: radial-gradient(ellipse 78% 100% at 50% 100%, #000 26%, transparent 100%);
    mask-image: radial-gradient(ellipse 78% 100% at 50% 100%, #000 26%, transparent 100%);
  }
  @keyframes sw-scroll { from { background-position: 0 0; } to { background-position: 0 62px; } }
  @media (prefers-reduced-motion: reduce) { .sw-grid { animation: none; } }
</style>
