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
  Mail
} from 'lucide-react';

const RedTeamServices = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
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
    }
  ];

  const tools = [
    { category: "Reconnaissance", tools: ["Nmap", "Masscan", "Recon-ng", "theHarvester", "Shodan"], icon: Eye },
    { category: "Exploitation", tools: ["Metasploit", "Cobalt Strike", "Empire", "BloodHound", "Impacket"], icon: Zap },
    { category: "Post-Exploitation", tools: ["Mimikatz", "PowerShell Empire", "Covenant", "Sliver", "PoshC2"], icon: Lock },
    { category: "Social Engineering", tools: ["SET", "Gophish", "King Phisher", "Evilginx2", "Modlishka"], icon: Users },
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
        "Network service exploitation"
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
      answer: "Red Team operations simulate real-world adversaries with longer engagement periods (months vs days), broader scope including physical and social engineering, and focus on business impact and detection/response testing.",
    },
    {
      question: "What legal protections are in place during Red Team engagements?",
      answer: "All Red Team activities are conducted under comprehensive legal frameworks including detailed Rules of Engagement (ROE), signed authorization letters, liability insurance, and compliance with applicable laws.",
    },
    {
      question: "How do you ensure business operations aren't disrupted?",
      answer: "We implement strict safeguards including 24/7 communication channels, predefined escalation procedures, business-hours-only testing for critical systems, and immediate rollback capabilities.",
    },
    {
      question: "What happens to the data and access gained during the engagement?",
      answer: "All data accessed during the engagement is handled according to strict confidentiality agreements. Screenshots and evidence are collected only as necessary for reporting, all access is removed after engagement.",
    },
    {
      question: "How do you measure the success of a Red Team engagement?",
      answer: "Success is measured against predefined objectives including time to detection, response effectiveness, business impact simulation, and security control bypass rates. We provide detailed reports and recommendations.",
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
            <h2 className="text-4xl font-bold text-white mb-6">Methodology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Based on industry-leading frameworks and refined through multiple engagements.
            </p>
          </div>
          {/* Framework Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {methodologies.map((methodology, index) => {
              const IconComponent = methodology.icon;
              // FIX: JSX string interpolation and className syntax
              return (
