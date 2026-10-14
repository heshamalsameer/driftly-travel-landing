import React from "react";
import { FiArrowRight, FiPlay } from "react-icons/fi";

/** Hero copy that appears once the video window has opened up. */
export const Landing = ({ visible }) => (
  <div className={`landing-card ${visible ? "is-in" : ""}`}>
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-sea">● Summer ’26 collection</p>
    <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.9] text-white sm:text-7xl">
      Travel now<span className="text-coral">.</span>
    </h1>
    <p className="mt-3 font-hand text-4xl text-sand">feel natural</p>
    <p className="mt-4 max-w-md text-lg text-white/80">Enjoy your summer vacation with the most amazing scenery — planned end to end, so you only have to show up.</p>
    <div className="mt-7 flex flex-wrap gap-3">
      <a href="#contact" className="btn-pill bg-sea text-ink hover:bg-white">Get Started <FiArrowRight /></a>
      <a href="#destinations" className="btn-pill border border-white/40 text-white hover:bg-white hover:text-ink"><FiPlay /> Explore places</a>
    </div>
  </div>
);
