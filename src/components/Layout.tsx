import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Define ALL pages that should NOT have a footer
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
    // Add services page if you create it
    // Add more pages as needed
  ];
  
  // Check if current path is in the excluded list
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
