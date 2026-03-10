import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '&#9632;' },
  { path: '/admin/services', label: 'Services', icon: '&#9881;' },
  { path: '/admin/blog', label: 'Blog', icon: '&#9998;' },
  { path: '/admin/case-studies', label: 'Case Studies', icon: '&#9733;' },
  { path: '/admin/careers', label: 'Careers', icon: '&#128188;' },
  { path: '/admin/testimonials', label: 'Testimonials', icon: '&#128172;' },
  { path: '/admin/faq', label: 'FAQ', icon: '&#10067;' },
  { path: '/admin/team', label: 'Team', icon: '&#128101;' },
  { divider: true, label: 'Site Management' },
  { path: '/admin/pages', label: 'Page Content', icon: '&#128196;' },
  { path: '/admin/legal', label: 'Legal Pages', icon: '&#128220;' },
  { path: '/admin/navigation', label: 'Navigation', icon: '&#9776;' },
  { path: '/admin/client-logos', label: 'Client Logos', icon: '&#127965;' },
  { path: '/admin/submissions', label: 'Submissions', icon: '&#128233;' },
  { path: '/admin/seo', label: 'SEO', icon: '&#128270;' },
  { path: '/admin/settings', label: 'Settings', icon: '&#9881;' },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <img src="/logo.png" alt="Havos" />
        <span>Admin</span>
      </div>
      <nav className="admin-sidebar-nav">
        {navItems.map((item, i) => {
          if (item.divider) {
            return <div key={i} className="admin-sidebar-divider">{item.label}</div>;
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `admin-sidebar-link${isActive ? ' active' : ''}`}
            >
              <span className="admin-sidebar-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
