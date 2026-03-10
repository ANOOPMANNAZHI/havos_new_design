import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { useContent } from '../hooks/useContent';

const fallbackServicesCol = [
  { slug: 'web-app-development', label: 'Web Development' },
  { slug: 'digital-marketing', label: 'Digital Marketing' },
  { slug: 'cybersecurity', label: 'Cybersecurity' },
  { slug: 'ai-automation', label: 'AI Automation' },
];

const fallbackSolutionsCol = [
  { slug: 'ecommerce', label: 'E-Commerce' },
  { slug: 'whatsapp-automation', label: 'WhatsApp Automation' },
  { slug: 'custom-lms', label: 'Custom LMS' },
  { slug: 'it-consulting', label: 'IT Consulting' },
];

export default function Footer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  const { data: apiServices } = useContent(
    'services',
    '/api/services',
    null
  );

  // Split API services into two columns (first 4 = Services, rest = Solutions), fallback to hardcoded
  const servicesCol = apiServices
    ? apiServices.slice(0, 4).map(s => ({ slug: s.slug, label: s.title }))
    : fallbackServicesCol;
  const solutionsCol = apiServices
    ? apiServices.slice(4).map(s => ({ slug: s.slug, label: s.title }))
    : fallbackSolutionsCol;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer">
      {/* Top CTA strip */}
      <div className="footer__cta-strip">
        <div className="container">
          <div className="footer__cta-inner">
            <div className="footer__cta-text">
              <h3>Ready to start your next project?</h3>
              <p>Let's build something great together.</p>
            </div>
            <Link to="/contact" className="footer__cta-btn">
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <Reveal>
          <div className="footer__grid">
            <div className="footer__brand">
              <Link to="/">
                <img src="/logo.png" alt="Havos" className="footer__logo" />
              </Link>
              <p className="footer__brand-desc">
                Building digital solutions that drive growth. We transform businesses through technology, design, and strategy.
              </p>
              <div className="footer__brand-contact">
                <a href="mailto:hello@havos.com" className="footer__brand-email">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4M2 4v8h12V4H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  hello@havos.com
                </a>
                <a href="tel:+1234567890" className="footer__brand-email">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3H4a1 1 0 00-1 1c0 5 4 9 9 9a1 1 0 001-1v-2l-3-1-1 1a5 5 0 01-3-3l1-1L6 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  +1 (234) 567-890
                </a>
              </div>
              <div className="footer__brand-socials">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.5 6.5v6h-2v-6h2zm-1-3.5a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM13.5 12.5h-2V9.7c0-.7-.25-1.2-.9-1.2-.5 0-.8.33-.9.65-.05.12-.06.28-.06.44v2.91h-2s.03-4.72 0-5.21h2v.74a2 2 0 011.8-1c1.3 0 2.06.85 2.06 2.68v2.79z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.3 6.8L14.2 1h-1.2L8.8 6l-3.3-5H2l5.1 7.4L2 15h1.2l4.5-5.2 3.6 5.2H14L9.3 6.8zm-1.6 1.8l-.5-.7L3.8 2h1.7l3.2 4.6.5.7 4.2 6H11.7L7.7 8.6z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.4c2.1 0 2.4 0 3.2.05.8.04 1.2.16 1.5.27.4.15.6.33.9.6.3.3.5.5.6.9.1.3.23.7.27 1.5.04.8.05 1.1.05 3.2s0 2.4-.05 3.2c-.04.8-.16 1.2-.27 1.5-.15.4-.33.6-.6.9-.3.3-.5.5-.9.6-.3.1-.7.23-1.5.27-.8.04-1.1.05-3.2.05s-2.4 0-3.2-.05c-.8-.04-1.2-.16-1.5-.27a2.5 2.5 0 01-.9-.6c-.3-.3-.5-.5-.6-.9-.1-.3-.23-.7-.27-1.5C1.44 10.4 1.4 10.1 1.4 8s0-2.4.05-3.2c.04-.8.16-1.2.27-1.5.15-.4.33-.6.6-.9.3-.3.5-.5.9-.6.3-.1.7-.23 1.5-.27C5.6 1.44 5.9 1.4 8 1.4zM8 0C5.8 0 5.5 0 4.7.05 3.9.1 3.3.2 2.8.4a3.9 3.9 0 00-1.4.9A3.9 3.9 0 00.4 2.8C.2 3.3.1 3.9.05 4.7 0 5.5 0 5.8 0 8s0 2.5.05 3.3c.05.8.15 1.4.35 1.9.2.5.45.9.9 1.4.4.4.9.7 1.4.9.5.2 1.1.3 1.9.35.8.05 1.1.05 3.3.05s2.5 0 3.3-.05c.8-.05 1.4-.15 1.9-.35.5-.2.9-.45 1.4-.9.4-.4.7-.9.9-1.4.2-.5.3-1.1.35-1.9.05-.8.05-1.1.05-3.3s0-2.5-.05-3.3c-.05-.8-.15-1.4-.35-1.9a3.9 3.9 0 00-.9-1.4A3.9 3.9 0 0013.2.4C12.7.2 12.1.1 11.3.05 10.5 0 10.2 0 8 0zm0 3.9a4.1 4.1 0 100 8.2 4.1 4.1 0 000-8.2zm0 6.8a2.7 2.7 0 110-5.4 2.7 2.7 0 010 5.4zm4.3-7a1 1 0 100-2 1 1 0 000 2z"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 2.5H11V0H9.5C7.84 0 6.5 1.34 6.5 3v1.5H5V7h1.5v9h3V7h2l.5-2.5h-2.5V3c0-.28.22-.5.5-.5z"/></svg>
                </a>
              </div>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Services</h4>
              {servicesCol.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`}>{s.label}</Link>
              ))}
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Solutions</h4>
              {solutionsCol.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`}>{s.label}</Link>
              ))}
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Company</h4>
              <Link to="/about">About</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/testimonials">Testimonials</Link>
              <Link to="/case-studies">Case Studies</Link>
              <Link to="/blog">Blog</Link>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Resources</h4>
              <Link to="/contact">Contact</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="footer__bottom">
            <span className="footer__bottom-left">
              &copy; {new Date().getFullYear()} Havos. All rights reserved.
            </span>
            <div className="footer__bottom-center">
              <span>Serving clients globally</span>
              <span className="footer__clock">{time}</span>
            </div>
            <div className="footer__socials">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.5 6.5v6h-2v-6h2zm-1-3.5a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM13.5 12.5h-2V9.7c0-.7-.25-1.2-.9-1.2-.5 0-.8.33-.9.65-.05.12-.06.28-.06.44v2.91h-2s.03-4.72 0-5.21h2v.74a2 2 0 011.8-1c1.3 0 2.06.85 2.06 2.68v2.79z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.3 6.8L14.2 1h-1.2L8.8 6l-3.3-5H2l5.1 7.4L2 15h1.2l4.5-5.2 3.6 5.2H14L9.3 6.8zm-1.6 1.8l-.5-.7L3.8 2h1.7l3.2 4.6.5.7 4.2 6H11.7L7.7 8.6z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.4c2.1 0 2.4 0 3.2.05.8.04 1.2.16 1.5.27.4.15.6.33.9.6.3.3.5.5.6.9.1.3.23.7.27 1.5.04.8.05 1.1.05 3.2s0 2.4-.05 3.2c-.04.8-.16 1.2-.27 1.5-.15.4-.33.6-.6.9-.3.3-.5.5-.9.6-.3.1-.7.23-1.5.27-.8.04-1.1.05-3.2.05s-2.4 0-3.2-.05c-.8-.04-1.2-.16-1.5-.27a2.5 2.5 0 01-.9-.6c-.3-.3-.5-.5-.6-.9-.1-.3-.23-.7-.27-1.5C1.44 10.4 1.4 10.1 1.4 8s0-2.4.05-3.2c.04-.8.16-1.2.27-1.5.15-.4.33-.6.6-.9.3-.3.5-.5.9-.6.3-.1.7-.23 1.5-.27C5.6 1.44 5.9 1.4 8 1.4zM8 0C5.8 0 5.5 0 4.7.05 3.9.1 3.3.2 2.8.4a3.9 3.9 0 00-1.4.9A3.9 3.9 0 00.4 2.8C.2 3.3.1 3.9.05 4.7 0 5.5 0 5.8 0 8s0 2.5.05 3.3c.05.8.15 1.4.35 1.9.2.5.45.9.9 1.4.4.4.9.7 1.4.9.5.2 1.1.3 1.9.35.8.05 1.1.05 3.3.05s2.5 0 3.3-.05c.8-.05 1.4-.15 1.9-.35.5-.2.9-.45 1.4-.9.4-.4.7-.9.9-1.4.2-.5.3-1.1.35-1.9.05-.8.05-1.1.05-3.3s0-2.5-.05-3.3c-.05-.8-.15-1.4-.35-1.9a3.9 3.9 0 00-.9-1.4A3.9 3.9 0 0013.2.4C12.7.2 12.1.1 11.3.05 10.5 0 10.2 0 8 0zm0 3.9a4.1 4.1 0 100 8.2 4.1 4.1 0 000-8.2zm0 6.8a2.7 2.7 0 110-5.4 2.7 2.7 0 010 5.4zm4.3-7a1 1 0 100-2 1 1 0 000 2z"/></svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
