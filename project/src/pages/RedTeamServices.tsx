import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { 
  Shield, 
  Target, 
  Eye, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Zap, 
  FileText, 
  ArrowRight, 
  Play, 
  ChevronDown, 
  ChevronUp,
  Globe,
  Server,
  Smartphone,
  Wifi,
  Database,
  Code,
  Mail,
  Phone
} from 'lucide-react';

const RedTeamServices = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const methodologies = [
    {
      name: "MITRE ATT&CK Framework",
      description: "Industry-standard framework for adversary tactics, techniques, and procedures",
      icon: Target,
      color: "text-red-400"
    },
    {
      name: "NIST Cybersecurity Framework",
      description: "Comprehensive approach to managing cybersecurity risk",
      icon: Shield,
      color: "text-blue-400"
    },
    {
      name: "PTES (Penetration Testing Execution Standard)",
      description: "Structured methodology for penetration testing engagements",
      icon: FileText,
      color: "text-green-400"
    },
    {
      name: "OWASP Testing Guide",
      description: "Web application security testing methodology",
      icon: Globe,
      color: "text-purple-400"
    }
  ];

  const tools = [
    { category: "Reconnaissance", tools: ["Nmap", "Masscan", "Recon-ng", "theHarvester", "Shodan"], icon: Eye },
    { category: "Exploitation", tools: ["Metasploit", "Cobalt Strike", "Empire", "BloodHound", "Impacket"], icon: Zap },
    { category: "Post-Exploitation", tools: ["Mimikatz", "PowerShell Empire", "Covenant", "Sliver", "PoshC2"], icon: Lock },
    { category: "Social Engineering", tools: ["SET", "Gophish", "King Phisher", "Evilginx2", "Modlishka"], icon: Users },
    { category: "Physical Security", tools: ["Proxmark3", "HackRF", "Flipper Zero", "USB Rubber Ducky", "WiFi Pineapple"], icon: Wifi },
    { category: "Reporting", tools: ["Dradis", "Faraday", "PlexTrac", "GhostWriter", "Serpico"], icon: FileText }
  ];

  const phases = [
    {
      phase: "1. Planning & Intelligence",
      duration: "1-2 weeks",
      description: "Comprehensive reconnaissance and target analysis",
      activities: [
        "OSINT gathering and analysis",
        "Threat landscape assessment",
        "Attack surface mapping",
        "Rules of engagement definition"
      ]
    },
    {
      phase: "2. Initial Access",
      duration: "2-3 weeks",
      description: "Gaining initial foothold in target environment",
      activities: [
        "Phishing campaign execution",
        "Web application exploitation",
        "Network service exploitation",
        "Physical security assessment"
      ]
    },
    {
      phase: "3. Persistence & Escalation",
      duration: "2-4 weeks",
      description: "Establishing persistence and elevating privileges",
      activities: [
        "Privilege escalation techniques",
        "Persistence mechanism deployment",
        "Defense evasion implementation",
        "Lateral movement preparation"
      ]
    },
    {
      phase: "4. Lateral Movement",
      duration: "2-3 weeks",
      description: "Moving through the network to reach objectives",
      activities: [
        "Network enumeration and mapping",
        "Credential harvesting",
        "Inter-system compromise",
        "Domain controller targeting"
      ]
    },
    {
      phase: "5. Data Exfiltration",
      duration: "1-2 weeks",
      description: "Simulating data theft and impact assessment",
      activities: [
        "Sensitive data identification",
        "Exfiltration channel establishment",
        "Data extraction simulation",
        "Impact documentation"
      ]
    },
    {
      phase: "6. Reporting & Remediation",
      duration: "1-2 weeks",
      description: "Comprehensive reporting and remediation guidance",
      activities: [
        "Executive summary preparation",
        "Technical findings documentation",
        "Remediation roadmap creation",
        "Presentation to stakeholders"
      ]
    }
  ];

  const faqs = [
    {
      question: "How is Red Team testing different from traditional penetration testing?",
      answer: "Red Team operations simulate real-world adversaries with longer engagement periods (months vs days), broader scope including physical and social engineering, and focus on business impact rather than just technical vulnerabilities. While penetration testing identifies vulnerabilities, Red Team exercises test your organization's entire security posture including people, processes, and technology."
    },
    {
      question: "What legal protections are in place during Red Team engagements?",
      answer: "All Red Team activities are conducted under comprehensive legal frameworks including detailed Rules of Engagement (ROE), signed authorization letters, liability insurance, and compliance with local and international laws. We work closely with your legal team to ensure all activities are properly authorized and documented."
    },
    {
      question: "How do you ensure business operations aren't disrupted?",
      answer: "We implement strict safeguards including 24/7 communication channels, predefined escalation procedures, business-hours-only testing for critical systems, and immediate rollback capabilities. Our team coordinates closely with your operations team to minimize any potential impact."
    },
    {
      question: "What happens to the data and access gained during the engagement?",
      answer: "All data accessed during the engagement is handled according to strict confidentiality agreements. Screenshots and evidence are collected only as necessary for reporting, all access is documented and revoked at engagement completion, and any extracted data is securely destroyed according to your data retention policies."
    },
    {
      question: "How do you measure the success of a Red Team engagement?",
      answer: "Success is measured against predefined objectives including time to detection, response effectiveness, business impact simulation, and security control bypass rates. We provide detailed metrics on detection capabilities, response times, and overall security maturity improvements."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-red-900/20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Target className="w-8 h-8 text-red-400" />
                <span className="text-red-400 font-semibold text-lg">Red Team Operations</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Simulate Real-World 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"> Adversaries</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Advanced persistent threat simulation designed for enterprise organizations. 
                Test your security posture against sophisticated, multi-vector attacks that mirror 
                real-world threat actors targeting companies like yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                >
                  Start Your Assessment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('methodology')}
                  className="border border-gray-600 hover:border-red-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  View Methodology
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Engagement Overview</h3>
                  <Shield className="w-6 h-6 text-red-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">8-16 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Scope</span>
                    <span className="text-white font-semibold">Multi-vector</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Stealth Level</span>
                    <span className="text-white font-semibold">Advanced</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Reporting</span>
                    <span className="text-white font-semibold">Executive + Technical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Red Team Section */}
      <section id="why-red-team" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Red Team Operations?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional security testing only scratches the surface. Red Team operations provide 
              comprehensive evaluation of your security posture against sophisticated threats.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300">
              <AlertTriangle className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Real-World Threat Simulation</h3>
              <p className="text-gray-300 leading-relaxed">
                Simulate actual attack campaigns used by advanced persistent threats (APTs) and 
                cybercriminal organizations targeting enterprises in your industry.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300">
              <Eye className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Detection & Response Testing</h3>
              <p className="text-gray-300 leading-relaxed">
                Evaluate your security team's ability to detect, analyze, and respond to 
                sophisticated attacks across your entire technology stack.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300">
              <Users className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Holistic Security Assessment</h3>
              <p className="text-gray-300 leading-relaxed">
                Test not just technology, but people and processes. Evaluate social engineering 
                susceptibility, physical security, and security awareness effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Methodology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Based on industry-leading frameworks and refined through hundreds of engagements 
              with Fortune 500 companies.
            </p>
          </div>

          {/* Framework Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {methodologies.map((methodology, index) => {
              const IconComponent = methodology.icon;
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
                  <IconComponent className={`w-8 h-8 ${methodology.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-white mb-2">{methodology.name}</h3>
                  <p className="text-sm text-gray-400">{methodology.description}</p>
                </div>
              );
            })}
          </div>

          {/* Engagement Phases */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Engagement Phases</h3>
            {phases.map((phase, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{phase.phase}</h4>
                      <p className="text-gray-400">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-red-400">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">{phase.duration}</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {phase.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Techniques */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Tools & Techniques</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade tools and custom techniques used by real threat actors.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {tools.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <IconComponent className="w-6 h-6 text-red-400" />
                    <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-300">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Legal & Compliance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Legal Framework & Compliance</h2>
              <p className="text-xl text-gray-300 mb-8">
                All Red Team operations are conducted within strict legal boundaries with 
                comprehensive protections for your organization.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FileText className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Rules of Engagement (ROE)</h3>
                    <p className="text-gray-300">Detailed documentation defining scope, boundaries, and authorized activities.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Professional Liability Insurance</h3>
                    <p className="text-gray-300">Comprehensive coverage protecting both parties during engagement activities.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Lock className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Data Protection Compliance</h3>
                    <p className="text-gray-300">GDPR, HIPAA, SOX, and other regulatory compliance maintained throughout.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Compliance Standards</h3>
              <div className="grid grid-cols-2 gap-4">
                {['ISO 27001', 'NIST CSF', 'SOC 2', 'PCI DSS', 'GDPR', 'HIPAA', 'SOX', 'FISMA'].map((standard, index) => (
                  <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                    <span className="text-white font-semibold">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Common questions from enterprise security leaders.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {expandedFAQ === index ? 
                    <ChevronUp className="w-5 h-5 text-red-400 flex-shrink-0" /> : 
                    <ChevronDown className="w-5 h-5 text-red-400 flex-shrink-0" />
                  }
                </button>
                {expandedFAQ === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-red-900/20 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Target className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Test Your Defenses?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join industry leaders who trust 0xi6r for advanced security testing. 
            Let's discuss how Red Team operations can strengthen your security posture.
          </p>
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-6">Schedule Your Consultation</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-gray-300">0xi6r@tutamail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <p className="text-white font-semibold">Response Time</p>
                  <p className="text-gray-300">Within 24 hours</p>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group">
              <Mail className="w-5 h-5 mr-2" />
              Contact for Enterprise Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RedTeamServices;
