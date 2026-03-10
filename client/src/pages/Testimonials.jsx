import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useContent } from '../hooks/useContent';

const localTestimonials = [
  {
    text: 'Havos transformed our entire digital presence. Our conversion rate jumped 45% within the first month of launching the new platform.',
    author: 'Sarah Chen',
    role: 'CEO, RetailMax',
    avatar: 'SC',
    rating: 5,
    project: 'E-Commerce Platform',
  },
  {
    text: 'The AI automation solution they built saves us 30+ hours every week. Absolutely game-changing for our operations team.',
    author: 'James Rivera',
    role: 'CTO, TechFlow',
    avatar: 'JR',
    rating: 5,
    project: 'AI Workflow Automation',
  },
  {
    text: 'Professional, fast, and incredibly creative. They delivered our custom LMS ahead of schedule and under budget.',
    author: 'Priya Sharma',
    role: 'Director, EduGrowth',
    avatar: 'PS',
    rating: 5,
    project: 'Custom LMS Development',
  },
  {
    text: 'Their cybersecurity audit uncovered critical vulnerabilities we had no idea existed. Havos potentially saved us from a major data breach.',
    author: 'Michael Torres',
    role: 'VP Engineering, DataVault',
    avatar: 'MT',
    rating: 5,
    project: 'Security Audit & Remediation',
  },
  {
    text: 'The WhatsApp automation system Havos built handles 80% of our customer inquiries automatically. Response time went from hours to seconds.',
    author: 'Aisha Patel',
    role: 'Head of Support, QuickServe',
    avatar: 'AP',
    rating: 5,
    project: 'WhatsApp Automation',
  },
  {
    text: 'We approached Havos for a simple website redesign. They delivered a complete digital transformation that tripled our online revenue.',
    author: 'David Kim',
    role: 'Founder, Artisan Goods',
    avatar: 'DK',
    rating: 5,
    project: 'Website Redesign',
  },
  {
    text: 'Their digital marketing team took our SEO from page 5 to page 1 in three months. Organic traffic is up 280% year over year.',
    author: 'Elena Rodriguez',
    role: 'Marketing Director, GreenLeaf',
    avatar: 'ER',
    rating: 5,
    project: 'SEO & Digital Marketing',
  },
  {
    text: 'Havos built our entire IT infrastructure from scratch. Their DevOps team set up a CI/CD pipeline that cut our deployment time by 90%.',
    author: 'Robert Chang',
    role: 'CTO, CloudNine SaaS',
    avatar: 'RC',
    rating: 5,
    project: 'IT Infrastructure & DevOps',
  },
  {
    text: 'Working with Havos felt like having an in-house tech team. They understood our vision and executed flawlessly every step of the way.',
    author: 'Fatima Al-Rashid',
    role: 'CEO, NexGen Consulting',
    avatar: 'FA',
    rating: 5,
    project: 'Full-Stack Development',
  },
];

const stats = [
  { number: '98%', label: 'Client Satisfaction' },
  { number: '50+', label: 'Projects Delivered' },
  { number: '4.9', label: 'Average Rating' },
  { number: '95%', label: 'Client Retention' },
];

export default function Testimonials() {
  const { data: testimonials = localTestimonials } = useContent('testimonials', '/api/testimonials');

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
              Testimonials
            </motion.span>
            <motion.h1
              className="about-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              What Our Clients <span className="about-hero__accent">Say</span>
            </motion.h1>
            <motion.p
              className="about-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Real feedback from real clients. See how we've helped businesses grow through digital transformation.
            </motion.p>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="testi-stats">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="testi-stat">
                  <span className="testi-stat__number">{stat.number}</span>
                  <span className="testi-stat__label">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS GRID ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--blue)"><path d="M7 0l1.5 4.5L13 7l-4.5 1.5L7 13l-1.5-4.5L1 7l4.5-1.5z"/></svg>
                Client Stories
              </span>
              <h2 className="section-v2__title">
                Trusted by <span className="gradient-text">Industry Leaders</span>
              </h2>
            </div>
          </Reveal>

          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.06}>
                <div className="testi-card">
                  <div className="testi-card__stars">
                    {[...Array(t.rating)].map((_, j) => (
                      <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="var(--blue)"><path d="M8 0l2.35 4.76 5.25.77-3.8 3.7.9 5.24L8 12.18l-4.7 2.47.9-5.24-3.8-3.7 5.25-.77z"/></svg>
                    ))}
                  </div>
                  <p className="testi-card__text">"{t.text}"</p>
                  <div className="testi-card__project">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10v7H2V4zm3-2h4v2H5V2z" stroke="var(--blue)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {t.project}
                  </div>
                  <div className="testi-card__author">
                    <div className="testi-card__avatar">{t.avatar}</div>
                    <div>
                      <div className="testi-card__name">{t.author}</div>
                      <div className="testi-card__role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-v2">
        <div className="container">
          <Reveal>
            <div className="faq-v2__cta">
              <h2 className="faq-v2__cta-title">Ready to join our success stories?</h2>
              <p className="faq-v2__cta-desc">
                Let's discuss how we can help transform your business with the right digital solutions.
              </p>
              <Link to="/contact" className="dbtn dbtn--primary">
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
