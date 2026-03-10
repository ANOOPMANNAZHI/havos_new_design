import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useToast } from '../context/ToastContext';

export default function NavigationManager() {
  const [activeType, setActiveType] = useState('navbar');
  const [items, setItems] = useState([]);
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'navigation', activeType],
    queryFn: () => api.get(`/api/navigation/${activeType}`).catch(() => null),
  });

  useEffect(() => {
    if (data?.items) {
      setItems(Array.isArray(data.items) ? data.items : []);
    } else {
      setItems([]);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => api.put(`/api/navigation/${activeType}`, { items }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'navigation'] });
      addToast('Navigation saved');
    },
    onError: (err) => addToast(err.message, 'error'),
  });

  function addItem() {
    setItems(prev => [...prev, { label: '', href: '', children: [] }]);
  }

  function updateItem(index, field, value) {
    setItems(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function removeItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="admin-page">
      <h1>Navigation</h1>
      <div className="admin-tabs">
        <button className={`admin-tab${activeType === 'navbar' ? ' active' : ''}`} onClick={() => setActiveType('navbar')}>Navbar</button>
        <button className={`admin-tab${activeType === 'footer' ? ' active' : ''}`} onClick={() => setActiveType('footer')}>Footer</button>
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="admin-form">
          {items.map((item, i) => (
            <div key={i} className="admin-nav-item">
              <div className="admin-form-grid admin-form-inline">
                <input placeholder="Label" value={item.label} onChange={e => updateItem(i, 'label', e.target.value)} />
                <input placeholder="URL (/about)" value={item.href} onChange={e => updateItem(i, 'href', e.target.value)} />
                <button type="button" className="admin-btn-sm admin-btn-delete" onClick={() => removeItem(i)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={addItem}>+ Add Link</button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
