export function Head({ k, title, lead, dark = false }: { k: string; title: React.ReactNode; lead?: string; dark?: boolean }) {
  return (<section className={`${dark ? "bg-ink text-bone" : "bg-bone text-ink"} pb-[clamp(48px,6vw,90px)] pt-[clamp(110px,12vw,170px)]`}><div className="wrap"><p className={`mono ${dark ? "text-bone/55" : "text-mute"}`}>{k}</p><h1 className="display mt-5 text-[clamp(64px,11vw,190px)]">{title}</h1>{lead && <p className={`mt-6 max-w-[52ch] text-[17px] leading-relaxed ${dark ? "text-bone/70" : "text-ink/70"}`}>{lead}</p>}</div></section>);
}
