import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminList, useAdminDelete } from '../hooks/useApi';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'initials', label: 'Initials', width: '80px' },
  { key: 'sortOrder', label: 'Order', width: '70px' },
  { key: 'isActive', label: 'Active', width: '80px', render: v => v ? 'Yes' : 'No' },
];

export default function TeamManager() {
  const navigate = useNavigate();
  const { data: members = [], isLoading } = useAdminList('team', '/api/team/admin/all');
  const deleteMutation = useAdminDelete('team', '/api/team');
  const [deleteItem, setDeleteItem] = useState(null);

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Team Members</h1>
      <DataTable
        columns={columns}
        data={members}
        onEdit={item => navigate(`/admin/team/${item.id}`)}
        onDelete={item => setDeleteItem(item)}
        actions={<button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/team/new')}>Add Member</button>}
      />
      <ConfirmDialog
        isOpen={!!deleteItem}
        title="Delete Team Member"
        message={`Delete "${deleteItem?.name}"?`}
        onConfirm={() => { deleteMutation.mutate(deleteItem.id); setDeleteItem(null); }}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
