"use client";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart";
import { get } from "@/lib/data";
export default function AddBag({ slug, className = "btn bg-ink text-bone" }: { slug: string; className?: string }) {
  const { add } = useCart(), [ok, setOk] = useState(false), p = get(slug)!;
  return <button onClick={() => { add({ id: p.slug, name: p.name, price: p.price }); setOk(true); setTimeout(() => setOk(false), 1500); }} className={className}>{ok ? "In your bag ✓" : p.kind === "h1" ? "Pre-order" : "Add to bag"}</button>;
}
