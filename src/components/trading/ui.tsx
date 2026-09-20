import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("panel p-5", className)} {...rest}>
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  hint,
  right,
}: {
  title: string;
  hint?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-2xl leading-tight text-foreground">{title}</h2>
        {hint && <p className="mt-1 text-[13px] text-muted-foreground">{hint}</p>}
      </div>
      {right}
    </div>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-[color:var(--bronze)]/50 bg-[color:var(--bronze)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--bronze)]",
        className,
      )}
    >
      demo
    </span>
  );
}

export function StatusPill({
  ok,
  label,
}: {
  ok: boolean;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
      <span
        className={cn(
          "relative inline-block h-1.5 w-1.5 rounded-full",
          ok ? "pulse-dot bg-[color:var(--bull)]" : "bg-muted-foreground/50",
        )}
      />
      {label}
    </span>
  );
}

export function BiasTag({ bias }: { bias: "LONG" | "SHORT" | "WAIT" }) {
  const map = {
    LONG: "text-[color:var(--bull)] border-[color:var(--bull)]/40 bg-[color:var(--bull)]/10",
    SHORT: "text-[color:var(--bear)] border-[color:var(--bear)]/40 bg-[color:var(--bear)]/10",
    WAIT: "text-[color:var(--neutralwait)] border-[color:var(--neutralwait)]/40 bg-[color:var(--neutralwait)]/10",
  } as const;
  return (
    <span
      className={cn(
        "rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        map[bias],
      )}
    >
      {bias}
    </span>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-xs">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-muted-foreground/80">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-border bg-[color:var(--surface-2)] px-3 py-2 text-sm text-foreground outline-none transition focus:border-[color:var(--bronze)] focus:ring-1 focus:ring-[color:var(--bronze)]/40";

export function Btn({
  children,
  variant = "ghost",
  className,
  ...rest
}: {
  variant?: "primary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary"
          ? "bg-[color:var(--bronze)] text-[color:var(--primary-foreground)] hover:brightness-110"
          : "border border-border bg-secondary text-foreground hover:border-[color:var(--bronze)]/60 hover:bg-accent",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-12 text-center">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1.5 max-w-md text-[13px] text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
