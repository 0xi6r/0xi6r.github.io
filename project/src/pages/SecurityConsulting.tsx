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
  MapPin
} from 'lucide-react';

const SecurityConsulting = () => {
  const [activeService, setActiveService] = useState('strategy');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const services = {
    strategy: {
      title: "Security Strategy & Governance",
      icon: Target,
      description: "Comprehensive security strategy development aligned with business objectives",
      features: [
        "Security program maturity assessment",
        "Risk management framework development",
        "Governance structure design",
        "Security metrics and KPI definition",
        "Budget planning and resource allocation",
        "Board-level security reporting"
      ],
      deliverables: [
        "Security Strategy Roadmap",
        "Risk Assessment Report",
        "Governance Framework",
        "Metrics Dashboard"
      ]
    },
    architecture: {
      title: "Security Architecture & Design",
      icon: Layers,
      description: "Enterprise security architecture design and optimization",
      features: [
        "Zero Trust architecture implementation",
        "Cloud security architecture design",
        "Network segmentation strategy",
        "Identity and access management design",
        "Security tool integration planning",
        "Secure development lifecycle integration"
      ],
      deliverables: [
        "Architecture Blueprint",
        "Implementation Roadmap",
        "Technology Stack Recommendations",
        "Integration Guidelines"
      ]
    },
    compliance: {
      title: "Compliance & Risk Management",
      icon: Gavel,
      description: "Regulatory compliance and enterprise risk management",
      features: [
        "Compliance gap analysis",
        "Regulatory framework mapping",
        "Risk assessment and quantification",
        "Policy and procedure development",
        "Audit preparation and support",
        "Continuous compliance monitoring"
      ],
      deliverables: [
        "Compliance Assessment",
        "Risk Register",
        "Policy Documentation",
        "Audit Readiness Plan"
      ]
    },
    incident: {
      title: "Incident Response & Crisis Management",
      icon: AlertTriangle,
      description: "Incident response planning and crisis management capabilities",
      features: [
        "Incident response plan development",
        "Crisis communication strategies",
        "Forensic investigation procedures",
        "Business continuity planning",
        "Tabletop exercise facilitation",
        "Post-incident improvement programs"
      ],
      deliverables: [
        "Incident Response Playbook",
        "Crisis Communication Plan",
        "Recovery Procedures",
        "Exercise Reports"
      ]
    },
    training: {
      title: "Security Awareness & Training",
      icon: Users,
      description: "Comprehensive security awareness and training programs",
      features: [
        "Security awareness program design",
        "Role-based training development",
        "Phishing simulation campaigns",
        "Executive security briefings",
        "Technical security training",
        "Culture transformation initiatives"
      ],
      deliverables: [
        "Training Curriculum",
        "Awareness Materials",
        "Simulation Results",
        "Culture Assessment"
      ]
    },
    cloud: {
      title: "Cloud Security Consulting",
      icon: Shield,
      description: "Cloud security strategy and implementation guidance",
      features: [
        "Multi-cloud security strategy",
        "Cloud migration security planning",
        "Container and Kubernetes security",
        "DevSecOps implementation",
        "Cloud compliance frameworks",
        "Serverless security best practices"
      ],
      deliverables: [
        "Cloud Security Strategy",
        "Migration Security Plan",
        "DevSecOps Framework",
        "Compliance Mapping"
      ]
    }
  };

  const methodologies = [
    {
      name: "NIST Cybersecurity Framework",
      description: "Identify, Protect, Detect, Respond, Recover approach",
      icon: Shield,
      color: "text-blue-400"
    },
    {
      name: "ISO 27001/27002",
      description: "International standard for information security management",
      icon: Award,
      color: "text-green-400"
    },
    {
      name: "COBIT 2019",
      description: "Governance and management framework for enterprise IT",
      icon: Settings,
      color: "text-purple-400"
    },
    {
      name: "FAIR Risk Model",
      description: "Factor Analysis of Information Risk quantitative model",
      icon: BarChart3,
      color: "text-yellow-400"
    }
  ];

  const industries = [
    {
      name: "Financial Services",
      icon: Building,
      regulations: ["SOX", "PCI DSS", "FFIEC", "GLBA"],
      challenges: ["Fraud prevention", "Regulatory compliance", "Data protection", "Real-time monitoring"]
    },
    {
      name: "Healthcare",
      icon: UserCheck,
      regulations: ["HIPAA", "HITECH", "FDA 21 CFR Part 11", "GDPR"],
      challenges: ["Patient data protection", "Medical device security", "Telehealth security", "Breach notification"]
    },
    {
      name: "Technology",
      icon: Code,
      regulations: ["GDPR", "CCPA", "SOC 2", "ISO 27001"],
      challenges: ["Intellectual property protection", "Supply chain security", "API security", "DevSecOps"]
    },
    {
      name: "Manufacturing",
      icon: Settings,
      regulations: ["NIST CSF", "IEC 62443", "ISO 27001", "CMMC"],
      challenges: ["OT/IT convergence", "Industrial IoT security", "Supply chain risks", "Critical infrastructure protection"]
    }
  ];

  const testimonials = [
    {
      quote: "0xi6r's strategic guidance transformed our security posture from reactive to proactive. Their deep understanding of enterprise challenges and practical approach to implementation made all the difference.",
      author: "Sarah Chen",
      title: "CISO, Fortune 500 Technology Company",
      company: "Global Tech Corp"
    },
    {
      quote: "The cloud security architecture they designed for our multi-cloud environment has been instrumental in our digital transformation. Excellent technical depth combined with business acumen.",
      author: "Michael Rodriguez",
      title: "VP of Infrastructure Security",
      company: "Financial Services Leader"
    },
    {
      quote: "Their incident response planning and tabletop exercises prepared us for real-world scenarios. When we faced an actual incident, our response was swift and effective thanks to their guidance.",
      author: "Jennifer Kim",
      title: "Head of Cybersecurity",
      company: "Healthcare Organization"
    }
  ];

  const faqs = [
    {
      question: "How do you approach security consulting for large enterprise organizations?",
      answer: "Our approach begins with understanding your business objectives, risk tolerance, and regulatory requirements. We conduct comprehensive assessments of current capabilities, identify gaps, and develop pragmatic roadmaps that balance security effectiveness with business enablement. All recommendations are tailored to your organization's culture, resources, and strategic goals."
    },
    {
      question: "What makes your security consulting different from large consulting firms?",
      answer: "Unlike large firms that often provide generic frameworks, we offer deep technical expertise combined with hands-on implementation experience. Our recommendations are based on real-world threat intelligence and practical security operations. We focus on sustainable, implementable solutions rather than theoretical frameworks."
    },
    {
      question: "How do you ensure knowledge transfer and capability building within our organization?",
      answer: "Knowledge transfer is integral to our consulting approach. We provide comprehensive documentation, conduct training sessions, establish mentoring relationships with your team, and offer ongoing support during implementation phases. Our goal is to build internal capabilities that reduce long-term dependency on external consultants."
    },
    {
      question: "Can you help with regulatory compliance across multiple jurisdictions?",
      answer: "Yes, we have extensive experience with global regulatory frameworks including GDPR, CCPA, HIPAA, SOX, PCI DSS, and industry-specific regulations. We help organizations develop unified compliance strategies that address multiple requirements efficiently while avoiding regulatory conflicts."
    },
    {
      question: "How do you measure the success of security consulting engagements?",
      answer: "Success is measured through clearly defined metrics including risk reduction, compliance achievement, security maturity improvements, incident response effectiveness, and business enablement outcomes. We establish baseline measurements and track progress against specific, measurable objectives throughout the engagement."
    },
    {
      question: "Do you provide ongoing support after the initial consulting engagement?",
      answer: "Yes, we offer various ongoing support models including retained advisory services, periodic assessments, implementation support, and emergency consultation services. We believe in building long-term partnerships that evolve with your organization's changing security needs."
    }
  ];

  const stats = [
    { number: "500+", label: "Enterprise Clients", icon: Building },
    { number: "98%", label: "Client Satisfaction", icon: TrendingUp },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
                <span className="text-blue-400 font-semibold text-lg">Security Consulting</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Strategic Security 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Leadership</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Transform your security posture with strategic guidance from seasoned experts. 
                We help enterprise organizations build resilient, scalable security programs 
                that enable business growth while managing risk effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                >
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="border border-gray-600 hover:border-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  Explore Services
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Consulting Overview</h3>
                  <Lightbulb className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Engagement Types</span>
                    <span className="text-white font-semibold">Strategic & Tactical</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">4-52 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Delivery Model</span>
                    <span className="text-white font-semibold">Hybrid/Remote</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Industries</span>
                    <span className="text-white font-semibold">All Sectors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Comprehensive Security Consulting Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From strategic planning to tactical implementation, we provide end-to-end 
              security consulting services tailored to enterprise needs.
            </p>
          </div>

          {/* Service Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(services).map(([key, service]) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveService(key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeService === key 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:inline">{service.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Service Details */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  {React.createElement(services[activeService].icon, { className: "w-8 h-8 text-blue-400" })}
                  <h3 className="text-3xl font-bold text-white">{services[activeService].title}</h3>
                </div>
                <p className="text-xl text-gray-300 mb-8">{services[activeService].description}</p>
                
                <h4 className="text-xl font-semibold text-white mb-4">Key Capabilities</h4>
                <div className="space-y-3">
                  {services[activeService].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-white mb-6">Deliverables</h4>
                <div className="grid gap-4">
                  {services[activeService].deliverables.map((deliverable, index) => (
                    <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">{deliverable}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                  <h5 className="text-lg font-semibold text-blue-300 mb-2">Typical Engagement</h5>
                  <div className="space-y-2 text-blue-200">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-semibold">8-16 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Team Size:</span>
                      <span className="font-semibold">2-4 consultants</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="font-semibold">Phased approach</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodologies & Frameworks */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Industry-Leading Methodologies</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our consulting approach is built on proven frameworks and industry best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologies.map((methodology, index) => {
              const IconComponent = methodology.icon;
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                  <IconComponent className={`w-8 h-8 ${methodology.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-white mb-2">{methodology.name}</h3>
                  <p className="text-sm text-gray-400">{methodology.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Industry Expertise</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deep understanding of industry-specific challenges and regulatory requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <IconComponent className="w-8 h-8 text-blue-400" />
                    <h3 className="text-2xl font-semibold text-white">{industry.name}</h3>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Regulations</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.regulations.map((regulation, regIndex) => (
                        <span key={regIndex} className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                          {regulation}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Common Challenges</h4>
                    <div className="space-y-2">
                      {industry.challenges.map((challenge, chalIndex) => (
                        <div key={chalIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Client Success Stories</h2>
            <p className="text-xl text-gray-300">
              Trusted by security leaders at Fortune 500 companies worldwide.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="text-center">
              <blockquote className="text-xl italic text-gray-300 mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              <div>
                <div className="text-lg font-semibold text-white">{testimonials[activeTestimonial].author}</div>
                <div className="text-blue-400">{testimonials[activeTestimonial].title}</div>
                <div className="text-gray-400">{testimonials[activeTestimonial].company}</div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
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
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Security Strategy?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the ranks of industry leaders who trust 0xi6r for strategic security guidance. 
            Let's discuss how we can help strengthen your security posture and enable business growth.
          </p>
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-6">Schedule Your Strategic Consultation</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-gray-300 text-sm">0xi6r@tutamail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-semibold">Response</p>
                  <p className="text-gray-300 text-sm">Within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-gray-300 text-sm">Global Delivery</p>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group">
              <Mail className="w-5 h-5 mr-2" />
              Schedule Strategic Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-gray-400 text-sm mt-4">
              Initial consultation includes security maturity assessment and strategic roadmap overview
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityConsulting;