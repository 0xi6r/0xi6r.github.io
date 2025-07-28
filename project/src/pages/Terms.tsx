import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, FileText, Scale, ChevronRight, Menu, X } from 'lucide-react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'introduction', title: '1. Introduction', icon: FileText },
    { id: 'services', title: '2. Services Description', icon: Shield },
    { id: 'scope', title: '3. Scope & Authorization', icon: Shield },
    { id: 'client-responsibilities', title: '4. Client Responsibilities', icon: FileText },
    { id: 'confidentiality', title: '5. Confidentiality', icon: Shield },
    { id: 'limitations', title: '6. Limitations & Disclaimers', icon: AlertTriangle },
    { id: 'payment', title: '7. Payment Terms', icon: FileText },
    { id: 'intellectual-property', title: '8. Intellectual Property', icon: FileText },
    { id: 'termination', title: '9. Termination', icon: FileText },
    { id: 'governing-law', title: '10. Governing Law', icon: Scale },
    { id: 'changes', title: '11. Changes to Terms', icon: FileText },
    { id: 'contact', title: '12. Contact Information', icon: FileText },
  ];

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const SidebarMenu = ({ isMobile = false }) => (
    <nav className={`${isMobile ? 'block' : 'hidden lg:block'} space-y-2`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Scale className="w-5 h-5 mr-2 text-cyan-400" />
          Table of Contents
        </h3>
      </div>
      
      {sections.map((section) => {
        const IconComponent = section.icon;
        const isActive = activeSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center group ${
              isActive 
                ? 'bg-cyan-900/30 text-cyan-300 border-l-4 border-cyan-400' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <IconComponent className={`w-4 h-4 mr-3 ${isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
            <span className="text-sm font-medium">{section.title}</span>
            <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isActive ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
                <p className="text-gray-400">Professional cybersecurity services agreement</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-75">
          <div className="fixed inset-y-0 left-0 w-80 bg-gray-900 shadow-xl overflow-y-auto border-r border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Navigation</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarMenu isMobile={true} />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <SidebarMenu />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-black rounded-lg border border-black">
              <div className="p-8 space-y-12">
                
                {/* Introduction */}
                <section id="introduction">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">1. Introduction</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      Welcome to 0xi6r's cybersecurity services. These Terms of Service ("Terms") govern your use of our website, services, and any related content or materials provided by 0xi6r ("we," "us," or "our").
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                    </p>
                  </div>
                </section>

                {/* Services Description */}
                <section id="services">
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">2. Services Description</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">0xi6r provides professional cybersecurity services including but not limited to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                      <li>Penetration testing and vulnerability assessments</li>
                      <li>Security consulting and advisory services</li>
                      <li>Red team operations and security audits</li>
                      <li>Security awareness training and education</li>
                      <li>Incident response and forensic analysis</li>
                      <li>Security architecture review and recommendations</li>
                    </ul>
                    <p className="text-gray-300 leading-relaxed">
                      All services are provided in accordance with industry best practices and ethical hacking principles.
                    </p>
                  </div>
                </section>

                {/* Scope of Work and Authorization */}
                <section id="scope">
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">3. Scope of Work and Authorization</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div className="bg-blue-900/20 border-l-4 border-blue-400 p-6 mb-6 rounded-r-lg">
                      <h3 className="text-xl font-semibold text-blue-300 mb-3">3.1 Written Authorization</h3>
                      <p className="text-blue-200">
                        All penetration testing and security assessment activities require explicit written authorization from the client. No testing will commence without proper documentation and approval.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-white">3.2 Scope Limitations</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Testing activities will be limited to the systems, networks, and applications explicitly defined in the signed Statement of Work (SOW). Any testing outside the agreed scope is prohibited.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-white">3.3 Legal Compliance</h3>
                    <p className="text-gray-300 leading-relaxed">
                      All services will be conducted in compliance with applicable laws and regulations. The client warrants that they have the legal authority to authorize testing of all systems within the defined scope.
                    </p>
                  </div>
                </section>

                {/* Client Responsibilities */}
                <section id="client-responsibilities">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">4. Client Responsibilities</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">The client agrees to:</p>
                    <div className="grid md:grid-cols-2 gap-4 my-6">
                      <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                          <li>Provide accurate and complete information regarding systems to be tested</li>
                          <li>Ensure proper authorization for all systems within the testing scope</li>
                          <li>Designate a primary point of contact for the duration of the engagement</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                          <li>Implement recommended security measures in a timely manner</li>
                          <li>Maintain confidentiality of testing methodologies and findings</li>
                          <li>Provide necessary access credentials and network information as required</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Confidentiality and Data Protection */}
                <section id="confidentiality">
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">5. Confidentiality and Data Protection</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <h3 className="text-xl font-semibold mb-3 text-white">5.1 Confidential Information</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We understand that our services may involve access to sensitive and confidential information. We commit to maintaining strict confidentiality and will not disclose any client information to third parties without explicit written consent.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-white">5.2 Data Handling</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Any data collected during testing activities will be handled in accordance with applicable data protection laws and will be securely destroyed upon completion of the engagement unless otherwise specified.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-white">5.3 Non-Disclosure</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Both parties agree to execute a separate Non-Disclosure Agreement (NDA) prior to the commencement of services when required.
                    </p>
                  </div>
                </section>

                {/* Limitations and Disclaimers */}
                <section id="limitations">
                  <div className="flex items-center space-x-2 mb-6">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                    <h2 className="text-3xl font-bold text-white">6. Limitations and Disclaimers</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-semibold text-amber-300 mb-3">6.1 Service Limitations</h3>
                      <p className="text-amber-200">
                        Our security assessments are conducted within a specific timeframe and scope. We cannot guarantee the identification of all vulnerabilities or security issues that may exist in your systems.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-white">6.2 No Warranty</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Services are provided "as is" without warranty of any kind. We disclaim all warranties, express or implied, including but not limited to merchantability and fitness for a particular purpose.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-white">6.3 Limitation of Liability</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Our liability for any claim arising from or related to our services shall not exceed the total amount paid by the client for the specific engagement giving rise to the claim.
                    </p>
                  </div>
                </section>

                {/* Payment Terms */}
                <section id="payment">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">7. Payment Terms</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-6">
                      <ul className="list-disc pl-6 space-y-2 text-green-200">
                        <li>Payment terms will be specified in the individual service agreement</li>
                        <li>Invoices are due within 30 days of receipt unless otherwise specified</li>
                        <li>Late payments may incur interest charges at the rate of 1.5% per month</li>
                        <li>All fees are non-refundable once services have commenced</li>
                        <li>Additional work outside the original scope will be billed separately</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section id="intellectual-property">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">8. Intellectual Property</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      All methodologies, tools, techniques, and processes used in providing our services remain our intellectual property. Reports and findings specific to the client's environment become the property of the client upon full payment.
                    </p>
                  </div>
                </section>

                {/* Termination */}
                <section id="termination">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">9. Termination</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      Either party may terminate services with written notice. In the event of termination, the client remains responsible for payment of all services rendered up to the termination date.
                    </p>
                  </div>
                </section>

                {/* Governing Law */}
                <section id="governing-law">
                  <div className="flex items-center space-x-2 mb-6">
                    <Scale className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">10. Governing Law</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of Kenya. Any disputes arising from these Terms shall be resolved through binding arbitration in Nairobi, Kenya.
                    </p>
                  </div>
                </section>

                {/* Changes to Terms */}
                <section id="changes">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">11. Changes to Terms</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      We reserve the right to modify these Terms at any time. Updated Terms will be posted on our website with a revised "Last updated" date. Continued use of our services after changes constitutes acceptance of the new Terms.
                    </p>
                  </div>
                </section>

                {/* Contact Information */}
                <section id="contact">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">12. Contact Information</h2>
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      For questions regarding these Terms of Service, please contact us at:
                    </p>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="font-semibold text-white">Email</p>
                          <p className="text-gray-300">0xi6r@tutamail.com</p>
                        </div>
                        <div>
                          <p className="font-semibold text-white">Location</p>
                          <p className="text-gray-300">Nairobi, Kenya</p>
                        </div>
                        <div>
                          <p className="font-semibold text-white">Website</p>
                          <p className="text-gray-300">[Your website URL]</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Professional Notice */}
                <div className="bg-white border rounded-lg p-6 mt-12">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-3">Notice! Notice!</h3>
                      <p className="text-black">
                        0xi6r is committed to ethical hacking practices and operates in full compliance with 
                        applicable laws and industry standards. All security testing is conducted with proper 
                        authorization and with the goal of improving our clients' security posture.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;