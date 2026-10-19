"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import FirstFrame from "./kit/FirstFrame";

const ss = THREE.MathUtils.smoothstep;
function Env() {
  const done = useRef(false);
  useFrame(({ gl, scene }) => { if (done.current) return; done.current = true; const pm = new THREE.PMREMGenerator(gl); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; pm.dispose(); });
  return null;
}

function Product({ progress }: { progress: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null), band = useRef<THREE.Group>(null);
  const cups = [useRef<THREE.Group>(null), useRef<THREE.Group>(null)];
  const cush = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  const { bandMat, uni, shell, soft, volt, cylG, cushG, ringG, armG } = useMemo(() => {
    const uni = { uM: { value: 0 } };
    const bandMat = new THREE.MeshPhysicalMaterial({ color: "#232325", roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.35 });
    bandMat.onBeforeCompile = (sh) => {
      sh.uniforms.uM = uni.uM;
      sh.vertexShader = "uniform float uM;\n" + sh.vertexShader
        .replace("#include <beginnormal_vertex>", `float arc = mix(6.28318, 3.5186, uM); float st = 1.5708 - arc*0.5; float U = st + uv.x*arc; float V = uv.y*6.28318;
          vec3 objectNormal = vec3(cos(V)*cos(U), cos(V)*sin(U), sin(V));
          #ifdef USE_TANGENT
          vec3 objectTangent = vec3(-sin(U), cos(U), 0.);
          #endif`)
        .replace("#include <begin_vertex>", `float rr = mix(0.12, 0.1, uM); vec3 transformed = vec3((1.4 + rr*cos(V))*cos(U), (1.4 + rr*cos(V))*sin(U), rr*sin(V));`);
    };
    return {
      uni, bandMat,
      shell: new THREE.MeshPhysicalMaterial({ color: "#2b2b2d", roughness: 0.45, clearcoat: 0.4 }),
      soft: new THREE.MeshPhysicalMaterial({ color: "#18181a", roughness: 0.9, sheen: 1, sheenRoughness: 0.6 }),
      volt: new THREE.MeshStandardMaterial({ color: "#d7ff3b", roughness: 0.4, emissive: "#9fbf1a", emissiveIntensity: 0.25 }),
      cylG: new THREE.CylinderGeometry(0.62, 0.62, 0.42, 64), cushG: new THREE.TorusGeometry(0.5, 0.16, 24, 64), ringG: new THREE.TorusGeometry(0.62, 0.022, 12, 64), armG: new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16),
    };
  }, []);
  const bandGeo = useMemo(() => new THREE.TorusGeometry(1.4, 0.12, 32, 220), []);
  useFrame((st, dt) => {
    const P = progress.current * 2; // 0..2
    const m = ss(P, 0.15, 0.95), grow = ss(P, 0.45, 1.0), ex = ss(P, 1.2, 1.85);
    uni.uM.value = m;
    const g = group.current; if (!g) return;
    const k = Math.min(1, dt * 4);
    g.rotation.y += ((-0.5 * m + ex * 0.9) + st.pointer.x * 0.25 - g.rotation.y) * k;
    g.rotation.x += (0.05 * m + st.pointer.y * -0.12 - g.rotation.x) * k;
    g.position.y = -0.35 * m + ex * 0.75 + Math.sin(st.clock.elapsedTime * 0.8) * 0.04;
    if (band.current) band.current.position.y = ex * 0.45;
    const end = 0.56 * Math.PI;
    cups.forEach((c, i) => {
      const s = i ? 1 : -1; const a = Math.PI / 2 - s * end;
      if (!c.current) return;
      c.current.position.set(Math.cos(a) * 1.4 + s * ex * 0.9, Math.sin(a) * 1.4 - 0.15, 0);
      const sc = 0.001 + grow; c.current.scale.setScalar(sc);
      const cu = cush[i].current; if (cu) cu.position.x = -s * (0.26 + ex * 0.55);
    });
  });
  return (
    <group ref={group}>
      <group ref={band}><mesh geometry={bandGeo} material={bandMat} raycast={() => null} /></group>
      {[0, 1].map((i) => (
        <group key={i} ref={cups[i]}>
          <mesh geometry={cylG} material={shell} rotation={[0, 0, Math.PI / 2]} raycast={() => null} />
          <mesh ref={cush[i]} geometry={cushG} material={soft} rotation={[0, Math.PI / 2, 0]} raycast={() => null} />
          <mesh geometry={ringG} material={volt} rotation={[0, Math.PI / 2, 0]} position={[i ? 0.215 : -0.215, 0, 0]} raycast={() => null} />
          <mesh geometry={armG} material={shell} position={[0, 0.55, 0]} raycast={() => null} />
        </group>
      ))}
    </group>
  );
}

export default function MorphScene({ progress, running, onReady }: { progress: MutableRefObject<number>; running: boolean; onReady: () => void }) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas frameloop={running ? "always" : "demand"} dpr={[1, mobile ? 1.25 : 1.5]} camera={{ position: [0, mobile ? -1.6 : 0, mobile ? 16 : 9.5], fov: 30 }} gl={{ antialias: true, alpha: true }}>
      <Env />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 6, 8]} intensity={1.8} />
      <Product progress={progress} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
