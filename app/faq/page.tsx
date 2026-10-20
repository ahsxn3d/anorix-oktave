import { Head } from "@/components/UI";
import FaqList from "@/components/FaqList";
export const metadata = { title: "FAQ — Oktave" };
export default function Page() { return <main><Head k="FAQ" title={<>Straight<br />answers.</>} /><section className="bg-bone pb-28"><div className="wrap max-w-[960px]"><FaqList /></div></section></main>; }
