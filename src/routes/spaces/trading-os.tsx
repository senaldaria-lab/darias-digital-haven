import { createFileRoute } from "@tanstack/react-router";
import { Bot, Radio, Shield, BarChart2 } from "lucide-react";
import { SpaceLayout, SpaceModuleCard } from "@/components/life-os/SpaceLayout";

const modules = [
  {
    icon: Bot,
    title: "Статус бота",
    description: "Поточний стан торгового бота і відкриті позиції.",
    meta: "офлайн",
  },
  {
    icon: Radio,
    title: "Сигнали",
    description: "Торгові сигнали та ринкові сповіщення в реальному часі.",
    meta: "0 сигналів",
  },
  {
    icon: Shield,
    title: "Контроль ризиків",
    description: "Ліміти ризику, стоп-лоси і параметри відкритих позицій.",
    meta: "норма",
  },
  {
    icon: BarChart2,
    title: "Звіти",
    description: "Фінансові звіти, P&L і статистика торгівлі.",
    meta: "0 звітів",
  },
];

export function TradingOS() {
  return (
    <SpaceLayout
      title="Trading OS"
      description="Торговий бот, сигнали, контроль ризиків і звіти."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((m) => (
          <SpaceModuleCard key={m.title} {...m} />
        ))}
      </div>
    </SpaceLayout>
  );
}

export const Route = createFileRoute("/spaces/trading-os")({
  component: TradingOS,
});
