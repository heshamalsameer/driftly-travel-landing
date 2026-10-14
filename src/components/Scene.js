import React, { useId } from "react";

/**
 * Hand-built SVG "postcard" illustrations so the page needs no stock photos.
 * type: mountain | sea | desert | aurora | forest | city
 */
const palettes = {
  mountain: { sky: ["#9fd7ef", "#f6e3c8"], sun: "#fff4d6", a: "#4f7fa3", b: "#2f5878", c: "#1b3a52", snow: "#ffffff" },
  sea: { sky: ["#ffd3a5", "#fd9f8b"], sun: "#fff1c9", a: "#2bb3c8", b: "#0e7490", c: "#0b5368", snow: "#ffffff" },
  desert: { sky: ["#ffb26b", "#ffe2b3"], sun: "#fff3d1", a: "#e9965a", b: "#cf6e3a", c: "#9c4a25", snow: "#fbe1c4" },
  aurora: { sky: ["#0b1d3a", "#173a5e"], sun: "#e8f6ff", a: "#25486b", b: "#16314d", c: "#0b1d2a", snow: "#d6f5ff" },
  forest: { sky: ["#c9ead2", "#f8efd9"], sun: "#ffe7b8", a: "#5c9a6e", b: "#3c7552", c: "#22503a", snow: "#ffffff" },
  city: { sky: ["#3b3f8f", "#f28c7b"], sun: "#ffd6a0", a: "#5a4f9a", b: "#3d3577", c: "#241f4d", snow: "#ffe9a8" },
};

export const Scene = ({ type = "mountain", className = "", animate = true }) => {
  const id = useId().replace(/:/g, "");
  const p = palettes[type] || palettes.mountain;
  const sky = `sky-${id}`;
  const glow = `glow-${id}`;

  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={`${type} illustration`}>
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[0]} />
          <stop offset="1" stopColor={p.sky[1]} />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor={p.sun} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${sky})`} />

      {type === "aurora" && (
        <g opacity="0.85" className={animate ? "scene-aurora" : ""}>
          <path d="M-20 170 C 80 90, 160 220, 250 120 S 380 140, 430 80 L 430 200 C 330 240, 260 170, 170 250 S 30 220, -20 260 Z" fill="#43f0b4" opacity="0.35" />
          <path d="M-20 200 C 100 140, 170 250, 280 160 S 390 190, 430 140 L 430 230 C 320 260, 240 210, 150 280 S 20 250, -20 290 Z" fill="#6c8cff" opacity="0.3" />
          {Array.from({ length: 28 }).map((_, i) => (
            <circle key={i} cx={(i * 73) % 400} cy={(i * 41) % 180} r={i % 3 ? 1 : 1.6} fill="#fff" opacity={0.4 + (i % 4) * 0.15} />
          ))}
        </g>
      )}

      <circle cx="285" cy={type === "sea" ? 250 : 150} r="110" fill={`url(#${glow})`} />
      <circle cx="285" cy={type === "sea" ? 250 : 150} r="42" fill={p.sun} className={animate ? "scene-sun" : ""} />

      {type === "city" && (
        <g>
          {[[20, 300, 46, 200], [70, 250, 40, 250], [114, 280, 54, 220], [172, 220, 36, 280], [212, 270, 60, 230], [276, 240, 42, 260], [322, 290, 60, 210]].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill={i % 2 ? p.b : p.a} />
              {Array.from({ length: 6 }).map((__, r) => (
                <rect key={r} x={x + 8} y={y + 14 + r * 26} width={w - 16} height="6" fill={p.snow} opacity={(r + i) % 3 ? 0.18 : 0.8} />
              ))}
            </g>
          ))}
          <rect y="440" width="400" height="60" fill={p.c} />
        </g>
      )}

      {(type === "mountain" || type === "aurora" || type === "forest") && (
        <g>
          <path d="M-10 360 L 90 200 L 150 280 L 230 150 L 330 300 L 410 230 L 410 500 L -10 500 Z" fill={p.a} />
          {type !== "forest" && <path d="M230 150 L 258 195 L 240 190 L 228 205 L 214 186 L 202 196 Z M90 200 L 110 232 L 96 228 L 86 240 L 76 224 Z" fill={p.snow} />}
          <path d="M-10 410 L 70 320 L 150 380 L 250 290 L 330 360 L 410 320 L 410 500 L -10 500 Z" fill={p.b} />
          <path d="M-10 460 C 80 420, 160 450, 230 430 S 360 420, 410 440 L 410 500 L -10 500 Z" fill={p.c} />
        </g>
      )}

      {type === "forest" && (
        <g fill={p.c}>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = i * 36 - 6;
            const h = 60 + ((i * 37) % 50);
            return <path key={i} d={`M${x} 470 L ${x + 18} ${470 - h} L ${x + 36} 470 Z`} opacity={0.75 + (i % 2) * 0.25} />;
          })}
          <path d="M150 300 h100 l-12 -18 h-76 z M162 300 h76 v40 h-76 z M146 340 h108 l-14 -16 h-80 z" fill="#b5442f" />
        </g>
      )}

      {type === "desert" && (
        <g>
          <path d="M-10 330 C 70 290, 150 320, 210 300 S 340 280, 410 310 L 410 500 L -10 500 Z" fill={p.a} />
          <path d="M-10 390 C 90 340, 190 400, 270 370 S 380 360, 410 380 L 410 500 L -10 500 Z" fill={p.b} />
          <path d="M-10 450 C 100 420, 200 460, 300 435 S 390 440, 410 450 L 410 500 L -10 500 Z" fill={p.c} />
          <g fill={p.c} transform="translate(92 330)">
            <rect x="8" y="0" width="7" height="40" rx="3" />
            <rect x="0" y="12" width="6" height="16" rx="3" />
            <rect x="17" y="8" width="6" height="18" rx="3" />
          </g>
        </g>
      )}

      {type === "sea" && (
        <g>
          <path d="M-10 290 L 60 240 L 120 270 L 180 230 L 230 280 Z" fill="#f7f1e8" opacity="0.9" />
          <rect x="70" y="248" width="10" height="16" fill="#2b6cb0" />
          <circle cx="110" cy="244" r="9" fill="#2b6cb0" />
          <g className={animate ? "scene-waves" : ""}>
            <path d="M-40 300 Q -10 290 20 300 T 80 300 T 140 300 T 200 300 T 260 300 T 320 300 T 380 300 T 440 300 V 500 H -40 Z" fill={p.a} />
            <path d="M-40 350 Q -10 338 20 350 T 80 350 T 140 350 T 200 350 T 260 350 T 320 350 T 380 350 T 440 350 V 500 H -40 Z" fill={p.b} />
            <path d="M-40 410 Q -10 398 20 410 T 80 410 T 140 410 T 200 410 T 260 410 T 320 410 T 380 410 T 440 410 V 500 H -40 Z" fill={p.c} />
          </g>
          <g transform="translate(250 318)" className={animate ? "scene-boat" : ""}>
            <path d="M0 18 L 46 18 L 38 28 L 8 28 Z" fill="#fff" />
            <path d="M22 18 L 22 -14 L 42 14 Z" fill="#ff6b4a" />
          </g>
        </g>
      )}

      {/* birds */}
      {type !== "aurora" && type !== "city" && (
        <g fill="none" stroke={p.c} strokeWidth="2.2" strokeLinecap="round" opacity="0.7" className={animate ? "scene-birds" : ""}>
          <path d="M80 110 q 8 -8 16 0 q 8 -8 16 0" />
          <path d="M120 80 q 6 -6 12 0 q 6 -6 12 0" />
        </g>
      )}
    </svg>
  );
};
