import { useLocalStorage } from './useLocalStorage';
export function useWishlist() {
  const [list, setList] = useLocalStorage('wishlist', []);
  function toggle(item) {
    setList(prev => {
      if(prev.find(p=>p.id===item.id)) return prev.filter(p=>p.id!==item.id);
      return [item, ...prev].slice(0,20);
    });
  }
  return { list, toggle };
}
