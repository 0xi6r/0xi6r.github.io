import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Heart, 
  Scale, 
  Globe, 
  Lock, 
  Eye, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Award, 
  Target, 
  Zap, 
  BookOpen, 
  Calendar, 
  Download, 
  Share2, 
  Mail, 
  ExternalLink,
  Gavel,
  Database,
  Server,
  Activity,
  UserCheck,
  Clock,
  Building,
  Flag,
  Handshake,
  Star,
  ArrowRight
} from 'lucide-react';

const EthicalOath = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [signatureDate] = useState(new Date());
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const principles = [
    {
      number: "1",
      title: "Protection of Privacy and Personal Data",
      icon: Lock,
      color: "from-blue-500 to-cyan-500",
      commitments: [
        "Safeguard privacy and personal data in accordance with legal, ethical, and societal expectations",
        "Adhere to HIPAA, CCPA, GDPR, PIPL, Privacy Act 1988, UAE Federal Data Protection Law, and Bahrain's Personal Data Protection Law",
        "Align with ISO/IEC 27701 for privacy information management with robust controls for handling personal data"
      ],
      frameworks: ["GDPR", "HIPAA", "CCPA", "ISO/IEC 27701"]
    },
    {
      number: "2",
      title: "Security and Resilience of Critical Systems",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      commitments: [
        "Prioritize security and resilience in healthcare and critical infrastructure systems",
        "Adhere to CISA, NIS2, Singapore Cybersecurity Act, and Japan's Cybersecurity Management Guidelines",
        "Follow ISO/IEC 27001 and ISO/IEC 80001 for information security management and medical device networks"
      ],
      frameworks: ["ISO/IEC 27001", "NIS2", "CISA", "ISO/IEC 80001"]
    },
    {
      number: "3",
      title: "Responsible Vulnerability Disclosure",
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
      commitments: [
        "Disclose vulnerabilities responsibly, prioritizing collaboration and public safety",
        "Comply with coordinated vulnerability disclosure (CVD) frameworks",
        "Respect the Budapest Convention on Cybercrime and collaborate with global stakeholders"
      ],
      frameworks: ["CVD", "CISA Guidelines", "ENISA", "Budapest Convention"]
    },
    {
      number: "4",
      title: "Securing Medical Devices and Healthcare IT",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      commitments: [
        "Secure medical devices and IT systems by addressing vulnerabilities transparently",
        "Adhere to FDA cybersecurity guidelines and EU Medical Device Regulation (MDR)",
        "Engage with Biohacking Village Device Lab, manufacturers, and regulators"
      ],
      frameworks: ["FDA Guidelines", "EU MDR", "ISO 14155", "IEC 62304"]
    },
    {
      number: "5",
      title: "Protection of Sensitive Data",
      icon: Database,
      color: "from-purple-500 to-violet-500",
      commitments: [
        "Uphold the highest standards of confidentiality for sensitive data",
        "Follow ISO/IEC 27018 for cloud privacy and security",
        "Maintain transparency about data use and handle breaches in compliance with applicable laws"
      ],
      frameworks: ["ISO/IEC 27018", "SOC 2", "NIST Privacy Framework"]
    },
    {
      number: "6",
      title: "Advancement of Public Welfare",
      icon: Globe,
      color: "from-teal-500 to-blue-500",
      commitments: [
        "Promote global cybersecurity efforts to protect health and critical infrastructure",
        "Align with ISO 31000 for risk management",
        "Build trust between security researchers, healthcare providers, and regulatory bodies"
      ],
      frameworks: ["ISO 31000", "NIST CSF", "Dubai Cyber Security Law"]
    },
    {
      number: "7",
      title: "Timely and Responsible Reporting",
      icon: Clock,
      color: "from-indigo-500 to-purple-500",
      commitments: [
        "Act swiftly and responsibly in addressing cybersecurity issues",
        "Report vulnerabilities within timelines specified by regulatory authorities",
        "Collaborate with manufacturers under coordinated disclosure policies"
      ],
      frameworks: ["90-Day Disclosure", "FDA Reporting", "CSA Singapore"]
    }
  ];

  const certifications = [
    { name: "CISSP", description: "Certified Information Systems Security Professional" },
    { name: "OSCP", description: "Offensive Security Certified Professional" },
    { name: "CEH", description: "Certified Ethical Hacker" },
    { name: "GCIH", description: "GIAC Certified Incident Handler" },
    { name: "CISA", description: "Certified Information Systems Auditor" },
    { name: "CISM", description: "Certified Information Security Manager" }
  ];

  const handleAcceptOath = () => {
    setHasAccepted(true);
    setShowSignature(true);
    // Here you could store the acceptance in a database
    localStorage.setItem('ethicalOathAccepted', JSON.stringify({
      accepted: true,
      date: signatureDate.toISOString(),
      version: '1.0'
    }));
  };

  const downloadOath = () => {
    // Generate PDF or document download
    const element = document.createElement('a');
    const file = new Blob([document.getElementById('oath-content').innerText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = '0xi6r-ethical-oath.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900/20 py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Ethical</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Hacker's Oath
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              A solemn commitment to ethical cybersecurity practices, inspired by the Hippocratic Oath 
              for medical professionals. This pledge governs all security testing and research activities 
              undertaken by 0xi6r, ensuring the highest standards of professional conduct.
            </p>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Established: {signatureDate.getFullYear()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Version 1.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Global Standards</span>
              </div>
            </div>
          </div>

          {/* Oath Overview */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Oath Overview</h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg mb-6" id="oath-content">
              As a professional cybersecurity researcher dedicated to advancing cybersecurity and safeguarding human life, 
              I pledge to uphold the highest ethical standards and comply with applicable laws and regulations in all my endeavors. 
              Guided by globally recognized principles, legal frameworks, and industry best practices, I commit to protecting privacy, 
              ensuring system security, and fostering public trust in the cybersecurity of medical devices and critical infrastructure.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Patient Safety First</h3>
                <p className="text-gray-400 text-sm">Prioritizing human life and safety in all security research</p>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Ethical Standards</h3>
                <p className="text-gray-400 text-sm">Adhering to the highest professional and ethical standards</p>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                <Globe className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Global Compliance</h3>
                <p className="text-gray-400 text-sm">Following international laws and regulatory frameworks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seven Principles */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Seven Core Principles</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These principles form the foundation of ethical cybersecurity research and testing, 
              ensuring responsible disclosure and protection of critical systems.
            </p>
          </div>

          <div className="space-y-8">
            {principles.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    {/* Principle Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 bg-gradient-to-r ${principle.color} rounded-xl flex items-center justify-center mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-white font-bold text-sm">{principle.number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">{principle.title}</h3>
                      
                      <div className="space-y-3 mb-6">
                        {principle.commitments.map((commitment, commitmentIndex) => (
                          <div key={commitmentIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <p className="text-gray-300 leading-relaxed">{commitment}</p>
                          </div>
                        ))}
                      </div>

                      {/* Frameworks */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">KEY FRAMEWORKS & STANDARDS</h4>
                        <div className="flex flex-wrap gap-2">
                          {principle.frameworks.map((framework, frameworkIndex) => (
                            <span 
                              key={frameworkIndex}
                              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-700"
                            >
                              {framework}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications & Credentials */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Professional Credentials</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Backed by industry-recognized certifications and continuous professional development 
              in cybersecurity and ethical hacking practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pledge of Accountability */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-800">
            <div className="text-center mb-8">
              <Handshake className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Pledge of Accountability</h2>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-8 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed text-center italic">
                "By taking this oath, I affirm my unwavering commitment to ethical hacking, compliance with legal frameworks, 
                and the protection of human life. My work will prioritize privacy, security, and the public good, 
                ensuring patient safety and resilience in critical systems."
              </p>
            </div>

            {!hasAccepted ? (
              <div className="text-center">
                <p className="text-gray-400 mb-6">
                  By accepting this oath, you commit to upholding these principles in all cybersecurity activities.
                </p>
                <button
                  onClick={handleAcceptOath}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
                >
                  Accept Ethical Oath
                </button>
              </div>
            ) : (
              <div className="text-center">
                {showSignature && (
                  <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-6 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-green-400 mb-2">Oath Accepted</h3>
                    <p className="text-gray-300">
                      Digitally signed on {signatureDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <div className="mt-4 text-2xl font-signature text-blue-400">
                      Isaac Mwangi (0xi6r)
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={downloadOath}
                    className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Oath
                  </button>
                  <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Commitment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact & Verification */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Verification & Contact</h2>
          <p className="text-xl text-gray-300 mb-8">
            This oath is publicly verifiable and represents our commitment to ethical cybersecurity practices.
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Verification</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Digitally signed commitment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Publicly auditable practices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Regular compliance reviews</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">ethics@0xi6r.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Nairobi, Kenya</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Public verification available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .font-signature {
          font-family: 'Brush Script MT', cursive;
        }
      `}</style>
    </div>
  );
};

export default EthicalOath;
