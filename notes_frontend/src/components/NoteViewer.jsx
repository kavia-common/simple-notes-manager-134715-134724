import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * NoteViewer: Read-only view of a note's title and content.
 */
function NoteViewer({ note }) {
  if (!note) {
    return null;
  }

  return (
    <div className="note-viewer card">
      <div className="card-header">
        <h2 className="title">{note.title || 'Untitled'}</h2>
        <div className="meta">
          <span title="Last updated">🕒 {new Date(note.updatedAt).toLocaleString()}</span>
        </div>
      </div>
      <div className="card-content">
        {note.content ? (
          <pre className="content">{note.content}</pre>
        ) : (
          <p className="muted">No content yet. Start typing in the editor.</p>
        )}
      </div>
    </div>
  );
}

NoteViewer.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    updatedAt: PropTypes.number.isRequired,
  }),
};

export default NoteViewer;
