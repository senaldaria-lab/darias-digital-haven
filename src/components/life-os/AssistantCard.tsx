import { Sparkles } from "lucide-react";

interface AssistantCardProps {
  name: string;
  role: string;
  image: string;
  actions: string[];
  accent?: "warm" | "cool";
}

export function AssistantCard({ name, role, image, actions, accent = "warm" }: AssistantCardProps) {
  return (
    <article className="group relative flex flex-col rounded-3xl glass-lift overflow-hidden transition-all duration-500 hover:-translate-y-1">
      {/* halo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            accent === "cool"
              ? "radial-gradient(120% 60% at 50% 100%, oklch(0.9 0.04 240 / 0.55), transparent 60%)"
              : "radial-gradient(120% 60% at 50% 100%, oklch(0.94 0.025 80 / 0.6), transparent 60%)",
        }}
      />

      {/* portrait area */}
      <div className="relative h-[340px] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-6 top-6 bottom-0 rounded-[28px]"
          style={{
            background:
              accent === "cool"
                ? "linear-gradient(180deg, oklch(0.96 0.012 240) 0%, oklch(0.92 0.02 245) 100%)"
                : "linear-gradient(180deg, oklch(0.97 0.012 80) 0%, oklch(0.92 0.022 78) 100%)",
          }}
        />
        {/* subtle holo grid */}
        <div aria-hidden className="absolute inset-x-6 top-6 bottom-0 rounded-[28px] grid-lines opacity-40" />
        <img
          src={image}
          alt={`${name}, ${role}`}
          loading="lazy"
          width={512}
          height={1024}
          className="absolute inset-x-0 bottom-0 mx-auto h-[340px] w-auto object-contain object-bottom drop-shadow-[0_30px_30px_rgba(40,40,55,0.12)] transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* status pill */}
        <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-medium text-foreground/80">
          <span className="relative pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          готовий допомогти
        </div>
      </div>

      {/* meta */}
      <div className="relative px-6 pt-5 pb-6 space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <h3 className="font-display text-3xl text-foreground leading-none">{name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{role}</p>
          </div>
          <Sparkles className="h-4 w-4 text-cool" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-2">
          {actions.map((a, i) => (
            <button
              key={a}
              className="group/btn flex items-center justify-between rounded-full border border-border/60 bg-card/50 px-4 py-2.5 text-sm text-foreground/85 transition-all hover:bg-foreground hover:text-background hover:border-foreground"
            >
              <span>{a}</span>
              <span className="text-xs opacity-50 group-hover/btn:opacity-100 transition-opacity">
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
