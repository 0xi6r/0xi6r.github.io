import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Globe, 
  Download, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Cookie,
  Database,
  Share2,
  UserX,
  Bell,
  Search,
  Calendar,
  Trash2,
  Edit3,
  Copy,
  BookOpen,
  HelpCircle,
  Star,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });
  const [showCookieManager, setShowCookieManager] = useState(false);
  const [lastUpdated] = useState(new Date('2024-01-15'));
  const [readingProgress, setReadingProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'overview', title: 'Overview', icon: Eye },
    { id: 'information-collection', title: 'Information We Collect', icon: Database },
    { id: 'information-use', title: 'How We Use Information', icon: Settings },
    { id: 'information-sharing', title: 'Information Sharing', icon: Share2 },
    { id: 'data-security', title: 'Data Security', icon: Shield },
    { id: 'cookies', title: 'Cookies & Tracking', icon: Cookie },
    { id: 'your-rights', title: 'Your Privacy Rights', icon: Users },
    { id: 'data-retention', title: 'Data Retention', icon: Clock },
    { id: 'international-transfers', title: 'International Transfers', icon: Globe },
    { id: 'children-privacy', title: "Children's Privacy", icon: UserX },
    { id: 'updates', title: 'Policy Updates', icon: Bell },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ];

  const dataTypes = [
    {
      category: 'Personal Information',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Name and contact information',
        'Email address and phone number',
        'Professional title and company',
        'Billing and payment information'
      ]
    },
    {
      category: 'Technical Information',
      icon: Settings,
      color: 'from-purple-500 to-pink-500',
      items: [
        'IP address and device information',
        'Browser type and version',
        'Operating system details',
        'Website usage patterns'
      ]
    },
    {
      category: 'Service Information',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      items: [
        'Security assessment data',
        'Penetration testing results',
        'Consultation records',
        'Support communications'
      ]
    },
    {
      category: 'Optional Information',
      icon: Star,
      color: 'from-orange-500 to-red-500',
      items: [
        'Marketing preferences',
        'Newsletter subscriptions',
        'Event participation data',
        'Feedback and surveys'
      ]
    }
  ];

  const rights = [
    {
      right: 'Access Your Data',
      description: 'Request a copy of all personal data we hold about you',
      icon: Eye,
      action: 'Request Data Export'
    },
    {
      right: 'Correct Information',
      description: 'Update or correct any inaccurate personal information',
      icon: Edit3,
      action: 'Update Profile'
    },
    {
      right: 'Delete Data',
      description: 'Request deletion of your personal data (right to be forgotten)',
      icon: Trash2,
      action: 'Request Deletion'
    },
    {
      right: 'Data Portability',
      description: 'Receive your data in a structured, machine-readable format',
      icon: Download,
      action: 'Export Data'
    },
    {
      right: 'Restrict Processing',
      description: 'Limit how we process your personal information',
      icon: Lock,
      action: 'Manage Restrictions'
    },
    {
      right: 'Withdraw Consent',
      description: 'Withdraw consent for data processing at any time',
      icon: UserX,
      action: 'Manage Consent'
    }
  ];

  const faqs = [
    {
      question: 'What personal information do you collect during security assessments?',
      answer: 'During security assessments, we may collect technical data about your systems, network configurations, and identified vulnerabilities. We also collect contact information for project coordination. All assessment data is handled with the highest level of confidentiality and is used solely for the purpose of providing security services.'
    },
    {
      question: 'How long do you retain client data and assessment results?',
      answer: 'We retain client data and assessment results for a maximum of 7 years after the completion of services, or as required by applicable laws and regulations. Technical assessment data is securely destroyed according to industry standards. You can request earlier deletion of your data by contacting our privacy team.'
    },
    {
      question: 'Do you share client information with third parties?',
      answer: 'We do not sell, trade, or otherwise transfer client information to third parties except as described in this policy. We may share information with trusted service providers who assist in our operations, professional advisors bound by confidentiality, or as required by law. All third parties are contractually bound to protect your information.'
    },
    {
      question: 'How do you ensure the security of sensitive data during penetration testing?',
      answer: 'We implement multiple layers of security including encrypted data transmission, secure storage systems, access controls, and regular security audits. Our team follows strict protocols for handling sensitive data, and all activities are conducted under comprehensive non-disclosure agreements.'
    },
    {
      question: 'Can I opt out of marketing communications?',
      answer: 'Yes, you can opt out of marketing communications at any time by clicking the unsubscribe link in any email, updating your preferences in your account settings, or contacting us directly. Note that you may still receive transactional communications related to our services.'
    },
    {
      question: 'How do you handle data breaches?',
      answer: 'In the unlikely event of a data breach, we have comprehensive incident response procedures in place. We will notify affected individuals and relevant authorities within 72 hours as required by law, implement immediate containment measures, and provide detailed information about the incident and remediation steps.'
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const handleCookiePreference = (type, value) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const saveCookiePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowCookieManager(false);
    // Implement actual cookie management logic here
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-gray-600">Your privacy rights and our data practices</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <button 
                onClick={() => setShowCookieManager(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search policy..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center group ${
                          isActive 
                            ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-600' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Version
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Privacy Team
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Data Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-8 space-y-12">
                
                {/* Overview Section */}
                <section id="overview">
                  <div className="flex items-center space-x-3 mb-6">
                    <Eye className="w-6 h-6 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Privacy Overview</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment to Your Privacy</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      At 0xi6r, we understand that privacy and security go hand in hand. As cybersecurity professionals, 
                      we apply the same rigorous standards to protecting your personal information that we bring to 
                      securing our clients' digital assets. This policy explains how we collect, use, and protect 
                      your information when you use our services.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">Security First</div>
                        <div className="text-sm text-gray-600">Military-grade encryption</div>
                      </div>
                      <div className="text-center">
                        <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">Your Control</div>
                        <div className="text-sm text-gray-600">Manage your data rights</div>
                      </div>
                      <div className="text-center">
                        <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">Global Compliance</div>
                        <div className="text-sm text-gray-600">GDPR, CCPA compliant</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <Info className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-2">Key Updates</h4>
                        <p className="text-amber-800 text-sm">
                          We've updated our cookie policy and added new data portability features. 
                          Review the changes and update your preferences using the cookie settings above.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Collection */}
                <section id="information-collection">
                  <div className="flex items-center space-x-3 mb-6">
                    <Database className="w-6 h-6 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {dataTypes.map((type, index) => {
                      const IconComponent = type.icon;
                      return (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{type.category}</h3>
                          </div>
                          <ul className="space-y-2">
                            {type.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">How We Collect Information</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Direct Collection</h5>
                        <p className="text-sm text-gray-600">Information you provide through forms, consultations, and service requests.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Automatic Collection</h5>
                        <p className="text-sm text-gray-600">Technical data collected through cookies, analytics, and website interactions.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Third-Party Sources</h5>
                        <p className="text-sm text-gray-600">Publicly available information and professional networks with your consent.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Your Privacy Rights */}
                <section id="your-rights">
                  <div className="flex items-center space-x-3 mb-6">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Your Privacy Rights</h2>
                  </div>

                  <p className="text-gray-700 mb-8 text-lg">
                    You have comprehensive rights over your personal data. We've made it easy to exercise these rights 
                    through our privacy dashboard and dedicated support team.
                  </p>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {rights.map((right, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <right.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{right.right}</h3>
                            <p className="text-gray-600 text-sm mb-4">{right.description}</p>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                              {right.action} →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Exercise Your Rights</h4>
                    <p className="text-blue-800 text-sm mb-4">
                      To exercise any of these rights, contact our privacy team at privacy@0xi6r.com or use our 
                      automated privacy dashboard. We'll respond within 30 days.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Access Privacy Dashboard
                    </button>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security">
                  <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise-Grade Security</h3>
                    <p className="text-gray-700 mb-6">
                      As cybersecurity experts, we implement the same rigorous security measures for your data 
                      that we recommend to our Fortune 500 clients.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { icon: Lock, title: 'AES-256 Encryption', desc: 'Data encrypted at rest and in transit' },
                        { icon: Shield, title: 'Zero Trust Architecture', desc: 'Multi-layer security validation' },
                        { icon: Eye, title: '24/7 Monitoring', desc: 'Continuous threat detection' },
                        { icon: CheckCircle, title: 'SOC 2 Compliant', desc: 'Audited security controls' }
                      ].map((item, index) => (
                        <div key={index} className="text-center">
                          <item.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <h4 className="text-lg font-semibold text-gray-900">Technical Safeguards</h4>
                    <ul className="space-y-2">
                      <li>End-to-end encryption for all data transmissions</li>
                      <li>Multi-factor authentication for all system access</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Secure data centers with physical access controls</li>
                      <li>Employee security training and background checks</li>
                      <li>Incident response and data breach protocols</li>
                    </ul>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact">
                  <div className="flex items-center space-x-3 mb-6">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Contact Our Privacy Team</h2>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                      <p className="text-gray-700 mb-6">
                        Have questions about this privacy policy or need to exercise your privacy rights? 
                        Our dedicated privacy team is here to help.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-gray-900">Privacy Team</div>
                            <div className="text-gray-600">privacy@0xi6r.com</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-gray-900">Data Protection Officer</div>
                            <div className="text-gray-600">Nairobi, Kenya</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-gray-900">Response Time</div>
                            <div className="text-gray-600">Within 30 days</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Privacy Request Form</h4>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                            <option>Data Access Request</option>
                            <option>Data Deletion Request</option>
                            <option>Data Correction Request</option>
                            <option>Opt-out Request</option>
                            <option>General Privacy Question</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Submit Privacy Request
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border mt-8">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        {expandedFAQ === index ? 
                          <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" /> : 
                          <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        }
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-6 pb-4 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed pt-4">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showCookieManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Cookie Preferences</h3>
                <button 
                  onClick={() => setShowCookieManager(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 mb-8">
                Manage your cookie preferences. You can change these settings at any time, 
                but some features may not work properly if you disable certain cookies.
              </p>

              <div className="space-y-6">
                {[
                  { 
                    key: 'necessary', 
                    title: 'Necessary Cookies', 
                    description: 'Required for basic site functionality and security',
                    disabled: true
                  },
                  { 
                    key: 'analytics', 
                    title: 'Analytics Cookies', 
                    description: 'Help us understand how visitors interact with our website'
                  },
                  { 
                    key: 'marketing', 
                    title: 'Marketing Cookies', 
                    description: 'Used to deliver relevant advertisements and track campaign effectiveness'
                  },
                  { 
                    key: 'functional', 
                    title: 'Functional Cookies', 
                    description: 'Enable enhanced functionality and personalization'
                  }
                ].map((cookie) => (
                  <div key={cookie.key} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{cookie.title}</h4>
                      <p className="text-sm text-gray-600">{cookie.description}</p>
                    </div>
                    <label className="ml-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={cookiePreferences[cookie.key]}
                        onChange={(e) => handleCookiePreference(cookie.key, e.target.checked)}
                        disabled={cookie.disabled}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 mt-8">
                <button 
                  onClick={saveCookiePreferences}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save Preferences
                </button>
                <button 
                  onClick={() => setShowCookieManager(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
