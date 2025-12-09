// Personal Information Types
export interface PersonalInfo {
  name: {
    first: string;
    last: string;
    full: string;
    initials: string;
  };
  title: string;
  subtitle: string;
  description: string;
  location: {
    city: string;
    country: string;
    full: string;
  };
  languages: string[];
  availability: {
    status: string;
    freelance: boolean;
    fulltime: boolean;
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  stats: {
    yearsExperience: number;
    projectsDelivered: number;
    saasProducts: number;
  };
  techStack: string[];
}

// Project Types
export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  color: "primary" | "secondary" | "accent";
  link: string | null;
  image: string;
  icon: string;
  status: "active" | "inactive";
  // Detail fields
  longDescription?: string;
  role?: string;
  responsibilities?: string[];
  achievements?: string[];
  challenges?: string[];
  results?: string[];
}

export interface OpenSourceProject {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  icon: string;
  // Detail fields
  longDescription?: string;
  role?: string;
  responsibilities?: string[];
  achievements?: string[];
  challenges?: string[];
  results?: string[];
}

export interface ProjectsData {
  featured: FeaturedProject[];
  openSource: OpenSourceProject[];
}

// Experience Types
// Experience Types
export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  highlights: string[];
  // Detail fields
  longDescription?: string;
  role?: string;
  responsibilities?: string[];
  achievements?: string[];
  challenges?: string[];
  results?: string[];
}

export interface Education {
  id: string;
  title: string;
  institution: string;
  year: string;
  type: string;
  icon: string;
  certificate?: string;
}

export interface ExperienceData {
  about: {
    intro: string;
    specialization: string;
    journey: string;
  };
  work: WorkExperience[];
  education: Education[];
}

// Skills Types
export interface SkillCategory {
  id: string;
  icon: string;
  title: string;
  color: "primary" | "secondary" | "accent";
  skills: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
  expertise: string[];
  technologies: string[];
}

// Navigation Types
export interface NavLink {
  name: string;
  href: string;
}

export interface NavigationData {
  links: NavLink[];
}

// Contact Types
export interface ContactMethod {
  id: string;
  icon: string;
  label: string;
  value: string;
  href: string;
  action?: string;
  type: string;
  color: string;
  description: string;
}

export interface ContactData {
  methods: ContactMethod[];
}

