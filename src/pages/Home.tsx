import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  Clock,
  Code,
  Shield,
  Bug,
  Brain,
  Terminal
} from 'lucide-react';
import GitHubShowcase from '../components/GitHubShowcase';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  filename: string;
  category?: string;
  readTime?: string;
  subtitle?: string;
  image?: string;
  featured?: boolean;
  views?: number;
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
  views?: string;
  [key: string]: string | undefined;
}

interface ParsedContent {
  metadata: FrontmatterMetadata;
  body: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [latestPost, setLatestPost] = useState<BlogPost | null>(null);
  const [featuredArticles, setFeaturedArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      const modules = import.meta.glob('../blogs/*.md', { as: 'raw' });
      const postPromises = Object.entries(modules).map(async ([path, importFn]): Promise<BlogPost> => {
        const content = await importFn() as string;
        const filename = path.split('/').pop()?.replace('.md', '') || '';

        const { metadata, body } = parseFrontmatter(content);

        return {
          id: filename,
          title: metadata.title || filename.replace(/-/g, ' '),
          title1: metadata.title || filename.replace(/-/g, ' '),
          date: metadata.date || new Date().toISOString().split('T')[0],
          excerpt: metadata.excerpt || body.substring(0, 200) + '...',
          content: body,
          filename,
          category: metadata.category || 'General',
          readTime: metadata.readTime || calculateReadTime(body),
          subtitle: metadata.subtitle || '',
          image: metadata.image || '',
          featured: metadata.featured === 'true',
          views: metadata.views ? parseInt(metadata.views) : 0
        };
      });

      const loadedPosts = await Promise.all(postPromises);
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setPosts(loadedPosts);
      setLatestPost(loadedPosts[0] || null);

      // Improved Featured Content Curation
      const featured = curateFeaturedPosts(loadedPosts);
      setFeaturedArticles(featured);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error('Error loading blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // IMPROVEMENT 3: Featured Content Curation
  const curateFeaturedPosts = (allPosts: BlogPost[]): BlogPost[] => {
    // Priority order:
    // 1. Posts explicitly marked as featured
    // 2. Most recent posts from different categories
    // 3. Posts with most content (as proxy for depth)

    const featuredMarked = allPosts.filter(p => p.featured);
    const remainingPosts = allPosts.filter(p => !p.featured && p.id !== allPosts[0]?.id);

    // Get posts from diverse categories
    const categoriesUsed = new Set<string>();
    const diversePosts: BlogPost[] = [];

    for (const post of remainingPosts) {
      if (!categoriesUsed.has(post.category || 'General') && diversePosts.length < 3) {
        diversePosts.push(post);
        categoriesUsed.add(post.category || 'General');
      }
    }

    // Fill remaining slots with most recent
    const needed = 3 - featuredMarked.length - diversePosts.length;
    const recentPosts = remainingPosts
      .filter(p => !diversePosts.includes(p))
      .slice(0, Math.max(0, needed));

    // Combine and take top 3
    const combined = [...featuredMarked, ...diversePosts, ...recentPosts].slice(0, 3);

    return combined;
  };

  const parseFrontmatter = (content: string): ParsedContent => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (match) {
      const frontmatter = match[1];
      const body = match[2];
      const metadata: FrontmatterMetadata = {};

      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          metadata[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        }
      });

      return { metadata, body };
    }

    return { metadata: {}, body: content };
  };

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Red Team': 'bg-red-500',
      'Vulnerability Research': 'bg-orange-500',
      'Tool Development': 'bg-green-500',
      'Threat Intelligence': 'bg-purple-500',
      'Malware Analysis': 'bg-yellow-500',
      'Bug Bounty': 'bg-emerald-500',
      'General': 'bg-cyan-500'
    };
    return colors[category] || colors['General'];
  };

  // IMPROVEMENT 1: Better Image Fallback with Category Icons
  const getCategoryIcon = (category: string) => {
    const iconClass = "w-16 h-16 text-white/80";
    const icons: { [key: string]: JSX.Element } = {
      'Red Team': <Shield className={iconClass} />,
      'Vulnerability Research': <Bug className={iconClass} />,
      'Tool Development': <Code className={iconClass} />,
      'Threat Intelligence': <Brain className={iconClass} />,
      'Malware Analysis': <Terminal className={iconClass} />,
      'General': <Code className={iconClass} />
    };
    return icons[category] || icons['General'];
  };

  const getCategoryGradient = (category: string): string => {
    const gradients: { [key: string]: string } = {
      'Red Team': 'from-red-900 via-red-800 to-red-900',
      'Vulnerability Research': 'from-orange-900 via-orange-800 to-orange-900',
      'Tool Development': 'from-green-900 via-green-800 to-green-900',
      'Threat Intelligence': 'from-purple-900 via-purple-800 to-purple-900',
      'Malware Analysis': 'from-yellow-900 via-yellow-800 to-yellow-900',
      'Bug Bounty': 'from-orange-900 via-orange-800 to-orange-900',
      'General': 'from-cyan-900 via-cyan-800 to-cyan-900'
    };
    return gradients[category] || gradients['General'];
  };

  // IMPROVEMENT 4: Lazy Loading Image Component
  const LazyImage: React.FC<{ src: string; alt: string; category: string }> = ({ src, alt, category }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!src || imageError) {
      return (
        <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(category)} flex flex-col items-center justify-center relative overflow-hidden`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
            }}></div>
          </div>
          <div className="relative z-10">
            {getCategoryIcon(category)}
          </div>
        </div>
      );
    }

    return (
      <div className="h-48 relative overflow-hidden bg-gray-800">
        {!imageLoaded && (
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category)} flex items-center justify-center animate-pulse`}>
            {getCategoryIcon(category)}
          </div>
        )}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center py-12 text-lg text-gray-400">
            <div className="animate-pulse">Loading latest research...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center py-12 text-lg text-red-400">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-black">
      {/* Hero/Latest Post Section */}
      <section className="bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Latest Post - Text Only */}
          {latestPost && (
            <div className="mb-12 sm:mb-16">
              <div className="bg-black rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <div className="flex flex-col gap-4 sm:gap-6">

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                  {latestPost.title}
                  </h1>

                  {/* Subtitle */}
                  {latestPost.subtitle && (
                    <p className="text-base sm:text-lg text-gray-300 mb-4 leading-relaxed font-medium">
                      {latestPost.subtitle}
                    </p>
                  )}

                  {/* Meta: Category + Date + Read Time */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <span className={`px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium ${getCategoryColor(latestPost.category || 'General')}`}>
                      {latestPost.category || 'General'}
                    </span>
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded border border-green-500/30">
                      New
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {formatDate(latestPost.date)}
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {latestPost.readTime}
                    </span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                    {latestPost.excerpt}
                  </p>

                  {/* Read More Button */}
                  <Link
                    to={`/blog?post=${latestPost.id}`}
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center text-sm sm:text-base"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="bg-black pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mr-4">Featured</h2>
            <div className="flex-grow h-px bg-gray-800"></div>
            <Link
              to="/blog"
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center text-sm sm:text-base whitespace-nowrap ml-4"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {featuredArticles.length > 0 ? (
            // IMPROVEMENT 2: Improved Mobile Responsive Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredArticles.map((article) => (
                <article
                  key={article.id}
                 className="bg-black rounded-xl overflow-hidden hover:bg-gray-900 transition-all duration-300 group"
                >
                  {/* Article Image with Improved Fallback */}
                  <LazyImage
                    src={article.image || ''}
                    alt={article.title}
                    category={article.category || 'General'}
                  />

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center mb-3">
                      <span className={`px-2 py-1 rounded text-white text-xs font-medium ${getCategoryColor(article.category || 'General')}`}>
                        {article.category || 'General'}
                      </span>
                    </div>

                    <Link
                      to={`/blog?post=${article.id}`}
                      className="block group-hover:text-cyan-400 transition-colors"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                        {article.title}
                      </h3>
                    </Link>

                    {article.subtitle && (
                      <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                        {article.subtitle}
                      </p>
                    )}

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="hidden sm:inline">{formatDate(article.date)}</span>
                        <span className="sm:hidden">{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl sm:text-6xl mb-4">📝</div>
              <p className="text-sm sm:text-base">No featured articles available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* GitHub Showcase with Lazy Loading */}
      <div className="pb-12 sm:pb-16">
        <GitHubShowcase
          username="0xi6r"
          maxProjects={3}
          showLanguage={true}
          showTopics={true}
        />
      </div>
      {/* Infosec Focus Areas Section */}
      <section className="bg-black pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">
              Infosec Focus Areas
            </h2>
          </div>
      
          {/* Simple Grid Layout */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/blog?category=Red%20Team"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors"
            >
              Red Team ({posts.filter(p => p.category === 'Red Team').length})
            </Link>
      
            <Link
              to="/blog?category=Vulnerability%20Research"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors"
            >
              Vulnerability Research ({posts.filter(p => p.category === 'Vulnerability Research').length})
            </Link>
      
            <Link
              to="/blog?category=Tool%20Development"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors"
            >
              Tool Development ({posts.filter(p => p.category === 'Tool Development').length})
            </Link>
      
            <Link
              to="/blog?category=Threat%20Intelligence"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors"
            >
              Threat Intelligence ({posts.filter(p => p.category === 'Threat Intelligence').length})
            </Link>
      
            <Link
              to="/blog?category=Malware%20Analysis"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors"
            >
              Malware Analysis ({posts.filter(p => p.category === 'Malware Analysis').length})
            </Link>
      
            <Link
              to="/blog?category=General"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors"
            >
              General ({posts.filter(p => p.category === 'General').length})
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
