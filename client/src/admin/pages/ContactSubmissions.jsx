import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useToast } from '../context/ToastContext';

export default function ContactSubmissions() {
  const [showArchived, setShowArchived] = useState(false);
  const [selected, setSelected] = useState(null);
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['admin', 'submissions', showArchived],
    queryFn: () => api.get(`/api/contact/admin/all?archived=${showArchived}`),
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, isArchived }) => api.put(`/api/contact/admin/${id}`, { isArchived }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'submissions'] });
      addToast('Updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/contact/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'submissions'] });
      setSelected(null);
      addToast('Deleted');
    },
  });

  return (
    <div className="admin-page">
      <h1>Contact Submissions</h1>
      <div className="admin-tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`admin-tab${!showArchived ? ' active' : ''}`} onClick={() => setShowArchived(false)}>Inbox</button>
        <button className={`admin-tab${showArchived ? ' active' : ''}`} onClick={() => setShowArchived(true)}>Archived</button>
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="admin-submissions-layout">
          <div className="admin-submissions-list">
            {submissions.length === 0 ? (
              <p className="admin-empty">No submissions</p>
            ) : (
              submissions.map(sub => (
                <div
                  key={sub.id}
                  className={`admin-submission-item${sub.isRead ? '' : ' unread'}${selected?.id === sub.id ? ' selected' : ''}`}
                  onClick={() => setSelected(sub)}
                >
                  <div className="admin-submission-meta">
                    <strong>{sub.name}</strong>
                    <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{sub.email}</p>
                  <p className="admin-submission-preview">{sub.details.substring(0, 80)}...</p>
                </div>
              ))
            )}
          </div>

          {selected && (
            <div className="admin-submission-detail">
              <h2>{selected.name}</h2>
              <p><strong>Email:</strong> {selected.email}</p>
              {selected.company && <p><strong>Company:</strong> {selected.company}</p>}
              <p><strong>Date:</strong> {new Date(selected.createdAt).toLocaleString()}</p>
              <hr />
              <p>{selected.details}</p>
              <div className="admin-form-actions" style={{ marginTop: '1.5rem' }}>
                <button
                  className="admin-btn admin-btn-secondary"
                  onClick={() => archiveMutation.mutate({ id: selected.id, isArchived: !selected.isArchived })}
                >
                  {selected.isArchived ? 'Unarchive' : 'Archive'}
                </button>
                <button className="admin-btn admin-btn-danger" onClick={() => { if (confirm('Delete this submission?')) deleteMutation.mutate(selected.id); }}>Delete</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
