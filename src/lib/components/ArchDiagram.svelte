<script>
  /* Interactive architecture diagram (pan / zoom / drag) via Svelte Flow v1.
     Pass one of the diagrams from $lib/data/architectures.js. */
  import { SvelteFlow, Background, Controls, MiniMap, BackgroundVariant } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  let { diagram, height = '440px' } = $props();

  // Svelte Flow v1 binds writable $state for nodes/edges; seed from the prop in an
  // effect so dragging persists and there's no "referenced locally" warning.
  let nodes = $state([]);
  let edges = $state([]);
  $effect(() => {
    nodes = diagram.nodes.map((d) => ({ ...d }));
    edges = diagram.edges.map((d) => ({ ...d }));
  });
</script>

<div class="arch" style="height:{height}">
  <SvelteFlow bind:nodes bind:edges fitView minZoom={0.3} maxZoom={2}
    proOptions={{ hideAttribution: true }}>
    <Background variant={BackgroundVariant.Dots} gap={22} bgColor="#06100d" patternColor="#16302a" />
    <Controls showLock={false} />
    <MiniMap nodeColor="#0e2030" maskColor="rgba(2,4,8,0.7)" pannable zoomable />
  </SvelteFlow>
</div>

<style>
  .arch {
    width: 100%;
    border: 1px solid var(--border2);
    border-radius: var(--radius);
    overflow: hidden;
    background: #06100d;
  }
  /* tuck the Svelte Flow chrome into the terminal palette */
  .arch :global(.svelte-flow__controls) {
    box-shadow: none;
    border: 1px solid var(--border);
  }
  .arch :global(.svelte-flow__controls-button) {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    fill: var(--text-dim);
  }
  .arch :global(.svelte-flow__controls-button:hover) { background: var(--surface2); }
  .arch :global(.svelte-flow__minimap) {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
  }
  .arch :global(.svelte-flow__edge-text) { font-family: var(--font); }
  .arch :global(.svelte-flow__attribution) { display: none; }
</style>
