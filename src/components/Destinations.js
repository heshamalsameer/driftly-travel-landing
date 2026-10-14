import React, { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiClock, FiThermometer } from "react-icons/fi";
import { Scene } from "./Scene";
import { destinations } from "./data";
import { useMedia, useScrollProgress } from "./hooks";

const Card = ({ d, i, highlight }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 8 });
  };
  return (
    <article
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`dest-card group relative flex w-[78vw] shrink-0 snap-center flex-col overflow-hidden rounded-[30px] bg-paper p-3 sm:w-[360px] ${highlight ? "ring-4 ring-coral" : ""}`}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
        <Scene type={d.scene} className="h-full w-full transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{String(i + 1).padStart(2, "0")} / {d.country}</span>
        <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:rotate-45 group-hover:bg-coral"><FiArrowUpRight /></span>
      </div>
      <div className="flex items-end justify-between gap-3 px-3 pb-3 pt-5">
        <div>
          <h3 className="font-display text-3xl font-extrabold leading-none text-ink">{d.place}</h3>
          <p className="mt-2 text-sm text-ink/60">{d.tag}</p>
          <div className="mt-3 flex gap-3 font-mono text-[11px] uppercase tracking-wider text-ink/50">
            <span className="flex items-center gap-1"><FiClock /> {d.days} days</span>
            <span className="flex items-center gap-1"><FiThermometer /> {d.temp}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">from</span>
          <div className="font-display text-2xl font-extrabold text-sea-deep">${d.price}</div>
        </div>
      </div>
    </article>
  );
};

/** Vertical scroll drives a horizontal track on desktop; swipe on mobile. */
export const Destinations = ({ highlight }) => {
  const wide = useMedia("(min-width: 900px)");
  const [ref, p] = useScrollProgress();
  const track = useRef(null);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (track.current) setMax(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [wide]);

  const header = (
    <div className="mx-auto mb-10 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-coral">Destinations</p>
        <h2 className="mt-3 font-display text-5xl font-extrabold leading-[0.9] text-paper sm:text-7xl">Six places<br /><span className="outline-text">we can’t stop</span> <span className="font-hand font-normal normal-case text-sea">talking about</span></h2>
      </div>
      <div className="w-full max-w-xs">
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
          <span>{wide ? "Keep scrolling" : "Swipe"}</span>
          <span>{String(Math.min(6, Math.round(p * 5) + 1)).padStart(2, "0")} / 06</span>
        </div>
        <div className="mt-2 h-[3px] overflow-hidden rounded bg-paper/15"><div className="h-full origin-left bg-sea" style={{ transform: `scaleX(${wide ? Math.max(0.08, p) : 1})` }} /></div>
      </div>
    </div>
  );

  if (!wide) {
    return (
      <section id="destinations" className="bg-ink py-24">
        {header}
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
          {destinations.map((d, i) => <Card key={d.id} d={d} i={i} highlight={highlight === d.id} />)}
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" ref={ref} className="relative bg-ink" style={{ height: `calc(100vh + ${max}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {header}
        <div ref={track} className="flex gap-6 pl-[max(20px,calc((100vw-1280px)/2+20px))] will-change-transform" style={{ transform: `translateX(${-p * max}px)` }}>
          {destinations.map((d, i) => <Card key={d.id} d={d} i={i} highlight={highlight === d.id} />)}
          <div className="flex w-[360px] shrink-0 flex-col justify-center rounded-[30px] border border-dashed border-paper/25 p-10 text-paper">
            <p className="font-hand text-4xl text-sea">and 120+ more…</p>
            <p className="mt-3 text-paper/60">Tell us what you love and we’ll find the place that fits.</p>
            <a href="#contact" className="btn-pill mt-6 w-fit bg-paper text-ink hover:bg-coral hover:text-white">Ask a trip designer <FiArrowUpRight /></a>
          </div>
        </div>
      </div>
    </section>
  );
};
