import React, { useState } from 'react';
import { Mail, MapPin, Send, Linkedin, Github, MessageSquare, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('https://0x-i6r.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        setSuccess('Thank you for reaching out! I will get back to you.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setError('Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: '0xi6r@tutamail.com',
      link: 'mailto:0xi6r@tutamail.com'
    },
    {
      icon: MapPin,
      label: 'Earth',
      value: '127.0.0.1',
      link: null
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: '24-48 hours',
      link: null
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/0xi6r', label: 'GitHub' }
  ];

  return (
    <div className="min-h-screen pt-10 bg-black">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Feel free to contact me.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">

            {/* Contact Information - Left Side (2 columns) */}
            <div className="lg:col-span-2 space-y-8">

              <div className="bg-black rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-gray-300" />
                      </div>
                      <div>
                        <p className="text-white text-xs uppercase tracking-wide mb-1">
                          {info.label}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-white font-medium hover:text-gray-300 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-black rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Connect</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-white rounded-lg transition-colors duration-300 text-white hover:text-black"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side (3 columns) */}
            <div className="lg:col-span-3">
              <div className="bg-black rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={8}
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all resize-none"
                      placeholder="What's this about..."
                      required
                    ></textarea>
                  </div>

                  {/* Success/Error Messages */}
                  {success && (
                    <div className="text-green-400 bg-green-900/20 border border-green-800 rounded-lg p-4 text-sm">
                      {success}
                    </div>
                  )}
                  {error && (
                    <div className="text-red-400 bg-red-900/20 border border-red-800 rounded-lg p-4 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    You agree to be contacted regarding your inquiry.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
