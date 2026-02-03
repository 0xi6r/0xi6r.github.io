import React from "react";
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Code, 
  Terminal, 
  ArrowRight 
} from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription, 
  CardFooter 
} from "shadcn";
import { Button, Badge, Separator } from "shadcn";

const ProjectShowcase = () => {
  // Mock data for the design
  const featuredProject = {
    name: "Nebula UI",
    description: "A modern, accessible React component library built for high-performance dashboards. Features 40+ pre-built components, automatic dark mode, and comprehensive accessibility coverage.",
    stars: 1240,
    forks: 85,
    language: "TypeScript",
    tags: ["React", "Tailwind", "A11y", "Storybook"]
  };

  const otherProjects = [
    {
      name: "fast-logger",
      description: "Zero-dependency JSON logger for Node.js services with extreme performance focus.",
      stars: 342,
      forks: 24,
      language: "Rust"
    },
    {
      name: "docker-cleaner-cli",
      description: "CLI tool to automatically prune unused Docker containers and images based on age.",
      stars: 89,
      forks: 12,
      language: "Go"
    },
    {
      name: "react-hook-form-persister",
      description: "Simple middleware to persist form state to localStorage automatically.",
      stars: 156,
      forks: 8,
      language: "TypeScript"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Open Source Work</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I build tools for developers. Here are a few projects I'm currently maintaining.
        </p>
      </div>

      {/* Pattern 1: The "Featured" Spotlight 
          Use this for your absolute best work. It commands attention.
      */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <h3 className="text-xl font-semibold">Featured Project</h3>
        </div>

        <Card className="overflow-hidden border-2 border-primary/10">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Visual Side (Left) */}
            <div className="md:col-span-2 bg-slate-900 text-white p-8 flex flex-col justify-center items-center text-center space-y-4" style={{ minHeight: '240px' }}>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Terminal className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{featuredProject.name}</h3>
                <span className="text-xs text-slate-400">v2.4.0</span>
              </div>
            </div>

            {/* Content Side (Right) */}
            <div className="md:col-span-3 flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{featuredProject.name}</CardTitle>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        {featuredProject.language}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" /> {featuredProject.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" /> {featuredProject.forks}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground mb-4">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2 pt-4 border-t bg-slate-50/50 dark:bg-slate-900/20">
                <Button className="gap-2">
                  <Github className="w-4 h-4" /> View Source
                </Button>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </section>

      <Separator />

      {/* Pattern 2: The "Repo Grid"
          Use this for your collection of utilities, libraries, or smaller apps.
      */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Other Contributions</h3>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary">
            View all on GitHub <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {otherProjects.map((project, i) => (
            <Card key={i} className="flex flex-col h-full hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-base">{project.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${
                    project.language === 'Rust' ? 'bg-orange-500' : 
                    project.language === 'Go' ? 'bg-cyan-500' : 'bg-blue-500'
                  }`} />
                  {project.language}
                </div>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1 hover:text-foreground">
                    <Star className="w-3 h-3" /> {project.stars}
                  </span>
                  <span className="flex items-center gap-1 hover:text-foreground">
                    <GitFork className="w-3 h-3" /> {project.forks}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProjectShowcase;
