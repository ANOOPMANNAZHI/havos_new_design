import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminList, useAdminDelete } from '../hooks/useApi';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const columns = [
  { key: 'author', label: 'Author' },
  { key: 'role', label: 'Role' },
  { key: 'rating', label: 'Rating', width: '80px' },
  { key: 'isFeatured', label: 'Featured', width: '90px', render: v => v ? 'Yes' : 'No' },
  { key: 'isActive', label: 'Active', width: '80px', render: v => v ? 'Yes' : 'No' },
];

export default function TestimonialsManager() {
  const navigate = useNavigate();
  const { data: testimonials = [], isLoading } = useAdminList('testimonials', '/api/testimonials/admin/all');
  const deleteMutation = useAdminDelete('testimonials', '/api/testimonials');
  const [deleteItem, setDeleteItem] = useState(null);

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Testimonials</h1>
      <DataTable
        columns={columns}
        data={testimonials}
        onEdit={item => navigate(`/admin/testimonials/${item.id}`)}
        onDelete={item => setDeleteItem(item)}
        actions={<button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/testimonials/new')}>Add Testimonial</button>}
      />
      <ConfirmDialog
        isOpen={!!deleteItem}
        title="Delete Testimonial"
        message={`Delete testimonial by "${deleteItem?.author}"?`}
        onConfirm={() => { deleteMutation.mutate(deleteItem.id); setDeleteItem(null); }}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
