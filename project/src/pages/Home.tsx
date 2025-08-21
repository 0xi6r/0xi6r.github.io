import React, { useState, useEffect } from 'react';
import { ArrowDown, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const titles = [
    'Red Teamer',,
    'bug bounty hunter',
    'Penetration Tester',
    'Security Researcher'
  ];

  useEffect(() => {
    const typeText = async () => {
      const title = titles[currentIndex];
      for (let i = 0; i <= title.length; i++) {
        setCurrentText(title.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      for (let i = title.length; i >= 0; i--) {
        setCurrentText(title.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    };

    typeText();
  }, [currentIndex]);

  const features = [
    {
      title: 'Vulnerability Research',
      description: 'Discovering and analyzing security vulnerabilities in modern systems',
      link: '/VulnResearch'
    },
    {
      title: 'APT Simulation',
      description: 'Helping organizations strengthen their security posture against advanced adversaries',
      link: '/RedTeamServices'
    },
    {
      title: 'Research Publications',
      description: 'Contributing to the cybersecurity knowledge base',
      link: '/blog?post=whatIdo'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Terminal className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
           Hello 
          </h1>
          
          <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span className="mr-2">I'm a</span>
            <span className="text-cyan-400 font-semibold min-w-[300px] text-left">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Securing digital landscapes through research, analysis, and innovative solutions. 
            Passionate about finding vulnerabilities before the bad guys do.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/contact"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
             Let's connect 
            </Link>
            <Link 
              to="/blog?post=interests"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              My Interests 
            </Link>
          </div>
          
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What I Do</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Specializing in cutting-edge cybersecurity research and practical security solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <Link 
                  to={feature.link}
                  className="flex items-center text-cyan-600 hover:text-cyan-700 transition-colors font-medium"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
