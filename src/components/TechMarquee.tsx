import { getTechnologies } from "@/lib/api";

import { useLanguage } from "@/contexts/LanguageContext";

export function TechMarquee() {
  const { language } = useLanguage();
  const technologies = getTechnologies(language);

  return (
    <section className="py-8 overflow-hidden border-y border-border bg-muted/30">
      <div className="flex animate-marquee">
        {[...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-8 px-8 whitespace-nowrap"
          >
            <span className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors cursor-default">
              {tech}
            </span>
            <span className="w-2 h-2 bg-primary/50 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
