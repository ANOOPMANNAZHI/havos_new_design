import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminList, useAdminDelete } from '../hooks/useApi';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'tag', label: 'Tag' },
  { key: 'author', label: 'Author' },
  { key: 'isPublished', label: 'Published', width: '90px', render: v => v ? 'Yes' : 'Draft' },
  { key: 'publishedAt', label: 'Date', width: '120px', render: v => v ? new Date(v).toLocaleDateString() : '-' },
];

export default function BlogManager() {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useAdminList('blog', '/api/blog/admin/all');
  const deleteMutation = useAdminDelete('blog', '/api/blog');
  const [deleteItem, setDeleteItem] = useState(null);

  if (isLoading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Blog Posts</h1>
      <DataTable
        columns={columns}
        data={posts}
        onEdit={item => navigate(`/admin/blog/${item.id}`)}
        onDelete={item => setDeleteItem(item)}
        actions={<button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/blog/new')}>New Post</button>}
      />
      <ConfirmDialog
        isOpen={!!deleteItem}
        title="Delete Post"
        message={`Delete "${deleteItem?.title}"?`}
        onConfirm={() => { deleteMutation.mutate(deleteItem.id); setDeleteItem(null); }}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
