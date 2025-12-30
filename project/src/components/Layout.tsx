import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Check if current path is the blog page
  const isBlogPage = location.pathname === '/blog';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      {/* Conditionally render footer */}
      {!isBlogPage && <Footer />}
    </div>
  );
};

export default Layout;
