import React, { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Logo } from "./Logo";

const links = [
  { href: "#home", label: "Home" },
  { href: "#destinations", label: "Destinations" },
  { href: "#services", label: "Experiences" },
  { href: "#about", label: "Journey" },
  { href: "#pricing", label: "Pricing" },
];

export const Header = () => {
  const [open, setopen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 1.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "py-3" : "py-5"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5">
          <a href="#home" aria-label="Driftly home" className="rounded-full border border-ink/10 bg-paper/70 py-1 pl-1 pr-4 text-ink backdrop-blur-xl"><Logo /></a>
          <nav aria-label="Main" className={`hidden items-center gap-1 rounded-full border p-1.5 backdrop-blur-xl transition-all duration-500 md:flex ${solid ? "border-ink/10 bg-paper/80 shadow-lg shadow-ink/5" : "border-ink/10 bg-white/40"}`}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className={`navitem rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === l.href ? "bg-ink text-paper" : "text-ink/70 hover:text-ink"}`}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="btn-pill hidden bg-coral text-white sm:inline-flex">Plan my trip</a>
            <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setopen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper md:hidden">
              {open ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <div className={`menu fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-paper md:hidden ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="flex flex-col gap-2">
          {[...links, { href: "#contact", label: "Contact" }].map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setopen(false)} className="menu-link font-display text-5xl font-bold" style={{ transitionDelay: open ? `${0.15 + i * 0.05}s` : "0s" }}>
              {l.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50">Travel now · feel natural</p>
      </div>
    </>
  );
};
