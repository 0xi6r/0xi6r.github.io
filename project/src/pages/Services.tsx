import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Search, 
  Bug, 
  Code, 
  Skull, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  Mail,
  ExternalLink
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDescription: string;
  detailedDescription: string;
  keyPoints: string[];
  deliverables?: string[];
  technologies?: string[];
}

const ServicesPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'penetration-testing',
      title: 'Penetration Testing',
      icon: <Shield className="w-6 h-6" />,
      shortDescription: 'Comprehensive security assessments to identify vulnerabilities before attackers do.',
      detailedDescription: 'Full-spectrum penetration testing services that simulate real-world attacks to identify security weaknesses in your infrastructure, applications, and human factors. I employ both automated and manual testing techniques to go beyond surface-level vulnerabilities.',
      keyPoints: [
        'Web Application Penetration Testing',
        'Network Infrastructure Testing',
        'Mobile Application Security',
        'Cloud Security Assessments',
        'Social Engineering & Phishing Simulations',
        'Physical Security Assessments'
      ],
      deliverables: [
        'Detailed Technical Report',
        'Risk Prioritization Matrix',
        'Remediation Guidance',
        'Executive Summary',
        'Proof of Concept Exploits'
      ],
      technologies: ['Burp Suite', 'Metasploit', 'Nmap', 'OWASP ZAP', 'Custom Exploits']
    },
    {
      id: 'adversary-simulation',
      title: 'Adversary Simulation',
      icon: <Target className="w-6 h-6" />,
      shortDescription: 'Realistic attack simulations mimicking advanced threat actors.',
      detailedDescription: 'Adversary simulation exercises that replicate the tactics, techniques, and procedures (TTPs) of real-world threat actors. These engagements test your detection and response capabilities against sophisticated attacks.',
      keyPoints: [
        'Purple Team Exercises',
        'Red Team Operations',
        'APT Simulation',
        'Ransomware Attack Simulations',
        'Lateral Movement Testing',
        'Persistence Mechanism Testing'
      ],
      deliverables: [
        'Attack Timeline Reconstruction',
        'Detection Gap Analysis',
        'MITRE ATT&CK Mapping',
        'Defensive Improvement Recommendations',
        'Incident Response Playbooks'
      ],
      technologies: ['Cobalt Strike', 'Empire', 'Caldera', 'Atomic Red Team', 'Custom TTPs']
    },
    {
      id: 'vulnerability-research',
      title: 'Vulnerability Research',
      icon: <Search className="w-6 h-6" />,
      shortDescription: 'Discovering and analyzing unknown security vulnerabilities in software and hardware.',
      detailedDescription: 'Proactive vulnerability research focusing on identifying zero-day vulnerabilities in widely used software, operating systems, and hardware components. Responsible disclosure process followed with vendor coordination.',
      keyPoints: [
        'Zero-Day Discovery',
        'Fuzzing & Reverse Engineering',
        'Binary Analysis',
        'Patch Analysis',
        'Exploitability Assessment',
        'CVSS Scoring & Analysis'
      ],
      deliverables: [
        'Technical Vulnerability Report',
        'Proof of Concept Exploit',
        'Patch Analysis Report',
        'Advisory Documentation',
        'Remediation Recommendations'
      ],
      technologies: ['Ghidra', 'IDA Pro', 'WinDbg', 'AFL', 'libFuzzer', 'Custom Fuzzers']
    },
    {
      id: 'malware-analysis',
      title: 'Malware Analysis',
      icon: <Bug className="w-6 h-6" />,
      shortDescription: 'Deep-dive analysis of malicious software to understand capabilities and impact.',
      detailedDescription: 'Static and dynamic analysis of malware samples to understand their functionality, communication patterns, persistence mechanisms, and potential impact on victim systems.',
      keyPoints: [
        'Static Analysis (Disassembly, Decompilation)',
        'Dynamic Analysis (Sandbox Execution)',
        'Behavioral Analysis',
        'Code Deobfuscation',
        'Indicators of Compromise Extraction',
        'Threat Actor Attribution'
      ],
      deliverables: [
        'Malware Analysis Report',
        'YARA Rules',
        'Network Signatures (Snort/Suricata)',
        'Indicators of Compromise (IOCs)',
        'Detection Logic (Sigma Rules)',
        'Removal Instructions'
      ],
      technologies: ['Cuckoo Sandbox', 'VMware/VirtualBox', 'PEiD', 'Strings', 'Wireshark', 'Volatility']
    },
    {
      id: 'malware-development',
      title: 'Malware Development',
      icon: <Skull className="w-6 h-6" />,
      shortDescription: 'Developing custom malware for authorized security testing and research purposes.',
      detailedDescription: 'Development of custom malware implants, backdoors, and persistence mechanisms strictly for authorized security assessments, red team operations, and defensive research.',
      keyPoints: [
        'Custom RAT Development',
        'Persistence Mechanism Research',
        'Command & Control Infrastructure',
        'Encrypted Communication Channels',
        'Process Injection Techniques',
        'Memory-Resident Malware'
      ],
      deliverables: [
        'Custom Malware Implants',
        'Source Code (if authorized)',
        'Technical Documentation',
        'Detection Evasion Report',
        'Countermeasure Recommendations'
      ],
      technologies: ['C/C++', 'C#/.NET', 'Python', 'Go', 'Assembly', 'WinAPI']
    },
    {
      id: 'av-edr-evasion',
      title: 'AV/EDR Evasion',
      icon: <Zap className="w-6 h-6" />,
      shortDescription: 'Bypassing modern security controls for authorized testing.',
      detailedDescription: 'Research and development of techniques to evade modern antivirus and endpoint detection and response solutions. This includes studying detection mechanisms and developing bypass techniques for authorized security assessments.',
      keyPoints: [
        'Signature Evasion',
        'Behavioral Bypass',
        'AMSI/ETW Bypass',
        'Process Hollowing',
        'Direct Syscalls',
        'Memory Encryption'
      ],
      deliverables: [
        'Evasion Technique Documentation',
        'Custom Loaders/Stagers',
        'Detection Bypass Report',
        'Defensive Recommendations',
        'Detection Improvement Suggestions'
      ],
      technologies: ['Windows Internals', 'Sysmon', 'Carbon Black', 'CrowdStrike', 'Microsoft Defender']
    },
    {
      id: 'offensive-tool-development',
      title: 'Offensive Tool Development',
      icon: <Code className="w-6 h-6" />,
      shortDescription: 'Creating custom tools for penetration testing and security assessments.',
      detailedDescription: 'Development of custom offensive security tools, frameworks, and utilities tailored for specific engagement requirements or to address gaps in existing tooling.',
      keyPoints: [
        'Custom Exploit Development',
        'Post-Exploitation Frameworks',
        'Network Reconnaissance Tools',
        'Credential Harvesting Utilities',
        'Lateral Movement Automation',
        'Data Exfiltration Tools'
      ],
      deliverables: [
        'Custom Tool Source Code',
        'Installation & Usage Documentation',
        'Technical Specifications',
        'Testing Results',
        'Integration Guides'
      ],
      technologies: ['Python', 'PowerShell', 'Bash', 'Go', 'Rust', 'Docker']
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Offensive Security <span className="text-cyan-400">Expertise</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Comprehensive offensive security services designed to identify, exploit, and help remediate vulnerabilities. Each service is tailored to meet specific security testing requirements.
          </p>
          <div className="inline-flex items-center space-x-2 text-cyan-400 font-medium">
            <Mail className="w-5 h-5" />
            <Link 
              to="/contact" 
              className="hover:text-cyan-300 transition-colors"
            >
              Contact for Inquiries & Engagement
            </Link>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-6 mb-20">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`bg-black border rounded-xl overflow-hidden transition-all duration-300 ${
                expandedId === service.id 
                  ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Service Header - Always Visible */}
              <button
                onClick={() => toggleExpand(service.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    expandedId === service.id ? 'bg-cyan-500/20' : 'bg-gray-800'
                  }`}>
                    <div className={`${
                      expandedId === service.id ? 'text-cyan-400' : 'text-gray-300'
                    }`}>
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-400">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedId === service.id ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expandable Content */}
              {expandedId === service.id && (
                <div className="p-6 pt-0 border-t border-gray-800">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Description & Key Points */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Detailed Overview</h4>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.detailedDescription}
                      </p>
                      
                      <div className="mb-6">
                        <h5 className="text-md font-semibold text-white mb-3">Key Focus Areas:</h5>
                        <ul className="space-y-2">
                          {service.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-300">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Deliverables & Technologies */}
                    <div className="space-y-6">
                      {service.deliverables && (
                        <div>
                          <h5 className="text-md font-semibold text-white mb-3">Typical Deliverables:</h5>
                          <ul className="space-y-2">
                            {service.deliverables.map((item, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.technologies && (
                        <div>
                          <h5 className="text-md font-semibold text-white mb-3">Technologies & Tools:</h5>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer with CTA */}
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-gray-400 text-sm">
                        Interested in this service? Contact for a custom engagement proposal.
                      </p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Discuss This Service
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Strengthen Your Security?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you need a one-time assessment or ongoing security testing, I provide tailored solutions to meet your organization's unique security challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors inline-flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Schedule a Consultation
            </Link>
            <a
              href="https://github.com/yourusername" // Replace with your GitHub
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View My Research & Tools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
