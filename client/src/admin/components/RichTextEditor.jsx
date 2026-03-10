import { useState } from 'react';

// Simple rich text editor using contentEditable
// Can be replaced with TipTap later
export default function RichTextEditor({ value, onChange }) {
  const [mode, setMode] = useState('visual');

  function handleInput(e) {
    onChange(e.target.innerHTML);
  }

  function execCommand(cmd, val = null) {
    document.execCommand(cmd, false, val);
  }

  if (mode === 'html') {
    return (
      <div className="admin-rte">
        <div className="admin-rte-toolbar">
          <button type="button" className="admin-rte-mode active" onClick={() => setMode('visual')}>Visual</button>
          <button type="button" className="admin-rte-mode" onClick={() => setMode('html')}>HTML</button>
        </div>
        <textarea
          className="admin-rte-html"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          rows={15}
        />
      </div>
    );
  }

  return (
    <div className="admin-rte">
      <div className="admin-rte-toolbar">
        <button type="button" onClick={() => execCommand('bold')}><b>B</b></button>
        <button type="button" onClick={() => execCommand('italic')}><i>I</i></button>
        <button type="button" onClick={() => execCommand('underline')}><u>U</u></button>
        <span className="admin-rte-sep" />
        <button type="button" onClick={() => execCommand('formatBlock', 'h2')}>H2</button>
        <button type="button" onClick={() => execCommand('formatBlock', 'h3')}>H3</button>
        <button type="button" onClick={() => execCommand('formatBlock', 'p')}>P</button>
        <span className="admin-rte-sep" />
        <button type="button" onClick={() => execCommand('insertUnorderedList')}>UL</button>
        <button type="button" onClick={() => execCommand('insertOrderedList')}>OL</button>
        <span className="admin-rte-sep" />
        <button type="button" onClick={() => {
          const url = prompt('Enter link URL:');
          if (url) execCommand('createLink', url);
        }}>Link</button>
        <span className="admin-rte-sep" />
        <button type="button" className="admin-rte-mode" onClick={() => setMode('visual')}>Visual</button>
        <button type="button" className="admin-rte-mode" onClick={() => setMode('html')}>HTML</button>
      </div>
      <div
        className="admin-rte-content"
        contentEditable
        dangerouslySetInnerHTML={{ __html: value || '' }}
        onInput={handleInput}
      />
    </div>
  );
}
