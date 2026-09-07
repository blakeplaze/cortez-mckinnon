"use client";

import { useEffect } from "react";

export function PointerGlow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = document.createElement("div");
    glow.className = "pointer-glow";
    document.body.appendChild(glow);

    const move = (event: PointerEvent) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    };

    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      glow.remove();
    };
  }, []);

  return null;
}
