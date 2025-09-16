import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * NoteList: Renders a searchable, selectable list of notes with delete actions.
 */
function NoteList({ notes, selectedId, onSelect, onDelete }) {
  const [query, setQuery] = React.useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  return (
    <div className="note-list">
      <div className="search">
        <input
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      </div>

      <ul className="items" role="list">
        {filtered.length === 0 && (
          <li className="empty">No notes found.</li>
        )}

        {filtered.map(note => {
          const isActive = note.id === selectedId;
          return (
            <li
              key={note.id}
              className={`item ${isActive ? 'active' : ''}`}
            >
              <button
                className="item-body"
                onClick={() => onSelect(note.id)}
                aria-current={isActive ? 'true' : 'false'}
                title={`Open "${note.title || 'Untitled'}"`}
              >
                <div className="item-title">{note.title || 'Untitled'}</div>
                <div className="item-snippet">
                  {note.content.slice(0, 80) || 'No content yet...'}
                </div>
              </button>
              <button
                className="icon-btn danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                aria-label={`Delete ${note.title || 'Untitled'}`}
                title="Delete note"
              >
                🗑️
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  })).isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteList;
