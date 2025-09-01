import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Tag, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Clock,
  Eye
} from 'lucide-react';

const HomePage = () => {
  // Mock data for latest blog post
  const latestPost = {
    id: 1,
    title: "Advanced EDR Evasion Techniques in Modern Environments",
    subtitle: "Exploring sophisticated methods to bypass endpoint detection and response systems using memory manipulation and process hollowing techniques",
    image: "/images/blog/edr-evasion-cover.jpg", // You'll need to add actual images
    date: "2025-08-28",
    category: "Red Team",
    excerpt: "In this comprehensive analysis, we dive deep into advanced EDR evasion techniques that modern threat actors are employing...",
    readTime: "12 min read",
    slug: "advanced-edr-evasion-techniques"
  };

  // Mock data for featured articles (previously latest posts)
  const featuredArticles = [
    {
      id: 2,
      title: "Zero-Day Discovery: Critical RCE in Popular CMS",
      subtitle: "Detailed analysis of CVE-2025-XXXX and responsible disclosure process",
      image: "/images/blog/zero-day-cms.jpg",
      date: "2025-08-15",
      category: "Vulnerability Research",
      readTime: "8 min read",
      slug: "zero-day-cms-rce"
    },
    {
      id: 3,
      title: "Building a Custom C2 Framework for Red Team Operations",
      subtitle: "Step-by-step guide to developing covert command and control infrastructure",
      image: "/images/blog/c2-framework.jpg",
      date: "2025-07-30",
      category: "Tool Development",
      readTime: "15 min read",
      slug: "custom-c2-framework"
    },
    {
      id: 4,
      title: "APT29 TTPs Analysis: Lessons from Recent Campaigns",
      subtitle: "Behavioral analysis and defensive recommendations against Cozy Bear operations",
      image: "/images/blog/apt29-analysis.jpg",
      date: "2025-07-12",
      category: "Threat Intelligence",
      readTime: "10 min read",
      slug: "apt29-ttps-analysis"
    }
  ];

  // Mock data for featured project
  const featuredProject = {
    id: 1,
    title: "StealthScan",
    description: "An advanced network reconnaissance tool designed for red team operations with built-in evasion capabilities and modular architecture for custom payloads.",
    about: "StealthScan combines multiple scanning techniques with anti-detection mechanisms, making it ideal for penetration testing and red team engagements. Features include port scanning, service enumeration, vulnerability detection, and custom payload delivery.",
    githubUrl: "https://github.com/isaac/stealthscan",
    technologies: ["Python", "Nmap", "Scapy", "Asyncio"],
    image: "/images/projects/stealthscan-preview.jpg",
    status: "Active Development",
    lastUpdate: "2025-08-25"
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Red Team': 'bg-red-500',
      'Vulnerability Research': 'bg-orange-500',
      'Tool Development': 'bg-green-500',
      'Threat Intelligence': 'bg-purple-500',
      'Malware Analysis': 'bg-yellow-500',
      'Default': 'bg-cyan-500'
    };
    return colors[category] || colors['Default'];
  };

  return (
    <div className="min-h-screen pt-20 bg-black">
      {/* Hero/Latest Post Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          {/* Latest Post */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/10 transition-shadow duration-300">
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Content */}
                <div className="lg:col-span-2 p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(latestPost.category)}`}>
                      {latestPost.category}
                    </span>
                    <div className="flex items-center ml-4 text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {latestPost.readTime}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {latestPost.title}
                  </h1>
                  
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {latestPost.subtitle}
                  </p>
                  
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {latestPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{formatDate(latestPost.date)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Image */}
                <div className="lg:col-span-1">
                  <div className="h-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center p-8">
                    {/* Placeholder for blog image */}
                    <div className="w-full h-64 lg:h-full bg-black/20 rounded-lg flex items-center justify-center">
                      <Eye className="w-16 h-16 text-white/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl font-bold text-white mr-4">Featured Articles</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <Link 
              to="/blog" 
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <article key={article.id} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors duration-300 group">
                {/* Article Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <Eye className="w-12 h-12 text-gray-500" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className={`px-2 py-1 rounded text-white text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <div className="flex items-center ml-3 text-gray-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {article.subtitle}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    
                    <Link 
                      to={`/blog/${article.slug}`}
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
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl font-bold text-white mr-4">Featured Project</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <Link 
              to="/projects" 
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Project Image */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full h-64 bg-black/20 rounded-lg flex items-center justify-center">
                  <Github className="w-20 h-20 text-white/40" />
                </div>
              </div>
              
              {/* Project Details */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredProject.status}
                  </span>
                  <span className="text-gray-400 text-sm ml-4">
                    Updated {formatDate(featuredProject.lastUpdate)}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">
                  {featuredProject.title}
                </h3>
                
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {featuredProject.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-cyan-400 font-semibold mb-2">About This Project:</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {featuredProject.about}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-cyan-400 font-semibold mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </a>
                  <Link 
                    to={`/projects/${featuredProject.id}`}
                    className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
