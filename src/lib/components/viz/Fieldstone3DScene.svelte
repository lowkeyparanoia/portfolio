<script>
  /* Threlte scene: a wireframe core (the single Go binary) with 8 subsystem
     nodes orbiting it. Auto-rotates; OrbitControls give mouse/touch control. */
  import { T, useTask } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';

  let group = $state(undefined);
  useTask((delta) => { if (group) group.rotation.y += delta * 0.22; });

  const R = 3.3;
  const subs = [
    { c: '#00e5ff', a: 0 }, { c: '#ffd700', a: 0.78 }, { c: '#9a6cf0', a: 1.57 },
    { c: '#e6489a', a: 2.35 }, { c: '#f97316', a: 3.14 }, { c: '#5bc0ff', a: 3.92 },
    { c: '#00ff41', a: 4.71 }, { c: '#46d19a', a: 5.5 },
  ].map((s) => ({ ...s, pos: [Math.cos(s.a) * R, Math.sin(s.a * 1.3) * 0.9, Math.sin(s.a) * R] }));
</script>

<T.PerspectiveCamera makeDefault position={[0, 1.6, 9]} fov={48}>
  <OrbitControls enablePan={false} enableZoom minDistance={5} maxDistance={14} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.PointLight position={[0, 0, 0]} intensity={30} color="#00ff41" />
<T.PointLight position={[5, 5, 5]} intensity={12} color="#00e5ff" />

<T.Group bind:ref={group}>
  <T.Mesh>
    <T.IcosahedronGeometry args={[1.25, 1]} />
    <T.MeshStandardMaterial color="#0a3d1a" emissive="#00ff41" emissiveIntensity={0.5} wireframe />
  </T.Mesh>
  {#each subs as s}
    <T.Mesh position={s.pos}>
      <T.SphereGeometry args={[0.34, 24, 24]} />
      <T.MeshStandardMaterial color={s.c} emissive={s.c} emissiveIntensity={0.55} roughness={0.3} />
    </T.Mesh>
  {/each}
</T.Group>
