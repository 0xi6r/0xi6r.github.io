import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const pagesWithoutFooter = [
    '/blog',
    '/contact',
    '/EthicalOath',          
    '/services',
    '/Terms',
    '/NotFound',
    '/PrivacyPolicy',
    '/VulnResearch',
    '/sitemap',
  ];
  
  const shouldShowFooter = !pagesWithoutFooter.includes(location.pathname);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;
