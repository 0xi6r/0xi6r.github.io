import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Shield, 
  AlertTriangle,
  Bug,
  Target,
  Eye,
  Zap,
  RefreshCw,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const [glitchText, setGlitchText] = useState('404');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Glitch effect for 404 text
  useEffect(() => {
    const glitchChars = ['4', '0', '4', '@', '#', '$', '%', '&', '*'];
    const interval = setInterval(() => {
      let glitched = '';
      for (let i = 0; i < 3; i++) {
        if (Math.random() > 0.7) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += '404'[i];
        }
      }
      setGlitchText(glitched);
      
      setTimeout(() => setGlitchText('404'), 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const popularPages = [
    { name: 'Red Team Operations', path: '/red-team', icon: Target },
    { name: 'Security Consulting', path: '/security-consulting', icon: Shield },
    { name: 'Penetration Testing', path: '/penetration-testing', icon: Bug },
    { name: 'Vulnerability Assessment', path: '/vulnerability-assessment', icon: Eye },
    { name: 'Security Training', path: '/security-training', icon: Zap },
    { name: 'About Us', path: '/about', icon: Shield }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement search functionality here
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-10 bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        
        {/* Floating Security Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const icons = [Shield, Bug, Target, Eye, Zap, AlertTriangle];
            const IconComponent = icons[i % icons.length];
            return (
              <div
                key={i}
                className="absolute animate-float opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              >
                <IconComponent className="w-8 h-8 text-red-400" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 404 Glitch Text */}
          <div className="mb-8">
            <h1 className="text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 mb-4 font-mono tracking-wider glitch">
              {glitchText}
            </h1>
            <div className="text-2xl lg:text-3xl font-bold text-red-400 mb-2">
              SECURITY BREACH DETECTED
            </div>
            <div className="text-lg text-gray-400">
              Just kidding! The page you're looking for doesn't exist.
            </div>
          </div>

          {/* Error Message */}
          <div className="bg-black border border-black rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              The page you're trying to access might have been moved, deleted, or you may have 
              entered an incorrect URL. Don't worry, even the best security systems have their blind spots!
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Popular Pages */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6">Popular Services</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {popularPages.map((page, index) => {
                const IconComponent = page.icon;
                return (
                  <Link
                    key={index}
                    to={page.path}
                    className="group bg-black hover:bg-gray-800 border border-gray-700 hover:border-red-500/50 rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                      <span className="text-white group-hover:text-red-100 font-medium text-sm">
                        {page.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goBack}
              className="group bg-black hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center border border-gray-600 hover:border-gray-500"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            
            <Link
              to="/"
              className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Home Page
            </Link>
            
            <button
              onClick={() => window.location.reload()}
              className="group bg-black hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center border border-gray-600 hover:border-gray-500"
            >
              <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Refresh
            </button>
          </div>

          {/* Contact Section */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-4">
              Still can't find what you're looking for?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:0xi6r@tutamail.com"
                className="group text-red-400 hover:text-red-300 transition-colors flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
                <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .glitch {
          position: relative;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          animation: glitch-1 0.5s infinite;
          color: #ff0000;
          z-index: -1;
        }
        
        .glitch::after {
          animation: glitch-2 0.5s infinite;
          color: #00ff00;
          z-index: -2;
        }
        
        @keyframes glitch-1 {
          0%, 14%, 15%, 49%, 50%, 99%, 100% {
            transform: translate(0);
          }
          15%, 49% {
            transform: translate(-2px, 2px);
          }
        }
        
        @keyframes glitch-2 {
          0%, 20%, 21%, 62%, 63%, 99%, 100% {
            transform: translate(0);
          }
          21%, 62% {
            transform: translate(2px, -2px);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;