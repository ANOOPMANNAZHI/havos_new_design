import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminItem, useAdminCreate, useAdminUpdate } from '../hooks/useApi';
import FormField from '../components/FormField';
import { slugify } from '../utils';

export default function CareerForm() {
  const { id } = useParams();
  const isEdit = id !== 'new';
  const navigate = useNavigate();
  const { data: existing } = useAdminItem(['careers', id], `/api/careers/admin/all`, isEdit);
  const createMutation = useAdminCreate('careers', '/api/careers', { onSuccess: () => navigate('/admin/careers') });
  const updateMutation = useAdminUpdate('careers', '/api/careers', { onSuccess: () => navigate('/admin/careers') });

  const [form, setForm] = useState({
    slug: '', title: '', type: 'Full-time', location: 'Remote', dept: '',
    experience: '', salary: '', description: '',
    responsibilities: [''], requirements: [''], isActive: true,
  });

  useEffect(() => {
    if (isEdit && existing) {
      const item = Array.isArray(existing) ? existing.find(j => j.id === parseInt(id)) : existing;
      if (item) {
        setForm({
          ...item,
          responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [''],
          requirements: Array.isArray(item.requirements) ? item.requirements : [''],
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

  function handleListChange(field, index, value) {
    setForm(prev => {
      const list = [...prev[field]];
      list[index] = value;
      return { ...prev, [field]: list };
    });
  }

  function addListItem(field) {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  }

  function removeListItem(field, index) {
    setForm(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...form,
      responsibilities: form.responsibilities.filter(Boolean),
      requirements: form.requirements.filter(Boolean),
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
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/careers')}>&larr; Back</button>
        <h1>{isEdit ? 'Edit Job' : 'New Job'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          <FormField label="Title" name="title" value={form.title} onChange={handleChange} required />
          <FormField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
        </div>
        <div className="admin-form-grid admin-form-grid--3">
          <FormField label="Type" name="type" type="select" value={form.type} onChange={handleChange} options={['Full-time', 'Part-time', 'Contract', 'Internship']} />
          <FormField label="Location" name="location" type="select" value={form.location} onChange={handleChange} options={['Remote', 'On-site', 'Hybrid']} />
          <FormField label="Department" name="dept" value={form.dept} onChange={handleChange} required />
        </div>
        <div className="admin-form-grid">
          <FormField label="Experience" name="experience" value={form.experience} onChange={handleChange} placeholder="5+ years" />
          <FormField label="Salary" name="salary" value={form.salary} onChange={handleChange} placeholder="$120k - $160k" />
        </div>
        <FormField label="Description" name="description" type="textarea" value={form.description} onChange={handleChange} required rows={4} />

        {['responsibilities', 'requirements'].map(field => (
          <div key={field} className="admin-form-field">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {form[field].map((item, i) => (
              <div key={i} className="admin-form-grid admin-form-inline">
                <input value={item} onChange={e => handleListChange(field, i, e.target.value)} placeholder={`Add ${field.slice(0, -1)}`} />
                <button type="button" className="admin-btn-sm admin-btn-delete" onClick={() => removeListItem(field, i)}>Remove</button>
              </div>
            ))}
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => addListItem(field)}>+ Add</button>
          </div>
        ))}

        <FormField label="Active" name="isActive" type="checkbox" value={form.isActive} onChange={handleChange} />
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update Job' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  );
}
