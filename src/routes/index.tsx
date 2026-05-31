import { createFileRoute } from "@tanstack/react-router";
import { LifeOS as LifeOSComponent } from "./-index-view";

// Exported so TanStack Router's code splitter skips code-splitting this component
// (the splitter only splits non-exported identifiers; a path apostrophe breaks its Babel template).
export const LifeOS = LifeOSComponent;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Life OS — Особистий цифровий простір Дарії" },
      {
        name: "description",
        content:
          "Life OS — персональний AI workspace. Команда асистентів, фокус дня і ритм твого життя в одному просторі.",
      },
      { property: "og:title", content: "Life OS — Особистий цифровий простір" },
      {
        property: "og:description",
        content: "Персональний AI workspace. Стильний, спокійний, твій.",
      },
    ],
  }),
  component: LifeOS,
});
