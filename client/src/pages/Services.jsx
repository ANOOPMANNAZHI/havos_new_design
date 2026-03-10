import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services as localServices } from '../data/services';
import { useContent } from '../hooks/useContent';
import Reveal from '../components/Reveal';

const serviceIcons = ['🌐', '📢', '🛡', '💡', '🤖', '🛒', '💬', '📚'];

export default function Services() {
  const { data: services = localServices } = useContent('services', '/api/services');

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
              Our Services
            </motion.span>
            <motion.h1
              className="about-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              What We <span className="about-hero__accent">Do Best</span>
            </motion.h1>
            <motion.p
              className="about-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              From web development to AI automation, we offer a comprehensive suite of
              digital services tailored to your business needs.
            </motion.p>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="services-v2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link to={`/services/${s.slug}`} className="service-v2">
                  <div className="service-v2__glow" />
                  <div className="service-v2__top">
                    <span className="service-v2__icon">{serviceIcons[i]}</span>
                    <span className="service-v2__num">{s.number}</span>
                  </div>
                  <h3 className="service-v2__title">{s.title}</h3>
                  <p className="service-v2__desc">{s.description}</p>
                  <div className="service-v2__footer">
                    <div className="service-v2__tags">
                      {s.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="pill">{tag}</span>
                      ))}
                    </div>
                    <span className="service-v2__arrow">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-v2" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-cta">
            <Reveal>
              <h2 className="about-cta__title">Not sure which service you need?</h2>
              <p className="about-cta__desc">
                Let's chat about your project and we'll recommend the best solution for your business.
              </p>
              <Link to="/contact" className="dbtn dbtn--primary" style={{ fontSize: 16, padding: '16px 36px' }}>
                Talk to Us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
