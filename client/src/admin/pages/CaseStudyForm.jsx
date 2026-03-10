import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminItem, useAdminCreate, useAdminUpdate } from '../hooks/useApi';
import FormField from '../components/FormField';
import SEOFields from '../components/SEOFields';
import { slugify } from '../utils';

export default function CaseStudyForm() {
  const { id } = useParams();
  const isEdit = id !== 'new';
  const navigate = useNavigate();
  const { data: existing } = useAdminItem(['case-studies', id], `/api/case-studies/admin/all`, isEdit);
  const createMutation = useAdminCreate('case-studies', '/api/case-studies', { onSuccess: () => navigate('/admin/case-studies') });
  const updateMutation = useAdminUpdate('case-studies', '/api/case-studies', { onSuccess: () => navigate('/admin/case-studies') });

  const [form, setForm] = useState({
    number: '', slug: '', title: '', client: '', description: '',
    tags: '', color: '#2B5CFF', gradient: '', challenge: '', solution: '',
    results: [{ metric: '', label: '' }], isActive: true, sortOrder: 0,
    seoMetaTitle: '', seoMetaDesc: '',
  });

  useEffect(() => {
    if (isEdit && existing) {
      const item = Array.isArray(existing) ? existing.find(s => s.id === parseInt(id)) : existing;
      if (item) {
        setForm({
          ...item,
          tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
          results: Array.isArray(item.results) ? item.results : [{ metric: '', label: '' }],
        });
      }
    }
  }, [existing, id, isEdit]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !isEdit ? { slug: slugify(value) } : {}),
    }));
  }

  function handleResultChange(index, field, value) {
    setForm(prev => {
      const results = [...prev.results];
      results[index] = { ...results[index], [field]: value };
      return { ...prev, results };
    });
  }

  function addResult() {
    setForm(prev => ({ ...prev, results: [...prev.results, { metric: '', label: '' }] }));
  }

  function removeResult(index) {
    setForm(prev => ({ ...prev, results: prev.results.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      sortOrder: parseInt(form.sortOrder) || 0,
    };
    if (isEdit) {
      updateMutation.mutate({ id: parseInt(id), data });
    } else {
      createMutation.mutate(data);
    }
  }

  const saving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/case-studies')}>&larr; Back</button>
        <h1>{isEdit ? 'Edit Case Study' : 'New Case Study'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid admin-form-grid--3">
          <FormField label="Number" name="number" value={form.number} onChange={handleChange} placeholder="01" required />
          <FormField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
          <FormField label="Client" name="client" value={form.client} onChange={handleChange} required />
        </div>
        <FormField label="Title" name="title" value={form.title} onChange={handleChange} required />
        <FormField label="Description" name="description" type="textarea" value={form.description} onChange={handleChange} required rows={3} />
        <FormField label="Tags" name="tags" value={form.tags} onChange={handleChange} placeholder="E-Commerce, UI/UX" helpText="Comma-separated" />
        <div className="admin-form-grid">
          <FormField label="Color" name="color" type="color" value={form.color} onChange={handleChange} />
          <FormField label="Gradient" name="gradient" value={form.gradient} onChange={handleChange} placeholder="linear-gradient(...)" />
        </div>
        <FormField label="Challenge" name="challenge" type="textarea" value={form.challenge} onChange={handleChange} required rows={4} />
        <FormField label="Solution" name="solution" type="textarea" value={form.solution} onChange={handleChange} required rows={4} />

        <div className="admin-form-field">
          <label>Results</label>
          {form.results.map((result, i) => (
            <div key={i} className="admin-form-grid admin-form-inline">
              <input placeholder="Metric (e.g., 45%)" value={result.metric} onChange={e => handleResultChange(i, 'metric', e.target.value)} />
              <input placeholder="Label" value={result.label} onChange={e => handleResultChange(i, 'label', e.target.value)} />
              <button type="button" className="admin-btn-sm admin-btn-delete" onClick={() => removeResult(i)}>Remove</button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn-secondary" onClick={addResult}>+ Add Result</button>
        </div>

        <div className="admin-form-grid">
          <FormField label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} />
          <FormField label="Active" name="isActive" type="checkbox" value={form.isActive} onChange={handleChange} />
        </div>
        <SEOFields values={form} onChange={handleChange} />
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
