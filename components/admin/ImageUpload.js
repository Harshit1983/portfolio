'use client';

import { useRef, useState } from 'react';
import { Upload, Loader2, X, Image as ImageIcon } from 'lucide-react';

/**
 * Reusable image upload widget for admin forms.
 * Props:
 *   value      - current URL string (controlled)
 *   onChange   - called with new URL string when user types in the text field
 *   onUpload   - called with the uploaded Cloudinary URL on success
 *   folder     - Cloudinary folder name (default: 'portfolio')
 *   label      - field label (default: 'Image')
 *   placeholder- input placeholder
 */
export default function ImageUpload({
    value = '',
    onChange,
    onUpload,
    folder = 'portfolio',
    label = 'Image',
    placeholder = 'Paste URL or upload a file…',
}) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const fileRef = useRef(null);

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setError('');
        setUploading(true);

        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', folder);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');
            onUpload?.(data.url);
            onChange?.(data.url);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
            // reset so same file can be re-selected
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    return (
        <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                {label}
            </label>

            {/* Preview */}
            {value && (
                <div style={{ position: 'relative', width: 80, height: 60, marginBottom: '0.5rem', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-tertiary)', flexShrink: 0 }}>
                    <img
                        src={value}
                        alt="preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                    <button
                        type="button"
                        onClick={() => { onChange?.(''); onUpload?.(''); }}
                        style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Clear image"
                    >
                        <X size={11} color="#fff" />
                    </button>
                </div>
            )}

            {/* Input row */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    className="form-input"
                    style={{ flex: 1 }}
                />
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    title="Upload image file"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.35rem',
                        padding: '0.5rem 0.875rem', borderRadius: '8px', flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                        color: '#fff', border: 'none', cursor: uploading ? 'not-allowed' : 'pointer',
                        fontWeight: 600, fontSize: '0.78rem', opacity: uploading ? 0.7 : 1,
                    }}
                >
                    {uploading
                        ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Uploading…</>
                        : <><Upload size={13} /> Upload</>
                    }
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            </div>

            {error && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{error}</p>
            )}
        </div>
    );
}
