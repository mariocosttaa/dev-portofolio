import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowUpRight, Star, GitFork, Folder, Lock } from "lucide-react";
import { getFeaturedProjects, getOpenSourceProjects, getPersonalInfo } from "@/lib/api";
import { useDetailPanel } from "@/contexts/DetailPanelContext";
import { getProjectDetail, getOpenSourceProjectDetail } from "@/lib/detailData";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
};

const langColors: Record<string, string> = {
  PHP: "bg-indigo-500",
  TypeScript: "bg-blue-500",
  Python: "bg-yellow-500",
  Docker: "bg-cyan-500",
};

export function FeaturedWork() {
  const { t, language } = useLanguage();
  const featuredProjects = getFeaturedProjects(language);
  const openSourceProjects = getOpenSourceProjects(language);
  const personal = getPersonalInfo(language);
  const { openDetail } = useDetailPanel();

  const handleProjectClick = (projectId: string, projectStatus: string, e: React.MouseEvent) => {
    // Don't open detail if clicking on the link or if project is inactive
    if ((e.target as HTMLElement).closest('a') || projectStatus === "inactive") {
      return;
    }
    const detail = getProjectDetail(projectId, language);
    if (detail) {
      openDetail(detail);
    }
  };

  const handleOpenSourceClick = (projectId: string, e: React.MouseEvent) => {
    // Don't open detail if clicking on links
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    const detail = getOpenSourceProjectDetail(projectId, language);
    if (detail) {
      openDetail(detail);
    }
  };

  return (
    <section id="work" className="py-24 relative">
      <div className="absolute inset-0 bg-dots opacity-30" />
      
      <div className="container relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <span className="text-primary font-mono text-sm mb-4 block">// {t("work.title")}</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              {t("work.projectsContributions")}
            </h2>
          </div>
          <div className="lg:text-right self-end">
            <p className="text-muted-foreground max-w-md lg:ml-auto">
              {t("work.selectionShowcase")}
            </p>
          </div>
        </div>

        {/* Featured projects - Horizontal cards */}
        <div className="space-y-6 mb-20">
          {featuredProjects.map((project, index) => {
            const isInactive = project.status === "inactive";
            return (
              <div
                key={project.id}
                onClick={(e) => handleProjectClick(project.id, project.status, e)}
                className={cn(
                  "group relative grid md:grid-cols-2 gap-6 p-6 md:p-8 bento-item card-3d transition-all",
                  isInactive 
                    ? "opacity-75 cursor-not-allowed" 
                    : "cursor-pointer hover:border-primary/50 hover:shadow-lg",
                  index % 2 === 1 ? "md:direction-rtl" : ""
                )}
              >
                {/* Click indicator */}
                {!isInactive && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded-md border border-primary/20">
                      {t("work.clickToViewDetails")}
                    </div>
                  </div>
                )}
                {/* Unavailable badge */}
                {isInactive && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-md border border-border flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      {t("work.unavailable")}
                    </div>
                  </div>
                )}
              {/* Project image - Only show if image exists */}
              {project.image && (
                <div className={cn(
                  "relative aspect-video rounded-xl overflow-hidden border flex items-center justify-center",
                  colorMap[project.color],
                  isInactive && "opacity-50 grayscale",
                  index % 2 === 1 ? "md:order-2" : ""
                )}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const container = target.closest('div');
                      if (container) {
                        container.style.display = 'none';
                      }
                    }}
                  />
                  {isInactive && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <Lock className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </div>
              )}

              {/* Project info */}
              <div className={cn(
                "flex flex-col justify-center",
                index % 2 === 1 ? "md:order-1 md:text-right md:items-end" : ""
              )}>
                <div className={cn(
                  "flex items-center gap-2 mb-2",
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                )}>
                  <span className="text-sm font-mono text-muted-foreground">{project.subtitle}</span>
                  {isInactive && (
                    <span className="px-2 py-0.5 text-xs font-mono bg-muted text-muted-foreground rounded-md border border-border">
                      {t("work.unavailable")}
                    </span>
                  )}
                </div>
                <h3 className={cn(
                  "text-2xl md:text-3xl font-bold mb-3 transition-all",
                  isInactive ? "text-muted-foreground" : "text-foreground group-hover:text-gradient"
                )}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  {project.description}
                </p>
                <div className={cn(
                  "flex flex-wrap gap-2 mb-4",
                  index % 2 === 1 ? "md:justify-end" : ""
                )}>
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-mono bg-muted rounded-full text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && !isInactive && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline",
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    )}
                  >
                    {t("work.visitProject")} <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {isInactive && (
                  <div className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground",
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  )}>
                    <Lock className="w-4 h-4" />
                    {t("work.projectUnavailable")}
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mb-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 hover:shadow-lg transition-all"
          >
            {t("work.viewAllProjects")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Open Source Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">{t("work.openSource")}</h3>
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              {t("work.viewAllOnGitHub")}
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {openSourceProjects.map((project) => (
              <div
                key={project.id}
                className="group relative"
              >
                {/* Click indicator - Above card */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="px-3 py-1.5 text-xs font-mono bg-primary text-primary-foreground rounded-full border-2 border-background shadow-lg whitespace-nowrap">
                    Click for details
                  </div>
                </div>
                <div
                  onClick={(e) => handleOpenSourceClick(project.id, e)}
                  className="bento-item p-5 card-3d hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Folder className="w-8 h-8 text-primary" />
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" /> {project.forks}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-mono text-sm text-foreground group-hover:text-primary transition-colors mb-2 truncate">
                    {project.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${langColors[project.language] || "bg-gray-500"}`} />
                      <span className="text-xs text-muted-foreground">{project.language}</span>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
