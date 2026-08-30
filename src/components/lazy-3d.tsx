import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

const IdentityMonogram = lazy(() =>
  import("@/components/identity-monogram").then((m) => ({ default: m.IdentityMonogram })),
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

/** Mounts a heavy WebGL visual only when near the viewport, with a static fallback. */
export function Lazy3D({ fallback, children }: { fallback: ReactNode; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !supportsWebGL()) return;
    const io = new IntersectionObserver(
      (entries) => { const entry = entries[0]; if (!entry) return;
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>{fallback}</div>
      {ready && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
}

/** Hero digital-identity monogram with poster fallback. */
export function HeroIdentity({ fallback }: { fallback: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <Lazy3D fallback={fallback}>
      <IdentityMonogram reduced={Boolean(reduced)} />
    </Lazy3D>
  );
}
