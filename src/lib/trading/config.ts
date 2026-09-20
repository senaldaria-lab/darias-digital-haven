/**
 * Integration flags for Daria Trading.
 *
 * Everything here is FALSE until a real backend integration is wired up
 * server-side. Nothing in this app talks to an exchange, and no API keys
 * ever live in the browser.
 */
export interface Integrations {
  binanceMarketData: boolean;
  exchangeAccount: boolean;
  newsFeed: boolean;
  agentBackend: boolean;
}

export const integrations: Integrations = {
  /** Live Binance market data feed (prices, klines). */
  binanceMarketData: false,
  /** Exchange account connection (read-only positions / fills). */
  exchangeAccount: false,
  /** News / macro data provider. */
  newsFeed: false,
  /** LLM / agent backend that would actually run the analyses. */
  agentBackend: false,
} as const;

export type IntegrationKey = keyof typeof integrations;

export const TZ = "Europe/Istanbul";

export const SYMBOLS = [
  { id: "BTCUSDT", label: "BTC/USDT", tv: "BINANCE:BTCUSDT", primary: true },
  { id: "BNBUSDT", label: "BNB/USDT", tv: "BINANCE:BNBUSDT", primary: true },
  { id: "ETHUSDT", label: "ETH/USDT", tv: "BINANCE:ETHUSDT", primary: false },
  { id: "SOLUSDT", label: "SOL/USDT", tv: "BINANCE:SOLUSDT", primary: false },
  { id: "AVAXUSDT", label: "AVAX/USDT", tv: "BINANCE:AVAXUSDT", primary: false },
  { id: "XRPUSDT", label: "XRP/USDT", tv: "BINANCE:XRPUSDT", primary: false },
] as const;

export type SymbolId = (typeof SYMBOLS)[number]["id"];

export const TIMEFRAMES = [
  { id: "15", label: "15м" },
  { id: "60", label: "1г" },
  { id: "240", label: "4г" },
  { id: "D", label: "1д" },
] as const;

export const LEVERAGES = [15, 20] as const;
