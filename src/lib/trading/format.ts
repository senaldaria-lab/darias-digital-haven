import { TZ } from "./config";

export function formatTurkeyTime(d: Date | string | number) {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(d));
}

export function formatTurkeyDateTime(d: Date | string | number) {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(d));
}

export function formatTurkeyDate(d: Date | string | number) {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(d));
}

/** YYYY-MM-DD key in Istanbul time. */
export function turkeyDayKey(d: Date | string | number) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(d));
  return parts;
}

export function num(v: number, digits = 2) {
  if (!Number.isFinite(v)) return "—";
  return v.toLocaleString("uk-UA", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function usd(v: number, digits = 2) {
  if (!Number.isFinite(v)) return "—";
  const sign = v > 0 ? "+" : "";
  return `${sign}${num(v, digits)} USDT`;
}

export function pct(v: number, digits = 1) {
  if (!Number.isFinite(v)) return "—";
  return `${num(v, digits)}%`;
}
