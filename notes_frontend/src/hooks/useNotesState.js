import { useCallback, useMemo, useState } from 'react';
import { generateId } from '../utils/id';

/**
 * PUBLIC_INTERFACE
 * useNotesState: In-memory notes state manager with CRUD operations.
 * Returns: notes array, selectedId, and handlers: selectNote, createNote, updateNote, deleteNote.
 */
export function useNotesState() {
  // Seed with some mock notes for demonstration
  const initialNotes = useMemo(() => ([
    {
      id: generateId(),
      title: 'Welcome to Simple Notes',
      content:
        'This is a demo note. Use the editor to modify me.\n\nFeatures:\n- Create a new note\n- Select and view a note\n- Edit a note and save\n- Delete a note\n\nAll data is stored in-memory for this demo.',
      createdAt: Date.now() - 1000 * 60 * 60,
      updatedAt: Date.now() - 1000 * 45,
    },
    {
      id: generateId(),
      title: 'Keyboard tips',
      content: 'Try using the search box to quickly filter notes.',
      createdAt: Date.now() - 1000 * 60 * 30,
      updatedAt: Date.now() - 1000 * 60 * 10,
    },
  ]), []);

  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(initialNotes[0]?.id || null);

  // PUBLIC_INTERFACE
  const selectNote = useCallback((id) => {
    setSelectedId(id);
  }, []);

  // PUBLIC_INTERFACE
  const createNote = useCallback(() => {
    const now = Date.now();
    const newNote = {
      id: generateId(),
      title: 'Untitled',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(newNote.id);
  }, []);

  // PUBLIC_INTERFACE
  const updateNote = useCallback((updated) => {
    setNotes(prev =>
      prev.map(n => (n.id === updated.id ? { ...n, ...updated } : n))
    );
  }, []);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    setSelectedId(prevId => (prevId === id ? null : prevId));
  }, []);

  return {
    notes,
    selectedId,
    selectNote,
    createNote,
    updateNote,
    deleteNote,
  };
}
