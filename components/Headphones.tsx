"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type Finish = "graphite" | "bone" | "volt";
export const FIN: Record<Finish, { shell: string; band: string; soft: string; accent: string; metal: string }> = {
  graphite: { shell: "#2b2b2d", band: "#232325", soft: "#19191b", accent: "#d7ff3b", metal: "#8c8c90" },
  bone: { shell: "#e8e4dc", band: "#dcd7cd", soft: "#cdc6b9", accent: "#121212", metal: "#b8b4ac" },
  volt: { shell: "#d7ff3b", band: "#2b2b2d", soft: "#232325", accent: "#121212", metal: "#9a9a9e" },
};
const ss = THREE.MathUtils.smoothstep;
function Env() { const { gl, scene } = useThree(); useEffect(() => { const p = new THREE.PMREMGenerator(gl); const e = p.fromScene(new RoomEnvironment(), .04).texture; scene.environment = e; return () => { e.dispose(); p.dispose(); }; }, [gl, scene]); return null; }
function cupGeo() { const pts = [[0, .24], [.42, .24], [.56, .2], [.63, .1], [.65, 0], [.63, -.12], [.56, -.2], [.4, -.24], [0, -.24]].map(([r, y]) => new THREE.Vector2(r, y)); const g = new THREE.LatheGeometry(pts, 96); g.rotateZ(Math.PI / 2); return g; }

/** m: 0 = closed ring (the mark), 1 = headphone arc. ex: 0..1 exploded. */
function Model({ finish, m, ex }: { finish: Finish; m: MutableRefObject<number>; ex: MutableRefObject<number> }) {
  const cups = [useRef<THREE.Group>(null!), useRef<THREE.Group>(null!)], cush = [useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!)], pad = useRef<THREE.Mesh>(null!), band = useRef<THREE.Group>(null!);
  const r = useMemo(() => {
    const f = FIN[finish], uni = { uM: { value: 0 } };
    const bandMat = new THREE.MeshPhysicalMaterial({ color: f.band, roughness: .38, metalness: .2, clearcoat: .6, clearcoatRoughness: .3 });
    bandMat.onBeforeCompile = (sh) => { sh.uniforms.uM = uni.uM; sh.vertexShader = "uniform float uM;\n" + sh.vertexShader
      .replace("#include <beginnormal_vertex>", `float arc = mix(6.28318, 3.42, uM); float st = 1.5708 - arc*.5; float U = st + uv.x*arc; float V = uv.y*6.28318; vec3 objectNormal = vec3(cos(V)*cos(U), cos(V)*sin(U), sin(V));`)
      .replace("#include <begin_vertex>", `float rr = mix(.12, .085, uM); vec3 transformed = vec3((1.4 + rr*cos(V)*1.0)*cos(U), (1.4 + rr*cos(V))*sin(U), rr*sin(V)*1.9);`); };
    return { uni, bandMat, bandG: new THREE.TorusGeometry(1.4, .1, 32, 240),
      shell: new THREE.MeshPhysicalMaterial({ color: f.shell, roughness: .42, metalness: finish === "volt" ? 0 : .15, clearcoat: .7, clearcoatRoughness: .25 }),
      soft: new THREE.MeshPhysicalMaterial({ color: f.soft, roughness: .95, sheen: 1, sheenColor: new THREE.Color(f.soft).offsetHSL(0, 0, .15), sheenRoughness: .5 }),
      acc: new THREE.MeshStandardMaterial({ color: f.accent, roughness: .35, emissive: f.accent === "#d7ff3b" ? "#7c9a10" : "#000", emissiveIntensity: .35 }),
      alu: new THREE.MeshPhysicalMaterial({ color: f.metal, metalness: 1, roughness: .32 }),
      cupG: cupGeo(), cushG: (() => { const g = new THREE.TorusGeometry(.46, .155, 28, 96); g.scale(1, 1, .72); g.rotateY(Math.PI / 2); return g; })(),
      meshG: (() => { const g = new THREE.CircleGeometry(.4, 64); g.rotateY(Math.PI / 2); return g; })(),
      ringG: (() => { const g = new THREE.TorusGeometry(.5, .018, 12, 96); g.rotateY(Math.PI / 2); return g; })(),
      forkG: (() => { const g = new THREE.TorusGeometry(.71, .032, 14, 64, Math.PI); g.rotateY(Math.PI / 2); return g; })(),
      stemG: new THREE.CylinderGeometry(.04, .04, .32, 20),
      padG: (() => { const g = new THREE.TorusGeometry(1.31, .075, 20, 96, 1.4); g.scale(1, 1, 1.7); return g; })() };
  }, [finish]);
  useFrame(() => {
    const M = m.current, E = ex.current, grow = ss(M, .35, 1); r.uni.uM.value = M;
    const end = .6 * Math.PI;
    cups.forEach((c, i) => { const s = i ? 1 : -1, a = Math.PI / 2 - s * end * .5 * 1.0; const o = c.current; if (!o) return;
      const ang = Math.PI / 2 + s * 1.71; o.position.set(Math.cos(ang) * 1.4 + s * (E * .8 - .02), Math.sin(ang) * 1.4 - 1.0, 0); o.scale.setScalar(.001 + grow); void a;
      const cu = cush[i].current; if (cu) cu.position.x = -s * (.27 + E * .5); });
    if (pad.current) { pad.current.position.y = E * .1; pad.current.scale.setScalar(.001 + grow); }
    if (band.current) band.current.position.y = E * .28;
  });
  return (<group>
    <group ref={band}><mesh geometry={r.bandG} material={r.bandMat} /></group>
    <mesh ref={pad} geometry={r.padG} material={r.soft} rotation-z={Math.PI / 2 - .7} />
    {[0, 1].map((i) => { const s = i ? 1 : -1; return (<group key={i} ref={cups[i]}>
      <mesh geometry={r.cupG} material={r.shell} position-x={s * .05} />
      <mesh geometry={r.ringG} material={r.acc} position-x={s * .29} />
      <mesh geometry={r.meshG} material={r.alu} position-x={s * .305} rotation-y={i ? 0 : Math.PI} />
      <mesh ref={cush[i]} geometry={r.cushG} material={r.soft} />
      <mesh geometry={r.forkG} material={r.alu} position-x={s * .02} />
      <mesh geometry={r.stemG} material={r.alu} position={[s * .02, .86, 0]} />
    </group>); })}
  </group>);
}
function Case() { const g = useMemo(() => new RoundedBoxGeometry(2.4, .9, 2, 8, .38), []); return (<group><mesh geometry={g}><meshPhysicalMaterial color="#5a5a5e" roughness={1} sheen={1} sheenColor="#9a9aa0" /></mesh><mesh position={[0, .46, .7]} rotation-x={-Math.PI / 2}><planeGeometry args={[.5, .12]} /><meshStandardMaterial color="#d7ff3b" /></mesh>
  <mesh position={[0, 0, 0]}><torusGeometry args={[1.19, .025, 8, 80]} /><meshStandardMaterial color="#2b2b2d" metalness={.8} roughness={.3} /></mesh></group>); }
function Cable() { const g = useMemo(() => { const P: THREE.Vector3[] = []; for (let i = 0; i <= 400; i++) { const t = i / 400, a = t * Math.PI * 2 * 4.5, r = .9 + Math.sin(t * 9) * .05; P.push(new THREE.Vector3(Math.cos(a) * r, (t - .5) * .5, Math.sin(a) * r)); } return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(P), 800, .045, 10); }, []);
  return (<group rotation-x={.4}><mesh geometry={g}><meshPhysicalMaterial color="#2b2b2d" roughness={.7} sheen={.6} sheenColor="#6a6a6e" sheenRoughness={.5} /></mesh>{[-1, 1].map((s) => <mesh key={s} position={[s * .9, s * .25, 0]}><cylinderGeometry args={[.08, .08, .3, 20]} /><meshPhysicalMaterial color="#9a9a9e" metalness={1} roughness={.3} /></mesh>)}</group>); }
function Cushions() { const g = useMemo(() => { const x = new THREE.TorusGeometry(.6, .2, 28, 96); x.scale(1, 1, .7); return x; }, []); return (<group>{[-.5, .5].map((x, i) => <mesh key={x} geometry={g} position={[x, i * .15, -i * .2]} rotation={[.5, .3 - i * .5, 0]}><meshPhysicalMaterial color="#19191b" roughness={.95} sheen={1} sheenColor="#555" /></mesh>)}</group>); }

export type Mode = "hero" | "view" | "close" | "case" | "cable" | "cushions";
function Rig({ mode, finish, progress, explode }: { mode: Mode; finish: Finish; progress?: MutableRefObject<number>; explode?: boolean }) {
  const g = useRef<THREE.Group>(null!), m = useRef(mode === "hero" ? 0 : 1), ex = useRef(0), d = useRef({ on: false, x: 0, v: 0, a: 0 }), { gl, camera, size } = useThree();
  useEffect(() => { if (mode === "hero") return; const c = gl.domElement, s = d.current; const dn = (e: PointerEvent) => { s.on = true; s.x = e.clientX; }, mv = (e: PointerEvent) => { if (s.on) { s.v = (e.clientX - s.x) * .008; s.x = e.clientX; } }, up = () => { s.on = false; };
    c.addEventListener("pointerdown", dn); addEventListener("pointermove", mv); addEventListener("pointerup", up); return () => { c.removeEventListener("pointerdown", dn); removeEventListener("pointermove", mv); removeEventListener("pointerup", up); }; }, [gl, mode]);
  useFrame((st, dt) => { const k = Math.min(1, dt * 4), t = st.clock.elapsedTime, o = g.current, mob = size.width < 700;
    if (mode === "hero") { const P = (progress?.current ?? 0) * 2; m.current = ss(P, .1, .95); ex.current = ss(P, 1.2, 1.85);
      o.rotation.y += ((-.55 * m.current + ex.current * .9) + st.pointer.x * .25 - o.rotation.y) * k; o.rotation.x += (.06 * m.current - st.pointer.y * .1 - o.rotation.x) * k; o.position.y = (mob ? .5 : 0) - .1 * m.current + ex.current * .1 + Math.sin(t * .8) * .04; return; }
    ex.current += ((explode ? 1 : 0) - ex.current) * k; const s = d.current; s.a += s.v + (s.on ? 0 : dt * .18); s.v *= .9;
    o.rotation.y = -.5 + s.a; o.rotation.x = .12 + Math.sin(t * .5) * .03; o.position.y = .2 + Math.sin(t * .8) * .03;
    if (mode === "close") { camera.position.set(-.4, -.8, 2.8); camera.lookAt(-1.25, -1.1, 0); o.rotation.y = -.9 + Math.sin(t * .2) * .25; }
  });
  return (<group ref={g}>{mode === "case" ? <Case /> : mode === "cable" ? <Cable /> : mode === "cushions" ? <Cushions /> : <Model finish={finish} m={m} ex={ex} />}</group>);
}
export default function Headphones({ mode = "view", finish = "graphite", progress, explode, z = 7.6, bg, className = "absolute inset-0" }: { mode?: Mode; finish?: Finish; progress?: MutableRefObject<number>; explode?: boolean; z?: number; bg?: string; className?: string }) {
  const el = useRef<HTMLDivElement>(null), [on, setOn] = useState(false);
  useEffect(() => { const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "10% 0px" }); io.observe(el.current!); return () => io.disconnect(); }, []);
  return (<div ref={el} className={className} style={{ cursor: mode === "hero" ? undefined : "grab", touchAction: "pan-y" }}>
    <Canvas frameloop={on ? "always" : "never"} dpr={[1, 1.75]} camera={{ position: [0, 0, z], fov: 30 }} gl={{ antialias: true, alpha: !bg, toneMapping: THREE.ACESFilmicToneMapping }}>
      {bg && <color attach="background" args={[bg]} />}<Env /><ambientLight intensity={.3} /><directionalLight position={[3, 6, 8]} intensity={1.6} /><directionalLight position={[-5, 1, -3]} intensity={.8} color="#e9ffd0" />
      <Rig mode={mode} finish={finish} progress={progress} explode={explode} /></Canvas></div>);
}
