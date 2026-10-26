import { Clock, Github, Mail, MapPin, Send } from 'lucide-react';
import React, { useState } from 'react';

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
          <p className="page-kicker">Contact</p>
          <h1>Let’s talk security.</h1>
          <p>For research, collaboration, or a thoughtful security conversation, use the form or reach out directly.</p>
        </header>

        <div className="contact-grid">
          <aside className="contact-list">
            <div className="content-panel">
              <h2>Direct channels</h2>
              <div className="contact-list">
                <a className="contact-item" href="mailto:0xi6r@tutamail.com"><Mail size={18} color="#e0a563" /><span><strong>Email</strong>0xi6r@tutamail.com</span></a>
                <div className="contact-item"><MapPin size={18} color="#e0a563" /><span><strong>Location</strong>Remote / East Africa</span></div>
                <div className="contact-item"><Clock size={18} color="#e0a563" /><span><strong>Response time</strong>Usually within 24–48 hours</span></div>
              </div>
            </div>
            <a className="content-panel contact-item" href="https://github.com/0xi6r" target="_blank" rel="noopener noreferrer"><Github size={18} color="#e0a563" /><span><strong>GitHub</strong>Open-source tools and experiments</span></a>
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
