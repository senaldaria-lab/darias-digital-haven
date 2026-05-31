# Life OS — System Map

> This document describes the architecture of the full AI Home workspace.  
> It is a reference only — do not move folders or duplicate data based on this map.

---

## Top-level structure

```
Daria's AI Home/
│
├── LIFE_OS_APP/          ← you are here — visual dashboard and entry point
│
├── PERSONAL_OS/          ← personal life: planning, notes, finance, family, routines
│
├── LIFE_WITH_AI/         ← business/content: Instagram, reels, scripts, services
│
└── AI_TRADING_AGENT/     ← (planned) trading bot, signals, risk management
```

---

## LIFE_OS_APP — role and responsibility

`LIFE_OS_APP` is the **visual front-end** of the entire system. It does not store data — it surfaces, navigates and connects to the actual data systems below it.

| What it is | What it is not |
|---|---|
| Visual dashboard | Source of truth for any data |
| Navigation layer | Replacement for the OS folders |
| Entry point to all spaces | Duplicate of PERSONAL_OS or LIFE_WITH_AI |
| Placeholder for future features | Backend or storage system |

Built with: React · TanStack Router · TanStack Start · Tailwind CSS v4 · TypeScript

---

## Spaces — connections

Each Space card in the dashboard represents one real-world system or project.  
The connection column shows where the actual content and data lives.

| Space (dashboard) | Route | Connects to | Status |
|---|---|---|---|
| Daria Home | `/spaces/daria-home` | `../PERSONAL_OS` | Active folder exists |
| Life with AI | `/spaces/life-with-ai` | `../LIFE_WITH_AI` | Active folder exists |
| Trading OS | `/spaces/trading-os` | `../AI_TRADING_AGENT` | Planned — folder not yet created |
| Bianca OS | `/spaces/bianca-os` | Future standalone dashboard | Future — no folder yet |

---

## Space detail: Daria Home → PERSONAL_OS

The Daria Home space is the personal life layer. Its modules map to PERSONAL_OS folders:

| Dashboard module | PERSONAL_OS folder / file |
|---|---|
| Нотатки | `PERSONAL_OS/Notes/` |
| Ідеї | `PERSONAL_OS/ideas.md` |
| Денний план | `PERSONAL_OS/Planning/` · `PERSONAL_OS/daily-log.md` |
| Задачі | `PERSONAL_OS/tasks.md` |

Additional PERSONAL_OS areas not yet surfaced in the dashboard:
`Finance/` · `Routines/` · `Family/` · `Personal_Development/` · `AI_Assistants/`

---

## Space detail: Life with AI → LIFE_WITH_AI

The Life with AI space is the content and business layer. Its modules map to LIFE_WITH_AI folders:

| Dashboard module | LIFE_WITH_AI folder / file |
|---|---|
| Ідеї контенту | `LIFE_WITH_AI/Content_Strategy/` · `LIFE_WITH_AI/ideas.md` |
| Instagram план | `LIFE_WITH_AI/Content_Strategy/` |
| Сценарії рілс | `LIFE_WITH_AI/Reels/` · `LIFE_WITH_AI/Scripts/` |
| Тренди | `LIFE_WITH_AI/Content_Strategy/` |
| Контент-план тижня | `LIFE_WITH_AI/Content_Strategy/` · `LIFE_WITH_AI/tasks.md` |

Additional LIFE_WITH_AI areas not yet surfaced:
`Visual_Prompts/` · `Services/` · `Client_Automation/` · `Products/` · `Monetization/`

---

## Space detail: Trading OS → AI_TRADING_AGENT (planned)

| Dashboard module | Planned connection |
|---|---|
| Статус бота | Bot runtime status / logs |
| Сигнали | Signal feed / alert log |
| Контроль ризиків | Risk parameters config |
| Звіти | Trade history and P&L reports |

`AI_TRADING_AGENT/` does not yet exist as a folder. The dashboard space is a placeholder.

---

## Space detail: Bianca OS (future)

Bianca OS will become its own standalone dashboard — a separate app similar to LIFE_OS_APP — rather than connecting to a markdown folder system.

Planned scope: Bianca Mobilya + BohoConcept · Shopify management · leads · sales pipeline · client communication

No folder or app exists yet. The dashboard card is a navigation placeholder.

---

## Dashboard page structure

```
src/routes/
│
├── __root.tsx              — root layout (QueryClientProvider, Outlet)
├── index.tsx               — route: /
├── -index-view.tsx         — homepage component (hero, team report, assistants, my spaces)
│
└── spaces/
    ├── daria-home.tsx      — route: /spaces/daria-home
    ├── life-with-ai.tsx    — route: /spaces/life-with-ai
    ├── trading-os.tsx      — route: /spaces/trading-os
    └── bianca-os.tsx       — route: /spaces/bianca-os

src/components/life-os/
├── AssistantCard.tsx       — individual AI assistant card
├── SpaceLayout.tsx         — shared shell for all space pages (background, header, back nav)
└── SpaceModuleCard.tsx     — module card used inside space pages
```

---

## Data flow principle

```
User opens LIFE_OS_APP
        │
        ▼
Views homepage (hero + team + spaces)
        │
        ▼
Clicks a Space card (e.g. "Відкрити" on Daria Home)
        │
        ▼
Navigates to /spaces/daria-home (TanStack Router, client-side)
        │
        ▼
Sees placeholder modules (Нотатки, Ідеї, Денний план, Задачі)
        │
        ▼
(Future) Each module opens or syncs with ../PERSONAL_OS data
```

No data is stored in LIFE_OS_APP itself.  
All real content lives in the OS folders (`PERSONAL_OS/`, `LIFE_WITH_AI/`, etc.).  
LIFE_OS_APP reads and surfaces that content — it never owns it.

---

## What is not yet built

| Feature | Where it would live |
|---|---|
| Real data binding (notes, tasks, etc.) | Space pages ↔ OS folders |
| Bianca OS dashboard | New standalone app |
| AI_TRADING_AGENT integration | `../AI_TRADING_AGENT/` + Trading OS space |
| Authentication / user session | LIFE_OS_APP backend layer |
| AI assistant chat / actions | Each AssistantCard |

---

*Last updated: 2026-05-31*
