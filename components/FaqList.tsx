"use client";
import { useState } from "react";
import { faq } from "@/lib/data";
export default function FaqList() { const [o, setO] = useState(0); return <div>{faq.map(([q, a], k) => <div key={q} className="border-b border-ink/15"><button aria-expanded={o === k} onClick={() => setO(o === k ? -1 : k)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(20px,1.8vw,26px)] font-medium">{q}<span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform ${o === k ? "rotate-45" : ""}`}>+</span></button>{o === k && <p className="pb-6 text-[16px] leading-relaxed text-ink/70">{a}</p>}</div>)}</div>; }
