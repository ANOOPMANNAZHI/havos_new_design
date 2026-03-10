import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services as localServices } from '../data/services';
import { useContent } from '../hooks/useContent';
import Reveal from '../components/Reveal';

const serviceIcons = {
  'web-app-development': '🌐',
  'digital-marketing': '📢',
  'cybersecurity': '🛡',
  'it-consulting': '💡',
  'ai-automation': '🤖',
  'ecommerce': '🛒',
  'whatsapp-automation': '💬',
  'custom-lms': '📚',
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const localService = localServices.find((s) => s.slug === slug);
  const { data: service = localService } = useContent(['service', slug], `/api/services/${slug}`);
  const { data: allServices = localServices } = useContent('services', '/api/services');
  const currentIndex = allServices.findIndex((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* ===== DARK HERO ===== */}
      <section className="sd-hero">
        <div className="sd-hero__bg">
          <div className="about-hero__gradient" />
          <div className="about-hero__grid" />
        </div>
        <div className="container">
          <div className="sd-hero__content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link to="/services" className="sd-hero__back">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3m0 0l4-4M3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                All Services
              </Link>
            </motion.div>

            <motion.div
              className="sd-hero__icon-wrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="sd-hero__icon">{serviceIcons[slug] || '⚡'}</span>
              <span className="sd-hero__number">{service.number}</span>
            </motion.div>

            <motion.h1
              className="sd-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {service.title}
            </motion.h1>

            <motion.p
              className="sd-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {service.description}
            </motion.p>

            <motion.div
              className="sd-hero__tags"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {service.tags.map((t) => (
                <span key={t} className="sd-hero__tag">{t}</span>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== DETAILED DESCRIPTION ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="sd-content">
            <div className="sd-content__main">
              <Reveal>
                <span className="chip">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--blue)"><path d="M7 0l1.5 4.5L13 7l-4.5 1.5L7 13l-1.5-4.5L1 7l4.5-1.5z"/></svg>
                  Overview
                </span>
                <h2 className="sd-content__title">
                  What we <span className="gradient-text">deliver</span>
                </h2>
                <p className="sd-content__text">{service.fullDescription}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="sd-features">
                  <h3 className="sd-features__heading">Key Capabilities</h3>
                  <div className="sd-features__grid">
                    {service.tags.map((tag) => (
                      <div key={tag} className="sd-feature">
                        <div className="sd-feature__icon">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 4.5L7 13l-4-3.5" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span className="sd-feature__text">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="sd-content__sidebar">
              <Reveal direction="right">
                <div className="sd-cta-card">
                  <div className="sd-cta-card__icon">{serviceIcons[slug] || '⚡'}</div>
                  <h3 className="sd-cta-card__title">Interested in {service.title}?</h3>
                  <p className="sd-cta-card__desc">Let's discuss how we can help your business with this service.</p>
                  <Link to="/contact" className="dbtn dbtn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Get a Quote
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  <a href="mailto:hello@havos.com" className="sd-cta-card__email">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4M2 4v8h12V4H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    hello@havos.com
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OTHER SERVICES ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">Explore More</span>
              <h2 className="section-v2__title">
                Other <span className="gradient-text">Services</span>
              </h2>
            </div>
          </Reveal>

          <div className="sd-other-services">
            {otherServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link to={`/services/${s.slug}`} className="sd-other-card">
                  <div className="sd-other-card__top">
                    <span className="sd-other-card__icon">{serviceIcons[s.slug] || '⚡'}</span>
                    <span className="sd-other-card__num">{s.number}</span>
                  </div>
                  <h3 className="sd-other-card__title">{s.title}</h3>
                  <p className="sd-other-card__desc">{s.description}</p>
                  <span className="sd-other-card__link">
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
