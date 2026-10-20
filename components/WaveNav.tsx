"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/commerce/cart";
const links: [string, string][] = [["Shop", "/shop"], ["H1", "/h1/graphite"], ["Sound", "/sound"], ["Compare", "/compare"], ["Support", "/support"], ["About", "/about"]];
function Listen() {
  const [on, setOn] = useState(false), ctx = useRef<AudioContext | null>(null), stop = useRef<() => void>(() => {});
  const play = () => {
    if (on) { stop.current(); return; }
    const C = ctx.current ?? new AudioContext(); ctx.current = C; const out = C.createGain(); out.gain.value = 0; const lp = C.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900; lp.connect(out); out.connect(C.destination);
    const osc = [196, 246.94, 293.66, 392].map((f, i) => { const o = C.createOscillator(); o.type = i % 2 ? "triangle" : "sine"; o.frequency.value = f; const g = C.createGain(); g.gain.value = .12; o.connect(g); g.connect(lp); o.start(); return o; });
    const t = C.currentTime; out.gain.linearRampToValueAtTime(.5, t + .6); lp.frequency.linearRampToValueAtTime(3200, t + 3);
    const end = () => { const n = C.currentTime; out.gain.cancelScheduledValues(n); out.gain.setValueAtTime(out.gain.value, n); out.gain.linearRampToValueAtTime(0, n + .5); osc.forEach((o) => o.stop(n + .55)); setOn(false); clearTimeout(tm); };
    const tm = window.setTimeout(end, 6000); stop.current = end; setOn(true);
  };
  return <button onClick={play} aria-pressed={on} aria-label={on ? "Stop the sound preview" : "Listen to a sound preview"} className="mono flex items-center gap-2 rounded-full border border-white/70 py-1.5 pl-1.5 pr-3.5"><span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black">{on ? <span className="flex gap-[3px]"><span className="h-2.5 w-[3px] bg-black" /><span className="h-2.5 w-[3px] bg-black" /></span> : <svg viewBox="0 0 10 10" className="ml-0.5 h-2.5 w-2.5"><path d="M1 0l9 5-9 5z" /></svg>}</span>{on ? "Playing" : "Listen"}</button>;
}
function Wave({ active }: { active: boolean }) {
  const p = useRef<SVGPathElement>(null);
  useEffect(() => { let raf = 0, a = 0; const f = (t: number) => { a += ((active ? 1 : .25) - a) * .08; let d = "M0 20"; for (let x = 0; x <= 600; x += 6) { const y = 20 + Math.sin(x * .045 + t * .004) * 9 * a * Math.sin((x / 600) * Math.PI) + Math.sin(x * .13 - t * .007) * 3 * a; d += ` L${x} ${y.toFixed(1)}`; } p.current?.setAttribute("d", d); raf = requestAnimationFrame(f); }; raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf); }, [active]);
  return <svg viewBox="0 0 600 40" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-1/2 h-10 w-full -translate-y-1/2" aria-hidden="true"><path ref={p} fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".55" /></svg>;
}
export default function WaveNav() {
  const [open, setOpen] = useState(false), path = usePathname(), { count } = useCart();
  useEffect(() => setOpen(false), [path]);
  return (
    <header className="fixed left-[clamp(14px,2.4vw,32px)] right-[clamp(14px,2.4vw,32px)] top-4 z-50 text-white mix-blend-difference" onMouseLeave={() => setOpen(false)}>
      <div className="flex items-center gap-4" onMouseEnter={() => matchMedia("(hover:hover)").matches && setOpen(true)}>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border-[1.5px] border-white">
          <span className="display text-[17px] tracking-normal">O</span>{count > 0 && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-white" />}</button>
        <nav aria-label="Primary" className={`relative hidden flex-1 items-center overflow-hidden transition-[max-width,opacity] duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:flex ${open ? "max-w-[1400px] opacity-100" : "pointer-events-none max-w-0 opacity-0"}`}>
          <Wave active={open} />
          <a href="/" className="display relative mr-8 text-[20px]">Oktave</a>
          <ul className="relative flex flex-1 justify-between gap-4">{links.map(([l, h], i) => <li key={h}><a href={h} style={{ transitionDelay: `${open ? i * 50 : 0}ms` }} className={`mono block px-2 py-1 transition-[transform,opacity] duration-500 hover:-translate-y-1 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} ${path.startsWith(h) ? "underline underline-offset-[6px]" : ""}`}>{l}</a></li>)}</ul>
          <a href="/cart" className="mono relative mx-6">Bag {count}</a><span className="relative"><Listen /></span>
        </nav>
      </div>
      {open && <nav aria-label="Mobile" className="mt-4 rounded-[24px] bg-black/95 p-6 md:hidden">{[...links, ["Bag (" + count + ")", "/cart"] as [string, string]].map(([l, h]) => <a key={h} href={h} className="display block border-b border-white/15 py-3 text-[40px]">{l}</a>)}<div className="mt-5"><Listen /></div></nav>}
    </header>
  );
}
