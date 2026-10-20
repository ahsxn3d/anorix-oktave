import Checkout from "@/components/Checkout";
export const metadata = { title: "Checkout — Oktave" };
export default function Page() { return <main className="min-h-[70svh] bg-bone pb-24 pt-[clamp(110px,11vw,160px)]"><div className="wrap"><h1 className="display mb-10 text-[clamp(64px,10vw,170px)]">Checkout.</h1><Checkout /></div></main>; }
