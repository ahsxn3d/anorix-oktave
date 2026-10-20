"use client";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart";
import { money } from "@/lib/commerce/money";
export default function Checkout() {
  const { lines, total, clear, ready } = useCart(), [busy, setBusy] = useState(false);
  const f = "w-full rounded-full border border-ink/15 bg-white/60 px-5 py-3.5 text-[15px] outline-none focus:border-ink";
  if (ready && !lines.length) return <p>Your bag is empty. <a className="underline" href="/shop">Shop</a></p>;
  return (<form className="grid gap-8 lg:grid-cols-12" onSubmit={(e) => { e.preventDefault(); setBusy(true); setTimeout(() => { clear(); location.href = "/checkout/done"; }, 900); }}>
    <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7"><p className="mono text-mute sm:col-span-2">01 / Shipping</p><input required placeholder="Full name" autoComplete="name" className={`${f} sm:col-span-2`} /><input required type="email" placeholder="Email" autoComplete="email" className={f} /><input required placeholder="Phone" autoComplete="tel" className={f} /><input required placeholder="Address" autoComplete="street-address" className={`${f} sm:col-span-2`} /><input required placeholder="City" className={f} /><input required placeholder="Postcode" className={f} />
      <p className="mono mt-4 text-mute sm:col-span-2">02 / Payment (demo)</p><input required inputMode="numeric" placeholder="4242 4242 4242 4242" className={`${f} sm:col-span-2`} /><input required placeholder="MM / YY" className={f} /><input required placeholder="CVC" className={f} /></div>
    <aside className="h-fit rounded-[24px] bg-ink p-7 text-bone lg:col-span-5"><p className="mono text-bone/55">Order</p><ul className="mt-4 space-y-2">{lines.map((l) => <li key={l.id} className="flex justify-between"><span>{l.name} × {l.qty}</span><span>{money(l.price * l.qty)}</span></li>)}</ul><div className="mt-5 flex justify-between border-t border-bone/15 pt-4 text-[18px] font-semibold"><span>Total</span><span>{money(total)}</span></div>
      <button disabled={busy} className="btn mt-6 w-full justify-center bg-volt text-ink disabled:opacity-60">{busy ? "Placing…" : "Place demo pre-order"}</button><p className="mt-3 text-[12px] text-bone/50">Demo checkout · no card is charged</p></aside></form>);
}
