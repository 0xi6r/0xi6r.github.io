import React, { useState } from 'react';
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
  ChevronDown, 
  ChevronUp,
  Network,
  Server,
  Smartphone,
  Wifi,
  Database,
  Code,
  Mail,
  Phone,
  Search,
  Bug,
  Key,
  Globe
} from 'lucide-react';

const PenetrationTestingServices = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const methodologies = [
    {
      name: "OWASP Testing Guide",
      description: "Comprehensive web application security testing methodology",
      icon: Shield,
      color: "text-blue-400"
    },
    {
      name: "PTES Framework",
      description: "Penetration Testing Execution Standard for systematic testing",
      icon: Target,
      color: "text-blue-400"
    },
    {
      name: "NIST SP 800-115",
      description: "Technical guide to information security testing",
      icon: FileText,
      color: "text-blue-400"
    }
  ];

  const tools = [
    { category: "Reconnaissance", tools: ["Nmap", "Burp Suite", "OWASP ZAP", "Sublist3r", "Amass"], icon: Search },
    { category: "Vulnerability Analysis", tools: ["Nessus", "Nexpose", "OpenVAS", "Nikto", "SQLMap"], icon: Bug },
    { category: "Exploitation", tools: ["Metasploit", "Burp Suite", "SQLMap", "John the Ripper", "Hashcat"], icon: Zap },
    { category: "Web Application", tools: ["Burp Suite Pro", "OWASP ZAP", "Acunetix", "Netsparker", "Wfuzz"], icon: Globe },
    { category: "Network Security", tools: ["Wireshark", "Aircrack-ng", "Responder", "Impacket", "CrackMapExec"], icon: Network },
    { category: "Reporting", tools: ["Dradis", "Serpico", "PlexTrac", "Faraday", "Custom Templates"], icon: FileText }
  ];

  const phases = [
    {
      phase: "1. Pre-engagement & Planning",
      duration: "3-5 days",
      description: "Scope definition and rules of engagement",
      activities: [
        "Scope finalization and objectives",
        "Rules of Engagement documentation",
        "Communication protocols establishment",
        "Legal authorization and agreements"
      ]
    },
    {
      phase: "2. Intelligence Gathering",
      duration: "2-4 days",
      description: "Comprehensive reconnaissance and information gathering",
      activities: [
        "Passive and active reconnaissance",
        "Attack surface mapping",
        "Service enumeration",
        "Technology stack identification"
      ]
    },
    {
      phase: "3. Vulnerability Analysis",
      duration: "3-7 days",
      description: "Systematic vulnerability identification and validation",
      activities: [
        "Automated vulnerability scanning",
        "Manual vulnerability verification",
        "False positive elimination",
        "Risk assessment and prioritization"
      ]
    },
    {
      phase: "4. Exploitation & Validation",
      duration: "5-10 days",
      description: "Controlled exploitation to validate security issues",
      activities: [
        "Privilege escalation testing",
        "Lateral movement simulation",
        "Business impact validation",
        "Proof-of-concept development"
      ]
    },
    {
      phase: "5. Post-Exploitation Analysis",
      duration: "2-4 days",
      description: "Impact assessment and data collection",
      activities: [
        "Data access verification",
        "Security control effectiveness",
        "Persistence mechanisms testing",
        "Cleanup and access removal"
      ]
    },
    {
      phase: "6. Reporting & Remediation",
      duration: "5-7 days",
      description: "Comprehensive reporting and remediation guidance",
      activities: [
        "Technical findings documentation",
        "Executive summary preparation",
        "Remediation roadmap creation",
        "Stakeholder presentation and walkthrough"
      ]
    }
  ];

  const testingTypes = [
    {
      type: "Web Application Testing",
      icon: Globe,
      description: "Comprehensive security assessment of web applications and APIs",
      focus: ["OWASP Top 10 vulnerabilities", "Business logic flaws", "Authentication bypass", "API security"]
    },
    {
      type: "Network Penetration Testing",
      icon: Network,
      description: "Internal and external network infrastructure security assessment",
      focus: ["Network segmentation", "Service hardening", "Lateral movement", "Privilege escalation"]
    },
    {
      type: "Mobile Application Testing",
      icon: Smartphone,
      description: "iOS and Android application security assessment",
      focus: ["Data storage security", "Communication security", "Reverse engineering", "Platform-specific vulnerabilities"]
    },
    {
      type: "Cloud Security Assessment",
      icon: Server,
      description: "AWS, Azure, and GCP infrastructure security testing",
      focus: ["IAM misconfigurations", "Storage security", "Network security groups", "Cloud-specific services"]
    },
    {
      type: "Wireless Security Testing",
      icon: Wifi,
      description: "Wireless network infrastructure security assessment",
      focus: ["WPA2/WPA3 security", "Rogue access points", "Wireless client security", "Protocol vulnerabilities"]
    },
    {
      type: "Social Engineering",
      icon: Users,
      description: "Phishing and physical security awareness testing",
      focus: ["Phishing campaigns", "Physical access testing", "Vishing simulations", "Security awareness effectiveness"]
    }
  ];

  const faqs = [
    {
      question: "What's the difference between vulnerability scanning and penetration testing?",
      answer: "Vulnerability scanning uses automated tools to identify known vulnerabilities, while penetration testing involves manual testing by security experts to validate vulnerabilities, exploit them safely, and assess business impact. Penetration testing provides context and prioritization that scanners cannot."
    },
    {
      question: "How long does a typical penetration test take?",
      answer: "Engagement duration varies based on scope: Web applications (2-3 weeks), network infrastructure (3-4 weeks), comprehensive assessments (4-6 weeks). We provide detailed timelines during scoping based on your environment complexity and testing objectives."
    },
    {
      question: "Do you perform tests during business hours to minimize disruption?",
      answer: "Yes, we coordinate testing schedules with your team and typically conduct assessments during maintenance windows or off-peak hours. For certain tests like social engineering, we may need to operate during business hours to simulate real-world conditions."
    },
    {
      question: "What happens if you find critical vulnerabilities during testing?",
      answer: "We follow a responsible disclosure process: immediate notification of critical findings, followed by detailed reporting. We work with your team to ensure urgent issues are addressed promptly while continuing with the planned testing activities."
    },
    {
      question: "Do you provide remediation support after the test?",
      answer: "Absolutely. Our deliverables include detailed remediation guidance, developer-friendly explanations, and retesting services. We offer consultation calls with your development team to ensure understanding and proper implementation of fixes."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900/20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-blue-400 font-semibold text-lg">Penetration Testing</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Identify & Fix
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> Security Vulnerabilities</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive security assessments to identify vulnerabilities before attackers do. 
                Our penetration testing services help you strengthen your security posture systematically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                >
                  Start Your Assessment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('methodology')}
                  className="border border-gray-600 hover:border-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  View Methodology
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Assessment Overview</h3>
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">2-6 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Testing Depth</span>
                    <span className="text-white font-semibold">Comprehensive</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Reporting</span>
                    <span className="text-white font-semibold">Technical + Executive</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Remediation Support</span>
                    <span className="text-white font-semibold">Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Penetration Testing Section */}
      <section id="why-penetration-testing" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Penetration Testing?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Proactive security testing helps identify and fix vulnerabilities before they can be 
              exploited by malicious actors, saving costs and protecting your reputation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <Bug className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Vulnerability Identification</h3>
              <p className="text-gray-300 leading-relaxed">
                Discover security weaknesses that automated scanners miss through manual testing 
                and expert analysis of your applications and infrastructure.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <Shield className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Risk Prioritization</h3>
              <p className="text-gray-300 leading-relaxed">
                Get clear guidance on which vulnerabilities pose the greatest risk to your business 
                and should be addressed first based on exploitability and impact.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <CheckCircle className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Compliance Requirements</h3>
              <p className="text-gray-300 leading-relaxed">
                Meet regulatory requirements for PCI DSS, HIPAA, SOC 2, ISO 27001, and other 
                compliance frameworks that mandate regular security testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Testing Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive penetration testing services tailored to your specific technology stack 
              and security requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testingTypes.map((test, index) => {
              const IconComponent = test.icon;
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
                  <IconComponent className="w-12 h-12 text-blue-400 mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4">{test.type}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{test.description}</p>
                  <div className="space-y-2">
                    {test.focus.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Testing Methodology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Structured approach based on industry standards to ensure comprehensive coverage 
              and consistent results.
            </p>
          </div>

          {/* Framework Cards */}
          <div className="flex justify-center gap-8 mb-16 flex-wrap">
            {methodologies.map((methodology, index) => {
              const IconComponent = methodology.icon;
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 w-full max-w-xs text-center">
                  <IconComponent className={`w-8 h-8 ${methodology.color} mb-4 mx-auto`} />
                  <h3 className="text-lg font-semibold text-white mb-2">{methodology.name}</h3>
                  <p className="text-sm text-gray-400">{methodology.description}</p>
                </div>
              );
            })}
          </div>

          {/* Testing Phases */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Testing Phases</h3>
            {phases.map((phase, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{phase.phase}</h4>
                      <p className="text-gray-400">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-400">
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Tools & Technologies</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-standard tools combined with custom scripts and manual testing expertise.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {tools.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
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

      {/* Compliance & Standards */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Compliance & Standards</h2>
              <p className="text-xl text-gray-300 mb-8">
                Our testing methodologies align with industry standards and compliance requirements 
                to help you meet regulatory obligations.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FileText className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Industry Compliance</h3>
                    <p className="text-gray-300">Testing aligned with PCI DSS, HIPAA, SOC 2, ISO 27001, and other frameworks.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Quality Assurance</h3>
                    <p className="text-gray-300">All findings undergo peer review and validation to ensure accuracy.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Lock className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Confidentiality</h3>
                    <p className="text-gray-300">Strict NDAs and secure handling of all client data and findings.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Supported Standards</h3>
              <div className="grid grid-cols-2 gap-4">
                {['OWASP Top 10', 'PTES', 'NIST SP 800-115', 'OSSTMM', 'PCI DSS', 'HIPAA', 'ISO 27001', 'SOC 2'].map((standard, index) => (
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
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
                    <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" /> : 
                    <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
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
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-900/20 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Systems?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your security testing needs and create a customized assessment plan.
          </p>
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-6">Schedule Your Assessment</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-gray-300">0xi6r@tutamail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-semibold">Response Time</p>
                  <p className="text-gray-300">Within 24 hours</p>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group">
              <Mail className="w-5 h-5 mr-2" />
              Contact for Assessment
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PenetrationTestingServices;
