import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useToast } from '../context/ToastContext';
import SEOFields from '../components/SEOFields';

const pages = ['home', 'about', 'services', 'blog', 'careers', 'contact', 'case-studies', 'faq', 'testimonials'];

export default function SEOManager() {
  const [activePage, setActivePage] = useState('home');
  const [form, setForm] = useState({ seoMetaTitle: '', seoMetaDesc: '', seoOgImage: '' });
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ['admin', 'seo', activePage],
    queryFn: () => api.get(`/api/seo/${activePage}`).catch(() => ({})),
    onSuccess: (data) => {
      setForm({
        seoMetaTitle: data?.seoMetaTitle || '',
        seoMetaDesc: data?.seoMetaDesc || '',
        seoOgImage: data?.seoOgImage || '',
      });
    },
  });

  const saveMutation = useMutation({
    mutationFn: () => api.put(`/api/seo/${activePage}`, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'seo'] });
      addToast('SEO settings saved');
    },
    onError: (err) => addToast(err.message, 'error'),
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="admin-page">
      <h1>SEO Manager</h1>
      <div className="admin-tabs">
        {pages.map(p => (
          <button key={p} className={`admin-tab${activePage === p ? ' active' : ''}`} onClick={() => setActivePage(p)}>
            {p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="admin-form">
          <SEOFields values={form} onChange={handleChange} />
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving...' : 'Save SEO Settings'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
