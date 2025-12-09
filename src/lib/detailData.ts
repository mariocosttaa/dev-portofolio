/**
 * Detail data for projects and experience
 * Retrieves data from the JSON files via the API layer
 */

import type { DetailData } from "@/contexts/DetailPanelContext";
import { getFeaturedProjects, getWorkExperience, getOpenSourceProjects } from "./api";

// Get detail data for a project
export function getProjectDetail(projectId: string, locale: string = 'en'): DetailData | null {
  const projects = getFeaturedProjects(locale);
  const project = projects.find((p) => p.id === projectId);

  if (!project) return null;
  
  // Don't show details for inactive projects
  if (project.status === "inactive") return null;

  return {
    type: "project",
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    content: {
      description: project.description,
      longDescription: project.longDescription || project.description,
      tech: project.tech,
      link: project.link,
      image: project.image,
      role: project.role,
      responsibilities: project.responsibilities,
      achievements: project.achievements,
      challenges: project.challenges,
      results: project.results,
    },
  };
}

// Get detail data for experience
export function getExperienceDetail(experienceId: string, locale: string = 'en'): DetailData | null {
  const experiences = getWorkExperience(locale);
  const experience = experiences.find((e) => e.id === experienceId);

  if (!experience) return null;

  return {
    type: "experience",
    id: experience.id,
    title: experience.title,
    subtitle: experience.company,
    content: {
      description: `Worked as ${experience.title} at ${experience.company}`,
      longDescription: experience.longDescription || `Worked as ${experience.title} at ${experience.company}`,
      period: experience.period,
      company: experience.company,
      highlights: experience.highlights,
      role: experience.role,
      responsibilities: experience.responsibilities,
      achievements: experience.achievements,
      challenges: experience.challenges,
      results: experience.results,
    },
  };
}

// Get detail data for open source project
export function getOpenSourceProjectDetail(projectId: string, locale: string = 'en'): DetailData | null {
  const projects = getOpenSourceProjects(locale);
  const project = projects.find((p) => p.id === projectId);

  if (!project) return null;

  return {
    type: "project",
    id: project.id,
    title: project.name,
    subtitle: "Open Source Project",
    content: {
      description: project.description,
      longDescription: project.longDescription || project.description,
      tech: project.id === "web-scrapper-football-matches" 
        ? ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "TailwindCSS"]
        : project.id === "todo-fast-api-python"
        ? ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "TailwindCSS"]
        : project.id === "files-manager-system"
        ? ["Laravel", "PHP", "TailwindCSS", "Alpine.js", "Vite", "SQLite", "Docker", "Pest"]
        : project.id === "chat-bot-langchain-python"
        ? ["Python", "SQLite", "LangChain", "Google Gemini", "python-dotenv"]
        : project.id === "ruby-blog-web-system"
        ? ["Ruby", "Rails", "PostgreSQL", "Docker", "TailwindCSS", "Devise", "Stimulus"]
        : [project.language],
      link: project.url,
      image: project.icon,
      role: project.role,
      responsibilities: project.responsibilities,
      achievements: project.achievements,
      challenges: project.challenges,
      results: project.results,
    },
  };
}
