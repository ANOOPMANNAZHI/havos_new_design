import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { api } from '../lib/api';

const fields = [
  { name: 'name', label: 'Full Name', type: 'text' },
  { name: 'email', label: 'Email Address', type: 'email' },
  { name: 'company', label: 'Company', type: 'text' },
];

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 5l8 5.5L19 5M3 5v12h16V5H3z" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    label: 'Email Us',
    value: 'hello@havos.com',
    href: 'mailto:hello@havos.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M8 3H5a2 2 0 00-2 2c0 7.18 5.82 13 13 13a2 2 0 002-2v-3l-4-1.5-1.5 1.5a9 9 0 01-4.5-4.5L9.5 7 8 3z" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    label: 'Call Us',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 12a3 3 0 100-6 3 3 0 000 6z" stroke="var(--blue)" strokeWidth="1.5"/><path d="M11 21s-7-5.25-7-10.5a7 7 0 1114 0C18 15.75 11 21 11 21z" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    label: 'Location',
    value: 'Global — Remote First',
    href: null,
  },
];

export default function Contact() {
  const [focused, setFocused] = useState({});
  const [values, setValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState('');

  const isActive = (name) => focused[name] || values[name];
  const handleFocus = (name) => setFocused((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setFocused((prev) => ({ ...prev, [name]: false }));
  const handleChange = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');
    try {
      await api.post('/api/contact', values);
      setSubmitStatus('success');
      setSubmitMessage('Message sent successfully! We\'ll get back to you within 24 hours.');
      setValues({});
      e.target.reset();
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ===== DARK HERO ===== */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <div className="about-hero__gradient" />
          <div className="about-hero__grid" />
        </div>
        <div className="container">
          <div className="about-hero__content">
            <motion.span
              className="dhero__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="dhero__eyebrow-dot" />
              Contact Us
            </motion.span>
            <motion.h1
              className="about-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Get in <span className="about-hero__accent">Touch</span>
            </motion.h1>
            <motion.p
              className="about-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Have a project in mind? We'd love to hear about it. Reach out and let's start building.
            </motion.p>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== CONTACT CONTENT ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="contact-v2">
            {/* Left - Info cards */}
            <div className="contact-v2__info">
              <Reveal direction="left">
                <h2 className="contact-v2__info-title">
                  Let's discuss your <span className="gradient-text">project</span>
                </h2>
                <p className="contact-v2__info-desc">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                <div className="contact-v2__cards">
                  {contactInfo.map((item) => {
                    const Tag = item.href ? 'a' : 'div';
                    return (
                      <Tag
                        key={item.label}
                        className="contact-v2__card"
                        {...(item.href ? { href: item.href } : {})}
                      >
                        <div className="contact-v2__card-icon">{item.icon}</div>
                        <div>
                          <div className="contact-v2__card-label">{item.label}</div>
                          <div className="contact-v2__card-value">{item.value}</div>
                        </div>
                      </Tag>
                    );
                  })}
                </div>

                <div className="contact-v2__socials">
                  <span className="contact-v2__socials-label">Follow us</span>
                  <div className="contact-v2__socials-links">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M4.5 6.5v6h-2v-6h2zm-1-3.5a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM13.5 12.5h-2V9.7c0-.7-.25-1.2-.9-1.2-.5 0-.8.33-.9.65-.05.12-.06.28-.06.44v2.91h-2s.03-4.72 0-5.21h2v.74a2 2 0 011.8-1c1.3 0 2.06.85 2.06 2.68v2.79z"/></svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M9.3 6.8L14.2 1h-1.2L8.8 6l-3.3-5H2l5.1 7.4L2 15h1.2l4.5-5.2 3.6 5.2H14L9.3 6.8zm-1.6 1.8l-.5-.7L3.8 2h1.7l3.2 4.6.5.7 4.2 6H11.7L7.7 8.6z"/></svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.4c2.1 0 2.4 0 3.2.05.8.04 1.2.16 1.5.27.4.15.6.33.9.6.3.3.5.5.6.9.1.3.23.7.27 1.5.04.8.05 1.1.05 3.2s0 2.4-.05 3.2c-.04.8-.16 1.2-.27 1.5-.15.4-.33.6-.6.9-.3.3-.5.5-.9.6-.3.1-.7.23-1.5.27-.8.04-1.1.05-3.2.05s-2.4 0-3.2-.05c-.8-.04-1.2-.16-1.5-.27a2.5 2.5 0 01-.9-.6c-.3-.3-.5-.5-.6-.9-.1-.3-.23-.7-.27-1.5C1.44 10.4 1.4 10.1 1.4 8s0-2.4.05-3.2c.04-.8.16-1.2.27-1.5.15-.4.33-.6.6-.9.3-.3.5-.5.9-.6.3-.1.7-.23 1.5-.27C5.6 1.44 5.9 1.4 8 1.4zM8 0C5.8 0 5.5 0 4.7.05 3.9.1 3.3.2 2.8.4a3.9 3.9 0 00-1.4.9A3.9 3.9 0 00.4 2.8C.2 3.3.1 3.9.05 4.7 0 5.5 0 5.8 0 8s0 2.5.05 3.3c.05.8.15 1.4.35 1.9.2.5.45.9.9 1.4.4.4.9.7 1.4.9.5.2 1.1.3 1.9.35.8.05 1.1.05 3.3.05s2.5 0 3.3-.05c.8-.05 1.4-.15 1.9-.35.5-.2.9-.45 1.4-.9.4-.4.7-.9.9-1.4.2-.5.3-1.1.35-1.9.05-.8.05-1.1.05-3.3s0-2.5-.05-3.3c-.05-.8-.15-1.4-.35-1.9a3.9 3.9 0 00-.9-1.4A3.9 3.9 0 0013.2.4C12.7.2 12.1.1 11.3.05 10.5 0 10.2 0 8 0zm0 3.9a4.1 4.1 0 100 8.2 4.1 4.1 0 000-8.2zm0 6.8a2.7 2.7 0 110-5.4 2.7 2.7 0 010 5.4zm4.3-7a1 1 0 100-2 1 1 0 000 2z"/></svg>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right - Form */}
            <div className="contact-v2__form-wrap">
              <Reveal direction="right">
                <form className="contact-v2__form" onSubmit={handleSubmit}>
                  <h3 className="contact-v2__form-title">Send us a message</h3>
                  {submitStatus === 'success' && (
                    <div className="contact-v2__alert contact-v2__alert--success">{submitMessage}</div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="contact-v2__alert contact-v2__alert--error">{submitMessage}</div>
                  )}
                  {fields.map((field) => (
                    <div key={field.name} className="contact-v2__field">
                      <input
                        type={field.type}
                        placeholder={field.label}
                        className="contact-v2__input"
                        onFocus={() => handleFocus(field.name)}
                        onBlur={() => handleBlur(field.name)}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                    </div>
                  ))}
                  <div className="contact-v2__field">
                    <textarea
                      placeholder="Tell us about your project..."
                      className="contact-v2__textarea"
                      onFocus={() => handleFocus('details')}
                      onBlur={() => handleBlur('details')}
                      onChange={(e) => handleChange('details', e.target.value)}
                    />
                  </div>
                  <button type="submit" className="contact-v2__submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                    {!submitting && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
