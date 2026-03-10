export default function FormField({ label, name, type = 'text', value, onChange, placeholder, required, rows, options, helpText }) {
  const id = `field-${name}`;

  if (type === 'textarea') {
    return (
      <div className="admin-form-field">
        <label htmlFor={id}>{label} {required && <span className="required">*</span>}</label>
        <textarea id={id} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} rows={rows || 4} required={required} />
        {helpText && <small className="admin-help-text">{helpText}</small>}
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className="admin-form-field">
        <label htmlFor={id}>{label} {required && <span className="required">*</span>}</label>
        <select id={id} name={name} value={value || ''} onChange={onChange} required={required}>
          <option value="">Select...</option>
          {options?.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        {helpText && <small className="admin-help-text">{helpText}</small>}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="admin-form-field admin-form-field--checkbox">
        <label>
          <input type="checkbox" name={name} checked={!!value} onChange={onChange} />
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="admin-form-field">
      <label htmlFor={id}>{label} {required && <span className="required">*</span>}</label>
      <input id={id} type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} required={required} />
      {helpText && <small className="admin-help-text">{helpText}</small>}
    </div>
  );
}
