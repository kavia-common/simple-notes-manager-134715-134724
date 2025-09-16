import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * NoteEditor: Controlled form for editing a note's title and content.
 * Calls onChange with the updated note object.
 */
function NoteEditor({ note, onChange }) {
  const [title, setTitle] = React.useState(note.title || '');
  const [content, setContent] = React.useState(note.content || '');

  // Sync local state when note changes (e.g., selecting a different note)
  React.useEffect(() => {
    setTitle(note.title || '');
    setContent(note.content || '');
  }, [note.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = () => {
    onChange({
      ...note,
      title: title.trim(),
      content,
      updatedAt: Date.now(),
    });
  };

  return (
    <div className="note-editor card">
      <div className="card-header">
        <h3 className="title">Editor</h3>
        <div className="actions">
          <button className="btn primary" onClick={handleSave} aria-label="Save note">Save</button>
        </div>
      </div>
      <div className="card-content form">
        <label className="field">
          <span className="label">Title</span>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter a title..."
          />
        </label>
        <label className="field">
          <span className="label">Content</span>
          <textarea
            rows={12}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your note here..."
          />
        </label>
      </div>
    </div>
  );
}

NoteEditor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    updatedAt: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NoteEditor;
