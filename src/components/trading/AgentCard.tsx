import { Play, Loader2 } from "lucide-react";
import type { AgentDef, AgentResult } from "@/lib/trading/agents";
import { isConfigured } from "@/lib/trading/agents";
import { formatTurkeyDateTime } from "@/lib/trading/format";
import { BiasTag, Btn, DemoBadge } from "./ui";

export function AgentCard({
  agent,
  result,
  running,
  onRun,
}: {
  agent: AgentDef;
  result?: AgentResult;
  running: boolean;
  onRun: () => void;
}) {
  const configured = isConfigured(agent);

  return (
    <div className="panel flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold text-foreground">{agent.name}</h3>
            {!configured && <DemoBadge />}
          </div>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{agent.role}</p>
        </div>
        <Btn variant="primary" onClick={onRun} disabled={running} className="shrink-0">
          {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          RUN
        </Btn>
      </div>

      <p className="rounded-lg border border-border bg-[color:var(--surface-2)] px-3 py-2 text-[11.5px] text-muted-foreground">
        {configured
          ? "Інтеграція налаштована."
          : `Не налаштовано: ${agent.requiresLabel}. RUN виконує локальний демо-сценарій — це не реальні дані й не реальний аналіз.`}
      </p>

      {!result ? (
        <p className="text-[12px] text-muted-foreground/80">Ще не запускався.</p>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <BiasTag bias={result.bias} />
            <span className="text-[11px] text-muted-foreground">
              впевненість {result.confidence}% · {formatTurkeyDateTime(result.ranAt)}
            </span>
          </div>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">{result.summary}</p>
          <dl className="grid gap-1.5">
            {result.lines.map((l) => (
              <div key={l.label} className="flex justify-between gap-3 text-[12px]">
                <dt className="text-muted-foreground">{l.label}</dt>
                <dd className="text-right font-mono-num text-foreground/90">{l.value}</dd>
              </div>
            ))}
          </dl>
          {result.notes.length > 0 && (
            <ul className="space-y-1 border-t border-border pt-3 text-[11.5px] text-muted-foreground">
              {result.notes.map((n) => (
                <li key={n}>· {n}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
