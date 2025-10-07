import { useState, useEffect } from 'react';

export function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      return raw ? JSON.parse(raw) : initial;
    } catch { return initial; }
  });

  useEffect(() => {
    try { if(typeof window !== 'undefined'){ localStorage.setItem(key, JSON.stringify(state)); } } catch {}
  }, [key, state]);

  return [state, setState];
}
