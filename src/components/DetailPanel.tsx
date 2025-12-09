import { X, ExternalLink, Calendar, Building2, Code2, CheckCircle2, Target, TrendingUp, GraduationCap, Download } from "lucide-react";
import { useDetailPanel } from "@/contexts/DetailPanelContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function DetailPanel() {
  const { isOpen, detailData, closeDetail } = useDetailPanel();
  const [imageError, setImageError] = useState(false);

  // Reset image error when detailData changes
  useEffect(() => {
    setImageError(false);
  }, [detailData?.id]);

  if (!detailData) return null;

  const { type, title, subtitle, content } = detailData;

  return (
    <>
      {/* Overlay - Reduced blur for better integration */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeDetail}
      />

      {/* Detail Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full md:w-[50%] lg:w-[45%] xl:w-[40%] bg-background border-l border-border z-50 shadow-2xl transition-transform duration-300 ease-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "hsl(var(--muted-foreground) / 0.3) transparent",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {subtitle && (
                <p className="text-sm font-mono text-primary mb-2">{subtitle}</p>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">{title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {content.period && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{content.period}</span>
                  </div>
                )}
                {content.company && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{content.company}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={closeDetail}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8 animate-slide-up">
          {/* PDF Certificate/CV Preview - Only for education type */}
          {type === "education" && content.certificate && (
            <div className="space-y-4">
              {/* Download button for CV */}
              {detailData.id === "cv-preview" && (
                <div className="flex justify-end">
                  <a
                    href={content.certificate}
                    download="Mario-Costa-CV.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 hover:scale-105 transition-all shadow-md hover:shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                </div>
              )}
              
              <div 
                className="relative rounded-xl overflow-hidden border border-border bg-muted/30"
                onContextMenu={(e) => e.preventDefault()}
                style={{ userSelect: "none", WebkitUserSelect: "none" }}
              >
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1.5 text-xs font-mono bg-background/90 backdrop-blur-sm text-foreground rounded-md border border-border shadow-lg">
                    {detailData.id === "cv-preview" ? "CV Preview" : "Certificate Preview"}
                  </div>
                </div>
                <div className="w-full" style={{ height: "80vh", minHeight: "600px", position: "relative" }}>
                  <iframe
                    src={`${content.certificate}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="w-full h-full border-0"
                    title={detailData.id === "cv-preview" ? "Mário Costa CV" : `${title} Certificate`}
                    style={{ 
                      pointerEvents: "auto",
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </div>
            </div>
          )}

          {/* Image - Only show if image exists and hasn't failed to load */}
          {type !== "education" && content.image && !imageError && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border group">
              <img
                src={content.image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => {
                  setImageError(true);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Education Info */}
          {type === "education" && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education Details
              </h3>
              <div className="space-y-2 text-muted-foreground">
                {content.institution && (
                  <p className="text-base">
                    <span className="font-medium text-foreground">Institution:</span> {content.institution}
                  </p>
                )}
                {content.year && (
                  <p className="text-base">
                    <span className="font-medium text-foreground">Year:</span> {content.year}
                  </p>
                )}
                {content.type && (
                  <p className="text-base">
                    <span className="font-medium text-foreground">Type:</span> {content.type}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {content.longDescription && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Code2 className="w-5 h-5 text-primary" />
                Overview
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">{content.longDescription}</p>
            </div>
          )}

          {/* Role & Responsibilities */}
          {content.role && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Target className="w-5 h-5 text-primary" />
                Role & Responsibilities
              </h3>
              <p className="text-muted-foreground mb-4 text-base font-medium">{content.role}</p>
              {content.responsibilities && (
                <ul className="space-y-3">
                  {content.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Achievements */}
          {content.achievements && content.achievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <TrendingUp className="w-5 h-5 text-primary" />
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {content.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/30 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Highlights */}
          {content.highlights && content.highlights.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {content.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-sm bg-muted rounded-lg text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          {content.challenges && content.challenges.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Challenges & Solutions</h3>
              <ul className="space-y-3">
                {content.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span className="text-muted-foreground leading-relaxed flex-1">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {content.results && content.results.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Results</h3>
              <ul className="space-y-3">
                {content.results.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                    <span className="text-secondary font-bold mt-0.5">•</span>
                    <span className="text-muted-foreground leading-relaxed flex-1">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {content.tech && content.tech.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {content.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-mono bg-primary/10 text-primary rounded-lg border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Link */}
          {content.link && (
            <div className="pt-6 border-t border-border">
              <a
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 hover:shadow-lg transition-all shadow-md"
              >
                Visit Project
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

