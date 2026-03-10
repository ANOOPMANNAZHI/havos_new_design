import { useState } from 'react';
import { api } from '../../lib/api';

export default function ImageUploader({ value, onChange, folder = 'havos' }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await api.uploadImage(file, folder);
      onChange(result.url);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
    setUploading(false);
  }

  return (
    <div className="admin-image-uploader">
      {value && (
        <div className="admin-image-preview">
          <img src={value} alt="Preview" />
          <button type="button" className="admin-image-remove" onClick={() => onChange('')}>Remove</button>
        </div>
      )}
      <label className="admin-image-upload-btn">
        {uploading ? 'Uploading...' : value ? 'Change Image' : 'Upload Image'}
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} hidden />
      </label>
    </div>
  );
}
