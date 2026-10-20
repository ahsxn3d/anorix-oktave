"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Finish, Mode } from "./Headphones";
const Headphones = dynamic(() => import("./Headphones"), { ssr: false });
export default function HP({ finish = "graphite", mode = "view", z, bg, toggle = false }: { finish?: Finish; mode?: Mode; z?: number; bg?: string; toggle?: boolean }) {
  const [ex, setEx] = useState(false);
  return (<><Headphones finish={finish} mode={mode} z={z} bg={bg} explode={ex} />{toggle && <div className="absolute bottom-5 left-5 flex gap-1 rounded-full bg-chalk/90 p-1">{["Assembled", "Exploded"].map((l, i) => <button key={l} onClick={() => setEx(i === 1)} className={`mono rounded-full px-3 py-2 ${ex === (i === 1) ? "bg-ink text-bone" : ""}`}>{l}</button>)}</div>}</>);
}
