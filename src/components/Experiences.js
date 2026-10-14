import React, { useEffect, useState } from "react";
import { FiFeather, FiMoon, FiMap, FiTriangle, FiArrowRight } from "react-icons/fi";
import { Scene } from "./Scene";
import { destinations, moods, steps } from "./data";
import { Reveal } from "./Reveal";
import { useInView, useMedia, useScrollProgress } from "./hooks";

const icons = { calm: FiFeather, wild: FiTriangle, culture: FiMap, night: FiMoon };

/* ---------- mood picker ---------- */
export const Moods = () => {
  const [mood, setMood] = useState(moods[0]);
  const picks = mood.picks.map((id) => destinations.find((d) => d.id === id));

  return (
    <section id="services" className="relative overflow-hidden bg-paper px-5 py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal><p className="font-mono text-xs uppercase tracking-[0.3em] text-coral">Experiences</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-5xl font-extrabold leading-[0.92] text-ink sm:text-6xl">How do you want to <span className="font-hand font-normal text-sea-deep">feel</span>?</h2>
          </Reveal>
          <Reveal delay={0.1}><p className="mt-5 max-w-md text-lg text-ink/60">Skip the endless tabs. Choose a mood and we’ll match you with trips built around it.</p></Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Choose a mood">
            {moods.map((m, i) => {
              const I = icons[m.id];
              const on = m.id === mood.id;
              return (
                <Reveal key={m.id} delay={0.1 + i * 0.05}>
                  <button
                    role="radio"
                    aria-checked={on}
                    onClick={() => setMood(m)}
                    className={`mood-btn group w-full rounded-3xl border p-5 text-left transition-all duration-300 ${on ? "border-ink bg-ink text-paper shadow-xl shadow-ink/20" : "border-ink/10 bg-white hover:-translate-y-1 hover:border-ink/40"}`}
                  >
                    <span className={`grid h-11 w-11 place-items-center rounded-2xl transition-colors ${on ? "bg-coral text-white" : "bg-sand text-ink group-hover:bg-sea/20"}`}><I /></span>
                    <strong className="mt-4 block font-display text-xl">{m.label}</strong>
                    <span className={`mt-1 block text-sm ${on ? "text-paper/70" : "text-ink/55"}`}>{m.text}</span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[560px]" key={mood.id}>
          {picks.map((d, i) => (
            <div
              key={d.id}
              className="mood-card absolute w-[68%] overflow-hidden sm:w-[58%] rounded-[28px] bg-white p-2.5 shadow-[0_40px_80px_-40px_rgba(11,29,42,.55)]"
              style={{
                left: ["0%", "42%", "22%"][i],
                top: ["2%", "6%", "40%"][i],
                zIndex: [2, 1, 3][i],
                animationDelay: `${i * 0.12}s`,
                "--r": ["-6deg", "5deg", "-2deg"][i],
              }}
            >
              <div className="aspect-[5/4] overflow-hidden rounded-[20px]"><Scene type={d.scene} className="h-full w-full" /></div>
              <div className="flex items-center justify-between px-3 py-3">
                <div>
                  <strong className="font-display text-lg text-ink">{d.place}</strong>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-ink/50">{d.days} days · from ${d.price}</div>
                </div>
                <a href="#contact" aria-label={`Plan ${d.place}`} className="grid h-10 w-10 place-items-center rounded-full bg-sand text-ink transition hover:bg-coral hover:text-white"><FiArrowRight /></a>
              </div>
            </div>
          ))}
          <span className="absolute -bottom-2 left-2 rotate-[-3deg] font-hand text-3xl text-ink/60">↖ matched for “{mood.label.toLowerCase()}”</span>
        </div>
      </div>
    </section>
  );
};

/* ---------- journey route (path draws on scroll) ---------- */
export const Journey = () => {
  const wide = useMedia("(min-width: 768px)");
  const [ref, p] = useScrollProgress();
  const [listRef, seen] = useInView(0.2);
  const draw = wide ? Math.min(1, p * 1.35) : seen ? 1 : 0;
  return (
    <section id="about" ref={ref} className={`relative bg-sand ${wide ? "h-[260vh]" : "py-24"}`}>
      <div className={wide ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5" : "px-5"}>
        <div className="mx-auto w-full max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-coral">The journey</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl font-extrabold leading-[0.92] text-ink sm:text-6xl">From “I need a break” to <span className="outline-text-dark">wheels up</span> in four stops.</h2>

          <div className="relative mt-14 hidden h-[300px] md:block">
            <svg viewBox="0 0 1200 300" className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" aria-hidden>
              <path d="M20 240 C 200 240, 220 60, 400 80 S 600 260, 800 200 S 1000 40, 1180 70" stroke="#0b1d2a" strokeOpacity=".15" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
              <path d="M20 240 C 200 240, 220 60, 400 80 S 600 260, 800 200 S 1000 40, 1180 70" stroke="#ff6b4a" strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw} />
            </svg>
            {steps.map((s, i) => {
              const at = [0.02, 0.33, 0.66, 0.98][i];
              const on = draw >= at - 0.02;
              const pos = [[2, 70], [32, 12], [64, 58], [92, 8]][i];
              return (
                <div key={s.n} className="absolute w-56 -translate-x-1/2 transition-all duration-500" style={{ left: `${pos[0]}%`, top: `${pos[1]}%`, opacity: on ? 1 : 0.35, transform: `translate(-${i === 0 ? 0 : i === 3 ? 90 : 50}%, ${on ? 0 : 12}px)` }}>
                  <span className={`grid h-12 w-12 place-items-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-500 ${on ? "border-coral bg-coral text-white scale-110" : "border-ink/20 bg-sand text-ink/60"}`}>{s.n}</span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink/60">{s.text}</p>
                </div>
              );
            })}
          </div>

          <ol ref={listRef} className="mt-12 grid gap-5 md:hidden">
            {steps.map((s, i) => {
              const on = seen;
              return (
                <li key={s.n} className={`flex gap-4 rounded-3xl bg-paper p-5 transition-all duration-700 ${on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ transitionDelay: `${i * 0.12}s` }}>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-mono text-sm font-bold ${on ? "bg-coral text-white" : "bg-sand text-ink/60"}`}>{s.n}</span>
                  <div><h3 className="font-display text-xl font-extrabold text-ink">{s.title}</h3><p className="text-sm text-ink/60">{s.text}</p></div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

/* ---------- stats band ---------- */
const Count = ({ to, suffix = "", decimals = 0, run }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / 1600);
      setV(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{v.toFixed(decimals)}{suffix}</>;
};

export const Stats = () => {
  const [ref, seen] = useInView(0.4);
  const items = [
    { to: 120, suffix: "+", label: "destinations" },
    { to: 48, suffix: "k", label: "happy travellers" },
    { to: 4.9, decimals: 1, label: "average rating" },
    { to: 24, suffix: "/7", label: "local support" },
  ];
  return (
    <section ref={ref} className="overflow-hidden bg-coral py-6 text-ink" aria-label="Numbers">
      <div className="marquee flex w-max gap-16">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-16" aria-hidden={k === 1}>
            {items.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3 whitespace-nowrap">
                <strong className="font-display text-6xl font-extrabold"><Count {...s} run={seen} /></strong>
                <span className="font-hand text-3xl">{s.label}</span>
                <span className="ml-10 text-3xl">✺</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
