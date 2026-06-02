<script>
  const items = [
    { sym: 'PF',     val: '2.5×',    chg: '+150%',      up: true  },
    { sym: 'FIB',    val: '~70%',    chg: 'hit rate',   up: true  },
    { sym: 'RET',    val: '10×',     chg: '+900%',      up: true  },
    { sym: 'CRYPTO', val: '+13%',    chg: '1mo',        up: true  },
    { sym: 'RANK',   val: '#140',    chg: 'Bloomberg',  up: true  },
    { sym: 'RISK',   val: '3%',      chg: 'max/trade',  up: false },
    { sym: 'HKTECH', val: 'FUNDED',  chg: 'Seed',       up: true  },
    { sym: 'MERIT',  val: '140K',    chg: 'HKD/yr',     up: true  },
    { sym: 'IELTS',  val: '8.5',     chg: 'score',      up: true  },
  ];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
</script>

<div class="ticker-bar">
  <div class="ticker-inner">
    {#each doubled as item}
      <span class="tick-item">
        <span class="tick-sym">{item.sym}</span>
        <span class="tick-val" class:up={item.up} class:down={!item.up}>{item.val}</span>
        <span class="tick-chg">{item.chg}</span>
      </span>
    {/each}
  </div>
</div>

<style>
  .ticker-bar {
    background: var(--bg3);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
    height: 32px;
    display: flex;
    align-items: center;
  }
  .ticker-inner {
    display: flex;
    gap: 0;
    animation: ticker 40s linear infinite;
    white-space: nowrap;
  }
  .tick-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 20px;
    border-right: 1px solid var(--border);
    font-size: 0.68rem;
  }
  .tick-sym  { color: var(--text-mute); letter-spacing: 0.06em; }
  .tick-val  { font-weight: 700; }
  .tick-val.up   { color: var(--green); }
  .tick-val.down { color: var(--cyan); }
  .tick-chg  { color: var(--text-mute); }

  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
</style>
