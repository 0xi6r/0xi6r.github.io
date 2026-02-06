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
    // Inside the return statement of GitHubShowcase component

return (
  <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      marginBottom: '24px',
      color: '#ffffff' // White text for header
    }}>
      <svg 
        height="32" 
        viewBox="0 0 16 16" 
        width="32" 
        style={{ fill: '#ffffff' }} // White GitHub icon
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
      <div>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          margin: '0 0 4px 0',
          color: '#ffffff' // White title
        }}>
          GitHub Projects
        </h2>
        <p style={{ 
          color: '#94a3b8', // Slate-400 color for username
          margin: '0',
          fontSize: '16px'
        }}>
          @{username}
        </p>
      </div>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    }}>
      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            backgroundColor: '#0f172a', // Dark blue/black background
            border: '1px solid #334155', // Slate-700 border
            borderRadius: '12px',
            padding: '20px',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
            color: '#ffffff' // White text for project card
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.15)';
            e.currentTarget.style.borderColor = '#06b6d4'; // Cyan border on hover
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.5)';
            e.currentTarget.style.borderColor = '#334155';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px'
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 4px 0',
                color: '#ffffff' // White title
              }}>
                {project.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#94a3b8', // Slate-400
                margin: '0'
              }}>
                Updated {formatDate(project.updated_at)}
              </p>
            </div>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#94a3b8', // Slate-400
                textDecoration: 'none',
                marginLeft: '10px',
                transition: 'color 0.2s ease'
              }}
              title="View on GitHub"
              onMouseEnter={(e) => e.currentTarget.style.color = '#06b6d4'} // Cyan on hover
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              ↗
            </a>
          </div>

          {project.description && (
            <p style={{
              color: '#cbd5e1', // Slate-300
              margin: '0 0 16px 0',
              fontSize: '15px',
              lineHeight: '1.5'
            }}>
              {project.description}
            </p>
          )}

          {showTopics && project.topics && project.topics.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '16px'
            }}>
              {project.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  style={{
                    padding: '4px 10px',
                    fontSize: '12px',
                    backgroundColor: '#164e63', // Dark cyan background
                    color: '#67e8f9', // Light cyan text
                    borderRadius: '20px',
                    fontWeight: '500'
                  }}
                >
                  {topic}
                </span>
              ))}
              {project.topics.length > 3 && (
                <span style={{
                  padding: '4px 10px',
                  fontSize: '12px',
                  color: '#94a3b8' // Slate-400
                }}>
                  +{project.topics.length - 3} more
                </span>
              )}
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #334155' // Slate-700 border
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#fbbf24' }}>⭐</span> {/* Yellow star */}
                <span style={{ fontSize: '14px', color: '#ffffff' }}>
                  {project.stargazers_count}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#94a3b8' }}>🍴</span> {/* Slate-400 fork */}
                <span style={{ fontSize: '14px', color: '#ffffff' }}>
                  {project.forks_count}
                </span>
              </div>
              {showLanguage && project.language && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#06b6d4' // Cyan dot
                  }}></div>
                  <span style={{ fontSize: '14px', color: '#94a3b8' }}>
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
                style={{
                  fontSize: '14px',
                  color: '#06b6d4', // Cyan link
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'} // Light cyan on hover
                onMouseLeave={(e) => e.currentTarget.style.color = '#06b6d4'}
              >
                View Live
              </a>
            )}
          </div>
        </div>
      ))}
    </div>

    <div style={{ textAlign: 'center' }}>
      <a
        href={`https://github.com/${username}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#06b6d4', // Cyan
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'} // Light cyan on hover
        onMouseLeave={(e) => e.currentTarget.style.color = '#06b6d4'}
      >
        View all repositories on GitHub
        <span>↗</span>
      </a>
    </div>
  </div>
);

export default GitHubShowcase;
