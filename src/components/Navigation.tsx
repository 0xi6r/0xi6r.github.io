import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '/0xi6r.svg';

const navItems = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (navigationRef.current && !navigationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <nav className="site-nav" ref={navigationRef} aria-label="Primary navigation">
      <div className="site-nav__bar">
        <Link to="/" className="site-nav__brand" aria-label="0xi6r home">
          <img src={Logo} alt="" />
          <span>0xi6r / Research</span>
        </Link>

        <div className={`site-nav__links ${isOpen ? 'site-nav__links--open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`site-nav__link ${isActive(item.href) ? 'site-nav__link--active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          className="site-nav__menu"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
