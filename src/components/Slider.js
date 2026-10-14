import React, { useEffect, useRef, useState } from "react";
import one from "../Videos/one.mp4";
import two from "../Videos/two.mp4";
import { useScrollProgress, lerp, clamp01 } from "./hooks";
import { Landing } from "./Landing";

const vedio = [
  { src: one, label: "Coastline" },
  { src: two, label: "Green hills" },
];

/**
 * Scroll-driven hero: the video starts inside a rounded "window"
 * and expands to full screen as you scroll.
 */
export const Slider = () => {
  const [ref, p] = useScrollProgress();
  const [index, setIndex] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % vedio.length), 7000);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) v.play().catch(() => {});
      else v.pause();
    });
  }, [index]);

  const t = clamp01(p / 0.75); // open fully at 75% of the section
  const ease = 1 - Math.pow(1 - t, 3);
  const isWide = typeof window !== "undefined" && window.innerWidth > 768;
  const insetY = lerp(isWide ? 16 : 20, 0, ease);
  const insetX = lerp(isWide ? 27 : 8, 0, ease);
  const radius = lerp(isWide ? 240 : 140, 0, ease);
  const words = 1 - clamp01(t * 1.6);

  return (
    <section id="home" ref={ref} className="relative h-[230vh] bg-sand">
      <div className="sticky top-0 h-screen overflow-hidden bg-sand">
        {/* video window */}
        <div className="absolute inset-0" style={{ clipPath: `inset(${insetY}% ${insetX}% round ${radius}px)`, willChange: "clip-path" }}>
          {vedio.map((v, i) => (
            <video
              key={v.label}
              ref={(el) => (refs.current[i] = el)}
              src={v.src}
              className={`video absolute inset-0 transition-opacity duration-[1500ms] ${i === index ? "opacity-100" : "opacity-0"}`}
              style={{ transform: `scale(${lerp(1.25, 1, ease)})` }}
              autoPlay={i === 0}
              loop
              muted
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" style={{ opacity: lerp(0.2, 1, ease) }} />
        </div>

        {/* giant words */}
        <div className="pointer-events-none absolute inset-0 select-none mix-blend-difference" style={{ opacity: words }}>
          <h2 className="absolute left-[4vw] top-[13vh] font-display text-[17vw] font-extrabold uppercase leading-none text-white md:top-[11vh] md:text-[13vw]" style={{ transform: `translateX(${-t * 30}vw)` }}>
            Travel
          </h2>
          <h2 className="absolute bottom-[8vh] right-[4vw] font-display text-[17vw] font-extrabold uppercase leading-none text-white md:text-[13vw]" style={{ transform: `translateX(${t * 30}vw)` }}>
            now
          </h2>
        </div>

        {/* corner meta */}
        <div className="absolute bottom-6 left-5 hidden font-mono text-xs uppercase tracking-[0.2em] text-ink/60 md:block" style={{ opacity: words }}>
          Scroll to open the window ↓
        </div>
        <div className="absolute right-5 top-28 hidden text-right font-mono text-xs uppercase tracking-[0.2em] text-ink/60 md:block" style={{ opacity: words }}>
          43.4° N · 6.2° E<br />Now playing — {vedio[index].label}
        </div>

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-14 sm:pb-20">
          <Landing visible={t > 0.85} />
          <div className="mt-8 flex items-center gap-3" style={{ opacity: t > 0.85 ? 1 : 0, transition: "opacity .6s" }}>
            {vedio.map((v, i) => (
              <button key={v.label} onClick={() => setIndex(i)} aria-label={`Show ${v.label}`} className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                <span className="relative h-[3px] w-14 overflow-hidden rounded bg-white/25">
                  {i === index && <span key={index} className="progress-bar absolute inset-0 origin-left bg-white" />}
                </span>
                <span className={i === index ? "text-white" : ""}>{v.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
