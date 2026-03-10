import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useToast } from '../context/ToastContext';

const pages = ['home', 'about', 'services', 'careers', 'contact', 'case-studies', 'blog', 'testimonials'];

export default function PageContentManager() {
  const [activePage, setActivePage] = useState('home');
  const [sections, setSections] = useState({});
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'page-content', activePage],
    queryFn: () => api.get(`/api/page-content/${activePage}`).catch(() => ({ sections: {} })),
  });

  useEffect(() => {
    if (data?.sections) {
      setSections(typeof data.sections === 'string' ? JSON.parse(data.sections) : data.sections);
    } else {
      setSections({});
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => api.put(`/api/page-content/${activePage}`, { sections }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'page-content'] });
      addToast('Page content saved');
    },
    onError: (err) => addToast(err.message, 'error'),
  });

  function handleSectionChange(key, value) {
    setSections(prev => ({ ...prev, [key]: value }));
  }

  function addSection() {
    const key = prompt('Section key (e.g., heroTitle, heroSubtitle):');
    if (key) setSections(prev => ({ ...prev, [key]: '' }));
  }

  function removeSection(key) {
    setSections(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  return (
    <div className="admin-page">
      <h1>Page Content</h1>
      <div className="admin-tabs">
        {pages.map(p => (
          <button key={p} className={`admin-tab${activePage === p ? ' active' : ''}`} onClick={() => setActivePage(p)}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="admin-form">
          {Object.entries(sections).map(([key, value]) => (
            <div key={key} className="admin-form-field">
              <div className="admin-form-field-header">
                <label>{key}</label>
                <button type="button" className="admin-btn-sm admin-btn-delete" onClick={() => removeSection(key)}>Remove</button>
              </div>
              {typeof value === 'string' && value.length > 100 ? (
                <textarea rows={4} value={value} onChange={e => handleSectionChange(key, e.target.value)} />
              ) : typeof value === 'object' ? (
                <textarea rows={6} value={JSON.stringify(value, null, 2)} onChange={e => {
                  try { handleSectionChange(key, JSON.parse(e.target.value)); } catch { handleSectionChange(key, e.target.value); }
                }} />
              ) : (
                <input value={value || ''} onChange={e => handleSectionChange(key, e.target.value)} />
              )}
            </div>
          ))}
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={addSection}>+ Add Section</button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
