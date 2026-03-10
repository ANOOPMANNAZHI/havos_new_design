import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminItem, useAdminCreate, useAdminUpdate } from '../hooks/useApi';
import FormField from '../components/FormField';
import RichTextEditor from '../components/RichTextEditor';
import SEOFields from '../components/SEOFields';
import { slugify } from '../utils';

export default function BlogForm() {
  const { id } = useParams();
  const isEdit = id !== 'new';
  const navigate = useNavigate();
  const { data: existing } = useAdminItem(['blog', id], `/api/blog/admin/all`, isEdit);
  const createMutation = useAdminCreate('blog', '/api/blog', { onSuccess: () => navigate('/admin/blog') });
  const updateMutation = useAdminUpdate('blog', '/api/blog', { onSuccess: () => navigate('/admin/blog') });

  const [form, setForm] = useState({
    slug: '', title: '', excerpt: '', content: '', tag: '', icon: '', thumbnail: '',
    readTime: '', author: '', authorRole: '', authorInitials: '', isPublished: true,
    publishedAt: new Date().toISOString().split('T')[0],
    seoMetaTitle: '', seoMetaDesc: '', seoOgImage: '',
  });

  useEffect(() => {
    if (isEdit && existing) {
      const item = Array.isArray(existing) ? existing.find(p => p.id === parseInt(id)) : existing;
      if (item) {
        setForm({
          ...item,
          publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().split('T')[0] : '',
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
    const data = { ...form };
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
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/blog')}>&larr; Back</button>
        <h1>{isEdit ? 'Edit Post' : 'New Post'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          <FormField label="Title" name="title" value={form.title} onChange={handleChange} required />
          <FormField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
        </div>
        <FormField label="Excerpt" name="excerpt" type="textarea" value={form.excerpt} onChange={handleChange} required rows={3} />
        <div className="admin-form-field">
          <label>Content</label>
          <RichTextEditor value={form.content} onChange={val => setForm(prev => ({ ...prev, content: val }))} />
        </div>
        <div className="admin-form-grid admin-form-grid--3">
          <FormField label="Tag" name="tag" value={form.tag} onChange={handleChange} placeholder="AI, E-Commerce..." />
          <FormField label="Icon" name="icon" value={form.icon} onChange={handleChange} placeholder="Emoji" />
          <FormField label="Read Time" name="readTime" value={form.readTime} onChange={handleChange} placeholder="5 min read" />
        </div>
        <div className="admin-form-grid admin-form-grid--3">
          <FormField label="Author" name="author" value={form.author} onChange={handleChange} required />
          <FormField label="Author Role" name="authorRole" value={form.authorRole} onChange={handleChange} />
          <FormField label="Author Initials" name="authorInitials" value={form.authorInitials} onChange={handleChange} placeholder="SC" />
        </div>
        <div className="admin-form-grid">
          <FormField label="Publish Date" name="publishedAt" type="date" value={form.publishedAt} onChange={handleChange} />
          <FormField label="Published" name="isPublished" type="checkbox" value={form.isPublished} onChange={handleChange} />
        </div>
        <SEOFields values={form} onChange={handleChange} />
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
