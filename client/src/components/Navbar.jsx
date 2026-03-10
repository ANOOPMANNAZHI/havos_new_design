import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { services as localServices } from '../data/services';
import { useContent } from '../hooks/useContent';

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.2 },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const { data: services = localServices } = useContent(
    'services',
    '/api/services',
    localServices
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const darkHeroPages = ['/', '/about', '/careers', '/contact', '/case-studies', '/faq', '/testimonials', '/privacy', '/terms'];
  const hasDarkHero = darkHeroPages.includes(location.pathname) || location.pathname.startsWith('/services') || location.pathname.startsWith('/blog') || location.pathname.startsWith('/careers/');

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hasDarkHero ? 'navbar--transparent' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar__inner">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/" className="navbar__logo">
            <img src="/logo.png" alt="Havos" />
          </Link>
        </motion.div>

        <div className="navbar__links">
          <Link to="/case-studies" className="navbar__link">Work</Link>
          <Link to="/about" className="navbar__link">About</Link>

          <div
            className="navbar__dropdown-trigger navbar__link"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span>Services</span>
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="navbar__dropdown"
                  initial={{ opacity: 0, y: 8, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: 8, x: '-50%' }}
                  transition={{ duration: 0.2 }}
                >
                  {services.map((s, i) => (
                    <motion.div
                      key={s.slug}
                      variants={dropdownItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                    >
                      <Link to={`/services/${s.slug}`} className="navbar__dropdown-item">
                        <span>{s.number}</span>
                        <span>{s.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/blog" className="navbar__link">Blog</Link>
          <Link to="/careers" className="navbar__link">Careers</Link>
          <Link to="/contact" className="navbar__link">Contact</Link>
          <Link to="/contact" className="btn btn--primary">Start Your Project</Link>
        </div>

        <div
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {[
              { to: '/case-studies', label: 'Work' },
              { to: '/about', label: 'About' },
            ].map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link to={link.to}>{link.label}</Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="navbar__mobile-services-title"
                onClick={() => setServicesOpen(!servicesOpen)}
                style={{ cursor: 'pointer' }}
              >
                Services {servicesOpen ? '−' : '+'}
              </div>
            </motion.div>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  className="navbar__mobile-services"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  {services.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {[
              { to: '/blog', label: 'Blog' },
              { to: '/careers', label: 'Careers' },
              { to: '/contact', label: 'Contact' },
            ].map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
              >
                <Link to={link.to}>{link.label}</Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Link to="/contact" className="btn btn--primary" style={{ marginTop: 24, textAlign: 'center', justifyContent: 'center' }}>
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
