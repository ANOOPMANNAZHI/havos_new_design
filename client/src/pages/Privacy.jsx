import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { useContent } from '../hooks/useContent';

const localSections = [
  {
    title: 'Information We Collect',
    content: [
      'We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us via email or phone. This may include your name, email address, company name, phone number, and project details.',
      'We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, pages visited, and referring URL. This data is collected through cookies and similar tracking technologies.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'We use the information we collect to:',
    ],
    list: [
      'Respond to your inquiries and provide our services',
      'Send you updates, newsletters, and marketing communications (with your consent)',
      'Improve our website experience and service offerings',
      'Analyze website traffic and usage patterns',
      'Comply with legal obligations and protect our rights',
    ],
    footer: 'We do not sell your personal information to third parties.',
  },
  {
    title: 'Data Security',
    content: [
      'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, and regular security assessments.',
      'However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Cookies & Tracking',
    content: [
      'Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our site.',
    ],
    list: [
      'Essential cookies: Required for the website to function properly',
      'Analytics cookies: Help us understand how visitors interact with our site',
      'Marketing cookies: Used to deliver relevant advertisements',
    ],
    footer: 'You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.',
  },
  {
    title: 'Third-Party Services',
    content: [
      'We may use third-party services (such as Google Analytics, hosting providers, and email platforms) that collect, monitor, and analyze data to improve our service. These third parties have their own privacy policies governing how they use such information.',
      'We may also include links to third-party websites. We are not responsible for the privacy practices of these external sites.',
    ],
  },
  {
    title: 'Data Retention',
    content: [
      'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When your data is no longer needed, we securely delete or anonymize it.',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Depending on your jurisdiction, you may have the right to:',
    ],
    list: [
      'Access the personal data we hold about you',
      'Request correction of inaccurate information',
      'Request deletion of your personal data',
      'Object to or restrict the processing of your data',
      'Request data portability',
      'Withdraw consent at any time',
    ],
    footer: 'To exercise any of these rights, please contact us at hello@havos.com.',
  },
  {
    title: 'Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website with a new effective date.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions about this Privacy Policy or our data practices, please contact us:',
    ],
    list: [
      'Email: hello@havos.com',
      'Phone: +1 (234) 567-890',
    ],
  },
];

export default function Privacy() {
  const { data: privacyData } = useContent('legal-privacy', '/api/legal/privacy');
  const sections = privacyData?.sections || localSections;

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
              Legal
            </motion.span>
            <motion.h1
              className="about-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Privacy <span className="about-hero__accent">Policy</span>
            </motion.h1>
            <motion.p
              className="about-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Last updated: March 2026
            </motion.p>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="section-v2">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="legal-v2">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.05}>
                <div className="legal-v2__section">
                  <h2 className="legal-v2__title">{section.title}</h2>
                  {section.content.map((p, j) => (
                    <p key={j} className="legal-v2__text">{p}</p>
                  ))}
                  {section.list && (
                    <ul className="legal-v2__list">
                      {section.list.map((item, k) => (
                        <li key={k} className="legal-v2__list-item">
                          <span className="legal-v2__bullet">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 4.5L5.5 10 3 7.5" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.footer && (
                    <p className="legal-v2__text legal-v2__text--emphasis">{section.footer}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
