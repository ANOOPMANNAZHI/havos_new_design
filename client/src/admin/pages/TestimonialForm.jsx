import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminItem, useAdminCreate, useAdminUpdate } from '../hooks/useApi';
import FormField from '../components/FormField';

export default function TestimonialForm() {
  const { id } = useParams();
  const isEdit = id !== 'new';
  const navigate = useNavigate();
  const { data: existing } = useAdminItem(['testimonials', id], `/api/testimonials/admin/all`, isEdit);
  const createMutation = useAdminCreate('testimonials', '/api/testimonials', { onSuccess: () => navigate('/admin/testimonials') });
  const updateMutation = useAdminUpdate('testimonials', '/api/testimonials', { onSuccess: () => navigate('/admin/testimonials') });

  const [form, setForm] = useState({
    text: '', author: '', role: '', avatar: '', rating: 5,
    project: '', isFeatured: false, isActive: true, sortOrder: 0,
  });

  useEffect(() => {
    if (isEdit && existing) {
      const item = Array.isArray(existing) ? existing.find(t => t.id === parseInt(id)) : existing;
      if (item) setForm(item);
    }
  }, [existing, id, isEdit]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...form, rating: parseInt(form.rating), sortOrder: parseInt(form.sortOrder) || 0 };
    if (isEdit) updateMutation.mutate({ id: parseInt(id), data });
    else createMutation.mutate(data);
  }

  const saving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/testimonials')}>&larr; Back</button>
        <h1>{isEdit ? 'Edit Testimonial' : 'New Testimonial'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <FormField label="Testimonial Text" name="text" type="textarea" value={form.text} onChange={handleChange} required rows={5} />
        <div className="admin-form-grid">
          <FormField label="Author Name" name="author" value={form.author} onChange={handleChange} required />
          <FormField label="Role / Company" name="role" value={form.role} onChange={handleChange} required />
        </div>
        <div className="admin-form-grid admin-form-grid--3">
          <FormField label="Rating (1-5)" name="rating" type="number" value={form.rating} onChange={handleChange} />
          <FormField label="Project" name="project" value={form.project} onChange={handleChange} />
          <FormField label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} />
        </div>
        <div className="admin-form-grid">
          <FormField label="Featured" name="isFeatured" type="checkbox" value={form.isFeatured} onChange={handleChange} />
          <FormField label="Active" name="isActive" type="checkbox" value={form.isActive} onChange={handleChange} />
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
