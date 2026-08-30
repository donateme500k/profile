import { useRef, type ReactNode } from "react";

/** Desktop-only magnetic hover. Falls back to a plain wrapper on touch / reduced motion. */
export function Magnetic({ children, strength = 10, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`magnetic inline-flex ${className}`}>
      {children}
    </span>
  );
}
