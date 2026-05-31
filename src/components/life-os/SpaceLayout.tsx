import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import bgAiSpace from "@/assets/bg-ai-space.png";

interface SpaceLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SpaceLayout({ title, description, children }: SpaceLayoutProps) {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgAiSpace})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative max-w-[1380px] mx-auto px-5 md:px-10 pt-8 pb-32">
        <header className="flex items-center gap-4 mb-14">
          <Link
            to="/"
            className="h-10 w-10 rounded-2xl glass-solid grid place-items-center text-foreground/60 hover:text-foreground transition shrink-0"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
          </Link>
          <div className="leading-none">
            <p className="label-premium">Мої простори</p>
            <p className="font-display text-[1.85rem] text-foreground mt-1.5">{title}</p>
          </div>
          <p className="ml-auto hidden md:block text-[13px] text-muted-foreground max-w-xs text-right leading-relaxed">
            {description}
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}

interface SpaceModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  meta?: string;
}

export function SpaceModuleCard({ icon: Icon, title, description, meta }: SpaceModuleCardProps) {
  return (
    <div className="glass-lift rounded-[28px] p-8 flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div className="h-11 w-11 rounded-2xl glass-solid grid place-items-center">
          <Icon className="h-5 w-5 text-foreground/65" strokeWidth={1.5} />
        </div>
        {meta && <span className="label-premium">{meta}</span>}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-[1.45rem] leading-tight text-foreground mb-2">{title}</h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="space-y-2 py-1">
        <div className="h-1.5 rounded-full bg-foreground/[0.05] w-3/4" />
        <div className="h-1.5 rounded-full bg-foreground/[0.04] w-1/2" />
        <div className="h-1.5 rounded-full bg-foreground/[0.03] w-2/3" />
      </div>
      <span className="label-premium text-foreground/35">незабаром</span>
    </div>
  );
}
