import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DetailPanel } from "@/components/DetailPanel";
import { getFeaturedProjects, getOpenSourceProjects, getPersonalInfo } from "@/lib/api";
import { useDetailPanel } from "@/contexts/DetailPanelContext";
import { getProjectDetail, getOpenSourceProjectDetail } from "@/lib/detailData";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  ExternalLink, Github, Star, GitFork, Folder, X, Filter, 
  Code, Database, Cloud, Layers, Package, Zap, Globe, 
  Briefcase, Box, Search, GitBranch, Lock, Eye
} from "lucide-react";
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
  JavaScript: "bg-yellow-400",
  React: "bg-cyan-400",
  Laravel: "bg-red-500",
};

// Tech icon mapping - using lucide icons and emojis for better recognition
const techIcons: Record<string, { icon: React.ReactNode; emoji?: string }> = {
  Laravel: { icon: <Code className="w-4 h-4" />, emoji: "🔴" },
  PHP: { icon: <Code className="w-4 h-4" />, emoji: "🐘" },
  Python: { icon: <Code className="w-4 h-4" />, emoji: "🐍" },
  React: { icon: <Layers className="w-4 h-4" />, emoji: "⚛️" },
  TypeScript: { icon: <Code className="w-4 h-4" />, emoji: "📘" },
  JavaScript: { icon: <Code className="w-4 h-4" />, emoji: "🟨" },
  Docker: { icon: <Box className="w-4 h-4" />, emoji: "🐳" },
  PostgreSQL: { icon: <Database className="w-4 h-4" />, emoji: "🐘" },
  MySQL: { icon: <Database className="w-4 h-4" />, emoji: "🗄️" },
  Redis: { icon: <Database className="w-4 h-4" />, emoji: "🔴" },
  Vue: { icon: <Layers className="w-4 h-4" />, emoji: "💚" },
  "Vue.js": { icon: <Layers className="w-4 h-4" />, emoji: "💚" },
  TailwindCSS: { icon: <Zap className="w-4 h-4" />, emoji: "🎨" },
  Tailwind: { icon: <Zap className="w-4 h-4" />, emoji: "🎨" },
  Livewire: { icon: <Zap className="w-4 h-4" />, emoji: "⚡" },
  WebSockets: { icon: <Globe className="w-4 h-4" />, emoji: "🌐" },
  Stripe: { icon: <Package className="w-4 h-4" />, emoji: "💳" },
  N8N: { icon: <Zap className="w-4 h-4" />, emoji: "🔧" },
  API: { icon: <Globe className="w-4 h-4" />, emoji: "🔌" },
  "Ruby on Rails": { icon: <Code className="w-4 h-4" />, emoji: "💎" },
  FastAPI: { icon: <Zap className="w-4 h-4" />, emoji: "⚡" },
  Django: { icon: <Layers className="w-4 h-4" />, emoji: "🎸" },
  GraphQL: { icon: <Globe className="w-4 h-4" />, emoji: "🔷" },
  Supabase: { icon: <Database className="w-4 h-4" />, emoji: "🚀" },
  SQLite: { icon: <Database className="w-4 h-4" />, emoji: "📦" },
  Git: { icon: <Github className="w-4 h-4" />, emoji: "📝" },
  "WhatsApp API": { icon: <Globe className="w-4 h-4" />, emoji: "💬" },
  "CI/CD": { icon: <Zap className="w-4 h-4" />, emoji: "🔄" },
  "GitHub Actions": { icon: <Github className="w-4 h-4" />, emoji: "⚙️" },
  Vercel: { icon: <Cloud className="w-4 h-4" />, emoji: "▲" },
  Coolify: { icon: <Cloud className="w-4 h-4" />, emoji: "☁️" },
  "Laravel Cloud": { icon: <Cloud className="w-4 h-4" />, emoji: "☁️" },
};

// Get icon for tech
const getTechIcon = (tech: string): { icon: React.ReactNode; emoji?: string } => {
  const techData = techIcons[tech] || techIcons[tech.toLowerCase()] || { icon: <Code className="w-4 h-4" /> };
  return techData;
};

export default function Projects() {
  const featuredProjects = getFeaturedProjects();
  const openSourceProjects = getOpenSourceProjects();
  const personal = getPersonalInfo();
  const { openDetail } = useDetailPanel();
  const { t } = useLanguage();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "open-source" | "commercial">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get all unique tech from all projects
  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    featuredProjects.forEach((project) => {
      project.tech.forEach((t) => techSet.add(t));
    });
    openSourceProjects.forEach((project) => {
      if (project.language) techSet.add(project.language);
    });
    return Array.from(techSet).sort();
  }, [featuredProjects, openSourceProjects]);

  // Filter projects based on selected tech and category
  const filteredFeatured = useMemo(() => {
    let filtered = featuredProjects;
    
    if (selectedTech) {
      filtered = filtered.filter((project) => 
        project.tech.some((tech) => tech.toLowerCase() === selectedTech.toLowerCase())
      );
    }
    
    if (activeCategory === "open-source") {
      return [];
    }
    
    return filtered;
  }, [featuredProjects, selectedTech, activeCategory]);

  const filteredOpenSource = useMemo(() => {
    let filtered = openSourceProjects;
    
    // Filter by tech
    if (selectedTech) {
      filtered = filtered.filter((project) => 
        project.language.toLowerCase() === selectedTech.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((project) => 
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.language.toLowerCase().includes(query)
      );
    }
    
    if (activeCategory === "commercial") {
      return [];
    }
    
    return filtered;
  }, [openSourceProjects, selectedTech, activeCategory, searchQuery]);

  const handleProjectClick = (projectId: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    const detail = getProjectDetail(projectId);
    if (detail) {
      openDetail(detail);
    }
  };

  const handleOpenSourceClick = (projectId: string, e: React.MouseEvent) => {
    // Don't open detail if clicking on links
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    const detail = getOpenSourceProjectDetail(projectId);
    if (detail) {
      openDetail(detail);
    }
  };

  const clearFilter = () => {
    setSelectedTech(null);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const clearAllFilters = () => {
    setSelectedTech(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        {/* Header */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-50" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-mono text-sm mb-4 block">// {t("projects.allProjects")}</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t("projects.myProjects")}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t("projects.comprehensiveCollection")}
              </p>
            </div>
          </div>
        </section>

        {/* Filters - Below Header */}
        <section className="py-6 border-b border-border bg-background">
          <div className="container">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t("projects.searchProjects")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted/80 rounded-lg transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {/* Active Filters Display */}
                {(selectedTech || searchQuery) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {searchQuery && (
                      <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium flex items-center gap-2 border border-primary/20">
                        <span>{t("projects.search")}: "{searchQuery}"</span>
                        <button
                          onClick={clearSearch}
                          className="hover:bg-primary/20 rounded p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {selectedTech && (
                      <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium flex items-center gap-2 border border-primary/20">
                        {getTechIcon(selectedTech).emoji && <span>{getTechIcon(selectedTech).emoji}</span>}
                        <span>{selectedTech}</span>
                        <button
                          onClick={clearFilter}
                          className="hover:bg-primary/20 rounded p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {(selectedTech || searchQuery) && (
                      <button
                        onClick={clearAllFilters}
                        className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all flex items-center gap-1.5"
                      >
                        <X className="w-3 h-3" />
                        {t("projects.clearAll")}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Category and Tech Filters */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Category Filter */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{t("projects.category")}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { id: "all", label: t("projects.all"), icon: <Box className="w-4 h-4" /> },
                      { id: "commercial", label: t("projects.commercial"), icon: <Briefcase className="w-4 h-4" /> },
                      { id: "open-source", label: t("projects.openSource"), icon: <GitBranch className="w-4 h-4" /> },
                    ].map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id as any)}
                        className={cn(
                          "px-4 py-2.5 text-sm font-medium rounded-xl transition-all flex items-center gap-2 border-2",
                          activeCategory === category.id
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border-transparent hover:border-primary/30"
                        )}
                      >
                        {category.icon}
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Filter */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{t("projects.technology")}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {allTech.map((tech) => {
                      const techIcon = getTechIcon(tech);
                      const isSelected = selectedTech === tech;
                      return (
                        <button
                          key={tech}
                          onClick={() => setSelectedTech(isSelected ? null : tech)}
                          className={cn(
                            "px-3 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 border",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border-transparent hover:border-primary/30"
                          )}
                          title={`Filter by ${tech}`}
                        >
                          {techIcon.emoji && <span className="text-sm">{techIcon.emoji}</span>}
                          <span className="font-mono">{tech}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Projects */}
        {(activeCategory === "all" || activeCategory === "commercial") && (
          <section className="py-16">
            <div className="container">
              <div className="mb-12">
                <span className="text-primary font-mono text-sm mb-2 block">// {t("projects.commercialProjects")}</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {t("projects.featuredWork")}
                </h2>
                <p className="text-muted-foreground">
                  {t("projects.productionReady")}
                </p>
              </div>

              {filteredFeatured.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {selectedTech ? t("projects.noCommercialProjects", { tech: selectedTech }) : t("projects.noProjectsToDisplay")}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeatured.map((project) => {
                    const isInactive = project.status === "inactive";
                    return (
                      <div
                        key={project.id}
                        className="group relative"
                      >
                        {/* Click indicator - Above card */}
                        {!isInactive && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="px-3 py-1.5 text-xs font-mono bg-primary text-primary-foreground rounded-full border-2 border-background shadow-lg whitespace-nowrap">
                              {t("projects.clickForDetails")}
                            </div>
                          </div>
                        )}
                        {/* Unavailable badge */}
                        {isInactive && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                            <div className="px-3 py-1.5 text-xs font-mono bg-muted text-muted-foreground rounded-full border-2 border-background shadow-lg whitespace-nowrap flex items-center gap-1.5">
                              <Lock className="w-3 h-3" />
                              {t("work.unavailable")}
                            </div>
                          </div>
                        )}
                        <div
                          onClick={isInactive ? undefined : (e) => handleProjectClick(project.id, e)}
                          className={cn(
                            "bento-item p-6 card-3d transition-all",
                            isInactive 
                              ? "opacity-75 cursor-not-allowed" 
                              : "cursor-pointer hover:border-primary/50 hover:shadow-lg"
                          )}
                        >

                      {/* Project Image - Only show if image exists */}
                      {project.image && (
                        <div className={cn(
                          "relative aspect-video rounded-xl overflow-hidden border mb-4 flex items-center justify-center",
                          colorMap[project.color],
                          isInactive && "opacity-50 grayscale"
                        )}>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const container = target.closest('div');
                              if (container) {
                                container.style.display = "none";
                              }
                            }}
                          />
                          {isInactive && (
                            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                              <Lock className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Project Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-muted-foreground">{project.subtitle}</span>
                          {isInactive && (
                            <span className="px-2 py-0.5 text-xs font-mono bg-muted text-muted-foreground rounded-md border border-border">
                              {t("work.unavailable")}
                            </span>
                          )}
                        </div>
                        <h3 className={cn(
                          "text-xl font-bold mb-2 transition-all",
                          isInactive ? "text-muted-foreground" : "text-foreground group-hover:text-gradient"
                        )}>
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => {
                            const techIcon = getTechIcon(tech);
                            return (
                              <span
                                key={tech}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTech(tech);
                                }}
                                className="px-2 py-1.5 text-xs font-medium bg-muted rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-pointer flex items-center gap-1.5 border border-transparent hover:border-primary/20"
                                title={`Filter by ${tech}`}
                              >
                                {techIcon.emoji && <span>{techIcon.emoji}</span>}
                                <span className="font-mono">{tech}</span>
                              </span>
                            );
                          })}
                        </div>

                        {project.link && !isInactive && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          >
                            {t("work.visitProject")} <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {isInactive && (
                          <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Lock className="w-4 h-4" />
                            {t("work.projectUnavailable")}
                          </div>
                        )}
                      </div>
                      </div>
                    </div>
                  );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Open Source Projects */}
        {(activeCategory === "all" || activeCategory === "open-source") && (
          <section className="py-16 bg-muted/30">
            <div className="container">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <span className="text-primary font-mono text-sm mb-2 block">// {t("projects.openSource")}</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {t("projects.openSourceContributions")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("projects.publicRepositories")}
                  </p>
                </div>
                {filteredOpenSource.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    {filteredOpenSource.length} {filteredOpenSource.length === 1 ? t("projects.project") : t("projects.projects")}
                  </div>
                )}
              </div>

              {filteredOpenSource.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery || selectedTech 
                      ? (() => {
                          const searchPart = searchQuery ? t("projects.matching", { query: searchQuery }) : '';
                          const techPart = selectedTech ? t("projects.using", { tech: selectedTech }) : '';
                          return t("projects.noOpenSourceProjects", { search: searchPart, tech: techPart });
                        })()
                      : t("projects.noProjectsToDisplay")}
                  </p>
                  {(searchQuery || selectedTech) && (
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 px-4 py-2 text-sm text-primary hover:underline"
                    >
                      {t("projects.clearFilters")}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredOpenSource.map((project) => (
                    <div
                      key={project.id}
                      className="group relative"
                    >
                      {/* Click indicator - Above card */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="px-3 py-1.5 text-xs font-mono bg-primary text-primary-foreground rounded-full border-2 border-background shadow-lg whitespace-nowrap">
                          {t("projects.clickForDetails")}
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
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <DetailPanel />
    </div>
  );
}

