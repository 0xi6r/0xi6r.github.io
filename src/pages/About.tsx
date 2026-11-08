import { ArrowUpRight, Award, Code2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Shield, value: 'Offensive', label: 'Research & red team' },
  { icon: Award, value: 'OSCP · CEH', label: 'Ongoing Certifications' },
  { icon: Code2, value: 'Full-stack', label: 'Bun · Go · Next.js · Python3' },
];

const About = () => (
  <div className="site-frame">
    <main className="page-shell content-page">
      <header className="content-hero">
        <h1>Curiosity, applied with care.</h1>
        <p>
          Full-stack developer in offensive security. I build, test, deploy & find weaknesses that matter and explain how to fix them.
        </p>
      </header>

      <div className="content-grid">
        <section className="content-panel">
          <h2>Who I am</h2>
          <p>
            I'm Isaac, a full-stack developer working in offensive security: research, penetration testing, and red team operations. I start by building and understanding systems, then look for where they break.
          </p>
          <p style={{ marginTop: '18px' }}>
            I document my investigations, build small tools, and learn in public. The goal is simple: help people make better security decisions before an attacker makes them first.
          </p>
          <p style={{ marginTop: '18px' }}>
            Building full-stack apps shapes how I break them. I know how auth, state, and data flow get wired in practice, where shortcuts creep in, and which assumptions fail under pressure. That makes my testing more targeted and my findings easier for developers to fix.
          </p>
          <div className="hero__actions">
            <a href="/Isaac_CV.pdf" target="_blank" rel="noopener noreferrer" className="button-primary">
              View CV <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Link to="/contact" className="button-secondary">Talk to me</Link>
          </div>
        </section>

        <aside style={{ display: 'grid', gap: '12px' }}>
          {stats.map((stat) => (
            <div className="content-stat" key={stat.label}>
              <stat.icon size={18} color="#e0a563" aria-hidden="true" />
              <p className="content-stat__value" style={{ marginTop: '14px' }}>{stat.value}</p>
              <p className="content-stat__label">{stat.label}</p>
            </div>
          ))}
        </aside>
      </div>
    </main>
  </div>
);

export default About;
