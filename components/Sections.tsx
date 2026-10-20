"use client";
import dynamic from "next/dynamic";
const Headphones = dynamic(() => import("./Headphones"), { ssr: false });
import { useEffect, useRef, useState } from "react";
import { Arrow, Marquee } from "./kit/ui";

const colors = [["Graphite", "graphite", "#2b2b2d"], ["Bone", "bone", "#e6e2da"], ["Volt", "volt", "#d7ff3b"]] as const;
export function Colorways() {
  const [i, setI] = useState(0);
  return (
    <section id="colors" className="bg-chalk py-[clamp(88px,10vw,150px)]">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(52px,8vw,132px)]" data-reveal="lines">Three<br />finishes.</h2>
          <div role="tablist" aria-label="Finish" className="flex gap-2">
            {colors.map(([n, , c], k) => <button key={n} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={`mono flex items-center gap-2 rounded-full border px-4 py-2.5 transition-colors ${i === k ? "border-ink bg-ink text-bone" : "border-ink/20"}`}><span className="h-3 w-3 rounded-full border border-ink/20" style={{ background: c }} />{n}</button>)}
          </div>
        </div>
        <div data-clip className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[28px] md:aspect-[16/9]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#ffffff,#e8e8e7_70%)]"><Headphones finish={colors[i][1]} z={7} /></div>
          <span className="mono absolute bottom-5 left-5 rounded-full bg-chalk/90 px-3 py-2">{colors[i][0]} · €{i === 2 ? 369 : 349} · drag to turn</span>
          <a href={`/h1/${colors[i][1]}`} className="btn absolute bottom-5 right-5 bg-ink text-bone">Shop {colors[i][0]} <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function Wave() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const g = c.getContext("2d")!; let raf = 0, vis = false;
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } });
    io.observe(c);
    const size = () => { const r = c.getBoundingClientRect(); c.width = r.width * Math.min(2, devicePixelRatio); c.height = r.height * Math.min(2, devicePixelRatio); };
    size(); const ro = new ResizeObserver(size); ro.observe(c);
    function draw(t: number) {
      const w = c.width, h = c.height, n = 96, bw = w / n; g.clearRect(0, 0, w, h);
      for (let k = 0; k < n; k++) {
        const x = k / n, env = Math.sin(x * Math.PI);
        const v = env * (0.35 + 0.65 * Math.abs(Math.sin(t * 0.0016 + k * 0.33) * Math.cos(t * 0.0009 + k * 0.11)));
        const bh = Math.max(2, v * h * 0.9);
        g.fillStyle = k % 9 === 0 ? "#d7ff3b" : "rgba(239,239,236,.85)";
        g.fillRect(k * bw + bw * 0.25, (h - bh) / 2, bw * 0.5, bh);
      }
      if (vis) raf = requestAnimationFrame(draw);
    }
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="h-[220px] w-full md:h-[300px]" aria-hidden="true" />;
}

export function Sound() {
  return (
    <section id="sound" className="bg-ink py-[clamp(88px,10vw,150px)] text-bone">
      <div className="wrap">
        <p className="mono text-bone/60">02 / Sound</p>
        <h2 className="display mt-5 max-w-[12ch] text-[clamp(52px,8vw,132px)]" data-reveal="lines">Quiet, then everything.</h2>
        <div className="mt-12 rounded-[28px] border border-bone/10 bg-graphite/60 p-6 md:p-10" data-fade>
          <div className="mono flex justify-between text-bone/60"><span>Live · adaptive ANC</span><span className="text-volt">−42 dB</span></div>
          <Wave />
          <div className="grid grid-cols-2 gap-6 border-t border-bone/10 pt-6 md:grid-cols-4">
            {[["4–40k", "Hz response"], ["−42", "dB noise cut"], ["6", "beamforming mics"], ["LDAC", "hi-res wireless"]].map(([a, b]) => <div key={b}><p className="display text-[clamp(32px,3.6vw,56px)]">{a}</p><p className="mono mt-1 text-bone/60">{b}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Detail() {
  return (
    <section className="relative bg-ink text-bone">
      <div data-clip className="relative h-[100svh] min-h-[560px] overflow-hidden">
        <div className="absolute inset-0 bg-[#141415]"><Headphones mode="close" finish="graphite" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/10 to-transparent" />
        <div className="wrap absolute inset-0 flex flex-col justify-end pb-16">
          <p className="mono text-volt">03 / Material</p>
          <h2 className="display mt-4 max-w-[10ch] text-[clamp(52px,8vw,132px)]" data-reveal="lines">Machined. Then softened.</h2>
          <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-bone/75" data-fade>Bead-blasted aluminium yokes, protein-leather cushions over slow memory foam, and one volt ring so you can find them in a dark bag.</p>
        </div>
      </div>
      <Marquee className="mono border-y border-bone/10 py-4 text-bone/70" items={["Aluminium", "Memory foam", "Graphene", "Bluetooth 6.0", "USB-C", "Repairable", "Swappable pads"]} sep="/" />
    </section>
  );
}


const faqs = [
  ["What does reserving cost?", "Nothing today. When your slot opens you get 72 hours to pay a €49 deposit, fully refundable until the pair ships."],
  ["When does Drop 01 ship?", "From March 2027, in reservation order. Your confirmation email shows your number in the queue."],
  ["What is in the box?", "Oktave H1, a felt travel case, a USB-C to USB-C cable, a 3.5 mm cable and a spare set of cushions."],
  ["Can I repair them?", "Yes. Cushions, headband pad and battery are held by screws, not glue. Parts are sold at cost for five years."],
];
export function Faq() {
  const [o, setO] = useState(0);
  return (
    <section className="bg-chalk py-[clamp(88px,10vw,150px)] text-ink">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4"><p className="mono text-mute">04 / Before you reserve</p><h2 className="display mt-5 text-[clamp(44px,5.4vw,88px)]" data-reveal="lines">Straight answers.</h2></div>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map(([q, a], k) => (
            <div key={q} className="border-b border-ink/15">
              <button aria-expanded={o === k} onClick={() => setO(o === k ? -1 : k)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(20px,1.8vw,26px)] font-medium">
                {q}<span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform duration-500 ${o === k ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${o === k ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><p className="overflow-hidden text-[16px] leading-relaxed text-ink/70"><span className="block max-w-[60ch] pb-6">{a}</span></p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, target - (now ?? target));
  return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60].map((v) => String(v).padStart(2, "0"));
}

export function Reserve() {
  const t = useCountdown(Date.UTC(2026, 11, 1, 12));
  return (
    <section id="reserve" className="bg-volt py-[clamp(88px,10vw,150px)] text-ink">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mono">Drop 01 · 2,000 units</p>
          <h2 className="display mt-5 text-[clamp(60px,10vw,170px)]" data-reveal="chars">Pre-order.</h2>
          <div className="mt-10 grid max-w-[560px] grid-cols-4 gap-2 sm:gap-3">
            {["Days", "Hours", "Min", "Sec"].map((l, k) => <div key={l} className="min-w-0 rounded-[18px] bg-ink p-3 text-volt sm:p-4"><p className="display text-[clamp(28px,4vw,60px)] tabular-nums">{t[k]}</p><p className="mono mt-1 text-bone/70">{l}</p></div>)}
          </div>
        </div>
        <div className="relative lg:col-span-5">
          <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-[24px] bg-[#c4ea2c]"><Headphones finish="volt" z={7.2} /></div>
          <div className="rounded-[24px] bg-chalk p-6"><p className="mono text-mute">Drop 01 · 2,000 pairs</p><p className="mt-3 text-[16px] leading-relaxed">Pre-order today; your card is charged when your pair ships, in order of purchase.</p><div className="mt-5 flex flex-wrap gap-2"><a href="/shop" className="btn bg-ink text-bone">Pre-order <Arrow /></a><a href="/compare" className="btn border border-ink/20">Compare finishes</a></div></div>
        </div>
      </div>
    </section>
  );
}

