import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts as localBlogPosts } from '../data/blog';
import { useContent } from '../hooks/useContent';
import Reveal from '../components/Reveal';

export default function Blog() {
  const { data: blogResponse } = useContent('blog', '/api/blog');
  const blogPosts = blogResponse?.data || blogResponse || localBlogPosts;
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

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
              Our Blog
            </motion.span>
            <motion.h1
              className="about-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Insights & <span className="about-hero__accent">Updates</span>
            </motion.h1>
            <motion.p
              className="about-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Thoughts on technology, business, and the future of digital transformation.
            </motion.p>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      <section className="section-v2">
        <div className="container">
          <Reveal>
            <Link to={`/blog/${featured.slug}`} className="blog-featured">
              <div className="blog-featured__thumb">
                <span className="blog-featured__icon">{featured.icon}</span>
                <div className="blog-featured__tag-badge">{featured.tag}</div>
              </div>
              <div className="blog-featured__body">
                <span className="blog-featured__meta">
                  <span>{featured.date}</span>
                  <span className="blog-featured__dot">·</span>
                  <span>{featured.readTime}</span>
                </span>
                <h2 className="blog-featured__title">{featured.title}</h2>
                <p className="blog-featured__excerpt">{featured.excerpt}</p>
                <div className="blog-featured__author">
                  <div className="blog-featured__avatar">{featured.authorInitials}</div>
                  <div>
                    <div className="blog-featured__author-name">{featured.author}</div>
                    <div className="blog-featured__author-role">{featured.authorRole}</div>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== ALL POSTS ===== */}
      <section className="section-v2 section-v2--alt">
        <div className="container">
          <Reveal>
            <div className="section-v2__header">
              <span className="chip">Latest Articles</span>
              <h2 className="section-v2__title">
                More <span className="gradient-text">Reading</span>
              </h2>
            </div>
          </Reveal>

          <div className="blog-grid-v2">
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.08}>
                <Link to={`/blog/${post.slug}`} className="blog-card-v2">
                  <div className="blog-card-v2__thumb">
                    <span className="blog-card-v2__icon">{post.icon}</span>
                  </div>
                  <div className="blog-card-v2__body">
                    <span className="blog-card-v2__tag">{post.tag}</span>
                    <h3 className="blog-card-v2__title">{post.title}</h3>
                    <p className="blog-card-v2__excerpt">{post.excerpt}</p>
                    <div className="blog-card-v2__footer">
                      <div className="blog-card-v2__author">
                        <div className="blog-card-v2__avatar">{post.authorInitials}</div>
                        <span className="blog-card-v2__author-name">{post.author}</span>
                      </div>
                      <span className="blog-card-v2__meta">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
