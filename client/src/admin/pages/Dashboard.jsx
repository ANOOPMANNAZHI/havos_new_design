import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Link } from 'react-router-dom';

const statCards = [
  { key: 'services', label: 'Services', link: '/admin/services', color: '#2B5CFF' },
  { key: 'blogPosts', label: 'Blog Posts', link: '/admin/blog', color: '#7C3AED' },
  { key: 'caseStudies', label: 'Case Studies', link: '/admin/case-studies', color: '#059669' },
  { key: 'jobs', label: 'Active Jobs', link: '/admin/careers', color: '#D97706' },
  { key: 'testimonials', label: 'Testimonials', link: '/admin/testimonials', color: '#DC2626' },
  { key: 'faqs', label: 'FAQs', link: '/admin/faq', color: '#0891B2' },
  { key: 'teamMembers', label: 'Team Members', link: '/admin/team', color: '#4F46E5' },
  { key: 'unreadSubmissions', label: 'Unread Messages', link: '/admin/submissions', color: '#E11D48' },
];

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => api.get('/api/admin/dashboard'),
  });

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>

      <div className="admin-stats-grid">
        {statCards.map(card => (
          <Link key={card.key} to={card.link} className="admin-stat-card" style={{ borderLeftColor: card.color }}>
            <div className="admin-stat-number" style={{ color: card.color }}>
              {isLoading ? '...' : data?.counts?.[card.key] ?? 0}
            </div>
            <div className="admin-stat-label">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="admin-section">
        <h2>Recent Submissions</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.recentSubmissions?.length === 0 ? (
          <p className="admin-empty">No recent submissions</p>
        ) : (
          <div className="admin-submissions-list">
            {data?.recentSubmissions?.map(sub => (
              <div key={sub.id} className={`admin-submission-item${sub.isRead ? '' : ' unread'}`}>
                <div className="admin-submission-meta">
                  <strong>{sub.name}</strong>
                  <span>{sub.email}</span>
                  <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{sub.details.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
