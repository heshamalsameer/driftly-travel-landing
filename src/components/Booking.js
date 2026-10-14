import React, { useState } from "react";
import { FiMinus, FiPlus, FiSearch } from "react-icons/fi";
import { destinations } from "./data";
import { Reveal } from "./Reveal";

const today = () => new Date().toISOString().slice(0, 10);

/** A boarding-pass shaped quick search. */
export const Booking = ({ onSearch }) => {
  const [to, setTo] = useState("santorini");
  const [date, setDate] = useState(today());
  const [people, setPeople] = useState(2);
  const dest = destinations.find((d) => d.id === to);
  const code = dest.place.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();

  return (
    <section className="relative z-10 -mt-[1px] bg-sand px-5 pb-24 pt-16" aria-label="Quick trip search">
      <Reveal className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-extrabold leading-none text-ink sm:text-5xl">Where to next<span className="text-coral">?</span></h2>
          <p className="max-w-sm text-ink/60">Pick a place and a date — we’ll show you trips that are ready to book.</p>
        </div>
        <form
          className="ticket grid overflow-hidden rounded-[28px] bg-paper shadow-[0_30px_80px_-40px_rgba(11,29,42,.45)] md:grid-cols-[1fr_auto_260px]"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(dest, people);
          }}
        >
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="field-box">
              <span>From</span>
              <strong className="font-display text-3xl">KWI</strong>
              <small>Kuwait City</small>
            </div>
            <label className="field-box">
              <span>To</span>
              <strong className="font-display text-3xl text-sea-deep">{code}</strong>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="field-select" aria-label="Destination">
                {destinations.map((d) => <option key={d.id} value={d.id}>{d.place}, {d.country}</option>)}
              </select>
            </label>
            <label className="field-box">
              <span>Depart</span>
              <input type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} className="field-select font-display text-xl font-bold" aria-label="Departure date" />
              <small>{dest.days} days · {dest.temp} avg</small>
            </label>
            <div className="field-box">
              <span>Travellers</span>
              <div className="mt-1 flex items-center gap-3">
                <button type="button" aria-label="Fewer travellers" disabled={people <= 1} onClick={() => setPeople((n) => n - 1)} className="round-btn"><FiMinus /></button>
                <strong className="w-8 text-center font-display text-3xl">{people}</strong>
                <button type="button" aria-label="More travellers" disabled={people >= 9} onClick={() => setPeople((n) => n + 1)} className="round-btn"><FiPlus /></button>
              </div>
              <small>{people === 1 ? "Solo" : people === 2 ? "Couple" : "Group"}</small>
            </div>
          </div>
          <div className="perforation hidden md:block" aria-hidden />
          <div className="flex flex-col justify-between gap-5 bg-ink p-6 text-paper">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50">Est. from</span>
              <div className="font-display text-5xl font-extrabold">${(dest.price * people).toLocaleString()}</div>
              <span className="text-sm text-paper/60">for {people} · flights + stay</span>
            </div>
            <div className="barcode" aria-hidden />
            <button className="btn-pill justify-center bg-coral text-white hover:bg-sea hover:text-ink"><FiSearch /> Search trips</button>
          </div>
        </form>
      </Reveal>
    </section>
  );
};
