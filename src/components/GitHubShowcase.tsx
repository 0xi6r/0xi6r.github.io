import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface GitHubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  updated_at: string;
}

interface GitHubShowcaseProps {
  username: string;
  maxProjects?: number;
  showLanguage?: boolean;
  showTopics?: boolean;
}

const GitHubShowcase: React.FC<GitHubShowcaseProps> = ({ username, maxProjects = 3, showLanguage = true }) => {
  const [projects, setProjects] = useState<GitHubProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${maxProjects}`);
        if (response.ok) setProjects(await response.json());
      } catch {
        setProjects([]);
      }
    };

    void fetchProjects();
  }, [username, maxProjects]);

  const formatDate = (date: string) => new Date(date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });

  return (
    <section className="project-section">
      <div className="section-heading">
        <div>
          <p className="page-kicker">Open source</p>
          <h2 className="section-title" style={{ marginTop: '8px' }}>Tools and experiments</h2>
        </div>
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-link">GitHub <ArrowUpRight size={16} /></a>
      </div>
      {projects.length > 0 && (
        <div className="project-grid">
          {projects.map((project) => (
            <a key={project.id} href={project.homepage || project.html_url} target="_blank" rel="noopener noreferrer" className="project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <h3 className="project-card__title">{project.name}</h3>
                <Github size={17} color="#8490a0" />
              </div>
              <p className="project-card__updated">Updated {formatDate(project.updated_at)}</p>
              <p className="project-card__description">{project.description || 'Open-source security tooling and research.'}</p>
              <div className="project-card__footer"><span>{showLanguage && project.language ? project.language : 'Repository'}</span><ArrowUpRight size={15} /></div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default GitHubShowcase;
