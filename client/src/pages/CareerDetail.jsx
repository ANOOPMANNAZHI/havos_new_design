import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jobs as localJobs } from '../data/careers';
import { useContent } from '../hooks/useContent';
import Reveal from '../components/Reveal';

const deptIcons = {
  Engineering: '⚙️',
  Design: '🎨',
  Marketing: '📢',
  Security: '🛡',
};

export default function CareerDetail() {
  const { slug } = useParams();
  const localJob = localJobs.find((j) => j.slug === slug);
  const { data: job = localJob } = useContent(['career', slug], `/api/careers/${slug}`);
  const { data: allJobs = localJobs } = useContent('careers', '/api/careers');

  if (!job) return <Navigate to="/careers" replace />;

  const otherJobs = allJobs.filter((j) => j.slug !== slug).slice(0, 3);

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
              <Link to="/careers" className="sd-hero__back">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3m0 0l4-4M3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                All Openings
              </Link>
            </motion.div>

            <motion.div
              className="sd-hero__icon-wrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="sd-hero__icon">{deptIcons[job.dept] || '💼'}</span>
              <span className="sd-hero__number">{job.dept}</span>
            </motion.div>

            <motion.h1
              className="sd-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {job.title}
            </motion.h1>

            <motion.div
              className="sd-hero__tags"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="sd-hero__tag">{job.type}</span>
              <span className="sd-hero__tag">{job.location}</span>
              <span className="sd-hero__tag">{job.experience}</span>
              <span className="sd-hero__tag">{job.salary}</span>
            </motion.div>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== JOB DETAILS ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="cd-layout">
            <div className="cd-main">
              <Reveal>
                <div className="cd-section">
                  <h2 className="cd-section__title">About the Role</h2>
                  <p className="cd-section__text">{job.description}</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="cd-section">
                  <h2 className="cd-section__title">Responsibilities</h2>
                  <ul className="cd-list">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="cd-list__item">
                        <span className="cd-list__icon">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 4.5L7 13l-4-3.5" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="cd-section">
                  <h2 className="cd-section__title">Requirements</h2>
                  <ul className="cd-list">
                    {job.requirements.map((item, i) => (
                      <li key={i} className="cd-list__item">
                        <span className="cd-list__icon">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 4.5L7 13l-4-3.5" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="cd-sidebar">
              <Reveal direction="right">
                <div className="cd-apply-card">
                  <div className="cd-apply-card__icon">{deptIcons[job.dept] || '💼'}</div>
                  <h3 className="cd-apply-card__title">Apply for this role</h3>
                  <p className="cd-apply-card__desc">Send us your resume and a brief cover letter explaining why you're a great fit.</p>

                  <div className="cd-apply-card__details">
                    <div className="cd-apply-card__detail">
                      <span className="cd-apply-card__label">Type</span>
                      <span className="cd-apply-card__value">{job.type}</span>
                    </div>
                    <div className="cd-apply-card__detail">
                      <span className="cd-apply-card__label">Location</span>
                      <span className="cd-apply-card__value">{job.location}</span>
                    </div>
                    <div className="cd-apply-card__detail">
                      <span className="cd-apply-card__label">Experience</span>
                      <span className="cd-apply-card__value">{job.experience}</span>
                    </div>
                    <div className="cd-apply-card__detail">
                      <span className="cd-apply-card__label">Salary</span>
                      <span className="cd-apply-card__value">{job.salary}</span>
                    </div>
                  </div>

                  <a href="mailto:careers@havos.com" className="dbtn dbtn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Apply Now
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="mailto:careers@havos.com" className="cd-apply-card__email">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4M2 4v8h12V4H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    careers@havos.com
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OTHER OPENINGS ===== */}
      {otherJobs.length > 0 && (
        <section className="section-v2 section-v2--alt">
          <div className="container">
            <Reveal>
              <div className="section-v2__header">
                <span className="chip">More Openings</span>
                <h2 className="section-v2__title">
                  Other <span className="gradient-text">Positions</span>
                </h2>
              </div>
            </Reveal>

            <div className="sd-other-services">
              {otherJobs.map((j, i) => (
                <Reveal key={j.slug} delay={i * 0.08}>
                  <Link to={`/careers/${j.slug}`} className="sd-other-card">
                    <div className="sd-other-card__top">
                      <span className="sd-other-card__icon">{deptIcons[j.dept] || '💼'}</span>
                      <span className="sd-other-card__num">{j.dept}</span>
                    </div>
                    <h3 className="sd-other-card__title">{j.title}</h3>
                    <p className="sd-other-card__desc">{j.description}</p>
                    <span className="sd-other-card__link">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
