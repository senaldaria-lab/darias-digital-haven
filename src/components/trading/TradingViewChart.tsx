export function TradingViewChart({
  tvSymbol,
  interval,
  height = 520,
}: {
  tvSymbol: string;
  interval: string;
  height?: number;
}) {
  const src =
    `https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(tvSymbol)}` +
    `&interval=${interval}&theme=dark&style=1&timezone=Europe%2FIstanbul&locale=uk` +
    `&hide_side_toolbar=0&withdateranges=1&allow_symbol_change=0`;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[color:var(--surface-2)]">
      <iframe
        key={src}
        title={`TradingView ${tvSymbol}`}
        src={src}
        style={{ width: "100%", height, border: 0, display: "block" }}
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
