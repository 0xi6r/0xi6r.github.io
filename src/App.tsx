import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import VulnResearch from './pages/VulnResearch';
import Services from './pages/Services';
import GitHubShowcase from './components/GitHubShowcase';
import VulnerabilityResearch from './pages/VulnerabilityResearch';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        {/* Default Meta Tags */}
        <Helmet>
          <title>0xi6r - Infosec Research</title>
          <meta name="description" content="Security research, malware analysis, and red team content" />
          <meta property="og:title" content="0xi6r - Infosec Research" />
          <meta property="og:description" content="Security research, malware analysis, and red team content" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://0xi6r.github.io" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="0xi6r - Infosec Research" />
          <meta name="twitter:description" content="Security research, malware analysis, and red team content" />
        </Helmet>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/Terms' element={<Terms />} />
            <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
            <Route path='/VulnerabilityResearch' element={<VulnerabilityResearch />} />
            <Route path='/Services' element={<Services />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
