# Portfolio Data Structure

This directory contains all the JSON data files for your portfolio. All content is stored here for easy updates without touching component code.

## File Structure

```
src/data/
├── personal.json      # Personal info, stats, social links
├── projects.json      # Featured projects & open source repos
├── experience.json     # Work experience & education
├── skills.json        # Skills categories & technologies
├── navigation.json    # Navigation links
└── contact.json       # Contact information
```

## How to Update Content

### 1. Personal Information (`personal.json`)

Update your name, title, location, social links, and stats:

```json
{
  "name": {
    "first": "Mário",
    "last": "Costa",
    "full": "Mário Costa",
    "initials": "MC"
  },
  "title": "Senior Backend & Fullstack Developer",
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "email": "your.email@example.com"
  },
  "stats": {
    "yearsExperience": 6,
    "projectsDelivered": 50,
    "saasProducts": 10
  }
}
```

### 2. Projects (`projects.json`)

#### Featured Projects

Add or update featured projects:

```json
{
  "featured": [
    {
      "id": "unique-project-id",
      "title": "Project Name",
      "subtitle": "Project Type",
      "description": "Project description...",
      "tech": ["Laravel", "React", "Docker"],
      "color": "primary",  // "primary" | "secondary" | "accent"
      "link": "https://project-url.com",  // or null
      "image": "/images/projects/project-name.png",
      "icon": "/images/projects/icons/project-icon.svg"
    }
  ]
}
```

#### Open Source Projects

```json
{
  "openSource": [
    {
      "id": "repo-name",
      "name": "repository-name",
      "description": "Repository description",
      "language": "TypeScript",
      "stars": 234,
      "forks": 45,
      "url": "https://github.com/username/repo",
      "icon": "/images/projects/icons/tech-icon.svg"
    }
  ]
}
```

### 3. Experience (`experience.json`)

#### About Section

```json
{
  "about": {
    "intro": "Your introduction paragraph...",
    "specialization": "What you specialize in...",
    "journey": "Your journey story..."
  }
}
```

#### Work Experience

```json
{
  "work": [
    {
      "id": "company-id",
      "title": "Job Title",
      "company": "Company Name",
      "period": "Jan 2020 - Present",
      "highlights": ["Achievement 1", "Achievement 2"]
    }
  ]
}
```

#### Education

```json
{
  "education": [
    {
      "id": "education-id",
      "title": "Degree/Course Name",
      "institution": "Institution Name",
      "year": "2020-2024",
      "icon": "/images/education/institution.svg"
    }
  ]
}
```

### 4. Skills (`skills.json`)

#### Skill Categories

```json
{
  "categories": [
    {
      "id": "category-id",
      "icon": "Code",  // Must match lucide-react icon name
      "title": "Category Name",
      "color": "primary",  // "primary" | "secondary" | "accent"
      "skills": ["Skill 1", "Skill 2", "Skill 3"]
    }
  ]
}
```

**Available Icons:** `Code`, `Database`, `Cloud`, `Wrench`, `Cpu`, `Layers`

#### Technologies (for marquee)

```json
{
  "technologies": [
    "Laravel",
    "React",
    "TypeScript",
    // ... more technologies
  ]
}
```

### 5. Navigation (`navigation.json`)

```json
{
  "links": [
    { "name": "Work", "href": "#work" },
    { "name": "About", "href": "#about" },
    { "name": "Skills", "href": "#skills" },
    { "name": "Contact", "href": "#contact" }
  ]
}
```

### 6. Contact (`contact.json`)

```json
{
  "title": "Let's build something great",
  "description": "Your contact description...",
  "methods": [
    {
      "id": "email",
      "type": "email",  // "email" | "social"
      "label": "Email Me",
      "value": "your.email@example.com",
      "href": "mailto:your.email@example.com",
      "icon": "Mail",  // Must match lucide-react icon name
      "color": "primary",
      "description": "your.email@example.com"
    }
  ]
}
```

## Images Directory

Place your images in the `public/images/` directory:

```
public/images/
├── projects/
│   ├── project-name.png      # Featured project images
│   └── icons/
│       ├── project-icon.svg   # Project icons
│       └── tech-icon.svg      # Technology icons
└── education/
    └── institution.svg        # Education institution icons
```

## Usage in Components

All components automatically use this data through the API layer:

```typescript
import { getPersonalInfo, getProjects } from "@/lib/api";

// In your component
const personal = getPersonalInfo();
const projects = getFeaturedProjects();
```

## Benefits

✅ **Easy Updates**: Change content without touching React components  
✅ **Type Safe**: Full TypeScript support with type definitions  
✅ **Vercel Ready**: Perfect for static site generation  
✅ **Version Control**: Track content changes in Git  
✅ **API-like Structure**: Organized like a REST API for consistency

## Tips

1. **Keep IDs unique**: Use kebab-case for IDs (e.g., `"my-project"`)
2. **Image paths**: Always use absolute paths starting with `/images/`
3. **Icons**: Use lucide-react icon names exactly as they appear
4. **Colors**: Stick to `"primary"`, `"secondary"`, or `"accent"`
5. **Validation**: JSON files are validated by TypeScript at build time

