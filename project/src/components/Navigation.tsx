import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '/0xi6r.svg';

const services = [
  { name: "Penetration Testing", href:"/services" },
  { name: "Red Team Operations", href:"/services" },
];

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setServiceOpen(false);
  }, [location.pathname]);

  // Click outside to close mobile menu and dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close mobile menu if clicking outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setServiceOpen(false);
      }
      
      // Close services dropdown if clicking outside (desktop)
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServiceOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for dropdown
  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    const links = dropdownRef.current?.querySelectorAll('a');
    if (!links || links.length === 0) return;
    const currentIndex = Array.from(links).findIndex(link => link === document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < links.length - 1) {
          links[currentIndex + 1].focus();
        } else {
          links[0].focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          links[currentIndex - 1].focus();
        } else {
          links[links.length - 1].focus();
        }
        break;
      case 'Escape':
        setServiceOpen(false);
        break;
      default:
        break;
    }
  };

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  // Check if current page is a services page
  const isServicesActive = services.some(srv => isActive(srv.href));

  return (
    <nav className="fixed top-0 w-full z-50 bg-black shadow transition-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-white font-bold text-xl"><img src={Logo} className="w-8 h-8" alt="0xi6r Logo" /></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-200 font-medium px-3 py-2 rounded-lg ${
                  isActive(item.href)
                    ? 'text-cyan-400 bg-gray-800'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Accessible Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout) {
                  clearTimeout(closeTimeout);
                  setCloseTimeout(null);
                }
                setServiceOpen(true);
              }}
              onMouseLeave={() => {
                // Add 300ms delay before closing
                const timeout = setTimeout(() => {
                  setServiceOpen(false);
                }, 300);
                setCloseTimeout(timeout);
              }}
            >
              <button
                className={`flex items-center font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                  serviceOpen || isServicesActive 
                    ? 'text-cyan-400 bg-gray-800' 
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800'
                }`}
                type="button"
                aria-haspopup="menu"
                aria-expanded={serviceOpen}
                aria-controls="services-menu"
                tabIndex={0}
                onClick={() => setServiceOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
                    e.preventDefault();
                    setServiceOpen(true);
                    setTimeout(() => {
                      dropdownRef.current?.querySelector('a')?.focus();
                    }, 10);
                  } else if (e.key === 'Escape') {
                    setServiceOpen(false);
                  }
                }}
                aria-label="Open services menu"
              >
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {serviceOpen && (
                <div
                  id="services-menu"
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 w-64 bg-black border border-gray-800 rounded-lg shadow-xl z-50"
                  role="menu"
                  aria-label="Service menu"
                  onKeyDown={handleDropdownKeyDown}
                  onMouseEnter={() => {
                    if (closeTimeout) {
                      clearTimeout(closeTimeout);
                      setCloseTimeout(null);
                    }
                  }}
                >
                  <ul className="py-2">
                    {services.map((srv) => (
                      <li key={srv.href} role="none">
                        <Link
                          to={srv.href}
                          className={`block px-6 py-3 text-base transition-colors duration-200 ${
                            isActive(srv.href) 
                              ? 'text-cyan-400 bg-gray-800' 
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          }`}
                          tabIndex={0}
                          role="menuitem"
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
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" ref={mobileMenuRef}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black rounded-lg mt-2 shadow">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 transition-colors duration-200 font-medium rounded-lg ${
                    isActive(item.href)
                      ? 'text-cyan-400 bg-gray-800'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 font-medium transition-colors duration-200 rounded-lg ${
                    serviceOpen || isServicesActive
                      ? 'text-cyan-400 bg-gray-800'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800'
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={serviceOpen}
                  aria-controls="mobile-services-menu"
                  aria-label="Open services menu"
                  onClick={() => setServiceOpen(!serviceOpen)}
                >
                  Services
                  <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${serviceOpen ? 'rotate-180' : ''}`} />
                </button>
                {serviceOpen && (
                  <ul
                    id="mobile-services-menu"
                    className="mt-1 ml-4 border-l-2 border-gray-700 space-y-1"
                    role="menu"
                    aria-label="Service menu"
                  >
                    {services.map((srv) => (
                      <li key={srv.href} role="none">
                        <Link
                          to={srv.href}
                          className={`block px-3 py-2 transition-colors duration-200 rounded-lg ${
                            isActive(srv.href)
                              ? 'text-cyan-400 bg-gray-800'
                              : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800'
                          }`}
                          role="menuitem"
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
