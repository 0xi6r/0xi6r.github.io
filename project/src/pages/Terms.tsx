import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'services', title: 'Services Description' },
  { id: 'scope', title: 'Scope & Authorization' },
  { id: 'client-responsibilities', title: 'Client Responsibilities' },
  { id: 'confidentiality', title: 'Confidentiality' },
  { id: 'limitations', title: 'Limitations & Disclaimers' },
  { id: 'payment', title: 'Payment Terms' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'termination', title: 'Termination' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Information' },
];

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update activeSection as user scrolls
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
      setIsMobileMenuOpen(false);
    }
  };

  const SidebarMenu = ({ isMobile = false }) => (
    <nav className={`${isMobile ? 'block' : 'hidden lg:block'} space-y-1`}>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white mb-3">Table of Contents</h3>
      </div>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`w-full text-left px-4 py-2 rounded transition-colors duration-200
            ${
              activeSection === section.id
                ? 'bg-gray-800 text-white font-semibold'
                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            } flex items-center justify-between`}
        >
          <span>{section.title}</span>
          <span className="ml-2 text-white">{'→'}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            >
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-80">
          <div className="fixed inset-y-0 left-0 w-80 bg-gray-900 shadow-xl overflow-y-auto border-r border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Navigation</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-300"
                >
                  Close
                </button>
              </div>
              <SidebarMenu isMobile={true} />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-black rounded-lg border border-gray-800 p-6">
                <SidebarMenu />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-black rounded-lg border border-black">
              <div className="p-8 space-y-12">
                {/* Each Section */}
                <section id="introduction">
                  <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Welcome to 0xi6r's cybersecurity services. By accessing this site or engaging my services, you agree to these Terms of Service. If you do not agree, please do not use this site or services.
                  </p>
                </section>

                <section id="services">
                  <h2 className="text-2xl font-bold text-white mb-4">Services Description</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Penetration testing and vulnerability assessments</li>
                    <li>Security consulting and advisory services</li>
                    <li>Red team operations and security audits</li>
                    <li>Incident response and training</li>
                    <li>Security architecture review</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    All services are delivered with professionalism and industry best practice.
                  </p>
                </section>

                <section id="scope">
                  <h2 className="text-2xl font-bold text-white mb-4">Scope & Authorization</h2>
                  <p className="text-gray-300 mb-3">
                    All testing activities require explicit written authorization. Testing is limited to systems or applications defined in writing beforehand.
                  </p>
                  <p className="text-gray-300 mb-3">
                    Both client and provider agree to follow applicable laws. The client confirms they own or have authority to test all in-scope systems.
                  </p>
                </section>

                <section id="client-responsibilities">
                  <h2 className="text-2xl font-bold text-white mb-4">Client Responsibilities</h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Provide accurate and complete information for systems to be tested</li>
                    <li>Designate a primary contact throughout engagement</li>
                    <li>Implement recommendations in a timely manner</li>
                    <li>Maintain confidentiality of methodologies and findings</li>
                  </ul>
                </section>

                <section id="confidentiality">
                  <h2 className="text-2xl font-bold text-white mb-4">Confidentiality</h2>
                  <p className="text-gray-300 mb-3">
                    Both parties agree to keep all assessment-related information confidential. Data collected will be handled securely and destroyed after project completion, unless otherwise agreed.
                  </p>
                  <p className="text-gray-300 mb-3">
                    Non-disclosure agreements may be used when required.
                  </p>
                </section>

                <section id="limitations">
                  <h2 className="text-2xl font-bold text-white mb-4">Limitations & Disclaimers</h2>
                  <p className="text-gray-300 mb-3">
                    Security assessments are performed within a defined scope and time. Not all vulnerabilities may be found. Services are provided “as is”, without warranties.
                  </p>
                  <p className="text-gray-300 mb-3">
                    Provider liability is limited to the amount paid for the specific engagement.
                  </p>
                </section>

                <section id="payment">
                  <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Payment details are provided in each specific agreement.</li>
                    <li>Invoices are due in 30 days unless otherwise agreed.</li>
                    <li>Late payments may incur interest.</li>
                    <li>Work outside the initial scope may incur additional fees.</li>
                  </ul>
                </section>

                <section id="intellectual-property">
                  <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                  <p className="text-gray-300 mb-3">
                    All methodologies, tools, and processes remain the property of 0xi6r. Client receives ownership of assessment results upon full payment.
                  </p>
                </section>

                <section id="termination">
                  <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                  <p className="text-gray-300 mb-3">
                    Either party may terminate via written notice. The client is responsible for payment for all work completed up to termination.
                  </p>
                </section>

                <section id="governing-law">
                  <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                  <p className="text-gray-300 mb-3">
                    These Terms are governed by the laws of Kenya. Disputes will be resolved through arbitration in Nairobi, Kenya.
                  </p>
                </section>

                <section id="changes">
                  <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                  <p className="text-gray-300 mb-3">
                    0xi6r reserves the right to update these terms at any time. Updates will be clearly posted on this page. Continued use of services constitutes acceptance.
                  </p>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                  <p className="text-gray-300">
                    For questions about these Terms of Service, contact: 0xi6r@tutamail.com
                  </p>
                </section>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
