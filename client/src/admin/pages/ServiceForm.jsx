import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminItem, useAdminCreate, useAdminUpdate } from '../hooks/useApi';
import FormField from '../components/FormField';
import SEOFields from '../components/SEOFields';
import { slugify } from '../utils';

export default function ServiceForm() {
  const { id } = useParams();
  const isEdit = id !== 'new';
  const navigate = useNavigate();
  const { data: existing } = useAdminItem(['services', id], `/api/services/admin/all`, isEdit);
  const createMutation = useAdminCreate('services', '/api/services', { onSuccess: () => navigate('/admin/services') });
  const updateMutation = useAdminUpdate('services', '/api/services', { onSuccess: () => navigate('/admin/services') });

  const [form, setForm] = useState({
    number: '', slug: '', title: '', description: '', fullDescription: '',
    tags: '', icon: '', isActive: true, sortOrder: 0,
    seoMetaTitle: '', seoMetaDesc: '', seoOgImage: '',
  });

  useEffect(() => {
    if (isEdit && existing) {
      const item = Array.isArray(existing) ? existing.find(s => s.id === parseInt(id)) : existing;
      if (item) {
        setForm({
          ...item,
          tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
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
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/services')}>&larr; Back</button>
        <h1>{isEdit ? 'Edit Service' : 'New Service'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          <FormField label="Number" name="number" value={form.number} onChange={handleChange} placeholder="01" required />
          <FormField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
        </div>
        <FormField label="Title" name="title" value={form.title} onChange={handleChange} required />
        <FormField label="Description" name="description" type="textarea" value={form.description} onChange={handleChange} required rows={3} />
        <FormField label="Full Description" name="fullDescription" type="textarea" value={form.fullDescription} onChange={handleChange} required rows={6} />
        <FormField label="Tags" name="tags" value={form.tags} onChange={handleChange} placeholder="React, Next.js, Mobile Apps" helpText="Comma-separated" />
        <FormField label="Icon" name="icon" value={form.icon} onChange={handleChange} placeholder="Emoji or icon class" />
        <div className="admin-form-grid">
          <FormField label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} />
          <FormField label="Active" name="isActive" type="checkbox" value={form.isActive} onChange={handleChange} />
        </div>
        <SEOFields values={form} onChange={handleChange} />
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
