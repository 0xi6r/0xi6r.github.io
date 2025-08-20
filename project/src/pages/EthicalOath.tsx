import React, { useRef } from 'react';

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

  // Scroll into view when side menu is clicked
  const scrollToSection = (id) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-16 pb-20 flex flex-col lg:flex-row justify-center items-start">
      {/* Main Oath Content */}
      <main className="w-full max-w-2xl mx-auto px-4">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-white">Ethical Hacker's Oath</h1>
          <div className="text-md text-gray-500 mb-8">Updated: August 20, 2025</div>
          <p className="text-lg text-gray-300 mb-6">
            As technology becomes more central to modern life, cybersecurity specialists play a critical role in protecting individuals, organizations, and infrastructure from harm. The “Ethical Hacker’s Oath” is a personal and professional pledge to operate with integrity, responsibility, and respect for law and human well-being in all information security activities.
          </p>
        </section>

        <section ref={sectionRefs['what-is-oath']} id="what-is-oath" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">What Is the Ethical Hacker’s Oath?</h2>
          <p className="mb-4 text-gray-300">
            The oath is a declaration of core values for cybersecurity professionals. It establishes a code of conduct that emphasizes protecting users and systems, responsibly disclosing vulnerabilities, respecting privacy and confidentiality, and never abusing knowledge or access for personal gain or to knowingly cause harm.
          </p>
          <p className="mb-4 text-gray-300">
            By taking this oath, an ethical hacker commits to transparent, legal, and responsible security research and engagement. The goal is not just identifying weaknesses, but helping to build a safer digital world for everyone.
          </p>
        </section>

        <section ref={sectionRefs['why-i-take-oath']} id="why-i-take-oath" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Why I Take This Oath</h2>
          <p className="mb-4 text-gray-300">
            Trust is fundamental to cybersecurity. By formally embracing the ethical hacker’s oath, I demonstrate to clients, colleagues, and the broader community that my work is governed by principles—beyond technical skill and curiosity. This commitment reassures those who rely on my expertise that their systems, data, and users are treated with the utmost care and respect.
          </p>
          <p className="mb-4 text-gray-300">
            Taking this oath is a public statement: my intent is to strengthen security, help others, and contribute positively to the digital ecosystem. I believe that rigorous ethical standards are as essential as technical ones in the fight against cyber threats.
          </p>
        </section>

        <section ref={sectionRefs['principles']} id="principles" className="mb-12">
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

        <section ref={sectionRefs['application']} id="application" className="mb-12">
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

        <section ref={sectionRefs['conclusion']} id="conclusion" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Conclusion</h2>
          <p className="text-gray-300 mb-2">
            The ethical hacker's oath is my assurance—to you and myself—that every project I undertake is handled with the highest standards of responsibility. Ethical standards do not hinder progress; they build lasting trust and security.
          </p>
          <p className="text-gray-500">
            If you have questions or wish to discuss this oath or my approach, please <a href="mailto:ethics@0xi6r.com" className="underline">contact me</a> directly.
          </p>
        </section>
      </main>

      {/* Right-side non-sticky menu */}
      <aside className="w-full max-w-xs mx-auto lg:ml-6 lg:mr-0 mt-10 lg:mt-0 flex-shrink-0">
        <nav className="bg-black border border-gray-700 rounded-xl shadow-lg p-4 space-y-2">
          <h3 className="text-gray-400 text-base font-semibold mb-2">On This Page</h3>
          <ul>
            {sections.map((sec) => (
              <li key={sec.id}>
                <button
                  className={`
                    w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 text-base flex items-center justify-between
                    text-gray-400 hover:bg-gray-800 hover:text-white
                  `}
                  onClick={() => scrollToSection(sec.id)}
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
