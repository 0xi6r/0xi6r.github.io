import React from 'react';
import { Shield, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-9">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src='../0xi6r.png' className="text-cyan-400 w-8 h-8" />
              <span className="text-white font-bold text-xl">0xi6r</span>
            </div>
            <p className="text-gray-400 mb-4">
            <b>offensive security researcher</b>, proactively 
            identifying potential vulnerabilities and attack vectors 
            to help org strengthen their defenses and <b>reduce</b> risk from malicious threat actors.
            </p>
            <div className="text-gray-400 text-sm">
              © 2024 0xi6r. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">0xi6r@tutamail.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Nairobi, KE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Security is a people problem wearing a technical costume.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
