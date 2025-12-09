import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { getPersonalInfo } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t, language } = useLanguage();
  const personal = getPersonalInfo(language);

  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{t("footer.builtWith")}</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>{t("footer.by")} <span className="text-foreground font-medium">{personal.name.full}</span></span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personal.social.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
