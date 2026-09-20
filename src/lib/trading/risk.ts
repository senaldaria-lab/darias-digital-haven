export interface RiskInput {
  balance: number;
  riskPercent: number;
  entry: number;
  stop: number;
  leverage: number;
  takeProfit?: number;
  feeRate?: number; // percent per side, e.g. 0.05
}

export interface RiskOutput {
  valid: boolean;
  direction: "long" | "short";
  riskAmount: number;
  stopDistance: number;
  stopDistancePct: number;
  qty: number;
  notional: number;
  margin: number;
  marginPctOfBalance: number;
  liqDistancePct: number;
  bufferPct: number;
  estimatedFees: number;
  rewardAmount: number | null;
  rr: number | null;
}

export function computeRisk(i: RiskInput): RiskOutput {
  const direction: "long" | "short" = i.stop < i.entry ? "long" : "short";
  const stopDistance = Math.abs(i.entry - i.stop);
  const valid =
    i.balance > 0 && i.entry > 0 && i.stop > 0 && stopDistance > 0 && i.leverage > 0 && i.riskPercent > 0;

  const riskAmount = (i.balance * i.riskPercent) / 100;
  const qty = valid ? riskAmount / stopDistance : 0;
  const notional = qty * i.entry;
  const margin = i.leverage ? notional / i.leverage : 0;
  const stopDistancePct = valid ? (stopDistance / i.entry) * 100 : 0;
  const liqDistancePct = i.leverage ? 100 / i.leverage : 0;
  const feeRate = i.feeRate ?? 0.05;
  const estimatedFees = (notional * feeRate * 2) / 100;

  const rewardAmount =
    i.takeProfit && i.takeProfit > 0 ? Math.abs(i.takeProfit - i.entry) * qty : null;
  const rr = rewardAmount != null && riskAmount > 0 ? rewardAmount / riskAmount : null;

  return {
    valid,
    direction,
    riskAmount,
    stopDistance,
    stopDistancePct,
    qty,
    notional,
    margin,
    marginPctOfBalance: i.balance ? (margin / i.balance) * 100 : 0,
    liqDistancePct,
    bufferPct: liqDistancePct - stopDistancePct,
    estimatedFees,
    rewardAmount,
    rr,
  };
}
