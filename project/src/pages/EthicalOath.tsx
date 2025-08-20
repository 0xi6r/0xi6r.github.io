import React, { useRef, useEffect, useState } from 'react';

const sections = [
  { id: 'what-is-oath', title: 'What Is the Ethical Hacker’s Oath?' },
  { id: 'why-i-take-oath', title: 'Why I Take This Oath' },
  { id: 'principles', title: 'My Ethical Principles' },
  { id: 'application', title: 'Applying the Oath in My Work' },
  { id: 'conclusion', title: 'Conclusion' },
];

const EthicalOath = () => {
  const sectionRefs = {
    'what-is-oath': useRef(null),
    'why-i-take-oath': useRef(null),
    'principles': useRef(null),
    'application': useRef(null),
    'conclusion': useRef(null),
  };
  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Adjust: for sticky menu, calculate offset so it never covers the bottom/footer
  const [mainBottom, setMainBottom] = useState(0);
  const mainRef = useRef(null);

  useEffect(() => {
    const updateBottom = () => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        setMainBottom(window.scrollY + rect.bottom);
      }
    };
    window.addEventListener('resize', updateBottom);
    updateBottom();
    return () => window.removeEventListener('resize', updateBottom);
  }, []);

  // Active section highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map(sec => ({
        id: sec.id,
        top: sectionRefs[sec.id].current
          ? sectionRefs[sec.id].current.getBoundingClientRect().top
          : Infinity
      }));
      const threshold = 80;
      const current =
        offsets
          .filter(sec => sec.top - threshold < 1)
          .slice(-1)[0] || offsets;
      setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute menu lower position to avoid covering footer.
  // Sidebar stops being sticky X px before bottom of main
  const sidebarStyles = {
    position: 'sticky',
    top: '8rem', // below navbar
    maxHeight: `calc(100vh - 8rem - 2.5rem)`, // Give breathing room at page bottom
    overflowY: 'auto',
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-16 pb-20 flex justify-center items-start">
      <main className="w-full max-w-2xl mx-auto px-4" ref={mainRef}>
        {/* Oath Title */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-white">Ethical Hacker's Oath</h1>
          <div className="text-md text-gray-500 mb-8">Updated: August 20, 2025</div>
          <p className="text-lg text-gray-300 mb-6">
            As technology becomes more central to modern life, cybersecurity specialists play a critical role in protecting individuals, organizations, and infrastructure from harm. The “Ethical Hacker’s Oath” is a personal and professional pledge to operate with integrity, responsibility, and respect for law and human well-being in all information security activities.
          </p>
        </section>

        <section ref={sectionRefs[sections[0].id]} id={sections.id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">What Is the Ethical Hacker’s Oath?</h2>
          <p className="mb-4 text-gray-300">
            The oath is a declaration of core values for cybersecurity professionals. It establishes a code of conduct that emphasizes protecting users and systems, responsibly disclosing vulnerabilities, respecting privacy and confidentiality, and never abusing knowledge or access for personal gain or to knowingly cause harm.
          </p>
          <p className="mb-4 text-gray-300">
            By taking this oath, an ethical hacker commits to transparent, legal, and responsible security research and engagement. The goal is not just identifying weaknesses, but helping to build a safer digital world for everyone.
          </p>
        </section>

        <section ref={sectionRefs[sections[1].id]} id={sections[1].id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Why I Take This Oath</h2>
          <p className="mb-4 text-gray-300">
            Trust is fundamental to cybersecurity. By formally embracing the ethical hacker’s oath, I demonstrate to clients, colleagues, and the broader community that my work is governed by principles—beyond technical skill and curiosity. This commitment reassures those who rely on my expertise that their systems, data, and users are treated with the utmost care and respect.
          </p>
          <p className="mb-4 text-gray-300">
            Taking this oath is a public statement: my intent is to strengthen security, help others, and contribute positively to the digital ecosystem. I believe that rigorous ethical standards are as essential as technical ones in the fight against cyber threats.
          </p>
        </section>

        <section ref={sectionRefs[sections[2].id]} id={sections[2].id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">My Ethical Principles</h2>
          <ul className="ml-6 mb-4 text-gray-300 list-decimal space-y-2">
            <li>
              I perform every cyber operation with honesty, transparency, and a sense of duty to protect.
            </li>
            <li>
              I use my access and skills solely for authorized and constructive purposes—never to exploit, damage, or intrude beyond what is ethical or legal.
            </li>
            <li>
              I respect the privacy and confidentiality of information encountered, and will never disclose or misuse data entrusted to me.
            </li>
            <li>
              I report discovered vulnerabilities promptly and responsibly, helping affected parties mitigate risk without exposing them to unnecessary danger.
            </li>
            <li>
              I continue to learn, adapt, and uphold professional standards as threats, technologies, and ethical considerations evolve.
            </li>
          </ul>
          <p className="mb-4 text-gray-300">
            These principles are not just words—they guide my everyday practice and decision-making in cybersecurity operations, research, and consulting engagements.
          </p>
        </section>

        <section ref={sectionRefs[sections[3].id]} id={sections[3].id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Applying the Oath in My Work</h2>
          <p className="mb-4 text-gray-300">
            In every penetration test, system audit, or investigation I conduct, the oath is my benchmark for action. I seek clear client consent, define scope transparently, and document findings thoroughly and truthfully. Sensitive details are never disclosed beyond those with a legitimate need to know.
          </p>
          <p className="mb-4 text-gray-300">
            I choose secure channels for reporting vulnerabilities, avoid unnecessary exposure, and provide actionable remediation guidance. If I ever find myself in a situation where laws or client direction are unclear, I default to caution—protecting users and infrastructure is paramount.
          </p>
          <p className="mb-4 text-gray-300">
            When collaborating or publishing research, I anonymize where possible, credit responsibly, and always avoid glorifying exploitation or harming reputations unjustly.
          </p>
        </section>

        <section ref={sectionRefs[sections[4].id]} id={sections[4].id} className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-white">Conclusion</h2>
          <p className="text-gray-300 mb-2">
            The ethical hacker's oath is my assurance—to you and myself—that every project I undertake is handled with the highest standards of responsibility. Ethical standards do not hinder progress; they build lasting trust and security.
          </p>
          <p className="text-gray-500">
            If you have questions or wish to discuss this oath or my approach, please <a href="mailto:ethics@0xi6r.com" className="underline">contact me</a> directly.
          </p>
        </section>
      </main>

      {/* Sticky Side Menu, does NOT cover footer. */}
      <aside className="hidden lg:flex flex-col ml-6" style={{ minWidth: '18rem' }}>
        <nav style={sidebarStyles} className="bg-black border border-gray-700 rounded-xl shadow-lg p-4 space-y-2">
          <h3 className="text-gray-400 text-base font-semibold mb-2">On This Page</h3>
          <ul>
            {sections.map((sec) => (
              <li key={sec.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 text-base flex items-center justify-between
                    ${
                      activeSection === sec.id
                        ? 'bg-gray-800 text-white font-semibold'
                        : 'text-gray-400'
                    }`}
                  onClick={() => scrollToSection(sec.id)}
                  aria-current={activeSection === sec.id ? "section" : undefined}
                >
                  <span>{sec.title}</span>
                  <span className="ml-2 text-white text-base">{'→'}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default EthicalOath;
