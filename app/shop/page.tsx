import { Head } from "@/components/UI";
import HP from "@/components/HP";
import { h1, acc } from "@/lib/data";
import { money } from "@/lib/commerce/money";
export const metadata = { title: "Shop — Oktave" };
const bg = { graphite: "#e8e8e7", bone: "#d9d6cf", volt: "#c4ea2c" } as const;
export default function Page() {
  return (<main><Head k="Shop · Drop 01" title={<>Shop.</>} lead="Three finishes of H1 and the parts that keep them going. H1 ships from March 2027; accessories ship with your pair." />
    <section className="bg-bone pb-[clamp(80px,10vw,140px)]"><div className="wrap grid gap-4 md:grid-cols-3">{h1.map((p) => <a key={p.slug} href={`/h1/${p.slug}`} className="group overflow-hidden rounded-[28px] bg-chalk">
      <div className="relative aspect-square" style={{ background: bg[p.finish] }}><HP finish={p.finish} z={7.4} /></div>
      <div className="flex items-end justify-between p-6"><div><p className="display text-[36px]">{p.name}</p><p className="mt-1 text-[14px] text-mute">{p.line}</p></div><p className="display text-[30px]">{money(p.price)}</p></div></a>)}</div>
      <div className="wrap mt-16"><p className="mono mb-6 text-mute">Accessories</p><div className="grid gap-4 md:grid-cols-3">{acc.map((p) => <a key={p.slug} href={`/accessories/${p.slug}`} className="overflow-hidden rounded-[28px] bg-chalk"><div className="relative aspect-[4/3] bg-[#e8e8e7]"><HP mode={p.mode} z={p.mode === "case" ? 5.2 : 4.4} /></div><div className="flex items-end justify-between p-6"><div><p className="display text-[30px]">{p.name}</p><p className="mt-1 text-[14px] text-mute">{p.line}</p></div><p className="display text-[26px]">{money(p.price)}</p></div></a>)}</div></div></section></main>);
}
