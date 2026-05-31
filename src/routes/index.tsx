import { createFileRoute } from "@tanstack/react-router";
import { ListTodo, NotebookPen, Sparkles, TrendingUp, BellRing } from "lucide-react";

import brain from "@/assets/brain.png";
import anna from "@/assets/anna.png";
import alex from "@/assets/alex.png";
import sofia from "@/assets/sofia.png";
import leo from "@/assets/leo.png";
import maya from "@/assets/maya.png";

import { AssistantCard } from "@/components/life-os/AssistantCard";
import { TodayBlock } from "@/components/life-os/TodayBlock";
import { QuickTile } from "@/components/life-os/QuickTile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Life OS — Особистий цифровий простір Дарії" },
      {
        name: "description",
        content:
          "Life OS — спокійний і чіткий персональний AI-простір. Команда асистентів, фокус дня, нотатки і нагадування в одному місці.",
      },
      { property: "og:title", content: "Life OS — Особистий цифровий простір" },
      {
        property: "og:description",
        content: "Персональний AI-простір. Не CRM, не офіс — твоя команда, твій ритм.",
      },
    ],
  }),
  component: LifeOS,
});

const assistants = [
  {
    name: "Brain",
    role: "Головний координатор",
    image: brain,
    accent: "cool" as const,
    actions: ["Мій фокус", "План на день", "Підсумок дня"],
  },
  {
    name: "Anna",
    role: "Контент і маркетинг",
    image: anna,
    accent: "warm" as const,
    actions: ["Зроби допис", "Ідея для рілс", "План на тиждень"],
  },
  {
    name: "Alex",
    role: "Бізнес",
    image: alex,
    accent: "cool" as const,
    actions: ["Нові можливості", "Перевір Shopify", "План продажів"],
  },
  {
    name: "Sofia",
    role: "Особистий асистент",
    image: sofia,
    accent: "warm" as const,
    actions: ["Мої задачі", "Нагадати", "План тижня"],
  },
  {
    name: "Leo",
    role: "Фінанси і трейдинг",
    image: leo,
    accent: "cool" as const,
    actions: ["Trading status", "Фінансовий звіт", "Контроль витрат"],
  },
  {
    name: "Maya",
    role: "Сім'я",
    image: maya,
    accent: "warm" as const,
    actions: ["Аліса", "Сімейний календар", "Події"],
  },
];

function LifeOS() {
  const now = new Date();
  const time = now.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="relative min-h-screen overflow-hidden bg-warm">
      {/* abstract ambient layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, oklch(0.92 0.04 240 / 0.7), transparent 70%)" }} />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, oklch(0.94 0.025 80 / 0.8), transparent 70%)" }} />
        <div className="absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, oklch(0.88 0.03 250 / 0.6), transparent 70%)" }} />
      </div>

      {/* floating UI deco */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-32 right-[8%] h-20 w-20 rounded-2xl glass float-soft" style={{ animationDelay: "0s" }} />
        <div className="absolute top-[55%] left-[4%] h-14 w-32 rounded-full glass float-soft" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[18%] left-[10%] h-3 w-3 rounded-full bg-cool/60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-8 pb-24">
        {/* header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-xl glass flex items-center justify-center">
              <div className="h-3 w-3 rounded-sm bg-foreground" />
            </div>
            <div>
              <p className="font-display text-xl leading-none">Life OS</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                персональний простір
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 rounded-full glass px-2 py-1.5 text-sm">
            {["Сьогодні", "Команда", "Простір", "Звіти"].map((l, i) => (
              <a
                key={l}
                href="#"
                className={`px-4 py-1.5 rounded-full transition ${
                  i === 0 ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 rounded-full glass pl-2 pr-4 py-1.5">
            <div className="h-7 w-7 rounded-full bg-foreground text-background grid place-items-center text-xs font-medium">
              Д
            </div>
            <div className="hidden sm:block leading-none">
              <p className="text-xs font-medium">Дарія</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{time} · Київ</p>
            </div>
          </div>
        </header>

        {/* hero greeting */}
        <section className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mb-10">
          <div className="rounded-[32px] p-10 md:p-14 relative overflow-hidden glass-lift">
            <div aria-hidden className="absolute inset-0 bg-holo opacity-70" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6">
                <span className="h-px w-8 bg-foreground/30" />
                Добрий ранок
              </p>
              <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[1.02] text-balance">
                Дарія,<br />твій особистий<br />
                <span className="italic text-cool">цифровий офіс</span> готовий.
              </h1>
              <p className="mt-8 max-w-lg text-base text-muted-foreground leading-relaxed">
                Спокійне місце для роботи, фінансів, контенту і сім'ї. Команда поруч —
                просто скажи, з чого почати сьогодні.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition">
                  Запитати команду
                </button>
                <button className="rounded-full glass px-6 py-3 text-sm font-medium hover:bg-card transition">
                  Сьогоднішній фокус
                </button>
              </div>
            </div>
          </div>

          {/* live status panel */}
          <div className="rounded-[32px] glass-lift p-8 flex flex-col gap-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Простір</p>
              <span className="text-[10px] text-muted-foreground">live</span>
            </div>

            <div className="space-y-5 flex-1">
              {[
                { k: "Енергія", v: "ясна", bar: 78, tone: "cool" },
                { k: "Команда", v: "6 готові", bar: 100, tone: "warm" },
                { k: "Фокус", v: "глибокий", bar: 64, tone: "cool" },
                { k: "Календар", v: "вільно до 14:00", bar: 40, tone: "warm" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-foreground/80">{s.k}</span>
                    <span className="text-xs text-muted-foreground">{s.v}</span>
                  </div>
                  <div className="h-1 rounded-full bg-foreground/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.bar}%`,
                        background:
                          s.tone === "cool"
                            ? "linear-gradient(90deg, oklch(0.72 0.06 240), oklch(0.55 0.04 245))"
                            : "linear-gradient(90deg, oklch(0.85 0.03 80), oklch(0.55 0.025 60))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-foreground/[0.04] hairline p-4">
              <p className="text-xs text-muted-foreground mb-1">Поточна цитата дня</p>
              <p className="font-display text-lg leading-snug">
                «Менше шуму. Більше присутності.»
              </p>
            </div>
          </div>
        </section>

        {/* today */}
        <div className="mb-16">
          <TodayBlock />
        </div>

        {/* team section header */}
        <section className="mb-8 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3">
              Твоя команда
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground text-balance">
              Шість асистентів. <span className="italic text-cool">Один ритм.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Кожен веде свою сферу — від трейдингу до сім'ї. Запитай будь-кого однією дією.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {assistants.map((a) => (
            <AssistantCard key={a.name} {...a} />
          ))}
        </section>

        {/* bottom modules */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-3xl md:text-4xl">Твій простір</h2>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Усі модулі →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <QuickTile
              icon={ListTodo}
              title="Швидкі задачі"
              preview="4 нові · 2 завершені сьогодні"
              meta="задачі"
            />
            <QuickTile
              icon={NotebookPen}
              title="Нотатки"
              preview="Останнє: ідея для подкасту з Анною"
              meta="думки"
            />
            <QuickTile
              icon={Sparkles}
              title="Life with AI"
              preview="Щоденник, рефлексії, м'які підказки"
              meta="ритуал"
            />
            <QuickTile
              icon={TrendingUp}
              title="Trading"
              preview="Лео: ринок спокійний, +1.4% за тиждень"
              meta="ринок"
            />
            <QuickTile
              icon={BellRing}
              title="Нагадування"
              preview="Подзвонити Алісі о 17:30"
              meta="скоро"
            />
          </div>
        </section>

        <footer className="pt-12 mt-12 border-t border-foreground/5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>Life OS · персональний простір Дарії</p>
          <p>v1 · перший візуальний реліз</p>
        </footer>
      </div>
    </div>
  );
}
