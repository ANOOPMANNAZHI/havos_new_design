import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useToast } from '../context/ToastContext';
import FormField from '../components/FormField';

export default function Settings() {
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: () => api.get('/api/settings'),
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => api.put('/api/settings', form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] });
      addToast('Settings saved');
    },
    onError: (err) => addToast(err.message, 'error'),
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Settings</h1>
      <div className="admin-form">
        <h3>General</h3>
        <FormField label="Site Name" name="site_name" value={form.site_name} onChange={handleChange} />
        <FormField label="Contact Email" name="contact_email" value={form.contact_email} onChange={handleChange} />
        <FormField label="Contact Phone" name="contact_phone" value={form.contact_phone} onChange={handleChange} />
        <FormField label="Location" name="contact_location" value={form.contact_location} onChange={handleChange} />

        <h3>Social Links</h3>
        <FormField label="LinkedIn" name="social_linkedin" value={form.social_linkedin} onChange={handleChange} />
        <FormField label="Twitter / X" name="social_twitter" value={form.social_twitter} onChange={handleChange} />
        <FormField label="Instagram" name="social_instagram" value={form.social_instagram} onChange={handleChange} />

        <div className="admin-form-actions">
          <button type="button" className="admin-btn admin-btn-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            {saveMutation.isPending ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
