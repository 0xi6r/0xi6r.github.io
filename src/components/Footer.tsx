import React, { useState } from 'react';
import { Shield, Linkedin, Github, Send, AlertCircle, CheckCircle, Rss, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '/0xi6r.svg';

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
      const res = await fetch('https://0x-i6r.vercel.app/api/newsletter', {
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

  // Mastodon SVG icon for consistency
  const MastodonIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/>
    </svg>
  );

  return (
    <footer className="bg-black text-white py-12 w-full border-t border-gray-800">
      <div className="w-full px-8">
        {/* === Top Footer Grid === */}
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Brand/About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={Logo} className="w-8 h-8" alt="0xi6r Logo" />
              <span className="text-white font-bold text-xl">0xi6r</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              <b>Offensive Security Researcher</b> specializing in advanced penetration testing 
              and red team operations. Helping organizations strengthen defenses and 
              <b> reduce risks</b> against evolving cyber threats.
            </p>

            {/* Social Links - Consistent Icons */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://infosec.exchange/@0x_i6r" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Mastodon"
              >
                <MastodonIcon />
              </a>
              <a 
                href="https://github.com/0xi6r" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="/rss.xml" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="RSS Feed"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Rss className="w-5 h-5" />
              </a>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>OSCP | CEH | OSEP (active)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact</Link></li>
              <li>
                <a 
                  href="/rss.xml" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1"
                >
                  <Rss className="w-3 h-3" />
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>

          {/* Expertise (formerly Skills) - Now Clickable */}
          <div>
            <h4 className="text-white font-semibold mb-4">Expertise</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/blog?category=Red%20Team" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm block"
                >
                  Red Teaming
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog?category=Malware%20Analysis" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm block"
                >
                  Malware Analysis
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog?category=Vulnerability%20Research" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm block"
                >
                  Vulnerability Research
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog?category=Tool%20Development" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm block"
                >
                  Offensive Tool Dev
                </Link>
              </li>
              <li className="text-gray-400 text-sm">Reverse Engineering</li>
              <li className="text-gray-400 text-sm">Penetration Testing</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Security Insights</h4>
            <p className="text-gray-400 text-sm mb-4">
              Weekly updates on vulnerabilities, security trends, and offensive techniques.
            </p>

            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-green-400 text-sm bg-green-900/20 p-3 rounded-md border border-green-800">
                <CheckCircle className="w-4 h-4" />
                <span>Successfully subscribed!</span>
              </div>
            ) : (
              <>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
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
                  <div className="flex items-center space-x-2 text-red-400 text-xs mt-2 bg-red-900/20 p-2 rounded-md border border-red-800">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </div>
                )}
              </>
            )}

            <p className="text-xs text-gray-500 mt-3">
              No spam. Unsubscribe anytime.{' '}
              <Link to="/PrivacyPolicy" className="text-cyan-400 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* === Bottom Footer === */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-gray-400 text-sm italic mb-4 font-light">
            "The human factor is the most vulnerable link in the security chain — Kevin Mitnick"
          </p>
          <div className="text-gray-400 text-sm mb-4">
            © 2026 0xi6r. All rights reserved.
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs">
            <Link to="/Terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/PrivacyPolicy" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>

            <a 
                href="/sitemap.xml" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <sitemap className="w-5 h-5" />
              sitemap
              </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
