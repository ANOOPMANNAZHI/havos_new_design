import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { useContent } from '../hooks/useContent';

const localSections = [
  {
    title: 'Acceptance of Terms',
    content: [
      'By accessing and using the Havos website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.',
      'We reserve the right to modify these terms at any time. Continued use of our services after changes are posted constitutes your acceptance of the revised terms.',
    ],
  },
  {
    title: 'Services',
    content: [
      'Havos provides digital transformation and IT services including web development, digital marketing, cybersecurity, IT consulting, AI automation, e-commerce solutions, and related technology services. The specific scope of services will be outlined in individual project agreements or statements of work.',
      'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.',
    ],
  },
  {
    title: 'Client Obligations',
    content: [
      'As a client, you agree to:',
    ],
    list: [
      'Provide accurate and complete information required for project execution',
      'Respond to communications and approve deliverables in a timely manner',
      'Ensure you have the rights to any content, materials, or data you provide to us',
      'Not use our services for any unlawful or unauthorized purpose',
      'Maintain the confidentiality of any login credentials or access we provide',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'All content on this website, including text, graphics, logos, images, and software, is the property of Havos and is protected by applicable intellectual property laws.',
      'Upon full payment as specified in the project agreement, clients receive ownership rights to custom deliverables created specifically for their project. Pre-existing tools, frameworks, and proprietary methodologies used in the development process remain the property of Havos.',
    ],
  },
  {
    title: 'Payment Terms',
    content: [
      'Payment terms are defined in individual project proposals and contracts. Unless otherwise specified:',
    ],
    list: [
      'An initial deposit is required before work begins',
      'Milestone payments are due upon completion of agreed-upon project phases',
      'Final payment is due upon project delivery and acceptance',
      'Late payments may incur interest at a rate of 1.5% per month',
      'All prices are exclusive of applicable taxes unless stated otherwise',
    ],
  },
  {
    title: 'Project Changes & Scope',
    content: [
      'Any changes to the agreed project scope must be documented in a change order signed by both parties. Additional work outside the original scope may result in additional charges and timeline adjustments.',
      'We will provide estimates for scope changes before proceeding with any additional work.',
    ],
  },
  {
    title: 'Confidentiality',
    content: [
      'Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the engagement. This obligation survives the termination of the service agreement.',
      'We will not disclose your confidential information to third parties without your prior written consent, except as required by law.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'Havos shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services, including but not limited to loss of profits, data, or business opportunities.',
      'Our total liability for any claim related to our services shall not exceed the total amount paid by the client for the specific service in question during the twelve (12) months preceding the claim.',
    ],
  },
  {
    title: 'Warranties & Disclaimers',
    content: [
      'We warrant that our services will be performed in a professional and workmanlike manner consistent with industry standards. Beyond this, our services are provided "as is" without any other warranties, express or implied.',
      'We do not guarantee specific results, rankings, traffic levels, or revenue outcomes from our digital marketing or development services.',
    ],
  },
  {
    title: 'Termination',
    content: [
      'Either party may terminate a service agreement with 30 days written notice as specified in the project contract. Upon termination:',
    ],
    list: [
      'The client is responsible for payment of all work completed up to the termination date',
      'Any pre-paid amounts for undelivered work will be refunded on a pro-rata basis',
      'Havos will provide all completed deliverables and project files',
      'Confidentiality obligations continue to apply after termination',
    ],
  },
  {
    title: 'Governing Law',
    content: [
      'These Terms of Service shall be governed by and construed in accordance with the laws of the applicable jurisdiction. Any disputes arising under these terms shall be resolved through good-faith negotiation, and if necessary, binding arbitration.',
    ],
  },
  {
    title: 'Contact',
    content: [
      'For questions about these Terms of Service, please contact us:',
    ],
    list: [
      'Email: hello@havos.com',
      'Phone: +1 (234) 567-890',
    ],
  },
];

export default function Terms() {
  const { data: termsData } = useContent('legal-terms', '/api/legal/terms');
  const sections = termsData?.sections || localSections;

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
              Terms of <span className="about-hero__accent">Service</span>
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
