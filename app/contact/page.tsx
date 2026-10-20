import { Head } from "@/components/UI";
import Contact from "@/components/Contact";
export const metadata = { title: "Contact — Oktave" };
export default function Page() { return <main><Head k="Contact" title={<>Say<br />something.</>} lead="Orders, repairs, press. We answer in plain language." /><section className="bg-bone pb-28"><div className="wrap max-w-[900px]"><Contact /></div></section></main>; }
