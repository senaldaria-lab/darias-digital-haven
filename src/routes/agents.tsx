import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Play, Loader2 } from "lucide-react";
import { AppShell } from "@/components/trading/AppShell";
import { AgentCard } from "@/components/trading/AgentCard";
import { BiasTag, Btn, DemoBadge, Panel, SectionTitle } from "@/components/trading/ui";
import {
  AGENTS,
  runAgentDemo,
  runCoordinatorDemo,
  type AgentResult,
  type CoordinatorResult,
} from "@/lib/trading/agents";
import { SYMBOLS } from "@/lib/trading/config";
import { formatTurkeyDateTime } from "@/lib/trading/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Агенти — Daria Trading" },
      {
        name: "description",
        content:
          "Агенти аналізу: макро, технічний мульти-таймфрейм, публічний ресерч, ризик і координатор зі сценаріями LONG / SHORT / WAIT.",
      },
      { property: "og:title", content: "Агенти — Daria Trading" },
      { property: "og:description", content: "Агенти аналізу і координатор сценаріїв." },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const [symbol, setSymbol] = useState<string>("BTCUSDT");
  const [results, setResults] = useState<Record<string, AgentResult | undefined>>({});
  const [coord, setCoord] = useState<CoordinatorResult | null>(null);
  const [running, setRunning] = useState<string | null>(null);
  const [runningAll, setRunningAll] = useState(false);

  const salt = new Date().toISOString().slice(0, 13); // stable within the hour

  const runOne = async (id: string) => {
    const agent = AGENTS.find((a) => a.id === id)!;
    setRunning(id);
    await new Promise((r) => setTimeout(r, 450));
    setResults((prev) => ({ ...prev, [id]: runAgentDemo(agent, symbol, salt) }));
    setRunning(null);
  };

  const runAll = async () => {
    setRunningAll(true);
    const next: Record<string, AgentResult> = {};
    for (const a of AGENTS) {
      setRunning(a.id);
      await new Promise((r) => setTimeout(r, 300));
      next[a.id] = runAgentDemo(a, symbol, salt);
      setResults((prev) => ({ ...prev, [a.id]: next[a.id] }));
    }
    setRunning(null);
    setCoord(runCoordinatorDemo(next, symbol));
    setRunningAll(false);
  };

  return (
    <AppShell>
      <SectionTitle
        title="Агенти"
        hint="Бекенд агентів не підключений. RUN виконує локальний демо-сценарій — це не реальні новини, ціни чи аналіз."
        right={<DemoBadge />}
      />

      <Panel className="mb-6 flex flex-wrap items-center gap-2">
        <span className="label-xs mr-1">пара</span>
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
          </button>
        ))}
        <Btn variant="primary" className="ml-auto" onClick={runAll} disabled={runningAll}>
          {runningAll ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          RUN ALL
        </Btn>
      </Panel>

      <div className="mb-8 grid gap-5 lg:grid-cols-2">
        {AGENTS.map((a) => (
          <AgentCard
            key={a.id}
            agent={a}
            result={results[a.id]}
            running={running === a.id}
            onRun={() => runOne(a.id)}
          />
        ))}
      </div>

      <SectionTitle title="Координатор" hint="Порівнює висновки агентів і показує розбіжності." />
      {!coord ? (
        <Panel>
          <p className="text-[13px] text-muted-foreground">
            Натисни RUN ALL, щоб зіставити висновки агентів і отримати сценарії LONG / SHORT / WAIT.
          </p>
        </Panel>
      ) : (
        <Panel className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <BiasTag bias={coord.bias} />
            <DemoBadge />
            <span className="text-[11.5px] text-muted-foreground">
              збіг {coord.agreement}% · {formatTurkeyDateTime(coord.ranAt)}
            </span>
          </div>
          <p className="text-[13px] text-foreground/85">{coord.summary}</p>

          <div>
            <p className="label-xs mb-2">розбіжності</p>
            <ul className="space-y-1 text-[12.5px] text-muted-foreground">
              {coord.disagreements.length ? (
                coord.disagreements.map((d) => <li key={d}>· {d}</li>)
              ) : (
                <li>· Усі агенти зійшлися на одному висновку.</li>
              )}
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {coord.scenarios.map((s) => (
              <div key={s.bias} className="panel-2 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <BiasTag bias={s.bias} />
                  <span className="text-[12px] font-medium text-foreground">{s.label}</span>
                </div>
                <p className="text-[12.5px] leading-relaxed text-muted-foreground">{s.reasoning}</p>
                <p className="mt-2 text-[11.5px] text-muted-foreground/80">
                  Скасування: {s.invalidation}
                </p>
              </div>
            ))}
          </div>

          <ul className="space-y-1 border-t border-border pt-4 text-[11.5px] text-muted-foreground">
            {coord.notes.map((n) => (
              <li key={n}>· {n}</li>
            ))}
          </ul>
        </Panel>
      )}
    </AppShell>
  );
}
