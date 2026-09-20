import { ExternalLink } from "lucide-react";
import { integrations } from "@/lib/trading/config";
import { DemoBadge, StatusPill } from "./ui";

export function MarketCard({
  label,
  tv,
  note,
}: {
  label: string;
  tv: string;
  note?: string;
}) {
  const live = integrations.binanceMarketData;
  return (
    <div className="panel flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-2xl leading-none text-foreground">{label}</p>
          <p className="mt-2 text-[11px] text-muted-foreground">Binance · ф'ючерси</p>
        </div>
        {live ? <StatusPill ok label="live" /> : <DemoBadge />}
      </div>

      <div className="rounded-lg border border-dashed border-border bg-[color:var(--surface-2)] px-4 py-5">
        <p className="font-mono-num text-2xl text-muted-foreground">—</p>
        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
          {live
            ? "Дані завантажуються."
            : "Ціна не підключена. Живий фід Binance ще не налаштований, тому реальна ціна тут не показується."}
        </p>
      </div>

      {note && <p className="text-[12px] text-muted-foreground">{note}</p>}

      <a
        href={`https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tv)}`}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-auto inline-flex items-center gap-2 text-[12px] text-[color:var(--bronze)] hover:underline"
      >
        Відкрити на TradingView <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
