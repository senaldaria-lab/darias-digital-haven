import { useEffect, useState } from "react";
import { CheckCircle2, Heart, Briefcase, Clock } from "lucide-react";

const items = [
  { icon: CheckCircle2, label: "3 важливі задачі", meta: "сьогодні", tone: "default" },
  { icon: Heart, label: "1 особистий фокус", meta: "для себе", tone: "warm" },
  { icon: Briefcase, label: "1 бізнес-фокус", meta: "стратегія", tone: "cool" },
  { icon: Clock, label: "1 незавершена справа", meta: "перенесено", tone: "muted" },
];

export function TodayBlock() {
  return (
    <section className="relative rounded-[28px] glass-lift p-8 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-holo opacity-50 pointer-events-none" />
      <div className="relative flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Сьогодні · {new Date().toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground text-balance">
            Що сьогодні важливо для тебе?
          </h2>
        </div>
        <button className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm hover:opacity-90 transition">
          Почати день
        </button>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map(({ icon: Icon, label, meta, tone }) => (
          <div
            key={label}
            className="rounded-2xl bg-card/60 hairline px-5 py-5 flex items-start gap-3 transition hover:bg-card"
          >
            <div className="rounded-xl bg-background/80 p-2 hairline">
              <Icon className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground leading-tight">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{meta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
