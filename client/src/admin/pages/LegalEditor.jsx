import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useToast } from '../context/ToastContext';
import RichTextEditor from '../components/RichTextEditor';

export default function LegalEditor() {
  const [activePage, setActivePage] = useState('privacy');
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'legal', activePage],
    queryFn: () => api.get(`/api/legal/${activePage}`).catch(() => null),
  });

  const [form, setForm] = useState({ title: '', sections: [] });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title || (activePage === 'privacy' ? 'Privacy Policy' : 'Terms of Service'),
        sections: Array.isArray(data.sections) ? data.sections : [],
      });
    } else {
      setForm({
        title: activePage === 'privacy' ? 'Privacy Policy' : 'Terms of Service',
        sections: [],
      });
    }
  }, [data, activePage]);

  const saveMutation = useMutation({
    mutationFn: () => api.put(`/api/legal/${activePage}`, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'legal'] });
      addToast('Legal page saved');
    },
    onError: (err) => addToast(err.message, 'error'),
  });

  function addSection() {
    setForm(prev => ({
      ...prev,
      sections: [...prev.sections, { heading: '', content: '' }],
    }));
  }

  function updateSection(index, field, value) {
    setForm(prev => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
  }

  function removeSection(index) {
    setForm(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="admin-page">
      <h1>Legal Pages</h1>
      <div className="admin-tabs">
        <button className={`admin-tab${activePage === 'privacy' ? ' active' : ''}`} onClick={() => setActivePage('privacy')}>Privacy Policy</button>
        <button className={`admin-tab${activePage === 'terms' ? ' active' : ''}`} onClick={() => setActivePage('terms')}>Terms of Service</button>
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="admin-form">
          <div className="admin-form-field">
            <label>Title</label>
            <input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} />
          </div>

          {form.sections.map((section, i) => (
            <div key={i} className="admin-legal-section">
              <div className="admin-form-field-header">
                <strong>Section {i + 1}</strong>
                <button type="button" className="admin-btn-sm admin-btn-delete" onClick={() => removeSection(i)}>Remove</button>
              </div>
              <div className="admin-form-field">
                <label>Heading</label>
                <input value={section.heading} onChange={e => updateSection(i, 'heading', e.target.value)} />
              </div>
              <div className="admin-form-field">
                <label>Content</label>
                <RichTextEditor value={section.content} onChange={val => updateSection(i, 'content', val)} />
              </div>
            </div>
          ))}

          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={addSection}>+ Add Section</button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
