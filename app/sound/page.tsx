import { Head } from "@/components/UI";
import HP from "@/components/HP";
import { sound } from "@/lib/data";
export const metadata = { title: "Sound — Oktave" };
export default function Page() { return (<main><Head k="Sound · spec sheet" title={<>Quiet,<br />then <span className="text-volt">everything.</span></>} lead="What is inside H1 and why it is there. Toggle the exploded view to see how it comes apart." dark />
  <section className="bg-ink pb-[clamp(80px,10vw,140px)] text-bone"><div className="wrap grid gap-6 lg:grid-cols-12"><div className="relative h-[560px] overflow-hidden rounded-[28px] bg-[#1a1a1b] lg:col-span-7"><HP finish="graphite" z={7.4} bg="#1a1a1b" toggle /></div>
    <dl className="grid gap-px overflow-hidden rounded-[28px] bg-bone/10 sm:grid-cols-2 lg:col-span-5">{sound.map(([k, v, d]) => <div key={k} className="bg-ink p-6"><dt className="mono text-bone/55">{k}</dt><dd className="display mt-3 text-[34px]">{v}</dd><p className="mt-2 text-[14px] text-bone/65">{d}</p></div>)}</dl></div></section></main>); }
