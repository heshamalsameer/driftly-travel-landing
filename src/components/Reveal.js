import React from "react";
import { useInView } from "./hooks";

export const Reveal = ({ as: Tag = "div", delay = 0, className = "", children, style, from = "up" }) => {
  const [ref, seen] = useInView(0.15);
  return (
    <Tag ref={ref} className={`reveal reveal-${from} ${seen ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </Tag>
  );
};
