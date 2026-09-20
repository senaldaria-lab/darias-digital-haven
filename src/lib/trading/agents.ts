import { integrations } from "./config";

/**
 * Deterministic local scenario engine.
 *
 * IMPORTANT: this produces NO real market data, NO real news and NO real
 * analysis. It is a reproducible demo so the interface can be used and tested
 * before a real backend is wired up. Every result is flagged `demo: true` and
 * must be rendered with a visible DEMO label.
 */

export type Bias = "LONG" | "SHORT" | "WAIT";

export interface AgentLine {
  label: string;
  value: string;
  tone?: "bull" | "bear" | "neutral";
}

export interface AgentResult {
  agentId: string;
  demo: boolean;
  ranAt: string;
  bias: Bias;
  confidence: number;
  summary: string;
  lines: AgentLine[];
  notes: string[];
}

export interface AgentDef {
  id: string;
  name: string;
  role: string;
  /** Which integration this agent would need in order to produce real output. */
  requires: keyof typeof integrations;
  requiresLabel: string;
}

export const AGENTS: AgentDef[] = [
  {
    id: "macro",
    name: "Макро та новини",
    role: "Календар подій, макро-фон, настрій ринку",
    requires: "newsFeed",
    requiresLabel: "Джерело новин / макро-календар",
  },
  {
    id: "technical",
    name: "Технічний аналіз",
    role: "15м вхід, 1г і 4г контекст · EMA, RSI, MACD, обсяг, структура ринку",
    requires: "binanceMarketData",
    requiresLabel: "Ринкові дані Binance (свічки)",
  },
  {
    id: "research",
    name: "Публічні сигнали та ресерч",
    role: "Зовнішні публічні огляди й сигнали — лише як довідка",
    requires: "agentBackend",
    requiresLabel: "Бекенд агентів + перелік джерел",
  },
  {
    id: "risk",
    name: "Ризик-менеджмент",
    role: "Сценарій під ручне плече 15x / 20x, стоп і розмір позиції",
    requires: "agentBackend",
    requiresLabel: "Бекенд агентів (рахує локально в демо)",
  },
];

export const COORDINATOR: AgentDef = {
  id: "coordinator",
  name: "Координатор",
  role: "Порівнює висновки агентів, показує розбіжності та підсумковий сценарій",
  requires: "agentBackend",
  requiresLabel: "Бекенд агентів",
};

export function isConfigured(agent: AgentDef) {
  return integrations[agent.requires] === true;
}

/* ---------------- deterministic pseudo-random ---------------- */

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: string) {
  let s = hash(seed) || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

function pick<T>(r: () => number, arr: readonly T[]): T {
  return arr[Math.floor(r() * arr.length) % arr.length]!;
}

function biasFrom(r: () => number): Bias {
  const v = r();
  return v < 0.38 ? "LONG" : v < 0.72 ? "SHORT" : "WAIT";
}

/* ---------------- scenario builders ---------------- */

export function runAgentDemo(agent: AgentDef, symbol: string, seedSalt = ""): AgentResult {
  const seed = `${agent.id}|${symbol}|${seedSalt}`;
  const r = rng(seed);
  const bias = biasFrom(r);
  const confidence = Math.round(45 + r() * 45);
  const ranAt = new Date().toISOString();
  const base: Omit<AgentResult, "lines" | "summary" | "notes"> = {
    agentId: agent.id,
    demo: true,
    ranAt,
    bias,
    confidence,
  };

  if (agent.id === "macro") {
    return {
      ...base,
      summary:
        "Демо-сценарій макро-фону. Це вигаданий приклад структури відповіді, а не реальні новини.",
      lines: [
        { label: "Загальний фон", value: pick(r, ["ризик-он", "ризик-оф", "нейтральний"]) },
        { label: "Волатильність очікується", value: pick(r, ["низька", "помірна", "висока"]) },
        { label: "Подія-тригер (приклад)", value: pick(r, ["макро-друк", "виступ регулятора", "експірація", "немає"]) },
      ],
      notes: [
        "Реальні новини не підключені — нічого з переліченого не відбувалося.",
        "Щоб отримувати справжній макро-фон, потрібно підключити джерело новин на сервері.",
      ],
    };
  }

  if (agent.id === "technical") {
    const tf = (name: string) => ({
      label: name,
      value: `${pick(r, ["EMA вгору", "EMA вниз", "EMA флет"])} · RSI ${Math.round(32 + r() * 40)} · MACD ${pick(r, ["+", "−", "≈0"])}`,
      tone: (r() > 0.5 ? "bull" : "bear") as "bull" | "bear",
    });
    return {
      ...base,
      summary:
        "Демо-структура мульти-таймфрейм аналізу (15м вхід, 1г і 4г контекст). Значення згенеровані локально.",
      lines: [
        tf("4г контекст"),
        tf("1г контекст"),
        tf("15м вхід"),
        { label: "Структура ринку", value: pick(r, ["HH/HL — висхідна", "LH/LL — низхідна", "рейндж"]) },
        { label: "Обсяг", value: pick(r, ["зростає", "спадає", "середній"]) },
      ],
      notes: [
        "Свічки Binance не підключені — індикатори не розраховані на реальних даних.",
        "Для реального аналізу потрібен серверний доступ до ринкових даних.",
      ],
    };
  }

  if (agent.id === "research") {
    return {
      ...base,
      summary:
        "Демо-каркас для зовнішнього ресерчу. Жодне джерело не інтегроване, посилань на реальні публікації тут немає.",
      lines: [
        { label: "Формат джерел", value: "публічні огляди, соц-сигнали, ончейн-звіти" },
        { label: "Статус атрибуції", value: "джерела будуть вказані явно після підключення" },
        { label: "Зібрано матеріалів", value: "0 (демо)" },
      ],
      notes: [
        "Ми не стверджуємо, що будь-яке зовнішнє джерело вже інтегроване.",
        "Після підключення кожен пункт матиме назву джерела, дату й посилання.",
      ],
    };
  }

  if (agent.id === "risk") {
    const stopPct = 0.4 + r() * 0.8;
    const lev = r() > 0.5 ? 20 : 15;
    const riskPct = 0.5 + r() * 1.5;
    return {
      ...base,
      bias: "WAIT",
      summary: `Сценарій ризику під ручне плече ${lev}x. Розрахунок локальний і залежить лише від введених припущень.`,
      lines: [
        { label: "Плече (ручне)", value: `${lev}x` },
        { label: "Відстань до стопу", value: `${stopPct.toFixed(2)}% від входу` },
        { label: "Ризик на угоду", value: `${riskPct.toFixed(2)}% депозиту` },
        {
          label: "Буфер до ліквідації",
          value: `≈ ${(100 / lev - stopPct).toFixed(2)}% (без урахування комісій і фандингу)`,
        },
      ],
      notes: [
        "Високе плече швидко з'їдає депозит. Розрахунок не є рекомендацією.",
        "Точна ціна ліквідації залежить від правил біржі, маржі й фандингу.",
      ],
    };
  }

  return {
    ...base,
    summary: "Демо-результат.",
    lines: [],
    notes: [],
  };
}

export interface CoordinatorResult extends AgentResult {
  agreement: number;
  disagreements: string[];
  scenarios: { bias: Bias; label: string; reasoning: string; invalidation: string }[];
}

export function runCoordinatorDemo(
  results: Record<string, AgentResult | undefined>,
  symbol: string,
): CoordinatorResult {
  const votes = AGENTS.map((a) => results[a.id]).filter(Boolean) as AgentResult[];
  const counts: Record<Bias, number> = { LONG: 0, SHORT: 0, WAIT: 0 };
  votes.forEach((v) => {
    counts[v.bias] += 1;
  });
  const total = votes.length || 1;
  const sorted = (Object.keys(counts) as Bias[]).sort((a, b) => counts[b] - counts[a]);
  const top = sorted[0]!;
  const agreement = Math.round((counts[top] / total) * 100);

  const disagreements: string[] = [];
  AGENTS.forEach((a) => {
    const res = results[a.id];
    if (res && res.bias !== top) {
      disagreements.push(`${a.name}: ${res.bias} проти загального ${top}`);
    }
  });
  if (!votes.length) disagreements.push("Жоден агент ще не запускався.");

  const scenarios: CoordinatorResult["scenarios"] = [
    {
      bias: "LONG",
      label: "Сценарій LONG",
      reasoning:
        "Якщо 1г і 4г контекст висхідний, а 15м дає підтверджений відкат до підтримки з обсягом.",
      invalidation: "Закриття 15м нижче останнього HL скасовує сценарій.",
    },
    {
      bias: "SHORT",
      label: "Сценарій SHORT",
      reasoning:
        "Якщо старші таймфрейми показують LH/LL, а 15м відбивається від опору зі слабким обсягом.",
      invalidation: "Закриття 15м вище останнього LH скасовує сценарій.",
    },
    {
      bias: "WAIT",
      label: "Сценарій WAIT",
      reasoning:
        "Якщо таймфрейми суперечать одне одному або ринок у вузькому рейнджі перед подією.",
      invalidation: "Вихід за межі рейнджу з обсягом переводить у LONG або SHORT.",
    },
  ].sort((a, b) => (a.bias === top ? -1 : b.bias === top ? 1 : 0));

  return {
    agentId: "coordinator",
    demo: true,
    ranAt: new Date().toISOString(),
    bias: votes.length ? top : "WAIT",
    confidence: agreement,
    summary: `Демо-звід по ${symbol}: ${votes.length} з ${AGENTS.length} агентів запущено, збіг ${agreement}%.`,
    lines: [
      { label: "LONG голосів", value: String(counts.LONG) },
      { label: "SHORT голосів", value: String(counts.SHORT) },
      { label: "WAIT голосів", value: String(counts.WAIT) },
    ],
    notes: [
      "Це порівняння демо-висновків, а не реальний аналіз ринку.",
      "Жодне замовлення на біржу не створюється і не надсилається.",
    ],
    agreement,
    disagreements,
    scenarios,
  };
}
