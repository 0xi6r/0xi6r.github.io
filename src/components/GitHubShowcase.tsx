import React, { useEffect, useState } from 'react';

interface GitHubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

interface GitHubShowcaseProps {
  username: string;
  maxProjects?: number;
  showLanguage?: boolean;
  showTopics?: boolean;
}

const GitHubShowcase: React.FC<GitHubShowcaseProps> = ({
  username,
  maxProjects = 3, // Changed to match featured articles count
  showLanguage = true,
  showTopics = true,
}) => {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${maxProjects}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username, maxProjects]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12 text-lg text-gray-400">
            <div className="animate-pulse">Loading GitHub projects...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <p className="text-red-400">
              Error loading projects: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12 text-gray-400">
            <p>No public repositories found for @{username}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header matching Featured section */}
        <div className="flex items-center mb-12">
          <div className="flex items-center gap-3">
            <svg 
              height="32" 
              viewBox="0 0 16 16" 
              width="32" 
              className="fill-white"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <h2 className="text-3xl font-bold text-white">Projects & Contributions </h2>
          </div>
          <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
          >
            View All
            <span className="ml-1">↗</span>
          </a>
        </div>

        {/* Projects grid matching Featured articles layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-900/20"
            >
              <div className="p-6">
                {/* Project header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-200">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Updated {formatDate(project.updated_at)}
                    </p>
                  </div>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors ml-2"
                    title="View on GitHub"
                  >
                    ↗
                  </a>
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Topics/Tags */}
                {showTopics && project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 text-xs bg-cyan-900/30 text-cyan-300 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                    {project.topics.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{project.topics.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-300">
                      <span>⭐</span>
                      <span className="text-sm">{project.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <span>🍴</span>
                      <span className="text-sm">{project.forks_count}</span>
                    </div>
                    {showLanguage && project.language && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        <span className="text-sm text-gray-400">
                          {project.language}
                        </span>
                      </div>
                    )}
                  </div>

                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      View Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubShowcase;
