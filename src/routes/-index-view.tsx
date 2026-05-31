import { useEffect, useState } from "react";
import { Command, Home, Bot, BarChart2, ShoppingBag, type LucideIcon } from "lucide-react";

import bgAiSpace from "@/assets/bg-ai-space.png";
import brain from "@/assets/brain.png";
import anna from "@/assets/anna.png";
import alex from "@/assets/alex.png";
import sofia from "@/assets/sofia.png";
import leo from "@/assets/leo.png";
import maya from "@/assets/maya.png";

import { AssistantCard } from "@/components/life-os/AssistantCard";

const spaces: { icon: LucideIcon; title: string; description: string; tags: string[] }[] = [
  {
    icon: Home,
    title: "Daria Home",
    description: "Особистий простір — нотатки, ідеї, фокус і планування твого ритму.",
    tags: ["нотатки", "ідеї", "фокус", "планування"],
  },
  {
    icon: Bot,
    title: "Life with AI",
    description: "Контент, Instagram, навчання з AI і тренди — усе в одному просторі.",
    tags: ["контент", "Instagram", "AI", "тренди"],
  },
  {
    icon: BarChart2,
    title: "Trading OS",
    description: "Торговий бот, сигнали, контроль ризиків і звіти по ринку.",
    tags: ["бот", "сигнали", "ризики", "звіти"],
  },
  {
    icon: ShoppingBag,
    title: "Bianca OS",
    description: "Bianca Mobilya, BohoConcept, продажі, Shopify і ліди.",
    tags: ["Shopify", "продажі", "ліди", "BohoConcept"],
  },
];

const teamReport = [
  {
    name: "Anna",
    role: "Контент і маркетинг",
    status: "Контент-план: 40%",
    progress: 40,
    initial: "А",
  },
  {
    name: "Alex",
    role: "Бізнес",
    status: "Нові можливості: 2 знайдено",
    progress: null,
    initial: "Ax",
  },
  {
    name: "Sofia",
    role: "Особистий асистент",
    status: "Задачі на день: 3 активні",
    progress: null,
    initial: "С",
  },
  {
    name: "Brain",
    role: "Головний координатор",
    status: "Фокус дня готовий",
    progress: null,
    initial: "B",
  },
];

const assistants = [
  { name: "Brain", role: "Головний координатор", image: brain, accent: "neutral" as const,
    actions: ["Мій фокус", "План на день", "Підсумок дня"] },
  { name: "Anna", role: "Контент і маркетинг", image: anna, accent: "warm" as const,
    actions: ["Зроби допис", "Ідея для рілс", "План на тиждень"] },
  { name: "Alex", role: "Бізнес", image: alex, accent: "cool" as const,
    actions: ["Нові можливості", "Перевір Shopify", "План продажів"] },
  { name: "Sofia", role: "Особистий асистент", image: sofia, accent: "cool" as const,
    actions: ["Мої задачі", "Нагадати", "План тижня"] },
  { name: "Leo", role: "Фінанси і трейдинг", image: leo, accent: "neutral" as const,
    actions: ["Trading status", "Фінансовий звіт", "Контроль витрат"] },
  { name: "Maya", role: "Сім'я", image: maya, accent: "warm" as const,
    actions: ["Аліса", "Сімейний календар", "Події"] },
];

export function LifeOS() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgAiSpace})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

      <div className="relative max-w-[1380px] mx-auto px-5 md:px-10 pt-6 pb-24">
        {/* header */}
        <header className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-2xl glass-solid grid place-items-center">
              <div className="h-2.5 w-2.5 rounded-sm rotate-45" style={{ background: "var(--gradient-espresso)" }} />
            </div>
            <div className="leading-none">
              <p className="font-display text-xl text-foreground">Life OS</p>
              <p className="label-premium mt-1.5">
                персональний AI-простір
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 rounded-full glass-solid px-1.5 py-1.5 text-[12.5px]">
            {["Сьогодні", "Команда", "Простір", "Звіти"].map((l, i) => (
              <a key={l} href="#"
                className={`px-4 py-2 rounded-full transition ${
                  i === 0
                    ? "btn-espresso"
                    : "text-foreground/65 hover:text-foreground hover:bg-foreground/[0.04]"
                }`}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 rounded-full btn-glass pl-3 pr-2 py-1.5 text-[11.5px] text-muted-foreground">
              <Command className="h-3 w-3" strokeWidth={1.6} /> пошук
              <span className="rounded-md bg-foreground/5 px-1.5 py-0.5 text-[9.5px] font-mono">⌘K</span>
            </button>
            <div className="flex items-center gap-2.5 rounded-full glass-solid pl-1.5 pr-3.5 py-1.5">
              <div className="h-7 w-7 rounded-full grid place-items-center text-xs font-medium"
                style={{ background: "var(--gradient-espresso)", color: "oklch(0.97 0.002 240)" }}>Д</div>
              <div className="hidden sm:block leading-none">
                <p className="text-[11.5px] font-medium">Дарія</p>
                <p className="text-[9.5px] text-muted-foreground mt-1 min-h-[10px]">{time ? `${time} · Київ` : "Київ"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* hero */}
        <section className="grid lg:grid-cols-[3fr_2fr] gap-8 mb-12 items-end">
          <div className="relative rounded-[36px] p-10 md:p-16 overflow-hidden glass-lift">
            <div aria-hidden className="absolute inset-0 bg-aurora opacity-70" />
            <div aria-hidden className="absolute inset-0 noise opacity-50" />

            <div className="relative">
              <p className="label-premium inline-flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-foreground/20" />
                Добрий ранок, Дарія
              </p>
              <h1 className="font-display text-[2.75rem] md:text-[5rem] leading-[1.02] text-foreground text-balance">
                Твій особистий<br />
                <span className="italic" style={{ color: "var(--taupe)" }}>цифровий офіс</span>
              </h1>
              <p className="mt-8 max-w-md text-[15px] text-muted-foreground leading-relaxed">
                Що сьогодні важливо для тебе? Команда поруч — обери, з чого почати ранок.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <button className="rounded-full btn-espresso px-6 py-3.5 text-[13px] font-medium">
                  Запитати команду
                </button>
                <button className="rounded-full btn-glass px-6 py-3.5 text-[13px] font-medium text-foreground">
                  Сьогоднішній фокус
                </button>
              </div>
            </div>

            {/* decorative arc */}
            <svg aria-hidden className="absolute -bottom-20 -right-10 w-[420px] h-[420px] opacity-20" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="180" fill="none" stroke="oklch(0.7 0.006 250)" strokeWidth="0.6" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="oklch(0.76 0.005 248)" strokeWidth="0.6" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="oklch(0.7 0.006 250)" strokeWidth="0.6" />
            </svg>
          </div>

          {/* minimal right caption — background shows through */}
          <div className="hidden lg:flex flex-col justify-end pb-14 pl-4">
            <p className="label-premium leading-[3.2] text-foreground/30">
              Менше шуму.<br />Більше фокусу.
            </p>
          </div>
        </section>

        {/* team report */}
        <section className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <p className="label-premium">Звіт команди</p>
            <span className="h-px flex-1 bg-foreground/[0.06]" />
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> оновлено зараз
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamReport.map(({ name, role, status, progress, initial }) => (
              <div key={name} className="glass rounded-[20px] px-5 py-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full glass-solid grid place-items-center text-[11px] font-medium text-foreground/70 shrink-0">
                    {initial}
                  </div>
                  <div className="leading-none min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{name}</p>
                    <p className="text-[10.5px] text-muted-foreground mt-0.5 truncate">{role}</p>
                  </div>
                </div>
                <p className="text-[12.5px] text-foreground/75">{status}</p>
                {progress !== null && (
                  <div className="h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, oklch(0.87 0.005 245), oklch(0.72 0.008 252))",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* team header */}
        <section className="mb-8 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="label-premium mb-3">Твоя команда</p>
            <h2 className="font-display text-[2.25rem] md:text-[3rem] leading-[1.05] text-foreground text-balance">
              Шість асистентів. <span className="italic" style={{ color: "var(--taupe)" }}>Один ритм.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[13.5px] text-muted-foreground leading-relaxed">
            Кожен веде свою сферу — від трейдингу до сім'ї. Запитай будь-кого однією дією.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {assistants.map((a, i) => (
            <AssistantCard key={a.name} {...a} index={i} />
          ))}
        </section>

        {/* my spaces */}
        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="label-premium mb-3">Мої простори</p>
              <h2 className="font-display text-[2.25rem] md:text-[3rem] leading-[1.05] text-foreground text-balance">
                Чотири простори. <span className="italic" style={{ color: "var(--taupe)" }}>Один всесвіт.</span>
              </h2>
            </div>
            <p className="max-w-xs text-[13.5px] text-muted-foreground leading-relaxed">
              Окремий простір для кожної сфери життя. Переходь у будь-який одним кліком.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {spaces.map(({ icon: Icon, title, description, tags }) => (
              <div key={title} className="glass-lift rounded-[28px] p-7 flex flex-col gap-5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1.5">
                {/* icon */}
                <div className="h-11 w-11 rounded-2xl glass-solid grid place-items-center">
                  <Icon className="h-5 w-5 text-foreground/65" strokeWidth={1.5} />
                </div>

                {/* title + description */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-display text-[1.55rem] leading-tight text-foreground">{title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{description}</p>
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground/70 rounded-full px-2.5 py-1 hairline">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* footer row */}
                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                    Скоро
                  </span>
                  <button className="rounded-full btn-glass px-5 py-2 text-[12px] font-medium text-foreground/80">
                    Відкрити
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-10 mt-10 border-t border-foreground/[0.06] flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>Life OS · персональний простір Дарії</p>
          <p>v2 · liquid glass редизайн</p>
        </footer>
      </div>
    </div>
  );
}
