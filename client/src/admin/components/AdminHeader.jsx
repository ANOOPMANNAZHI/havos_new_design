import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <a href="/" target="_blank" rel="noopener noreferrer" className="admin-header-view-site">
          View Site &rarr;
        </a>
      </div>
      <div className="admin-header-right">
        <span className="admin-header-user">{user?.name || user?.email}</span>
        <button onClick={handleLogout} className="admin-header-logout">Logout</button>
      </div>
    </header>
  );
}
