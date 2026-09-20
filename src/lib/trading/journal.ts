import { useMemo } from "react";
import { useLocalState } from "./storage";
import { turkeyDayKey } from "./format";

export type Direction = "long" | "short";

export interface Trade {
  id: string;
  /** ISO timestamp of the entry. */
  openedAt: string;
  /** ISO timestamp of the exit, empty while the trade is open. */
  closedAt?: string;
  symbol: string;
  direction: Direction;
  entry: number;
  exit?: number;
  qty: number;
  leverage: number;
  fees: number;
  funding: number;
  note?: string;
  /** Manual record vs. imported from a connected exchange. */
  source: "manual" | "exchange";
}

export const JOURNAL_KEY = "daria-trading.journal.v1";

export function realizedPnl(t: Trade): number | null {
  if (t.exit == null || !Number.isFinite(t.exit)) return null;
  const gross = (t.exit - t.entry) * t.qty * (t.direction === "long" ? 1 : -1);
  return gross - (t.fees || 0) - (t.funding || 0);
}

export function useJournal() {
  const [trades, setTrades, hydrated] = useLocalState<Trade[]>(JOURNAL_KEY, []);

  const add = (t: Omit<Trade, "id">) =>
    setTrades((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]);

  const remove = (id: string) => setTrades((prev) => prev.filter((t) => t.id !== id));

  const stats = useMemo(() => {
    const closed = trades.filter((t) => realizedPnl(t) !== null);
    const pnls = closed.map((t) => realizedPnl(t) as number);
    const wins = pnls.filter((p) => p > 0);
    const losses = pnls.filter((p) => p < 0);
    const total = pnls.reduce((a, b) => a + b, 0);

    const byDay = new Map<string, number>();
    closed.forEach((t) => {
      const key = turkeyDayKey(t.closedAt || t.openedAt);
      byDay.set(key, (byDay.get(key) || 0) + (realizedPnl(t) as number));
    });

    return {
      totalTrades: trades.length,
      openTrades: trades.length - closed.length,
      closedTrades: closed.length,
      wins: wins.length,
      losses: losses.length,
      winRate: closed.length ? (wins.length / closed.length) * 100 : 0,
      totalPnl: total,
      bestTrade: pnls.length ? Math.max(...pnls) : 0,
      worstTrade: pnls.length ? Math.min(...pnls) : 0,
      avgWin: wins.length ? wins.reduce((a, b) => a + b, 0) / wins.length : 0,
      avgLoss: losses.length ? losses.reduce((a, b) => a + b, 0) / losses.length : 0,
      totalFees: trades.reduce((a, t) => a + (t.fees || 0) + (t.funding || 0), 0),
      daily: [...byDay.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1)),
    };
  }, [trades]);

  return { trades, add, remove, stats, hydrated };
}
