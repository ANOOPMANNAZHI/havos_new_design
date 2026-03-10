import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { services as localServices } from '../data/services';
import { caseStudies as localCaseStudies } from '../data/caseStudies';
import Reveal from '../components/Reveal';
import AnimatedCounter from '../components/AnimatedCounter';
import MagneticButton from '../components/MagneticButton';
import WaveText from '../components/WaveText';
import useMousePosition from '../hooks/useMousePosition';
import { useContent } from '../hooks/useContent';

const serviceMarqueeItems = [
  'Website Development', 'UX/UI Design', 'Digital Marketing',
  'Cybersecurity', 'AI Automation', 'E-Commerce', 'IT Consulting', 'Cloud Solutions',
];

const localClients = [
  'TechFlow', 'RetailMax', 'MedConnect', 'EduGrowth', 'QuickServe',
  'FinanceHub', 'CloudNova', 'DataPrime', 'NextGen Labs', 'UrbanEdge',
  'SkyBridge', 'CoreStack', 'VelocityIO', 'PulseMedia', 'ArcDigital',
];

const serviceIcons = ['🌐', '📢', '🛡', '💡', '🤖', '🛒', '💬', '📚'];

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We deep-dive into your business, users, and goals to define the perfect strategy.', icon: '🔍' },
  { num: '02', title: 'Design', desc: 'Pixel-perfect wireframes and prototypes crafted for maximum user engagement.', icon: '🎨' },
  { num: '03', title: 'Develop', desc: 'Clean, scalable code built with modern tech stacks and best practices.', icon: '⚙️' },
  { num: '04', title: 'Launch & Scale', desc: 'Seamless deployment, monitoring, and continuous optimization for growth.', icon: '🚀' },
];

const localTestimonials = [
  { text: 'Havos transformed our entire digital presence. Our conversion rate jumped 45% within the first month.', author: 'Sarah Chen', role: 'CEO, RetailMax', avatar: 'SC' },
  { text: 'The AI automation solution they built saves us 30+ hours every week. Absolutely game-changing.', author: 'James Rivera', role: 'CTO, TechFlow', avatar: 'JR' },
  { text: 'Professional, fast, and incredibly creative. They delivered our LMS ahead of schedule.', author: 'Priya Sharma', role: 'Director, EduGrowth', avatar: 'PS' },
];

const orbSoft = { stiffness: 30, damping: 20 };

export default function Home() {
  const { data: services = localServices } = useContent('services', '/api/services');
  const { data: caseStudies = localCaseStudies } = useContent('caseStudies', '/api/case-studies');
  const { data: testimonials = localTestimonials } = useContent('featuredTestimonials', '/api/testimonials/featured');
  const { data: rawClients } = useContent('clientLogos', '/api/client-logos');
  const clients = rawClients
    ? rawClients.map((c) => (typeof c === 'string' ? c : c.name))
    : localClients;

  const { mouseX, mouseY } = useMousePosition();
  const heroRef = useRef(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const orbX = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), orbSoft);
  const orbY = useSpring(useTransform(mouseY, [-1, 1], [-30, 30]), orbSoft);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCaseStudy((prev) => (prev + 1) % caseStudies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== DARK HERO ===== */}
      <section className="dhero" ref={heroRef}>
        <div className="dhero__bg">
          <div className="dhero__gradient" />
          <div className="dhero__grid" />
          <div className="dhero__glow dhero__glow--1" />
          <div className="dhero__glow dhero__glow--2" />
        </div>

        <div className="container">
          <div className="dhero__layout">
            {/* Left content */}
            <div className="dhero__left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="dhero__eyebrow">
                  <span className="dhero__eyebrow-dot" />
                  Experience The Best IT Solutions
                </span>
              </motion.div>

              <h1 className="dhero__title">
                {['Where', 'Creativity', 'Meets'].map((w, i) => (
                  <motion.span
                    key={w}
                    className="dhero__word"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}{' '}
                  </motion.span>
                ))}
                <br />
                <motion.span
                  className="dhero__word dhero__word--accent"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                >
                  Cutting-Edge{' '}
                </motion.span>
                <motion.span
                  className="dhero__word"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                >
                  Technology
                </motion.span>
              </h1>

              <motion.p
                className="dhero__desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                We help businesses transform through cutting-edge technology,
                strategic design, and data-driven solutions that drive real growth.
              </motion.p>

              <motion.div
                className="dhero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticButton>
                  <Link to="/contact" className="dbtn dbtn--primary">
                    Explore More
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </MagneticButton>
                <Link to="/services" className="dbtn dbtn--outline-light">
                  View All Services
                </Link>
              </motion.div>
            </div>

            {/* Right - creative visual */}
            <div className="dhero__right">
              <div className="dhero__visual-scene">
                {/* Central dashboard card */}
                <motion.div
                  className="dhero__dash"
                  initial={{ opacity: 0, y: 30, rotateX: 8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="dhero__dash-header">
                    <div className="dhero__dash-dots">
                      <span /><span /><span />
                    </div>
                    <span className="dhero__dash-title">Dashboard</span>
                    <span className="dhero__dash-live">
                      <span className="dhero__dash-live-dot" />
                      Live
                    </span>
                  </div>
                  <div className="dhero__dash-body">
                    {/* Stats row */}
                    <div className="dhero__dash-stats">
                      <div className="dhero__dash-stat">
                        <span className="dhero__dash-stat-val">2.4K</span>
                        <span className="dhero__dash-stat-label">Visitors</span>
                        <span className="dhero__dash-stat-change dhero__dash-stat-change--up">+24%</span>
                      </div>
                      <div className="dhero__dash-stat">
                        <span className="dhero__dash-stat-val">$48K</span>
                        <span className="dhero__dash-stat-label">Revenue</span>
                        <span className="dhero__dash-stat-change dhero__dash-stat-change--up">+18%</span>
                      </div>
                      <div className="dhero__dash-stat">
                        <span className="dhero__dash-stat-val">98%</span>
                        <span className="dhero__dash-stat-label">Uptime</span>
                        <span className="dhero__dash-stat-change">Stable</span>
                      </div>
                    </div>
                    {/* Chart area */}
                    <div className="dhero__dash-chart">
                      <div className="dhero__dash-chart-bars">
                        {[35, 55, 40, 70, 60, 85, 75, 90, 65, 80, 95, 70].map((h, i) => (
                          <div key={i} className="dhero__dash-bar-wrap">
                            <div
                              className={`dhero__dash-bar ${i >= 9 ? 'dhero__dash-bar--accent' : ''}`}
                              style={{ height: `${h}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="dhero__dash-chart-line">
                        <svg viewBox="0 0 300 60" fill="none" preserveAspectRatio="none">
                          <path d="M0 50 Q25 45 50 35 T100 28 T150 18 T200 22 T250 10 T300 5" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
                          <path d="M0 50 Q25 45 50 35 T100 28 T150 18 T200 22 T250 10 T300 5 V60 H0Z" fill="url(#areaGrad)" />
                          <defs>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="300" y2="0">
                              <stop offset="0%" stopColor="#2B5CFF" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#2B5CFF" />
                            </linearGradient>
                            <linearGradient id="areaGrad" x1="150" y1="0" x2="150" y2="60">
                              <stop offset="0%" stopColor="#2B5CFF" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#2B5CFF" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card - top right */}
                <motion.div
                  className="dhero__float dhero__float--1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className="dhero__float-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 12l4-4 3 3 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <span className="dhero__float-label">Conversions</span>
                    <span className="dhero__float-val">+45%</span>
                  </div>
                </motion.div>

                {/* Floating card - bottom left */}
                <motion.div
                  className="dhero__float dhero__float--2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <div className="dhero__float-icon" style={{ background: 'rgba(43, 92, 255, 0.15)', color: '#2B5CFF' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <span className="dhero__float-label">Projects</span>
                    <span className="dhero__float-val">50+</span>
                  </div>
                </motion.div>

                {/* Floating card - mid right */}
                <motion.div
                  className="dhero__float dhero__float--3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <div className="dhero__float-stack">
                    <div className="dhero__float-avatar">SC</div>
                    <div className="dhero__float-avatar">JR</div>
                    <div className="dhero__float-avatar">PS</div>
                    <span className="dhero__float-avatar dhero__float-avatar--more">+47</span>
                  </div>
                  <span className="dhero__float-label">Happy Clients</span>
                </motion.div>

                {/* Orbiting service icons */}
                <div className="dhero__orbit">
                  <div className="dhero__orbit-ring" />
                  <motion.div
                    className="dhero__orbit-icon dhero__orbit-icon--1"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: 'center' }}
                  >
                    <span>⚡</span>
                  </motion.div>
                  <motion.div
                    className="dhero__orbit-icon dhero__orbit-icon--2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: 'center' }}
                  >
                    <span>🛡</span>
                  </motion.div>
                  <motion.div
                    className="dhero__orbit-icon dhero__orbit-icon--3"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: 'center' }}
                  >
                    <span>📊</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== SERVICES MARQUEE (blue strip) ===== */}
      <section className="smarquee">
        <div className="smarquee__track">
          {[...serviceMarqueeItems, ...serviceMarqueeItems].map((item, i) => (
            <span key={i} className="smarquee__item">
              <svg className="smarquee__star" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0l2.2 5.8L16 8l-5.8 2.2L8 16l-2.2-5.8L0 8l5.8-2.2z"/>
              </svg>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ===== ABOUT / STATS ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="about-row">
            {/* Left - circular images */}
            <Reveal direction="left">
              <div className="about-row__images">
                <div className="about-row__circle about-row__circle--lg">
                  <img src="/hero-banner.jpg" alt="Team" />
                </div>
                <div className="about-row__circle about-row__circle--sm about-row__circle--top">
                  <div className="about-row__circle-fill">H</div>
                </div>
                <div className="about-row__circle about-row__circle--md about-row__circle--bottom">
                  <div className="about-row__circle-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="var(--blue)" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="var(--blue)"/></svg>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right - text + stats */}
            <div className="about-row__content">
              <Reveal>
                <span className="chip">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--blue)"><path d="M7 0l1.5 4.5L13 7l-4.5 1.5L7 13l-1.5-4.5L1 7l4.5-1.5z"/></svg>
                  About Us
                </span>
                <h2 className="section-v2__title" style={{ textAlign: 'left', marginTop: 16 }}>
                  Transforming <span className="gradient-text">Ideas</span> into Digital Reality
                </h2>
                <p className="about-row__text">
                  We are a team of passionate developers, designers, and strategists dedicated to
                  helping businesses thrive in the digital age. With expertise spanning web development,
                  AI, cybersecurity, and digital marketing, we deliver solutions that make an impact.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="about-row__stats">
                  <div className="about-row__stat">
                    <AnimatedCounter value={150} suffix="+" className="about-row__stat-num" />
                    <span className="about-row__stat-label">Team Members</span>
                  </div>
                  <div className="about-row__stat">
                    <AnimatedCounter value={2000} suffix="+" className="about-row__stat-num" />
                    <span className="about-row__stat-label">Happy Clients</span>
                  </div>
                  <div className="about-row__stat">
                    <AnimatedCounter value={99} suffix="%" className="about-row__stat-num" />
                    <span className="about-row__stat-label">Client Satisfaction</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">Our Services</span>
              <h2 className="section-v2__title">
                What We <span className="gradient-text">Do Best</span>
              </h2>
              <p className="section-v2__desc">
                End-to-end digital services designed to accelerate your growth.
              </p>
            </div>
          </Reveal>

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

      {/* ===== PROCESS ===== */}
      <section className="section-v2">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">How We Work</span>
              <h2 className="section-v2__title">
                Our <span className="gradient-text">Process</span>
              </h2>
            </div>
          </Reveal>

          <div className="process-v2">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="process-v2__card">
                  <div className="process-v2__connector" />
                  <div className="process-v2__icon">{step.icon}</div>
                  <span className="process-v2__num">{step.num}</span>
                  <h3 className="process-v2__title">{step.title}</h3>
                  <p className="process-v2__desc">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">Our Work</span>
              <h2 className="section-v2__title">
                Featured <span className="gradient-text">Case Studies</span>
              </h2>
            </div>
          </Reveal>

          <div className="cases-v2">
            <div className="cases-v2__list">
              {caseStudies.map((cs, i) => (
                <Reveal key={cs.number} delay={i * 0.06}>
                  <div
                    className={`cases-v2__item ${i === activeCaseStudy ? 'cases-v2__item--active' : ''}`}
                    onMouseEnter={() => setActiveCaseStudy(i)}
                    onClick={() => setActiveCaseStudy(i)}
                  >
                    <div className="cases-v2__item-indicator" style={{ background: cs.color }} />
                    <div className="cases-v2__item-body">
                      <span className="cases-v2__item-num">{cs.number}</span>
                      <h3 className="cases-v2__item-title">{cs.title}</h3>
                      <p className="cases-v2__item-client">{cs.client}</p>
                    </div>
                    <span className="cases-v2__item-arrow">→</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="cases-v2__preview">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCaseStudy}
                  className="cases-v2__card"
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="cases-v2__card-visual" style={{ background: caseStudies[activeCaseStudy].gradient }}>
                    <div className="cases-v2__card-rings"><div /><div /><div /></div>
                    <div className="cases-v2__card-icon-wrap"><span>◆</span></div>
                  </div>
                  <div className="cases-v2__card-info">
                    <span className="cases-v2__card-client">{caseStudies[activeCaseStudy].client}</span>
                    <h3 className="cases-v2__card-title">{caseStudies[activeCaseStudy].title}</h3>
                    <p className="cases-v2__card-desc">{caseStudies[activeCaseStudy].description}</p>
                    <div className="cases-v2__card-tags">
                      {caseStudies[activeCaseStudy].tags.map((t) => (
                        <span key={t} className="pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-v2">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">Testimonials</span>
              <h2 className="section-v2__title">
                What Our Clients <span className="gradient-text">Say</span>
              </h2>
            </div>
          </Reveal>

          <div className="testimonials-v2">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="testimonial-v2">
                  <div className="testimonial-v2__stars">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="#FFB800"><path d="M8 0l2.47 4.94L16 5.77l-4 3.87.94 5.5L8 12.67l-4.94 2.47.94-5.5-4-3.87 5.53-.83z"/></svg>
                    ))}
                  </div>
                  <p className="testimonial-v2__text">{t.text}</p>
                  <div className="testimonial-v2__author">
                    <div className="testimonial-v2__avatar">{t.avatar}</div>
                    <div>
                      <div className="testimonial-v2__name">{t.author}</div>
                      <div className="testimonial-v2__role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR CLIENTS ===== */}
      <section className="clients-v2">
        <div className="container">
          <Reveal>
            <div className="clients-v2__header">
              <span className="chip">Our Clients</span>
              <h2 className="clients-v2__title">Trusted by Leading Brands</h2>
              <p className="clients-v2__desc">We've partnered with innovative companies across industries to deliver impactful digital solutions.</p>
            </div>
          </Reveal>
        </div>

        <div className="clients-v2__marquee">
          <div className="clients-v2__track">
            {[...clients, ...clients].map((name, i) => (
              <div key={i} className="clients-v2__logo-card">
                <img src={`/clients/${name.toLowerCase().replace(/\s+/g, '-')}.png`} alt={name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <span className="clients-v2__logo-fallback" style={{ display: 'none' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="clients-v2__marquee clients-v2__marquee--reverse">
          <div className="clients-v2__track clients-v2__track--reverse">
            {[...clients.slice().reverse(), ...clients.slice().reverse()].map((name, i) => (
              <div key={i} className="clients-v2__logo-card">
                <img src={`/clients/${name.toLowerCase().replace(/\s+/g, '-')}.png`} alt={name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <span className="clients-v2__logo-fallback" style={{ display: 'none' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-v2">
        <div className="container">
          <div className="cta-v2__card">
            <motion.div className="cta-v2__orb cta-v2__orb--1" style={{ x: orbX, y: orbY }} />
            <motion.div className="cta-v2__orb cta-v2__orb--2" style={{ x: orbX, y: orbY }} />
            <div className="cta-v2__dots" />

            <div className="cta-v2__layout">
              {/* Left content */}
              <div className="cta-v2__left">
                <Reveal direction="left">
                  <span className="cta-v2__eyebrow">
                    <span className="cta-v2__eyebrow-dot" />
                    Let's Work Together
                  </span>
                  <h2 className="cta-v2__title">
                    Ready to Build<br />
                    <span className="cta-v2__highlight">Something Great?</span>
                  </h2>
                  <p className="cta-v2__desc">
                    Partner with us to transform your ideas into powerful digital solutions that drive real business growth.
                  </p>
                  <div className="cta-v2__actions">
                    <MagneticButton>
                      <Link to="/contact" className="cta-v2__btn">
                        Start Your Project
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                    </MagneticButton>
                    <a href="mailto:hello@havos.com" className="cta-v2__email">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 5l7 4.5L16 5M2 5v8h14V5H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      hello@havos.com
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Right trust signals */}
              <div className="cta-v2__right">
                <Reveal direction="right">
                  <div className="cta-v2__trust">
                    <div className="cta-v2__trust-item">
                      <div className="cta-v2__trust-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <div className="cta-v2__trust-num">50+</div>
                        <div className="cta-v2__trust-label">Projects Delivered</div>
                      </div>
                    </div>
                    <div className="cta-v2__trust-item">
                      <div className="cta-v2__trust-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <div className="cta-v2__trust-num">2,000+</div>
                        <div className="cta-v2__trust-label">Happy Clients</div>
                      </div>
                    </div>
                    <div className="cta-v2__trust-item">
                      <div className="cta-v2__trust-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <div className="cta-v2__trust-num">98%</div>
                        <div className="cta-v2__trust-label">Client Satisfaction</div>
                      </div>
                    </div>
                    <div className="cta-v2__trust-item">
                      <div className="cta-v2__trust-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="var(--blue)" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"/></svg>
                      </div>
                      <div>
                        <div className="cta-v2__trust-num">24/7</div>
                        <div className="cta-v2__trust-label">Support Available</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
