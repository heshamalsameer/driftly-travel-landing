export const destinations = [
  { id: "alps", place: "Swiss Alps", country: "Switzerland", scene: "mountain", days: 7, price: 1490, tag: "Hiking & lakes", temp: "14°" },
  { id: "santorini", place: "Santorini", country: "Greece", scene: "sea", days: 5, price: 1190, tag: "Sunsets & sea", temp: "27°" },
  { id: "wadirum", place: "Wadi Rum", country: "Jordan", scene: "desert", days: 4, price: 690, tag: "Desert camps", temp: "31°" },
  { id: "lofoten", place: "Lofoten", country: "Norway", scene: "aurora", days: 6, price: 1690, tag: "Northern lights", temp: "-3°" },
  { id: "kyoto", place: "Kyoto", country: "Japan", scene: "forest", days: 8, price: 1890, tag: "Temples & tea", temp: "19°" },
  { id: "tokyo", place: "Tokyo", country: "Japan", scene: "city", days: 6, price: 1590, tag: "Neon nights", temp: "22°" },
];

export const moods = [
  { id: "calm", label: "Slow & calm", text: "Quiet mornings, long lunches and nowhere to be.", picks: ["santorini", "kyoto", "alps"] },
  { id: "wild", label: "Wild adventure", text: "Big trails, cold lakes and stars you can actually see.", picks: ["alps", "wadirum", "lofoten"] },
  { id: "culture", label: "Culture hit", text: "Old streets, new flavours and stories on every corner.", picks: ["kyoto", "tokyo", "wadirum"] },
  { id: "night", label: "After dark", text: "Rooftops, night markets and skies that glow.", picks: ["tokyo", "lofoten", "santorini"] },
];

export const steps = [
  { n: "01", title: "Pick your vibe", text: "Tell us how you want to feel — calm, wild, curious — and when you can go." },
  { n: "02", title: "We plan it all", text: "Flights, stays, guides and the little hidden spots, stitched into one smooth trip." },
  { n: "03", title: "Pack light", text: "Your whole itinerary lives in one place, with a local host one message away." },
  { n: "04", title: "Feel natural", text: "No queues, no stress. Just the scenery you came for." },
];

export const stories = [
  { name: "Maya & Karim", trip: "Santorini · 5 days", scene: "sea", text: "We didn’t open a single map. Every sunset spot was already waiting for us." },
  { name: "Omar R.", trip: "Wadi Rum · 4 days", scene: "desert", text: "Sleeping under that much sky changes you. Best birthday I’ve had." },
  { name: "Lea M.", trip: "Lofoten · 6 days", scene: "aurora", text: "The aurora showed up on night two and our guide had hot chocolate ready." },
  { name: "Yusuf A.", trip: "Kyoto · 8 days", scene: "forest", text: "Tea ceremony, quiet temples, zero tourist traps. Exactly what I wanted." },
];

export const plans = [
  { id: "weekend", name: "Weekend Escape", note: "2–3 nights", solo: 390, duo: 690, perks: ["Handpicked boutique stay", "Airport pickup", "One guided experience"], color: "#06b6d4" },
  { id: "explorer", name: "Explorer", note: "5–7 nights", solo: 1190, duo: 2090, perks: ["Flights + stays", "Local host on WhatsApp", "3 guided experiences", "Free date change"], color: "#ff6b4a", best: true },
  { id: "nomad", name: "Nomad", note: "10+ nights", solo: 2390, duo: 4190, perks: ["Multi-country route", "Private transfers", "Unlimited experiences", "24/7 concierge"], color: "#7079ca" },
];
