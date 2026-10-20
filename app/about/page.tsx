import { Head } from "@/components/UI";
import HP from "@/components/HP";
export const metadata = { title: "About — Oktave" };
export default function Page() { return (<main><Head k="About" title={<>One line.<br />Nothing extra.</>} lead="Oktave is a concept headphone brand by Anorix. H1 started as a single drawn line, the mark, and became a band with two cups. We stopped when there was nothing left to remove." />
  <section className="bg-bone pb-[clamp(80px,10vw,140px)]"><div className="wrap grid gap-6 lg:grid-cols-12"><div className="relative h-[520px] overflow-hidden rounded-[28px] bg-chalk lg:col-span-6"><HP finish="bone" z={7.4} toggle /></div>
    <div className="space-y-4 lg:col-span-6">{[["Repairable by default", "Screws and magnets, not glue. Parts at cost for five years."], ["Made in small drops", "We build in runs we can sell, not warehouses we have to clear."], ["Honest specs", "We publish what we measure. No made-up reviews, no borrowed quotes."]].map(([h, p]) => <div key={h} className="rounded-[24px] bg-chalk p-7"><p className="display text-[34px]">{h}</p><p className="mt-2 text-[16px] text-ink/70">{p}</p></div>)}</div></div></section></main>); }
