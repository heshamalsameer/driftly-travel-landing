import React, { useEffect, useState } from "react";
import { FiArrowRight, FiCheck, FiInstagram, FiYoutube, FiTwitter, FiRefreshCw } from "react-icons/fi";
import { Scene } from "./Scene";
import { plans, stories } from "./data";
import { Reveal } from "./Reveal";
import { Logo } from "./Logo";

/* ---------- polaroid stack ---------- */
export const Stories = () => {
  const [order, setOrder] = useState(stories.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  const next = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(false);
    }, 450);
  };
  const top = stories[order[0]];

  return (
    <section className="overflow-hidden bg-paper px-5 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal><p className="font-mono text-xs uppercase tracking-[0.3em] text-coral">Postcards from travellers</p></Reveal>
          <Reveal delay={0.05}><h2 className="mt-3 font-display text-5xl font-extrabold leading-[0.92] text-ink sm:text-6xl">They went. <br />They <span className="font-hand font-normal text-sea-deep">wrote back.</span></h2></Reveal>
          <Reveal delay={0.1}>
            <blockquote key={top.name} className="quote-in mt-8 max-w-lg border-l-4 border-coral pl-6 text-2xl leading-snug text-ink/80">“{top.text}”</blockquote>
            <p key={`${top.name}-n`} className="quote-in mt-4 pl-7 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">{top.name} — {top.trip}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <button onClick={next} className="btn-pill mt-10 bg-ink text-paper hover:bg-coral"><FiRefreshCw /> Next postcard</button>
          </Reveal>
        </div>

        <div className="relative mx-auto h-[460px] w-full max-w-[380px]">
          {order.map((idx, pos) => {
            const s = stories[idx];
            const isTop = pos === 0;
            return (
              <button
                key={s.name}
                onClick={isTop ? next : undefined}
                aria-label={isTop ? "Show next postcard" : undefined}
                tabIndex={isTop ? 0 : -1}
                className={`polaroid absolute inset-x-0 mx-auto w-[320px] bg-white p-4 pb-6 text-left shadow-[0_30px_60px_-30px_rgba(11,29,42,.6)] ${isTop && leaving ? "is-leaving" : ""}`}
                style={{ zIndex: 10 - pos, transform: `translateY(${pos * 10}px) rotate(${[-3, 4, -7, 6][pos]}deg) scale(${1 - pos * 0.04})`, cursor: isTop ? "pointer" : "default" }}
              >
                <div className="aspect-square overflow-hidden"><Scene type={s.scene} className="h-full w-full" animate={isTop} /></div>
                <p className="mt-4 font-hand text-3xl leading-none text-ink">{s.trip}</p>
                <p className="font-hand text-xl text-ink/60">— {s.name}</p>
              </button>
            );
          })}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">Tap the photo</span>
        </div>
      </div>
    </section>
  );
};

/* ---------- luggage-tag pricing ---------- */
export const Pricing = () => {
  const [duo, setDuo] = useState(false);
  return (
    <section id="pricing" className="bg-sand px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><p className="font-mono text-xs uppercase tracking-[0.3em] text-coral">Pricing</p></Reveal>
            <Reveal delay={0.05}><h2 className="mt-3 font-display text-5xl font-extrabold leading-[0.92] text-ink sm:text-6xl">Pick your <span className="outline-text-dark">tag</span>.</h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex rounded-full border border-ink/15 bg-paper p-1 font-semibold" role="group" aria-label="Travellers">
              {["Solo", "Duo"].map((l) => {
                const on = (l === "Duo") === duo;
                return <button key={l} onClick={() => setDuo(l === "Duo")} className={`rounded-full px-6 py-2.5 text-sm transition-all ${on ? "bg-ink text-paper" : "text-ink/60"}`}>{l}{l === "Duo" && <span className="ml-2 rounded-full bg-coral px-2 py-0.5 text-[10px] text-white">−12%</span>}</button>;
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <article className="tag-card group relative" style={{ "--c": p.color, "--sway": `${[-2, 1.5, -1][i]}deg` }}>
                <span className="tag-string" aria-hidden />
                <div className="tag-body relative rounded-[26px] bg-paper p-8 pt-14 shadow-[0_30px_70px_-40px_rgba(11,29,42,.5)]">
                  <span className="tag-hole" aria-hidden />
                  {p.best && <span className="absolute right-6 top-6 rotate-6 rounded-full bg-coral px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">Most loved</span>}
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: p.color }}>{p.note}</p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold text-ink">{p.name}</h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span key={duo ? "d" : "s"} className="price-flip font-display text-6xl font-extrabold text-ink">${(duo ? p.duo : p.solo).toLocaleString()}</span>
                    <span className="text-ink/50">/ {duo ? "two" : "person"}</span>
                  </div>
                  <ul className="mt-6 space-y-3 border-t border-dashed border-ink/15 pt-6">
                    {p.perks.map((k) => (
                      <li key={k} className="flex items-center gap-3 text-ink/75"><span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: p.color }}><FiCheck size={14} /></span>{k}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn-pill mt-8 w-full justify-center text-white transition-transform hover:-translate-y-0.5" style={{ background: p.best ? "#ff6b4a" : "#0b1d2a" }}>Choose {p.name} <FiArrowRight /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- postcard newsletter ---------- */
export const Postcard = ({ notify }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("That email doesn’t look right");
    setError("");
    setSent(true);
    notify("Postcard sent! Check your inbox for trip ideas ✈");
    return undefined;
  };

  return (
    <section id="contact" className="bg-ink px-5 py-28">
      <Reveal className="mx-auto max-w-5xl">
        <div className="postcard relative grid overflow-hidden rounded-[10px] bg-paper p-6 shadow-2xl sm:p-10 md:grid-cols-2 md:gap-10">
          <div className="md:border-r md:border-dashed md:border-ink/25 md:pr-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/40">Greetings from driftly</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-none text-ink sm:text-5xl">Wish you<br />were here<span className="text-coral">.</span></h2>
            <p className="mt-6 font-hand text-2xl leading-snug text-ink/70">
              Dear traveller — every month we send one short letter with a hidden place, a cheap flight and a reason to go. That’s it. No spam, just postcards.
            </p>
            <p className="mt-4 font-hand text-2xl text-ink/70">— the driftly crew</p>
          </div>
          <div className="relative mt-10 md:mt-0">
            <div className="stamp absolute right-0 top-0 w-24 rotate-3 bg-white p-1.5 shadow-md">
              <div className="aspect-[4/5] overflow-hidden"><Scene type="sea" className="h-full w-full" animate={false} /></div>
              <span className="mt-1 block text-center font-mono text-[9px] uppercase tracking-widest text-ink/60">Air mail</span>
            </div>
            <svg viewBox="0 0 120 120" className="postmark absolute right-16 top-16 h-28 w-28 text-coral/70" aria-hidden>
              <defs><path id="pm" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
              <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text fontSize="10" fontFamily="DM Mono, monospace" letterSpacing="3" fill="currentColor"><textPath href="#pm">TRAVEL NOW · FEEL NATURAL ·</textPath></text>
              <text x="60" y="64" textAnchor="middle" fontSize="11" fontFamily="DM Mono, monospace" fill="currentColor">2026</text>
            </svg>

            {sent ? (
              <div className="flex h-full flex-col justify-end pt-40">
                <p className="font-display text-3xl font-extrabold text-ink">On its way! ✉</p>
                <p className="mt-2 text-ink/60">Your first postcard lands at <strong className="text-ink">{email}</strong> soon.</p>
                <button onClick={() => { setSent(false); setEmail(""); }} className="mt-5 w-fit font-mono text-xs uppercase tracking-widest text-coral underline">Send to another address</button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex h-full flex-col justify-end gap-6 pt-40" noValidate>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/40">To</span>
                  <input value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} type="email" placeholder="your@email.com" aria-label="Email address" className="mt-1 w-full border-b-2 border-ink/20 bg-transparent pb-2 font-hand text-3xl text-ink outline-none transition-colors placeholder:text-ink/25 focus:border-coral" />
                  {error && <span className="mt-1 block text-sm text-coral">{error}</span>}
                </label>
                <div className="space-y-3" aria-hidden>
                  <div className="h-px bg-ink/20" /><div className="h-px bg-ink/20" />
                </div>
                <button className="btn-pill w-fit bg-coral text-white hover:bg-ink">Send me postcards <FiArrowRight /></button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

/* ---------- footer with world clocks ---------- */
const zones = [["Kuwait", "Asia/Kuwait"], ["Santorini", "Europe/Athens"], ["Kyoto", "Asia/Tokyo"], ["Lofoten", "Europe/Oslo"]];

export const Footer = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <footer className="overflow-hidden bg-ink pb-8 text-paper">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-paper/10 bg-paper/10 sm:grid-cols-4">
          {zones.map(([city, tz]) => (
            <div key={city} className="bg-ink p-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">{city}</span>
              <div className="mt-1 font-display text-3xl font-extrabold">{now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz })}</div>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6">
          <Logo light />
          <nav className="flex flex-wrap gap-6 text-sm text-paper/60">
            <a href="#home" className="hover:text-sea">Home</a>
            <a href="#destinations" className="hover:text-sea">Destinations</a>
            <a href="#services" className="hover:text-sea">Experiences</a>
            <a href="#pricing" className="hover:text-sea">Pricing</a>
            <a href="#contact" className="hover:text-sea">Contact</a>
          </nav>
          <div className="flex gap-2">
            {[FiInstagram, FiYoutube, FiTwitter].map((I, k) => (
              <a key={k} href="#home" aria-label="Social link" className="grid h-11 w-11 place-items-center rounded-full border border-paper/15 transition hover:-translate-y-1 hover:bg-sea hover:text-ink"><I /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-14 select-none whitespace-nowrap font-display text-[19vw] font-extrabold uppercase leading-[0.8] text-paper/[0.06]" aria-hidden>feel natural</div>
      <p className="mx-auto mt-6 max-w-7xl px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">© {now.getFullYear()} driftly — made for curious people</p>
    </footer>
  );
};
