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
      answer: "Red Team operations simulate real-world adversaries with longer engagement periods (months vs days), broader scope including physical and social engineering, and focus on business impac[...]"
    },
    {
      question: "What legal protections are in place during Red Team engagements?",
      answer: "All Red Team activities are conducted under comprehensive legal frameworks including detailed Rules of Engagement (ROE), signed authorization letters, liability insurance, and complianc[...]"
    },
    {
      question: "How do you ensure business operations aren't disrupted?",
      answer: "We implement strict safeguards including 24/7 communication channels, predefined escalation procedures, business-hours-only testing for critical systems, and immediate rollback capabili[...]"
    },
    {
      question: "What happens to the data and access gained during the engagement?",
      answer: "All data accessed during the engagement is handled according to strict confidentiality agreements. Screenshots and evidence are collected only as necessary for reporting, all access is [...]"
    },
    {
      question: "How do you measure the success of a Red Team engagement?",
      answer: "Success is measured against predefined objectives including time to detection, response effectiveness, business impact simulation, and security control bypass rates. We provide detailed[...]"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      {/* ...rest of file unchanged... */}

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
          <div className="flex justify-center mb-16">
            {methodologies.map((methodology, index) => {
              const IconComponent = methodology.icon;
              // FIX: Centered MITRE card for single methodology
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 w-full max-w-xs mx-auto text-center">
                  <IconComponent className={`w-8 h-8 ${methodology.color} mb-4 mx-auto`} />
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

      {/* ...rest of file unchanged... */}
    </div>
  );
};

export default RedTeamServices;