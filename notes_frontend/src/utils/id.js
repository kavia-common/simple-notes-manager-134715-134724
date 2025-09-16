let counter = 0;

/**
 * PUBLIC_INTERFACE
 * generateId: Creates a reasonably unique identifier for in-memory records.
 */
export function generateId() {
  counter += 1;
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}_${counter}`;
}
