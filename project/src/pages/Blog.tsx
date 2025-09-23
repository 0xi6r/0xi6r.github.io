import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  filename: string;
}

interface FrontmatterMetadata {
  title?: string;
  date?: string;
  excerpt?: string;
  [key: string]: string | undefined;
}

interface ParsedContent {
  metadata: FrontmatterMetadata;
  body: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Handle URL changes and browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('post');
      
      if (postId && posts.length > 0) {
        const post = posts.find(p => p.id === postId);
        setSelectedPost(post || null);
      } else {
        setSelectedPost(null);
      }
    };

    // Listen for browser back/forward events
    window.addEventListener('popstate', handlePopState);
    
    // Check URL on component mount
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [posts]);

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
          filename
        };
      });

      const loadedPosts = await Promise.all(postPromises);
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(loadedPosts);
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

  const handlePostClick = (post: BlogPost): void => {
    // Update URL without page reload
    const newUrl = `${window.location.pathname}?post=${post.id}`;
    window.history.pushState({ postId: post.id }, '', newUrl);
    setSelectedPost(post);
  };

  const handleBackToList = (): void => {
    // Update URL to remove post parameter
    const newUrl = window.location.pathname;
    window.history.pushState({}, '', newUrl);
    setSelectedPost(null);
  };

  // Dark mode custom components for ReactMarkdown
  const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-100">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2 text-gray-100">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-gray-300 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 pl-6 space-y-2 list-disc">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 pl-6 space-y-2 list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-300">
        {children}
      </li>
    ),
    code: ({ children, inline }) => (
      inline ? (
        <code className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ) : (
        <code className="block bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono">
          {children}
        </code>
      )
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-800 border border-gray-700 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 bg-gray-800 pl-4 py-2 my-4 italic text-gray-300 rounded-r">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-100">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-300">
        {children}
      </em>
    ),
    a: ({ children, href }) => (
      <a 
        href={href} 
        className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    hr: () => (
      <hr className="border-gray-700 my-8" />
    ),
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 pt-54 pb-8">
          <div className="text-center py-12 text-lg text-gray-400">
            <div className="animate-pulse">Loading blog posts...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12 text-lg text-red-400">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {selectedPost ? (
          <div className="animate-fade-in">
            <button 
              className="mb-8 px-4 py-2 bg-black hover:bg-gray-600 text-gray-100 rounded-md transition-colors duration-200 flex items-center gap-2"
              onClick={handleBackToList}
              type="button"
            >
              <span>←</span> Back to Blog
            </button>
            
            <article className="bg-black  p-8 shadow-xl">
              <header className="mb-8 pb-6 border-b border-gray-700">
                <h1 className="text-4xl font-bold mb-3 text-gray-100 leading-tight">
                  {selectedPost.title}
                </h1>
                <time 
                  className="text-gray-400 text-base flex items-center gap-2"
                  dateTime={selectedPost.date}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {selectedPost.date}
                </time>
              </header>
              
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown components={markdownComponents}>
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        ) : (
          <div>
            <header className="text-center mb-12 pb-8 border-b border-gray-700">
              <h1 className="text-5xl font-bold mb-4 text-white bg-gradient-to-r from-blue-400 pt-8 to-purple-500 bg-clip-text text-transparent">
                Posts and Updates
              </h1>
            </header>
            
            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 italic">
                  <div className="text-6xl mb-4">📝</div>
                  <p>No blog posts found.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <article 
                    key={post.id} 
                    className="p-6 bg-black border border-gray-700 rounded-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-gray-600 transition-all duration-300 cursor-pointer group"
                    onClick={() => handlePostClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handlePostClick(post);
                      }
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
                      {post.title}
                    </h2>
                    <time 
                      className="text-gray-500 text-sm block mb-4 flex items-center gap-2"
                      dateTime={post.date}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {post.date}
                    </time>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <button 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors duration-200 text-sm font-medium shadow-lg hover:shadow-blue-500/25"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handlePostClick(post);
                      }}
                      type="button"
                    >
                      Read More 
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </article>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
