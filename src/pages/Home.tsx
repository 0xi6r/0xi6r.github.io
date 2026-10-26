import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import GitHubShowcase from '../components/GitHubShowcase';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category?: string;
  readTime?: string;
  subtitle?: string;
  image?: string;
  featured?: boolean;
}

interface FrontmatterMetadata {
  title?: string;
  date?: string;
  excerpt?: string;
  category?: string;
  subtitle?: string;
  readTime?: string;
  image?: string;
  featured?: string;
  [key: string]: string | undefined;
}

const focusAreas = [
  'Red Team',
  'Vulnerability Research',
  'Tool Development',
  'Threat Intelligence',
  'Malware Analysis',
  'Bug Bounty',
];

const parseFrontmatter = (content: string) => {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { metadata: {} as FrontmatterMetadata, body: content };

  const metadata: FrontmatterMetadata = {};
  match[1].split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      metadata[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });

  return { metadata, body: match[2] };
};

const formatDate = (date: string) => new Date(date).toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const ArticleImage: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <div aria-hidden="true" />;
  }

  return <img src={src} alt={alt} onError={() => setHasError(true)} />;
};

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const modules = import.meta.glob('/blogs/*.md', { as: 'raw' });
        const loadedPosts = await Promise.all(
          Object.entries(modules).map(async ([path, importFile]): Promise<BlogPost> => {
            const content = await importFile() as string;
            const { metadata, body } = parseFrontmatter(content);
            const id = path.split('/').pop()?.replace('.md', '') || '';
            const words = body.trim().split(/\s+/).length;

            return {
              id,
              title: metadata.title || id.replace(/-/g, ' '),
              date: metadata.date || new Date().toISOString().split('T')[0],
              excerpt: metadata.excerpt || `${body.substring(0, 200)}...`,
              content: body,
              category: metadata.category || 'General',
              readTime: metadata.readTime || `${Math.ceil(words / 200)} min read`,
              subtitle: metadata.subtitle || '',
              image: metadata.image || '',
              featured: metadata.featured === 'true',
            };
          })
        );

        loadedPosts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
        setPosts(loadedPosts);
      } catch (loadError) {
        console.error('Unable to load research posts:', loadError);
        setError('Research could not be loaded right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadPosts();
  }, []);

  const latestPost = posts[0];
  const featuredPosts = [
    ...posts.filter((post) => post.featured && post.id !== latestPost?.id),
    ...posts.filter((post) => !post.featured && post.id !== latestPost?.id),
  ].slice(0, 3);

  return (
    <div className="site-frame">
      <main className="page-shell">
        <section className="hero">
          <div className="hero__grid">
            <div>
              <p className="page-kicker">Independent security research</p>
              <h1 className="hero__title">Security, examined.</h1>
              <p className="hero__copy">
                Field notes on offensive security, vulnerability research, and the systems that shape modern risk.
              </p>
              <div className="hero__actions">
                <Link to="/blog" className="button-primary">Explore research <ArrowRight size={16} /></Link>
                <Link to="/about" className="button-secondary">About the researcher</Link>
              </div>
            </div>
            <aside className="hero__note">
              <span className="hero__note-label">Research principle</span>
              <p>Understand the system deeply enough to make it safer.</p>
            </aside>
          </div>
        </section>

        {loading && <p className="section-copy">Preparing the research archive…</p>}
        {error && <p className="section-copy">{error}</p>}

        {latestPost && (
          <section className="research-feature" aria-labelledby="latest-research">
            <div className="research-feature__body">
              <p className="research-feature__category">Latest research · {latestPost.category}</p>
              <h2 className="research-feature__title" id="latest-research">{latestPost.title}</h2>
              {latestPost.subtitle && <p className="research-feature__copy">{latestPost.subtitle}</p>}
              {!latestPost.subtitle && <p className="research-feature__copy">{latestPost.excerpt}</p>}
              <div className="article-meta">
                <span><Calendar size={14} /> {formatDate(latestPost.date)}</span>
                <span><Clock size={14} /> {latestPost.readTime}</span>
              </div>
              <Link to={`/blog?post=${latestPost.id}`} className="text-link" style={{ marginTop: '26px' }}>
                Read investigation <ArrowRight size={16} />
              </Link>
            </div>
            <div className="research-feature__image">
              <ArticleImage src={latestPost.image} alt="" />
            </div>
          </section>
        )}

        {featuredPosts.length > 0 && (
          <section>
            <div className="section-heading">
              <div>
                <p className="page-kicker">Selected work</p>
                <h2 className="section-title" style={{ marginTop: '8px' }}>From the archive</h2>
              </div>
              <Link to="/blog" className="text-link">View all <ArrowRight size={16} /></Link>
            </div>
            <div className="article-grid">
              {featuredPosts.map((post) => (
                <Link to={`/blog?post=${post.id}`} className="article-card" key={post.id}>
                  <div className="article-card__image"><ArticleImage src={post.image} alt="" /></div>
                  <div className="article-card__body">
                    <p className="article-category">{post.category}</p>
                    <h3 className="article-card__title">{post.title}</h3>
                    <p className="article-card__copy">{post.excerpt}</p>
                    <div className="article-card__meta"><span>{formatDate(post.date)}</span><span>{post.readTime}</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <GitHubShowcase username="0xi6r" maxProjects={3} showLanguage showTopics />

        <section className="focus-section">
          <p className="page-kicker">Areas of focus</p>
          <h2 className="section-title" style={{ marginTop: '8px' }}>A practical security practice.</h2>
          <div className="focus-grid">
            {focusAreas.map((area) => (
              <Link key={area} to={`/blog?category=${encodeURIComponent(area)}`} className="focus-link">
                <span>{area}</span>
                <span>{posts.filter((post) => post.category === area).length} articles</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
