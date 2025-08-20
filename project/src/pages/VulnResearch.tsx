import React from 'react';

const externalLinks = [
  {
    name: "Penetration Testing Execution Standard (PTES)",
    url: "https://www.pentest-standard.org/",
  },
  {
    name: "OWASP Testing Guide",
    url: "https://owasp.org/www-project-web-security-testing-guide/",
  },
  {
    name: "NIST Special Publication 800-115",
    url: "https://csrc.nist.gov/publications/detail/sp/800-115/final",
  },
  {
    name: "CFAA (Computer Fraud and Abuse Act) – U.S. Department of Justice",
    url: "https://www.justice.gov/criminal-ccips/computer-fraud-and-abuse-act",
  },
  {
    name: "GDPR – General Data Protection Regulation",
    url: "https://gdpr-info.eu/",
  },
  {
    name: "ISO/IEC 27001 Security Framework",
    url: "https://www.iso.org/isoiec-27001-information-security.html",
  }
];

const researchTypes = [
  {
    title: "Penetration Testing",
    desc: "Ethical attacks on networks, applications, and infrastructure to uncover real exploitable weaknesses before adversaries do. Scope is always defined and authorized by the client."
  },
  {
    title: "Red Teaming",
    desc: "Simulating advanced adversaries and persistent threats with a focus on evasion, post-exploitation, lateral movement, and testing the human and technical layers."
  },
  {
    title: "Vulnerability Assessment",
    desc: "Deep, systematic scanning and analysis to uncover and prioritize vulnerabilities across assets, including patch and configuration review."
  },
  {
    title: "System Administration Research",
    desc: "Hardening servers, network devices, and cloud infrastructure. Research covers actual and emerging threats to Linux/UNIX systems, containers, and public cloud environments."
  },
  {
    title: "Threat Intelligence & Open Source Analysis",
    desc: "Proactively reviewing threat feeds, CVE databases, and dark web chatter to anticipate and defend against new vulnerabilities and attack vectors."
  },
  {
    title: "Responsible Disclosure & Bug Bounties",
    desc: "Researching vulnerabilities in third-party products under safe harbor, responsible disclosure, and bounty guidelines, always following legal and ethical standards."
  }
];

const VulnerabilityResearch = () => (
  <div className="min-h-screen bg-black text-gray-100 pt-16 pb-20 flex justify-center items-start">
    <main className="w-full max-w-3xl mx-auto px-4">
      <section className="mb-14">
        <h1 className="text-4xl font-bold mb-6 text-white">Vulnerability Research & Defense</h1>
        <p className="text-lg text-gray-300 mb-6">
          Vulnerability research is the foundation of robust security: discovering, understanding, and mitigating software and infrastructure weaknesses—before attackers do.
        </p>
        <p className="text-gray-400">
          My mission: <b>Continuously identify and responsibly communicate vulnerabilities</b> to protect clients, inform development, and advance global security standards.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4 text-white">Why Vulnerability Research Matters</h2>
        <p className="text-gray-300 mb-4">
          Every organization relies on complex technology: software, networks, and cloud. These systems inevitably contain flaws—some critical. Research helps find issues proactively so defenses can be improved before opportunistic or targeted attackers exploit them. Vulnerability research:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-300 mb-3">
          <li>Reduces risk by surfacing weaknesses in a controlled, authorized manner.</li>
          <li>Builds resilience and improves incident response planning.</li>
          <li>Drives secure software, infrastructure, and cloud best practices.</li>
          <li>Enables transparency, informed decision-making, and regulatory compliance.</li>
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4 text-white">Legal and Ethical Guidelines</h2>
        <p className="text-gray-300 mb-4">
          All vulnerability research is conducted in full compliance with laws and well-established security ethics. The process is guided by clear legal boundaries and industry standards. Authorizations are always obtained before testing client systems.
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-300">
          <li>
            <a
              href={externalLinks[0].url}
              className="underline"
              target="_blank" rel="noopener noreferrer"
            >{externalLinks.name}</a> – A globally recognized step-by-step methodology for penetration testing.
          </li>
          <li>
            <a
              href={externalLinks[1].url}
              className="underline"
              target="_blank" rel="noopener noreferrer"
            >{externalLinks[1].name}</a> – Detailed, open standards for testing web applications.
          </li>
          <li>
            <a
              href={externalLinks[2].url}
              className="underline"
              target="_blank" rel="noopener noreferrer"
            >{externalLinks[2].name}</a> – U.S. government technical standards for security testing.
          </li>
          <li>
            <a
              href={externalLinks[3].url}
              className="underline"
              target="_blank" rel="noopener noreferrer"
            >{externalLinks[3].name}</a> – Legal boundaries/policies under U.S. law (CFAA). Always obtain written scope and permission.
          </li>
          <li>
            <a
              href={externalLinks[4].url}
              className="underline"
              target="_blank" rel="noopener noreferrer"
            >{externalLinks[4].name}</a> – Privacy by design: European legal requirements for personal data.
          </li>
          <li>
            <a
              href={externalLinks[5].url}
              className="underline"
              target="_blank" rel="noopener noreferrer"
            >{externalLinks[5].name}</a> – International security governance and policy compliance.
          </li>
        </ul>
        <p className="text-gray-400 italic mb-2">
          I do not test or research without explicit consent and legal authorization.<br />
          Responsible disclosure is practiced at all times.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4 text-white">Types of Security Research Conducted</h2>
        <div className="space-y-6">
          {researchTypes.map(type => (
            <div key={type.title}>
              <div className="font-bold text-lg text-white mb-1">{type.title}</div>
              <div className="text-gray-300 mb-2">{type.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4 text-white">Threat Modeling and My Research Process</h2>
        <p className="text-gray-300 mb-4">
          Effective vulnerability research begins with a thorough threat model—the structured analysis of what needs protecting, from whom, and how. My process includes:
        </p>
        <ul className="list-decimal pl-6 space-y-2 text-gray-300 mb-4">
          <li><span className="font-semibold">Discovery:</span> Gather scope, asset inventory, and business context.</li>
          <li><span className="font-semibold">Modeling:</span> Identify likely threats, assets at risk, known and unknown trust boundaries.</li>
          <li><span className="font-semibold">Attack Surface Mapping:</span> Analyze exposures—public, internal, or via third-party integrations.</li>
          <li><span className="font-semibold">Test Planning:</span> Develop safe, authorized testing plans based on industry best practice.</li>
          <li><span className="font-semibold">Execution:</span> Perform hands-on testing with continual risk assessment.</li>
          <li><span className="font-semibold">Reporting & Disclosure:</span> Communicate findings with actionable steps and, if required, coordinate safe public disclosure with vendors or clients.</li>
        </ul>
        <p className="text-gray-400 italic">
          This research-driven, methodical process ensures weaknesses are identified, reported, and remediated with clarity and respect for both client security and legal boundaries.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-white">Conclusion</h2>
        <p className="text-gray-300">
          Vulnerability research isn’t just about finding bugs—it's about understanding risk, upholding trust, and arming clients against real-world threats. My commitment is to create value, reduce risk, and strengthen defenses for every client I serve.
        </p>
      </section>
    </main>
  </div>
);

export default VulnerabilityResearch;
