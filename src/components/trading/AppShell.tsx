import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, CandlestickChart, Bot, NotebookPen, PieChart, Menu, X } from "lucide-react";
import { formatTurkeyTime, formatTurkeyDate } from "@/lib/trading/format";
import { integrations } from "@/lib/trading/config";
import { StatusPill } from "./ui";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Мій стіл", icon: LayoutDashboard },
  { to: "/chart", label: "Графік", icon: CandlestickChart },
  { to: "/agents", label: "Агенти", icon: Bot },
  { to: "/journal", label: "Журнал угод", icon: NotebookPen },
  { to: "/reports", label: "Звіти", icon: PieChart },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [clock, setClock] = useState<{ time: string; date: string } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () =>
      setClock({ time: formatTurkeyTime(Date.now()), date: formatTurkeyDate(Date.now()) });
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <div aria-hidden className="pointer-events-none fixed inset-0 grid-fade opacity-60" />

      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[color:var(--bronze)]/40 bg-[color:var(--bronze)]/10">
              <span className="h-2 w-2 rotate-45 bg-[color:var(--bronze)]" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[19px] text-foreground">Daria Trading</span>
              <span className="label-xs mt-1 block">персональний ф'ючерсний простір</span>
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {nav.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition",
                    active
                      ? "bg-[color:var(--bronze)]/12 text-[color:var(--bronze)]"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="font-mono-num text-[13px] leading-none text-foreground">
                {clock ? clock.time : "--:--"}
              </p>
              <p className="mt-1 text-[10px] leading-none text-muted-foreground">
                Туреччина · {clock ? clock.date : ""}
              </p>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Меню"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-secondary text-foreground lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-border px-4 py-3 lg:hidden">
            {nav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Icon className="h-4 w-4" strokeWidth={1.7} />
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className="relative mx-auto max-w-[1400px] px-4 pb-24 pt-6 md:px-8">{children}</div>

      <footer className="relative mx-auto max-w-[1400px] px-4 pb-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground">
          <p>Daria Trading · особистий простір · ордери на біржу не надсилаються</p>
          <StatusPill
            ok={integrations.exchangeAccount}
            label={integrations.exchangeAccount ? "біржа підключена" : "біржа не підключена"}
          />
        </div>
      </footer>
    </div>
  );
}
