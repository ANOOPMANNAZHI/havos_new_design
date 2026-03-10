import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { caseStudies as localCaseStudies } from '../data/caseStudies';
import { useContent } from '../hooks/useContent';
import Reveal from '../components/Reveal';

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { data: caseStudies = localCaseStudies } = useContent('caseStudies', '/api/case-studies');

  const allTags = ['All', ...new Set(caseStudies.flatMap((cs) => cs.tags))];

  const filtered =
    activeFilter === 'All'
      ? caseStudies
      : caseStudies.filter((cs) => cs.tags.includes(activeFilter));

  return (
    <>
      {/* ===== CREATIVE HERO ===== */}
      <section className="cs-hero">
        <div className="cs-hero__bg">
          <div className="cs-hero__gradient" />
          <div className="cs-hero__grid" />
          <div className="cs-hero__glow cs-hero__glow--1" />
          <div className="cs-hero__glow cs-hero__glow--2" />
        </div>

        <div className="container">
          <div className="cs-hero__layout">
            {/* Left - text */}
            <div className="cs-hero__text">
              <motion.span
                className="dhero__eyebrow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="dhero__eyebrow-dot" />
                Our Work
              </motion.span>
              <motion.h1
                className="cs-hero__title"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Case <span className="cs-hero__accent">Studies</span>
              </motion.h1>
              <motion.p
                className="cs-hero__desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Real projects, real results. See how we've helped businesses
                transform through technology.
              </motion.p>

              <motion.div
                className="cs-hero__stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="cs-hero__stat">
                  <span className="cs-hero__stat-num">50+</span>
                  <span className="cs-hero__stat-label">Projects Delivered</span>
                </div>
                <div className="cs-hero__stat-divider" />
                <div className="cs-hero__stat">
                  <span className="cs-hero__stat-num">98%</span>
                  <span className="cs-hero__stat-label">Client Satisfaction</span>
                </div>
                <div className="cs-hero__stat-divider" />
                <div className="cs-hero__stat">
                  <span className="cs-hero__stat-num">12+</span>
                  <span className="cs-hero__stat-label">Industries Served</span>
                </div>
              </motion.div>
            </div>

            {/* Right - floating cards visual */}
            <div className="cs-hero__visual">
              {/* Main card */}
              <motion.div
                className="cs-hero__card cs-hero__card--main"
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="cs-hero__card-bar" style={{ background: 'linear-gradient(135deg, #2B5CFF, #6B8CFF)' }} />
                <div className="cs-hero__card-body">
                  <span className="cs-hero__card-label">Latest Project</span>
                  <span className="cs-hero__card-title">E-Commerce Platform</span>
                  <div className="cs-hero__card-metric">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12l4-4 3 3 5-7" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ color: '#10B981' }}>+45% conversions</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card 1 */}
              <motion.div
                className="cs-hero__card cs-hero__card--float1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="cs-hero__mini-chart">
                  <div className="cs-hero__chart-bar" style={{ height: '40%' }} />
                  <div className="cs-hero__chart-bar" style={{ height: '65%' }} />
                  <div className="cs-hero__chart-bar cs-hero__chart-bar--active" style={{ height: '90%' }} />
                  <div className="cs-hero__chart-bar" style={{ height: '55%' }} />
                  <div className="cs-hero__chart-bar" style={{ height: '75%' }} />
                </div>
                <span className="cs-hero__card-tiny">Revenue Growth</span>
              </motion.div>

              {/* Floating stat card 2 */}
              <motion.div
                className="cs-hero__card cs-hero__card--float2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="cs-hero__circle-progress">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(43,92,255,0.15)" strokeWidth="4" />
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#2B5CFF" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="25" strokeLinecap="round" transform="rotate(-90 24 24)" />
                  </svg>
                  <span className="cs-hero__circle-num">98%</span>
                </div>
                <span className="cs-hero__card-tiny">Satisfaction</span>
              </motion.div>

              {/* Floating tech pills */}
              <motion.div
                className="cs-hero__card cs-hero__card--float3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="cs-hero__tech-pills">
                  <span>React</span>
                  <span>AI/ML</span>
                  <span>Cloud</span>
                </div>
              </motion.div>

              {/* Connection lines (decorative) */}
              <div className="cs-hero__connector cs-hero__connector--1" />
              <div className="cs-hero__connector cs-hero__connector--2" />
            </div>
          </div>
        </div>

        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="section-v2">
        <div className="container">
          <Reveal>
            <div className="cs-filters">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`cs-filter ${activeFilter === tag ? 'cs-filter--active' : ''}`}
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>

          {/* ===== PROJECT CARDS ===== */}
          <div className="cs-projects">
            <AnimatePresence mode="popLayout">
              {filtered.map((cs, i) => (
                <motion.div
                  key={cs.number}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="cs-project">
                    {/* Visual */}
                    <div className="cs-project__visual" style={{ background: cs.gradient }}>
                      <div className="cs-project__rings">
                        <div />
                        <div />
                        <div />
                      </div>
                      <div className="cs-project__icon-wrap">
                        <span>◆</span>
                      </div>
                      <span className="cs-project__number">{cs.number}</span>
                    </div>

                    {/* Info */}
                    <div className="cs-project__info">
                      <div className="cs-project__header">
                        <span className="cs-project__client">{cs.client}</span>
                        <h3 className="cs-project__title">{cs.title}</h3>
                        <p className="cs-project__desc">{cs.description}</p>
                      </div>

                      {/* Challenge & Solution */}
                      <div className="cs-project__details">
                        <div className="cs-project__detail">
                          <span className="cs-project__detail-label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v4l2.5 1.5M14 8a6 6 0 11-12 0 6 6 0 0112 0z" stroke="var(--blue)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Challenge
                          </span>
                          <p className="cs-project__detail-text">{cs.challenge}</p>
                        </div>
                        <div className="cs-project__detail">
                          <span className="cs-project__detail-label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 5l-5.5 6L3 7.5" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Solution
                          </span>
                          <p className="cs-project__detail-text">{cs.solution}</p>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="cs-project__results">
                        {cs.results.map((r) => (
                          <div key={r.label} className="cs-project__result">
                            <span className="cs-project__result-metric">{r.metric}</span>
                            <span className="cs-project__result-label">{r.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="cs-project__tags">
                        {cs.tags.map((t) => (
                          <span key={t} className="pill">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="faq-v2__cta">
              <h2 className="faq-v2__cta-title">Have a project in mind?</h2>
              <p className="faq-v2__cta-desc">
                Let's discuss how we can deliver similar results for your business.
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
