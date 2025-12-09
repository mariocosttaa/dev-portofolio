# 🚀 Mário Costa - Portfolio Website

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-25.7.2-26A69A?logo=i18next&logoColor=white)

**A modern, responsive portfolio website showcasing my work, skills, and experience as a Senior Backend & Fullstack Developer.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Project Structure](#-project-structure)

</div>

---

## ✨ Features

- 🌐 **Multilingual Support** - Full Portuguese and English translations
- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark/light theme toggle
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **Interactive Components** - Smooth animations and transitions
- 📊 **Project Showcase** - Featured projects with filtering and search capabilities
- 💼 **Experience Timeline** - Visual timeline of work experience and education
- 🛠️ **Skills Display** - Comprehensive tech stack and expertise areas
- 📄 **CV Preview** - Integrated CV viewer and download functionality
- 🔍 **Detail Panels** - Expandable detail views for projects and experiences
- 🎭 **Theme Switching** - Seamless dark/light mode with persistence

---

## 🛠️ Tech Stack

### Core Framework & Language
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) **React 18.3.1** - UI library
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) **TypeScript 5.8.3** - Type safety
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) **Vite 5.4.19** - Build tool & dev server

### Styling & UI
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white) **TailwindCSS 3.4.17** - Utility-first CSS
- ![shadcn/ui](https://img.shields.io/badge/-shadcn%2Fui-000000?logo=shadcnui) **shadcn/ui** - High-quality component library
- ![Radix UI](https://img.shields.io/badge/-Radix%20UI-161618?logo=radix-ui) **Radix UI** - Accessible component primitives
- ![Lucide Icons](https://img.shields.io/badge/-Lucide-FF6B6B?logo=lucide) **Lucide React** - Icon library

### Routing & State Management
- ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?logo=react-router) **React Router 6.30.1** - Client-side routing
- ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?logo=react-query&logoColor=white) **TanStack Query 5.83.0** - Data fetching & caching

### Internationalization
- ![i18next](https://img.shields.io/badge/-i18next-26A69A?logo=i18next) **i18next 25.7.2** - Internationalization framework
- ![react-i18next](https://img.shields.io/badge/-react--i18next-26A69A?logo=react) **react-i18next 16.4.0** - React bindings for i18next

### Forms & Validation
- ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=react-hook-form) **React Hook Form 7.61.1** - Form management
- ![Zod](https://img.shields.io/badge/-Zod-3E63DD?logo=zod) **Zod 3.25.76** - Schema validation

### Additional Libraries
- ![Recharts](https://img.shields.io/badge/-Recharts-FF6384?logo=recharts) **Recharts 2.15.4** - Chart library
- ![Sonner](https://img.shields.io/badge/-Sonner-000000) **Sonner 1.7.4** - Toast notifications
- ![date-fns](https://img.shields.io/badge/-date--fns-FF6B6B) **date-fns 3.6.0** - Date utilities
- ![next-themes](https://img.shields.io/badge/-next--themes-000000) **next-themes 0.3.0** - Theme management

### Development Tools
- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint) **ESLint 9.32.0** - Code linting
- ![PostCSS](https://img.shields.io/badge/-PostCSS-DD3A0A?logo=postcss) **PostCSS 8.5.6** - CSS processing
- ![Autoprefixer](https://img.shields.io/badge/-Autoprefixer-DD3735?logo=autoprefixer) **Autoprefixer 10.4.21** - CSS vendor prefixes

---

## 🎬 Preview

<div align="center">

![Portfolio Preview](./presentation.gif)

**Live Demo:** [View Portfolio](https://your-portfolio-url.com) *(Update with your actual URL)*

</div>

---

## 🎯 Key Highlights

- ⚡ **Lightning Fast** - Optimized with Vite for instant HMR and fast builds
- 🎨 **Beautiful Design** - Modern UI with smooth animations and transitions
- 📱 **Mobile First** - Fully responsive design that works on all devices
- 🌍 **i18n Ready** - Built-in support for multiple languages
- ♿ **Accessible** - WCAG compliant components from Radix UI
- 🔒 **Type Safe** - Full TypeScript coverage for better DX
- 🚀 **Production Ready** - Optimized builds with code splitting

---

## 📦 Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **bun** - Comes with Node.js

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/mariocosttaa/dev-portofolio.git
   cd dev-portofolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

---

## 🚀 Usage

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Build Modes

```bash
# Production build (optimized)
npm run build

# Development build (with source maps)
npm run build:dev
```

### Environment Variables

Create a `.env` file in the root directory if needed:

```env
VITE_API_URL=your_api_url_here
```

---

## 📁 Project Structure

```
mariocosttaa-portofolio/
├── public/                 # Static assets
│   ├── images/            # Project images and assets
│   │   ├── projects/      # Project screenshots
│   │   └── education/      # Education certificates
│   ├── mario-costa.jpeg   # Profile image
│   └── MARIO COSTA CV.pdf # CV document
│
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── About.tsx     # About section
│   │   ├── Contact.tsx   # Contact section
│   │   ├── FeaturedWork.tsx # Featured projects
│   │   ├── Footer.tsx   # Footer component
│   │   ├── Hero.tsx     # Hero section
│   │   ├── Navbar.tsx   # Navigation bar
│   │   ├── Skills.tsx   # Skills section
│   │   └── ...
│   │
│   ├── contexts/         # React contexts
│   │   ├── DetailPanelContext.tsx
│   │   └── LanguageContext.tsx
│   │
│   ├── data/            # Data files (multilingual)
│   │   ├── en/         # English data
│   │   └── pt/         # Portuguese data
│   │
│   ├── hooks/           # Custom React hooks
│   │   ├── useTheme.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/            # Utility functions
│   │   ├── api.ts     # Data API layer
│   │   ├── detailData.ts # Detail data provider
│   │   ├── i18n.ts    # i18n configuration
│   │   └── utils.ts   # Utility functions
│   │
│   ├── locales/       # Translation files
│   │   ├── en.json    # English translations
│   │   └── pt.json    # Portuguese translations
│   │
│   ├── pages/         # Page components
│   │   ├── Index.tsx  # Home page
│   │   ├── Projects.tsx # Projects page
│   │   └── NotFound.tsx # 404 page
│   │
│   ├── types/         # TypeScript types
│   │   └── portfolio.ts
│   │
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
│
├── .gitignore         # Git ignore rules
├── components.json    # shadcn/ui configuration
├── package.json       # Dependencies
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

---

## 🌍 Multilingual Support

The portfolio supports two languages:

- 🇬🇧 **English (en)** - Default language
- 🇵🇹 **Portuguese (pt)** - Full translation

### Language Switching

Users can switch languages using the language switcher in the navigation bar. The selected language is saved in localStorage and persists across sessions.

### Adding New Languages

1. Create a new translation file in `src/locales/` (e.g., `es.json` for Spanish)
2. Add the language to `src/lib/i18n.ts`
3. Update the language switcher component

### Translation Structure

Translations are organized by component/section:
- `nav.*` - Navigation items
- `hero.*` - Hero section
- `about.*` - About section
- `skills.*` - Skills section
- `work.*` - Work/Projects section
- `contact.*` - Contact section
- `footer.*` - Footer
- `projects.*` - Projects page
- `notFound.*` - 404 page

---

## 📸 Screenshots

### Home Page
- Hero section with profile and key statistics
- Featured projects showcase
- Experience timeline
- Skills and expertise display

### Projects Page
- Advanced filtering by technology
- Search functionality
- Project cards with images
- Detail panels for expanded information

### Dark/Light Theme
- Seamless theme switching
- Persistent theme preference
- Smooth transitions

---

## 🎨 Features in Detail

### 🏠 Home Page
- **Hero Section** - Introduction with profile image and key stats
- **Tech Marquee** - Scrolling technology stack display
- **Featured Work** - Showcase of featured projects
- **About Section** - Personal story, experience timeline, and education
- **Skills Section** - Technical skills organized by category
- **Contact Section** - Contact methods and CV download

### 📂 Projects Page
- **Filtering** - Filter by technology or category (Commercial/Open Source)
- **Search** - Search projects by name, description, or technology
- **Project Cards** - Detailed project information with images
- **Detail Views** - Expandable detail panels for each project

### 🎭 Theme System
- **Dark Mode** - Full dark theme support
- **Light Mode** - Clean light theme
- **Auto-persistence** - Theme preference saved in localStorage
- **Smooth Transitions** - Seamless theme switching

---

## 📝 Data Management

### Data Structure

All content is stored in JSON files organized by language:
- 📄 `personal.json` - Personal information (name, title, description, stats)
- 🚀 `projects.json` - Projects (featured & open source)
- 💼 `experience.json` - Work experience & education
- 🛠️ `skills.json` - Skills & expertise categories
- 📧 `contact.json` - Contact information and methods
- 🧭 `navigation.json` - Navigation links

### Adding Content

1. Edit the appropriate JSON file in `src/data/{lang}/`
2. Follow the existing structure (see `DATA_STRUCTURE.md` for details)
3. The changes will be reflected immediately in development mode
4. For production, rebuild the application

### Multilingual Data

Each language has its own data directory:
- `src/data/en/` - English content
- `src/data/pt/` - Portuguese content

This allows for complete localization of all content, not just UI strings.

---

## 🚢 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# The build output will be in the dist/ directory
```

**Build Output:**
- ✅ Optimized and minified JavaScript
- ✅ Compressed CSS with Tailwind purging
- ✅ Optimized assets and images
- ✅ Production-ready HTML

### Performance Tips

- The build includes automatic code splitting
- Assets are optimized for production
- Consider enabling compression on your hosting provider
- Use a CDN for faster global delivery

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy!

### Other Platforms

The built `dist/` folder can be deployed to any static hosting service:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any web server

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 👨‍💻 Author

**Mário Costa**

- 🌐 Website: [Portfolio](https://your-portfolio-url.com)
- 💼 LinkedIn: [mariocosttaa](https://linkedin.com/in/mariocosttaa)
- 🐙 GitHub: [@mariocosttaa](https://github.com/mariocosttaa)
- 📧 Email: mariocostaa6@gmail.com

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [i18next](https://www.i18next.com/) - Internationalization framework
- [Lucide](https://lucide.dev/) - Beautiful icon library

---

<div align="center">

**Built with ❤️ by Mário Costa**

⭐ Star this repo if you find it helpful!

</div>
