import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const services = [
  { name: "Penetration Testing", href: "/PenetrationTesting" },
  { name: "Security Consulting", href: "/SecurityConsulting" },
  { name: "Red Team Operations", href: "/RedTeamServices" },
  { name: "System Administration & Threat Intelligence", href: "/sysadmin-services" }
];

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-white font-bold text-xl">Isaac</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-200 font-medium ${
                  isActive(item.href)
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >
              <button
                className={`flex items-center font-medium transition-colors duration-200
                  ${serviceOpen ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}
                type="button"
              >
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {serviceOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-black border border-gray-800 rounded-lg shadow-xl z-50">
                  <ul className="py-2">
                    {services.map((srv) => (
                      <li key={srv.href}>
                        <Link
                          to={srv.href}
                          className="block px-6 py-3 text-gray-300 hover:bg-cyan-900/80 hover:text-white text-base transition-colors duration-200"
                          onClick={() => setServiceOpen(false)}
                        >
                          {srv.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md rounded-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 transition-colors duration-200 font-medium ${
                    isActive(item.href)
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 font-medium transition-colors duration-200 text-gray-300 hover:text-cyan-400 focus:outline-none"
                  onClick={() => setServiceOpen(!serviceOpen)}
                >
                  Services
                  <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${serviceOpen ? 'rotate-180' : ''}`} />
                </button>
                {serviceOpen && (
                  <ul className="mt-1 ml-2">
                    {services.map((srv) => (
                      <li key={srv.href}>
                        <Link
                          to={srv.href}
                          className="block px-3 py-2 text-gray-300 hover:bg-cyan-900/80 hover:text-white transition-colors duration-200"
                          onClick={() => {
                            setIsOpen(false);
                            setServiceOpen(false);
                          }}
                        >
                          {srv.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
