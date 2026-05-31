import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Camera, Film, TrendingUp, Calendar } from "lucide-react";
import { SpaceLayout, SpaceModuleCard } from "@/components/life-os/SpaceLayout";

const modules = [
  {
    icon: Sparkles,
    title: "Ідеї контенту",
    description: "Ідеї для постів, рілс і сторіс — зібрані в одному місці.",
    meta: "0 ідей",
  },
  {
    icon: Camera,
    title: "Instagram план",
    description: "Публікації, хештеги і стратегія акаунту.",
    meta: "0 постів",
  },
  {
    icon: Film,
    title: "Сценарії рілс",
    description: "Сценарії та ідеї для відеоконтенту і рілс.",
    meta: "0 сценаріїв",
  },
  {
    icon: TrendingUp,
    title: "Тренди",
    description: "Актуальні тренди в AI, контенті та соцмережах.",
    meta: "оновлено",
  },
  {
    icon: Calendar,
    title: "Контент-план",
    description: "Тижневий та місячний план публікацій і активності.",
    meta: "цей тиждень",
  },
];

export function LifeWithAI() {
  return (
    <SpaceLayout
      title="Life with AI"
      description="Контент, Instagram, навчання з AI і тренди."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <SpaceModuleCard key={m.title} {...m} />
        ))}
      </div>
    </SpaceLayout>
  );
}

export const Route = createFileRoute("/spaces/life-with-ai")({
  component: LifeWithAI,
});
