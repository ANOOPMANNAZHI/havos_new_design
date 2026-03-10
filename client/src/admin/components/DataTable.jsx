import { useState } from 'react';

export default function DataTable({ columns, data = [], onEdit, onDelete, actions }) {
  const [search, setSearch] = useState('');

  const filtered = data.filter(item =>
    columns.some(col => {
      const val = item[col.key];
      return val && String(val).toLowerCase().includes(search.toLowerCase());
    })
  );

  return (
    <div className="admin-table-wrapper">
      <div className="admin-table-toolbar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-table-search"
        />
        {actions}
      </div>
      <div className="admin-table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                  {col.label}
                </th>
              ))}
              <th style={{ width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="admin-table-empty">No items found</td></tr>
            ) : (
              filtered.map(item => (
                <tr key={item.id}>
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? '')}
                    </td>
                  ))}
                  <td>
                    <div className="admin-table-actions">
                      {onEdit && <button className="admin-btn-sm admin-btn-edit" onClick={() => onEdit(item)}>Edit</button>}
                      {onDelete && <button className="admin-btn-sm admin-btn-delete" onClick={() => onDelete(item)}>Delete</button>}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
