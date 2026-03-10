import { useState } from 'react';
import { useAdminList, useAdminCreate, useAdminDelete } from '../hooks/useApi';
import ConfirmDialog from '../components/ConfirmDialog';

export default function ClientLogosManager() {
  const { data: logos = [], isLoading } = useAdminList('client-logos', '/api/client-logos/admin/all');
  const createMutation = useAdminCreate('client-logos', '/api/client-logos');
  const deleteMutation = useAdminDelete('client-logos', '/api/client-logos');
  const [deleteItem, setDeleteItem] = useState(null);
  const [newName, setNewName] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    createMutation.mutate({ name: newName.trim(), sortOrder: logos.length });
    setNewName('');
  }

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Client Logos</h1>
      <form onSubmit={handleAdd} className="admin-form-inline" style={{ marginBottom: '1.5rem' }}>
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Client name" />
        <button type="submit" className="admin-btn admin-btn-primary" disabled={createMutation.isPending}>Add</button>
      </form>
      <div className="admin-logos-grid">
        {logos.map(logo => (
          <div key={logo.id} className="admin-logo-card">
            <span>{logo.name}</span>
            <button className="admin-btn-sm admin-btn-delete" onClick={() => setDeleteItem(logo)}>Delete</button>
          </div>
        ))}
      </div>
      <ConfirmDialog
        isOpen={!!deleteItem}
        title="Delete Client Logo"
        message={`Delete "${deleteItem?.name}"?`}
        onConfirm={() => { deleteMutation.mutate(deleteItem.id); setDeleteItem(null); }}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
