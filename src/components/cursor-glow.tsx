import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[5] hidden h-[26rem] w-[26rem] rounded-full opacity-45 blur-[90px] lg:block"
      style={{
        left: pos.x - 208,
        top: pos.y - 208,
        background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 45%, transparent), transparent 65%)",
        transition: "transform .18s ease-out",
      }}
    />
  );
}
