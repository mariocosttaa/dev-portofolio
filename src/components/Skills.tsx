import { Code, Database, Cloud, Wrench, Cpu, Layers } from "lucide-react";
import { getSkillCategories, getExpertise, getPersonalInfo } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Database,
  Cloud,
  Wrench,
  Cpu,
  Layers,
};

const colorVariants: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

export function Skills() {
  const { t, language } = useLanguage();
  const skillCategories = getSkillCategories(language);
  const expertise = getExpertise(language);
  const personal = getPersonalInfo(language);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh" />
      
      <div className="container relative">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// {t("skills.title")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("skills.toolsTechnologies")}
          </h2>
          <p className="text-muted-foreground">
            {t("skills.comprehensiveToolkit", { years: personal.stats.yearsExperience })}
          </p>
        </div>

        {/* Skills grid - Bento style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Code;
            return (
              <div
                key={category.id}
                className={`bento-item p-4 card-3d ${
                  index === 0 || index === 5 ? "lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${colorVariants[category.color]} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {category.skills.length}
                  </span>
                </div>
                
                <h3 className="font-semibold text-base text-foreground mb-3">{category.title}</h3>
                
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs bg-muted/50 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expertise badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">{t("skills.areasOfExpertise")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {expertise.map((expertise) => (
              <span
                key={expertise}
                className="px-5 py-2.5 glass rounded-full text-sm font-medium text-foreground neon-border"
              >
                {expertise}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
