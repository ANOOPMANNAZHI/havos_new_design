import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminItem, useAdminCreate, useAdminUpdate } from '../hooks/useApi';
import FormField from '../components/FormField';

export default function FAQForm() {
  const { id } = useParams();
  const isEdit = id !== 'new';
  const navigate = useNavigate();
  const { data: existing } = useAdminItem(['faq', id], `/api/faq/admin/all`, isEdit);
  const createMutation = useAdminCreate('faq', '/api/faq', { onSuccess: () => navigate('/admin/faq') });
  const updateMutation = useAdminUpdate('faq', '/api/faq', { onSuccess: () => navigate('/admin/faq') });

  const [form, setForm] = useState({
    category: '', categoryIcon: '', question: '', answer: '', sortOrder: 0, isActive: true,
  });

  useEffect(() => {
    if (isEdit && existing) {
      const item = Array.isArray(existing) ? existing.find(f => f.id === parseInt(id)) : existing;
      if (item) setForm(item);
    }
  }, [existing, id, isEdit]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...form, sortOrder: parseInt(form.sortOrder) || 0 };
    if (isEdit) updateMutation.mutate({ id: parseInt(id), data });
    else createMutation.mutate(data);
  }

  const saving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/faq')}>&larr; Back</button>
        <h1>{isEdit ? 'Edit FAQ' : 'New FAQ'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          <FormField label="Category" name="category" value={form.category} onChange={handleChange} required placeholder="General, Technical, Pricing..." />
          <FormField label="Category Icon" name="categoryIcon" value={form.categoryIcon} onChange={handleChange} placeholder="Emoji" />
        </div>
        <FormField label="Question" name="question" type="textarea" value={form.question} onChange={handleChange} required rows={2} />
        <FormField label="Answer" name="answer" type="textarea" value={form.answer} onChange={handleChange} required rows={5} />
        <div className="admin-form-grid">
          <FormField label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} />
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
