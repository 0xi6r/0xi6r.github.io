import React, { useEffect, useState } from 'react';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';

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
  maxProjects = 6,
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
        // GitHub API for user repositories
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${maxProjects}`
        );
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Fetch topics for each repository (requires GitHub API v3)
        const projectsWithTopics = await Promise.all(
          data.map(async (repo: any) => {
            try {
              const topicsResponse = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/topics`,
                {
                  headers: {
                    'Accept': 'application/vnd.github.mercy-preview+json',
                  },
                }
              );
              
              const topicsData = await topicsResponse.json();
              return {
                ...repo,
                topics: topicsData.names || [],
              };
            } catch {
              return { ...repo, topics: [] };
            }
          })
        );
        
        setProjects(projectsWithTopics);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        console.error('Error fetching GitHub projects:', err);
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
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading GitHub projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">
          Error loading projects: {error}
        </p>
        <p className="text-sm text-red-600 mt-1">
          Make sure the username "{username}" is correct and the repository is public.
        </p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <Github className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No public repositories found for @{username}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Github className="h-8 w-8" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">GitHub Projects</h2>
          <p className="text-gray-600">@{username}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 truncate">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Updated {formatDate(project.updated_at)}
                </p>
              </div>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-700"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            {project.description && (
              <p className="text-gray-700 mb-4 line-clamp-2">
                {project.description}
              </p>
            )}

            {showTopics && project.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
                {project.topics.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-500">
                    +{project.topics.length - 3} more
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Star className="h-4 w-4" />
                  <span className="text-sm">{project.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <GitFork className="h-4 w-4" />
                  <span className="text-sm">{project.forks_count}</span>
                </div>
                {showLanguage && project.language && (
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">
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
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <a
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          View all repositories on GitHub
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default GithubShowcase;
