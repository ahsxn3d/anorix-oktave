import { notFound } from "next/navigation";
import Product from "@/components/Product";
import { acc } from "@/lib/data";
export function generateStaticParams() { return acc.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const s = (await params).slug; return { title: `${acc.find((p) => p.slug === s)?.name ?? "Accessory"} — Oktave` }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const s = (await params).slug, p = acc.find((x) => x.slug === s); if (!p) notFound(); return <Product p={p} />; }
