import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useContent } from '../hooks/useContent';

const localFaqCategories = [
  {
    category: 'General',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4m0 3h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
    items: [
      {
        q: 'What services does Havos offer?',
        a: 'We offer a comprehensive range of digital services including web and app development, digital marketing, cybersecurity, IT consulting, AI & workflow automation, e-commerce solutions, WhatsApp automation, and custom learning management systems.',
      },
      {
        q: 'How long does a typical project take?',
        a: 'Project timelines vary based on scope and complexity. A simple website may take 2-4 weeks, while a complex web application or custom platform can take 2-6 months. We provide detailed timelines during our discovery phase.',
      },
      {
        q: 'Do you work with startups or only established businesses?',
        a: 'We work with businesses of all sizes — from early-stage startups to established enterprises. Our solutions are tailored to your specific needs and budget, regardless of your company size.',
      },
    ],
  },
  {
    category: 'Technical',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 7l-4 3 4 3m6-6l4 3-4 3m-2-8l-2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    items: [
      {
        q: 'What technologies do you use?',
        a: 'We work with modern technologies including React, Next.js, Node.js, Python, cloud platforms (AWS, GCP, Azure), and various AI/ML frameworks. We choose the best tech stack based on your project requirements.',
      },
      {
        q: 'Can you integrate with our existing systems?',
        a: 'Absolutely. We specialize in building solutions that integrate seamlessly with your existing tech stack — whether that\'s CRM systems, payment gateways, third-party APIs, or legacy databases. We assess your current infrastructure during discovery.',
      },
      {
        q: 'Do you follow agile development practices?',
        a: 'Yes, we follow agile methodology with regular sprint cycles, stand-ups, and demos. You\'ll have full visibility into progress through our project management tools and regular status updates.',
      },
    ],
  },
  {
    category: 'Pricing & Support',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v16m4-12H8a2 2 0 100 4h4a2 2 0 110 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    items: [
      {
        q: 'How does your pricing work?',
        a: 'We offer flexible pricing models including fixed-price projects, hourly retainers, and monthly subscriptions. After understanding your requirements during our free consultation, we provide a detailed proposal with transparent pricing — no hidden fees.',
      },
      {
        q: 'Do you provide ongoing support after project delivery?',
        a: 'Yes, we offer comprehensive post-launch support and maintenance packages. This includes bug fixes, performance monitoring, security updates, and feature enhancements to ensure your solution continues to perform optimally.',
      },
      {
        q: 'What is your payment structure?',
        a: 'For fixed-price projects, we typically follow a milestone-based payment structure — an initial deposit, mid-project payment, and final payment upon delivery. Retainer and subscription clients are billed monthly.',
      },
    ],
  },
  {
    category: 'Process',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4h4v4H4zm8 0h4v4h-4zM4 12h4v4H4zm8 2a2 2 0 104 0 2 2 0 00-4 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    items: [
      {
        q: 'What does the onboarding process look like?',
        a: 'After our initial consultation, we proceed with a discovery phase where we deep-dive into your requirements, target audience, and goals. We then present a project roadmap, assign a dedicated team, and kick off development with regular check-ins.',
      },
      {
        q: 'How do you ensure project quality?',
        a: 'We follow rigorous quality assurance practices including code reviews, automated testing, manual QA testing, and performance audits. Every deliverable goes through multiple review cycles before reaching you.',
      },
      {
        q: 'Can I see progress during development?',
        a: 'Absolutely. We provide access to a staging environment where you can review progress in real-time. Combined with regular demos and sprint reviews, you\'ll always know exactly where your project stands.',
      },
    ],
  },
];

export default function FAQ() {
  const { data: faqCategories = localFaqCategories } = useContent('faq', '/api/faq');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
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
              FAQ
            </motion.span>
            <motion.h1
              className="about-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Frequently Asked <span className="about-hero__accent">Questions</span>
            </motion.h1>
            <motion.p
              className="about-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
            </motion.p>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== FAQ SECTIONS ===== */}
      <section className="section-v2">
        <div className="container" style={{ maxWidth: 860 }}>
          {faqCategories.map((cat, catIndex) => (
            <Reveal key={cat.category} delay={catIndex * 0.08}>
              <div className="faq-v2__category">
                <div className="faq-v2__category-header">
                  <span className="faq-v2__category-icon">{cat.icon}</span>
                  <h2 className="faq-v2__category-title">{cat.category}</h2>
                </div>
                <div className="faq-v2__list">
                  {cat.items.map((faq, i) => {
                    const key = `${catIndex}-${i}`;
                    const isOpen = openItems[key];
                    return (
                      <div key={key} className={`faq-v2__item ${isOpen ? 'faq-v2__item--open' : ''}`}>
                        <button
                          className="faq-v2__question"
                          onClick={() => toggleItem(key)}
                        >
                          <span>{faq.q}</span>
                          <motion.span
                            className="faq-v2__icon"
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            +
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              className="faq-v2__answer"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="faq-v2__answer-inner">{faq.a}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="faq-v2__cta">
              <h2 className="faq-v2__cta-title">Still have questions?</h2>
              <p className="faq-v2__cta-desc">
                We're here to help. Reach out to our team and we'll get back to you within 24 hours.
              </p>
              <Link to="/contact" className="dbtn dbtn--primary">
                Contact Us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
