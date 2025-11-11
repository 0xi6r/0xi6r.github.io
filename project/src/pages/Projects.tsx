import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "shadcn";
import { Badge } from "shadcn";
import { Button } from "shadcn";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  tags: string[];
  icon: string;
  links: {
    github?: string;
    demo?: string;
    external?: string;
  };
  date: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management.",
    problem: "Businesses needed an easy way to sell products online without complex setup.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    icon: "🛍️",
    links: {
      github: "https://github.com",
      demo: "https://example.com",
    },
    date: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team features.",
    problem: "Teams struggled to track tasks and collaborate effectively across time zones.",
    tags: ["React", "Firebase", "Tailwind CSS"],
    icon: "✓",
    links: {
      demo: "https://example.com",
      github: "https://github.com",
    },
    date: "2024",
    featured: true,
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts and data visualization.",
    problem: "Companies needed accessible insights from complex data without technical expertise.",
    tags: ["React", "D3.js", "TypeScript", "PostgreSQL"],
    icon: "📊",
    links: {
      demo: "https://example.com",
      github: "https://github.com",
    },
    date: "2023",
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "AI-powered tool for generating marketing copy and social media content.",
    problem: "Content creators spent hours writing copy when they could automate it.",
    tags: ["Python", "OpenAI API", "FastAPI", "React"],
    icon: "✨",
    links: {
      demo: "https://example.com",
      external: "https://example.com",
    },
    date: "2023",
  },
  {
    id: 5,
    title: "Weather Forecast App",
    description: "Beautiful weather app with location-based forecasts and alerts.",
    problem: "Existing weather apps were cluttered and hard to navigate.",
    tags: ["React Native", "OpenWeather API", "Expo"],
    icon: "🌤️",
    links: {
      github: "https://github.com",
    },
    date: "2023",
  },
  {
    id: 6,
    title: "Personal Blog Platform",
    description: "Lightweight blogging platform with markdown support and SEO optimization.",
    problem: "Bloggers needed a fast, customizable platform without vendor lock-in.",
    tags: ["Next.js", "MDX", "Vercel", "Tailwind CSS"],
    icon: "📝",
    links: {
      demo: "https://example.com",
      github: "https://github.com",
    },
    date: "2022",
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{project.icon}</div>
          {project.featured && (
            <Badge variant="default" className="bg-blue-600">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <p className="text-xs text-gray-400 mt-1">{project.date}</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-3">
        <div>
          <p className="text-sm text-gray-300 mb-2">{project.description}</p>
          <p className="text-xs text-gray-400 italic">
            <strong>Problem:</strong> {project.problem}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mt-auto pt-3">
          {project.links.github && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.links.github, "_blank")}
            >
              <Github className="w-4 h-4 mr-1" />
              Code
            </Button>
          )}
          {project.links.demo && (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.links.demo, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Demo
            </Button>
          )}
          {project.links.external && !project.links.demo && (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.links.external, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all unique tags
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesTag = !selectedTag || project.tags.includes(selectedTag);
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-lg text-gray-400">
            A collection of projects I've built to solve real problems and learn new technologies.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-gray-100 placeholder-gray-500"
          />
        </div>

        {/* Tag Filter */}
        <div className="mb-8">
          <p className="text-sm font-semibold mb-3 text-gray-300">Filter by technology:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {featuredProjects.length > 0 ? "Other Projects" : "All Projects"}
          </h2>
          {regularProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>
    </div>
  );
}
