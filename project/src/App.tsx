import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import RedTeamServices from './pages/RedTeamServices';
import PenetrationTesting from './pages/PenetrationTesting';
import PrivacyPolicy from './pages/PrivacyPolicy';
import EthicalOath from './pages/EthicalOath';
import VulnResearch from './pages/VulnResearch';
import NotFound from './pages/NotFound';

function App() {
  // end year edit
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog';
  // end
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/Terms' element={<Terms />} />
          <Route path='/RedTeamServices' element={<RedTeamServices />} />
          <Route path='/PenetrationTesting' element ={<PenetrationTesting />} />
          <Route path='/EthicalOath' element ={<EthicalOath />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/VulnResearch' element={<VulnResearch />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
         {/* Conditionally render footer. end year edit */}
      {!isBlogPage && <Footer />}
      </Layout>
    </Router>
  );
}

export default App;
