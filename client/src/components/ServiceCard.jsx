import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 8px 32px rgba(43, 92, 255, 0.18)' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/services/${service.slug}`} className="service-card">
        <span className="service-card__number">{service.number}</span>
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__desc">{service.description}</p>
        <span className="service-card__label">Services</span>
        <div className="service-card__tags">
          {service.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
