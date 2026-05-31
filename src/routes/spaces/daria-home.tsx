import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen, Lightbulb, CalendarDays, ListChecks } from "lucide-react";
import { SpaceLayout, SpaceModuleCard } from "@/components/life-os/SpaceLayout";

const modules = [
  {
    icon: NotebookPen,
    title: "Нотатки",
    description: "Особисті нотатки, думки і спостереження в одному місці.",
    meta: "0 нотаток",
  },
  {
    icon: Lightbulb,
    title: "Ідеї",
    description: "Ідеї для проєктів, бізнесу і творчих рішень.",
    meta: "0 ідей",
  },
  {
    icon: CalendarDays,
    title: "Денний план",
    description: "Планування дня, пріоритети і фокус на сьогодні.",
    meta: "сьогодні",
  },
  {
    icon: ListChecks,
    title: "Задачі",
    description: "Активні задачі та список справ на день.",
    meta: "0 активних",
  },
];

export function DariaHome() {
  return (
    <SpaceLayout
      title="Daria Home"
      description="Особистий простір — нотатки, ідеї, фокус і планування."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((m) => (
          <SpaceModuleCard key={m.title} {...m} />
        ))}
      </div>
    </SpaceLayout>
  );
}

export const Route = createFileRoute("/spaces/daria-home")({
  component: DariaHome,
});
