<script>
  import '../app.css';
  import Nav    from '$lib/components/Nav.svelte';
  import Ticker from '$lib/components/Ticker.svelte';
  let { children } = $props();
</script>

<Ticker />
<Nav />
{@render children()}

<footer>
  <div class="container">
    <span class="prompt-str">jm@dev</span><span class="tilde">:~$</span>
    <span class="ft-text"> echo "built with SvelteKit · deployed on GitHub Pages"</span>
  </div>
</footer>

<style>
  footer {
    padding: 20px 0; border-top: 1px solid var(--border);
    font-size: 0.75rem; color: var(--text-mute);
  }
  .prompt-str { color: var(--green); }
  .tilde      { color: var(--cyan); margin-right: 4px; }
  .ft-text    { color: var(--text-mute); }
</style>
