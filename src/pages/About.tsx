import { ArrowUpRight, Award, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Shield, value: 'Offensive', label: 'Security research' },
  { icon: Award, value: 'OSCP · CEH', label: 'Active certifications' },
  { icon: Users, value: 'Independent', label: 'Research practice' },
];

const About = () => (
  <div className="site-frame">
    <main className="page-shell content-page">
      <header className="content-hero">
        <p className="page-kicker">About the practice</p>
        <h1>Curiosity, applied with care.</h1>
        <p>Independent offensive security research focused on finding the weaknesses that matter and communicating how to fix them.</p>
      </header>

      <div className="content-grid">
        <section className="content-panel">
          <h2>Who I am</h2>
          <p>
            I’m Isaac, an offensive security researcher working across vulnerability research, penetration testing, and red team operations. My work starts with understanding how systems behave under pressure—then turns that understanding into practical mitigation.
          </p>
          <p style={{ marginTop: '18px' }}>
            I document investigations, build small tools, and keep learning in public. The objective is direct: help people make more informed security decisions before an attacker makes them first.
          </p>
          <div className="hero__actions">
            <a href="/Isaac_CV.pdf" target="_blank" rel="noopener noreferrer" className="button-primary">View CV <ArrowUpRight size={16} /></a>
            <Link to="/contact" className="button-secondary">Start a conversation</Link>
          </div>
        </section>
        <aside style={{ display: 'grid', gap: '12px' }}>
          {stats.map((stat) => (
            <div className="content-stat" key={stat.label}>
              <stat.icon size={18} color="#e0a563" />
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
