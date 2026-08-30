import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUp, ArrowUpRight, Copy, Check, Github, Instagram, Mail, Menu, Send, X, Facebook, CirclePlay, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle, useTheme } from "@/components/theme-toggle";
import { MusicToggle } from "@/components/music-player";
import { CursorGlow } from "@/components/cursor-glow";
import { TiltCard } from "@/components/tilt-card";
import { HeroIdentity } from "@/components/lazy-3d";
import { WorkspaceScene } from "@/components/workspace-scene";
import { Magnetic } from "@/components/magnetic";
import machinePoster from "@/assets/machine-poster.jpg";
import nguonPhim from "@/assets/projects/nguon-phim.webp";
import speedWheat from "@/assets/projects/speed-wheat.webp";
import namMo from "@/assets/projects/nam-mo.webp";
import iamRich from "@/assets/projects/i-am-rich.webp";
import smmPro from "@/assets/projects/smm-pro.webp";

const marquee = ["DIGITAL CRAFT", "PRECISION", "INTJ-T", "VIETNAM", "PERFORMANCE", "SLEEP MODE", "CLEAN CODE", "PREMIUM SYSTEMS"];


const nav = ["HOME", "ABOUT", "SKILLS", "PROJECTS", "JOURNEY", "FAQ", "CONTACT"];
const skills = [
  { name: "Python", level: 90, desc: "data, scripting, AI, automation", tech: "NumPy · Pandas · Flask · requests" },
  { name: "HTML/CSS", level: 95, desc: "markup, styling, animations", tech: "Flexbox · Grid · Animations · Responsive" },
  { name: "JavaScript", level: 85, desc: "frontend, logic, DOM manipulation", tech: "ES6+ · Async · DOM · Fetch API" },
  { name: "Node.js", level: 80, desc: "backend, APIs, tooling, server", tech: "Express · npm · REST API · JWT" },
];
const projects = [
  { no: "01", title: "Nguồn Phim", desc: "Nền tảng xem phim online", url: "https://nguon-phim.vercel.app", image: nguonPhim, tone: "md:col-span-7" },
  { no: "02", title: "Speed Wheat", desc: "Speed Test", url: "https://speed-wheat.vercel.app/", image: speedWheat, tone: "md:col-span-5" },
  { no: "03", title: "Nam Mô A Di Đà Phật", desc: "Cầu nguyện mỗi ngày", url: "https://nammoadidaphat.vercel.app/", image: namMo, tone: "md:col-span-5" },
  { no: "04", title: "I Am Rich", desc: "Dự Án Nuôi Tôi", url: "https://iamrich.site", image: iamRich, tone: "md:col-span-7" },
  { no: "05", title: "SMM PRO", desc: "Bảng giá dịch vụ", url: "https://banggia-smm.vercel.app", image: smmPro, tone: "md:col-span-7" },
];
const profile = [
  ["HỌ & TÊN", "Đào Đăng Khoa"], ["SINH NHẬT", "24/04"], ["MBTI", "INTJ-T"], ["CUNG HOÀNG ĐẠO", "Kim ngưu"],
  ["NGHỀ NGHIỆP", "Hành nghề 2 ngón"], ["SỞ THÍCH", "Kiếm tiền"], ["VỊ TRÍ", "Vietnam"], ["NGÔN NGỮ", "VI, EN"],
  ["TRẠNG THÁI", "Đang ngủ gật"], ["HỌC VẤN", "Học trước quên sau"], ["CHÂM NGÔN", "“Ngu Thì Chịu”"],
];
const socials = [
  { name: "Email", value: "ineedmoney5757@gmail.com", href: "mailto:ineedmoney5757@gmail.com", icon: Mail, external: false },
  { name: "GitHub", value: "donateme500k", href: "https://github.com/donateme500k", icon: Github },
  { name: "Facebook", value: "dk.2404", href: "https://www.facebook.com/dk.2404", icon: Facebook },
  { name: "TikTok", value: "@dwkn04", href: "https://www.tiktok.com/@dwkn04", icon: CirclePlay },
  { name: "Instagram", value: "@ddk.04_", href: "https://www.instagram.com/ddk.04_", icon: Instagram },
  { name: "Telegram", value: "meta5757", href: "https://t.me/meta5757", icon: Send },
  { name: "Locket", value: "dag_hkoa", href: "https://locket.cam/dag_hkoa", icon: LockKeyhole },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Đào Đăng Khoa — Personal Portfolio 2026" },
      { name: "description", content: "Portfolio cá nhân của Đào Đăng Khoa — digital craft, selected builds và hành trình phát triển." },
      { property: "og:title", content: "Đào Đăng Khoa — Personal Portfolio 2026" },
      { property: "og:description", content: "Precision, digital craft and premium systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 26, filter: "blur(7px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .18 }} transition={{ duration: .7, delay, ease: [0.2, 0.8, 0.2, 1] }}>{children}</motion.div>;
}

function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: .4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: .07 } } }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "115%", rotate: 4, filter: "blur(6px)" },
              show: { y: "0%", rotate: 0, filter: "blur(0px)", transition: { duration: .7, ease: [0.2, 0.8, 0.2, 1] } },
            }}
          >{w}{i < words.length - 1 ? "\u00a0" : ""}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function SectionHead({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="relative mb-10 md:mb-16">
      <span aria-hidden className="section-watermark">{index}</span>
      <div className="relative flex items-end justify-between border-b border-border pb-5">
        <div>
          <Reveal><p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.22em] text-ice backdrop-blur-sm"><span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />{label}</p></Reveal>
          <h2 className="font-display text-4xl font-semibold uppercase leading-[.95] tracking-[-0.015em] md:text-6xl"><WordReveal text={title} /></h2>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground sm:block">{index} / 06</span>
      </div>
    </div>
  );
}


const faqs = [
  ["Khoa tập trung vào điều gì?", "Digital craft, hiệu năng và những hệ thống có chủ đích.", "Focus"],
  ["Kỹ năng chính là gì?", "Python, HTML/CSS, JavaScript và Node.js.", "Stack"],
  ["Có thể xem sản phẩm ở đâu?", "Tại khu vực Selected Builds với liên kết trực tiếp đến từng dự án.", "Work"],
  ["Khoa đang ở đâu?", "Vietnam — múi giờ GMT+7.", "Base"],
  ["Thời gian phản hồi?", "Sẽ phản hồi khi tỉnh ngủ, thường trong vòng 24 giờ.", "Reply"],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-3">
      {faqs.map(([q, a, tag], i) => {
        const active = open === i;
        return (
          <Reveal key={q}>
            <div
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className={`spotlight-card glass-panel overflow-hidden rounded-lg transition-all duration-500 ${active ? "border-primary/60 shadow-[var(--shadow-blue)]" : "hover:border-primary/40"}`}
            >
              <button
                onClick={() => setOpen(active ? null : i)}
                aria-expanded={active}
                className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7"
              >
                <span className={`font-mono text-[10px] tracking-[.2em] transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}>0{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold uppercase tracking-[.2em] text-muted-foreground">{tag}</span>
                  <span className="mt-1 block font-display text-base font-medium md:text-lg">{q}</span>
                </span>
                <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${active ? "rotate-45 border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
                  <span className="absolute h-3 w-px bg-current" /><span className="absolute h-px w-3 bg-current" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .38, ease: [0.2, 0.8, 0.2, 1] }}>
                    <div className="px-5 pb-6 pl-[3.4rem] md:px-7 md:pl-[4.2rem]">
                      <div className="h-px w-full bg-gradient-to-r from-primary/60 to-transparent" />
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [active, setActive] = useState("HOME");
  const reduced = useReducedMotion();
  const { theme, toggle } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: .3 });
  const heroY = useTransform(scrollYProgress, [0, .18], [0, reduced ? 0 : 100]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => {
    const sections = nav.map((item) => document.getElementById(item.toLowerCase())).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id.toUpperCase());
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, .2, .6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  const go = (id: string) => { setMenuOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); };
  const copyMail = async () => { try { await navigator.clipboard.writeText("ineedmoney5757@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ } };
  const copyValue = async (name: string, value: string) => { try { await navigator.clipboard.writeText(value); setCopiedItem(name); setTimeout(() => setCopiedItem(null), 1800); } catch { /* ignore */ } };


  return <main className="relative overflow-hidden bg-background">
    <div className="loading-screen fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none">
      <div aria-hidden className="absolute inset-0 opacity-[0.12] fine-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <span aria-hidden className="loader-glow absolute h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />
      <span aria-hidden className="loader-corner absolute left-5 top-5 h-5 w-5 border-l border-t border-ice/50" />
      <span aria-hidden className="loader-corner absolute right-5 top-5 h-5 w-5 border-r border-t border-ice/50" />
      <span aria-hidden className="loader-corner absolute bottom-5 left-5 h-5 w-5 border-b border-l border-ice/50" />
      <span aria-hidden className="loader-corner absolute bottom-5 right-5 h-5 w-5 border-b border-r border-ice/50" />
      <div className="relative flex flex-col items-center">
        <div className="overflow-hidden font-display text-7xl font-bold leading-none tracking-tight md:text-8xl">
          <span className="loader-letter inline-block">D</span><span className="loader-letter loader-letter-b inline-block chrome-text">K</span><span className="loader-letter inline-block text-primary">.</span>
        </div>
        <div className="mt-8 h-px w-56 overflow-hidden bg-border"><div className="loading-bar h-full bg-gradient-to-r from-primary via-ice to-primary" /></div>
        <div className="loader-meta mt-4 flex w-56 items-center justify-between font-mono text-[9px] uppercase tracking-[.24em] text-muted-foreground"><span>Đào Đăng Khoa</span><span className="text-ice">Portfolio · 2026</span></div>
      </div>
    </div>
    <div aria-hidden className="aurora-bg pointer-events-none fixed inset-0 z-0">
      <span className="aurora-blob aurora-a" /><span className="aurora-blob aurora-b" /><span className="aurora-blob aurora-c" />
      <span className="aurora-noise" />
    </div>
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.14] fine-grid [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
    <div aria-hidden className="bg-texture pointer-events-none fixed inset-0 z-0 opacity-[0.28] [mask-image:radial-gradient(ellipse_at_50%_35%,black,transparent_80%)]" />
    <CursorGlow />
    <motion.div aria-hidden className="fixed left-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-primary via-ice to-primary" style={{ scaleX: progress, width: "100%" }} />

    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-1.5" : "py-4"}`}>
      <div className={`page-shell flex items-center justify-between rounded-md px-4 transition-all duration-500 ${scrolled ? "glass-panel h-12 shadow-[var(--glow-soft)]" : "h-14 border border-transparent bg-transparent"}`}>
        <button onClick={() => go("home")} className="font-display text-sm font-bold tracking-[.14em]" aria-label="Về đầu trang">DDK<span className="text-primary">.</span></button>
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-6 lg:flex">{nav.map((item) => <button key={item} onClick={() => go(item)} data-active={active === item} aria-current={active === item ? "true" : undefined} className={`nav-link text-[9px] font-semibold tracking-[.18em] transition-colors ${active === item ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</nav>
        <div className="ctl-cluster">
          <MusicToggle />
          <ThemeToggle theme={theme} toggle={toggle} />
          <span aria-hidden className="ctl-divider lg:hidden" />
          <button className="ctl-btn lg:hidden" aria-label="Mở menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu size={15} /></button>

        </div>
      </div>
    </header>

    <AnimatePresence>{menuOpen && <motion.div className="fixed inset-0 z-[80] flex flex-col bg-background p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="flex justify-between"><span className="font-display font-bold">DDK.</span><Button variant="glass" size="icon" aria-label="Đóng menu" onClick={() => setMenuOpen(false)}><X /></Button></div><nav className="my-auto flex flex-col gap-6">{nav.map((item, index) => <motion.button key={item} onClick={() => go(item)} className="flex items-center gap-4 text-left font-display text-3xl font-semibold" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .04 }}><span className="text-xs text-primary">0{index}</span>{item}</motion.button>)}</nav><a className="text-sm text-muted-foreground" href="mailto:ineedmoney5757@gmail.com">ineedmoney5757@gmail.com</a></motion.div>}</AnimatePresence>


    <section id="home" className="relative min-h-[94svh] pt-24">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_66%_40%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_28%),radial-gradient(circle_at_30%_80%,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_30%)]" />
      <div className="page-shell relative grid min-h-[calc(94svh-6rem)] items-center gap-6 pb-10 lg:grid-cols-12">
        <motion.div className="relative z-10 pt-8 lg:col-span-7" initial={{ y: 30 }} animate={{ y: 0 }} transition={{ delay: .2, duration: .8 }}>
          <div className="mb-8 flex items-center gap-4"><span className="section-label">Portfolio / 2026</span><span className="h-px w-16 bg-primary" /></div>
          <h1 className="font-display text-[clamp(3.25rem,10vw,8.8rem)] font-semibold uppercase leading-[.85] tracking-[-0.02em]">Đào Đăng<br/><span className="text-transparent [-webkit-text-stroke:1px_var(--color-silver)]">Khoa</span></h1>
          <p className="mt-8 font-display text-xl font-medium text-ice md:text-2xl">Code fast. Think different. Stay asleep.</p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Personal portfolio inspired by precision, digital craft and premium systems.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Magnetic><Button variant="premium" size="lg" className="btn-shine min-h-11" onClick={() => go("journey")}>Khám phá hành trình <ArrowDown /></Button></Magnetic>
            <Magnetic><Button variant="glass" size="lg" className="btn-shine min-h-11" onClick={() => go("projects")}>Xem dự án <ArrowUpRight /></Button></Magnetic>
          </div>
        </motion.div>
        <motion.div style={{ y: heroY }} className="relative min-h-[24rem] lg:col-span-5 lg:min-h-[38rem]">
          <div aria-hidden className="absolute inset-[8%] rounded-full bg-primary/20 blur-3xl" />
          <HeroIdentity
            fallback={
              <img src={machinePoster} alt="Biểu tượng nhận diện số DK dạng kính xanh" width={1600} height={1200} fetchPriority="high" className="hero-object absolute inset-0 h-full w-full object-contain mix-blend-screen" />
            }
          />
          <div className="glass-panel absolute right-0 top-8 rounded-md px-4 py-3"><p className="section-label">System online</p><p className="mt-1 font-mono text-[10px] text-muted-foreground">DK · DIGITAL IDENTITY</p></div>
          <div className="glass-panel absolute bottom-7 left-0 flex items-center gap-4 rounded-md px-4 py-3"><span className="pulse-dot h-2 w-2 rounded-full bg-primary"/><div><p className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">Performance portfolio</p><p className="mt-1 text-xs">01 / 06 · DIGITAL ATELIER</p></div></div>
        </motion.div>

      </div>
    </section>

    <div aria-hidden className="relative overflow-hidden border-y border-border bg-surface/40 py-4"><div className="marquee-track gap-10 whitespace-nowrap">{[...marquee, ...marquee].map((word, i) => <span key={`${word}-${i}`} className="flex items-center gap-10 font-mono text-[10px] uppercase tracking-[.28em] text-muted-foreground">{word}<span className="h-1 w-1 rounded-full bg-primary" /></span>)}</div></div>



    <section id="machine" className="relative border-y border-border bg-surface/30 py-24 md:py-32"><div className="page-shell grid items-center gap-12 lg:grid-cols-2">
      <Reveal className="relative aspect-square overflow-hidden rounded-lg border border-border bg-background/60"><div aria-hidden className="absolute inset-0 opacity-[0.12] fine-grid"/><div aria-hidden className="absolute inset-x-[10%] bottom-[-20%] h-2/3 rounded-full bg-primary/20 blur-3xl"/><WorkspaceScene/><span className="absolute left-5 top-5 section-label">Control system / live</span></Reveal>
      <Reveal><p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.22em] text-ice backdrop-blur-sm"><span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />Manifesto</p><h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-tight md:text-6xl"><WordReveal text="Precision is not a feature." /> <span className="text-primary"><WordReveal text="It is the standard." /></span></h2><div className="mt-10 divide-y divide-border border-y border-border">{[["POWER","CODE"],["FOCUS","INTJ-T"],["LOCATION","VIETNAM"],["STATUS","SLEEP MODE"]].map(([a,b])=><div key={a} className="flex justify-between py-4 text-xs tracking-[.18em]"><span className="text-muted-foreground">{a}</span><span>{b}</span></div>)}</div></Reveal>
    </div></section>

    <section id="about" className="py-24 md:py-32"><div className="page-shell"><SectionHead index="01" label="Identity" title="About"/><div className="grid gap-6 lg:grid-cols-12"><Reveal className="glass-panel rounded-lg p-5 md:p-8 lg:col-span-8"><div className="mb-7 flex justify-between"><p className="section-label">Profile / Identity</p><p className="font-mono text-[9px] text-muted-foreground">CURRENT MODE · RESTING</p></div><dl className="grid sm:grid-cols-2">{profile.map(([label,value],i)=><div key={label} className={`border-border py-4 ${i%2===0?"sm:border-r sm:pr-5":"sm:pl-5"} ${i<profile.length-2?"border-b":""}`}><dt className="text-[9px] font-bold tracking-[.18em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-base font-medium">{value}</dd></div>)}</dl></Reveal><Reveal className="relative overflow-hidden rounded-lg border border-border bg-primary p-7 text-primary-foreground lg:col-span-4"><p className="text-[10px] font-bold uppercase tracking-[.2em] opacity-70">Current mode</p><p className="mt-28 font-display text-5xl font-semibold leading-none">Đang ngủ<br/>gật.</p><div className="mt-8 h-px bg-primary-foreground/30"/><p className="mt-5 text-sm leading-7 opacity-80">Một hồ sơ tối giản: chính xác trong cách xây dựng, tỉnh táo trong lựa chọn và luôn dành chỗ cho một giấc ngủ.</p></Reveal></div></div></section>

    <section id="skills" className="border-y border-border bg-surface/25 py-24 md:py-32"><div className="page-shell"><SectionHead index="02" label="Core system" title="Skills"/><div className="grid gap-4 md:grid-cols-2">{skills.map((skill,index)=><Reveal key={skill.name}><TiltCard><article className="group spotlight-card glass-panel rounded-lg p-6 transition duration-500 hover:border-primary/60 hover:shadow-[var(--shadow-blue)]"><div className="flex items-start justify-between"><div><p className="section-label">0{index+1} / Active</p><h3 className="mt-4 font-display text-3xl font-semibold">{skill.name}</h3></div><span className="font-mono text-2xl text-ice">{skill.level}%</span></div><p className="mt-5 text-sm text-muted-foreground">{skill.desc}</p><div className="mt-8 h-px overflow-hidden bg-border"><motion.div className="h-full bg-primary" initial={{width:0}} whileInView={{width:`${skill.level}%`}} viewport={{once:true}} transition={{duration:1,delay:index*.08}}/></div><p className="mt-4 font-mono text-[10px] uppercase tracking-[.12em] text-silver">{skill.tech}</p></article></TiltCard></Reveal>)}</div></div></section>

    <section id="projects" className="py-24 md:py-32"><div className="page-shell"><SectionHead index="03" label="Archive" title="Projects"/><div className="grid gap-5 md:grid-cols-12">{projects.map((p)=><Reveal key={p.no} className={p.tone}><a href={p.url} target="_blank" rel="noopener noreferrer" className="project-card group relative block overflow-hidden rounded-lg border border-border bg-card"><div className="relative aspect-[16/11] overflow-hidden"><img src={p.image} alt={`Ảnh xem trước dự án ${p.title}`} width={1280} height={1800} loading="lazy" className="h-full w-full object-cover object-top opacity-70 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-90"/><div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"/><span className="absolute left-5 top-5 font-mono text-xs text-ice">{p.no}</span></div><div className="relative -mt-14 p-5 md:p-7"><div className="h-px w-10 bg-primary transition-all duration-500 group-hover:w-full"/><h3 className="mt-5 font-display text-2xl font-semibold md:text-3xl">{p.title}</h3><div className="mt-3 flex items-center justify-between"><p className="text-sm text-muted-foreground">{p.desc}</p><span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em]">View project <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={15}/></span></div></div></a></Reveal>)}</div></div></section>

    <section id="journey" className="border-y border-border bg-surface/25 py-24 md:py-32"><div className="page-shell"><SectionHead index="04" label="Live status" title="Journey"/><div className="relative grid gap-4 md:grid-cols-3 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-border md:before:left-0 md:before:top-5 md:before:h-px md:before:w-full">{[["2024–2025","Giai đoạn 1","Ngủ"],["2025–2026","Giai đoạn 2","Ngủ"],["2026–Hiện tại","Đang diễn ra","Vẫn Ngủ"]].map(([year,phase,state],i)=><Reveal key={year} className="relative pl-12 md:pl-0 md:pt-12"><span className={`absolute left-[1.05rem] top-5 h-2 w-2 rounded-full md:left-0 md:top-[1.05rem] ${i===2?"pulse-dot bg-primary":"bg-silver"}`}/><article className="glass-panel min-h-44 rounded-lg p-6"><p className="section-label">{year}</p><p className="mt-8 text-xs uppercase tracking-[.16em] text-muted-foreground">{phase}</p><h3 className="mt-2 font-display text-3xl font-semibold">{state}</h3>{i===2&&<p className="mt-4 font-mono text-[9px] uppercase tracking-[.18em] text-primary">Current phase · online</p>}</article></Reveal>)}</div></div></section>

    <section id="faq" className="relative py-24 md:py-32"><div className="page-shell max-w-4xl"><SectionHead index="05" label="Notes" title="FAQ"/><Faq/></div></section>

    <section id="contact" className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_32%)]"/>
      <div aria-hidden className="bg-beam" />
      <div className="page-shell relative">
        <SectionHead index="06" label="Get in touch" title="Contact"/>

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="glass-panel spotlight-card relative flex h-full flex-col overflow-hidden rounded-xl p-6 md:p-8 lg:sticky lg:top-24"
                 onMouseMove={(e)=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--mx",`${e.clientX-r.left}px`);e.currentTarget.style.setProperty("--my",`${e.clientY-r.top}px`);}}>
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.1] fine-grid"/>
              <p className="relative inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.18em] text-ice">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary"/> Available · phản hồi trong 24h
              </p>
              <h3 className="relative mt-6 text-balance font-display text-3xl font-semibold leading-[1.05] md:text-4xl">Gửi ý tưởng,<br/>phần còn lại để tôi lo.</h3>
              <p className="relative mt-4 text-sm leading-7 text-muted-foreground">Một dòng tin nhắn là đủ để bắt đầu. Email là kênh chính, các nền tảng khác nằm bên cạnh.</p>

              <div className="relative mt-7 rounded-lg border border-border bg-background/40 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground">Primary channel</p>
                <p className="mt-2 break-all font-display text-base font-medium md:text-lg">ineedmoney5757@gmail.com</p>
              </div>
              <div className="relative mt-4 flex flex-col gap-3 sm:flex-row">
                <Magnetic className="w-full sm:w-auto"><Button variant="premium" size="lg" asChild className="btn-shine min-h-11 w-full sm:w-auto"><a href="mailto:ineedmoney5757@gmail.com">Mở mail <ArrowUpRight/></a></Button></Magnetic>
                <Magnetic className="w-full sm:w-auto"><Button variant="glass" size="lg" className="btn-shine min-h-11 w-full sm:w-auto" onClick={copyMail} aria-label="Sao chép email">{copied ? <><Check/> Đã sao chép</> : <><Copy/> Copy email</>}</Button></Magnetic>
              </div>
              <p aria-live="polite" className="relative mt-3 min-h-4 font-mono text-[9px] uppercase tracking-[.16em] text-primary">{copied ? "Email đã được sao chép" : ""}</p>

              <div className="relative mt-auto grid grid-cols-3 gap-3 border-t border-border pt-6 text-center">
                {[["07","Kênh"],["24h","Phản hồi"],["+7","Múi giờ"]].map(([a,b])=><div key={b}><p className="font-display text-xl font-semibold text-primary md:text-2xl">{a}</p><p className="mt-1 text-[9px] uppercase tracking-[.14em] text-muted-foreground">{b}</p></div>)}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="glass-panel overflow-hidden rounded-xl">
              <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-7">
                <p className="section-label">Channels / 07</p>
                <p className="font-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground">Tap để mở · copy bên phải</p>
              </div>
              <ul className="divide-y divide-border">
                {socials.map(({name,value,href,icon:Icon,external=true},i)=>(
                  <li key={name}>
                    <Reveal delay={i*.03}>
                      <div className="group relative flex items-center gap-3 px-4 py-4 transition-colors hover:bg-primary/5 md:gap-5 md:px-7">
                        <span className="hidden w-6 shrink-0 font-mono text-[10px] text-muted-foreground sm:block">0{i+1}</span>
                        <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon size={15}/></span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[9px] font-bold uppercase tracking-[.18em] text-muted-foreground">{name}</span>
                          <a href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined} className="mt-0.5 block truncate text-sm after:absolute after:inset-0 after:content-['']">
                            {value}
                          </a>
                        </span>
                        <ArrowUpRight aria-hidden size={15} className="hidden shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block"/>
                        <button type="button" onClick={()=>copyValue(name,value)} aria-label={`Sao chép ${name}`}
                                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary">
                          {copiedItem===name ? <Check size={14}/> : <Copy size={14}/>}
                        </button>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
            <p aria-live="polite" className="mt-3 min-h-4 font-mono text-[9px] uppercase tracking-[.16em] text-primary">{copiedItem ? `${copiedItem} đã được sao chép` : ""}</p>
          </div>
        </div>

      </div>
    </section>


    <footer className="border-t border-border py-8"><div className="page-shell flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-end md:justify-between"><div><p className="font-display text-lg font-semibold text-foreground">Đào Đăng Khoa</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[.16em]">Personal Portfolio / 2026</p></div><p>Built with code, caffeine and questionable sleep schedule.</p></div></footer>
    
    <button onClick={() => go("home")} aria-label="Lên đầu trang" className={`glass-panel fixed bottom-5 right-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-all duration-500 hover:scale-105 md:bottom-6 ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}><ArrowUp size={16}/></button>

  </main>;
}
