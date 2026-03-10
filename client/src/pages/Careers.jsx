import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { jobs as localJobs } from '../data/careers';
import { useContent } from '../hooks/useContent';

const perks = [
  { icon: '🌍', title: 'Remote First', desc: 'Work from anywhere in the world with flexible hours.' },
  { icon: '📈', title: 'Growth', desc: 'Learning budget, conferences, and career advancement paths.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Market-leading compensation and performance bonuses.' },
  { icon: '🏥', title: 'Benefits', desc: 'Health insurance, paid time off, and wellness programs.' },
];

export default function Careers() {
  const { data: jobs = localJobs } = useContent('careers', '/api/careers');

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
              Careers
            </motion.span>
            <motion.h1
              className="about-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Join Our <span className="about-hero__accent">Team</span>
            </motion.h1>
            <motion.p
              className="about-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              We're looking for talented people who want to build the future of digital technology.
            </motion.p>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== WHY JOIN US ===== */}
      <section className="section-v2">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--blue)"><path d="M7 0l1.5 4.5L13 7l-4.5 1.5L7 13l-1.5-4.5L1 7l4.5-1.5z"/></svg>
                Why Havos
              </span>
              <h2 className="section-v2__title">
                Why You'll <span className="gradient-text">Love It Here</span>
              </h2>
            </div>
          </Reveal>

          <div className="careers-perks">
            {perks.map((perk, i) => (
              <Reveal key={perk.title} delay={i * 0.08}>
                <div className="careers-perk">
                  <div className="careers-perk__icon">{perk.icon}</div>
                  <h3 className="careers-perk__title">{perk.title}</h3>
                  <p className="careers-perk__desc">{perk.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OPEN POSITIONS ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">Open Positions</span>
              <h2 className="section-v2__title">
                Current <span className="gradient-text">Openings</span>
              </h2>
            </div>
          </Reveal>

          <div className="careers-jobs">
            {jobs.map((job, i) => (
              <Reveal key={job.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Link to={`/careers/${job.slug}`} className="careers-job">
                    <div className="careers-job__left">
                      <h3 className="careers-job__title">{job.title}</h3>
                      <div className="careers-job__tags">
                        <span className="careers-job__tag">{job.dept}</span>
                        <span className="careers-job__tag">{job.type}</span>
                        <span className="careers-job__tag">{job.location}</span>
                      </div>
                    </div>
                    <span className="careers-job__arrow">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="careers-note">
              <p>Don't see a role that fits? We're always looking for great talent.</p>
              <a href="mailto:careers@havos.com" className="dbtn dbtn--primary">
                Send Your Resume
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
