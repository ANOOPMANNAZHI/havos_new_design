import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminList, useAdminDelete } from '../hooks/useApi';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const columns = [
  { key: 'category', label: 'Category', width: '150px' },
  { key: 'question', label: 'Question' },
  { key: 'sortOrder', label: 'Order', width: '70px' },
  { key: 'isActive', label: 'Active', width: '80px', render: v => v ? 'Yes' : 'No' },
];

export default function FAQManager() {
  const navigate = useNavigate();
  const { data: faqs = [], isLoading } = useAdminList('faq', '/api/faq/admin/all');
  const deleteMutation = useAdminDelete('faq', '/api/faq');
  const [deleteItem, setDeleteItem] = useState(null);

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>FAQs</h1>
      <DataTable
        columns={columns}
        data={faqs}
        onEdit={item => navigate(`/admin/faq/${item.id}`)}
        onDelete={item => setDeleteItem(item)}
        actions={<button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/faq/new')}>Add FAQ</button>}
      />
      <ConfirmDialog
        isOpen={!!deleteItem}
        title="Delete FAQ"
        message={`Delete this FAQ?`}
        onConfirm={() => { deleteMutation.mutate(deleteItem.id); setDeleteItem(null); }}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
