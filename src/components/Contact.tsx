import { Mail, MapPin, Github, Linkedin, ArrowUpRight, Sparkles, Download, FileText, Eye } from "lucide-react";
import { getContact, getPersonalInfo } from "@/lib/api";
import { useDetailPanel } from "@/contexts/DetailPanelContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Linkedin,
  Github,
};

const colorVariants: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

export function Contact() {
  const { t, language } = useLanguage();
  const contact = getContact(language);
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
    <section id="contact" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="space-y-6">
            <span className="text-primary font-mono text-sm">// {t("contact.title")}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {t("contact.letsBuild").split(" ").slice(0, 2).join(" ")} <br />
              <span className="text-gradient">{t("contact.letsBuild").split(" ").slice(2).join(" ")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              {t("contact.openToOpportunities")}
            </p>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{personal.location.full}</span>
            </div>
          </div>

          {/* Right side - Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contact.methods.map((method) => {
              const IconComponent = iconMap[method.icon] || Mail;
              const labelMap: Record<string, string> = {
                "Email Me": t("contact.emailMe"),
                "LinkedIn": t("contact.letsConnect"),
                "GitHub": t("contact.checkMyCode"),
              };
              const descriptionMap: Record<string, string> = {
                "mariocostaa6@gmail.com": t("contact.emailDescription"),
                "Let's connect": t("contact.letsConnect"),
                "Check my code": t("contact.checkMyCode"),
              };
              return (
                <a
                  key={method.id}
                  href={method.href}
                  target={method.type === "social" ? "_blank" : undefined}
                  rel={method.type === "social" ? "noopener noreferrer" : undefined}
                  className="group bento-item p-4 card-3d"
                >
                  <div className={`w-10 h-10 rounded-xl ${colorVariants[method.color]} flex items-center justify-center mb-3 group-hover:opacity-80 transition-opacity`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                    {labelMap[method.label] || method.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-muted-foreground">{descriptionMap[method.description] || method.description}</p>
                </a>
              );
            })}

            <div className="group bento-item p-4 card-3d relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all bg-gradient-to-br from-primary/5 via-background to-secondary/5">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/5 rounded-full blur-lg translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative space-y-3">
                {/* Icon and badge */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded-md border border-primary/20">
                    CV
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-base text-foreground mb-0.5">{t("contact.curriculumVitae")}</h3>
                  <p className="text-xs text-muted-foreground">{t("contact.english")} • {t("contact.pdf")}</p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <button
                    onClick={handleCVPreview}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {t("contact.previewCV")}
                  </button>
                  <a
                    href="/MARIO COSTA CV.pdf"
                    download="Mario-Costa-CV.pdf"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border-2 border-primary/30 rounded-lg text-sm font-medium hover:bg-primary/10 hover:border-primary/50 transition-all text-primary"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t("contact.downloadPDF")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
