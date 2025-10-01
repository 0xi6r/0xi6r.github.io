import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ArrowRight, 
  Clock,
  Eye
} from 'lucide-react';

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
}

interface FrontmatterMetadata {
  title?: string;
  date?: string;
  excerpt?: string;
  category?: string;
  subtitle?: string;
  readTime?: string;
  image?: string;
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
          date: metadata.date || new Date().toISOString().split('T')[0],
          excerpt: metadata.excerpt || body.substring(0, 200) + '...',
          content: body,
          filename,
          category: metadata.category || 'General',
          readTime: metadata.readTime || calculateReadTime(body),
          subtitle: metadata.subtitle || '',
          image: metadata.image || ''
        };
      });

      const loadedPosts = await Promise.all(postPromises);
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setPosts(loadedPosts);
      setLatestPost(loadedPosts[0] || null);
      setFeaturedArticles(loadedPosts.slice(1, 4)); // Next 3 posts after latest
    } catch (err) {
      setError('Failed to load blog posts');
      console.error('Error loading blog posts:', err);
    } finally {
      setLoading(false);
    }
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
      'General': 'bg-cyan-500'
    };
    return colors[category] || colors['General'];
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
        <div className="max-w-4xl mx-auto px-4">

          {/* Latest Post - Text Only */}
          {latestPost && (
            <div className="mb-12">
              <div className="bg-gray-900 rounded-xl p-6 lg:p-8 shadow-lg">
                <div className="flex flex-col gap-6">
                  
                  {/* Title */}
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                    {latestPost.title}
                  </h1>
                  
                  {/* Subtitle */}
                  {latestPost.subtitle && (
                    <p className="text-lg text-gray-300 mb-4 leading-relaxed font-medium">
                      {latestPost.subtitle}
                    </p>
                  )}

                  {/* Meta: Category + Date + Read Time */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(latestPost.category || 'General')}`}>
                      {latestPost.category || 'General'}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(latestPost.date)}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {latestPost.readTime}
                    </span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {latestPost.excerpt}
                  </p>

                  {/* Read More Button */}
                  <Link 
                    to={`/blog?post=${latestPost.id}`}
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
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
      <section className="bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl font-bold text-white mr-4">Featured</h2>
            <div className="flex-grow h-px bg-black"></div>
            <Link 
              to="/blog" 
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {featuredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <article key={article.id} className="bg-black rounded-xl overflow-hidden hover:bg-gray-750 transition-colors duration-300 group">
                  {/* Article Image */}
                  <div className="h-48 relative overflow-hidden">
                    {article.image ? (
                      <>
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.className = "h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center";
                              const placeholder = document.createElement('div');
                              placeholder.innerHTML = '<svg class="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>';
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <Eye className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className={`px-2 py-1 rounded text-white text-xs font-medium ${getCategoryColor(article.category || 'General')}`}>
                        {article.category || 'General'}
                      </span>
                      <div className="flex items-center ml-3 text-gray-400 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                      {article.title}
                    </h3>
                    
                    {article.subtitle && (
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {article.subtitle}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      
                      <Link 
                        to={`/blog?post=${article.id}`}
                        className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">📝</div>
              <p>No featured articles available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
