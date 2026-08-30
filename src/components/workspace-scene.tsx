import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * ABOUT 3D — DEVELOPER CONTROL SYSTEM
 * A layered, perspective "personal digital workspace": terminal, file tree,
 * floating project cards and a small status rail. Pure DOM/CSS layers (no WebGL)
 * so it is cheap, always renders, and reads clearly different from the Hero monogram.
 */

const LINES = [
  "$ npm run build --premium",
  "› compiling modules ............ ok",
  "› optimizing assets ............ ok",
  "› deploy: vercel@edge .......... live",
];

const TREE = ["src/", "  components/", "  routes/", "  styles.css"];

export function WorkspaceScene() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (reduced) {
      setVisible(LINES.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      (entries) => { const entry = entries[0]; if (!entry) return;
        if (entry.isIntersecting && !timer) {
          timer = setInterval(() => setVisible((v) => (v >= LINES.length ? 0 : v + 1)), 1100);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [reduced]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${((e.clientX - r.left) / r.width - 0.5).toFixed(3)}`);
    el.style.setProperty("--py", `${((e.clientY - r.top) / r.height - 0.5).toFixed(3)}`);
  };

  const reset = () => {
    ref.current?.style.setProperty("--px", "0");
    ref.current?.style.setProperty("--py", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-hidden
      className="workspace-stage absolute inset-0 flex items-center justify-center overflow-hidden p-5 sm:p-8"
    >
      <div className="workspace-layers relative aspect-square w-full max-w-[30rem]">
        {/* terminal — main layer */}
        <div className="workspace-card glass-panel absolute left-[4%] top-[16%] w-[74%] rounded-lg p-4" style={{ "--d": "22px" } as React.CSSProperties}>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary/80" />
            <span className="h-2 w-2 rounded-full bg-ice/50" />
            <span className="h-2 w-2 rounded-full bg-silver/35" />
            <span className="ml-auto font-mono text-[8px] uppercase tracking-[.2em] text-muted-foreground">ddk — zsh</span>
          </div>
          <div className="space-y-1.5 font-mono text-[10px] leading-5 text-muted-foreground">
            {LINES.map((line, i) => (
              <p key={line} className={`truncate transition-opacity duration-500 ${i < visible ? "opacity-100" : "opacity-25"} ${i === 0 ? "text-ice" : ""}`}>
                {line}
              </p>
            ))}
            <p className="text-primary">
              $ <span className="terminal-caret inline-block h-3 w-[7px] translate-y-[2px] bg-primary" />
            </p>
          </div>
        </div>

        {/* file tree — back layer */}
        <div className="workspace-card glass-panel absolute left-[2%] bottom-[8%] w-[42%] rounded-lg p-4" style={{ "--d": "10px" } as React.CSSProperties}>
          <p className="font-mono text-[8px] uppercase tracking-[.2em] text-muted-foreground">Workspace</p>
          <ul className="mt-3 space-y-1 font-mono text-[10px] text-silver">
            {TREE.map((t) => (
              <li key={t} className="whitespace-pre">{t}</li>
            ))}
          </ul>
        </div>

        {/* project card — floating front layer */}
        <div className="workspace-card workspace-float glass-panel absolute right-[1%] top-[5%] w-[46%] rounded-lg p-4" style={{ "--d": "48px" } as React.CSSProperties}>
          <p className="font-mono text-[8px] uppercase tracking-[.2em] text-muted-foreground">Active project</p>
          <p className="mt-2 font-display text-sm font-semibold">Nguồn Phim</p>
          <div className="mt-3 h-px w-full overflow-hidden bg-border">
            <span className="workspace-progress block h-full bg-primary" />
          </div>
          <p className="mt-2 font-mono text-[9px] text-primary">BUILD 92%</p>
        </div>

        {/* status rail — front layer */}
        <div className="workspace-card workspace-float-slow glass-panel absolute right-[4%] bottom-[14%] w-[50%] rounded-lg p-4" style={{ "--d": "36px" } as React.CSSProperties}>
          {[["API", "200 OK"], ["EDGE", "GMT+7"], ["MODE", "FOCUS"]].map(([k, v], i) => (
            <div key={k} className={`flex items-center justify-between py-1.5 font-mono text-[9px] uppercase tracking-[.14em] ${i < 2 ? "border-b border-border" : ""}`}>
              <span className="text-muted-foreground">{k}</span>
              <span className="flex items-center gap-2 text-foreground">
                {i === 0 && <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />}
                {v}
              </span>
            </div>
          ))}
        </div>

        {/* connection lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M22 78 L46 46 L78 20" fill="none" stroke="color-mix(in oklab, var(--primary) 45%, transparent)" strokeWidth=".25" strokeDasharray="2 2" />
          <path d="M46 46 L80 72" fill="none" stroke="color-mix(in oklab, var(--ice) 35%, transparent)" strokeWidth=".2" strokeDasharray="2 2" />
        </svg>
      </div>
    </div>
  );
}

export default WorkspaceScene;
