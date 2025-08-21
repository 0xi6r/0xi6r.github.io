import React from 'react';
import { Terminal, Shield, Cloud, Server, Activity, Search, Layers, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';


const highlights = [
  {
    label: "Linux Power User",
    icon: Terminal,
    detail: "Expertise in scripting, automation, troubleshooting, and managing production-grade Linux systems for maximum uptime, security, and efficiency.",
  },
  {
    label: "Cloud & Virtualization",
    icon: Cloud,
    detail: "Cloud-native infrastructure: deploy, harden, and maintain scalable environments on AWS, Azure, GCP, DigitalOcean, and more. CI/CD, backups, cost optimization, and zero-downtime migrations handled.",
  },
  {
    label: "Containers & Orchestration",
    icon: Layers,
    detail: "Docker, Kubernetes, LXC/LXD: build, ship, and run secure container-based workloads. Automated cluster management and network segmentation for enterprise grade reliability.",
  },
  {
    label: "Incident Response & Threat Intelligence",
    icon: Shield,
    detail: "Active threat hunting and response. Proactive log analysis, SIEM deployment, anomaly detection, forensics, and reporting. Integrate threat feeds, streamline alerts, and close security gaps fast.",
  },
  {
    label: "Monitoring & Automation",
    icon: Monitor,
    detail: "24/7 Monitoring, alerting (Prometheus, Grafana, Zabbix, ELK). Self-healing operations, scripted recovery, automated patching, and metrics-driven performance tuning.",
  },
  {
    label: "Vulnerability Management",
    icon: Search,
    detail: "End-to-end patch management, secure configuration, routine scanning (Nessus, OpenVAS, custom tooling), and CVE triage/remediation for bulletproof infrastructure.",
  },
  {
    label: "End-to-End Troubleshooting",
    icon: Activity,
    detail: "Decades-in-days level troubleshooting. Kernel panics, failed services, out-of-memory, network bottlenecks, storage disasters—solved fast and communicated transparently.",
  },
];

const SysAdminServices = () => (
  <div className="min-h-screen bg-black pt-16 pb-28">
    <section className="max-w-4xl mx-auto text-center px-6 py-14">
      <h1 className="bg-white bg-clip-text text-transparent text-5xl font-extrabold mb-8 animate-fade-in">
        System Admin &amp; Threat Intelligence
      </h1>
      <p className="text-lg text-gray-300 mb-6">
        Supercharge your infrastructure with a Linux power user trusted by security-conscious individuals. 
        I transform complex, underperforming, or vulnerable systems into agile, resilient, attack-ready foundations.
      </p>
      <p className="text-gray-400 text-md mb-10">
        From hardening cloud deployments to outsmarting advanced threats—no environment is too complex or company too small for next-level admin. Let’s make your business unbreakable.
      </p>
    </section>

    <section className="max-w-6xl mx-auto grid gap-10 px-5 sm:grid-cols-2 md:grid-cols-3">
      {highlights.map(({ label, icon: Icon, detail }) => (
        <div
          key={label}
          className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 px-6 py-7 flex flex-col items-center hover:border-cyan-500/60 transition-all duration-300 group"
        >
          <Icon className="w-9 h-9 mb-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-200" />
          <h2 className="text-xl font-semibold mb-2 text-white">{label}</h2>
          <p className="text-gray-400 text-sm">{detail}</p>
        </div>
      ))}
    </section>

    <section className="max-w-2xl mx-auto text-center mt-16 px-6">
      <h3 className="text-2xl font-bold text-white mb-6">Why choose me?</h3>
      <ul className="text-left text-gray-300 text-md space-y-4 mb-8 list-disc pl-6">
        <li>24/7 availability for escalations and critical incidents</li>
        <li>Documented, reproducible automation every step of the way</li>
        <li>Security and reliability woven into every config/change</li>
        <li>Clear communication, fast response, and data-driven decisions</li>
        <li>Absolutely no vendor lock-in: you own your infra and your destiny</li>
      </ul>

      <Link to="/contact" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-700 px-7 py-3 text-white font-semibold rounded-lg hover:scale-105 hover:from-cyan-600 hover:to-blue-800 shadow transition transform duration-300">Book a Consultation Now</Link>
      
    </section>
  </div>
);

export default SysAdminServices;
