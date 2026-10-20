"use client";
import { useEffect, useRef, useState } from "react";
const cols: [string, [string, string][]][] = [["Shop", [["All products", "/shop"], ["Bag", "/cart"], ["Checkout", "/checkout"]]], ["H1", [["Graphite", "/h1/graphite"], ["Bone", "/h1/bone"], ["Volt", "/h1/volt"]]], ["Listen", [["Sound", "/sound"], ["Compare", "/compare"]]], ["Help", [["Support", "/support"], ["FAQ", "/faq"], ["Contact", "/contact"]]], ["Oktave", [["About", "/about"], ["Home", "/"]]]];
function Scope() {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current!, g = c.getContext("2d")!; let raf = 0, vis = false, prof: number[] = [], W = 0, H = 0, mx = -1;
    const build = () => { const d = Math.min(2, devicePixelRatio); W = c.clientWidth; H = c.clientHeight; c.width = W * d; c.height = H * d; g.setTransform(d, 0, 0, d, 0, 0);
      const o = document.createElement("canvas"); o.width = Math.max(1, Math.round(W)); o.height = Math.max(1, Math.round(H)); const x = o.getContext("2d")!; const fam = getComputedStyle(document.querySelector(".display") || document.body).fontFamily;
      x.font = `800 ${H * .95}px ${fam}`; x.textBaseline = "alphabetic"; const tw = x.measureText("OKTAVE").width, s = Math.min(1, W * .98 / tw); x.font = `800 ${H * .95 * s}px ${fam}`; const w2 = x.measureText("OKTAVE").width; x.fillText("OKTAVE", (W - w2) / 2, H * .86);
      const px = x.getImageData(0, 0, o.width, o.height).data; prof = []; for (let i = 0; i < o.width; i++) { let y = H * .86; for (let j = 0; j < o.height; j++) if (px[(j * o.width + i) * 4 + 3] > 128) { y = j; break; } prof.push(y); } };
    document.fonts?.ready.then(build); build(); const ro = new ResizeObserver(build); ro.observe(c);
    const mv = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; }; c.addEventListener("pointermove", mv); c.addEventListener("pointerleave", () => (mx = -1));
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } }); io.observe(c);
    function draw(t: number) { if (!vis) return; g.clearRect(0, 0, W, H); const base = H * .86;
      for (const [col, w, off] of [["rgba(215,255,59,.25)", 5, 2], ["#d7ff3b", 1.6, 0]] as const) { g.beginPath(); g.strokeStyle = col; g.lineWidth = w;
        for (let i = 0; i < prof.length; i += 2) { const draw = (Math.sin(t * .0012) * .5 + .5) * 1.3 * prof.length; const k = i < draw ? 1 : 0; const near = mx >= 0 ? Math.exp(-((i - mx) ** 2) / 900) : 0;
          const y = base + (prof[i] - base) * k + Math.sin(i * .25 + t * .02) * (1.5 + near * 10) + off; i ? g.lineTo(i, y) : g.moveTo(i, y); } g.stroke(); }
      raf = requestAnimationFrame(draw); }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  return <canvas ref={cv} className="h-[clamp(120px,22vw,320px)] w-full" aria-label="Oktave" role="img" />;
}
export default function EqFooter() {
  const [h, setH] = useState(-1), [t, setT] = useState(0);
  useEffect(() => { const i = setInterval(() => setT((x) => x + 1), 260); return () => clearInterval(i); }, []);
  return (
    <footer className="bg-ink text-bone">
      <div className="wrap pt-[clamp(72px,9vw,130px)]"><div className="flex flex-wrap items-end justify-between gap-6"><h2 className="display text-[clamp(52px,8vw,132px)]">Turn it up.</h2><a href="/shop" className="btn bg-volt text-ink">Shop H1 →</a></div>
        <nav aria-label="Sitemap" className="mt-14 grid h-[340px] grid-cols-5 items-end gap-2 border-b border-bone/15 md:gap-4">
          {cols.map(([k, ls], i) => { const lvl = h === i ? 100 : 30 + Math.abs(Math.sin(t * .7 + i * 1.3)) * 22; return (
            <div key={k} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(-1)} onFocus={() => setH(i)} onBlur={() => setH(-1)} className="relative flex h-full flex-col justify-end">
              <div className={`flex flex-col justify-end overflow-hidden rounded-t-[14px] p-3 transition-[height,background] duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:p-4 ${h === i ? "bg-volt text-ink" : "bg-graphite"}`} style={{ height: `${lvl}%` }}>
                <ul className={`space-y-1.5 text-[12px] transition-opacity duration-300 max-md:!opacity-100 md:text-[15px] ${h === i ? "opacity-100" : "opacity-45"}`}>{ls.map(([l, href]) => <li key={href}><a href={href} className="hover:underline">{l}</a></li>)}</ul></div>
              <p className="mono mt-3 text-bone/60">{k}</p></div>); })}
        </nav>
        <div className="mt-10"><Scope /></div>
        <div className="flex flex-col justify-between gap-3 border-t border-bone/10 py-7 md:flex-row"><span className="mono text-bone/55">© 2026 Oktave. A concept by Anorix, not a real product. Demo store.</span><span className="mono text-bone/55">Designed &amp; built by Anorix</span></div></div>
    </footer>);
}
