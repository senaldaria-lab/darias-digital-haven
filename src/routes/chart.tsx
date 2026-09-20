import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/trading/AppShell";
import { TradingViewChart } from "@/components/trading/TradingViewChart";
import { Panel, SectionTitle } from "@/components/trading/ui";
import { SYMBOLS, TIMEFRAMES } from "@/lib/trading/config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chart")({
  head: () => ({
    meta: [
      { title: "Графік — Daria Trading" },
      {
        name: "description",
        content: "Публічні графіки TradingView для BTC, BNB та інших пар з таймфреймами 15м, 1г, 4г.",
      },
      { property: "og:title", content: "Графік — Daria Trading" },
      { property: "og:description", content: "Графіки BTC і BNB з вибором таймфрейму." },
    ],
  }),
  component: ChartPage,
});

function ChartPage() {
  const [symbol, setSymbol] = useState<string>("BTCUSDT");
  const [tf, setTf] = useState<string>("15");
  const active = SYMBOLS.find((s) => s.id === symbol) ?? SYMBOLS[0];

  return (
    <AppShell>
      <SectionTitle
        title="Графік"
        hint="Публічні графіки TradingView. Це зовнішній сервіс — дані належать TradingView."
      />

      <Panel className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {SYMBOLS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSymbol(s.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[12.5px] transition",
                s.id === symbol
                  ? "bg-[color:var(--bronze)]/15 text-[color:var(--bronze)]"
                  : "border border-border bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
              {s.primary && <span className="ml-1.5 text-[9px] uppercase opacity-60">осн</span>}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1.5">
          {TIMEFRAMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTf(t.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[12.5px] transition",
                t.id === tf
                  ? "bg-[color:var(--bronze)]/15 text-[color:var(--bronze)]"
                  : "border border-border bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Panel>

      <TradingViewChart tvSymbol={active.tv} interval={tf} />

      <p className="mt-4 text-[12px] text-muted-foreground">
        Вхід зазвичай на 15м, контекст — 1г і 4г. Графік не підключений до акаунта біржі й не
        показує твої позиції.
      </p>
    </AppShell>
  );
}
