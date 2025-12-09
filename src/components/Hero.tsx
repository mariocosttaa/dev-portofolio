import { Github, Linkedin, Mail, ArrowDown, Code2, Layers, Zap, Download, Eye } from "lucide-react";
import { getPersonalInfo } from "@/lib/api";
import { useDetailPanel } from "@/contexts/DetailPanelContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { t, language } = useLanguage();
  const personal = getPersonalInfo(language);
  const { openDetail } = useDetailPanel();

  const handleCVPreview = () => {
    openDetail({
      type: "education",
      id: "cv-preview",
      title: t("cv.title"),
      subtitle: t("cv.subtitle"),
      content: {
        description: t("cv.description"),
        certificate: "/MARIO COSTA CV.pdf",
        institution: t("cv.institution"),
        year: "2024",
        type: t("cv.type"),
      },
    });
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-mesh">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 right-[20%] w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" />

      <div className="container relative z-10 min-h-screen grid lg:grid-cols-2 gap-8 items-center pt-24 pb-12">
        {/* Left side - Text content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border opacity-0-initial animate-slide-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">{t("hero.available")}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] opacity-0-initial animate-slide-up stagger-1">
              <span className="block">{personal.name.first}</span>
              <span className="block text-gradient">{personal.name.last}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-md opacity-0-initial animate-slide-up stagger-2">
              {t("hero.title")} {t("hero.subtitle")}
            </p>
          </div>

          <p className="text-muted-foreground max-w-md leading-relaxed opacity-0-initial animate-slide-up stagger-3">
            {t("hero.description")} 
            {t("hero.basedIn")} <span className="text-primary font-medium">{personal.location.full}</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 opacity-0-initial animate-slide-up stagger-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 transition-transform"
            >
              {t("hero.viewWork")}
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:bg-muted transition-colors"
            >
              {t("hero.letsTalk")}
            </a>
            <div className="relative group">
              <button
                onClick={handleCVPreview}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/40 rounded-full font-medium hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:border-primary/60 hover:scale-105 transition-all text-primary shadow-sm hover:shadow-md"
              >
                <Eye className="w-4 h-4" />
                {t("hero.viewCV")}
              </button>
              <a
                href="/MARIO COSTA CV.pdf"
                download="Mario-Costa-CV.pdf"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-muted whitespace-nowrap shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="w-3 h-3" />
                {t("hero.download")}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-5 pt-4 opacity-0-initial animate-slide-up stagger-5">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personal.social.email}`}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right side - Profile image & Bento grid */}
        <div className="space-y-4 lg:pl-8">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end opacity-0-initial animate-scale-in stagger-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                <img
                  src="/mario-costa.jpeg"
                  alt="Mário Costa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bento-item p-6 card-3d opacity-0-initial animate-scale-in stagger-2">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <span className="text-5xl font-bold text-gradient">{personal.stats.yearsExperience}+</span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{t("hero.yearsExperience")}</h3>
            <p className="text-sm text-muted-foreground">{t("hero.buildingProduction")}</p>
          </div>

          <div className="bento-item p-5 card-3d opacity-0-initial animate-scale-in stagger-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-3xl font-bold text-foreground">{personal.stats.projectsDelivered}+</span>
            <p className="text-sm text-muted-foreground mt-1">{t("hero.projectsDelivered")}</p>
          </div>

          <div className="bento-item p-5 card-3d opacity-0-initial animate-scale-in stagger-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <span className="text-3xl font-bold text-foreground">{personal.stats.saasProducts}+</span>
            <p className="text-sm text-muted-foreground mt-1">{t("hero.saasProducts")}</p>
          </div>

          <div className="col-span-2 bento-item p-5 card-3d opacity-0-initial animate-scale-in stagger-5">
            <p className="text-sm text-muted-foreground mb-3">{t("hero.techStack")}</p>
            <div className="flex flex-wrap gap-2">
              {personal.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-mono bg-muted/50 rounded-full text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-0-initial animate-slide-up stagger-6">
        <span className="text-xs font-mono uppercase tracking-widest">{t("hero.scroll")}</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
