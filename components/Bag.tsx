"use client";
import { useCart } from "@/lib/commerce/cart";
import { money } from "@/lib/commerce/money";
export default function Bag() {
  const { lines, setQty, total, ready } = useCart(); if (!ready) return <div className="h-40" />;
  if (!lines.length) return <div className="rounded-[24px] bg-chalk p-10"><p className="display text-[48px]">Silence.</p><p className="mt-2 text-mute">Your bag is empty.</p><a href="/shop" className="btn mt-6 bg-ink text-bone">Shop</a></div>;
  return (<div className="grid gap-6 lg:grid-cols-12"><ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">{lines.map((l) => <li key={l.id} className="flex items-center gap-4 py-6"><span className="display flex-1 text-[30px]">{l.name}</span>
    <span className="flex items-center rounded-full border border-ink/15"><button aria-label="Less" onClick={() => setQty(l.id, l.opt, l.qty - 1)} className="px-3.5 py-2">−</button><span className="mono w-6 text-center">{l.qty}</span><button aria-label="More" onClick={() => setQty(l.id, l.opt, l.qty + 1)} className="px-3.5 py-2">+</button></span><span className="w-24 text-right font-semibold">{money(l.price * l.qty)}</span></li>)}</ul>
    <aside className="h-fit rounded-[24px] bg-ink p-7 text-bone lg:col-span-4"><p className="mono text-bone/55">Summary</p><div className="mt-5 flex justify-between"><span>Subtotal</span><b>{money(total)}</b></div><div className="mt-2 flex justify-between text-bone/60"><span>Shipping</span><span>Free</span></div><a href="/checkout" className="btn mt-6 w-full justify-center bg-volt text-ink">Checkout</a><p className="mt-3 text-[12px] text-bone/50">Demo store · charged when it ships (not really)</p></aside></div>);
}
