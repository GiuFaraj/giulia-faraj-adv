# 3D: Three.js + React Three Fiber

Versões consultadas em 01/10/2026 (npm + Context7): `three` 0.186.1 (`/mrdoob/three.js`), `@react-three/fiber` 9.8.1 e `@react-three/drei` 10.7.9 (`/pmndrs/react-three-fiber`). Shaders customizados: skill `web-shaders`. Skills de Three.js opcionais: README, "Opcionais por projeto".

## Quando usar

Só com **objeto 3D de verdade**: produto, modelo (`.glb`), cena que o usuário explora. Forma abstrata girando, fundo de "esfera" ou "blob" não é 3D de verdade: use shader 2D ([background.md](background.md)), que custa uma fração.

Sem objeto real → nada de Three.js no projeto.

## React (R3F)

```tsx
'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { useReducedMotion } from 'motion/react';
import type { Group } from 'three';

function Product({ url, spin }: { url: string; spin: boolean }) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (spin && ref.current) ref.current.rotation.y += delta * 0.25;   // delta: independe do fps
  });
  return <primitive ref={ref} object={scene} />;
}

export function ProductStage({ url }: { url: string }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <Canvas
      dpr={[1, 2]}                          // limita o pixel ratio
      frameloop={reduced ? 'demand' : 'always'}
      performance={{ min: 0.5 }}            // reduz resolução sob carga
      camera={{ position: [0, 0, 4], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Product url={url} spin={!reduced} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/models/product.glb');
```

Carregue o `ProductStage` com `import()` dinâmico (em Next.js, `dynamic(() => import(...), { ssr: false })`) e mostre uma imagem estática do produto enquanto carrega; ela também é o fallback sem WebGL.

## Sem framework

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export async function mount(container, url) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 4;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 2));

  const { scene: model } = await new GLTFLoader().loadAsync(url);
  scene.add(model);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = new THREE.Clock();
  const loop = () => {
    if (!reduced) model.rotation.y += clock.getDelta() * 0.25;
    renderer.render(scene, camera);
  };

  const io = new IntersectionObserver(([e]) => renderer.setAnimationLoop(e.isIntersecting ? loop : null));
  io.observe(container);                    // pausa fora da tela

  return () => { io.disconnect(); renderer.setAnimationLoop(null); renderer.dispose(); };
}
```

## Regras

- Modelo otimizado (`gltf-transform` com Draco ou Meshopt, texturas KTX2) e abaixo de ~2 MB para o hero.
- Pós-processamento (bloom) só se o objeto pedir; ele custa caro no mobile.
- Mobile: `dpr` até 1.5 ou imagem estática se o profiling ficar abaixo de 60 fps.
- Interação (arrastar para girar) com alternativa por teclado ou botão.
- No desmonte, liberar memória: `dispose()` de geometria, material e texturas.
