import { useLocalStorage } from './useLocalStorage';
export function useRecentlyViewed() {
  const [list, setList] = useLocalStorage('rv', []);
  function push(item) {
    setList(prev => {
      const without = prev.filter(p => p.id !== item.id);
      return [item, ...without].slice(0, 12);
    });
  }
  return { list, push };
}
