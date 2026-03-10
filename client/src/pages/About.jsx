import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import AnimatedCounter from '../components/AnimatedCounter';
import { useContent } from '../hooks/useContent';

const values = [
  { icon: '💡', title: 'Innovation', desc: 'We embrace cutting-edge technologies to deliver modern, future-proof solutions.' },
  { icon: '✨', title: 'Quality', desc: 'Every line of code, every pixel — crafted with precision and attention to detail.' },
  { icon: '🤝', title: 'Transparency', desc: 'Open communication and honest collaboration throughout every project.' },
  { icon: '📈', title: 'Results', desc: 'We measure success by the impact we create for our clients\' businesses.' },
];

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We deep-dive into your business, users, and goals to define the perfect strategy.', icon: '🔍' },
  { num: '02', title: 'Design', desc: 'Pixel-perfect wireframes and prototypes crafted for maximum user engagement.', icon: '🎨' },
  { num: '03', title: 'Develop', desc: 'Clean, scalable code built with modern tech stacks and best practices.', icon: '⚙️' },
  { num: '04', title: 'Launch & Scale', desc: 'Seamless deployment, monitoring, and continuous optimization for growth.', icon: '🚀' },
];

const localTeam = [
  { name: 'Alex Johnson', role: 'CEO & Founder', initials: 'AJ' },
  { name: 'Sarah Chen', role: 'CTO', initials: 'SC' },
  { name: 'Mike Rivera', role: 'Lead Designer', initials: 'MR' },
  { name: 'Priya Sharma', role: 'Head of Marketing', initials: 'PS' },
];

export default function About() {
  const { data: team = localTeam } = useContent('team', '/api/team');

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
              About Havos
            </motion.span>
            <motion.h1
              className="about-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              We Build <span className="about-hero__accent">Digital Excellence</span>
            </motion.h1>
            <motion.p
              className="about-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              A team of passionate developers, designers, and strategists dedicated to helping businesses thrive in the digital age.
            </motion.p>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== WHO WE ARE + STATS ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="about-intro">
            <div className="about-intro__left">
              <Reveal direction="left">
                <span className="chip">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--blue)"><path d="M7 0l1.5 4.5L13 7l-4.5 1.5L7 13l-1.5-4.5L1 7l4.5-1.5z"/></svg>
                  Who We Are
                </span>
                <h2 className="about-intro__title">
                  Transforming <span className="gradient-text">Ideas</span> into Digital Reality
                </h2>
                <p className="about-intro__text">
                  Havos is a digital transformation and IT services company dedicated to helping businesses
                  grow through technology. We combine strategic thinking with technical expertise to deliver
                  solutions that make a real impact.
                </p>
                <p className="about-intro__text">
                  With expertise spanning web development, AI, cybersecurity, and digital marketing,
                  we deliver comprehensive solutions that address the full spectrum of digital challenges.
                </p>
                <div className="about-intro__actions">
                  <Link to="/contact" className="dbtn dbtn--primary">
                    Work With Us
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  <Link to="/services" className="dbtn dbtn--outline-light" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    Our Services
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="about-intro__right">
              <Reveal direction="right">
                <div className="about-intro__stats-grid">
                  <div className="about-intro__stat-card">
                    <AnimatedCounter value={50} suffix="+" className="about-intro__stat-num" />
                    <span className="about-intro__stat-label">Projects Delivered</span>
                  </div>
                  <div className="about-intro__stat-card about-intro__stat-card--accent">
                    <AnimatedCounter value={2000} suffix="+" className="about-intro__stat-num" />
                    <span className="about-intro__stat-label">Happy Clients</span>
                  </div>
                  <div className="about-intro__stat-card about-intro__stat-card--accent">
                    <AnimatedCounter value={98} suffix="%" className="about-intro__stat-num" />
                    <span className="about-intro__stat-label">Client Satisfaction</span>
                  </div>
                  <div className="about-intro__stat-card">
                    <AnimatedCounter value={24} suffix="/7" className="about-intro__stat-num" />
                    <span className="about-intro__stat-label">Support Available</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR MISSION ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <div className="about-mission">
            <Reveal>
              <div className="about-mission__header">
                <span className="chip">Our Mission</span>
                <h2 className="about-mission__title">
                  Empowering Businesses with <span className="gradient-text">Technology</span>
                </h2>
                <p className="about-mission__desc">
                  To empower businesses of all sizes with innovative digital solutions that drive growth,
                  improve efficiency, and create meaningful connections with their customers.
                </p>
              </div>
            </Reveal>

            <div className="about-values">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="about-value">
                    <div className="about-value__icon">{v.icon}</div>
                    <h3 className="about-value__title">{v.title}</h3>
                    <p className="about-value__desc">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR PROCESS ===== */}
      <section className="section-v2">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">How We Work</span>
              <h2 className="section-v2__title">
                Our <span className="gradient-text">Process</span>
              </h2>
              <p className="section-v2__desc">
                A proven methodology that delivers results every time.
              </p>
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

      {/* ===== OUR TEAM ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">Our Team</span>
              <h2 className="section-v2__title">
                Meet the <span className="gradient-text">Experts</span>
              </h2>
              <p className="section-v2__desc" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Talented professionals who bring your vision to life.
              </p>
            </div>
          </Reveal>

          <div className="about-team">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="about-team__card">
                  <div className="about-team__avatar">{member.initials}</div>
                  <h3 className="about-team__name">{member.name}</h3>
                  <p className="about-team__role">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="about-cta">
            <Reveal>
              <h2 className="about-cta__title">Ready to work with us?</h2>
              <p className="about-cta__desc">
                Let's discuss how we can help transform your business with our digital expertise.
              </p>
              <Link to="/contact" className="dbtn dbtn--primary" style={{ fontSize: 16, padding: '16px 36px' }}>
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
