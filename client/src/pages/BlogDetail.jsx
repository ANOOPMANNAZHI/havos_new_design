import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts as localBlogPosts } from '../data/blog';
import { useContent } from '../hooks/useContent';
import Reveal from '../components/Reveal';

export default function BlogDetail() {
  const { slug } = useParams();
  const localPost = localBlogPosts.find((p) => p.slug === slug);
  const { data: post = localPost } = useContent(['blog', slug], `/api/blog/${slug}`);
  const { data: blogResponse } = useContent('blog', '/api/blog');
  const allPosts = blogResponse?.data || blogResponse || localBlogPosts;

  if (!post) return <Navigate to="/blog" replace />;

  const otherPosts = allPosts.filter((p) => p.slug !== slug);

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
              <Link to="/blog" className="sd-hero__back">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3m0 0l4-4M3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                All Articles
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="sd-hero__tag">{post.tag}</span>
            </motion.div>

            <motion.h1
              className="sd-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className="blog-detail__hero-meta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="blog-detail__hero-author">
                <div className="blog-detail__hero-avatar">{post.authorInitials}</div>
                <div>
                  <div className="blog-detail__hero-name">{post.author}</div>
                  <div className="blog-detail__hero-role">{post.authorRole}</div>
                </div>
              </div>
              <div className="blog-detail__hero-info">
                <span>{post.date}</span>
                <span className="blog-detail__hero-dot">·</span>
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="dhero__curve">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 120V60C240 0 480 0 720 30C960 60 1200 60 1440 30V120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ===== ARTICLE CONTENT ===== */}
      <section className="section-v2">
        <div className="container">
          <div className="blog-detail__layout">
            <article className="blog-detail__content">
              <Reveal>
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i} className="blog-detail__para">{para}</p>
                ))}
              </Reveal>
            </article>

            <aside className="blog-detail__sidebar">
              <Reveal direction="right">
                <div className="blog-detail__share-card">
                  <h4 className="blog-detail__share-title">Share this article</h4>
                  <div className="blog-detail__share-links">
                    <a href="#" className="blog-detail__share-btn" aria-label="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M4.5 6.5v6h-2v-6h2zm-1-3.5a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM13.5 12.5h-2V9.7c0-.7-.25-1.2-.9-1.2-.5 0-.8.33-.9.65-.05.12-.06.28-.06.44v2.91h-2s.03-4.72 0-5.21h2v.74a2 2 0 011.8-1c1.3 0 2.06.85 2.06 2.68v2.79z"/></svg>
                    </a>
                    <a href="#" className="blog-detail__share-btn" aria-label="Twitter">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M9.3 6.8L14.2 1h-1.2L8.8 6l-3.3-5H2l5.1 7.4L2 15h1.2l4.5-5.2 3.6 5.2H14L9.3 6.8zm-1.6 1.8l-.5-.7L3.8 2h1.7l3.2 4.6.5.7 4.2 6H11.7L7.7 8.6z"/></svg>
                    </a>
                  </div>
                </div>

                <div className="blog-detail__cta-card">
                  <h4 className="blog-detail__cta-title">Need help with your project?</h4>
                  <p className="blog-detail__cta-desc">Let's discuss how we can bring these insights to your business.</p>
                  <Link to="/contact" className="dbtn dbtn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Get in Touch
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== MORE ARTICLES ===== */}
      {otherPosts.length > 0 && (
        <section className="section-v2 section-v2--alt">
          <div className="container">
            <Reveal>
              <div className="section-v2__header">
                <span className="chip">Keep Reading</span>
                <h2 className="section-v2__title">
                  More <span className="gradient-text">Articles</span>
                </h2>
              </div>
            </Reveal>

            <div className="blog-grid-v2">
              {otherPosts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <Link to={`/blog/${p.slug}`} className="blog-card-v2">
                    <div className="blog-card-v2__thumb">
                      <span className="blog-card-v2__icon">{p.icon}</span>
                    </div>
                    <div className="blog-card-v2__body">
                      <span className="blog-card-v2__tag">{p.tag}</span>
                      <h3 className="blog-card-v2__title">{p.title}</h3>
                      <p className="blog-card-v2__excerpt">{p.excerpt}</p>
                      <div className="blog-card-v2__footer">
                        <div className="blog-card-v2__author">
                          <div className="blog-card-v2__avatar">{p.authorInitials}</div>
                          <span className="blog-card-v2__author-name">{p.author}</span>
                        </div>
                        <span className="blog-card-v2__meta">{p.readTime}</span>
                      </div>
                    </div>
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
