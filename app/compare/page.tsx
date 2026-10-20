import { Head } from "@/components/UI";
import HP from "@/components/HP";
import AddBag from "@/components/AddBag";
import { h1 } from "@/lib/data";
import { money } from "@/lib/commerce/money";
export const metadata = { title: "Compare — Oktave" };
const rows: [string, string[]][] = [["Shell", ["Graphite", "Bone", "Volt"]], ["Ring", ["Volt", "Black", "Graphite"]], ["Cushions", ["Black", "Stone", "Black"]], ["Weight", ["248 g", "248 g", "250 g"]], ["Run", ["Ongoing", "Ongoing", "500 pairs, Drop 01 only"]], ["Sound", ["Identical", "Identical", "Identical"]]];
export default function Page() { return (<main><Head k="Compare" title={<>Same sound.<br />Three moods.</>} lead="Every H1 has the same drivers, battery and mics. Only the finish changes." />
  <section className="bg-bone pb-[clamp(80px,10vw,140px)]"><div className="wrap"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="hidden lg:block" />{h1.map((p) => <div key={p.slug} className="overflow-hidden rounded-[24px] bg-chalk"><div className="relative aspect-square"><HP finish={p.finish} z={7.6} /></div><div className="p-5"><p className="display text-[28px]">{p.name}</p><p className="display mt-1 text-[22px] text-mute">{money(p.price)}</p><AddBag slug={p.slug} className="btn mt-4 w-full justify-center bg-ink text-bone" /></div></div>)}
    {rows.map(([k, v]) => <div key={k} className="contents"><p className="mono border-t border-ink/10 py-4 text-mute">{k}</p>{v.map((x, i) => <p key={i} className="border-t border-ink/10 py-4 text-[15px]">{x}</p>)}</div>)}</div></div></section></main>); }
