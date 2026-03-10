export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="admin-dialog-overlay" onClick={onCancel}>
      <div className="admin-dialog" onClick={e => e.stopPropagation()}>
        <h3>{title || 'Confirm'}</h3>
        <p>{message || 'Are you sure?'}</p>
        <div className="admin-dialog-actions">
          <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
