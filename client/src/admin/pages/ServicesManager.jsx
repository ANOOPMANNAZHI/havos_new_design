import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminList, useAdminDelete } from '../hooks/useApi';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const columns = [
  { key: 'number', label: '#', width: '60px' },
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'isActive', label: 'Active', width: '80px', render: v => v ? 'Yes' : 'No' },
  { key: 'sortOrder', label: 'Order', width: '70px' },
];

export default function ServicesManager() {
  const navigate = useNavigate();
  const { data: services = [], isLoading } = useAdminList('services', '/api/services/admin/all');
  const deleteMutation = useAdminDelete('services', '/api/services');
  const [deleteItem, setDeleteItem] = useState(null);

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Services</h1>
      <DataTable
        columns={columns}
        data={services}
        onEdit={item => navigate(`/admin/services/${item.id}`)}
        onDelete={item => setDeleteItem(item)}
        actions={<button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/services/new')}>Add Service</button>}
      />
      <ConfirmDialog
        isOpen={!!deleteItem}
        title="Delete Service"
        message={`Delete "${deleteItem?.title}"? This cannot be undone.`}
        onConfirm={() => { deleteMutation.mutate(deleteItem.id); setDeleteItem(null); }}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
