import { notFound } from "next/navigation";
import Product from "@/components/Product";
import { h1 } from "@/lib/data";
export function generateStaticParams() { return h1.map((p) => ({ colour: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ colour: string }> }) { const s = (await params).colour; return { title: `${h1.find((p) => p.slug === s)?.name ?? "H1"} — Oktave` }; }
export default async function Page({ params }: { params: Promise<{ colour: string }> }) { const s = (await params).colour, p = h1.find((x) => x.slug === s); if (!p) notFound(); return <Product p={p} />; }
