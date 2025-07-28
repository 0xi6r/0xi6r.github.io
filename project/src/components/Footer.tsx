import React, { useState } from 'react';
import { Shield, Mail, MapPin, Linkedin, Twitter, Github, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Adjust path as needed
import Logo from './0xi6r.svg';

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
      // Insert email into Supabase
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email.toLowerCase().trim(),
            source: 'footer_signup',
            user_agent: navigator.userAgent,
            // Note: IP address would need to be collected server-side for privacy/security
          }
        ])
        .select();

      if (error) {
        // Handle specific error cases
        if (error.code === '23505') { // Unique constraint violation
          setError('This email is already subscribed to our newsletter.');
        } else {
          setError('Something went wrong. Please try again later.');
          console.error('Supabase error:', error);
        }
      } else {
        setIsSubscribed(true);
        setEmail('');
        
        // Optional: Send welcome email or trigger other actions
        console.log('Successfully subscribed:', data);
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubscribed(false), 5000);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Network error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white py-12 w-full">
      <div className="w-full px-8">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={Logo} className="w-8 h-8" alt="0xi6r" />
              <span className="text-white font-bold text-xl">0xi6r</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              <b>Offensive Security Researcher</b> specializing in proactive vulnerability assessment 
              and penetration testing. Helping organizations strengthen their security posture 
              and <b>reduce risk</b> from emerging cyber threats.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Security Insights Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Get weekly updates on the latest vulnerabilities, security trends, and penetration testing techniques.
              </p>
              
              {isSubscribed ? (
                <div className="flex items-center space-x-2 text-green-400 text-sm bg-green-900/20 p-3 rounded-md border border-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Successfully subscribed! Check your email for confirmation.</span>
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
                No spam, unsubscribe anytime. Read our{' '}
                <Link to="/privacy-policy" className="text-cyan-400 hover:underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a href="https://linkedin.com/in/isaacogina" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/0xi6r" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/0xi6r" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
            
            {/* Certifications/Credentials */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>OSCP | CEH | OSEP (ongoing)</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/PenetrationTesting" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Penetration Testing</Link></li>
              <li><Link to="/SecurityConsulting" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Security Consulting</Link></li>
              <li><Link to="/RedTeamServices" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Red Team Operations</Link></li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 mb-6">
              <li><Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Portfolio</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                <a href="mailto:0xi6r@tutamail.com" className="text-sm hover:text-cyan-400 transition-colors">
                  0xi6r@tutamail.com
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                <span className="text-sm">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {/* Bottom Section */}
<div className="border-t border-gray-800 mt-8 pt-8 text-center">
  {/* Centered Quote */}
  <p className="text-gray-400 text-base italic mb-4 font-light">
    "Security is a people problem wearing a technical costume."
  </p>
  
  {/* Copyright */}
  <div className="text-gray-400 text-sm mb-4">
    © 2024 0xi6r. All rights reserved. | Made with ❤️ by Isaac
  </div>
  
  {/* Links */}
  <div className="flex items-center justify-center space-x-4 text-sm">
    <Link to="/Terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
      Terms of Service
    </Link>
    <span className="text-gray-600">|</span>
    <a href="/sitemap.xml" className="text-gray-400 hover:text-cyan-400 transition-colors">
      Sitemap
    </a>
  </div>
</div>
      </div>
    </footer>
  );
};

export default Footer;
