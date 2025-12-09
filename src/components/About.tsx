import { Building2, Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import { getWorkExperience, getEducation, getAboutContent, getPersonalInfo } from "@/lib/api";
import { useDetailPanel } from "@/contexts/DetailPanelContext";
import { getExperienceDetail } from "@/lib/detailData";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function About() {
  const { t, language } = useLanguage();
  const experiences = getWorkExperience(language);
  const education = getEducation(language);
  const about = getAboutContent(language);
  const personal = getPersonalInfo(language);
  const { openDetail } = useDetailPanel();

  const handleExperienceClick = (experienceId: string) => {
    const detail = getExperienceDetail(experienceId, language);
    if (detail) {
      openDetail(detail);
    }
  };

  const handleEducationClick = (edu: typeof education[0]) => {
    if (edu.certificate) {
      openDetail({
        type: "education",
        id: edu.id,
        title: edu.title,
        subtitle: edu.institution,
        content: {
          description: `${edu.title} from ${edu.institution} (${edu.year})`,
          certificate: edu.certificate,
          institution: edu.institution,
          year: edu.year,
          type: edu.type,
        },
      });
    }
  };

  return (
    <section id="about" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left side - About text */}
          <div className="lg:col-span-2 space-y-6">
            <span className="text-primary font-mono text-sm">// {t("about.title")}</span>
            
            {/* Profile Image - Mobile/Tablet */}
            <div className="flex justify-center lg:hidden mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-background shadow-xl ring-4 ring-primary/20">
                  <img
                    src="/mario-costa.jpeg"
                    alt="Mário Costa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              {t("about.storyBehind")} <br />
              <span className="text-gradient">{t("about.behindCode")}</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                {t("about.intro")}
              </p>
              <p>
                {t("about.specialization")}
              </p>
              <p>
                {t("about.journey")}
              </p>
            </div>

            {/* Location & Languages */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">{personal.location.full}</span>
              </div>
              <div className="flex flex-col gap-2">
                {personal.languages.map((lang, idx) => (
                  <div key={idx} className="px-4 py-2 glass rounded-full">
                    <span className="text-sm">{lang}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div id="education" className="pt-6 space-y-4 scroll-mt-24">
              <h3 className="font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                {t("about.education")}
              </h3>
              <div className="space-y-3">
                {education.map((edu) => {
                  const typeLabels: Record<string, string> = {
                    certification: t("about.certification"),
                    license: t("about.license"),
                    bachelor: t("about.bachelor"),
                    master: t("about.master"),
                    phd: t("about.phd"),
                    diploma: t("about.diploma"),
                  };
                  const hasCertificate = !!edu.certificate;
                  return (
                    <div 
                      key={edu.id} 
                      onClick={() => hasCertificate && handleEducationClick(edu)}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg transition-colors group",
                        hasCertificate ? "cursor-pointer hover:bg-muted/50" : ""
                      )}
                    >
                      <Award className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0 group-hover:text-primary transition-colors" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-foreground">{edu.title}</p>
                          {hasCertificate && (
                            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                              {t("about.viewCertificate")}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <p className="text-xs text-muted-foreground">{edu.institution}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{edu.year}</p>
                          {edu.type && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                {typeLabels[edu.type] || edu.type}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side - Experience timeline */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-8">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{t("about.experience")}</h3>
            </div>

            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  onClick={() => handleExperienceClick(exp.id)}
                  className="group relative grid md:grid-cols-[1fr,2fr] gap-4 p-5 bento-item card-3d cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  {/* Click indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded-md border border-primary/20">
                      {t("about.viewDetails")}
                    </div>
                  </div>
                  {/* Timeline indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
