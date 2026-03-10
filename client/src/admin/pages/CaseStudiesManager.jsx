import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminList, useAdminDelete } from '../hooks/useApi';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const columns = [
  { key: 'number', label: '#', width: '60px' },
  { key: 'title', label: 'Title' },
  { key: 'client', label: 'Client' },
  { key: 'isActive', label: 'Active', width: '80px', render: v => v ? 'Yes' : 'No' },
];

export default function CaseStudiesManager() {
  const navigate = useNavigate();
  const { data: studies = [], isLoading } = useAdminList('case-studies', '/api/case-studies/admin/all');
  const deleteMutation = useAdminDelete('case-studies', '/api/case-studies');
  const [deleteItem, setDeleteItem] = useState(null);

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Case Studies</h1>
      <DataTable
        columns={columns}
        data={studies}
        onEdit={item => navigate(`/admin/case-studies/${item.id}`)}
        onDelete={item => setDeleteItem(item)}
        actions={<button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/case-studies/new')}>Add Case Study</button>}
      />
      <ConfirmDialog
        isOpen={!!deleteItem}
        title="Delete Case Study"
        message={`Delete "${deleteItem?.title}"?`}
        onConfirm={() => { deleteMutation.mutate(deleteItem.id); setDeleteItem(null); }}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
