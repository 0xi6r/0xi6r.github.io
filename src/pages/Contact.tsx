import { Github, Linkedin, Mail, Send } from 'lucide-react';
import React, { useState } from 'react';

const ACCENT = '#e0a563';

const XIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MastodonIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z" />
  </svg>
);

const channels = [
  { icon: Github, name: 'GitHub', desc: 'Open-source tools and experiments', href: 'https://github.com/0xi6r' },
  { icon: XIcon, name: 'X', desc: 'Short updates and research notes', href: 'https://x.com/0xi6r' },
  { icon: MastodonIcon, name: 'Mastodon', desc: 'Infosec community discussion', href: 'https://infosec.exchange/@0x_i6r', rel: 'me noopener noreferrer' },
  { icon: Linkedin, name: 'LinkedIn', desc: 'Professional background', href: 'https://www.linkedin.com/in/itsisaac' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('https://0x-i6r.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Request failed');
      setFormData({ name: '', email: '', message: '' });
      setStatus('Message received. I’ll get back to you shortly.');
    } catch {
      setStatus('The message could not be sent. Please try email instead.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-frame">
      <main className="page-shell content-page">
        <header className="content-hero">
          <h1>Let’s talk.</h1>
          <p>For Dev, research, collaboration, or a thoughtful conversation, use the form or reach out directly.</p>
        </header>

        <div className="contact-grid">
          <aside className="contact-list">
            <div className="content-panel">
              <h2>Direct channels</h2>
              <div className="contact-list">
                <a className="contact-item" href="mailto:0xi6r@tutamail.com">
                  <Mail size={18} color={ACCENT} aria-hidden="true" />
                  <span><strong>Email</strong>0xi6r@tutamail.com</span>
                </a>
                {channels.map(({ icon: Icon, name, desc, href, rel }) => (
                  <a
                    key={name}
                    className="contact-item"
                    href={href}
                    target="_blank"
                    rel={rel ?? 'noopener noreferrer'}
                  >
                    <Icon size={18} color={ACCENT} aria-hidden="true" />
                    <span><strong>{name}</strong>{desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <section className="content-panel">
            <h2>Send a message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
                <div><label htmlFor="name">Name</label><input id="name" name="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} required /></div>
                <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} required /></div>
              </div>
              <div><label htmlFor="message">Message</label><textarea id="message" name="message" rows={8} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} required /></div>
              <button className="button-primary" type="submit" disabled={submitting} style={{ justifyContent: 'center' }}>{submitting ? 'Sending…' : <>Send message <Send size={16} /></>}</button>
              {status && <p className="section-copy" role="status">{status}</p>}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;
