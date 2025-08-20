import React, { useState } from 'react';
import { Shield, Lock, Globe, AlertTriangle, CheckCircle, BookOpen, Mail } from 'lucide-react';

const principles = [
  {
    title: "Protecting Privacy & Data",
    icon: Lock,
    points: [
      "Safeguard personal and client data with integrity.",
      "Respect confidentiality and never misuse access or information.",
    ],
  },
  {
    title: "Security First",
    icon: Shield,
    points: [
      "Prioritize the security and resilience of systems, networks, and software.",
      "Proactively address vulnerabilities and help prevent harm."
    ],
  },
  {
    title: "Responsible Disclosure",
    icon: AlertTriangle,
    points: [
      "Disclose vulnerabilities ethically and responsibly.",
      "Aim for positive outcomes for the wider security community."
    ],
  },
  {
    title: "Professional Integrity",
    icon: Globe,
    points: [
      "Act with honesty, transparency, and respect for clients and users.",
      "Comply with applicable laws and industry best practices.",
    ],
  },
];

const EthicalOath = () => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleAcceptOath = () => {
    setHasAccepted(true);
    localStorage.setItem('ethicalOathAccepted', JSON.stringify({
      accepted: true,
      date: new Date().toISOString(),
      version: '1.0'
    }));
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-16 pb-20 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-800 mx-2">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-10 h-10 text-cyan-400 mb-3" />
          <h1 className="text-3xl font-bold text-white mb-2">Ethical Hacker’s Oath</h1>
          <p className="text-gray-400 text-lg text-center">
            A personal commitment to integrity, privacy, and responsible cybersecurity practice.
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <BookOpen className="w-6 h-6 text-gray-400 mb-2" />
          <span className="text-gray-500 text-sm">Last updated: August 20, 2025</span>
        </div>

        <h2 className="text-xl font-semibold text-white mb-6 text-center">Core Principles</h2>
        <ul className="mb-10 space-y-7">
          {principles.map((p, idx) => (
            <li key={p.title} className="flex items-start space-x-4">
              <p.icon className="w-8 h-8 flex-shrink-0 text-cyan-400 mt-0.5" />
              <div>
                <h3 className="font-bold text-white mb-1">{p.title}</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {p.points.map((pt, i) => (
                    <li key={i} className="text-gray-300">{pt}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-gray-800 rounded-xl p-6 mb-10 text-center">
          <p className="italic text-gray-300">
            “I swear to use my knowledge and access to improve security, protect privacy, and build digital trust. I will never use my expertise to harm others or breach ethical boundaries.”
          </p>
        </div>

        {!hasAccepted ? (
          <div className="text-center">
            <button
              onClick={handleAcceptOath}
              className="bg-gray-800 hover:bg-gray-700 transition-colors text-white font-bold px-6 py-3 rounded-lg text-lg flex items-center justify-center mx-auto"
            >
              <CheckCircle className="mr-2 w-5 h-5" />
              Accept Oath
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-lg text-green-400 font-bold mb-2">Oath Accepted</div>
            <div className="text-gray-400">Thank you for committing to ethical cybersecurity practices.</div>
            <div className="mt-3 font-mono text-gray-500 text-sm">
              Signed on {new Date().toLocaleDateString()}
            </div>
          </div>
        )}

        <div className="mt-10 text-center text-gray-400 text-sm flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center">
            <Mail className="w-4 h-4 mr-1" />
            <span>Questions? ethics@0xi6r.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicalOath;
