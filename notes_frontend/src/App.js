import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import './index.css';
import NoteList from './components/NoteList';
import NoteViewer from './components/NoteViewer';
import NoteEditor from './components/NoteEditor';
import { useNotesState } from './hooks/useNotesState';

/**
 * PUBLIC_INTERFACE
 * App: Root component for the Notes application.
 * - Manages theme (light/dark) and layout.
 * - Renders the note list, viewer, and editor panes.
 * - Uses in-memory state via useNotesState hook (no backend).
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Manage theme attribute to allow CSS variables to take effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // In-memory notes state
  const {
    notes,
    selectedId,
    selectNote,
    createNote,
    updateNote,
    deleteNote,
  } = useNotesState();

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="logo" aria-hidden>📝</span>
          <span className="brand-name">Simple Notes</span>
        </div>
        <div className="topbar-actions">
          <button className="btn primary" onClick={createNote} aria-label="Create a new note">
            + New Note
          </button>
          <button
            className="btn ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="main-content">
        <aside className="sidebar">
          <NoteList
            notes={notes}
            selectedId={selectedId}
            onSelect={selectNote}
            onDelete={deleteNote}
          />
        </aside>

        <section className="content">
          {selectedNote ? (
            <div className="content-grid">
              <div className="pane">
                <NoteViewer note={selectedNote} />
              </div>
              <div className="pane editor-pane">
                <NoteEditor
                  key={selectedNote.id}
                  note={selectedNote}
                  onChange={updateNote}
                />
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-illustration" aria-hidden>🗒️</div>
              <h2>No note selected</h2>
              <p>Select a note from the list or create a new one to get started.</p>
              <button className="btn primary" onClick={createNote}>Create your first note</button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <span>In-memory demo • No backend required</span>
      </footer>
    </div>
  );
}

export default App;
