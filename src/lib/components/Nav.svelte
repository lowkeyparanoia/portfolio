<script>
  import { onMount } from 'svelte';
  let scrolled  = $state(false);
  let menuOpen  = $state(false);
  let time      = $state('');
  let activeId  = $state('');

  const links = [
    { href: '#experience', label: 'experience' },
    { href: '#opensource', label: 'open_source' },
    { href: '#projects',   label: 'projects'    },
    { href: '#trading',    label: 'trading'      },
    { href: '#music',      label: 'music'        },
    { href: '#about',      label: 'about'        },
    { href: '#contact',    label: 'contact'      },
  ];

  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 40;
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 140) activeId = s.id;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = setInterval(() => {
      time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }, 1000);

    return () => { window.removeEventListener('scroll', onScroll); clearInterval(tick); };
  });
</script>

<nav class:scrolled>
  <div class="nav-pill">
    <a href="#hero" class="nav-logo">jm<span>@</span>dev</a>

    <ul class="nav-links" class:open={menuOpen}>
      {#each links as { href, label }}
        <li>
          <a
            {href}
            class="nav-link"
            class:active={activeId === href.slice(1)}
            onclick={() => menuOpen = false}
          >{label}</a>
        </li>
      {/each}
    </ul>

    <div class="nav-right">
      <span class="clock">{time}</span>
      <button class="burger" onclick={() => menuOpen = !menuOpen} aria-label="menu">
        {menuOpen ? '[x]' : '[≡]'}
      </button>
    </div>
  </div>
</nav>

<style>
  nav {
    position: fixed; top: 36px; left: 50%; transform: translateX(-50%);
    z-index: 100; transition: all 0.3s; width: auto;
  }
  .nav-pill {
    display: flex; align-items: center; gap: 24px;
    padding: 10px 24px;
    background: rgba(2,4,8,0.7);
    border: 1px solid var(--border2);
    backdrop-filter: blur(16px);
    border-radius: 100px;
  }
  nav.scrolled .nav-pill {
    background: rgba(2,4,8,0.92);
    box-shadow: 0 0 30px rgba(0,255,65,0.06);
  }
  .nav-logo {
    font-family: var(--sans); font-weight: 800; font-size: 0.95rem;
    color: var(--green); letter-spacing: 0.02em; white-space: nowrap;
    text-decoration: none;
  }
  .nav-logo span { color: var(--cyan); }
  .nav-links {
    display: flex; gap: 4px; list-style: none;
  }
  .nav-link {
    font-size: 0.75rem; color: var(--text-mute);
    padding: 4px 12px; border-radius: 100px;
    transition: 0.2s; letter-spacing: 0.04em;
    text-decoration: none;
  }
  .nav-link:hover,
  .nav-link.active { color: var(--green); background: rgba(0,255,65,0.08); }
  .nav-right {
    display: flex; align-items: center; gap: 16px; flex-shrink: 0;
  }
  .clock { font-size: 0.7rem; color: var(--text-mute); letter-spacing: 0.06em; }
  .burger {
    display: none; background: none; border: none; cursor: pointer;
    color: var(--green); font-family: var(--font); font-size: 1rem;
  }

  @media (max-width: 900px) {
    nav { top: 0; left: 0; right: 0; transform: none; width: 100%; }
    .nav-pill { border-radius: 0; border-left: none; border-right: none; border-top: none; }
    .burger { display: block; }
    .nav-links {
      display: none; position: fixed; inset: 0;
      background: rgba(2,4,8,0.97);
      flex-direction: column; align-items: center; justify-content: center;
      gap: 28px; border: 1px solid var(--border2);
    }
    .nav-links.open { display: flex; }
    .nav-link { font-size: 1rem; }
    .clock { display: none; }
  }
</style>
