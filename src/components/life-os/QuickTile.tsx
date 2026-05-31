import type { LucideIcon } from "lucide-react";

interface QuickTileProps {
  icon: LucideIcon;
  title: string;
  preview: string;
  meta?: string;
}

export function QuickTile({ icon: Icon, title, preview, meta }: QuickTileProps) {
  return (
    <button className="group relative text-left rounded-3xl glass p-6 flex flex-col gap-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-background/80 p-2.5 hairline">
          <Icon className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
        </div>
        {meta && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{meta}</span>
        )}
      </div>
      <div>
        <h3 className="font-display text-2xl text-foreground leading-tight">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{preview}</p>
      </div>
      <div className="mt-auto flex items-center text-xs text-foreground/60 group-hover:text-foreground transition">
        Відкрити
        <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </button>
  );
}
