import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/trading/AppShell";
import { MarketCard } from "@/components/trading/MarketCard";
import { Btn, DemoBadge, Panel, SectionTitle, StatusPill } from "@/components/trading/ui";
import { integrations } from "@/lib/trading/config";
import { useJournal } from "@/lib/trading/journal";
import { num, usd } from "@/lib/trading/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Мій стіл — Daria Trading" },
      {
        name: "description",
        content:
          "Робочий стіл Daria Trading: статус підключень, ринки BTC і BNB, агенти аналізу і підсумок журналу угод.",
      },
      { property: "og:title", content: "Мій стіл — Daria Trading" },
      {
        property: "og:description",
        content: "Персональний ф'ючерсний робочий простір: ринки, агенти, журнал угод.",
      },
    ],
  }),
  component: DeskPage,
});

function DeskPage() {
  const { stats, hydrated } = useJournal();

  return (
    <AppShell>
      {/* status strip */}
      <div className="panel mb-6 flex flex-wrap items-center gap-3 px-5 py-4">
        <StatusPill ok label="інтерфейс працює" />
        <StatusPill
          ok={integrations.binanceMarketData}
          label={integrations.binanceMarketData ? "ринкові дані live" : "ринкові дані не підключені"}
        />
        <StatusPill
          ok={integrations.newsFeed}
          label={integrations.newsFeed ? "новини live" : "новини не підключені"}
        />
        <StatusPill
          ok={integrations.agentBackend}
          label={integrations.agentBackend ? "агенти live" : "агенти в демо-режимі"}
        />
        <span className="ml-auto text-[11.5px] text-muted-foreground">
          Ордери на біржу не створюються. Ключі зберігаються лише на сервері.
        </span>
      </div>

      <section className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel className="relative overflow-hidden p-7">
          <p className="label-xs">робочий стіл</p>
          <h1 className="mt-3 font-display text-[2.4rem] leading-[1.05] text-foreground text-balance">
            Daria Trading
          </h1>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground">
            Основні пари — BTC і BNB, іноді ETH, SOL, AVAX, XRP. Вхід на 15м, контекст 1г і 4г,
            плече 15x або 20x виставляється вручну.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link to="/agents">
              <Btn variant="primary">Запустити агентів</Btn>
            </Link>
            <Link to="/chart">
              <Btn>Відкрити графік</Btn>
            </Link>
            <Link to="/journal">
              <Btn>Записати угоду</Btn>
            </Link>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(circle, var(--bronze), transparent 70%)", opacity: 0.12 }}
          />
        </Panel>

        <Panel className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="label-xs">підсумок журналу</p>
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              ручні записи
            </span>
          </div>
          {!hydrated || stats.closedTrades === 0 ? (
            <p className="text-[13px] text-muted-foreground">
              Поки немає закритих угод. Додай перший запис у журналі — статистика зʼявиться тут.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Metric label="Реалізований P&L" value={usd(stats.totalPnl)} tone={stats.totalPnl} />
              <Metric label="Вінрейт" value={`${num(stats.winRate, 0)}%`} />
              <Metric label="Прибуткові" value={String(stats.wins)} />
              <Metric label="Збиткові" value={String(stats.losses)} />
            </div>
          )}
          <Link to="/reports" className="mt-auto text-[12px] text-[color:var(--bronze)] hover:underline">
            Повні звіти →
          </Link>
        </Panel>
      </section>

      <section className="mb-10">
        <SectionTitle
          title="Ринки"
          hint="Живий фід ще не підключений — ціни свідомо не показуються, щоб нічого не вигадувати."
          right={<DemoBadge />}
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <MarketCard label="BTC/USDT" tv="BINANCE:BTCUSDT" note="Основна пара" />
          <MarketCard label="BNB/USDT" tv="BINANCE:BNBUSDT" note="Основна пара" />
          <MarketCard label="ETH/USDT" tv="BINANCE:ETHUSDT" note="Час від часу" />
          <MarketCard label="SOL/USDT" tv="BINANCE:SOLUSDT" note="Час від часу" />
        </div>
      </section>

      <section>
        <SectionTitle title="Наступні кроки" hint="Що зробити, щоб простір працював на реальних даних." />
        <Panel>
          <ol className="grid gap-2.5 text-[13px] text-muted-foreground">
            <li>1. Підключити серверне джерело ринкових даних Binance (лише читання).</li>
            <li>2. Додати джерело новин і макро-календаря з явною атрибуцією.</li>
            <li>3. Увімкнути бекенд агентів, щоб RUN давав справжній аналіз замість демо.</li>
            <li>4. За потреби — читання позицій з біржі; розміщення ордерів не планується.</li>
          </ol>
        </Panel>
      </section>
    </AppShell>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: number }) {
  const color = tone == null ? "" : tone > 0 ? "text-bull" : tone < 0 ? "text-bear" : "";
  return (
    <div>
      <p className="label-xs">{label}</p>
      <p className={`mt-1.5 font-mono-num text-lg text-foreground ${color}`}>{value}</p>
    </div>
  );
}
