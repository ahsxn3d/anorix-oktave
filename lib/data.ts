import type { Finish, Mode } from "@/components/Headphones";
export type Item = { slug: string; name: string; price: number; kind: "h1" | "acc"; finish: Finish; mode: Mode; line: string; body: string; specs: [string, string][] };
export const h1: Item[] = [
  { slug: "graphite", name: "H1 Graphite", price: 349, kind: "h1", finish: "graphite", mode: "view", line: "Bead-blasted graphite, one volt ring.", body: "The quiet one. Dark anodised yokes, graphite shell and a single volt ring on each cup so you can find them in the bottom of a bag.", specs: [["Finish", "Graphite / volt ring"], ["Cushions", "Protein leather, black"], ["Weight", "248 g"]] },
  { slug: "bone", name: "H1 Bone", price: 349, kind: "h1", finish: "bone", mode: "view", line: "Warm bone, black detailing.", body: "A soft off-white shell with black rings and warm grey cushions. Shows less dust than white, more character than black.", specs: [["Finish", "Bone / black ring"], ["Cushions", "Protein leather, stone"], ["Weight", "248 g"]] },
  { slug: "volt", name: "H1 Volt", price: 369, kind: "h1", finish: "volt", mode: "view", line: "The loud colourway. Limited to Drop 01.", body: "Volt-yellow shells with graphite band and cushions. Made in one run of 500 pairs for Drop 01, then retired.", specs: [["Finish", "Volt / graphite"], ["Cushions", "Protein leather, black"], ["Weight", "250 g"]] },
];
export const acc: Item[] = [
  { slug: "ear-cushions", name: "Ear cushions", price: 39, kind: "acc", finish: "graphite", mode: "cushions", line: "A fresh pair, held by magnets.", body: "Protein leather over slow memory foam. They click on with magnets and a locating pin, so a swap takes ten seconds.", specs: [["Material", "Protein leather, memory foam"], ["Fit", "All H1 finishes"], ["Colours", "Black, stone"]] },
  { slug: "travel-case", name: "Travel case", price: 49, kind: "acc", finish: "graphite", mode: "case", line: "Felt outside, moulded inside.", body: "A recycled-felt shell over a moulded tray that holds the H1 folded flat, plus a pocket for cables.", specs: [["Material", "Recycled PET felt"], ["Size", "21 × 18 × 6 cm"], ["Closure", "Wrap-around zip"]] },
  { slug: "braided-cable", name: "Braided cable", price: 25, kind: "acc", finish: "graphite", mode: "cable", line: "USB-C to 3.5 mm, 1.5 m, braided.", body: "For wired listening on planes and old amps. Braided jacket, aluminium plugs, and a DAC built into the C end.", specs: [["Length", "1.5 m"], ["Ends", "USB-C / 3.5 mm"], ["DAC", "24-bit / 96 kHz"]] },
];
export const all = [...h1, ...acc];
export const get = (s: string) => all.find((x) => x.slug === s);
export const sound: [string, string, string][] = [["Driver", "40 mm graphene", "Stiff, light diaphragm for low distortion at volume."], ["Response", "4 Hz – 40 kHz", "Wider than you can hear, so nothing rolls off early."], ["Noise cut", "−42 dB adaptive", "Six mics measure the room 50,000 times a second."], ["Codecs", "LDAC, AAC, SBC", "Hi-res wireless on phones that support it."], ["Battery", "62 h (ANC on)", "Ten minutes on USB-C gives five hours."], ["Weight", "248 g", "Aluminium yokes, no steel band."]];
export const faq: [string, string][] = [
  ["When does Drop 01 ship?", "From March 2027, in order of purchase. Your confirmation shows your place in the queue."],
  ["What is in the box?", "Oktave H1, a felt travel case, a USB-C to USB-C cable, a 3.5 mm cable and a spare set of cushions."],
  ["Can I repair them?", "Yes. Cushions, headband pad and battery are held by screws and magnets, not glue. Parts are sold at cost for five years."],
  ["Do they work with my phone?", "Any Bluetooth phone. LDAC needs an Android phone that supports it; iPhones use AAC."],
  ["What is the warranty?", "Two years, and the battery is covered for 80% capacity for the same period."],
  ["Can I return them?", "Thirty days from delivery, in any condition that isn't damaged. We pay return shipping."],
];
