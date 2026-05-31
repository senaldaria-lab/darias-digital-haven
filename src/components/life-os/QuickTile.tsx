import type { LucideIcon } from "lucide-react";

interface QuickTileProps {
  icon: LucideIcon;
  title: string;
  preview: string;
  meta?: string;
}

export function QuickTile({ icon: Icon, title, preview, meta }: QuickTileProps) {
  return (
    <button className="group relative text-left rounded-[24px] glass p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:glass-lift">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl btn-glass p-2.5">
          <Icon className="h-4 w-4 text-foreground/75" strokeWidth={1.5} />
        </div>
        {meta && (
          <span className="text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground">{meta}</span>
        )}
      </div>
      <div>
        <h3 className="font-display text-[1.55rem] leading-tight text-foreground">{title}</h3>
        <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">{preview}</p>
      </div>
      <div className="mt-auto flex items-center text-[11px] uppercase tracking-[0.2em] text-foreground/55 group-hover:text-foreground transition">
        Відкрити
        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}
