import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, UserPlus, TrendingUp, FileText, Users } from "lucide-react";
import { SpaceLayout, SpaceModuleCard } from "@/components/life-os/SpaceLayout";

const modules = [
  {
    icon: ShoppingBag,
    title: "Shopify",
    description: "Продажі, замовлення і статистика магазинів Bianca i BohoConcept.",
    meta: "0 замовлень",
  },
  {
    icon: UserPlus,
    title: "Ліди",
    description: "Нові ліди, потенційні клієнти і вхідні запити.",
    meta: "0 лідів",
  },
  {
    icon: TrendingUp,
    title: "План продажів",
    description: "Цілі продажів, воронка і прогрес на місяць.",
    meta: "цей місяць",
  },
  {
    icon: FileText,
    title: "Контент",
    description: "Контент-матеріали для Bianca Mobilya і BohoConcept.",
    meta: "0 постів",
  },
  {
    icon: Users,
    title: "Клієнти",
    description: "База клієнтів, повторні покупки та комунікація.",
    meta: "0 клієнтів",
  },
];

export function BiancaOS() {
  return (
    <SpaceLayout
      title="Bianca OS"
      description="Bianca Mobilya, BohoConcept, продажі, Shopify і ліди."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <SpaceModuleCard key={m.title} {...m} />
        ))}
      </div>
    </SpaceLayout>
  );
}

export const Route = createFileRoute("/spaces/bianca-os")({
  component: BiancaOS,
});
