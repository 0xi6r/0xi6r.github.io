import React, { useState, useEffect } from 'react';
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
  Phone,
  TrendingUp,
  Award,
  Building,
  Layers,
  Settings,
  BookOpen,
  Lightbulb,
  BarChart3,
  Network,
  Gavel,
  UserCheck,
  MapPin,
  Search,
  Bug,
  Activity,
  DollarSign,
  Timer,
  Star,
  ArrowDown,
  ExternalLink,
  Download,
  Calendar,
  Briefcase
} from 'lucide-react';

const PenetrationTesting = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const businessNeeds = [
    {
      icon: DollarSign,
      title: "Regulatory Compliance",
      subtitle: "Meet industry standards and avoid penalties",
      description: "PCI DSS, HIPAA, SOX, and other regulations mandate regular security testing. Penetration testing demonstrates due diligence and helps avoid costly compliance violations.",
      stats: "Up to $4.35M average cost of data breach",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Cyber Insurance Requirements",
      subtitle: "Satisfy insurance policy conditions",
      description: "Many cyber insurance policies require annual penetration testing. Demonstrate proactive security measures to maintain coverage and potentially reduce premiums.",
      stats: "73% of insurers require security assessments",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: TrendingUp,
      title: "Business Risk Management",
      subtitle: "Protect revenue and reputation",
      description: "Identify vulnerabilities before attackers do. Prevent business disruption, data loss, and reputational damage that can impact customer trust and market position.",
      stats: "60% of small businesses close within 6 months of a cyber attack",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Building,
      title: "Vendor & Partner Requirements",
      subtitle: "Meet third-party security expectations",
      description: "Enterprise clients and partners increasingly require security testing evidence. Penetration testing reports demonstrate security maturity to stakeholders.",
      stats: "95% of Fortune 500 companies require vendor security assessments",
      color: "from-orange-500 to-red-600"
    }
  ];

  const testingTypes = [
    {
      icon: Globe,
      title: "Web Application Testing",
      description: "Comprehensive testing of web applications, APIs, and web services",
      features: ["OWASP Top 10", "Business logic flaws", "Authentication bypass", "SQL injection", "XSS vulnerabilities"],
      price: "Starting at $8,000",
      duration: "2-3 weeks",
      popular: true
    },
    {
      icon: Network,
      title: "Network Penetration Testing",
      description: "Internal and external network infrastructure assessment",
      features: ["Network segmentation", "Privilege escalation", "Lateral movement", "Service exploitation", "Firewall bypass"],
      price: "Starting at $12,000",
      duration: "3-4 weeks",
      popular: false
    },
    {
      icon: Smartphone,
      title: "Mobile Application Testing",
      description: "iOS and Android application security assessment",
      features: ["Static/Dynamic analysis", "Runtime manipulation", "Data storage security", "Communication security", "Platform-specific issues"],
      price: "Starting at $10,000",
      duration: "2-3 weeks",
      popular: false
    },
    {
      icon: Shield,
      title: "Cloud Security Testing",
      description: "AWS, Azure, GCP cloud infrastructure assessment",
      features: ["IAM misconfigurations", "Storage bucket security", "Container security", "Serverless security", "Multi-cloud environments"],
      price: "Starting at $15,000",
      duration: "3-5 weeks",
      popular: false
    },
    {
      icon: Wifi,
      title: "Wireless Security Testing",
      description: "WiFi, Bluetooth, and wireless protocol assessment",
      features: ["WPA/WPA2/WPA3 testing", "Rogue access points", "Client attacks", "Bluetooth security", "IoT device testing"],
      price: "Starting at $6,000",
      duration: "1-2 weeks",
      popular: false
    },
    {
      icon: Users,
      title: "Social Engineering Testing",
      description: "Human factor security assessment and awareness testing",
      features: ["Phishing campaigns", "Vishing attacks", "Physical security", "USB drops", "Pretexting scenarios"],
      price: "Starting at $8,000",
      duration: "2-4 weeks",
      popular: false
    }
  ];

  const methodology = [
    {
      phase: "Planning & Reconnaissance",
      duration: "3-5 days",
      description: "Information gathering and attack surface mapping",
      activities: [
        "Scope definition and rules of engagement",
        "OSINT gathering and target profiling",
        "Network and service enumeration",
        "Vulnerability identification and prioritization"
      ],
      tools: ["Nmap", "Masscan", "theHarvester", "Shodan", "Recon-ng"]
    },
    {
      phase: "Vulnerability Assessment",
      duration: "5-7 days",
      description: "Systematic identification of security weaknesses",
      activities: [
        "Automated vulnerability scanning",
        "Manual testing and validation",
        "False positive elimination",
        "Risk assessment and prioritization"
      ],
      tools: ["Nessus", "OpenVAS", "Burp Suite", "OWASP ZAP", "Nuclei"]
    },
    {
      phase: "Exploitation",
      duration: "7-10 days",
      description: "Controlled exploitation of identified vulnerabilities",
      activities: [
        "Proof-of-concept development",
        "Privilege escalation attempts",
        "Lateral movement simulation",
        "Impact demonstration"
      ],
      tools: ["Metasploit", "SQLmap", "Hashcat", "Impacket", "Custom scripts"]
    },
    {
      phase: "Reporting & Remediation",
      duration: "3-5 days",
      description: "Comprehensive documentation and guidance",
      activities: [
        "Executive summary preparation",
        "Technical findings documentation",
        "Remediation recommendations",
        "Risk rating and business impact"
      ],
      tools: ["Custom reporting", "CVSS scoring", "Remediation guides", "Presentation materials"]
    }
  ];

  const testimonials = [
    {
      quote: "The penetration test revealed critical vulnerabilities we never knew existed. Their detailed remediation guidance helped us fix issues before they became incidents.",
      author: "David Thompson",
      title: "IT Security Manager",
      company: "FinTech Startup",
      rating: 5
    },
    {
      quote: "Professional, thorough, and delivered exactly what we needed for our compliance requirements. The report was clear and actionable.",
      author: "Maria Santos",
      title: "Compliance Officer",
      company: "Healthcare Provider",
      rating: 5
    },
    {
      quote: "Best penetration testing experience we've had. They found issues our previous vendors missed and provided excellent post-engagement support.",
      author: "James Wilson",
      title: "CISO",
      company: "Manufacturing Company",
      rating: 5
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section - Bright, Modern Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Bug className="w-4 h-4" />
              <span>Professional Penetration Testing</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
              <span className="text-gray-900">Find Vulnerabilities</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Before Attackers Do
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Comprehensive penetration testing services that identify security weaknesses, 
              demonstrate real-world attack scenarios, and provide actionable remediation guidance 
              to strengthen your security posture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button 
                onClick={() => scrollToSection('pricing')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('methodology')}
                className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-200 hover:border-purple-300"
              >
                <span className="flex items-center justify-center">
                  View Methodology
                  <Eye className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "500+", label: "Tests Completed", icon: CheckCircle },
                { number: "99.9%", label: "Client Satisfaction", icon: Star },
                { number: "24h", label: "Report Delivery", icon: Timer },
                { number: "100%", label: "Compliance Ready", icon: Shield }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
                    <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Business Need Section - Card-based Layout */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why Your Business Needs 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Penetration Testing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond compliance requirements, penetration testing is essential for modern business resilience, 
              risk management, and maintaining competitive advantage in today's threat landscape.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {businessNeeds.map((need, index) => {
              const IconComponent = need.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${need.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${need.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{need.title}</h3>
                    <p className="text-lg font-semibold text-gray-600 mb-4">{need.subtitle}</p>
                    <p className="text-gray-700 mb-6 leading-relaxed">{need.description}</p>
                    
                    {/* Stats */}
                    <div className={`inline-block bg-gradient-to-r ${need.color} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                      {need.stats}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testing Types Section - Pricing Card Style */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Testing 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of specialized penetration testing services, 
              each tailored to address specific security concerns and compliance requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testingTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div 
                  key={index} 
                  className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${
                    type.popular ? 'border-purple-300 ring-4 ring-purple-100' : 'border-gray-200'
                  }`}
                >
                  {/* Popular Badge */}
                  {type.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">{type.price}</div>
                        <div className="text-gray-500 text-sm">Duration: {type.duration}</div>
                      </div>
                      <Calendar className="w-6 h-6 text-gray-400" />
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      Get Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section - Interactive Timeline */}
      <section id="methodology" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our Proven 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Methodology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach based on industry standards like PTES, OWASP, and NIST, 
              refined through hundreds of successful engagements.
            </p>
          </div>

          {/* Interactive Phase Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {methodology.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activePhase === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                Phase {index + 1}
              </button>
            ))}
          </div>

          {/* Active Phase Details */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {activePhase + 1}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{methodology[activePhase].phase}</h3>
                    <p className="text-gray-600 font-semibold">{methodology[activePhase].duration}</p>
                  </div>
                </div>
                
                <p className="text-xl text-gray-700 mb-8">{methodology[activePhase].description}</p>
                
                <h4 className="text-xl font-bold text-gray-900 mb-4">Key Activities</h4>
                <div className="space-y-3">
                  {methodology[activePhase].activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Tools & Technologies</h4>
                <div className="grid grid-cols-2 gap-4">
                  {methodology[activePhase].tools.map((tool, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <Settings className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-900">{tool}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Progress Indicator */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Phase Progress</span>
                    <span>{Math.round(((activePhase + 1) / methodology.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((activePhase + 1) / methodology.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern Card Design */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Client 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600"> Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by businesses across industries to secure their digital assets.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
                {/* Star Rating */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-blue-600 font-semibold">{testimonial.title}</div>
                  <div className="text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold, Action-Oriented */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <Bug className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Secure Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't wait for a security incident to discover your vulnerabilities. 
              Get a comprehensive penetration test today and protect what matters most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-xl">
                <span className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Get Free Quote
                </span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Call
                </span>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl font-bold text-white">24-48h</div>
                <div className="text-white/80 text-sm">Quick Start</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-white/80 text-sm">Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-white/80 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PenetrationTesting;