import React from "react";

export const Logo = ({ light = false }) => (
  <span className={`flex items-center gap-2.5 ${light ? "text-paper" : ""}`}>
    <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-sea text-white">
      <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden>
        <circle cx="26" cy="15" r="6" fill="#fff4d6" />
        <path d="M0 30 L12 18 L19 25 L26 19 L40 31 V40 H0Z" fill="#0e7490" />
        <path d="M0 34 Q10 30 20 34 T40 34 V40 H0Z" fill="#0b1d2a" opacity=".55" />
      </svg>
    </span>
    <span className="font-display text-2xl font-extrabold tracking-tight">driftly<span className="text-coral">.</span></span>
  </span>
);
