import { useEffect, useState } from "react";
import { CheckCircle2, Heart, Briefcase, Clock } from "lucide-react";

const items = [
  { icon: CheckCircle2, label: "3 важливі задачі", meta: "сьогодні", tint: "oklch(0.92 0.02 240)" },
  { icon: Heart, label: "1 особистий фокус", meta: "для себе", tint: "oklch(0.94 0.022 70)" },
  { icon: Briefcase, label: "1 бізнес-фокус", meta: "стратегія", tint: "oklch(0.9 0.025 245)" },
  { icon: Clock, label: "1 незавершена справа", meta: "перенесено", tint: "oklch(0.93 0.012 60)" },
];

export function TodayBlock() {
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "long" }),
    );
  }, []);

  return (
    <section className="relative rounded-[32px] glass-lift p-8 md:p-10 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-aurora opacity-60 pointer-events-none" />
      <div aria-hidden className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.05 240 / 0.7), transparent 70%)" }} />

      <div className="relative flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground mb-3 min-h-[14px]">
            {today && <>Сьогодні · {today}</>}
          </p>
          <h2 className="font-display text-[2.5rem] md:text-[3.25rem] leading-[1.05] text-foreground text-balance">
            Що сьогодні важливо <span className="italic text-taupe">для тебе?</span>
          </h2>
        </div>
        <button className="rounded-full btn-espresso px-6 py-3 text-[13px] font-medium">
          Почати день
        </button>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map(({ icon: Icon, label, meta, tint }) => (
          <div
            key={label}
            className="group relative rounded-[20px] glass p-5 flex items-start gap-3 transition hover:-translate-y-0.5"
          >
            <div className="rounded-xl p-2.5 hairline" style={{ background: tint }}>
              <Icon className="h-4 w-4 text-foreground/75" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-medium text-foreground leading-tight">{label}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-1.5">{meta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
