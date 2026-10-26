import { Github, Rss, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div>
        <p className="site-footer__brand">0xi6r / Security Research</p>
        <p className="site-footer__copy">Offensive research, practical analysis, and considered disclosure.</p>
      </div>
      <div className="site-footer__links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <a href="https://github.com/0xi6r" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16} /></a>
        <a href="https://youtube.com/@0xi6r" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={16} /></a>
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer" aria-label="RSS feed"><Rss size={16} /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
