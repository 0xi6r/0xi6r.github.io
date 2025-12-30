import React, { useState } from 'react';
import { Shield, Linkedin, Github, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './0xi6r.svg';
import mastodon from './mastodon.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          user_agent: navigator.userAgent,
          source: 'footer_signup',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setIsSubscribed(true);
        setEmail('');
        setTimeout(() => setIsSubscribed(false), 5000);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white py-12 w-full">
      <div className="w-full px-8">
        {/* === Top Footer Grid === */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand/About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={Logo} className="w-8 h-8" alt="0xi6r Logo" />
              <span className="text-white font-bold text-xl">0xi6r</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              <b>Offensive Security Researcher</b> specializing in advanced penetration testing 
              and red team operations. Helping organizations strengthen defenses and 
              <b> reduce risks</b> against evolving cyber threats.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a href="https://linkedin.com/in/isaacogina" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://infosec.exchange/@0x_i6r" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <img src={mastodon} className="w-5 h-5" alt="mastodon" />
              </a>
              <a href="https://github.com/0xi6r" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>OSCP | CEH | OSEP (active)</span>
            </div>
          </div>

          {/* Quick Links (no contact or location) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 mb-6">
              <li><Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact</Link></li>
              <li><Link to="/EthicalOath" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Oath</Link></li>
            </ul>
          </div>

           {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Penetration Testing</li>
              <li className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Red Team Operations</li>
            </ul>
          </div>

          {/* Newsletter → Dedicated Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Security Insights Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get weekly updates on vulnerabilities, security trends, and pentesting & red teaming techniques.
            </p>
            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-green-400 text-sm bg-green-900/20 p-3 rounded-md border border-green-800">
                <CheckCircle className="w-4 h-4" />
                <span>Successfully subscribed! Check your email.</span>
              </div>
            ) : (
              <>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </form>
                {error && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm mt-2 bg-red-900/20 p-3 rounded-md border border-red-800">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </>
            )}
            <p className="text-xs text-gray-500 mt-2">
              No spam. Unsubscribe anytime. Read my{' '}
              <Link to="/PrivacyPolicy" className="text-cyan-400 hover:underline">
                privacy policy
              </Link>.
            </p>
          </div>
        </div>

        {/* === Bottom Footer === */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-gray-400 text-base italic mb-4 font-light">
            "Security is a people problem wearing a technical costume."
          </p>
          <div className="text-gray-400 text-sm mb-4">
            © 2025 0xi6r. All rights reserved. | Made with ❤️ by Isaac
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Link to="/Terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/sitemap" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
