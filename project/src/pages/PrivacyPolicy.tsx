import React from 'react';
import { Shield, Mail } from 'lucide-react';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-black text-gray-200 pt-16 pb-20 flex justify-center items-start">
    <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-800 mx-2">
      <div className="flex items-center mb-4">
        <Shield className="w-7 h-7 text-cyan-400 mr-2" />
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      </div>

      <p className="text-gray-400 mb-8 text-lg">
        Last updated: August 20, 2025
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">The essentials</h2>
      <ul className="list-disc pl-5 mb-8 text-gray-200 space-y-3">
        <li>
          This website is a personal portfolio with minimal backend.
        </li>
        <li>
          <strong>No analytics cookies, ad tracking, or third-party advertising</strong> is used.
        </li>
        <li>
          If you <strong>contact me through a form or subscribe to my newsletter</strong>, your email and message are stored securely and used only for communication or sending updates you requested.
        </li>
        <li>
          Your data is <strong>never sold, traded, or transferred</strong> to third parties.
        </li>
        <li>
          You may request deletion of your contact or subscription data at any time.
        </li>
        <li>
          For any privacy requests or questions, email&nbsp;
          <a
            href="mailto:0xi6r@tutamail.com"
            className="text-cyan-400 underline hover:text-cyan-300"
          >
            0xi6r@tutamail.com
          </a>.
        </li>
      </ul>

      <div className="mt-8 text-sm text-gray-400">
        <span className="flex items-center"><Mail className="w-4 h-4 mr-2" /> Your privacy matters. This policy may be updated. Major changes will be published here.</span>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
