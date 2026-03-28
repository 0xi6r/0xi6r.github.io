import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  title1: string;
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

interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
        type="button"
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        className="rounded-lg"
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define categories with their colors
  const categories = [
    { name: 'All', color: 'bg-gray-700' },
    { name: 'Red Team', color: 'bg-red-500' },
    { name: 'Vulnerability Research', color: 'bg-orange-500' },
    { name: 'Tool Development', color: 'bg-green-500' },
    { name: 'Threat Intelligence', color: 'bg-purple-500' },
    { name: 'Malware Analysis', color: 'bg-yellow-500' },
    { name: 'Bug Bounty', color: 'bg-emerald-500' },
    { name: 'General', color: 'bg-cyan-500' }
  ];

  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Filter posts when category or posts change
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  // Handle URL changes and browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('post');
      const category = urlParams.get('category');

      if (postId && posts.length > 0) {
        const post = posts.find(p => p.id === postId);
        setSelectedPost(post || null);
      } else {
        setSelectedPost(null);
      }

      if (category) {
        setSelectedCategory(category);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [posts]);

  const loadBlogPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      const modules = import.meta.glob('/blogs/*.md', { as: 'raw' });
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
          readTime: metadata.readTime || calculateReadingTime(body),
          subtitle: metadata.subtitle || '',
          image: metadata.image || ''
        };
      });

      const loadedPosts = await Promise.all(postPromises);
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(loadedPosts);
      setFilteredPosts(loadedPosts);
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

  const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getCategoryCount = (categoryName: string): number => {
    if (categoryName === 'All') return posts.length;
    return posts.filter(post => post.category === categoryName).length;
  };

  const handleCategoryClick = (categoryName: string): void => {
    setSelectedCategory(categoryName);

    // Update URL with category
    const newUrl = categoryName === 'All'
      ? window.location.pathname
      : `${window.location.pathname}?category=${encodeURIComponent(categoryName)}`;
    window.history.pushState({ category: categoryName }, '', newUrl);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = (post: BlogPost): void => {
    const categoryParam = selectedCategory !== 'All' ? `&category=${encodeURIComponent(selectedCategory)}` : '';
    const newUrl = `${window.location.pathname}?post=${post.id}${categoryParam}`;
    window.history.pushState({ postId: post.id }, '', newUrl);
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = (): void => {
    const categoryParam = selectedCategory !== 'All' ? `?category=${encodeURIComponent(selectedCategory)}` : '';
    const newUrl = `${window.location.pathname}${categoryParam}`;
    window.history.pushState({}, '', newUrl);
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enhanced markdown components with syntax highlighting
  const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-100 scroll-mt-20">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-100 scroll-mt-20">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2 text-gray-100 scroll-mt-20">
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
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');

      return !inline && match ? (
        <CodeBlock language={match[1]}>
          {codeString}
        </CodeBlock>
      ) : (
        <code className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <div className="my-4">
        {children}
      </div>
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
    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-gray-700">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-800">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-gray-900 divide-y divide-gray-700">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr>{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {children}
      </td>
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
    <div className="min-h-screen pt-10 bg-black scroll-smooth">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {selectedPost ? (
          <div className="animate-fade-in">
            {/* Sticky Back Button */}
            <button
              className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50 px-3 py-2 sm:px-4 text-sm sm:text-base bg-gray-900 hover:bg-gray-700 text-gray-100 rounded-lg transition-all duration-200 flex items-center gap-2 border border-gray-700 shadow-2xl hover:shadow-blue-500/20 hover:scale-105 backdrop-blur-sm bg-opacity-95"
              onClick={handleBackToList}
              type="button"
            >
              <span>←</span> <span className="hidden sm:inline">Back to</span> Blog
            </button>

            <article className="bg-black p-4 sm:p-8 shadow-xl">
              <header className="mb-8 pb-6 border-b border-gray-700">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-100 leading-tight">
                  {selectedPost.title}
                </h1>

                {selectedPost.subtitle && (
                  <p className="text-lg text-gray-400 mb-4 leading-relaxed">
                    {selectedPost.subtitle}
                  </p>
                )}

                <div className="text-gray-400 text-sm sm:text-base flex flex-wrap items-center gap-2 sm:gap-4">
                  <time
                    className="flex items-center gap-2"
                    dateTime={selectedPost.date}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {selectedPost.date}
                  </time>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {selectedPost.readTime}
                  </span>
                </div>
              </header>

              <div className="prose prose-lg prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
                <ReactMarkdown
                  components={markdownComponents}
                  remarkPlugins={[remarkGfm]}
                >
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        ) : (
          <div>
            {/* Category Filter Pills */}
            <div className="mb-8 sticky top-16 bg-black pt-4 pb-4 z-40 border-b border-gray-800">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => {
                  const count = getCategoryCount(category.name);
                  if (count === 0 && category.name !== 'All') return null;

                  return (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`
                        px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                        flex items-center gap-2
                        ${selectedCategory === category.name
                          ? `${category.color} text-white shadow-lg scale-105`
                          : 'bg-white text-gray-800 hover:bg-gray-100 hover:scale-105 border border-gray-300'
                        }
                      `}
                      type="button"
                    >
                      <span>{category.name}</span>
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${selectedCategory === category.name
                          ? 'bg-black/30'
                          : 'bg-gray-200 text-gray-700'
                        }
                      `}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 italic">
                  <div className="text-6xl mb-4">📝</div>
                  <p>No blog posts found in this category.</p>
                  <button
                    onClick={() => handleCategoryClick('All')}
                    className="mt-4 text-cyan-400 hover:text-cyan-300 underline"
                  >
                    View all posts
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="p-6 bg-black hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-gray-600 transition-all duration-300 cursor-pointer group border border-gray-800 rounded-lg"
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

                    {post.subtitle && (
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {post.subtitle}
                      </p>
                    )}

                    <div className="text-gray-500 text-sm flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                      <time
                        className="flex items-center gap-2"
                        dateTime={post.date}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {post.date}
                      </time>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {post.readTime}
                      </span>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      {post.excerpt}
                    </p>
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
