"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lazy3D from "./kit/Lazy3D";
const MorphScene = dynamic(() => import("./MorphScene"), { ssr: false });

const notes = [["40 mm", "graphene driver"], ["62 h", "battery, ANC on"], ["248 g", "all-in weight"]];

export default function Reveal() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [ch, setCh] = useState(0);
  useEffect(() => {
    const bar = root.current!.querySelector<HTMLElement>(".r-bar");
    const st = ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: (s) => {
      progress.current = s.progress; const c = s.progress < 0.22 ? 0 : s.progress < 0.6 ? 1 : 2; setCh((p) => (p === c ? p : c));
      if (bar) bar.style.transform = `scaleX(${s.progress})`;
    } });
    return () => st.kill();
  }, []);
  const vis = (i: number) => `transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${ch === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`;
  return (
    <section ref={root} className="relative h-[300vh] bg-bone">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#f9f9f7_0%,#efefec_60%)]" />
        <Lazy3D poster="/img/okt-mark.webp" priority eager render={({ onReady, running }) => <MorphScene progress={progress} running={running} onReady={onReady} />} />
        <div className="wrap pointer-events-none relative flex h-full flex-col justify-between pb-8 pt-24">
          <div className="flex justify-between"><span className="mono text-mute">Prelaunch · Drop 01</span><span className="mono hidden text-mute md:block">Scroll</span></div>
          <div className="relative min-h-[200px]">
            <div className={`absolute inset-x-0 bottom-0 ${vis(0)}`}>
              <h1 className="display text-center text-[clamp(72px,17vw,280px)]"><span className="kit-mask"><span className="kit-line">Oktave</span></span></h1>
            </div>
            <div className={`absolute bottom-0 left-0 max-w-[520px] ${vis(1)}`}>
              <p className="mono text-mute">01 / The line becomes</p>
              <h2 className="display mt-3 text-[clamp(52px,7vw,112px)]">H1.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink/70">One continuous band, two cups, nothing extra. We started with the mark and stopped when there was nothing left to remove.</p>
            </div>
            <div className={`absolute inset-x-0 bottom-0 grid grid-cols-3 gap-4 ${vis(2)}`}>
              {notes.map(([a, b]) => <div key={a} className="border-t border-ink/20 pt-4"><p className="display text-[clamp(36px,5vw,76px)]">{a}</p><p className="mono mt-2 text-mute">{b}</p></div>)}
            </div>
          </div>
          <div className="h-px w-full bg-ink/15"><div className="r-bar h-px origin-left scale-x-0 bg-ink" /></div>
        </div>
      </div>
    </section>
  );
}
