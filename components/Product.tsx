import HP from "./HP";
import AddBag from "./AddBag";
import { money } from "@/lib/commerce/money";
import type { Item } from "@/lib/data";
import { h1 } from "@/lib/data";
export default function Product({ p }: { p: Item }) {
  const bg = p.kind === "acc" ? "#e8e8e7" : p.finish === "volt" ? "#c4ea2c" : p.finish === "bone" ? "#d9d6cf" : "#e8e8e7";
  return (<main className="bg-bone"><section className="wrap grid gap-8 pb-20 pt-24 lg:grid-cols-12 lg:items-center">
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden rounded-[32px] lg:col-span-7 lg:h-[80vh]" style={{ background: bg }}><HP finish={p.finish} mode={p.mode} z={p.kind === "acc" ? (p.mode === "case" ? 5.2 : 4.4) : 7} toggle={p.kind === "h1"} /><span className="mono absolute right-5 top-5 rounded-full bg-chalk/90 px-3 py-2">Live 3D · drag</span></div>
    <div className="lg:col-span-5"><p className="mono text-mute">{p.kind === "h1" ? "Oktave H1 · Drop 01" : "Accessory"}</p><h1 className="display mt-4 text-[clamp(56px,7vw,116px)]">{p.name}</h1><p className="mt-5 text-[17px] leading-relaxed text-ink/70">{p.body}</p>
      {p.kind === "h1" && <div className="mt-6 flex gap-2">{h1.map((x) => <a key={x.slug} href={`/h1/${x.slug}`} aria-label={x.name} aria-current={x.slug === p.slug ? "true" : undefined} className={`h-9 w-9 rounded-full border-2 ${x.slug === p.slug ? "border-ink" : "border-transparent"}`} style={{ background: x.finish === "volt" ? "#d7ff3b" : x.finish === "bone" ? "#e6e2da" : "#2b2b2d", boxShadow: "inset 0 0 0 3px #efefec" }} />)}</div>}
      <p className="display mt-8 text-[56px]">{money(p.price)}</p><p className="mono text-mute">{p.kind === "h1" ? "Charged when it ships · March 2027" : "Ships with your pair"}</p>
      <div className="mt-6 flex flex-wrap gap-3"><AddBag slug={p.slug} /><a href={p.kind === "h1" ? "/compare" : "/shop"} className="btn border border-ink/20">{p.kind === "h1" ? "Compare" : "Back to shop"}</a></div>
      <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">{p.specs.map(([a, b]) => <div key={a} className="flex justify-between py-3.5"><dt className="mono text-mute">{a}</dt><dd className="text-[15px]">{b}</dd></div>)}</dl></div></section></main>);
}
