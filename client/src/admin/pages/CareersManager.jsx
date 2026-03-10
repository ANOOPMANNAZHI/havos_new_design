import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminList, useAdminDelete } from '../hooks/useApi';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type', width: '100px' },
  { key: 'location', label: 'Location', width: '100px' },
  { key: 'dept', label: 'Department', width: '120px' },
  { key: 'isActive', label: 'Active', width: '80px', render: v => v ? 'Yes' : 'No' },
];

export default function CareersManager() {
  const navigate = useNavigate();
  const { data: jobs = [], isLoading } = useAdminList('careers', '/api/careers/admin/all');
  const deleteMutation = useAdminDelete('careers', '/api/careers');
  const [deleteItem, setDeleteItem] = useState(null);

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Careers</h1>
      <DataTable
        columns={columns}
        data={jobs}
        onEdit={item => navigate(`/admin/careers/${item.id}`)}
        onDelete={item => setDeleteItem(item)}
        actions={<button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/careers/new')}>Add Job</button>}
      />
      <ConfirmDialog
        isOpen={!!deleteItem}
        title="Delete Job"
        message={`Delete "${deleteItem?.title}"?`}
        onConfirm={() => { deleteMutation.mutate(deleteItem.id); setDeleteItem(null); }}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
